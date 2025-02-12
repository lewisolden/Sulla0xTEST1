import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Brain } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function AIModule2() {
  useScrollTop();
  const { progress } = useProgress();
  const { toast } = useToast();

  const sections = [
    {
      id: "natural-language-processing",
      title: "2.1 Natural Language Processing",
      description: "Explore how AI understands and processes human language.",
      href: "/ai/module2/natural-language-processing"
    },
    {
      id: "computer-vision",
      title: "2.2 Computer Vision",
      description: "Learn how AI systems interpret and analyze visual information.",
      href: "/ai/module2/computer-vision"
    },
    {
      id: "robotics-automation",
      title: "2.3 Robotics and Automation",
      description: "Understand AI's role in robotics and industrial automation.",
      href: "/ai/module2/robotics-automation"
    },
    {
      id: "ai-ethics",
      title: "2.4 AI Ethics and Safety",
      description: "Examine ethical considerations and safety measures in AI development.",
      href: "/ai/module2/ai-ethics"
    }
  ];

  // Filter progress for AI module 2
  const moduleProgress = progress.filter(p => p.moduleId === 'ai-module2');
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  // Enrollment handling
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ courseId: 2 }) // Course ID 2 is for AI course
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enroll in course');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully enrolled!",
        description: "You can now access all course materials.",
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to enroll",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const isEnrolled = enrollments?.some(
    (enrollment: any) => enrollment.courseId === 2
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/curriculum">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Curriculum
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Module 2: AI Technologies and Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Progress value={progressPercentage} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Progress: {Math.round(progressPercentage)}%
              </p>
            </div>

            {loadingEnrollments ? (
              <div className="text-center py-4">Loading enrollment status...</div>
            ) : isEnrolled ? (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center mb-6">
                You are enrolled in this course
              </div>
            ) : (
              <div className="text-center mb-6">
                <Button
                  onClick={() => enrollMutation.mutate()}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                </Button>
                <p className="text-gray-600 mt-2">
                  Enroll to access full course content and track your progress
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isEnrolled && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                      Course Overview
                    </h2>

                    <div className="space-y-4 text-gray-700">
                      <p>
                        Welcome to Module 2: AI Technologies and Applications. This module explores the practical applications of artificial intelligence across various domains, focusing on key technologies that power modern AI systems.
                      </p>

                      <p>
                        Through hands-on examples and real-world case studies, you'll learn about natural language processing, computer vision, robotics, and the ethical considerations that guide AI development. This module bridges the gap between theoretical knowledge and practical implementation.
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Master the fundamentals of Natural Language Processing (NLP)</li>
                      <li>Understand computer vision systems and their applications</li>
                      <li>Explore robotics and automation technologies</li>
                      <li>Analyze ethical considerations in AI development</li>
                      <li>Evaluate AI safety measures and best practices</li>
                      <li>Apply AI concepts to real-world scenarios</li>
                    </ul>

                    <div className="mt-8 flex justify-center">
                      <Link href="/ai/module2/natural-language-processing">
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start First Topic
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics">
              <div className="grid gap-4">
                {sections.map((section) => {
                  const sectionProgress = moduleProgress.find(p => p.sectionId === section.id);
                  const isComplete = sectionProgress?.completed || false;

                  return (
                    <Link key={section.id} href={section.href}>
                      <Card 
                        className="transition-all duration-300 hover:shadow-md cursor-pointer"
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                                {section.title}
                              </h3>
                              <p className="text-gray-600">{section.description}</p>
                            </div>
                            <div className="ml-4">
                              {isComplete ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                              ) : (
                                <Brain className="h-6 w-6 text-blue-500" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="quiz">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                      Module 2 Final Quiz
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {progressPercentage < 100
                        ? "Complete all topics to unlock the final quiz."
                        : "You've completed all topics! Take the final quiz to test your knowledge."}
                    </p>
                    <Link href="/ai/module2/quiz">
                      <Button
                        size="lg"
                        className="bg-green-600 hover:bg-green-700"
                        disabled={progressPercentage < 100}
                      >
                        {progressPercentage < 100
                          ? "Complete all topics to unlock quiz"
                          : "Take Module Quiz"
                        }
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
