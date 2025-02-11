import { Router } from 'express';
import { db } from '@db';
import { users, adminUsers, courseEnrollments } from '@db/schema';
import { requireAdmin } from '../auth';
import { gt, count, sql, desc } from 'drizzle-orm';

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