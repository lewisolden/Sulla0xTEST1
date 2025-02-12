import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  Network,
  Brain,
  Puzzle,
  Blocks,
  Lock,
  CheckCircle2
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function AIModule3() {
  useScrollTop();
  const { getModuleProgress } = useProgress();

  const topics = [
    {
      id: "deep-learning",
      title: "Deep Learning",
      description: "Advanced neural networks and their applications",
      icon: Brain,
      href: "/ai/module3/deep-learning"
    },
    {
      id: "reinforcement-learning",
      title: "Reinforcement Learning",
      description: "Training AI through rewards and interactions",
      icon: Puzzle,
      href: "/ai/module3/reinforcement-learning"
    },
    {
      id: "generative-ai",
      title: "Generative AI",
      description: "Creating content with AI models",
      icon: Blocks,
      href: "/ai/module3/generative-ai"
    },
    {
      id: "future-ai",
      title: "Future of AI",
      description: "Emerging trends and potential developments",
      icon: Network,
      href: "/ai/module3/future-ai"
    }
  ];

  const moduleProgress = getModuleProgress("ai-module3");
  const completedTopics = topics.filter(topic => 
    moduleProgress?.find(p => p.sectionId === topic.id)?.completed
  ).length;
  const progress = (completedTopics / topics.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/ai">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to AI Overview
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Module 3: Advanced AI Concepts
                </h1>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Explore advanced concepts in artificial intelligence, from deep learning
                  to generative AI. This module covers cutting-edge techniques and their
                  real-world applications.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic, index) => {
                  const Icon = topic.icon;
                  const isCompleted = moduleProgress?.find(
                    p => p.sectionId === topic.id
                  )?.completed;

                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={topic.href}>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="rounded-full p-2 bg-blue-100">
                                <Icon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-lg">
                                    {topic.title}
                                  </h3>
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Lock className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mt-1">
                                  {topic.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <Link href="/ai/module3/deep-learning">
                  <Button className="gap-2">
                    Start Learning <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
