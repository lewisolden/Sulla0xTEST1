import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Shield, AlertTriangle, TrendingUp, Lock, Info, FileKey, DollarSign, AlertCircle, ArrowLeft } from "lucide-react";
import SecurityQuiz from "@/components/modules/quizzes/SecurityQuiz";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";

const SecurityRisksSection = () => {
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
        updateProgress(3, 'security-risks', true, 1, undefined, 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module3">
            <Button variant="ghost" className="gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-xl p-8 mb-12 shadow-xl border border-blue-500/20">
          <div className="flex items-center">
            <div>
              <motion.h1
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                3.4 Security and Risk Management
              </motion.h1>
              <p className="text-xl text-gray-300">
                Understanding Smart Contract Security & Risk Mitigation
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Card */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-purple-900/50 border-t border-blue-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Understanding Smart Contract Security
              </h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Smart contracts are like digital vending machines that automatically execute actions when certain 
              conditions are met. Just like a real vending machine needs protection from theft and tampering, 
              smart contracts need security measures to protect the assets and data they handle.
            </p>
          </Card>
        </motion.div>

        {/* Technical Vulnerabilities Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-orange-900/50 via-red-900/50 to-purple-900/50 border-t border-orange-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Common Technical Vulnerabilities
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Code Bugs Section */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-lg border border-orange-500/20 shadow-lg backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-orange-400 mb-3">Code Bugs and Exploits</h3>
                  <p className="text-gray-300 mb-3">
                    Think of code bugs like typos in a legal contract. Just as a misplaced comma in a 
                    legal document could change its meaning, a small error in smart contract code could 
                    lead to unexpected behavior.
                  </p>
                  <div className="bg-black/30 p-4 rounded-md border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Example:</h4>
                    <p className="text-gray-400">
                      The DAO hack of 2016 occurred because of a "re-entrancy" bug, where an attacker 
                      could repeatedly withdraw funds before the balance was updated - similar to 
                      withdrawing money from an ATM that doesn't immediately update your balance.
                    </p>
                  </div>
                </motion.div>

                {/* Logic Flaws Section */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-lg border border-blue-500/20 shadow-lg backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Logic Flaws</h3>
                  <p className="text-gray-300 mb-3">
                    Logic flaws are like design mistakes in a building's blueprint. The code might work 
                    exactly as written, but the underlying logic could be flawed.
                  </p>
                  <div className="bg-black/30 p-4 rounded-md border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Real-World Example:</h4>
                    <p className="text-gray-400">
                      A DeFi protocol might allow users to borrow assets without proper collateral checks, 
                      similar to a bank giving out loans without checking credit scores.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Integration Failures Section */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/20 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileKey className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-purple-400">Integration Failures</h3>
                </div>
                <p className="text-gray-300 mb-3">
                  When smart contracts interact with other contracts or external systems, there's potential 
                  for integration problems. It's like trying to connect different pieces of machinery - if 
                  they don't fit perfectly, things can go wrong.
                </p>
                <div className="bg-black/30 p-4 rounded-md border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">Prevention Steps:</h4>
                  <ul className="list-disc pl-5 text-gray-400 space-y-1">
                    <li>Thorough testing of contract interactions</li>
                    <li>Careful validation of external data sources</li>
                    <li>Implementation of fail-safes and circuit breakers</li>
                    <li>Regular security audits of connected systems</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Economic Attack Vectors */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-green-900/50 via-teal-900/50 to-blue-900/50 border-t border-green-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                Economic Attack Vectors
              </h2>
            </div>

            <div className="space-y-6">
              {/* Flash Loan Attacks */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-900/30 to-teal-900/30 p-6 rounded-lg border border-green-500/20 shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-green-400 mb-3">Flash Loan Attacks</h3>
                <p className="text-gray-300 mb-3">
                  Flash loans are like borrowing money and returning it in the same transaction. While 
                  legitimate, they can be used maliciously. Imagine borrowing a large sum of money, 
                  using it to manipulate market prices, profiting from the manipulation, and repaying 
                  the loan - all in seconds.
                </p>
                <div className="bg-black/30 p-4 rounded-md border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Protection Measures:</h4>
                  <ul className="list-disc pl-5 text-gray-400 space-y-1">
                    <li>Implementation of price oracle security</li>
                    <li>Time-weighted average prices (TWAP)</li>
                    <li>Multi-block confirmation requirements</li>
                  </ul>
                </div>
              </motion.div>

              {/* Price Manipulation & Front-running Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-lg border border-yellow-500/20 shadow-lg backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-yellow-400 mb-3">Price Manipulation</h3>
                  <p className="text-gray-300 mb-3">
                    Price manipulation in crypto is like creating artificial demand or supply to move 
                    prices. Think of it as coordinated buying or selling to trick other traders.
                  </p>
                  <div className="bg-black/30 p-4 rounded-md border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Warning Signs:</h4>
                    <ul className="list-disc pl-5 text-gray-400 space-y-1">
                      <li>Sudden large price movements</li>
                      <li>Unusual trading patterns</li>
                      <li>Coordinated buying/selling</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-red-900/30 to-pink-900/30 p-6 rounded-lg border border-red-500/20 shadow-lg backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold text-red-400 mb-3">Front-running</h3>
                  <p className="text-gray-300 mb-3">
                    Front-running is like cutting in line at a store because you know what the person 
                    behind you wants to buy. In crypto, it means seeing someone's transaction before 
                    it's processed and jumping ahead of them for profit.
                  </p>
                  <div className="bg-black/30 p-4 rounded-md border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Prevention:</h4>
                    <ul className="list-disc pl-5 text-gray-400 space-y-1">
                      <li>Commit-reveal schemes</li>
                      <li>Maximum slippage settings</li>
                      <li>Private transaction pools</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Personal Security Best Practices */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-900/50 via-violet-900/50 to-purple-900/50 border-t border-indigo-500/30 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Personal Security Best Practices
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-indigo-900/30 to-violet-900/30 p-6 rounded-lg border border-indigo-500/20 shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-indigo-400 mb-3">Essential Security Habits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <span className="font-semibold text-indigo-400">Hardware Wallets:</span>
                      <p className="text-gray-400">
                        Think of it as a digital safe for your crypto assets. Never store large amounts 
                        in online wallets.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <span className="font-semibold text-indigo-400">Regular Audits:</span>
                      <p className="text-gray-400">
                        Periodically review your security settings and transaction history, like checking 
                        your bank statements.
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-black/30 p-6 rounded-lg border border-violet-500/20 shadow-lg backdrop-blur-sm"
              >
                <h4 className="font-semibold text-violet-400 mb-4">Security Checklist:</h4>
                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                  <li>Use strong, unique passwords for each platform</li>
                  <li>Enable 2-factor authentication everywhere possible</li>
                  <li>Keep recovery phrases in multiple secure locations</li>
                  <li>Never share private keys or seed phrases</li>
                  <li>Verify all transaction details before signing</li>
                  <li>Use test transactions for large transfers</li>
                </ul>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-t-lg border-b border-gray-600">
                <h2 className="text-xl font-bold text-gray-100">
                  Test Your Knowledge
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Let's verify your understanding of Security and Risk Management
                </p>
              </div>
              <div className="p-4">
                <SecurityQuiz onComplete={() => {}} />
              </div>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3/investment-value",
            label: "Investment and Value"
          }}
          next={{
            path: "/modules/module3/exercises",
            label: "Practical Exercises"
          }}
        />
      </div>
    </div>
  );
};

export default SecurityRisksSection;