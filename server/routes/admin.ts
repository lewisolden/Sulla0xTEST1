import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, count, sql, desc, and, eq } from 'drizzle-orm';

const router = Router();

// Get all users with pagination
router.get('/users', requireAdmin, async (req, res) => {
  try {
    console.log('Admin users route - fetching users');
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || '';

    // Get total count
    const [totalCount] = await db
      .select({ count: count() })
      .from(users);

    // Get paginated users
    const allUsers = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        lastActivity: users.lastActivity,
        learningPreferences: users.learningPreferences
      })
      .from(users)
      .where(
        search 
          ? sql`${users.username} ILIKE ${`%${search}%`} OR ${users.email} ILIKE ${`%${search}%`}`
          : sql`1=1`
      )
      .orderBy(desc(users.lastActivity))
      .limit(limit)
      .offset(offset);

    // Get enrollment counts for each user
    const userEnrollments = await Promise.all(
      allUsers.map(async (user) => {
        const [enrollmentCount] = await db
          .select({ count: count() })
          .from(courseEnrollments)
          .where(sql`${courseEnrollments.userId} = ${user.id}`);

        return {
          ...user,
          enrollmentCount: enrollmentCount.count,
          completedModules: 0, // We'll implement this when module tracking is added
        };
      })
    );

    res.json({
      users: userEnrollments,
      pagination: {
        total: totalCount.count,
        page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get detailed analytics data
router.get('/analytics/detailed', requireAdmin, async (req, res) => {
  try {
    console.log('Admin analytics route - starting detailed analytics calculation');

    // Calculate date ranges
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    // Get total users and active users
    const [userCountResult] = await db
      .select({ value: count() })
      .from(users);

    const [activeUsersResult] = await db
      .select({ value: count() })
      .from(users)
      .where(gt(users.lastActivity, sevenDaysAgo));

    // Get total enrollments and completed modules
    const [enrollmentsResult] = await db
      .select({ value: count() })
      .from(courseEnrollments);

    const [completedModulesResult] = await db
      .select({ value: count() })
      .from(moduleProgress)
      .where(eq(moduleProgress.completed, true));

    // Get achievements data
    const [achievementsResult] = await db
      .select({ value: count() })
      .from(userAchievements);

    // Calculate user activity data for the last 30 days
    const userActivityData = await Promise.all(
      Array.from({ length: 30 }, async (_, i) => {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const nextDate = new Date(date.getTime() + (24 * 60 * 60 * 1000));

        const [activeUsers] = await db
          .select({ count: count() })
          .from(users)
          .where(and(
            gt(users.lastActivity, date),
            sql`${users.lastActivity} < ${nextDate}`
          ));

        const [completions] = await db
          .select({ count: count() })
          .from(moduleProgress)
          .where(and(
            eq(moduleProgress.completed, true),
            gt(moduleProgress.completedAt, date),
            sql`${moduleProgress.completedAt} < ${nextDate}`
          ));

        return {
          date: date.toISOString().split('T')[0],
          activeUsers: activeUsers.count,
          completions: completions.count
        };
      })
    );

    // Calculate module completion distribution
    const moduleCompletionData = await db
      .select({
        moduleId: moduleProgress.moduleId,
        completions: sql<number>`count(*)::integer`
      })
      .from(moduleProgress)
      .where(eq(moduleProgress.completed, true))
      .groupBy(moduleProgress.moduleId)
      .orderBy(moduleProgress.moduleId);

    // Calculate weekly retention
    const weeklyRetentionData = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const weekStart = new Date(now.getTime() - ((i + 1) * 7 * 24 * 60 * 60 * 1000));
        const weekEnd = new Date(weekStart.getTime() + (7 * 24 * 60 * 60 * 1000));

        const [totalUsers] = await db
          .select({ count: count() })
          .from(users)
          .where(sql`${users.createdAt} < ${weekEnd}`);

        const [activeUsers] = await db
          .select({ count: count() })
          .from(users)
          .where(and(
            sql`${users.createdAt} < ${weekEnd}`,
            gt(users.lastActivity, weekStart)
          ));

        return {
          week: weekStart.toISOString().split('T')[0],
          retention: totalUsers.count > 0 ? (activeUsers.count / totalUsers.count) * 100 : 0
        };
      })
    );

    const response = {
      totalUsers: userCountResult.value,
      activeUsers: activeUsersResult.value,
      totalEnrollments: enrollmentsResult.value,
      completedModules: completedModulesResult.value,
      achievementsAwarded: achievementsResult.value,
      userActivityData: userActivityData.reverse(),
      moduleCompletionData: moduleCompletionData.map(item => ({
        name: `Module ${item.moduleId}`,
        value: item.completions
      })),
      weeklyRetentionData,
      userGrowth: {
        last30Days: activeUsersResult.value,
      }
    };

    console.log('Sending detailed analytics response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching detailed analytics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user analytics (original route remains largely the same)
router.get('/analytics/users', requireAdmin, async (req, res) => {
  try {
    console.log('Admin analytics route - starting analytics calculation');

    // Get total users count
    const [userCountResult] = await db
      .select({ value: count() })
      .from(users);
    console.log('Total users count:', userCountResult);

    // Get active users in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [activeUsersResult] = await db
      .select({ value: count() })
      .from(users)
      .where(gt(users.lastActivity, thirtyDaysAgo));
    console.log('Active users count:', activeUsersResult);

    // Get total enrollments
    const [enrollmentsResult] = await db
      .select({ value: count() })
      .from(courseEnrollments);
    console.log('Total enrollments:', enrollmentsResult);

    // Calculate average enrollments per user
    const avgEnrollmentsPerUser = userCountResult.value > 0 
      ? enrollmentsResult.value / userCountResult.value 
      : 0;

    const response = {
      totalUsers: userCountResult.value,
      activeUsers: activeUsersResult.value,
      totalEnrollments: enrollmentsResult.value,
      avgEnrollmentsPerUser: Number(avgEnrollmentsPerUser.toFixed(2)),
      userGrowth: {
        last30Days: activeUsersResult.value,
      }
    };
    console.log('Sending analytics response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all feedback with pagination
router.get('/feedback', requireAdmin, async (req, res) => {
  try {
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

export default router;