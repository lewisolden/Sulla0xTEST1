import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, PieChart } from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import BitcoinInvestmentQuiz from "@/components/modules/quizzes/BitcoinInvestmentQuiz";

export default function BitcoinInvestmentSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
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
            className="mt-8"
          >
            <h2 className="text-3xl font-bold text-blue-700">Metcalfe's Law and Bitcoin</h2>
            <p className="text-gray-700 mb-4">
              Metcalfe's law states that the value of a network is proportional to the square of the number of connected users. This principle has profound implications for Bitcoin's adoption and value proposition.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-4 bg-blue-50">
                <h4 className="font-semibold text-blue-800 mb-2">Internet Growth</h4>
                <ul className="text-sm space-y-1">
                  <li>1995: 16 million users</li>
                  <li>2000: 400 million users</li>
                  <li>2023: 5.3 billion users</li>
                </ul>
              </Card>
              <Card className="p-4 bg-blue-50">
                <h4 className="font-semibold text-blue-800 mb-2">Mobile Phones</h4>
                <ul className="text-sm space-y-1">
                  <li>1990: 11 million users</li>
                  <li>2000: 740 million users</li>
                  <li>2023: 7.3 billion users</li>
                </ul>
              </Card>
              <Card className="p-4 bg-blue-50">
                <h4 className="font-semibold text-blue-800 mb-2">Bitcoin Wallets</h4>
                <ul className="text-sm space-y-1">
                  <li>2013: 3 million users</li>
                  <li>2018: 32 million users</li>
                  <li>2023: 425+ million users</li>
                </ul>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h4 className="font-semibold text-blue-800 mb-2">Network Effect Implications</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>As more users adopt Bitcoin, its utility as a payment network increases exponentially</li>
                <li>Growing adoption leads to increased liquidity and price stability</li>
                <li>Network effects create a positive feedback loop for adoption</li>
                <li>Similar adoption curve to early internet and mobile phone growth</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-3xl font-bold text-blue-700">Value Comparisons</h2>
            <p className="text-gray-700 mb-4">
              To understand Bitcoin's value in context, let's compare what $100,000 gets you across different investment vehicles:
            </p>

            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Gold</h4>
                <div className="flex justify-between items-center">
                  <span>$100,000 ≈ 1.6 kilograms of gold</span>
                  <span className="text-sm text-gray-600">(Based on ~$2,000/oz)</span>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">S&P 500 Index Fund</h4>
                <div className="flex justify-between items-center">
                  <span>$100,000 ≈ 200 shares</span>
                  <span className="text-sm text-gray-600">(Based on ~$500/share)</span>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Real Estate</h4>
                <div className="flex justify-between items-center">
                  <span>$100,000 ≈ 20% down payment on $500,000 property</span>
                  <span className="text-sm text-gray-600">(Typical down payment)</span>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Bitcoin</h4>
                <div className="flex justify-between items-center">
                  <span>$100,000 ≈ 2.5 BTC</span>
                  <span className="text-sm text-gray-600">(Based on ~$40,000/BTC)</span>
                </div>
              </Card>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-yellow-800">
                Note: These values are approximate and subject to market fluctuations. Always verify current market prices before making investment decisions.
              </p>
            </div>
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

              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                </Button>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                  <Link href="/modules/module2/bitcoin-fundamentals">
                    <Button variant="outline" className="w-full md:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bitcoin Fundamentals
                    </Button>
                  </Link>

                  <Link href="/modules/module2/security-risk">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                      Next: Security and Risk Management <ArrowRight className="ml-2 h-4 w-4" />
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
                  <BitcoinInvestmentQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}