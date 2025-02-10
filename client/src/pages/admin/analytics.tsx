import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalEnrollments: number;
  completedModules: number;
  achievementsAwarded: number;
  userActivityData: {
    date: string;
    activeUsers: number;
    completions: number;
  }[];
  moduleCompletionData: {
    name: string;
    value: number;
  }[];
  weeklyRetentionData: {
    week: string;
    retention: number;
  }[];
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminAnalytics() {
  const { data: analytics, isLoading } = useQuery<Analytics>({
    queryKey: ["admin", "analytics", "detailed"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/detailed");
      if (!response.ok) {
        throw new Error("Failed to fetch detailed analytics");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-[300px]" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Detailed Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Daily User Activity</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.userActivityData}
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

        {/* Module Completion Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Module Completion Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.moduleCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics?.moduleCompletionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weekly Retention Rate */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Retention Rate</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics?.weeklyRetentionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Metrics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Completion Rate</span>
              <span className="font-semibold">
                {((analytics?.completedModules || 0) / (analytics?.totalEnrollments || 1) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active User Rate</span>
              <span className="font-semibold">
                {((analytics?.activeUsers || 0) / (analytics?.totalUsers || 1) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Achievements per User</span>
              <span className="font-semibold">
                {((analytics?.achievementsAwarded || 0) / (analytics?.totalUsers || 1)).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
