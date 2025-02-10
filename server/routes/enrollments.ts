import { Request, Response } from "express";
import { db } from "@db";
import { courseEnrollments, courses } from "@db/schema";
import { eq, and } from "drizzle-orm";

export async function getEnrollments(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    console.log("Fetching enrollments for user:", req.user!.id);
    const userEnrollments = await db.query.courseEnrollments.findMany({
      where: eq(courseEnrollments.userId, req.user!.id),
      with: {
        course: true
      }
    });

    console.log("Found enrollments:", userEnrollments);
    res.json(userEnrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Failed to fetch enrollments", details: error instanceof Error ? error.message : String(error) });
  }
}

export async function createEnrollment(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    console.log("Creating enrollment - User:", req.user!.id, "Course:", courseId);

    // Check if course exists
    const [course] = await db.select().from(courses).where(eq(courses.id, courseId));
    if (!course) {
      console.log("Course not found:", courseId);
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    const [existing] = await db
      .select()
      .from(courseEnrollments)
      .where(
        and(
          eq(courseEnrollments.userId, req.user!.id),
          eq(courseEnrollments.courseId, courseId)
        )
      );

    if (existing) {
      console.log("User already enrolled:", req.user!.id, "Course:", courseId);
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Create enrollment
    const [enrollment] = await db
      .insert(courseEnrollments)
      .values({
        userId: req.user!.id,
        courseId: courseId,
        status: 'active',
        progress: 0,
        metadata: {}
      })
      .returning();

    console.log("Created enrollment:", enrollment);
    res.status(201).json(enrollment);
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ error: "Failed to create enrollment", details: error instanceof Error ? error.message : String(error) });
  }
}