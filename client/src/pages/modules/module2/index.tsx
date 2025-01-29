import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Network, GitFork, Code, Book, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import Footer from "@/components/layout/footer";

const module2Topics = [
  {
    id: "blockchain-basics",
    title: "What is a Blockchain?",
    icon: Database,
    path: "/modules/module2/blockchain-basics",
    description: "Understand the fundamental concept and structure of blockchain technology"
  },
  {
    id: "distributed-ledger",
    title: "Distributed Ledger Technology",
    icon: Network,
    path: "/modules/module2/distributed-ledger",
    description: "Explore how distributed ledgers work and their role in blockchain systems"
  },
  {
    id: "consensus-mechanisms",
    title: "Consensus Mechanisms",
    icon: GitFork,
    path: "/modules/module2/consensus-mechanisms",
    description: "Learn about different methods for achieving agreement in blockchain networks"
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    icon: Code,
    path: "/modules/module2/smart-contracts",
    description: "Discover automated, self-executing contracts on the blockchain"
  }
];

const learningObjectives = [
  "Define what a blockchain is and its basic structure",
  "Explain how blocks are created and linked in a blockchain",
  "Describe the key features of blockchain technology (e.g., immutability, transparency, decentralisation)",
  "Identify the basic components of a blockchain system",
  "Distinguish between blockchain and traditional databases",
  "Explain the role of cryptography in maintaining blockchain security",
  "Recognize potential applications of blockchain technology beyond cryptocurrencies"
];

export default function Module2() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / module2Topics.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Module 2: Understanding Blockchain Technology
          </h1>

          <div className="mb-8">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Progress: {Math.round(progressPercentage)}%
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    This module introduces students to the fundamental concept of blockchain technology, 
                    which underlies cryptocurrencies and has potential applications across various industries. 
                    Blockchain represents a revolutionary approach to storing and validating data in a 
                    decentralised and secure manner.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Students will learn about the basic structure of a blockchain, understanding how it 
                    functions as a distributed ledger that records transactions across many computers. 
                    The module explores the key features that make blockchain unique, such as its 
                    immutability, transparency, and resistance to tampering.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The course will cover how blocks are created, validated, and linked together to form 
                    the chain, emphasising the role of cryptography in ensuring the security and integrity 
                    of the data. Students will also gain insights into the consensus mechanisms that allow 
                    blockchain networks to agree on the state of the ledger without central authority.
                  </p>
                  <p className="text-gray-700">
                    By the end of this module, learners will have a clear understanding of what blockchain 
                    is, how it differs from traditional databases, and why it's considered a transformative 
                    technology with implications far beyond the realm of digital currencies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Learning Objectives</h2>
                <ul className="space-y-3">
                  {learningObjectives.map((objective, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Module Content</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {module2Topics.map((topic, index) => {
                const isCompleted = moduleProgress.some(
                  p => p.sectionId === topic.id && p.completed
                );

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                  >
                    <Card className="h-full transition-all hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-blue-100">
                            <topic.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-blue-800">
                                {topic.title}
                              </h3>
                              {isCompleted && (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-4">{topic.description}</p>
                            <Link href={topic.path}>
                              <Button className="w-full">
                                {isCompleted ? "Review Topic" : "Start Topic"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <Link href="/glossary">
              <Button className="gap-2">
                <Book className="h-4 w-4" />
                Open Crypto Glossary
              </Button>
            </Link>
          </motion.div>
          <div className="mt-8 text-center">
            <Link href="/modules/module2/quiz">
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
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}