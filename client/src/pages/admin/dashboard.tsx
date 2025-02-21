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
  ResponsiveContainer
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
  Award,
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
      const response = await fetch("/api/admin/analytics", {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
          <h2 className="font-semibold text-destructive">Error Loading Dashboard</h2>
          <p className="mt-2">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    );
  }

  const metrics = [
    { title: "Total Users", value: analytics?.totalUsers || 0, icon: Users, color: "blue" },
    { title: "Active Users", value: analytics?.activeUsers || 0, icon: Activity, color: "green" },
    { title: "Course Enrollments", value: analytics?.totalEnrollments || 0, icon: BookOpen, color: "purple" },
    { title: "Completed Modules", value: analytics?.completedModules || 0, icon: Trophy, color: "yellow" },
    { title: "Achievements Awarded", value: analytics?.achievementsAwarded || 0, icon: Award, color: "pink" },
    { title: "Pending Feedback", value: analytics?.pendingFeedback || 0, icon: MessageSquare, color: "orange" },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className={`bg-${metric.color}-50`}>
            <CardContent className="pt-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-24 mb-4" />
                  <Skeleton className="h-6 w-12" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-3 bg-${metric.color}-100 rounded-full`}>
                      <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
                    </div>
                    <h3 className="font-medium">{metric.title}</h3>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && analytics?.userActivityData && (
        <Card className="p-6 mt-6">
          <CardHeader>
            <CardTitle>User Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="activeUsers" name="Active Users" fill="#8884d8" />
                  <Bar dataKey="completions" name="Completions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/admin/users">
                Manage Users
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/admin/feedback">
                Review Feedback
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <p>All systems operational</p>
              </div>
              <p className="text-sm text-gray-500">Last checked: {new Date().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}