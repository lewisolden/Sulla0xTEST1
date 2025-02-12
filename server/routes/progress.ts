import { Router } from "express";
import { db } from "@db";
import { moduleProgress } from "@db/schema";
import { eq, and, sql } from "drizzle-orm";

const router = Router();

// Update progress endpoint
router.post("/api/progress/update", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { moduleId, sectionId, completed } = req.body;
    const userId = req.user.id;

    // Check if progress record exists
    const existingProgress = await db.query.moduleProgress.findFirst({
      where: and(
        eq(moduleProgress.userId, userId),
        eq(moduleProgress.moduleId, moduleId),
        eq(moduleProgress.sectionId, sectionId)
      )
    });

    if (existingProgress) {
      // Update existing progress
      await db.update(moduleProgress)
        .set({
          completed,
          lastAccessed: new Date(),
        })
        .where(and(
          eq(moduleProgress.userId, userId),
          eq(moduleProgress.moduleId, moduleId),
          eq(moduleProgress.sectionId, sectionId)
        ));
    } else {
      // Create new progress record
      await db.insert(moduleProgress).values({
        userId,
        moduleId,
        sectionId,
        completed,
        lastAccessed: new Date(),
        timeSpent: 0,
      });
    }

    // Calculate overall module progress
    const allSections = await db.query.moduleProgress.findMany({
      where: and(
        eq(moduleProgress.userId, userId),
        eq(moduleProgress.moduleId, moduleId)
      )
    });

    const completedSections = allSections.filter(section => section.completed).length;
    const totalSections = allSections.length;
    const progress = Math.round((completedSections / totalSections) * 100);

    res.json({
      success: true,
      progress,
      message: "Progress updated successfully"
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Mark quiz complete endpoint
router.post("/api/progress/quiz-complete", async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { moduleId, quizId } = req.body;
    const userId = req.user.id;

    await db.insert(moduleProgress).values({
      userId,
      moduleId,
      sectionId: quizId,
      completed: true,
      lastAccessed: new Date(),
      score: 100, // Quiz is considered passed
      timeSpent: 0,
    }).onConflictDoUpdate({
      target: [moduleProgress.userId, moduleProgress.moduleId, moduleProgress.sectionId],
      set: {
        completed: true,
        lastAccessed: new Date(),
        score: 100,
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error marking quiz complete:", error);
    res.status(500).json({ error: "Failed to mark quiz as complete" });
  }
});

export default router;
