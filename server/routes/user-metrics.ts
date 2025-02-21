import { Router } from "express";
import { db } from "@db";
import { courseEnrollments, moduleProgress, userQuizResponses, userAchievements, courses } from "@db/schema";
import { eq, and, count, sql } from "drizzle-orm";

const router = Router();

router.get("/api/user/metrics", async (req, res) => {
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

    // Get course enrollments with progress
    const userEnrollments = await db
      .select({
        courseId: courseEnrollments.courseId,
        title: courses.title,
        totalTimeSpent: sql<number>`COALESCE(SUM(${moduleProgress.timeSpent}), 0)::integer`,
        completedQuizzes: sql<number>`COUNT(DISTINCT CASE WHEN ${userQuizResponses.completed} = true THEN ${userQuizResponses.id} END)`,
        continuePath: sql<string>`COALESCE(MAX(${moduleProgress.path}), '/modules/module1')`
      })
      .from(courseEnrollments)
      .leftJoin(courses, eq(courses.id, courseEnrollments.courseId))
      .leftJoin(moduleProgress, and(
        eq(moduleProgress.userId, courseEnrollments.userId),
        eq(moduleProgress.courseId, courseEnrollments.courseId)
      ))
      .leftJoin(userQuizResponses, and(
        eq(userQuizResponses.userId, courseEnrollments.userId),
        eq(userQuizResponses.courseId, courseEnrollments.courseId)
      ))
      .where(eq(courseEnrollments.userId, userId))
      .groupBy(courseEnrollments.courseId, courses.title);

    // Calculate total learning time and completed quizzes
    const totalLearningTime = userEnrollments.reduce((acc, enrollment) => acc + enrollment.totalTimeSpent, 0);
    const totalCompletedQuizzes = userEnrollments.reduce((acc, enrollment) => acc + Number(enrollment.completedQuizzes), 0);

    // Get badge count
    const [badgeCount] = await db
      .select({ count: count() })
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));

    // Calculate learning streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recentActivity = await db
      .select({
        date: sql<string>`DATE(${moduleProgress.lastAccessed})::text`,
      })
      .from(moduleProgress)
      .where(
        and(
          eq(moduleProgress.userId, userId),
          sql`${moduleProgress.lastAccessed} > NOW() - INTERVAL '30 days'`
        )
      )
      .groupBy(sql`DATE(${moduleProgress.lastAccessed})`);

    const activityDates = new Set(recentActivity.map(a => a.date));
    let streak = 0;

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];

      if (activityDates.has(dateStr)) {
        streak++;
      } else if (streak > 0) {
        break;
      }
    }

    const response = {
      totalLearningMinutes: Math.max(0, Math.round(totalLearningTime)),
      completedQuizzes: totalCompletedQuizzes,
      earnedBadges: badgeCount?.count || 0,
      learningStreak: streak,
      courseStats: userEnrollments.map(enrollment => ({
        courseId: enrollment.courseId,
        title: enrollment.title,
        totalLearningTime: enrollment.totalTimeSpent,
        completedQuizzes: Number(enrollment.completedQuizzes),
        continuePath: enrollment.continuePath
      }))
    };

    console.log("[User Metrics] Final response:", response);
    res.json(response);

  } catch (error) {
    console.error("[User Metrics] Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;