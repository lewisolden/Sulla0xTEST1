import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, PieChart } from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";

export default function BitcoinInvestmentSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'bitcoin-investment', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const riskLevels = [
    {
      title: "Low Risk",
      description: "Bitcoin ETFs and regulated investment products",
      color: "bg-green-100 hover:bg-green-200",
      textColor: "text-green-700"
    },
    {
      title: "Medium Risk",
      description: "Direct Bitcoin purchases through established exchanges",
      color: "bg-yellow-100 hover:bg-yellow-200",
      textColor: "text-yellow-700"
    },
    {
      title: "High Risk",
      description: "Trading with leverage or new crypto assets",
      color: "bg-red-100 hover:bg-red-200",
      textColor: "text-red-700"
    }
  ];

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
          2.2 Bitcoin as an Investment
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Investment Security</h2>
            <SecurityDiagram />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Risk Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {riskLevels.map((level) => (
                <motion.div
                  key={level.title}
                  className={`${level.color} p-6 rounded-lg cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRisk(level.title)}
                  animate={{
                    scale: selectedRisk === level.title ? 1.02 : 1,
                    borderWidth: selectedRisk === level.title ? 2 : 0,
                    borderColor: selectedRisk === level.title ? '#4F46E5' : 'transparent'
                  }}
                >
                  <h3 className={`text-xl font-semibold ${level.textColor} mb-2`}>
                    {level.title}
                  </h3>
                  <p className="text-gray-700">{level.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>


          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Bitcoin's Value</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Store of Value Properties</h3>
            <p>
              Bitcoin is often called "digital gold" because it shares key characteristics:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Scarcity</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fixed supply of 21 million coins</li>
                  <li>Predictable issuance schedule</li>
                  <li>Cannot be artificially inflated</li>
                </ul>
              </li>
              <li>
                <strong>Durability</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Digital nature prevents degradation</li>
                  <li>Network redundancy ensures availability</li>
                  <li>Recoverable through backups</li>
                </ul>
              </li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-semibold text-blue-600">Investment Considerations for Beginners</h3>
            <p>Before investing, ask yourself:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Risk Assessment</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>How much can I afford to lose?</li>
                  <li>Does this fit my financial plan?</li>
                  <li>Do I have an emergency fund?</li>
                </ul>
              </li>
              <li>
                <strong>Timeline Considerations</strong>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Am I investing for short or long term?</li>
                  <li>Can I hold through market downturns?</li>
                  <li>When might I need this money?</li>
                </ul>
              </li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Bitcoin ETFs Explained</h2>
            <p>
              For beginners, a Bitcoin ETF is like buying Bitcoin through your regular brokerage account:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Trades like a normal stock</li>
              <li>No need to manage private keys</li>
              <li>Regulated and familiar structure</li>
              <li>Professional management</li>
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
                  🎉 Congratulations! You've completed the Bitcoin Investment section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                  </Button>
                </Link>

                <Link href="/modules/module2/security-risk">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Security and Risk Management <ArrowRight className="ml-2 h-4 w-4" />
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