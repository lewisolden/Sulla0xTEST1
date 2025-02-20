import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Wallet, Database, Network, Shield } from "lucide-react";
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">
              Module 1: DeFi Fundamentals
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
                      Welcome to DeFi Fundamentals
                    </h2>

                    <div className="space-y-4 text-gray-700">
                      <p>
                        Welcome to Module 1 of our DeFi course! This module introduces you to the revolutionary world of Decentralized Finance (DeFi). You'll learn how DeFi is transforming traditional financial systems through blockchain technology and smart contracts.
                      </p>

                      <p>
                        Through interactive lessons and practical examples, you'll understand:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>The fundamental concepts of DeFi and how it differs from traditional finance</li>
                        <li>How blockchain and smart contracts enable trustless financial applications</li>
                        <li>The mechanics of decentralized exchanges (DEXs) and automated market makers (AMMs)</li>
                        <li>Strategies for providing liquidity and participating in yield farming</li>
                      </ul>

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

                    <div className="mt-8 flex justify-center">
                      <Link href="/defi/module1/defi-intro">
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
                    <Link key={section.id} href={`/defi/module1/${section.id}`}>
                      <Card
                        className="transition-all duration-300 hover:shadow-md cursor-pointer"
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <section.icon className="h-6 w-6 text-blue-500" />
                                <h3 className="text-xl font-semibold text-blue-800">
                                  {section.title}
                                </h3>
                              </div>
                              <p className="text-gray-600 mb-4">{section.description}</p>
                              <ul className="grid grid-cols-2 gap-2">
                                {section.subsections.map((subsection, idx) => (
                                  <li key={idx} className="text-sm text-gray-500 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {subsection}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {isComplete && (
                              <CheckCircle2 className="h-6 w-6 text-green-500 ml-4" />
                            )}
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
                      Module 1 Final Quiz
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {progressPercentage < 100
                        ? "Complete all topics to unlock the final quiz."
                        : "You've completed all topics! Take the final quiz to test your knowledge."}
                    </p>
                    <Link href="/defi/module1/quiz">
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