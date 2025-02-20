import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

const BlockchainLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <rect width="24" height="24" rx="12" fill="#3B82F6"/>
    <path
      d="M17 8h-3V6h-4v2H7v8h3v2h4v-2h3V8zm-8 6V10h2v4H9zm4 2v-8h2v8h-2z"
      fill="white"
    />
  </svg>
);

export default function Module2() {
  useScrollTop();
  const { progress } = useProgress();

  const sections = [
    {
      id: "blockchain-basics",
      title: "2.1 Blockchain Basics",
      description: "Learn about the fundamentals of blockchain technology and how it works.",
      href: "/modules/module2/blockchain-basics"
    },
    {
      id: "distributed-ledger",
      title: "2.2 Distributed Ledger Technology",
      description: "Understand distributed ledger technology and its role in blockchain systems.",
      href: "/modules/module2/distributed-ledger"
    },
    {
      id: "consensus-mechanisms",
      title: "2.3 Consensus Mechanisms",
      description: "Explore different consensus mechanisms used in blockchain networks.",
      href: "/modules/module2/consensus-mechanisms"
    },
    {
      id: "smart-contracts",
      title: "2.4 Smart Contracts",
      description: "Learn about smart contracts and their applications in blockchain.",
      href: "/modules/module2/smart-contracts"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 2);
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
              <div className="flex items-center">
                <BlockchainLogo />
                <CardTitle className="text-2xl font-bold text-blue-800">
                  Module 2: What is a Blockchain?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Welcome to Module 2! In this module, we'll explore the fundamental concepts of blockchain technology:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Understanding blockchain's core architecture and principles</li>
                  <li>How distributed ledger technology works</li>
                  <li>Different consensus mechanisms and their importance</li>
                  <li>Smart contracts and their applications</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">What You'll Learn:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>The structure and components of a blockchain</li>
                  <li>How transactions are processed and validated</li>
                  <li>Different types of consensus mechanisms</li>
                  <li>Practical applications of smart contracts</li>
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

          {/* Progress summary and next module button */}
          <div className="mt-8">
            <Card className="bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Progress: {completedSections} of {totalSections} sections completed
                  </p>
                </div>
                {isModuleComplete && (
                  <Link href="/modules/module3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Continue to Module 3
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