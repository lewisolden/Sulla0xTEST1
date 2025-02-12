import { Router } from "express";
import { db } from "@db";
import { moduleProgress, userQuizResponses } from "@db/schema";
import { sql, eq, and } from "drizzle-orm";
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI();

// Update module progress
router.post("/api/learning-path/progress", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { moduleId, courseId, sectionId, timeSpent, completed, quizScore } = req.body;
    const userId = parseInt(req.session.userId, 10);

    // Insert or update module progress
    await db
      .insert(moduleProgress)
      .values({
        userId,
        moduleId: parseInt(moduleId, 10),
        courseId: parseInt(courseId, 10),
        sectionId,
        timeSpent: timeSpent || 0,
        completed: completed || false,
        score: quizScore,
        lastAccessed: new Date(),
        completedAt: completed ? new Date() : null
      })
      .onConflictDoUpdate({
        target: [moduleProgress.userId, moduleProgress.moduleId, moduleProgress.sectionId],
        set: {
          timeSpent: sql`${moduleProgress.timeSpent} + ${timeSpent || 0}`,
          completed: completed || sql`${moduleProgress.completed}`,
          score: quizScore || sql`${moduleProgress.score}`,
          lastAccessed: new Date(),
          completedAt: completed ? new Date() : sql`${moduleProgress.completedAt}`
        }
      });

    // If this was a quiz completion, record the response
    if (quizScore !== undefined) {
      await db.insert(userQuizResponses).values({
        userId,
        moduleId: parseInt(moduleId, 10),
        courseId: parseInt(courseId, 10),
        quizId: parseInt(moduleId, 10), // Assuming quiz IDs match module IDs for now
        isCorrect: quizScore >= 60, // Pass threshold
        selectedAnswer: "quiz_completed", // We'll store actual answers later
        timeSpent: timeSpent || 0,
        answeredAt: new Date()
      });
    }

    // Check if all sections in the module are completed
    if (completed) {
      const moduleSections = await db.query.moduleProgress.findMany({
        where: and(
          eq(moduleProgress.userId, userId),
          eq(moduleProgress.moduleId, parseInt(moduleId, 10))
        )
      });

      const allSectionsCompleted = moduleSections.every(section => section.completed);

      if (allSectionsCompleted) {
        // Update the module's overall completion status
        await db
          .update(moduleProgress)
          .set({
            completed: true,
            completedAt: new Date()
          })
          .where(and(
            eq(moduleProgress.userId, userId),
            eq(moduleProgress.moduleId, parseInt(moduleId, 10))
          ));
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Get personalized learning recommendations
router.get("/api/learning-path/recommendations", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = parseInt(req.session.userId, 10);

    // Get user's progress data
    const userProgress = await db.query.moduleProgress.findMany({
      where: sql`${moduleProgress.userId} = ${userId}`
    });

    // Get quiz results for completed modules
    //  Assuming a table named 'userQuizResponses' exists with columns: userId, moduleId, courseId, is_correct
    const userQuizResponses = db.userQuizResponses; // Replace with your actual table name
    const quizResults: QuizResult[] = await db.select({
      topicId: userQuizResponses.moduleId,
      score: sql`AVG(CASE WHEN is_correct THEN 1 ELSE 0 END)`.mapWith(Number),
      courseId: userQuizResponses.courseId
    })
      .from(userQuizResponses)
      .where(eq(userQuizResponses.userId, userId))
      .groupBy(userQuizResponses.moduleId, userQuizResponses.courseId);


    // Analyze user's learning pattern
    const completedModules = userProgress.filter(p => p.completed).length;
    const averageQuizScore = quizResults.reduce((acc, q) => acc + q.score, 0) / quizResults.length;
    const strugglingTopics = quizResults
      .filter(q => q.score < 0.7) // Less than 70% correct
      .map(q => q.topicId);

    // Generate AI recommendations using OpenAI
    const prompt = `As a cryptocurrency education expert, provide a personalized learning recommendation based on the following user data:
      - Completed modules: ${completedModules}
      - Average quiz score: ${averageQuizScore}
      - Struggling topics: ${strugglingTopics.join(", ")}

      Generate a recommendation that includes:
      1. The next topic they should focus on
      2. Why this topic is recommended
      3. Additional resources that could help
      4. Appropriate difficulty level

      Format the response as a JSON object with the following structure:
      {
        "nextTopic": "topic name",
        "reason": "explanation",
        "suggestedResources": ["resource1", "resource2"],
        "difficulty": "beginner|intermediate|advanced"
      }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    if (!completion.choices[0].message.content) {
      throw new Error("No recommendation generated");
    }

    const recommendation: LearningRecommendation = JSON.parse(completion.choices[0].message.content);

    res.json({
      userStats: {
        completedModules,
        averageQuizScore,
        strugglingTopics
      },
      recommendation
    });

  } catch (error) {
    console.error("Error generating learning recommendations:", error);
    res.status(500).json({ error: "Failed to generate learning recommendations" });
  }
});

export default router;