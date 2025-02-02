import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
        updateProgress(2, 'bitcoin-fundamentals', true);
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
          2.1 Bitcoin Fundamentals
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">The Birth of Bitcoin</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Historical Context and Significance</h3>
            <p>
              The 2008 financial crisis revealed fundamental problems in our financial system. During this turbulent time:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Banks were failing</li>
              <li>Governments were implementing massive bailouts</li>
              <li>Public trust in financial institutions was eroding</li>
              <li>The need for financial innovation became clear</li>
            </ul>
            <p>This environment gave birth to Bitcoin, introduced through a whitepaper by the mysterious Satoshi Nakamoto.</p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold text-blue-600">Key Historical Milestones</h3>
            <div className="space-y-4">
              <div>
                <strong>Genesis Block (January 3, 2009)</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>First Bitcoin block ever mined</li>
                  <li>Contained a message about bank bailouts</li>
                  <li>Marked the start of Bitcoin's blockchain</li>
                </ul>
              </div>
              <div>
                <strong>First Transaction</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Between Satoshi and Hal Finney</li>
                  <li>Proved the network could transfer value</li>
                  <li>Demonstrated peer-to-peer functionality</li>
                </ul>
              </div>
              <div>
                <strong>Pizza Purchase (May 2010)</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>10,000 BTC for two pizzas</li>
                  <li>First real-world transaction</li>
                  <li>Shows Bitcoin's remarkable value evolution</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">How Bitcoin Works</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Simple Explanation</h3>
              <p>Think of Bitcoin as a digital ledger that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Records all transactions</li>
                <li>Is maintained by thousands of computers</li>
                <li>Cannot be changed once written</li>
                <li>Is visible to everyone</li>
              </ul>
            </div>
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
                  🎉 Congratulations! You've completed the Bitcoin Fundamentals section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <Link href="/modules/module2/bitcoin-investment">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Bitcoin as an Investment <ArrowRight className="ml-2 h-4 w-4" />
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