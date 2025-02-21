import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  BookOpen,
  Trophy,
  Activity,
  MessageSquare,
  Settings,
  BarChart3,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalEnrollments: number;
  completedModules: number;
  achievementsAwarded: number;
  pendingFeedback: number;
  userActivityData: {
    date: string;
    activeUsers: number;
    completions: number;
  }[];
}

export default function AdminDashboard() {
  const { data: analytics, isLoading, error } = useQuery<Analytics>({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/users", {
        credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch analytics");
      }
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <h2 className="font-semibold">Error Loading Dashboard</h2>
          </div>
          <p className="mt-2 text-red-600">{(error as Error).message}</p>
          <div className="mt-4">
            <Button variant="outline" asChild>
              <Link href="/admin/login" className="inline-flex items-center">
                Return to Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-8 w-24 mb-4" />
              <Skeleton className="h-6 w-12" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{analytics?.totalUsers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">{analytics?.activeUsers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Enrollments</p>
                <p className="text-2xl font-bold">{analytics?.totalEnrollments || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold">{analytics?.completedModules || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Achievements</p>
                <p className="text-2xl font-bold">{analytics?.achievementsAwarded || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Feedback</p>
                <p className="text-2xl font-bold">{analytics?.pendingFeedback || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Section */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-purple-900">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-purple-800">
                Manage user accounts, roles, and permissions. Monitor user activity and engagement.
              </p>
              <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/users" className="flex items-center justify-center">
                  Manage Users
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Management Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">Feedback Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-blue-800">
                Review and respond to user feedback. Track issues and improvement suggestions.
              </p>
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/feedback" className="flex items-center justify-center">
                  Manage Feedback
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.userActivityData || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activeUsers" name="Active Users" fill="#4f46e5" />
                <Bar dataKey="completions" name="Completions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}