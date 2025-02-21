import { Router } from "express";
import { db } from "@db";
import { moduleProgress, courseEnrollments } from "@db/schema";
import { sql, eq, and, desc } from "drizzle-orm";

const router = Router();

// Map course IDs to their proper titles
const COURSE_TITLES = {
  1: "Course 1: Introduction to Cryptocurrency",
  2: "Course 2: Introduction to AI",
  3: "Course 3: Mastering DeFi"
};

// Route to get learning path progress
router.get("/api/learning-path", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      console.error("[Learning Path] Unauthenticated request");
      return res.status(401).json({ error: "Unauthorized - Please log in" });
    }

    const userId = req.user?.id;
    if (!userId) {
      console.error("[Learning Path] No user ID in authenticated session");
      return res.status(401).json({ error: "Invalid session" });
    }

    // Calculate course-specific stats
    const courseStats = await db
      .select({ 
        courseId: moduleProgress.courseId,
        totalTime: sql<number>`COALESCE(SUM(${moduleProgress.timeSpent}), 0)::integer`,
        completedQuizzes: sql<number>`COUNT(CASE WHEN ${moduleProgress.score} IS NOT NULL AND ${moduleProgress.completed} = true THEN 1 END)::integer`,
        lastQuizPath: sql<string>`MAX(CASE WHEN ${moduleProgress.score} IS NOT NULL AND ${moduleProgress.completed} = true THEN ${moduleProgress.sectionId} END)`,
        lastCompletedPath: sql<string>`MAX(CASE WHEN ${moduleProgress.completed} = true THEN ${moduleProgress.sectionId} END)`
      })
      .from(moduleProgress)
      .where(eq(moduleProgress.userId, userId))
      .groupBy(moduleProgress.courseId);

    // Format stats for response
    const formattedStats = courseStats.map(stat => {
      let continuePath;

      // Determine the continue learning path based on course type
      switch (stat.courseId) {
        case 1: // Introduction to Cryptocurrency
        case 2: // Introduction to AI
          // For Crypto and AI courses, prefer last completed quiz path
          continuePath = stat.lastQuizPath || 
            (stat.courseId === 1 ? '/modules/module1' : '/ai/module1');
          break;
        case 3: // Mastering DeFi
          // For DeFi course, prefer last completed topic
          continuePath = stat.lastCompletedPath || '/defi/module1';
          break;
        default:
          continuePath = '/modules/module1';
      }

      return {
        courseId: stat.courseId,
        title: COURSE_TITLES[stat.courseId as keyof typeof COURSE_TITLES],
        totalLearningTime: stat.totalTime,
        completedQuizzes: stat.completedQuizzes,
        continuePath
      };
    });

    res.json({
      courseStats: formattedStats
    });

  } catch (error) {
    console.error("[Learning Path] Error:", error);
    res.status(500).json({ error: "Failed to fetch learning path data" });
  }
});

