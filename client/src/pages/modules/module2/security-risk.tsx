import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SecurityRiskSection() {
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
        updateProgress(2, 'security-risk', true);
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
          2.3 Security and Risk Management
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Essential Security Practices</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Beginner's Security Checklist</h3>
              <ul className="list-none space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">□</span>Never share your recovery phrase
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Start with small amounts
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Use reputable exchanges
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Keep most funds in cold storage
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Double-check addresses before sending
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Don't invest more than you can afford to lose
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Beware of scams
                </li>
                <li className="flex items-center">
                  <span className="mr-2">□</span>Save backups in multiple safe locations
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold text-blue-600">Advanced Security Measures</h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-3">Storage Solutions</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Hot wallets for daily use</li>
                  <li>Cold storage for large amounts</li>
                  <li>Multi-signature setups</li>
                  <li>Hardware wallet best practices</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Risk Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Security Mistakes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Losing recovery phrases</li>
                  <li>Using unsafe storage</li>
                  <li>Falling for scams</li>
                  <li>Not testing recovery</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Investment Mistakes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Investing too much</li>
                  <li>Emotional trading</li>
                  <li>Poor timing decisions</li>
                  <li>Ignoring security</li>
                </ul>
              </div>
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
                  🎉 Congratulations! You've completed the Security and Risk Management section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <Link href="/modules/module2/exercises">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Practical Exercises <ArrowRight className="ml-2 h-4 w-4" />
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
