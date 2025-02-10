import { pgTable, text, serial, integer, boolean, timestamp, foreignKey, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  learningPreferences: jsonb("learning_preferences"),
  lastActivity: timestamp("last_activity").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  subject: text("subject").notNull(),
  level: text("level").notNull(),
  modules: jsonb("modules").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  status: text("status").notNull().default('active'),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(),
  progress: integer("progress").default(0),
  metadata: jsonb("metadata"),
});

export const moduleProgress = pgTable("module_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: integer("module_id").notNull(),
  sectionId: text("section_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  score: integer("score"),
  timeSpent: integer("time_spent"),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  aiRecommendations: jsonb("ai_recommendations"),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  question: text("question").notNull(),
  options: text("options").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  order: integer("order").notNull(),
  difficulty: text("difficulty"),
});

export const userQuizResponses = pgTable("user_quiz_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  selectedAnswer: text("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent"),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

export const virtualWallets = pgTable("virtual_wallets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  balance: jsonb("balance").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const virtualTransactions = pgTable("virtual_transactions", {
  id: serial("id").primaryKey(),
  walletId: integer("wallet_id").references(() => virtualWallets.id).notNull(),
  type: text("type").notNull(),
  amount: text("amount").notNull(),
  currency: text("currency").notNull(),
  price: text("price").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").notNull(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  criteria: jsonb("criteria").notNull(),
  nftMetadata: jsonb("nft_metadata"),
  imageUrl: text("image_url"),
  type: text("type").notNull(),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  nftTokenId: text("nft_token_id"),
  metadata: jsonb("metadata"),
});

export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").unique().notNull(),
  definition: text("definition").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  visualAid: text("visual_aid"),
  examples: jsonb("examples"),
  relatedTerms: jsonb("related_terms"),
});

export const moduleProgressRelations = relations(moduleProgress, ({ one }) => ({
  user: one(users, {
    fields: [moduleProgress.userId],
    references: [users.id],
  }),
}));

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

export const virtualWalletRelations = relations(virtualWallets, ({ one, many }) => ({
  user: one(users, {
    fields: [virtualWallets.userId],
    references: [users.id],
  }),
  transactions: many(virtualTransactions),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const courseEnrollmentRelations = relations(courseEnrollments, ({ one }) => ({
  user: one(users, {
    fields: [courseEnrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  enrollments: many(courseEnrollments),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertModuleProgressSchema = createInsertSchema(moduleProgress);
export const selectModuleProgressSchema = createSelectSchema(moduleProgress);
export const insertQuizSchema = createInsertSchema(quizzes);
export const selectQuizSchema = createSelectSchema(quizzes);
export const insertUserQuizResponseSchema = createInsertSchema(userQuizResponses);
export const selectUserQuizResponseSchema = createSelectSchema(userQuizResponses);
export const insertVirtualWalletSchema = createInsertSchema(virtualWallets);
export const selectVirtualWalletSchema = createSelectSchema(virtualWallets);
export const insertAchievementSchema = createInsertSchema(achievements);
export const selectAchievementSchema = createSelectSchema(achievements);
export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms);
export const selectGlossaryTermSchema = createSelectSchema(glossaryTerms);
export const insertCourseSchema = createInsertSchema(courses);
export const selectCourseSchema = createSelectSchema(courses);
export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments);
export const selectCourseEnrollmentSchema = createSelectSchema(courseEnrollments);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertModuleProgress = typeof moduleProgress.$inferInsert;
export type SelectModuleProgress = typeof moduleProgress.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;
export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertUserQuizResponse = typeof userQuizResponses.$inferInsert;
export type SelectUserQuizResponse = typeof userQuizResponses.$inferSelect;
export type InsertVirtualWallet = typeof virtualWallets.$inferInsert;
export type SelectVirtualWallet = typeof virtualWallets.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;
export type SelectAchievement = typeof achievements.$inferSelect;
export type InsertGlossaryTerm = typeof glossaryTerms.$inferInsert;
export type SelectGlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
export type SelectCourse = typeof courses.$inferSelect;
export type InsertCourseEnrollment = typeof courseEnrollments.$inferInsert;
export type SelectCourseEnrollment = typeof courseEnrollments.$inferSelect;