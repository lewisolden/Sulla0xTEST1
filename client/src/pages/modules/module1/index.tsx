import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dumbbell, BookOpen, Shield, Brain, Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { moduleTopics } from "@/lib/module-data";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Module1() {
  useScrollTop();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 1);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  // Query enrollment status
  const { data: enrollments, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  // Determine if user is enrolled in this course
  const isEnrolled = enrollments?.some(enrollment => 
    enrollment.courseId === 1 && enrollment.status === 'active'
  );

  // Mutation for enrolling
  const { mutate: enroll, isLoading: isEnrolling } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: 1 })
      });
      if (!response.ok) throw new Error('Failed to enroll');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast({
        title: "Successfully enrolled!",
        description: "You can now start learning about cryptocurrency.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to enroll",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Understanding Cryptocurrency
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Module 1</h2>
                  <p className="text-gray-700 mb-6">
                    In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary 
                    approach to money and value transfer. This module will introduce you to the fundamental 
                    concepts of cryptocurrency, helping you understand what makes digital currencies unique 
                    and how they differ from traditional money systems.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand the fundamental differences between traditional and digital currencies</li>
                    <li>Grasp the core concepts of cryptocurrency, including decentralization and digital scarcity</li>
                    <li>Learn essential security principles and best practices</li>
                    <li>Explore practical applications and use cases of cryptocurrency</li>
                    <li>Develop skills for safe participation in the cryptocurrency ecosystem</li>
                  </ul>

                  <div className="mt-8 flex flex-col items-center gap-4">
                    {isLoadingEnrollments ? (
                      <div className="animate-pulse">
                        <div className="h-10 w-32 bg-gray-200 rounded"></div>
                      </div>
                    ) : isEnrolled ? (
                      <>
                        <p className="text-green-600 font-semibold flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          You're enrolled in this course
                        </p>
                        <Link href="/modules/module1/digital-currencies">
                          <Button 
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Start First Topic
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <Button 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => enroll()}
                          disabled={isEnrolling}
                        >
                          {isEnrolling ? (
                            <>
                              <span className="animate-spin mr-2">⟳</span>
                              Enrolling...
                            </>
                          ) : (
                            'Enroll Now'
                          )}
                        </Button>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Enroll to track your progress and earn certificates
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              {topicsWithProgress.map((topic) => (
                <Card key={topic.id} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-xl font-semibold text-blue-800">
                          {topic.title}
                        </h3>
                        {topic.completed && (
                          <span className="text-green-600 text-sm">(Completed)</span>
                        )}
                      </div>
                      <ul className="list-disc pl-5 text-gray-600 mb-4">
                        {topic.subsections.map((subsection, index) => (
                          <li key={index} className="text-sm mb-2">{subsection}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Link href={topic.path}>
                          <Button>
                            {topic.completed ? "Review Topic" : "Start Topic"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Interactive Learning Exercises</h2>
                  <p className="text-gray-700 mb-6">
                    Put your knowledge into practice with hands-on exercises designed to reinforce your learning:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <Wallet className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Wallet Simulator</h3>
                          <p className="text-sm text-gray-600">Practice creating and managing a cryptocurrency wallet in a safe environment.</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Security Workshop</h3>
                          <p className="text-sm text-gray-600">Learn to identify and protect against common security threats.</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <Brain className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Assessment Center</h3>
                          <p className="text-sm text-gray-600">Test your understanding with interactive assessments.</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Link href="/modules/module1/exercises">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Dumbbell className="mr-2 h-5 w-5" />
                        Start Exercises
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Module 1 Knowledge Check</h2>
                  <p className="text-gray-700 mb-6">
                    Test your understanding of cryptocurrency fundamentals with our comprehensive knowledge check.
                    This quiz covers all the key concepts from Module 1, including digital currencies, security,
                    practical applications, and getting started safely with cryptocurrency.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module1/quiz">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}