import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dumbbell, BookOpen, Shield, Brain, Wallet, CheckCircle, Loader2, ArrowRight, Lock } from "lucide-react";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const moduleTopics = [
  {
    id: "digital-currencies",
    title: "Topic 1 - Introduction to Digital Currency",
    path: "/modules/module1/digital-currencies",
    icon: Wallet,
    gradient: "from-blue-500 to-blue-600",
    subsections: [
      "Understanding Traditional Money vs. Cryptocurrency",
      "The Evolution of Money",
      "Core Concepts and Features"
    ]
  },
  {
    id: "security",
    title: "Topic 2 - Understanding Cryptocurrency Security",
    path: "/modules/module1/security",
    icon: Shield,
    gradient: "from-purple-500 to-purple-600",
    subsections: [
      "Cryptographic Foundations",
      "The Double-Spending Solution",
      "Risk Considerations and Management"
    ]
  },
  {
    id: "practical-applications",
    title: "Topic 3 - Practical Applications",
    path: "/modules/module1/applications",
    icon: Brain,
    gradient: "from-indigo-500 to-indigo-600",
    subsections: [
      "Financial Inclusion",
      "Payment Efficiency",
      "Investment Opportunities and Risks"
    ]
  },
  {
    id: "getting-started",
    title: "Topic 4 - Getting Started Safely",
    path: "/modules/module1/getting-started",
    icon: BookOpen,
    gradient: "from-cyan-500 to-cyan-600",
    subsections: [
      "First Steps",
      "Security Best Practices",
      "Hands-On Learning Activities"
    ]
  }
];

export default function Module1() {
  const { progress } = useProgress();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch enrollment status
  const { data: enrollments = [], isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const isEnrolled = enrollments.some((enrollment: any) => enrollment.courseId === 1);

  // Enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: 1 })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to enroll');
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

  const moduleProgress = progress.filter(p => p.moduleId === 1);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section with Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-3 text-white">
            Module 1: Understanding Cryptocurrency
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Master the fundamentals of digital currencies and blockchain technology
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>4 Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Interactive Learning</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enrollment Status Section with Enhanced Design */}
        <Card className="mb-8 border-2 border-blue-100">
          <CardContent className="py-6">
            <div className="flex flex-col items-center gap-4">
              {isLoadingEnrollments ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isEnrolled ? (
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">You're enrolled in this course</span>
                  </div>
                  <Link href="/modules/module1/digital-currencies">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
                      Continue Learning <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-600">Enroll now to start your learning journey</p>
                  <Button
                    onClick={() => enrollMutation.mutate()}
                    disabled={enrollMutation.isPending}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    {enrollMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Enrolling...</span>
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">Course Progress</h3>
            <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-blue-100" />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-blue-50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Welcome to Module 1</h2>
                    <p className="text-gray-700 mb-6">
                      In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary
                      approach to money and value transfer. This module will introduce you to the fundamental
                      concepts of cryptocurrency, helping you understand what makes digital currencies unique
                      and how they differ from traditional money systems.
                    </p>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 my-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Learning Objectives</h3>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {[
                          "Understand the fundamental differences between traditional and digital currencies",
                          "Grasp the core concepts of cryptocurrency, including decentralization and digital scarcity",
                          "Learn essential security principles and best practices",
                          "Explore practical applications and use cases of cryptocurrency",
                          "Develop skills for safe participation in the cryptocurrency ecosystem"
                        ].map((objective, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center gap-3 text-gray-200"
                          >
                            <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span>{objective}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Link href="/modules/module1/digital-currencies">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
                        >
                          Start Learning <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              {topicsWithProgress.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="transition-all hover:shadow-lg border-2 hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`bg-gradient-to-br ${topic.gradient} p-3 rounded-xl text-white`}>
                            <topic.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-blue-800">
                              {topic.title}
                            </h3>
                            {topic.completed && (
                              <span className="text-green-600 text-sm flex items-center gap-1">
                                <CheckCircle className="h-4 w-4" /> Completed
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className="list-none pl-5 text-gray-600 mb-4 space-y-2">
                          {topic.subsections.map((subsection, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                              <span>{subsection}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <Link href={topic.path}>
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
                              {topic.completed ? "Review Topic" : "Start Topic"}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Interactive Learning Exercises</h2>
                    <p className="text-gray-700 mb-6">
                      Put your knowledge into practice with hands-on exercises designed to reinforce your learning:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          icon: Wallet,
                          title: "Wallet Simulator",
                          description: "Practice creating and managing a cryptocurrency wallet in a safe environment.",
                          gradient: "from-blue-500 to-blue-600"
                        },
                        {
                          icon: Shield,
                          title: "Security Workshop",
                          description: "Learn to identify and protect against common security threats.",
                          gradient: "from-purple-500 to-purple-600"
                        },
                        {
                          icon: Brain,
                          title: "Assessment Center",
                          description: "Test your understanding with interactive assessments.",
                          gradient: "from-indigo-500 to-indigo-600"
                        }
                      ].map((exercise, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-full bg-gradient-to-br {exercise.gradient} text-white overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-3">
                                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                                  <exercise.icon className="h-6 w-6" />
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">{exercise.title}</h3>
                                  <p className="text-sm text-white/90">{exercise.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <Link href="/modules/module1/exercises">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
                          <Dumbbell className="h-5 w-5" />
                          Start Exercises
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
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
                          className={`gap-2 ${
                            progressPercentage < 100
                              ? "bg-gray-400"
                              : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          } text-white`}
                          disabled={progressPercentage < 100}
                        >
                          {progressPercentage < 100 ? (
                            <>
                              <Lock className="h-5 w-5" />
                              Complete all topics to unlock quiz
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-5 w-5" />
                              Take Module Quiz
                            </>
                          )}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}