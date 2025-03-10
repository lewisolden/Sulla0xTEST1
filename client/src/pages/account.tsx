import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, Trophy, Zap, Flame, ArrowRight, GamepadIcon, BookOpen, Brain } from "lucide-react";
import { Bell, Bookmark, Target, MessageSquare, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Enrollment {
  id: number;
  courseId: number;
  status: string;
  progress: number;
  enrolledAt: string;
  lastAccessedAt: string;
  metadata: {
    lastModule?: string;
    lastTopic?: string;
    lastPath?: string;
  } | null;
  course: {
    title: string;
    description: string;
  };
}

interface CourseStats {
  courseId: number;
  title: string;
  totalLearningTime: number;
  completedQuizzes: number;
  continuePath: string;
}

interface UserMetrics {
  totalLearningMinutes: number;
  completedQuizzes: number;
  earnedBadges: number;
  learningStreak: number;
  courseStats: CourseStats[];
}


export default function AccountPage() {
  const { user, logoutMutation } = useAuth();
  const { progress, getLastAccessedRoute } = useProgress();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const { data: metrics, isLoading: loadingMetrics } = useQuery<UserMetrics>({
    queryKey: ['user-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/user/metrics', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user metrics');
      const data = await response.json();
      return {
        totalLearningMinutes: data.totalLearningMinutes || 0,
        completedQuizzes: data.completedQuizzes || 0,
        earnedBadges: data.earnedBadges || 0,
        learningStreak: data.learningStreak || 0,
        courseStats: data.courseStats || []
      };
    },
    retry: 2,
    retryDelay: 1000
  });

  const { data: enrollments, isLoading: loadingEnrollments } = useQuery<Enrollment[]>({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const totalEnrollments = enrollments?.length || 0;
  const completedEnrollments = enrollments?.filter(e => e.status === 'completed').length || 0;
  const overallProgress = totalEnrollments ? (completedEnrollments / totalEnrollments) * 100 : 0;

  const getContinueLearningPath = (enrollment: Enrollment) => {
    try {
      const courseStats = metrics?.courseStats?.find(
        stat => stat.courseId === enrollment.courseId
      );

      if (courseStats?.continuePath) {
        // Override the continuePath for Course 2 to ensure it goes to AI module
        if (enrollment.courseId === 2) {
          return '/ai/module1';
        }
        return courseStats.continuePath;
      }

      switch (enrollment.courseId) {
        case 1:
          return '/modules/module1';
        case 2:
          return '/ai/module1';
        case 3:
          return '/defi/module1';
        default:
          return '/modules/module1';
      }
    } catch (error) {
      console.error('[Account] Error in getContinueLearningPath:', error);
      return '/modules/module1';
    }
  };

  const formatLearningTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const totalLearningTime = metrics?.courseStats?.reduce((acc, stat) => acc + (stat.totalLearningTime || 0), 0) || 0;
  const totalCompletedQuizzes = metrics?.courseStats?.reduce((acc, stat) => acc + (stat.completedQuizzes || 0), 0) || 0;

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    if (feedbackType === "course" && !selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: feedbackType,
          courseId: selectedCourse ? parseInt(selectedCourse) : undefined,
          rating: rating || undefined,
          feedback: feedbackText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setFeedbackType("course");
      setSelectedCourse("");
      setRating(0);
      setFeedbackText("");

      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const [selectedCourse, setSelectedCourse] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackType, setFeedbackType] = useState("course");


  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex flex-row md:grid md:grid-cols-5 overflow-x-auto gap-2 md:gap-0 p-1 no-scrollbar">
          <TabsTrigger value="dashboard" className="flex-shrink-0 text-sm whitespace-nowrap">Overview</TabsTrigger>
          <TabsTrigger value="progress" className="flex-shrink-0 text-sm whitespace-nowrap">Course Progress</TabsTrigger>
          <TabsTrigger value="goals" className="flex-shrink-0 text-sm whitespace-nowrap">Learning Goals</TabsTrigger>
          <TabsTrigger value="feedback" className="flex-shrink-0 text-sm whitespace-nowrap">Feedback</TabsTrigger>
          <TabsTrigger value="profile" className="flex-shrink-0 text-sm whitespace-nowrap">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Learning Time</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {loadingMetrics ? "..." : formatLearningTime(metrics?.totalLearningMinutes || 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Completed Quizzes</p>
                      <p className="text-2xl font-bold text-green-900">
                        {loadingMetrics ? "..." : metrics?.completedQuizzes || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Achievement Badges</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {loadingMetrics ? "..." : metrics?.earnedBadges || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Flame className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600">Learning Streak</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {loadingMetrics ? "..." : `${metrics?.learningStreak || 0} days`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Learning Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>

                  {loadingEnrollments ? (
                    <div className="text-center p-4">
                      <p>Loading your courses...</p>
                    </div>
                  ) : enrollments && enrollments.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {enrollments.map((enrollment) => {
                        const courseStats = metrics?.courseStats?.find(
                          stat => stat.courseId === enrollment.courseId
                        );

                        return (
                          <Card key={enrollment.id} className="bg-gradient-to-br from-blue-50 to-blue-100">
                            <CardHeader>
                              <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span>Course Progress</span>
                                    <span>{enrollment.progress}%</span>
                                  </div>
                                  <Progress value={enrollment.progress} />
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-600">
                                    Status: {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                  </p>
                                  {courseStats && (
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                      <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-blue-600">Learning Time</p>
                                        <p className="font-semibold">
                                          {formatLearningTime(courseStats.totalLearningTime)}
                                        </p>
                                      </div>
                                      <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-sm text-green-600">Completed Quizzes</p>
                                        <p className="font-semibold">{courseStats.completedQuizzes}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <Button className="w-full" asChild>
                                  <Link href={getContinueLearningPath(enrollment)}>
                                    Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/curriculum">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <Link href="/curriculum">
                    <Button className="w-full" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Course Catalog
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Link href="/modules/module1/exercises">
                    <Button className="w-full" variant="outline">
                      <Brain className="mr-2 h-4 w-4" />
                      Practice Exercises
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Link href="/glossary">
                    <Button className="w-full" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Glossary
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress & Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loadingEnrollments ? (
                  <div className="text-center p-4">
                    <p>Loading courses...</p>
                  </div>
                ) : enrollments && enrollments.length > 0 ? (
                  <div className="grid gap-4">
                    {enrollments.map((enrollment) => {
                      const courseStats = metrics?.courseStats?.find(
                        stat => stat.courseId === enrollment.courseId
                      );
                      return (
                        <Card key={enrollment.id} className="bg-gradient-to-br from-blue-50 to-blue-100">
                          <CardHeader>
                            <CardTitle>{enrollment.course.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Course Progress</span>
                                  <span>{enrollment.progress}%</span>
                                </div>
                                <Progress value={enrollment.progress} />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                  Status: {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                </p>
                                {courseStats && (
                                  <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                      <p className="text-sm text-blue-600">Learning Time</p>
                                      <p className="font-semibold">
                                        {formatLearningTime(courseStats.totalLearningTime)}
                                      </p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg">
                                      <p className="text-sm text-green-600">Completed Quizzes</p>
                                      <p className="font-semibold">{courseStats.completedQuizzes}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <Button className="w-full" asChild>
                                <Link href={getContinueLearningPath(enrollment)}>
                                  Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/curriculum">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Current Goals</h3>
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Complete Module 1</p>
                            <p className="text-sm text-gray-600">Target: 2 weeks</p>
                          </div>
                          <Progress value={60} className="w-24" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Practice Daily</p>
                            <p className="text-sm text-gray-600">30 minutes/day</p>
                          </div>
                          <Progress value={80} className="w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Set New Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Provide Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue="course"
                    onValueChange={(value) => setFeedbackType(value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="course" id="course" />
                      <Label htmlFor="course">Course Feedback</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="website" id="website" />
                      <Label htmlFor="website">Website Improvement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feature" id="feature" />
                      <Label htmlFor="feature">Feature Suggestion</Label>
                    </div>
                  </RadioGroup>

                  {feedbackType === "course" && (
                    <div className="space-y-4">
                      <div>
                        <Label>Select Course</Label>
                        <select
                          className="w-full p-2 border rounded-md mt-1"
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                          <option value="">Select a course...</option>
                          {enrollments?.map((enrollment) => (
                            <option key={enrollment.id} value={enrollment.courseId}>
                              {enrollment.course.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`p-1 hover:text-yellow-400 ${
                                rating >= star ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              <Star className="h-6 w-6" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>
                      {feedbackType === "course"
                        ? "Course Feedback"
                        : feedbackType === "website"
                        ? "Website Improvement Suggestions"
                        : "New Feature Suggestion"}
                    </Label>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button className="w-full" onClick={handleFeedbackSubmit}>
                    Submit Feedback
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Your Previous Feedback</h3>
                  <div className="space-y-4">
                    <Card className="p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Course: Blockchain Fundamentals</p>
                          <div className="flex text-yellow-400 my-1">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <p className="text-sm text-gray-600">Great course! The interactive exercises were particularly helpful.</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid gap-6">
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

                  <div className="pt-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      {logoutMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Logging out...</span>
                        </div>
                      ) : (
                        <>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Saved Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Blockchain Basics</p>
                      <p className="text-sm text-gray-600">Module 1, Lesson 3</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Smart Contracts Guide</p>
                      <p className="text-sm text-gray-600">Module 2, Lesson 1</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Course Updates</p>
                      <p className="text-sm text-gray-600">Get notified about new content</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievement Alerts</p>
                      <p className="text-sm text-gray-600">Notifications for new achievements</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Study Reminders</p>
                      <p className="text-sm text-gray-600">Daily learning reminders</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}