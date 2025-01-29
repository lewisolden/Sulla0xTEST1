import { pgTable, text, serial, integer, boolean, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON string array of options
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  order: integer("order").notNull(),
});

export const userQuizResponses = pgTable("user_quiz_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  selectedAnswer: text("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

// Relations
export const quizzesRelations = relations(quizzes, ({ many }) => ({
  responses: many(userQuizResponses),
}));

export const userQuizResponsesRelations = relations(userQuizResponses, ({ one }) => ({
  user: one(users, {
    fields: [userQuizResponses.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [userQuizResponses.quizId],
    references: [quizzes.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertQuizSchema = createInsertSchema(quizzes);
export const selectQuizSchema = createSelectSchema(quizzes);
export const insertUserQuizResponseSchema = createInsertSchema(userQuizResponses);
export const selectUserQuizResponseSchema = createSelectSchema(userQuizResponses);

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;
export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertUserQuizResponse = typeof userQuizResponses.$inferInsert;
export type SelectUserQuizResponse = typeof userQuizResponses.$inferSelect;