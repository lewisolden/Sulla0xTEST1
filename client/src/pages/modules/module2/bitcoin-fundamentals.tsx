import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  ArrowLeft,
  ArrowRight,
  Network,
  Database,
  Code,
  Lightbulb,
  ArrowUpRight,
  History,
  LucideIcon,
  Coins,
  ArrowRightCircle,
  ChevronsRight,
  Book
} from "lucide-react";
import BitcoinBasicsDiagram from "@/components/diagrams/BitcoinBasicsDiagram";
import BitcoinFundamentalsQuiz from "@/components/modules/quizzes/BitcoinFundamentalsQuiz";
import ProofOfWorkDiagram from "@/components/diagrams/ProofOfWorkDiagram";
import { UTXOExercise } from "@/components/exercises/UTXOExercise";
import BitcoinTimeline from "@/components/diagrams/BitcoinTimeline";
import HowBitcoinWorksNew from "@/components/diagrams/HowBitcoinWorksNew";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const FeatureCard = ({ title, description, icon: Icon, gradient }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl shadow-lg ${gradient} text-white`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-white/90 pl-2 border-l-2 border-white/20">{description}</p>
  </motion.div>
);

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A" />
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

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
        updateProgress(2, 'bitcoin-fundamentals', true, 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600" />
      </motion.div>

      <div className="container mx-auto px-4 py-8">
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

          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-xl p-8 mb-12 shadow-lg">
            <div className="flex items-center">
              <BitcoinLogo />
              <div>
                <motion.h1
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  2.1 Bitcoin Fundamentals
                </motion.h1>
                <p className="text-xl text-orange-100">
                  Understanding the World's First Cryptocurrency
                </p>
              </div>
            </div>
          </div>

          <div className="prose lg:prose-xl text-gray-700 space-y-12">
            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <BitcoinBasicsDiagram />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <FeatureCard
                  title="Decentralized Network"
                  description="A global network of computers maintaining the Bitcoin blockchain without central authority."
                  icon={Network}
                  gradient="bg-gradient-to-br from-blue-500 to-purple-600"
                />
                <FeatureCard
                  title="Digital Scarcity"
                  description="Limited supply of 21 million coins, creating true digital scarcity for the first time."
                  icon={Database}
                  gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                />
                <FeatureCard
                  title="Secure Transactions"
                  description="Cryptographic security ensuring safe and immutable transactions."
                  icon={Code}
                  gradient="bg-gradient-to-br from-pink-500 to-red-600"
                />
                <FeatureCard
                  title="Financial Innovation"
                  description="Revolutionary technology changing how we think about money and value transfer."
                  icon={Lightbulb}
                  gradient="bg-gradient-to-br from-red-500 to-orange-600"
                />
              </div>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <History className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-blue-800">The Birth of Bitcoin</h2>
                  <h3 className="text-xl text-blue-600">Historical Context and Significance</h3>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <p className="mb-4">
                  The 2008 financial crisis revealed fundamental problems in our financial system. During this turbulent time:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Banks were failing</li>
                  <li>Governments were implementing massive bailouts</li>
                  <li>Public trust in financial institutions was eroding</li>
                  <li>The need for financial innovation became clear</li>
                </ul>
                <p>This environment gave birth to Bitcoin, introduced through a whitepaper by the mysterious Satoshi Nakamoto.</p>
              </div>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <Card className="p-6 bg-white/90 shadow-lg">
                <h2 className="text-3xl font-bold text-orange-800 mb-6">The Journey of Bitcoin</h2>
                <p className="text-gray-700 mb-8">
                  From its enigmatic beginnings to becoming a global financial phenomenon, Bitcoin's journey
                  has been nothing short of revolutionary. Let's explore the major milestones:
                </p>
                <BitcoinTimeline />
              </Card>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Network className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-orange-800">How Bitcoin Works</h2>
                  <h3 className="text-xl text-orange-600">A Simple Guide to Bitcoin's Technology</h3>
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md mb-8">
                  <h3 className="text-2xl font-semibold text-orange-700 mb-4">Simple Explanation</h3>
                  <p className="mb-4">Think of Bitcoin as a digital ledger that:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Records all transactions</li>
                    <li>Is maintained by thousands of computers</li>
                    <li>Cannot be changed once written</li>
                    <li>Is visible to everyone</li>
                  </ul>
                </div>
                <HowBitcoinWorksNew />
              </div>
            </motion.section>


            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-blue-800">Understanding Bitcoin Transactions</h2>
                  <p className="text-lg text-blue-600">How Money Moves in the Bitcoin Network</p>
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Coins className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">The Basics: Think of it Like Cash</h4>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 text-lg mb-3">
                          Imagine you have a $20 bill and want to buy something that costs $8:
                        </p>
                        <div className="flex items-center justify-center gap-8 my-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-20 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                              $20
                            </div>
                            <p className="text-sm text-gray-600">Original Bill</p>
                          </motion.div>
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <ChevronsRight className="h-8 w-8 text-blue-400" />
                          </motion.div>
                          <div className="flex flex-col gap-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-20 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                            >
                              $8
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-20 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
                            >
                              $12
                            </motion.div>
                          </div>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>You give the $20 bill (you can't tear it in half!)</li>
                          <li>You get $12 back as change</li>
                          <li>The original $20 bill can't be used again by you</li>
                          <li>You now have a new $12 bill instead</li>
                        </ul>
                      </div>
                      <p className="text-blue-600 font-medium flex items-center gap-2">
                        <ArrowRightCircle className="h-5 w-5" />
                        Bitcoin works exactly the same way with UTXOs!
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Database className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-blue-800 mb-3">Bitcoin's Digital Wallet: UTXOs Explained</h4>
                      <p className="text-gray-700 mb-4">
                        Your Bitcoin wallet doesn't actually store a single "balance" number. Instead, it's like having different bills in your physical wallet:
                      </p>
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl mb-4">
                        <h5 className="font-medium text-purple-800 mb-4">Example of Your Digital Wallet:</h5>
                        <div className="flex flex-wrap gap-4 justify-center">
                          {[0.5, 0.3, 0.1].map((amount, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05, rotate: 5 }}
                              className="bg-white p-4 rounded-xl shadow-md border border-purple-100"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-yellow-500" />
                                <span className="font-bold text-purple-700">{amount} BTC</span>
                              </div>
                              <div className="text-xs text-gray-500">UTXO #{idx + 1}</div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-lg font-semibold text-purple-800">
                            Total Balance: 0.9 BTC
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      Remember These Rules:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>You must use entire "digital bills" (UTXOs)</li>
                      <li>If you spend more than needed, you get change back</li>
                      <li>Once you spend a UTXO, it's gone forever</li>
                      <li>Your wallet's balance is the sum of all UTXOs</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                  >
                    <h4 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                      Advanced Details:
                    </h4>
                    <p className="text-gray-700 mb-2">Behind the scenes, each UTXO contains:</p>
                    <ul className="list-disc pl-5 text-gray-700">
                      <li>A unique identifier (like a serial number)</li>
                      <li>The amount it's worth</li>
                      <li>A digital lock that only you can unlock</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-lg mt-8"
            >
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Interactive UTXO Exercise</h3>
              <p className="text-gray-700 mb-6">
                Now that you understand how UTXOs work, let's practice with an interactive exercise.
                Try to complete transactions by selecting the right combination of UTXOs!
              </p>
              <UTXOExercise />
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <ArrowUpRight className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-orange-800">Understanding Proof of Work</h2>
                  <p className="text-lg text-orange-600">The Engine Behind Bitcoin</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold text-orange-700 mb-4">What is Proof of Work?</h3>
                  <p className="text-gray-700 mb-4">
                    Think of Proof of Work like a complex puzzle competition where:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                    <li>Many computers (miners) compete to solve a mathematical puzzle</li>
                    <li>The first one to solve it gets to add a new block to the blockchain</li>
                    <li>The winner receives newly created bitcoins as a reward</li>
                    <li>The puzzle is hard to solve but easy to verify - like a Sudoku puzzle</li>
                  </ul>
                </div>

                <ProofOfWorkDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                  >
                    <h4 className="font-semibold text-orange-800 mb-2">Why So Much Energy?</h4>
                    <p className="text-gray-700">
                      The high energy use is actually a feature, not a bug. It makes it extremely expensive
                      to attack the network, ensuring its security through real-world costs.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
                  >
                    <h4 className="font-semibold text-orange-800 mb-2">Mining Today</h4>
                    <p className="text-gray-700">
                      Today most mining is done by specialized computers in large facilities.
                      Individual miners often join mining pools to share resources and rewards.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {isFullyRead && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <BitcoinFundamentalsQuiz />
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-8">
                  <Link href="/modules/module2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                    </Button>
                  </Link>

                  <Link href="/modules/module2/bitcoin-investment">
                    <Button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                      Next: Bitcoin as an Investment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};