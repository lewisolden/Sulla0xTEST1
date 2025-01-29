import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AltcoinsTokensQuiz from "@/components/quizzes/AltcoinsTokensQuiz";
import AltcoinCategories from "@/components/diagrams/AltcoinCategories";
import TokenTypes from "@/components/diagrams/TokenTypes";

export default function AltcoinsTokensSection() {
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
        updateProgress(1, 'altcoins-tokens', true);
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
          <Link href="/modules/module1/bitcoin">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Bitcoin
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Altcoins and Tokens: Beyond Bitcoin
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              While Bitcoin was the first cryptocurrency, it sparked the creation of numerous 
              other digital currencies and tokens. These are collectively known as "altcoins" 
              (alternative coins) and tokens. This section explores the diverse world of 
              cryptocurrencies beyond Bitcoin.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Major Categories of Altcoins</h2>
            <AltcoinCategories />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Tokens</h2>
            <TokenTypes />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Challenges and Considerations</h2>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">Market Saturation</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Thousands of altcoins and tokens exist</li>
              <li>Difficult for investors to navigate</li>
              <li>Many projects fail to gain traction</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">Technical Vulnerabilities</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Smart contract bugs can lead to losses</li>
              <li>Smaller networks vulnerable to attacks</li>
              <li>Security audits crucial for new projects</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">Regulatory Challenges</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Varying regulatory approaches globally</li>
              <li>Complex compliance requirements</li>
              <li>Ongoing regulatory developments</li>
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
                🎉 You've completed the Altcoins and Tokens section! You now understand 
                the diverse ecosystem of cryptocurrencies beyond Bitcoin and the different 
                types of blockchain-based assets.
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
                <Link href="/modules/module1/bitcoin">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                  </Button>
                </Link>

                <Link href="/modules/module1/crypto-market">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Next Topic: Crypto Market Dynamics <ArrowRight className="ml-2 h-4 w-4" />
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
                <AltcoinsTokensQuiz />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}