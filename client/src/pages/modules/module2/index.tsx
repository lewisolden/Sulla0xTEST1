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
      id: "blockchain-basics",
      title: "2.1 Blockchain Basics",
      description: "Learn about the fundamental structure and operation of blockchain technology.",
      href: "/modules/module2/blockchain-basics"
    },
    {
      id: "distributed-ledger",
      title: "2.2 Distributed Ledger Technology",
      description: "Understand distributed ledger technology and its applications.",
      href: "/modules/module2/distributed-ledger"
    },
    {
      id: "consensus-mechanisms",
      title: "2.3 Consensus Mechanisms",
      description: "Explore different consensus mechanisms and their importance.",
      href: "/modules/module2/consensus-mechanisms"
    },
    {
      id: "smart-contracts",
      title: "2.4 Smart Contracts",
      description: "Master smart contracts and their real-world applications.",
      href: "/modules/module2/smart-contracts"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;

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
                Module 2: Understanding Blockchain Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Welcome to Module 2! In this module, you'll learn about the revolutionary 
                  technology behind cryptocurrencies - blockchain. We'll explore:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>How blockchain works and its fundamental structure</li>
                  <li>The power of distributed ledger technology</li>
                  <li>Different consensus mechanisms that secure blockchain networks</li>
                  <li>Smart contracts and their practical applications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {sections.map((section) => {
              const isComplete = moduleProgress.some(
                p => p.sectionId === section.id && p.completed
              );

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