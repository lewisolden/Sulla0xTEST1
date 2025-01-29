import { pgTable, text, serial, integer, boolean, timestamp, foreignKey, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  learningPreferences: jsonb("learning_preferences"), // Store AI learning preferences
  lastActivity: timestamp("last_activity").defaultNow(),
});

export const moduleProgress = pgTable("module_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: integer("module_id").notNull(),
  sectionId: text("section_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  score: integer("score"),
  timeSpent: integer("time_spent"), // Time spent in seconds
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  aiRecommendations: jsonb("ai_recommendations"), // Store AI recommendations
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  question: text("question").notNull(),
  options: text("options").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  order: integer("order").notNull(),
  difficulty: text("difficulty"), // For AI adaptation
});

export const userQuizResponses = pgTable("user_quiz_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  quizId: integer("quiz_id").references(() => quizzes.id).notNull(),
  selectedAnswer: text("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent"), // Time taken to answer
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

// Virtual Wallet System
export const virtualWallets = pgTable("virtual_wallets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  balance: jsonb("balance").notNull(), // Store different crypto balances
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const virtualTransactions = pgTable("virtual_transactions", {
  id: serial("id").primaryKey(),
  walletId: integer("wallet_id").references(() => virtualWallets.id).notNull(),
  type: text("type").notNull(), // 'buy', 'sell', 'transfer'
  amount: text("amount").notNull(),
  currency: text("currency").notNull(),
  price: text("price").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").notNull(), // 'completed', 'pending', 'failed'
});

// Achievement System
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  criteria: jsonb("criteria").notNull(), // Conditions to earn
  nftMetadata: jsonb("nft_metadata"), // NFT certificate data
  imageUrl: text("image_url"),
  type: text("type").notNull(), // 'badge', 'certificate', 'milestone'
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
  nftTokenId: text("nft_token_id"), // If minted as NFT
  metadata: jsonb("metadata"), // Additional achievement data
});

// Glossary System
export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").unique().notNull(),
  definition: text("definition").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  visualAid: text("visual_aid"), // URL to visual explanation
  examples: jsonb("examples"), // Array of example usages
  relatedTerms: jsonb("related_terms"), // Array of related term IDs
});

// Relations
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

// Schemas
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

// Types
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