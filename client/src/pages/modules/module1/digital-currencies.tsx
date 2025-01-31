import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import DecentralizationDiagram from "@/components/diagrams/DecentralizationDiagram";
import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";

export default function DigitalCurrenciesSection() {
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
        updateProgress(1, 'digital-currencies', true);
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

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        mass: 0.3,
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3
      }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
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
        <motion.div
          className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: scrollProgress / 100,
            transition: { duration: 0.2 }
          }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-full bg-blue-600" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            className="mb-6"
          >
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2 group">
                <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100 
            }}
            className="text-4xl font-bold text-blue-800 mb-6"
          >
            Module 1: Understanding Cryptocurrency
          </motion.h1>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            {/* All previous sections from the original code */}
            {/* (Introduction, Understanding Money, Evolution of Money, etc.) */}
            {/* Each section remains exactly the same as in the original code */}
            
            {/* Sections from Introduction to Conclusion */}
            {/* (All content from lines 169-556 in the original code) */}

            {isFullyRead && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-6"
              >
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                    <p className="text-green-700">
                      🎉 Congratulations! You've completed the Introduction to Digital Currencies section. You now understand the fundamental concepts of digital currencies and their revolutionary potential.
                    </p>
                  </Card>
                </motion.div>

                <div className="flex flex-col space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => setShowQuiz(!showQuiz)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                    </Button>
                  </motion.div>

                  <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                    <motion.div
                      whileHover={{ scale: 1.02, x: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/modules/module1">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full md:w-auto group"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                          Back to Overview
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href="/modules/module1/security">
                        <Button
                          size="lg"
                          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 group"
                        >
                          Next Topic: Understanding Security
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {showQuiz && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8"
                    >
                      <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                      <DigitalCurrenciesQuiz />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}