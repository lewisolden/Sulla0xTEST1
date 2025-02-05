import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, BookOpen, Code, Network } from "lucide-react";
import BitcoinBasicsDiagram from "@/components/diagrams/BitcoinBasicsDiagram";

export default function BitcoinFundamentalsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'bitcoin-fundamentals', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          2.1 Bitcoin Fundamentals
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <BitcoinBasicsDiagram />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Core Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">What is Bitcoin?</h3>
                </div>
                <p className="text-gray-700">
                  Bitcoin is a decentralized digital currency that enables instant payments to anyone, anywhere in the world.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Network className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">How it Works</h3>
                </div>
                <p className="text-gray-700">
                  Bitcoin transactions are verified by network nodes through cryptography and recorded on a public ledger called a blockchain.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Technical Concepts Explained</h2>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Blockchain Technology</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">Think of a blockchain as a digital ledger that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Records all Bitcoin transactions in blocks, like pages in a book</li>
                    <li>Each block links to the previous one, forming an unbreakable chain</li>
                    <li>Once information is recorded, it cannot be changed without changing all subsequent blocks</li>
                    <li>Every participant has a copy of the entire history</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">The Bitcoin Network</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">The Bitcoin network is a peer-to-peer system where:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Thousands of computers (nodes) work together without central control</li>
                    <li>Each node validates and relays transactions to others</li>
                    <li>Anyone can join or leave the network at any time</li>
                    <li>The network reaches consensus on the state of all Bitcoin transactions</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Bitcoin Mining</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">Mining is the process that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Secures the network through complex mathematical computations</li>
                    <li>Creates new bitcoins as a reward for miners</li>
                    <li>Processes and verifies transactions</li>
                    <li>Requires significant computing power and electricity</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Historical Milestones</h2>
            <div className="relative mt-8">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>

              {/* Timeline events */}
              <div className="space-y-12">
                <motion.div 
                  className="relative flex items-center justify-start md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:pr-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">October 31, 2008</h3>
                        <p className="text-gray-700">Bitcoin whitepaper published by Satoshi Nakamoto</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div 
                  className="relative flex items-center justify-end md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:ml-auto md:pl-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">January 3, 2009</h3>
                        <p className="text-gray-700">Genesis Block mined with a message about bank bailouts</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div 
                  className="relative flex items-center justify-start md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:pr-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">January 12, 2009</h3>
                        <p className="text-gray-700">First Bitcoin transaction between Satoshi and Hal Finney</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div 
                  className="relative flex items-center justify-end md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:ml-auto md:pl-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">May 22, 2010</h3>
                        <p className="text-gray-700">First real-world transaction: 10,000 BTC for two pizzas</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">The Birth of Bitcoin</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Historical Context and Significance</h3>
            <p>
              The 2008 financial crisis revealed fundamental problems in our financial system. During this turbulent time:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Banks were failing</li>
              <li>Governments were implementing massive bailouts</li>
              <li>Public trust in financial institutions was eroding</li>
              <li>The need for financial innovation became clear</li>
            </ul>
            <p>This environment gave birth to Bitcoin, introduced through a whitepaper by the mysterious Satoshi Nakamoto.</p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">How Bitcoin Works</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Simple Explanation</h3>
              <p>Think of Bitcoin as a digital ledger that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Records all transactions</li>
                <li>Is maintained by thousands of computers</li>
                <li>Cannot be changed once written</li>
                <li>Is visible to everyone</li>
              </ul>
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
                  🎉 Congratulations! You've completed the Bitcoin Fundamentals section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <Link href="/modules/module2/bitcoin-investment">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Bitcoin as an Investment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}