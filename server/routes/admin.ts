import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, sql, desc, and, eq, count } from 'drizzle-orm';

const router = Router();

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

// Analytics dashboard data
router.get('/analytics/users', requireAdmin, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get total and active users
    const [{
      totalUsers,
      activeUsers,
      totalEnrollments,
      completedModules
    }] = await db
      .select({
        totalUsers: count(users.id),
        activeUsers: count(sql`case when ${users.lastActivity} > ${sevenDaysAgo} then 1 end`),
        totalEnrollments: count(courseEnrollments.id),
        completedModules: count(sql`case when ${courseEnrollments.status} = 'completed' then 1 end`)
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId));

    // Get achievement count
    const [{ achievementCount }] = await db
      .select({
        achievementCount: count(userAchievements.id)
      })
      .from(userAchievements);

    // Get pending feedback count
    const [{ pendingCount }] = await db
      .select({
        pendingCount: count(feedback.id)
      })
      .from(feedback)
      .where(eq(feedback.status, 'pending'));

    // Get activity data for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activityData = await db
      .select({
        date: sql<string>`date_trunc('day', ${users.lastActivity})::date`,
        activeUsers: count(users.id),
        completions: count(sql`case when ${courseEnrollments.status} = 'completed' then 1 end`)
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId))
      .where(gt(users.lastActivity, thirtyDaysAgo))
      .groupBy(sql`date_trunc('day', ${users.lastActivity})`)
      .orderBy(sql`date_trunc('day', ${users.lastActivity})`);

    res.json({
      totalUsers: Number(totalUsers || 0),
      activeUsers: Number(activeUsers || 0),
      totalEnrollments: Number(totalEnrollments || 0),
      completedModules: Number(completedModules || 0),
      achievementsAwarded: Number(achievementCount || 0),
      pendingFeedback: Number(pendingCount || 0),
      userActivityData: activityData.map(item => ({
        date: item.date,
        activeUsers: Number(item.activeUsers || 0),
        completions: Number(item.completions || 0)
      }))
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;