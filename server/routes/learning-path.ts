import { Router } from "express";
import { db } from "@db";
import { moduleProgress, courseEnrollments } from "@db/schema";
import { sql, eq, and } from "drizzle-orm";

const router = Router();

// Helper function to calculate course progress
async function updateCourseProgress(tx: any, userId: number, courseId: number) {
  // Get total sections for the course
  const totalSections = 4; // Module 1 has 4 sections: Digital Currencies, Security, Practical Applications, Getting Started

  // Count completed sections
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

  // Calculate progress percentage (25% per completed section)
  const progressPercentage = Math.round((completedSections[0].count / totalSections) * 100);

  // Update course enrollment progress
  await tx
    .update(courseEnrollments)
    .set({
      progress: progressPercentage,
      lastAccessedAt: new Date()
    })
    .where(
      and(
        eq(courseEnrollments.userId, userId),
        eq(courseEnrollments.courseId, courseId)
      )
    );

  return progressPercentage;
}

// Update module progress
router.post("/api/learning-path/progress", async (req, res) => {
  try {
    // Check authentication
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

    // If this is a quiz completion
    if (quizScore !== undefined) {
      const isQuizPassed = quizScore >= 60; // Pass threshold
      console.log("[Learning Path] Processing quiz completion:", { isQuizPassed, quizScore });

      try {
        // Start transaction for quiz completion
        const result = await db.transaction(async (tx) => {
          // Check if progress record exists
          const existingProgress = await tx.query.moduleProgress.findFirst({
            where: and(
              eq(moduleProgress.userId, userId),
              eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
              eq(moduleProgress.sectionId, sectionId)
            )
          });

          let progressUpdate;
          if (existingProgress) {
            // Update existing record
            [progressUpdate] = await tx.update(moduleProgress)
              .set({
                completed: isQuizPassed,
                score: quizScore,
                lastAccessed: new Date(),
                completedAt: isQuizPassed ? new Date() : existingProgress.completedAt,
                timeSpent: existingProgress.timeSpent + (timeSpent || 0)
              })
              .where(and(
                eq(moduleProgress.userId, userId),
                eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
                eq(moduleProgress.sectionId, sectionId)
              ))
              .returning();
          } else {
            // Insert new record
            [progressUpdate] = await tx.insert(moduleProgress)
              .values({
                userId,
                moduleId: parseInt(moduleId, 10),
                courseId: parseInt(courseId, 10),
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
            parseInt(courseId, 10)
          );

          return { progressUpdate, courseProgress: updatedProgress };
        });

        console.log("[Learning Path] Transaction completed successfully:", result);
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
              eq(moduleProgress.sectionId, sectionId)
            )
          });

          let progressUpdate;
          if (existingProgress) {
            // Update existing record
            [progressUpdate] = await tx.update(moduleProgress)
              .set({
                completed: completed || existingProgress.completed,
                lastAccessed: new Date(),
                completedAt: completed ? new Date() : existingProgress.completedAt,
                timeSpent: existingProgress.timeSpent + (timeSpent || 0)
              })
              .where(and(
                eq(moduleProgress.userId, userId),
                eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
                eq(moduleProgress.sectionId, sectionId)
              ))
              .returning();
          } else {
            // Insert new record
            [progressUpdate] = await tx.insert(moduleProgress)
              .values({
                userId,
                moduleId: parseInt(moduleId, 10),
                courseId: parseInt(courseId, 10),
                sectionId,
                timeSpent: timeSpent || 0,
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

        console.log("[Learning Path] Regular progress updated:", result);
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

export default router;