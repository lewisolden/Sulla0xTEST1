import { Router } from "express";
import { db } from "@db";
import { courseEnrollments, moduleProgress, userQuizResponses, userAchievements } from "@db/schema";
import { eq, and, count, sum, desc, sql } from "drizzle-orm";

declare module "express-session" {
  interface Session {
    userId: string;
  }
}

const router = Router();

router.get("/api/user/metrics", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = parseInt(req.session.userId, 10);

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
        totalCorrect: sum(sql`CASE WHEN ${userQuizResponses.isCorrect} THEN 1 ELSE 0 END`).mapWith(Number)
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
        orderBy: [desc(moduleProgress.lastAccessed)],
      }),

      // Get course-specific metrics
      db.query.courseEnrollments.findMany({
        where: eq(courseEnrollments.userId, userId),
        with: {
          course: true,
        },
      })
    ]);

    // Calculate learning streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activityDates = new Set(
      moduleProgressData
        .filter(mp => mp.lastAccessed)
        .map(mp => {
          const date = new Date(mp.lastAccessed);
          date.setHours(0, 0, 0, 0);
          return date.getTime();
        })
    );

    // Check consecutive days backwards from today
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);

      if (activityDates.has(checkDate.getTime())) {
        streak++;
      } else if (streak > 0) {
        break;
      }
    }

    // Transform course metrics
    const transformedCourseMetrics = await Promise.all(
      courseMetrics.map(async (enrollment) => {
        // Get course quiz performance
        const [quizStats, timeStats] = await Promise.all([
          db.select({
            correct: sum(sql`CASE WHEN ${userQuizResponses.isCorrect} THEN 1 ELSE 0 END`).mapWith(Number),
            total: count()
          })
            .from(userQuizResponses)
            .where(and(
              eq(userQuizResponses.userId, userId),
              eq(userQuizResponses.courseId, enrollment.courseId)
            )),

          // Get course time spent
          db.select({
            totalTime: sum(moduleProgress.timeSpent).mapWith(Number)
          })
            .from(moduleProgress)
            .where(and(
              eq(moduleProgress.userId, userId),
              eq(moduleProgress.courseId, enrollment.courseId)
            ))
        ]);

        return {
          courseId: enrollment.courseId,
          title: enrollment.course.title,
          progress: enrollment.progress || 0,
          timeSpent: timeStats[0]?.totalTime || 0,
          quizScore: quizStats[0]?.total ? 
            Math.round((quizStats[0].correct / quizStats[0].total) * 100) : 0
        };
      })
    );

    res.json({
      completedQuizzes: quizMetrics[0]?.completed || 0,
      quizAccuracy: quizMetrics[0]?.totalCorrect ? 
        Math.round((quizMetrics[0].totalCorrect / quizMetrics[0].completed) * 100) : 0,
      earnedBadges: badgeCount[0]?.count || 0,
      totalLearningMinutes: learningTimeResult[0]?.totalMinutes || 0,
      learningStreak: streak,
      courses: transformedCourseMetrics
    });

  } catch (error) {
    console.error("Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;