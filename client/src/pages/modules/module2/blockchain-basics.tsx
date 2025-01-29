import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlockchainBasicsDiagram from "@/components/diagrams/BlockchainBasicsDiagram";
import BlockStructureDiagram from "@/components/diagrams/BlockStructureDiagram";

export default function BlockchainBasicsSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { progress, updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'blockchain-basics', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  // Check if the quiz is completed
  const isQuizCompleted = progress.some(
    p => p.moduleId === 2 && p.sectionId === 'blockchain-basics-quiz' && p.completed
  );

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-900 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          What is a Blockchain?
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              A blockchain is a distributed, decentralised ledger that records transactions across many computers
              in a way that ensures the integrity and security of the data. It's the underlying technology
              that powers cryptocurrencies like Bitcoin, but its potential applications extend far beyond
              digital currencies.
            </p>
          </motion.section>

          <BlockchainBasicsDiagram />

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-4">Key Characteristics of Blockchain</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">1. Distributed Ledger</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Data is spread across multiple nodes (computers) in the network</li>
                  <li>Each node has a complete copy of the entire blockchain</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Decentralisation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>No single authority controls the blockchain</li>
                  <li>Consensus among network participants validates transactions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Immutability</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Once data is recorded, it's extremely difficult to change or delete</li>
                  <li>Ensures data integrity and builds trust in the system</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Transparency</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All transactions are visible to all participants</li>
                  <li>Enhances accountability and reduces fraud</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <BlockStructureDiagram />

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-4">Basic Structure of a Blockchain</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Blocks</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Contain a list of transactions and other key information</li>
                  <li>Include a timestamp and a unique identifier (hash)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Chain</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Blocks are linked together in chronological order</li>
                  <li>Each block contains the hash of the previous block, creating a chain</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Transactions</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Represent the transfer of value or data within the network</li>
                  <li>Must be validated by the network before being added to a block</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Nodes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Computers that participate in the blockchain network</li>
                  <li>Validate transactions and maintain the blockchain</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {isFullyRead && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the introduction to blockchain technology.
                  You now understand the fundamental concepts and structure of blockchain systems.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <div className="flex gap-4 w-full md:w-auto">
                  {!isQuizCompleted && (
                    <Link href="/modules/module2/blockchain-basics/quiz">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full md:w-auto"
                      >
                        Take Quiz
                      </Button>
                    </Link>
                  )}

                  <Link href="/modules/module2/distributed-ledger">
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Next Topic: Distributed Ledger Technology <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}