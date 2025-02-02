import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, Lock } from "lucide-react";

export default function Module2() {
  useScrollTop();
  const { progress } = useProgress();

  const sections = [
    {
      id: "bitcoin-fundamentals",
      title: "2.1 Bitcoin Fundamentals",
      description: "Learn about the birth of Bitcoin, its historical context, and how Bitcoin works.",
      href: "/modules/module2/bitcoin-fundamentals"
    },
    {
      id: "bitcoin-investment",
      title: "2.2 Bitcoin as an Investment",
      description: "Understand Bitcoin's value proposition, investment considerations, and Bitcoin ETFs.",
      href: "/modules/module2/bitcoin-investment"
    },
    {
      id: "security-risk",
      title: "2.3 Security and Risk Management",
      description: "Master essential security practices and risk management strategies for Bitcoin.",
      href: "/modules/module2/security-risk"
    },
    {
      id: "practical-exercises",
      title: "2.4 Practical Exercises",
      description: "Hands-on exercises to reinforce your understanding of Bitcoin concepts.",
      href: "/modules/module2/exercises"
    },
    {
      id: "module2-quiz",
      title: "Module 2 Quiz",
      description: "Test your knowledge of Bitcoin fundamentals and concepts.",
      href: "/modules/module2/quiz"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 2);

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
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800">
                Module 2: Bitcoin Deep Dive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Before diving into Bitcoin's technical aspects, let's address some common concerns:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Do I need to buy a whole Bitcoin?</strong> No! Bitcoin is divisible into 100 million units called "satoshis" or "sats." You can start with as little as $10.</li>
                  <li><strong>Is it too technical for me?</strong> While Bitcoin uses complex technology, using it is similar to mobile banking. Start with the basics, and your understanding will grow naturally.</li>
                  <li><strong>What if I make a mistake?</strong> Start with small amounts while learning. Use test transactions and practice with minimal stakes to build confidence.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {sections.map((section) => {
              const isComplete = moduleProgress.some(
                p => p.sectionId === section.id && p.completed
              );

              const isLocked = section.id === "module2-quiz" && 
                !moduleProgress.some(p => 
                  ["bitcoin-fundamentals", "bitcoin-investment", "security-risk"].includes(p.sectionId) && 
                  p.completed
                );

              return (
                <Link key={section.id} href={!isLocked ? section.href : "#"}>
                  <Card 
                    className={`transition-all duration-300 hover:shadow-md ${
                      isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
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
                          ) : isLocked ? (
                            <Lock className="h-6 w-6 text-gray-400" />
                          ) : (
                            <BookOpen className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}