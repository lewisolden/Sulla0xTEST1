import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt } from 'drizzle-orm';

const router = Router();

// Get all users
router.get('/users', requireAdmin, async (req, res) => {
  try {
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
    const userCount = await db.select().from(users);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsersLast30Days = await db
      .select()
      .from(users)
      .where(gt(users.lastActivity, thirtyDaysAgo));

    res.json({
      totalUsers: userCount.length,
      activeUsers: activeUsersLast30Days.length,
      userGrowth: {
        last30Days: activeUsersLast30Days.length,
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;