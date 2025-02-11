import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, count, sql } from 'drizzle-orm';

const router = Router();

// Get all users
router.get('/users', requireAdmin, async (req, res) => {
  try {
    console.log('Admin users route - fetching all users');
    const allUsers = await db.select().from(users);
    res.json(allUsers.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      lastActivity: user.lastActivity,
      learningPreferences: user.learningPreferences
    })));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
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