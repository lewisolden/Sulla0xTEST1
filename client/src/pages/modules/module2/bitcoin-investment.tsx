import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  PieChart,
  Landmark,
  Coins,
  LineChart,
  DollarSign,
  Scale,
  Lock,
  BarChart4,
  Building2
} from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import BitcoinInvestmentQuiz from "@/components/modules/quizzes/BitcoinInvestmentQuiz";

const RiskCard = ({ title, description, features, icon: Icon, color }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl shadow-lg ${color}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-white/10 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/90 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature: string, index: number) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 text-white/80"
        >
          <div className="h-1.5 w-1.5 bg-white rounded-full" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const ComparisonCard = ({ title, value, details, icon: Icon }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-white rounded-xl shadow-lg border border-gray-200"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-blue-600 font-semibold">{value}</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm">{details}</p>
  </motion.div>
);

const MarketMetric = ({ label, value, change, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white"
  >
    <h4 className="text-white/80 mb-2">{label}</h4>
    <div className="text-2xl font-bold mb-2">{value}</div>
    <div className={`text-sm ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
    </div>
  </motion.div>
);

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
        updateProgress({
          moduleId: 2,
          sectionId: 'bitcoin-investment',
          completed: true,
          score: 100,
          totalSections: 8,
          currentSection: 3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const riskLevels = [
    {
      title: "Conservative",
      description: "Lower risk, regulated investment products",
      icon: ShieldCheck,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      features: [
        "Bitcoin ETFs",
        "Regulated investment funds",
        "Long-term holding strategy",
        "Dollar-cost averaging"
      ]
    },
    {
      title: "Moderate",
      description: "Balanced approach with direct exposure",
      icon: Scale,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: [
        "Direct Bitcoin purchases",
        "Multiple exchange accounts",
        "Hardware wallet storage",
        "Regular portfolio rebalancing"
      ]
    },
    {
      title: "Aggressive",
      description: "Higher risk, active trading strategy",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      features: [
        "Margin trading",
        "Derivatives",
        "Short-term trading",
        "Multiple cryptocurrencies"
      ]
    }
  ];

  const comparisons = [
    {
      title: "Gold",
      value: "$100,000 ≈ 1.6 kg",
      details: "Traditional store of value, limited supply, physical storage needed",
      icon: Landmark
    },
    {
      title: "S&P 500",
      value: "$100,000 ≈ 200 shares",
      details: "Diverse market exposure, dividend potential, regulated market",
      icon: BarChart4
    },
    {
      title: "Real Estate",
      value: "$100,000 ≈ 20% down payment",
      details: "Tangible asset, rental income potential, higher entry barrier",
      icon: Building2
    },
    {
      title: "Bitcoin",
      value: "$100,000 ≈ 1 BTC",
      details: "Digital scarcity, global accessibility, high volatility",
      icon: Coins
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
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <DollarSign className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bitcoin as an Investment
              </h1>
              <p className="text-white/90">
                Understanding Bitcoin's value proposition and investment strategies
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <MarketMetric
              label="Market Cap"
              value="$1.2T"
              change={5.2}
              delay={0.1}
            />
            <MarketMetric
              label="24h Volume"
              value="$48.5B"
              change={-2.1}
              delay={0.2}
            />
            <MarketMetric
              label="Dominance"
              value="52%"
              change={0.8}
              delay={0.3}
            />
          </div>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Investment Security
              </h2>
              <SecurityDiagram />
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                <PieChart className="h-6 w-6" />
                Risk Assessment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {riskLevels.map((level, index) => (
                  <RiskCard key={level.title} {...level} />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                <LineChart className="h-6 w-6" />
                Value Comparisons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {comparisons.map((comparison, index) => (
                  <ComparisonCard key={comparison.title} {...comparison} />
                ))}
              </div>
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
                  🎉 Congratulations! You've completed the Bitcoin Investment section.
                </p>
              </Card>

              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
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
                    <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
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
        </motion.div>
      </div>
    </div>
  );
}