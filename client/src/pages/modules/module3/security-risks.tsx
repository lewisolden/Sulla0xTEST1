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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <div className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex items-center">
            <div>
              <motion.h1
                className="text-4xl font-bold text-white mb-2"
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

        <div className="space-y-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Understanding Smart Contract Security</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Smart contracts are like digital vending machines that automatically execute actions when certain 
              conditions are met. Just like a real vending machine needs protection from theft and tampering, 
              smart contracts need security measures to protect the assets and data they handle.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Common Technical Vulnerabilities</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-orange-700 mb-3">Code Bugs and Exploits</h3>
                <p className="text-gray-600 mb-4">
                  Think of code bugs like typos in a legal contract. Just as a misplaced comma in a 
                  legal document could change its meaning, a small error in smart contract code could 
                  lead to unexpected behavior.
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-orange-600 mb-2">Example:</h4>
                  <p className="text-gray-600">
                    The DAO hack of 2016 occurred because of a "re-entrancy" bug, where an attacker 
                    could repeatedly withdraw funds before the balance was updated.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Logic Flaws</h3>
                <p className="text-gray-600 mb-4">
                  Logic flaws are like design mistakes in a building's blueprint. The code might work 
                  exactly as written, but the underlying logic could be flawed.
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Real-World Example:</h4>
                  <p className="text-gray-600">
                    A DeFi protocol might allow users to borrow assets without proper collateral checks.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <FileKey className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Integration Failures</h2>
            </div>
            <p className="text-gray-600 mb-6">
              When smart contracts interact with other contracts or external systems, there's potential 
              for integration problems. It's like trying to connect different pieces of machinery.
            </p>
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-700 mb-3">Prevention Steps:</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Thorough testing of contract interactions</li>
                <li>Careful validation of external data sources</li>
                <li>Implementation of fail-safes and circuit breakers</li>
                <li>Regular security audits of connected systems</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Economic Attack Vectors</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Flash Loan Attacks</h3>
                <p className="text-gray-600 mb-4">
                  Flash loans are like borrowing money and returning it in the same transaction. While 
                  legitimate, they can be used maliciously to manipulate market prices.
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-green-600 mb-2">Protection Measures:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Implementation of price oracle security</li>
                    <li>Time-weighted average prices (TWAP)</li>
                    <li>Multi-block confirmation requirements</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-3">Price Manipulation</h3>
                  <p className="text-gray-600 mb-4">
                    Price manipulation in crypto is like creating artificial demand or supply to move prices.
                  </p>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-yellow-600 mb-2">Warning Signs:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Sudden large price movements</li>
                      <li>Unusual trading patterns</li>
                      <li>Coordinated buying/selling</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-700 mb-3">Front-running</h3>
                  <p className="text-gray-600 mb-4">
                    Front-running is like cutting in line at a store because you know what the person 
                    behind you wants to buy.
                  </p>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-red-600 mb-2">Prevention:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Commit-reveal schemes</li>
                      <li>Maximum slippage settings</li>
                      <li>Private transaction pools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Personal Security Best Practices</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Essential Security Habits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <span className="font-semibold">Hardware Wallets:</span>
                      <p className="text-gray-600">
                        Think of it as a digital safe for your crypto assets.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <span className="font-semibold">Regular Audits:</span>
                      <p className="text-gray-600">
                        Periodically review your security settings and transaction history.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-indigo-700 mb-4">Security Checklist:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Use strong, unique passwords for each platform</li>
                  <li>Enable 2-factor authentication everywhere possible</li>
                  <li>Keep recovery phrases in multiple secure locations</li>
                  <li>Never share private keys or seed phrases</li>
                  <li>Verify all transaction details before signing</li>
                  <li>Use test transactions for large transfers</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

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