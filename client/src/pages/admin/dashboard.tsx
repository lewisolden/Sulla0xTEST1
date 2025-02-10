import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalEnrollments: number;
  completedModules: number;
  achievementsAwarded: number;
}

export default function AdminDashboard() {
  const { data: analytics, isLoading } = useQuery<Analytics>({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/users");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      return response.json();
    },
  });

  if (isLoading) {
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/users">View All Users</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{analytics?.totalUsers || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Active Users (7d)</h3>
          <p className="text-3xl font-bold">{analytics?.activeUsers || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Total Enrollments</h3>
          <p className="text-3xl font-bold">{analytics?.totalEnrollments || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Completed Modules</h3>
          <p className="text-3xl font-bold">{analytics?.completedModules || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Achievements Awarded</h3>
          <p className="text-3xl font-bold">{analytics?.achievementsAwarded || 0}</p>
        </Card>
      </div>
    </div>
  );
}
