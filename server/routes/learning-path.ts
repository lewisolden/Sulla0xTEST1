import { Router } from "express";
import { db } from "@db";
import { moduleProgress, userQuizResponses, courseEnrollments } from "@db/schema";
import { sql, eq, and } from "drizzle-orm";

const router = Router();

// Update module progress
router.post("/api/learning-path/progress", async (req, res) => {
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

  try {
    const { moduleId, courseId, sectionId, timeSpent, completed, quizScore } = req.body;

    console.log("[Learning Path] Progress update request:", {
      userId,
      moduleId,
      courseId,
      sectionId,
      timeSpent,
      completed,
      quizScore
    });

    // If this is a quiz completion
    if (quizScore !== undefined) {
      const isQuizPassed = quizScore >= 60; // Pass threshold
      console.log("[Learning Path] Processing quiz completion:", { isQuizPassed, quizScore });

      try {
        // Start transaction for quiz completion
        const result = await db.transaction(async (tx) => {
          // First check if user is enrolled, if not, enroll them
          let enrollment = await tx.query.courseEnrollments.findFirst({
            where: and(
              eq(courseEnrollments.userId, userId),
              eq(courseEnrollments.courseId, parseInt(courseId, 10))
            )
          });

          if (!enrollment) {
            console.log("[Learning Path] User not enrolled, creating enrollment");
            const [newEnrollment] = await tx.insert(courseEnrollments).values({
              userId,
              courseId: parseInt(courseId, 10),
              status: 'active',
              progress: 0,
              enrolledAt: new Date(),
              lastAccessedAt: new Date()
            }).returning();
            enrollment = newEnrollment;
            console.log("[Learning Path] Created new enrollment:", enrollment);
          }

          // Record quiz response
          const [quizResponse] = await tx.insert(userQuizResponses).values({
            userId,
            moduleId: parseInt(moduleId, 10),
            courseId: parseInt(courseId, 10),
            quizId: parseInt(moduleId, 10),
            isCorrect: isQuizPassed,
            selectedAnswer: "quiz_completed",
            timeSpent: timeSpent || 0,
            answeredAt: new Date()
          }).returning();

          console.log("[Learning Path] Quiz response recorded:", quizResponse);

          // Update module progress
          const [progressUpdate] = await tx.insert(moduleProgress).values({
            userId,
            moduleId: parseInt(moduleId, 10),
            courseId: parseInt(courseId, 10),
            sectionId,
            timeSpent: timeSpent || 0,
            completed: isQuizPassed,
            score: quizScore,
            lastAccessed: new Date(),
            completedAt: isQuizPassed ? new Date() : null,
            aiRecommendations: null
          })
          .onConflictDoUpdate({
            target: [moduleProgress.userId, moduleProgress.moduleId, moduleProgress.sectionId],
            set: {
              completed: isQuizPassed,
              score: quizScore,
              lastAccessed: new Date(),
              completedAt: isQuizPassed ? new Date() : sql`${moduleProgress.completedAt}`,
              timeSpent: sql`${moduleProgress.timeSpent} + ${timeSpent || 0}`
            }
          })
          .returning();

          console.log("[Learning Path] Progress updated:", progressUpdate);

          // Update course enrollment progress if quiz is passed
          if (isQuizPassed) {
            const [enrollmentUpdate] = await tx.update(courseEnrollments)
              .set({
                progress: sql`LEAST(${courseEnrollments.progress} + 1, 100)`,
                lastAccessedAt: new Date()
              })
              .where(and(
                eq(courseEnrollments.userId, userId),
                eq(courseEnrollments.courseId, parseInt(courseId, 10))
              ))
              .returning();

            console.log("[Learning Path] Course enrollment updated:", enrollmentUpdate);
          }

          return { quizResponse, progressUpdate };
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
      console.log("[Learning Path] Processing regular progress update");

      const regularUpdate = await db.insert(moduleProgress).values({
        userId,
        moduleId: parseInt(moduleId, 10),
        courseId: parseInt(courseId, 10),
        sectionId,
        timeSpent: timeSpent || 0,
        completed: completed || false,
        lastAccessed: new Date(),
        completedAt: completed ? new Date() : null
      })
      .onConflictDoUpdate({
        target: [moduleProgress.userId, moduleProgress.moduleId, moduleProgress.sectionId],
        set: {
          completed: completed || sql`${moduleProgress.completed}`,
          lastAccessed: new Date(),
          completedAt: completed ? new Date() : sql`${moduleProgress.completedAt}`,
          timeSpent: sql`${moduleProgress.timeSpent} + ${timeSpent || 0}`
        }
      })
      .returning();

      console.log("[Learning Path] Regular progress updated:", regularUpdate);
      res.json({ success: true });
    }
  } catch (error) {
    console.error("[Learning Path] Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

export default router;