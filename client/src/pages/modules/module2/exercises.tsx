import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function ExercisesSection() {
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
        updateProgress(2, 'practical-exercises', true);
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
          2.4 Practical Exercises
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Beginner Level Exercises</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-2xl font-semibold text-blue-600">Exercise 1: Wallet Setup and Security</h3>
              <p className="text-gray-600 mb-4"><strong>Objective:</strong> Set up your first Bitcoin wallet and implement basic security measures.</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">1. Install a Test Wallet</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Download TestNet Bitcoin Wallet</li>
                    <li>Complete initial setup</li>
                    <li>Write down recovery phrase properly</li>
                    <li>Enable basic security features</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">2. Security Implementation</h4>
                  <ul className="list-none space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Create strong password
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Enable biometric authentication if available
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Set up 2-factor authentication
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Store recovery phrase in two secure locations
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">Exercise 2: Understanding Transactions</h3>
              <p className="text-gray-600 mb-4"><strong>Objective:</strong> Practice sending and receiving Bitcoin on a test network.</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">1. Get Test Bitcoin</h4>
                  <ul className="list-none space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Find a reliable Bitcoin testnet faucet
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Request test Bitcoin
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Confirm receipt in wallet
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">2. Send Test Transactions</h4>
                  <ul className="list-none space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Send small amount to another test address
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Document transaction fee choices
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">□</span>Monitor confirmation process
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-blue-50 p-6 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Safety Notes:</h3>
            <ul className="list-disc pl-5 space-y-2 text-blue-800">
              <li>Never share private keys</li>
              <li>Use test networks only</li>
              <li>Keep security information private</li>
              <li>Document safely (no sensitive data)</li>
            </ul>
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
                  🎉 Congratulations! You've completed the Practical Exercises section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <Link href="/modules/module2/quiz">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
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
