import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments, moduleProgress, userAchievements, feedback } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, sql, desc, and, eq, count } from 'drizzle-orm';

const router = Router();

// Get all users with pagination
router.get('/users', requireAdmin, async (req, res) => {
  try {
    console.log('Admin users route - starting user fetch');

    // Simple query to get all users
    const usersResult = await db.select().from(users);
    console.log('Raw query result:', usersResult);

    // Map users to expected format
    const mappedUsers = usersResult.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      lastActivity: user.lastActivity,
      enrollmentCount: 0, // We'll enhance this later with actual counts
      completedModules: 0 // We'll enhance this later with actual counts
    }));

    console.log('Mapped users:', mappedUsers);

    res.json({
      users: mappedUsers,
      pagination: {
        total: mappedUsers.length,
        page: 1,
        pageSize: mappedUsers.length,
        totalPages: 1
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
      .select({
        count: sql<number>`count(*)`
      })
      .from(users);

    console.log('Total users count:', userCountResult);

    const response = {
      totalUsers: Number(userCountResult.count || 0),
      activeUsers: 0,
      totalEnrollments: 0,
      avgEnrollmentsPerUser: 0,
      userGrowth: {
        last30Days: 0,
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