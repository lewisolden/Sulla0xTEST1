import { Router } from "express";
import { db } from "@db";
import { courseEnrollments } from "@db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

// Handle course enrollment
router.post("/api/enrollments", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized", message: "Please log in to enroll in courses" });
  }

  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: "Bad Request", message: "Course ID is required" });
  }

  try {
    const userId = parseInt(req.session.userId, 10);
    // Check if user is already enrolled
    const existingEnrollment = await db.query.courseEnrollments.findFirst({
      where: and(
        eq(courseEnrollments.userId, userId),
        eq(courseEnrollments.courseId, courseId)
      ),
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        error: "Already Enrolled", 
        message: "You are already enrolled in this course" 
      });
    }

    // Create new enrollment
    const newEnrollment = await db.insert(courseEnrollments).values({
      userId: userId,
      courseId: courseId,
      status: 'active',
      progress: 0
    }).returning();

    res.json(newEnrollment[0]);
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ 
      error: "Enrollment Failed", 
      message: "Failed to enroll in the course. Please try again later." 
    });
  }
});

// Get user enrollments
router.get("/api/enrollments", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized", message: "Please log in to view enrollments" });
  }

  try {
    const userId = parseInt(req.session.userId, 10);
    const userEnrollments = await db.query.courseEnrollments.findMany({
      where: eq(courseEnrollments.userId, userId),
      with: {
        course: true
      }
    });

    res.json(userEnrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ 
      error: "Fetch Failed", 
      message: "Failed to fetch enrollments. Please try again later." 
    });
  }
});

export default router;