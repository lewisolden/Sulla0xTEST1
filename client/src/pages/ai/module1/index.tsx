import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Brain } from "lucide-react";

export default function AIModule1() {
  useScrollTop();
  const { progress } = useProgress();

  const sections = [
    {
      id: "ai-introduction",
      title: "1.1 Introduction to Artificial Intelligence",
      description: "Learn about AI fundamentals, types of AI, and historical development.",
      href: "/ai/module1/introduction"
    },
    {
      id: "ai-workings",
      title: "1.2 How AI Works",
      description: "Understand basic principles of AI systems, data, and algorithms.",
      href: "/ai/module1/how-ai-works"
    },
    {
      id: "machine-learning",
      title: "1.3 Machine Learning Basics",
      description: "Explore machine learning types, training concepts, and applications.",
      href: "/ai/module1/machine-learning"
    },
    {
      id: "neural-networks",
      title: "1.4 Neural Networks and Deep Learning",
      description: "Learn about neural networks structure and deep learning applications.",
      href: "/ai/module1/neural-networks"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 'ai-1');
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const isModuleComplete = completedSections === totalSections;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                Module 1: Foundations of AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Welcome to the foundations of Artificial Intelligence! Before we dive in, let's address some common questions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Do I need advanced math?</strong> While some math helps, we'll focus on practical understanding first.</li>
                  <li><strong>Is it too technical?</strong> We start with core concepts and build gradually. No prior experience needed.</li>
                  <li><strong>Can I apply this knowledge?</strong> Yes! Each section includes practical examples and hands-on exercises.</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">What You'll Learn:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>The fundamentals of artificial intelligence</li>
                  <li>How AI systems work and make decisions</li>
                  <li>Basics of machine learning</li>
                  <li>Introduction to neural networks and deep learning</li>
                </ul>
              </div>
            </CardContent>
          </Card>

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

          <div className="mt-8">
            <Card className="bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Progress: {completedSections} of {totalSections} sections completed
                  </p>
                </div>
                {isModuleComplete && (
                  <Link href="/ai/module2">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Continue to Module 2
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
