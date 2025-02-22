import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Network, Shield, Code, TrendingUp, Database, LockKeyhole } from "lucide-react";

const BlockchainLogo = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center">
    <Network className="h-6 w-6 text-white" />
  </div>
);

export default function Module2() {
  useScrollTop();
  const { progress } = useProgress();

  const sections = [
    {
      id: "blockchain-basics",
      title: "2.1 Blockchain Basics",
      description: "Learn about the fundamentals of blockchain technology and how it works.",
      icon: Network,
      href: "/modules/module2/blockchain-basics",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      id: "distributed-ledger",
      title: "2.2 Distributed Ledger Technology",
      description: "Understand distributed ledger technology and its role in blockchain systems.",
      icon: Database,
      href: "/modules/module2/distributed-ledger",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      id: "consensus-mechanisms",
      title: "2.3 Consensus Mechanisms",
      description: "Explore different consensus mechanisms used in blockchain networks.",
      icon: Shield,
      href: "/modules/module2/consensus-mechanisms",
      gradient: "from-indigo-500 to-indigo-700"
    },
    {
      id: "smart-contracts",
      title: "2.4 Smart Contracts",
      description: "Learn about smart contracts and their applications in blockchain.",
      icon: Code,
      href: "/modules/module2/smart-contracts",
      gradient: "from-cyan-500 to-cyan-700"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const isModuleComplete = completedSections === totalSections;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-5xl mx-auto">
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

          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <BlockchainLogo />
                <div>
                  <CardTitle className="text-3xl font-bold">
                    Module 2: What is a Blockchain?
                  </CardTitle>
                  <p className="text-orange-100 mt-2 text-lg">
                    Explore the revolutionary technology powering the future of digital transactions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose max-w-none mb-6"
              >
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Learning Objectives
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Master blockchain's core architecture and principles",
                      "Understand distributed ledger technology",
                      "Learn about consensus mechanisms",
                      "Explore smart contract applications"
                    ].map((objective, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-2 w-2 bg-orange-400 rounded-full" />
                        <span className="text-gray-700">{objective}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4">
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
                      <Link href={section.href}>
                        <Card className={`bg-gradient-to-br ${section.gradient} text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="bg-white/20 p-2 rounded-lg">
                                    <section.icon className="h-6 w-6 text-white" />
                                  </div>
                                  <h3 className="text-xl font-semibold">
                                    {section.title}
                                  </h3>
                                </div>
                                <p className="text-white/90">{section.description}</p>
                              </div>
                              {isComplete && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                >
                                  <CheckCircle2 className="h-6 w-6 text-white ml-4" />
                                </motion.div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress summary and next module button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-br from-gray-50 to-orange-50 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">
                        Progress: {completedSections} of {totalSections} sections completed
                      </p>
                    </div>
                    {isModuleComplete && (
                      <Link href="/modules/module3">
                        <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                          Continue to Module 3
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}