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

    // Fetch all the metrics in parallel
    const [
      quizzes,
      badges,
      learningTime,
      courseMetrics,
      recentActivity
    ] = await Promise.all([
      // Get completed quizzes count
      db.select({ count: count() })
        .from(userQuizResponses)
        .where(and(
          eq(userQuizResponses.userId, userId),
          eq(userQuizResponses.isCorrect, true)
        )),

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

      // Get course-specific metrics
      db.query.courseEnrollments.findMany({
        where: eq(courseEnrollments.userId, userId),
        columns: {
          courseId: true,
          progress: true,
        }
      }),

      // Get recent activity for streak calculation
      db.query.moduleProgress.findMany({
        where: eq(moduleProgress.userId, userId),
        columns: {
          lastAccessed: true,
        },
        orderBy: (mp) => [desc(mp.lastAccessed)],
        limit: 7,
      })
    ]);

    // Calculate streak based on consecutive days of activity
    let streak = 0;
    if (recentActivity.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activityDates = new Set(
        recentActivity.map(a => {
          const date = new Date(a.lastAccessed);
          date.setHours(0, 0, 0, 0);
          return date.toISOString();
        })
      );

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString();

        if (activityDates.has(dateStr)) {
          streak++;
        } else if (streak > 0) {
          break;
        }
      }
    }

    // Transform course progress
    const courseProgress = Object.fromEntries(
      courseMetrics.map(cm => [
        cm.courseId,
        cm.progress || 0
      ])
    );

    res.json({
      completedQuizzes: quizzes[0]?.count || 0,
      earnedBadges: badges[0]?.count || 0,
      totalLearningMinutes: learningTime[0]?.totalMinutes || 0,
      learningStreak: streak,
      courseProgress
    });

  } catch (error) {
    console.error("Error fetching user metrics:", error);
    res.status(500).json({ error: "Failed to fetch user metrics" });
  }
});

// Track learning time
router.post("/api/progress/learning-time", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { minutes } = req.body;
    const userId = req.user.id;

    await db.update(moduleProgress)
      .set({ 
        timeSpent: sql`${moduleProgress.timeSpent} + ${minutes}`,
        lastAccessed: new Date()
      })
      .where(eq(moduleProgress.userId, userId));

    res.json({ success: true });
  } catch (error) {
    console.error("Error tracking learning time:", error);
    res.status(500).json({ error: "Failed to track learning time" });
  }
});

export default router;