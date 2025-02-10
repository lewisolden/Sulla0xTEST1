import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";

export default function AccountPage() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Calculate overall progress
  const totalModules = 4; // We have 4 modules
  const completedModules = progress.filter(p => p.completed).length;
  const overallProgress = (completedModules / totalModules) * 100;

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Continue where you left off</p>
                    <Button className="mt-4" asChild>
                      <Link href="/curriculum">Resume Learning</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">View your earned badges and certificates</p>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link href="/achievements">View Achievements</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Module 1 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Module 1: Fundamentals</h3>
                    <Progress value={75} className="mt-2" />
                    <Button className="mt-4 w-full" asChild>
                      <Link href="/modules/module1">Continue</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Module 2 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Module 2: Blockchain</h3>
                    <Progress value={30} className="mt-2" />
                    <Button className="mt-4 w-full" asChild>
                      <Link href="/modules/module2">Continue</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Add more modules as needed */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Profile Picture</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <div className="space-y-2">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <Button variant="outline">Update Information</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Learning Preferences</h3>
                  <Button variant="outline">Customize Learning Experience</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
