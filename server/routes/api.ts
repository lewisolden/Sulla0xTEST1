import { Router } from 'express';
import { sendTestEmail } from '../services/email';
import { z } from 'zod';
import { db } from "@db";
import { feedback } from "@db/schema";

const router = Router();

// Feedback schema validation
const feedbackSchema = z.object({
  type: z.enum(['course', 'general', 'bug']),
  courseId: z.number().optional(),
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().min(1, "Feedback is required"),
});

// Feedback endpoint
router.post("/feedback", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Must be logged in to submit feedback" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Invalid user session" });
    }

    const result = feedbackSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid feedback data", 
        details: result.error.issues 
      });
    }

    const feedbackData = result.data;

    // Insert feedback into database
    const [newFeedback] = await db.insert(feedback)
      .values({
        userId,
        type: feedbackData.type,
        courseId: feedbackData.courseId,
        rating: feedbackData.rating,
        feedback: feedbackData.feedback,
        createdAt: new Date(),
      })
      .returning();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback
    });

  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ 
      error: "Failed to submit feedback",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
});

// Test email endpoint
router.post("/test-email", async (req, res) => {
  try {
    console.log('Test email endpoint called');
    const result = await sendTestEmail();
    if (result.success) {
      res.json({ 
        message: "Test email sent successfully",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({ 
        error: "Failed to send test email",
        details: result.error,
        note: "Make sure your domain mail.sullacrypto.com is verified and you're using a correct sending address (e.g., test@mail.sullacrypto.com)"
      });
    }
  } catch (error) {
    console.error("Error in test email endpoint:", error);
    res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router;