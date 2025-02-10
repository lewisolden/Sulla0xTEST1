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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-blue-900">{user.username}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Overview</TabsTrigger>
          <TabsTrigger value="progress">Course Progress</TabsTrigger>
          <TabsTrigger value="learning">Interactive Tools</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Learning Dashboard</CardTitle>
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

        {/* Course Progress Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress & Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Module Progress Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Module 1: Blockchain Fundamentals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Course Completion</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Quiz Scores: 85%</p>
                          <p className="text-sm text-gray-500">Time Spent: 4.5 hours</p>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href="/modules/module1">Continue Learning</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Module 2: Smart Contracts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Course Completion</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Quiz Scores: 90%</p>
                          <p className="text-sm text-gray-500">Time Spent: 2.5 hours</p>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href="/modules/module2">Continue Learning</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Module 3: Ethereum & Smart Contracts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Course Completion</span>
                            <span>30%</span>
                          </div>
                          <Progress value={30} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Quiz Scores: 88%</p>
                          <p className="text-sm text-gray-500">Time Spent: 1.5 hours</p>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href="/modules/module3">Continue Learning</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievement Summary */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Learning Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-semibold">Quizzes Completed</h3>
                          <p className="text-2xl font-bold text-blue-600">12</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h3 className="font-semibold">Average Score</h3>
                          <p className="text-2xl font-bold text-green-600">87%</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <h3 className="font-semibold">Badges Earned</h3>
                          <p className="text-2xl font-bold text-purple-600">5</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Learning Tab */}
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Learning Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Practice Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Blockchain Fundamentals</span>
                        <Button size="sm">Start Quiz</Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Smart Contracts Basics</span>
                        <Button size="sm">Continue</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Video Tutorials</span>
                        <Button size="sm" variant="outline">View</Button>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Practice Exercises</span>
                        <Button size="sm" variant="outline">Start</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Course Feedback & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Recent Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">Share your thoughts on completed courses</p>
                      <Button className="w-full">Write a Review</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Blockchain Fundamentals</span>
                          <Button size="sm" variant="outline">Rate Course</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Smart Contracts</span>
                          <Button size="sm" variant="outline">Rate Course</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Profile Picture</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
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