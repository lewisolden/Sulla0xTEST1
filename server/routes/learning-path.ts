import { Router } from "express";
import { db } from "@db";
import { moduleProgress, courseEnrollments } from "@db/schema";
import { sql, eq, and } from "drizzle-orm";

const router = Router();

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
          console.log("[Learning Path] Starting transaction");

          // First check if user is enrolled, if not, enroll them
          const enrollment = await tx.query.courseEnrollments.findFirst({
            where: and(
              eq(courseEnrollments.userId, userId),
              eq(courseEnrollments.courseId, parseInt(courseId, 10))
            )
          });

          if (!enrollment) {
            console.log("[Learning Path] Creating new enrollment");
            await tx.insert(courseEnrollments).values({
              userId,
              courseId: parseInt(courseId, 10),
              status: 'active',
              progress: 0,
              enrolledAt: new Date(),
              lastAccessedAt: new Date()
            });
          }

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

          if (isQuizPassed) {
            console.log("[Learning Path] Updating course enrollment progress");
            await tx.update(courseEnrollments)
              .set({
                progress: sql`LEAST(${courseEnrollments.progress} + 1, 100)`,
                lastAccessedAt: new Date()
              })
              .where(and(
                eq(courseEnrollments.userId, userId),
                eq(courseEnrollments.courseId, parseInt(courseId, 10))
              ));
          }

          return { progressUpdate };
        });

        console.log("[Learning Path] Transaction completed successfully:", result);
        res.json({ 
          success: true,
          message: isQuizPassed ? "Quiz completed successfully!" : "Quiz submitted but did not pass threshold"
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

        // Check if progress record exists
        const existingProgress = await db.query.moduleProgress.findFirst({
          where: and(
            eq(moduleProgress.userId, userId),
            eq(moduleProgress.moduleId, parseInt(moduleId, 10)),
            eq(moduleProgress.sectionId, sectionId)
          )
        });

        let regularUpdate;
        if (existingProgress) {
          // Update existing record
          [regularUpdate] = await db.update(moduleProgress)
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
          [regularUpdate] = await db.insert(moduleProgress)
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

        console.log("[Learning Path] Regular progress updated:", regularUpdate);
        res.json({ success: true });
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