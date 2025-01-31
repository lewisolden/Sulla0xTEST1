import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Shield, Key, Wallet } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import SecurityQuiz from "@/components/quizzes/SecurityQuiz";

export default function SecuritySection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'security', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="container mx-auto px-4 py-8"
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-full bg-blue-600" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link href="/modules/module1/digital-currencies">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Digital Currencies
              </Button>
            </Link>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-blue-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Understanding Cryptocurrency Security
          </motion.h1>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            <motion.section
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-700">Introduction to Cryptocurrency Security</h2>
                </div>
                <p>
                  Security is paramount in the cryptocurrency world. Understanding the fundamental
                  security principles and best practices is crucial for anyone involved in
                  cryptocurrency investments or transactions.
                </p>
              </Card>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Security Concepts</h2>

              <Card className="p-6 bg-white shadow-lg rounded-lg mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <Key className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Private Keys and Wallets</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Private keys are the foundation of cryptocurrency ownership</li>
                  <li>Different types of wallets (hot, cold, hardware) offer varying security levels</li>
                  <li>Best practices for private key management and storage</li>
                </ul>
              </Card>

              <Card className="p-6 bg-white shadow-lg rounded-lg mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Common Security Threats</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Phishing attacks and social engineering</li>
                  <li>Malware and ransomware risks</li>
                  <li>Exchange hacks and vulnerabilities</li>
                  <li>Smart contract exploits</li>
                </ul>
              </Card>
            </motion.section>

            <motion.section
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue-700 mt-8">Security Best Practices</h2>

              <Card className="p-6 bg-white shadow-lg rounded-lg mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <Wallet className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Personal Security Measures</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use strong, unique passwords</li>
                  <li>Enable two-factor authentication (2FA)</li>
                  <li>Regular software updates and security patches</li>
                  <li>Backup strategies for recovery phrases</li>
                </ul>
              </Card>

              <Card className="p-6 bg-white shadow-lg rounded-lg mt-4">
                <h3 className="text-2xl font-semibold text-blue-600">Transaction Security</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Verify recipient addresses multiple times</li>
                  <li>Start with small test transactions</li>
                  <li>Use trusted and secure networks</li>
                  <li>Understand transaction fees and confirmation times</li>
                </ul>
              </Card>
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
                    🎉 Congratulations! You've completed the Understanding Cryptocurrency Security section.
                    You now understand the fundamental security concepts and best practices for protecting
                    your cryptocurrency assets.
                  </p>
                </Card>

                <div className="flex flex-col space-y-4">
                  <Button
                    onClick={() => setShowQuiz(!showQuiz)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                  </Button>

                  <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                    <Link href="/modules/module1/digital-currencies">
                      <Button 
                        variant="outline"
                        size="lg"
                        className="w-full md:w-auto"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                      </Button>
                    </Link>

                    <Link href="/modules/module1/cryptography">
                      <Button 
                        size="lg"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                      >
                        Next Topic: Cryptography
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {showQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <SecurityQuiz />
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}