// Update module progress
router.post("/api/learning-path/progress", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      console.error("[Learning Path] Unauthenticated request");
      return res.status(401).json({ error: "Unauthorized - Please log in" });
    }

    const userId = req.user?.id;
    if (!userId) {
      console.error("[Learning Path] No user ID in authenticated session");
      return res.status(401).json({ error: "Invalid session" });
    }

    const { moduleId, courseId, sectionId, timeSpent, completed, quizScore } = req.body;
    console.log("[Learning Path] Received progress update request:", {
      userId,
      moduleId,
      courseId,
      sectionId,
      timeSpent,
      completed,
      quizScore
    });

    if (!moduleId || !courseId || !sectionId) {
      console.error("[Learning Path] Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure timeSpent is a number and not negative
    const validatedTimeSpent = Math.max(0, parseInt(timeSpent) || 0);
    console.log("[Learning Path] Validated time spent:", validatedTimeSpent);

    // If this is a quiz completion
    if (quizScore !== undefined) {
      const isQuizPassed = quizScore >= 60; // Pass threshold
      console.log("[Learning Path] Processing quiz completion:", { 
        isQuizPassed, 
        quizScore,
        userId,
        moduleId,
        sectionId,
        courseId
      });

      try {
        const result = await db.transaction(async (tx) => {
          // Check if progress record exists
          const existingProgress = await tx.query.moduleProgress.findFirst({
            where: and(
              eq(moduleProgress.userId, userId),
              eq(moduleProgress.moduleId, moduleId),
              eq(moduleProgress.sectionId, sectionId),
              eq(moduleProgress.courseId, courseId)
            )
          });

          let progressUpdate;
          if (existingProgress) {
            [progressUpdate] = await tx.update(moduleProgress)
              .set({
                completed: isQuizPassed,
                score: quizScore,
                lastAccessed: new Date(),
                completedAt: isQuizPassed ? new Date() : null,
                timeSpent: existingProgress.timeSpent + (timeSpent || 0)
              })
              .where(and(
                eq(moduleProgress.userId, userId),
                eq(moduleProgress.moduleId, moduleId),
                eq(moduleProgress.sectionId, sectionId),
                eq(moduleProgress.courseId, courseId)
              ))
              .returning();
          } else {
            [progressUpdate] = await tx.insert(moduleProgress)
              .values({
                userId,
                moduleId,
                courseId,
                sectionId,
                timeSpent: timeSpent || 0,
                completed: isQuizPassed,
                score: quizScore,
                lastAccessed: new Date(),
                completedAt: isQuizPassed ? new Date() : null
              })
              .returning();
          }

          // Update course progress
          const updatedProgress = await updateCourseProgress(
            tx,
            userId,
            courseId
          );

          return { progressUpdate, courseProgress: updatedProgress };
        });

        console.log("[Learning Path] Quiz completion transaction successful:", result);
        res.json({
          success: true,
          message: isQuizPassed ? "Quiz completed successfully!" : "Quiz submitted but did not pass threshold",
          progress: result.courseProgress
        });

      } catch (dbError) {
        console.error("[Learning Path] Database operation failed:", dbError);
        res.status(500).json({
          error: "Failed to update progress",
          details: dbError instanceof Error ? dbError.message : 'Unknown error'
        });
      }
    } else {
      // Regular progress update (non-quiz)
      try {
        console.log("[Learning Path] Processing regular progress update");

        const result = await db.transaction(async (tx) => {
          // Check if progress record exists
          const existingProgress = await tx.query.moduleProgress.findFirst({
            where: and(
              eq(moduleProgress.userId, userId),
              eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
              eq(moduleProgress.sectionId, sectionId),
              eq(moduleProgress.courseId, parseInt(courseId, 10))
            )
          });

          let progressUpdate;
          if (existingProgress) {
            // Update existing record
            console.log("[Learning Path] Updating existing progress record", {
              existingTimeSpent: existingProgress.timeSpent,
              newTimeToAdd: validatedTimeSpent,
              totalTimeWillBe: (existingProgress.timeSpent || 0) + validatedTimeSpent
            });

            [progressUpdate] = await tx.update(moduleProgress)
              .set({
                completed: completed || existingProgress.completed,
                lastAccessed: new Date(),
                completedAt: completed ? new Date() : existingProgress.completedAt,
                timeSpent: (existingProgress.timeSpent || 0) + validatedTimeSpent
              })
              .where(and(
                eq(moduleProgress.userId, userId),
                eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
                eq(moduleProgress.sectionId, sectionId),
                eq(moduleProgress.courseId, parseInt(courseId, 10))
              ))
              .returning();
          } else {
            // Insert new record
            console.log("[Learning Path] Creating new progress record with time:", validatedTimeSpent);
            [progressUpdate] = await tx.insert(moduleProgress)
              .values({
                userId,
                moduleId: parseInt(moduleId, 10),
                courseId: parseInt(courseId, 10),
                sectionId,
                timeSpent: validatedTimeSpent,
                completed: completed || false,
                lastAccessed: new Date(),
                completedAt: completed ? new Date() : null
              })
              .returning();
          }

          // Update course progress
          const updatedProgress = await updateCourseProgress(
            tx,
            userId,
            parseInt(courseId, 10)
          );

          return { progressUpdate, courseProgress: updatedProgress };
        });

        console.log("[Learning Path] Progress updated successfully:", result);
        res.json({
          success: true,
          progress: result.courseProgress
        });
      } catch (error) {
        console.error("[Learning Path] Error in regular progress update:", error);
        res.status(500).json({
          error: "Failed to update progress",
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  } catch (error) {
    console.error("[Learning Path] Unexpected error:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Helper function to calculate course progress
async function updateCourseProgress(tx: any, userId: number, courseId: number) {
  try {
    // AI course (courseId: 2) has 5 sections per module
    // Regular course (courseId: 1) has 4 sections per module
    const sectionsPerModule = courseId === 2 ? 5 : 4;
    const totalModules = 3; // Both courses have 3 modules
    const totalSections = sectionsPerModule * totalModules;

    console.log(`[Progress Update] Course ${courseId} configuration:`, {
      sectionsPerModule,
      totalModules,
      totalSections
    });

    // Count completed sections for this course
    const completedSections = await tx
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(moduleProgress)
      .where(
        and(
          eq(moduleProgress.userId, userId),
          eq(moduleProgress.courseId, courseId),
          eq(moduleProgress.completed, true)
        )
      );

    const progress = Math.round((completedSections[0].count / totalSections) * 100);

    console.log(`[Progress Update] User ${userId}, Course ${courseId}:`, {
      completedSections: completedSections[0].count,
      totalSections,
      progress,
      sectionWeight: (100 / totalSections).toFixed(2) + '%'
    });

    // Update course enrollment progress
    const [updatedEnrollment] = await tx
      .update(courseEnrollments)
      .set({
        progress: progress,
        lastAccessedAt: new Date(),
        updatedAt: new Date()
      })
      .where(
        and(
          eq(courseEnrollments.userId, userId),
          eq(courseEnrollments.courseId, courseId)
        )
      )
      .returning();

    console.log(`[Progress Update] Updated enrollment:`, updatedEnrollment);

    return progress;
  } catch (error) {
    console.error('[Progress Update] Error updating course progress:', error);
    throw error;
  }
}

export default router;