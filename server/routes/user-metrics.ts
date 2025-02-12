import { Router } from "express";
import { db } from "@db";
import { courseEnrollments, moduleProgress, userQuizResponses, userAchievements } from "@db/schema";
import { eq, and, count, sum, desc, sql } from "drizzle-orm";

const router = Router();

router.get("/api/user/metrics", async (req, res) => {
  // Check authentication using isAuthenticated()
  if (!req.isAuthenticated()) {
    console.error("[User Metrics] Unauthenticated request");
    return res.status(401).json({ error: "Unauthorized - Please log in" });
  }

  const userId = req.user?.id;
  if (!userId) {
    console.error("[User Metrics] No user ID in authenticated session");
    return res.status(401).json({ error: "Invalid session" });
  }

  try {
    console.log("[User Metrics] Fetching metrics for user:", userId);

    // Calculate total learning time from all module progress records
    const [totalTimeResult] = await db
      .select({ 
        total: sql<number>`COALESCE(SUM(CASE 
          WHEN ${moduleProgress.timeSpent} IS NULL THEN 5 
          WHEN ${moduleProgress.timeSpent} = 0 THEN 5 
          ELSE ${moduleProgress.timeSpent} 
        END), 0)::integer`
      })
      .from(moduleProgress)
      .where(eq(moduleProgress.userId, userId));

    console.log("[User Metrics] Total learning time result:", totalTimeResult);

    // Fetch module progress data for other metrics
    const moduleProgressData = await db.query.moduleProgress.findMany({
      where: eq(moduleProgress.userId, userId),
      orderBy: [desc(moduleProgress.lastAccessed)],
    });

    console.log("[User Metrics] Module progress data:", moduleProgressData);

    // Calculate quiz metrics from module progress
    const quizMetrics = moduleProgressData.reduce((acc, curr) => {
      if (curr.score !== null) { // This is a quiz completion
        acc.completed++;
        acc.totalScore += curr.score;
      }
      return acc;
    }, { completed: 0, totalScore: 0 });

    // Get earned badges count
    const [badgeCount] = await db.select({ count: count() })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

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

    // Get course metrics
    const courseMetrics = await db.query.courseEnrollments.findMany({
      where: eq(courseEnrollments.userId, userId),
      with: {
        course: true,
      },
    });

    // Transform course metrics with progress data
    const transformedCourseMetrics = await Promise.all(
      courseMetrics.map(async (enrollment) => {
        // Calculate course-specific time spent
        const [courseTimeResult] = await db
          .select({ 
            total: sql<number>`COALESCE(SUM(CASE 
              WHEN ${moduleProgress.timeSpent} IS NULL THEN 5 
              WHEN ${moduleProgress.timeSpent} = 0 THEN 5 
              ELSE ${moduleProgress.timeSpent} 
            END), 0)::integer` 
          })
          .from(moduleProgress)
          .where(and(
            eq(moduleProgress.userId, userId),
            eq(moduleProgress.courseId, enrollment.courseId)
          ));

        // Get course-specific module progress
        const courseProgress = moduleProgressData.filter(
          mp => mp.courseId === enrollment.courseId
        );

        // Calculate course-specific quiz metrics
        const courseQuizzes = courseProgress.filter(mp => mp.score !== null);
        const courseQuizScore = courseQuizzes.length > 0
          ? Math.round(courseQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0) / courseQuizzes.length)
          : 0;

        return {
          courseId: enrollment.courseId,
          title: enrollment.course.title,
          progress: enrollment.progress || 0,
          timeSpent: courseTimeResult.total,
          quizScore: courseQuizScore
        };
      })
    );

    const response = {
      completedQuizzes: quizMetrics.completed,
      quizAccuracy: quizMetrics.completed > 0
        ? Math.round((quizMetrics.totalScore / quizMetrics.completed))
        : 0,
      earnedBadges: badgeCount?.count || 0,
      totalLearningMinutes: totalTimeResult.total,
      learningStreak: streak,
      courses: transformedCourseMetrics
    };

    console.log("[User Metrics] Final response:", response);
    res.json(response);

  } catch (error) {
    console.error("[User Metrics] Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;