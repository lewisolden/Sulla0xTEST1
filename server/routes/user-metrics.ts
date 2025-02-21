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

    // Calculate total learning time from all module progress records
    const moduleProgressRecords = await db
      .select({
        timeSpent: moduleProgress.timeSpent,
        lastAccessed: moduleProgress.lastAccessed,
        completed: moduleProgress.completed,
        moduleId: moduleProgress.moduleId,
        courseId: moduleProgress.courseId
      })
      .from(moduleProgress)
      .where(eq(moduleProgress.userId, userId));

    console.log("[User Metrics] Found progress records:", moduleProgressRecords.length);

    // Calculate total time spent including active sessions
    const totalMinutes = moduleProgressRecords.reduce((total, record) => {
      // Base time from the record
      const baseTime = record.timeSpent || 0;

      // Add minimum time for completed modules without tracked time
      if (record.completed && baseTime < 5) {
        console.log(`[User Metrics] Adding minimum time for completed module ${record.moduleId} in course ${record.courseId}`);
        return total + 5;
      }

      // For active modules, ensure at least 1 minute is counted
      if (baseTime === 0 && record.lastAccessed) {
        const lastAccessTime = new Date(record.lastAccessed).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = Math.floor((currentTime - lastAccessTime) / (1000 * 60)); // Convert to minutes

        if (timeDiff < 60) { // If accessed within the last hour
          console.log(`[User Metrics] Adding active time for module ${record.moduleId}: ${timeDiff} minutes`);
          return total + Math.max(1, timeDiff);
        }
      }

      console.log(`[User Metrics] Adding base time for module ${record.moduleId}: ${baseTime} minutes`);
      return total + baseTime;
    }, 0);

    console.log("[User Metrics] Total learning time calculated:", totalMinutes, "minutes");

    // Get module progress data for other metrics
    const moduleProgressData = await db.query.moduleProgress.findMany({
      where: eq(moduleProgress.userId, userId),
    });

    // Calculate quiz metrics
    const quizMetrics = moduleProgressData.reduce((acc, curr) => {
      if (curr.score !== null) {
        acc.completed++;
        acc.totalScore += curr.score;
      }
      return acc;
    }, { completed: 0, totalScore: 0 });

    // Get earned badges count
    const [badgeCount] = await db
      .select({ count: count() })
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

    // Prepare response with detailed logging
    const response = {
      completedQuizzes: quizMetrics.completed,
      quizAccuracy: quizMetrics.completed > 0
        ? Math.round((quizMetrics.totalScore / quizMetrics.completed))
        : 0,
      earnedBadges: badgeCount?.count || 0,
      totalLearningMinutes: Math.max(0, Math.round(totalMinutes)), // Ensure non-negative
      learningStreak: streak
    };

    console.log("[User Metrics] Final response:", response);
    res.json(response);

  } catch (error) {
    console.error("[User Metrics] Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

export default router;