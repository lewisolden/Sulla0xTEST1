import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Users, BookOpen, Trophy, Activity, MessageSquare } from "lucide-react";

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
  const { data: analytics, isLoading: loadingAnalytics } = useQuery<Analytics>({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/users");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return response.json();
    },
  });

  const loadingMetrics = loadingAnalytics;

  if (loadingMetrics) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/analytics">Detailed Analytics</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/feedback">Manage Feedback</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users">Manage Users</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Total Users</h3>
              <p className="text-3xl font-bold">{analytics?.totalUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Active Users (7d)</h3>
              <p className="text-3xl font-bold">{analytics?.activeUsers || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Total Enrollments</h3>
              <p className="text-3xl font-bold">{analytics?.totalEnrollments || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Completed Modules</h3>
              <p className="text-3xl font-bold">{analytics?.completedModules || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Achievements</h3>
              <p className="text-3xl font-bold">{analytics?.achievementsAwarded || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Pending Feedback</p>
                <p className="text-2xl font-bold text-purple-900">
                  {loadingMetrics ? "..." : analytics?.pendingFeedback || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">User Activity Trends</h2>
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
      </Card>
    </div>
  );
}