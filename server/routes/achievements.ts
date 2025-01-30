import { Router } from "express";
import { db } from "@db";
import { achievements, userAchievements, moduleProgress } from "@db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

// Get all available achievements
router.get("/api/achievements", async (req, res) => {
  try {
    const allAchievements = await db.query.achievements.findMany({
      orderBy: (achievements, { asc }) => [asc(achievements.name)]
    });
    res.json(allAchievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// Get user's earned achievements
router.get("/api/achievements/earned", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const earnedAchievements = await db.query.userAchievements.findMany({
      where: eq(userAchievements.userId, req.session.userId),
      with: {
        achievement: true
      }
    });
    res.json(earnedAchievements);
  } catch (error) {
    console.error("Error fetching earned achievements:", error);
    res.status(500).json({ error: "Failed to fetch earned achievements" });
  }
});

// Check and award module completion certificate
router.post("/api/achievements/check-module-completion", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { moduleId } = req.body;

  try {
    // Get all sections for this module
    const moduleSections = await db.query.moduleProgress.findMany({
      where: and(
        eq(moduleProgress.userId, req.session.userId),
        eq(moduleProgress.moduleId, moduleId)
      )
    });

    // Check if all sections are completed
    const allCompleted = moduleSections.every(section => section.completed);

    if (allCompleted) {
      // Find or create module completion achievement
      const moduleAchievement = await db.query.achievements.findFirst({
        where: and(
          eq(achievements.type, 'certificate'),
          eq(achievements.criteria.moduleId, moduleId)
        )
      });

      if (moduleAchievement) {
        // Check if user already has this achievement
        const existingAward = await db.query.userAchievements.findFirst({
          where: and(
            eq(userAchievements.userId, req.session.userId),
            eq(userAchievements.achievementId, moduleAchievement.id)
          )
        });

        if (!existingAward) {
          // Award the achievement
          const newAward = await db.insert(userAchievements).values({
            userId: req.session.userId,
            achievementId: moduleAchievement.id,
            metadata: {
              type: 'course',
              awardedAt: new Date().toISOString(),
              moduleId,
              nftMetadata: {
                name: `Module ${moduleId} Completion Certificate`,
                description: `Successfully completed Module ${moduleId}`,
                image: "", // Will be generated
                attributes: [
                  {
                    trait_type: "Module",
                    value: moduleId
                  },
                  {
                    trait_type: "Type",
                    value: "Course Completion"
                  }
                ]
              }
            }
          }).returning();

          return res.json({ awarded: true, achievement: newAward[0] });
        }
      }
    }

    res.json({ awarded: false });
  } catch (error) {
    console.error("Error checking module completion:", error);
    res.status(500).json({ error: "Failed to check module completion" });
  }
});

// Award an achievement to a user
router.post("/api/achievements/:achievementId/award", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { achievementId } = req.params;

  try {
    // Check if user already has this achievement
    const existingAward = await db.query.userAchievements.findFirst({
      where: and(
        eq(userAchievements.userId, req.session.userId),
        eq(userAchievements.achievementId, parseInt(achievementId))
      )
    });

    if (existingAward) {
      return res.status(400).json({ error: "Achievement already earned" });
    }

    // Award the achievement
    const newAward = await db.insert(userAchievements).values({
      userId: req.session.userId,
      achievementId: parseInt(achievementId),
      metadata: {
        awardedAt: new Date().toISOString(),
        nftMetadata: {
          name: `Achievement #${achievementId}`,
          description: "Educational achievement NFT",
          image: "", // Will be generated
          attributes: []
        }
      }
    }).returning();

    res.json(newAward[0]);
  } catch (error) {
    console.error("Error awarding achievement:", error);
    res.status(500).json({ error: "Failed to award achievement" });
  }
});

export default router;