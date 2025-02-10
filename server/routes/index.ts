import { Express } from "express";
import { getEnrollments, createEnrollment } from "./enrollments";
import { setupAuth } from "../auth";

export function registerRoutes(app: Express) {
  // Set up authentication first
  setupAuth(app);

  // Then register other routes
  app.get("/api/enrollments", getEnrollments);
  app.post("/api/enrollments", createEnrollment);
}