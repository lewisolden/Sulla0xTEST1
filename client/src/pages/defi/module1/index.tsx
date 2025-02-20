import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Wallet, Database, Network, Shield, TrendingUp } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const sections = [
  {
    id: "defi-intro",
    title: "1.1 What is DeFi?",
    description: "Understand the fundamentals of decentralized finance and its potential to transform traditional financial systems",
    icon: Database,
    subsections: [
      "Introduction to DeFi",
      "Traditional Finance vs DeFi",
      "Key DeFi Components",
      "DeFi Use Cases"
    ]
  },
  {
    id: "blockchain-contracts",
    title: "1.2 Blockchain & Smart Contracts",
    description: "Learn how blockchain and smart contracts enable trustless financial applications",
    icon: Network,
    subsections: [
      "Blockchain Fundamentals",
      "Smart Contract Basics",
      "Ethereum and DeFi",
      "Gas and Transaction Fees"
    ]
  },
  {
    id: "dex-amm",
    title: "1.3 DEXs & AMMs",
    description: "Master decentralized exchanges and automated market makers",
    icon: Wallet,
    subsections: [
      "How DEXs Work",
      "AMM Mechanics",
      "Liquidity Pools",
      "Trading on DEXs"
    ]
  },
  {
    id: "liquidity-yield",
    title: "1.4 Liquidity & Yield Farming",
    description: "Explore liquidity provision and yield farming strategies",
    icon: Shield,
    subsections: [
      "Providing Liquidity",
      "Understanding Impermanent Loss",
      "Yield Farming Strategies",
      "Risk Management"
    ]
  }
];

export default function DefiModule1() {
  useScrollTop();
  const { progress } = useProgress();
  const { toast } = useToast();

  // Filter progress for DeFi module 1
  const moduleProgress = progress.filter(p => p.moduleId === 3 && p.courseId === 3);
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl font-bold">
                Module 1: DeFi Fundamentals
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Master the foundations of Decentralized Finance
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Course Progress</p>
                  <p className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {loadingEnrollments ? (
                <div className="text-center py-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Database className="h-6 w-6 text-blue-500" />
                  </motion.div>
                  <p className="text-gray-500 mt-2">Loading enrollment status...</p>
                </div>
              ) : isEnrolled ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-6"
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
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 transform hover:scale-105 transition-all duration-300"
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
                        className="text-3xl font-bold text-blue-800 mb-6 text-center"
                      >
                        Welcome to DeFi Fundamentals
                      </motion.h2>

                      <div className="space-y-6">
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-gray-700"
                        >
                          Welcome to Module 1 of our DeFi course! This module introduces you to the revolutionary world of Decentralized Finance (DeFi). You'll learn how DeFi is transforming traditional financial systems through blockchain technology and smart contracts.
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg"
                        >
                          <h3 className="text-xl font-semibold text-blue-800 mb-4">What You'll Learn</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              { icon: Database, text: "Core DeFi concepts and principles" },
                              { icon: Shield, text: "Security and risk management" },
                              { icon: Wallet, text: "DEX and AMM mechanics" },
                              { icon: TrendingUp, text: "Yield farming strategies" }
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                              >
                                <item.icon className="h-5 w-5 text-blue-500" />
                                <span className="text-gray-700">{item.text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <div className="bg-blue-50 p-4 rounded-lg mt-6">
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">Prerequisites</h3>
                          <ul className="list-disc pl-6 text-blue-700">
                            <li>Basic understanding of cryptocurrency concepts</li>
                            <li>Familiarity with digital wallets</li>
                            <li>Basic knowledge of blockchain technology</li>
                          </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg mt-6">
                          <h3 className="text-lg font-semibold text-green-800 mb-2">Learning Objectives</h3>
                          <ul className="list-disc pl-6 text-green-700 space-y-2">
                            <li>Define and explain the core concepts of Decentralized Finance (DeFi)</li>
                            <li>Compare and contrast traditional financial systems with DeFi applications</li>
                            <li>Understand how blockchain and smart contracts enable DeFi functionality</li>
                            <li>Analyze the mechanics of decentralized exchanges (DEXs) and automated market makers (AMMs)</li>
                            <li>Evaluate different liquidity provision strategies and their associated risks</li>
                            <li>Identify and assess yield farming opportunities in the DeFi ecosystem</li>
                            <li>Apply risk management principles to DeFi investments and trading</li>
                            <li>Navigate common DeFi protocols and understand their interconnections</li>
                          </ul>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-8 flex justify-center"
                      >
                        <Link href="/defi/module1/defi-intro">
                          <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
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
                      <Link href={`/defi/module1/${section.id}`}>
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
                                  <section.icon className="h-6 w-6 text-blue-500" />
                                  <h3 className="text-xl font-semibold text-blue-800">
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
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
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
                        Module 1 Final Quiz
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
                      <Link href="/defi/module1/quiz">
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