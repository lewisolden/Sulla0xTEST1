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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { toast } = useToast();

  const { data, isLoading } = useQuery<UsersResponse>({
    queryKey: ["admin", "users", page, search],
    queryFn: async () => {
      const response = await fetch(
        `/api/admin/users?page=${page}&limit=10&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select users to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/users/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userIds: selectedUsers }),
      });

      if (!response.ok) throw new Error("Failed to perform bulk action");

      toast({
        title: "Success",
        description: `Successfully performed ${action} on selected users`,
      });
      setSelectedUsers([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const allUsersSelected = data?.users && data.users.length > 0 && 
    data.users.length === selectedUsers.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => window.history.back()}>Back to Dashboard</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Active Users</DropdownMenuItem>
            <DropdownMenuItem>Inactive Users</DropdownMenuItem>
            <DropdownMenuItem>Completed Modules</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedUsers.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Bulk Actions ({selectedUsers.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkAction("send_reminder")}>
                Send Reminder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction("reset_progress")}>
                Reset Progress
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (data?.users) {
                      setSelectedUsers(
                        e.target.checked ? data.users.map((u) => u.id) : []
                      );
                    }
                  }}
                  checked={allUsersSelected}
                />
              </TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Completed Modules</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : !data?.users || data.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        setSelectedUsers(
                          e.target.checked
                            ? [...selectedUsers, user.id]
                            : selectedUsers.filter((id) => id !== user.id)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.lastActivity).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.enrollmentCount}</TableCell>
                  <TableCell>{user.completedModules}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Progress</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {data?.pagination && (
          <div className="flex justify-between items-center p-4">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
            >
              Previous
            </Button>
            <span>
              Page {page} of {data.pagination.totalPages || 1}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={
                !data.pagination.totalPages ||
                page === data.pagination.totalPages ||
                isLoading
              }
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}