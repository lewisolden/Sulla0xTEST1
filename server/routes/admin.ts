import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, sql, desc, and, eq, count } from 'drizzle-orm';

const router = Router();

// Get all users with pagination and enrollment counts
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search as string;

    console.log('Admin users route - Request params:', { page, limit, offset, search });

    // Base query for users with enrollment counts
    let query = db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        lastActivity: users.lastActivity,
        enrollmentCount: sql<number>`COUNT(DISTINCT ${courseEnrollments.id})::integer`,
        completedModules: sql<number>`COUNT(CASE WHEN ${courseEnrollments.status} = 'completed' THEN 1 END)::integer`
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId))
      .groupBy(users.id);

    // Add search if provided
    if (search) {
      query = query.where(
        sql`${users.username} ILIKE ${`%${search}%`} OR ${users.email} ILIKE ${`%${search}%`}`
      );
    }

    // Execute the query with pagination
    const usersList = await query
      .limit(limit)
      .offset(offset)
      .orderBy(desc(users.lastActivity));

    console.log('Found users:', usersList.length);

    // Get total count for pagination
    const [totalCount] = await db
      .select({
        count: sql<number>`count(distinct ${users.id})`
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId));

    console.log('Total users count:', totalCount?.count || 0);

    res.json({
      users: usersList,
      pagination: {
        total: Number(totalCount?.count || 0),
        page,
        pageSize: limit,
        totalPages: Math.ceil(Number(totalCount?.count || 0) / limit)
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

// Analytics endpoint with enhanced metrics
router.get('/analytics/users', requireAdmin, async (req, res) => {
  try {
    // Get total users count
    const [totalCount] = await db
      .select({
        count: sql<number>`count(distinct ${users.id})`
      })
      .from(users);

    // Get active users in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [activeUsers] = await db
      .select({
        count: sql<number>`count(distinct ${users.id})`
      })
      .from(users)
      .where(gt(users.lastActivity, sevenDaysAgo));

    // Get enrollment metrics
    const [enrollmentMetrics] = await db
      .select({
        totalEnrollments: sql<number>`count(${courseEnrollments.id})::integer`,
        completedModules: sql<number>`count(case when ${courseEnrollments.status} = 'completed' then 1 end)::integer`,
      })
      .from(courseEnrollments);

    // Get achievement count
    const [achievementCount] = await db
      .select({
        count: sql<number>`count(${userAchievements.id})`
      })
      .from(userAchievements);

    // Get pending feedback count
    const [pendingFeedback] = await db
      .select({
        count: sql<number>`count(${feedback.id})`
      })
      .from(feedback)
      .where(eq(feedback.status, 'pending'));

    // Get user activity data for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activityData = await db
      .select({
        date: sql<string>`date_trunc('day', ${users.lastActivity})::date`,
        activeUsers: sql<number>`count(distinct ${users.id})::integer`,
        completions: sql<number>`count(distinct case when ${courseEnrollments.status} = 'completed' then ${courseEnrollments.id} end)::integer`
      })
      .from(users)
      .leftJoin(courseEnrollments, eq(users.id, courseEnrollments.userId))
      .where(gt(users.lastActivity, thirtyDaysAgo))
      .groupBy(sql`date_trunc('day', ${users.lastActivity})`)
      .orderBy(sql`date_trunc('day', ${users.lastActivity})`);

    const response = {
      totalUsers: Number(totalCount?.count || 0),
      activeUsers: Number(activeUsers?.count || 0),
      totalEnrollments: enrollmentMetrics?.totalEnrollments || 0,
      completedModules: enrollmentMetrics?.completedModules || 0,
      achievementsAwarded: Number(achievementCount?.count || 0),
      pendingFeedback: Number(pendingFeedback?.count || 0),
      userActivityData: activityData.map(item => ({
        date: item.date,
        activeUsers: item.activeUsers,
        completions: item.completions
      }))
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;