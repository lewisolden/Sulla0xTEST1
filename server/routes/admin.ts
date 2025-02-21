import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, count, sql, desc, and, eq } from 'drizzle-orm';

const router = Router();

// Get all users with pagination
router.get('/users', requireAdmin, async (req, res) => {
  try {
    console.log('Admin users route - starting user fetch');
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || '';

    console.log('Query params:', { page, limit, offset, search });

    // Get total count with proper error handling
    const totalCountResult = await db
      .select({ value: count() })
      .from(users);

    const totalCount = totalCountResult[0]?.value || 0;
    console.log('Total users count:', totalCount);

    // Get paginated users with proper error handling
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

    console.log('Fetched users:', allUsers.length);

    // Get enrollment counts with proper error handling
    const userEnrollments = await Promise.all(
      allUsers.map(async (user) => {
        console.log('Fetching enrollments for user:', user.id);
        const enrollmentCountResult = await db
          .select({ value: count() })
          .from(courseEnrollments)
          .where(eq(courseEnrollments.userId, user.id));

        const enrollmentCount = enrollmentCountResult[0]?.value || 0;

        // Get completed modules count
        const completedModulesResult = await db
          .select({ value: count() })
          .from(moduleProgress)
          .where(and(
            eq(moduleProgress.userId, user.id),
            eq(moduleProgress.status, 'completed')
          ));

        const completedModules = completedModulesResult[0]?.value || 0;

        return {
          ...user,
          enrollmentCount,
          completedModules,
        };
      })
    );

    console.log('Sending response with users:', userEnrollments.length);
    res.json({
      users: userEnrollments,
      pagination: {
        total: totalCount,
        page,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit)
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

// Get user analytics
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

export default router;