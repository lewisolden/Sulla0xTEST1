import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import CryptoMarketQuiz from "@/components/modules/quizzes/CryptoMarketQuiz";
import MarketMetricsDiagram from "@/components/diagrams/MarketMetricsDiagram";
import MarketBehaviorDiagram from "@/components/diagrams/MarketBehaviorDiagram";

export default function CryptoMarketSection() {
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
        updateProgress(1, 'crypto-market', true);
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
          <Link href="/modules/module1/altcoins-tokens">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Altcoins and Tokens
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Understanding Cryptocurrency Market Dynamics
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              The cryptocurrency market is known for its unique characteristics, high volatility, 
              and complex dynamics. Understanding these market mechanics is crucial for anyone 
              looking to participate in or study the crypto ecosystem.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Market Characteristics</h2>
            <MarketMetricsDiagram />

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. High Volatility</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Dramatic price fluctuations in short periods</li>
              <li>Influenced by market sentiment and news</li>
              <li>Impact of regulatory announcements</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. 24/7 Trading</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Markets never close</li>
              <li>Immediate reaction to global events</li>
              <li>Continuous price discovery</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Global Accessibility</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Anyone with internet access can participate</li>
              <li>Reduced barriers to entry</li>
              <li>Cross-border transactions</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Behavior Patterns</h2>
            <MarketBehaviorDiagram />

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Market Cycles</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Bull and bear market phases</li>
              <li>Halving events impact</li>
              <li>Altcoin season patterns</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Market Sentiment</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Fear and Greed Index</li>
              <li>Social media influence</li>
              <li>News impact analysis</li>
            </ul>
          </motion.section>
        </div>

        {isFullyRead && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 You've completed the Cryptocurrency Market Dynamics section! You now understand 
                  how cryptocurrency markets function and the various factors that influence them.
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
                  <Link href="/modules/module1/altcoins-tokens">
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
                      Next Topic: Basic Cryptography <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CryptoMarketQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
      </div>
    </div>
  );
}