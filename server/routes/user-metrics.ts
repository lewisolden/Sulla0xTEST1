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
    console.log("[User Metrics] Fetching metrics for user:", userId);

    // Fetch module progress metrics first
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

    // Calculate total learning time from module progress
    const totalLearningMinutes = moduleProgressData.reduce((acc, curr) => {
      return acc + (curr.timeSpent || 0);
    }, 0);

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
        // Get course-specific module progress
        const courseProgress = moduleProgressData.filter(
          mp => mp.courseId === enrollment.courseId
        );

        // Calculate course-specific metrics
        const courseTimeSpent = courseProgress.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0);
        const courseQuizzes = courseProgress.filter(mp => mp.score !== null);
        const courseQuizScore = courseQuizzes.length > 0
          ? Math.round(courseQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0) / courseQuizzes.length)
          : 0;

        return {
          courseId: enrollment.courseId,
          title: enrollment.course.title,
          progress: enrollment.progress || 0,
          timeSpent: courseTimeSpent,
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
      totalLearningMinutes: totalLearningMinutes,
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