import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, Wallet, Database, Network, Shield, TrendingUp, Code2, RefreshCw, Settings, Braces, Cpu, LineChart, Globe2, Boxes } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const sections = [
  {
    id: "institutional-defi",
    title: "4.1 Institutional DeFi",
    description: "Understanding institutional adoption and enterprise DeFi solutions",
    icon: Globe2,
    subsections: [
      "Regulatory Compliance",
      "Enterprise Solutions",
      "Custodial Services",
      "Institutional Trading"
    ]
  },
  {
    id: "defi-governance",
    title: "4.2 Advanced DeFi Governance",
    description: "Deep dive into governance mechanisms and protocol management",
    icon: Settings,
    subsections: [
      "Governance Models",
      "Token Economics",
      "Protocol Upgrades",
      "Community Management"
    ]
  },
  {
    id: "defi-integrations",
    title: "4.3 Real-World DeFi Integrations",
    description: "Exploring DeFi integration with traditional finance and real assets",
    icon: Network,
    subsections: [
      "Asset Tokenization",
      "Payment Systems",
      "Banking Integration",
      "Real Estate DeFi"
    ]
  },
  {
    id: "defi-infrastructure",
    title: "4.4 DeFi Infrastructure",
    description: "Advanced infrastructure and protocol development",
    icon: Boxes,
    subsections: [
      "Protocol Design",
      "Smart Contract Systems",
      "Oracle Networks",
      "Cross-chain Architecture"
    ]
  }
];

export default function DefiModule4() {
  useScrollTop();
  const { progress } = useProgress();
  const { toast } = useToast();

  const moduleProgress = progress.filter(p => p.moduleId === 4 && p.courseId === 3);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

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
        },
        body: JSON.stringify({ courseId: 3 })
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
    (enrollment: any) => enrollment.courseId === 3
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-5xl mx-auto rounded-lg shadow-lg p-8 bg-white">
        <div className="mb-6">
          <Link href="/curriculum">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Curriculum
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Module 4: Enterprise & Infrastructure
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Master enterprise-grade DeFi solutions and advanced infrastructure development
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Course Progress</p>
                  <p className="text-sm font-medium text-purple-600">{Math.round(progressPercentage)}%</p>
                </div>
                <Progress value={progressPercentage} className="bg-purple-100" />
              </div>

              {loadingEnrollments ? (
                <div className="text-center py-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Database className="h-6 w-6 text-purple-500" />
                  </motion.div>
                  <p className="text-gray-500 mt-2">Loading enrollment status...</p>
                </div>
              ) : isEnrolled ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-6"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">You are enrolled in this course</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6 space-y-4"
                >
                  <Button
                    onClick={() => enrollMutation.mutate()}
                    className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3 transform hover:scale-105 transition-all duration-300"
                    disabled={enrollMutation.isPending}
                  >
                    {enrollMutation.isPending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block mr-2"
                      >
                        <Database className="h-5 w-5" />
                      </motion.div>
                    ) : null}
                    {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                  </Button>
                  <p className="text-gray-600">
                    Enroll to access full course content and track your progress
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {isEnrolled && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="w-full justify-center">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="topics" className="flex-1">Topics</TabsTrigger>
              <TabsTrigger value="quiz" className="flex-1">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl font-bold text-purple-800 mb-6 text-center"
                      >
                        Enterprise DeFi & Infrastructure Development
                      </motion.h2>

                      <div className="space-y-6">
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-gray-700"
                        >
                          Welcome to Module 4 of our DeFi course! This advanced module explores enterprise-grade DeFi solutions,
                          governance mechanisms, and infrastructure development. You'll learn about institutional adoption,
                          advanced protocol design, and real-world DeFi integrations.
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 rounded-lg shadow-lg"
                        >
                          <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                            <Database className="h-6 w-6" />
                            Prerequisites
                          </h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 }}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                <Code2 className="h-4 w-4 text-purple-600" />
                              </div>
                              <h4 className="font-medium text-purple-700 mb-1">Advanced DeFi</h4>
                              <p className="text-sm text-gray-600">Complete understanding of DeFi fundamentals</p>
                            </motion.div>
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.6 }}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                                <Network className="h-4 w-4 text-indigo-600" />
                              </div>
                              <h4 className="font-medium text-purple-700 mb-1">Protocol Design</h4>
                              <p className="text-sm text-gray-600">Experience with smart contract development</p>
                            </motion.div>
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.7 }}
                              className="bg-white p-4 rounded-lg shadow-sm"
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                              </div>
                              <h4 className="font-medium text-purple-700 mb-1">Security</h4>
                              <p className="text-sm text-gray-600">Understanding of DeFi security principles</p>
                            </motion.div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-lg shadow-lg"
                        >
                          <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-6 w-6" />
                            Learning Objectives
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              {
                                icon: Globe2,
                                title: "Enterprise Integration",
                                description: "Master institutional DeFi solutions"
                              },
                              {
                                icon: Settings,
                                title: "Advanced Governance",
                                description: "Design complex governance systems"
                              },
                              {
                                icon: Network,
                                title: "Integration Expertise",
                                description: "Connect DeFi with traditional finance"
                              },
                              {
                                icon: Boxes,
                                title: "Infrastructure Design",
                                description: "Build robust DeFi infrastructure"
                              },
                              {
                                icon: Shield,
                                title: "Compliance",
                                description: "Navigate regulatory requirements"
                              },
                              {
                                icon: Code2,
                                title: "Protocol Architecture",
                                description: "Design scalable DeFi protocols"
                              }
                            ].map((objective, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <objective.icon className="h-4 w-4 text-indigo-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-indigo-700 mb-1">{objective.title}</h4>
                                    <p className="text-sm text-gray-600">{objective.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-8 flex justify-center"
                      >
                        <Link href="/defi/module4/institutional-defi">
                          <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
                          >
                            Start First Topic
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="topics">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid gap-4"
              >
                {sections.map((section, index) => {
                  const sectionProgress = moduleProgress.find(p => p.sectionId === section.id);
                  const isComplete = sectionProgress?.completed || false;

                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/defi/module4/${section.id}`}>
                        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                  className="flex items-center gap-3 mb-2"
                                >
                                  <section.icon className="h-6 w-6 text-purple-500" />
                                  <h3 className="text-xl font-semibold text-purple-800">
                                    {section.title}
                                  </h3>
                                </motion.div>
                                <p className="text-gray-600 mb-4">{section.description}</p>
                                <ul className="grid grid-cols-2 gap-2">
                                  {section.subsections.map((subsection, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                      className="text-sm text-gray-500 flex items-center gap-2"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                      {subsection}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                              {isComplete && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                  <CheckCircle2 className="h-6 w-6 text-green-500 ml-4" />
                                </motion.div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            <TabsContent value="quiz">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-semibold text-gray-700 mb-4"
                      >
                        Module 4 Final Quiz
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 mb-6"
                      >
                        {progressPercentage < 100
                          ? "Complete all topics to unlock the final quiz."
                          : "You've completed all topics! Take the final quiz to test your knowledge."}
                      </motion.p>
                      <Link href="/defi/module4/quiz">
                        <Button
                          size="lg"
                          className={`transform transition-all duration-300 ${
                            progressPercentage >= 100
                              ? "bg-green-600 hover:bg-green-700 hover:scale-105"
                              : "bg-gray-400"
                          }`}
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
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
