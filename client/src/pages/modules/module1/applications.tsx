import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PracticalApplicationsDiagram } from "@/components/diagrams/PracticalApplicationsDiagram";
import { PracticalApplicationsQuiz } from "@/components/quizzes/PracticalApplicationsQuiz";

const PracticalApplicationsSection = () => {
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
        updateProgress(1, 'practical-applications', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Module Overview
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Practical Applications of Blockchain Technology
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <section>
              <h2 className="text-2xl font-bold text-blue-700">Overview</h2>
              <p className="text-gray-700">
                While blockchain technology gained prominence through cryptocurrencies, its potential applications extend far beyond digital currencies. This section explores how blockchain is transforming various industries and creating new possibilities for business and society.
              </p>

              <PracticalApplicationsDiagram />
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Financial Inclusion</h2>
              <p className="text-gray-700">
                One of the most significant applications of blockchain is providing financial services to the unbanked and underbanked populations worldwide. Through blockchain:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>People without access to traditional banking can participate in the global economy</li>
                <li>Remittance costs can be significantly reduced</li>
                <li>Micro-lending and peer-to-peer financial services become more accessible</li>
                <li>Cross-border transactions become faster and cheaper</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Payment Efficiency</h2>
              <p className="text-gray-700">
                Blockchain is revolutionizing payment systems by offering:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Near-instant settlements</li>
                <li>24/7 operation without banking hours restrictions</li>
                <li>Lower transaction fees for international transfers</li>
                <li>Programmable payments through smart contracts</li>
                <li>Enhanced security through cryptographic verification</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Investment Opportunities</h2>
              <p className="text-gray-700">
                Blockchain has created new investment possibilities:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Digital asset trading</li>
                <li>Decentralized finance (DeFi) opportunities</li>
                <li>Tokenized real-world assets</li>
                <li>Yield farming and liquidity provision</li>
                <li>Cryptocurrency index funds and ETFs</li>
              </ul>
            </section>
          </CardContent>
        </Card>

        {isFullyRead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Practical Applications section!
              </p>
            </Card>

            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
            </Button>

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <PracticalApplicationsQuiz />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex justify-between mt-4">
              <Link href="/modules/module1/security">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Topic
                </Button>
              </Link>
              <Link href="/modules/module1/getting-started">
                <Button className="gap-2">
                  Next Topic
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PracticalApplicationsSection;