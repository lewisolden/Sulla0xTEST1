import { Router } from "express";
import { db } from "@db";
import { achievements, userAchievements } from "@db/schema";
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
        // NFT metadata will be added here
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
