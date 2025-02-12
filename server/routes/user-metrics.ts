import { Router } from "express";
import { db } from "@db";
import { courseEnrollments, moduleProgress, userQuizResponses, userAchievements } from "@db/schema";
import { eq, and, count, sum, desc, sql } from "drizzle-orm";

const router = Router();

router.get("/api/user/metrics", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = req.user.id;

    // Fetch all metrics in parallel for better performance
    const [
      quizMetrics,
      badgeCount,
      learningTimeResult,
      moduleProgressData,
      courseMetrics
    ] = await Promise.all([
      // Get quiz metrics (completed count and average score)
      db.select({
        completed: count(),
        totalCorrect: count(userQuizResponses.isCorrect)
      })
        .from(userQuizResponses)
        .where(eq(userQuizResponses.userId, userId)),

      // Get earned badges count
      db.select({ count: count() })
        .from(userAchievements)
        .where(eq(userAchievements.userId, userId)),

      // Get total learning time from module progress
      db.select({ 
        totalMinutes: sum(moduleProgress.timeSpent).mapWith(Number) 
      })
        .from(moduleProgress)
        .where(eq(moduleProgress.userId, userId)),

      // Get module progress for learning streak calculation
      db.query.moduleProgress.findMany({
        where: eq(moduleProgress.userId, userId),
        columns: {
          lastAccessed: true,
        },
        orderBy: [desc(moduleProgress.lastAccessed)],
        limit: 30, // Check last 30 days for streak
      }),

      // Get course-specific metrics
      db.query.courseEnrollments.findMany({
        where: eq(courseEnrollments.userId, userId),
        columns: {
          courseId: true,
          progress: true,
          lastAccessedAt: true
        }
      })
    ]);

    // Calculate learning streak
    let streak = 0;
    const today = new Date();
    const activityDates = new Set(
      moduleProgressData
        .filter(mp => mp.lastAccessed)
        .map(mp => new Date(mp.lastAccessed).toISOString().split('T')[0])
    );

    // Check consecutive days backwards from today
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      if (activityDates.has(dateStr)) {
        streak++;
      } else if (streak > 0) {
        break;
      }
    }

    // Transform course metrics
    const transformedCourseMetrics = Object.fromEntries(
      courseMetrics.map(cm => [
        cm.courseId,
        {
          progress: cm.progress || 0,
          timeSpent: 0, // Will be calculated below
          averageQuizScore: 0, // Will be calculated below
        }
      ])
    );

    // Calculate per-course metrics
    for (const courseId of Object.keys(transformedCourseMetrics)) {
      const [courseQuizzes, courseTime] = await Promise.all([
        // Get course quiz performance
        db.select({
          correct: count(userQuizResponses.isCorrect),
          total: count()
        })
          .from(userQuizResponses)
          .where(and(
            eq(userQuizResponses.userId, userId),
            sql`quiz_id IN (
              SELECT id FROM quizzes 
              WHERE module_id IN (
                SELECT CAST(jsonb_array_elements_text(modules) AS INTEGER) 
                FROM courses 
                WHERE id = ${courseId}
              )
            )`
          )),

        // Get course time spent
        db.select({
          total: sum(moduleProgress.timeSpent).mapWith(Number)
        })
          .from(moduleProgress)
          .where(and(
            eq(moduleProgress.userId, userId),
            sql`module_id IN (
              SELECT CAST(jsonb_array_elements_text(modules) AS INTEGER)
              FROM courses 
              WHERE id = ${courseId}
            )`
          ))
      ]);

      transformedCourseMetrics[courseId] = {
        ...transformedCourseMetrics[courseId],
        timeSpent: courseTime[0]?.total || 0,
        averageQuizScore: courseQuizzes[0]?.total ? 
          Math.round((courseQuizzes[0].correct / courseQuizzes[0].total) * 100) : 0
      };
    }

    res.json({
      completedQuizzes: quizMetrics[0]?.completed || 0,
      earnedBadges: badgeCount[0]?.count || 0,
      totalLearningMinutes: learningTimeResult[0]?.totalMinutes || 0,
      learningStreak: streak,
      courseMetrics: transformedCourseMetrics
    });

  } catch (error) {
    console.error("Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;