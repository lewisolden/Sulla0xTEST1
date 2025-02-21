import { Router } from "express";
import { db } from "@db";
import { courseEnrollments, moduleProgress, userQuizResponses, userAchievements } from "@db/schema";
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

    // Get all progress records including historical data
    const [progressSummary] = await db
      .select({
        totalTimeSpent: sql<number>`COALESCE(SUM(CASE 
          WHEN ${moduleProgress.timeSpent} > 0 THEN ${moduleProgress.timeSpent}
          WHEN ${moduleProgress.completed} = true THEN 5
          ELSE 0
        END), 0)::integer`,
        completedModules: sql<number>`COUNT(CASE WHEN ${moduleProgress.completed} = true THEN 1 END)`,
        totalModules: sql<number>`COUNT(*)`,
      })
      .from(moduleProgress)
      .where(eq(moduleProgress.userId, userId));

    console.log("[User Metrics] Progress summary:", progressSummary);

    // Calculate active session time
    const activeModules = await db
      .select({
        moduleId: moduleProgress.moduleId,
        lastAccessed: moduleProgress.lastAccessed,
        timeSpent: moduleProgress.timeSpent,
      })
      .from(moduleProgress)
      .where(
        and(
          eq(moduleProgress.userId, userId),
          sql`${moduleProgress.lastAccessed} > NOW() - INTERVAL '1 hour'`
        )
      );

    console.log("[User Metrics] Found active modules:", activeModules.length);

    // Add time from active sessions
    const activeTime = activeModules.reduce((total, module) => {
      if (module.lastAccessed) {
        const lastAccessTime = new Date(module.lastAccessed).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = Math.floor((currentTime - lastAccessTime) / (1000 * 60));

        if (timeDiff < 60) { // If accessed within the last hour
          console.log(`[User Metrics] Adding active time for module ${module.moduleId}: ${timeDiff} minutes`);
          return total + Math.max(1, timeDiff);
        }
      }
      return total;
    }, 0);

    const totalLearningTime = progressSummary.totalTimeSpent + activeTime;
    console.log("[User Metrics] Total learning time calculated:", totalLearningTime, "minutes");

    // Get other metrics
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

    // Get quiz completion stats
    const quizStats = await db
      .select({
        count: count()
      })
      .from(userQuizResponses)
      .where(eq(userQuizResponses.userId, userId));

    const response = {
      totalLearningMinutes: Math.max(0, Math.round(totalLearningTime)),
      completedModules: progressSummary.completedModules,
      totalModules: progressSummary.totalModules,
      completedQuizzes: quizStats[0]?.count || 0,
      earnedBadges: badgeCount?.count || 0,
      learningStreak: streak,
      overallProgress: progressSummary.completedModules / progressSummary.totalModules * 100
    };

    console.log("[User Metrics] Final response:", response);
    res.json(response);

  } catch (error) {
    console.error("[User Metrics] Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;