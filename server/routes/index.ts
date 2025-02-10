import { Express } from "express";
import { getEnrollments, createEnrollment } from "./enrollments";

export function registerRoutes(app: Express) {
  app.get("/api/enrollments", getEnrollments);
  app.post("/api/enrollments", createEnrollment);
}
