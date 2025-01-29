import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HistoryOfMoneyQuiz from "@/components/modules/quizzes/HistoryOfMoneyQuiz";
import MoneyEvolutionTimeline from "@/components/diagrams/MoneyEvolutionTimeline";
import MoneyTypeCards from "@/components/diagrams/MoneyTypeCards";

export default function HistoryOfMoneySection() {
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
        updateProgress(1, 'history-of-money', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
          History and Evolution of Money
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p>
              Money, in its various forms, has been a cornerstone of human civilization for thousands of years. 
              To understand the significance of modern cryptocurrencies, it's crucial to trace the evolution of money 
              from its earliest incarnations to the digital age. This journey reveals not just changes in the form of money, 
              but also shifts in how societies conceptualise value and trust.
            </p>
            <MoneyEvolutionTimeline />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Money Through History</h2>
            <MoneyTypeCards />
          </motion.section>


          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">The Birth of Cryptocurrencies</h2>
            <p>
              The 2008 financial crisis highlighted weaknesses in the traditional financial system, setting the stage for a radical new approach to money:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Bitcoin:</strong> Launched in 2009, it combined cryptography, peer-to-peer networks, and blockchain technology</li>
              <li><strong>Altcoins:</strong> Many alternative cryptocurrencies followed, each with unique features</li>
              <li><strong>Decentralisation:</strong> Cryptocurrencies operate without central control, a significant departure from fiat currencies</li>
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
                  🎉 You've completed the History of Money section! You now understand how currency has evolved from physical to digital forms throughout history.
                </p>
              </Card>

              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
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

                  <Link href="/modules/module1/bitcoin">
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Next Topic: Bitcoin <ArrowRight className="ml-2 h-4 w-4" />
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
                  <HistoryOfMoneyQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}