import { Router } from "express";
import { db } from "@db";
import { courseEnrollments } from "@db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

// Handle course enrollment
router.post("/api/enrollments", async (req, res) => {
  console.log("Enrollment attempt - User:", req.user, "Body:", req.body);

  if (!req.user?.id) {
    console.log("Enrollment failed - No authenticated user");
    return res.status(401).json({ error: "Unauthorized", message: "Please log in to enroll in courses" });
  }

  const { courseId } = req.body;
  if (!courseId) {
    console.log("Enrollment failed - No courseId provided");
    return res.status(400).json({ error: "Bad Request", message: "Course ID is required" });
  }

  try {
    console.log(`Checking existing enrollment for user ${req.user.id} in course ${courseId}`);

    // Check if user is already enrolled
    const existingEnrollment = await db.query.courseEnrollments.findFirst({
      where: and(
        eq(courseEnrollments.userId, req.user.id),
        eq(courseEnrollments.courseId, courseId)
      ),
    });

    if (existingEnrollment) {
      console.log("User already enrolled in this course");
      return res.status(400).json({ 
        error: "Already Enrolled", 
        message: "You are already enrolled in this course" 
      });
    }

    console.log("Creating new enrollment");
    // Create new enrollment
    const newEnrollment = await db.insert(courseEnrollments).values({
      userId: req.user.id,
      courseId: courseId,
      status: 'active',
      progress: 0
    }).returning();

    console.log("Enrollment successful:", newEnrollment[0]);
    res.json(newEnrollment[0]);
  } catch (error) {
    console.error("Detailed enrollment error:", error);
    res.status(500).json({ 
      error: "Enrollment Failed", 
      message: "Failed to enroll in the course. Please try again later." 
    });
  }
});

// Get user enrollments
router.get("/api/enrollments", async (req, res) => {
  console.log("Fetching enrollments for user:", req.user?.id);

  if (!req.user?.id) {
    console.log("Enrollment fetch failed - No authenticated user");
    return res.status(401).json({ error: "Unauthorized", message: "Please log in to view enrollments" });
  }

  try {
    const userEnrollments = await db.query.courseEnrollments.findMany({
      where: eq(courseEnrollments.userId, req.user.id),
      with: {
        course: true
      }
    });

    console.log("Successfully fetched enrollments:", userEnrollments);
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