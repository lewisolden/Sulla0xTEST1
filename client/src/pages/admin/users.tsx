import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  lastActivity: string;
  enrollmentCount: number;
  completedModules: number;
}

interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<UsersResponse>({
    queryKey: ["admin", "users", page],
    queryFn: async () => {
      const response = await fetch(`/api/admin/users?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => window.history.back()}>Back to Dashboard</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Completed Modules</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              data?.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.lastActivity).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.enrollmentCount}</TableCell>
                  <TableCell>{user.completedModules}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center p-4">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            Previous
          </Button>
          <span>
            Page {page} of {data?.pagination.totalPages || 1}
          </span>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={
              !data?.pagination.totalPages ||
              page === data.pagination.totalPages ||
              isLoading
            }
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
