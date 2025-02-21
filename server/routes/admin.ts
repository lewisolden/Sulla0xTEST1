import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, sql, desc, and, eq, count } from 'drizzle-orm';
import express from "express";
//import { eq } from "drizzle-orm"; //already imported above

const router = express.Router();

// Get all users with pagination and search
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search as string;

    // Get users with enrollment counts
    const usersWithEnrollments = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        lastActivity: users.lastActivity,
        enrollmentCount: sql<number>`count(distinct ${courseEnrollments.id})`,
        completedCount: sql<number>`count(distinct case when ${courseEnrollments.status} = 'completed' then ${courseEnrollments.id} end)`
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId))
      .where(
        search
          ? sql`${users.username} ilike ${'%' + search + '%'} or ${users.email} ilike ${'%' + search + '%'}`
          : undefined
      )
      .groupBy(users.id)
      .orderBy(desc(users.lastActivity))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ total }] = await db
      .select({
        total: count()
      })
      .from(users)
      .where(
        search
          ? sql`${users.username} ilike ${'%' + search + '%'} or ${users.email} ilike ${'%' + search + '%'}`
          : undefined
      );

    res.json({
      users: usersWithEnrollments.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        lastActivity: user.lastActivity,
        enrollmentCount: Number(user.enrollmentCount) || 0,
        completedModules: Number(user.completedCount) || 0
      })),
      pagination: {
        total: Number(total || 0),
        page,
        pageSize: limit,
        totalPages: Math.ceil(Number(total || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Error in admin users route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all feedback with pagination
router.get('/feedback', requireAdmin, async (req, res) => {
  try {
    console.log('Admin feedback route - fetching feedback');
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;

    // Get total count
    const [totalCount] = await db
      .select({ count: count() })
      .from(feedback);

    // Build query conditions
    const queryConditions = [];
    if (status) {
      queryConditions.push(eq(feedback.status, status));
    }

    // Get paginated feedback with user information
    const feedbackItems = await db
      .select({
        id: feedback.id,
        type: feedback.type,
        courseId: feedback.courseId,
        rating: feedback.rating,
        feedback: feedback.feedback,
        status: feedback.status,
        createdAt: feedback.createdAt,
        userId: feedback.userId,
        username: users.username,
      })
      .from(feedback)
      .leftJoin(users, eq(feedback.userId, users.id))
      .where(and(...queryConditions))
      .orderBy(desc(feedback.createdAt))
      .limit(limit)
      .offset(offset);

    console.log('Fetched feedback items:', feedbackItems.length);

    res.json({
      feedback: feedbackItems,
      pagination: {
        total: totalCount.count,
        page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      error: 'Failed to fetch feedback',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update feedback status
router.patch('/feedback/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'reviewed', 'addressed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const [updatedFeedback] = await db
      .update(feedback)
      .set({
        status,
        updatedAt: new Date()
      })
      .where(eq(feedback.id, parseInt(id, 10)))
      .returning();

    res.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ 
      error: 'Failed to update feedback',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Analytics dashboard data - REPLACED with edited code
router.get("/admin/analytics/users", requireAdmin, async (req, res) => {
  try {
    const [totalUsers] = await db
      .select({ count: users.id })
      .from(users)
      .count();

    const activeUsers = await db
      .select()
      .from(users)
      .where(
        eq(users.lastActivity as any, 
          db.sql`date_trunc('day', now())`)
      );

    const [totalEnrollments] = await db
      .select({ count: courseEnrollments.id })
      .from(courseEnrollments)
      .count();

    const [completedModules] = await db
      .select({ count: moduleProgress.id })
      .from(moduleProgress)
      .where(eq(moduleProgress.completed, true))
      .count();

    const [achievementsAwarded] = await db
      .select({ count: userAchievements.id })
      .from(userAchievements)
      .count();

    const [pendingFeedback] = await db
      .select({ count: feedback.id })
      .from(feedback)
      .where(eq(feedback.status, 'pending'))
      .count();

    // Get user activity data for the last 7 days
    const userActivityData = await db
      .select({
        date: users.lastActivity,
        count: users.id
      })
      .from(users)
      .where(
        db.sql`${users.lastActivity} >= now() - interval '7 days'`
      )
      .groupBy(users.lastActivity);

    res.json({
      totalUsers: totalUsers?.count || 0,
      activeUsers: activeUsers?.length || 0,
      totalEnrollments: totalEnrollments?.count || 0,
      completedModules: completedModules?.count || 0,
      achievementsAwarded: achievementsAwarded?.count || 0,
      pendingFeedback: pendingFeedback?.count || 0,
      userActivityData
    });
  } catch (error) {
    console.error("Error fetching admin analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;