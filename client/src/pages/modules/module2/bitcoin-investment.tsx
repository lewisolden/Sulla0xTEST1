import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, PieChart,
  Shield, Key, Lock, Eye, ExternalLink, AlertOctagon,
  AlertTriangle, CheckCircle2, XCircle, Info, History,
  Landmark
} from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import BitcoinInvestmentExercise from "@/components/modules/exercises/BitcoinInvestmentExercise";
import BitcoinFundamentalsQuiz from "@/components/modules/quizzes/BitcoinFundamentalsQuiz";

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A" />
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const riskLevels = [
    {
      title: "Low Risk",
      description: "Bitcoin ETFs and regulated investment products",
      color: "from-green-100 via-white to-green-50",
      borderColor: "border-green-400",
      textColor: "text-green-700"
    },
    {
      title: "Medium Risk",
      description: "Direct Bitcoin purchases through established exchanges",
      color: "from-yellow-100 via-white to-yellow-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-700"
    },
    {
      title: "High Risk",
      description: "Trading with leverage or new crypto assets",
      color: "from-red-100 via-white to-red-50",
      borderColor: "border-red-400",
      textColor: "text-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600" />
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

        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center">
            <BitcoinLogo />
            <div>
              <motion.h1
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                2.2 Bitcoin as an Investment
              </motion.h1>
              <p className="text-white/90 mt-2">
                Understanding Bitcoin's investment potential and risk management strategies
              </p>
            </div>
          </div>
        </div>

        <div className="prose lg:prose-xl text-gray-700 space-y-8">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-orange-50 to-white rounded-lg shadow-lg p-8 border border-orange-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Investment Security</h2>
            <SecurityDiagram />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-red-50 to-white rounded-lg shadow-lg p-8 mt-12 border border-red-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Risk Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {riskLevels.map((level) => (
                <motion.div
                  key={level.title}
                  className={`bg-gradient-to-br ${level.color} p-6 rounded-lg cursor-pointer border-2 ${level.borderColor} shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
                  whileHover={{ scale: 1.02, shadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                  onClick={() => setSelectedRisk(level.title)}
                  animate={{
                    scale: selectedRisk === level.title ? 1.02 : 1,
                    borderWidth: selectedRisk === level.title ? 3 : 2
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
            className="bg-gradient-to-br from-white via-blue-50 to-white rounded-lg shadow-lg p-8 border border-blue-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">Bitcoin's Value</h2>
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
            className="bg-gradient-to-br from-white via-green-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-green-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-6">Metcalfe's Law and Bitcoin</h2>
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
            className="bg-gradient-to-br from-white via-purple-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-purple-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Value Comparisons</h2>
            <p className="text-gray-700 mb-6">
              To understand Bitcoin's value in context, let's compare what $100,000 gets you across different investment vehicles:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Gold",
                  amount: "1.6 kilograms of gold",
                  note: "(Based on ~$2,000/oz)",
                  gradient: "from-yellow-100 to-yellow-50"
                },
                {
                  title: "S&P 500 Index Fund",
                  amount: "200 shares",
                  note: "(Based on ~$500/share)",
                  gradient: "from-blue-100 to-blue-50"
                },
                {
                  title: "Real Estate",
                  amount: "20% down payment on $500,000 property",
                  note: "(Typical down payment)",
                  gradient: "from-green-100 to-green-50"
                },
                {
                  title: "Bitcoin",
                  amount: "1 BTC",
                  note: "(Based on ~$100,000/BTC)",
                  gradient: "from-orange-100 to-orange-50"
                }
              ].map((item) => (
                <Card key={item.title} className={`p-6 bg-gradient-to-br ${item.gradient} shadow-md hover:shadow-lg transition-shadow`}>
                  <h4 className="font-semibold text-blue-800 mb-2">{item.title}</h4>
                  <div className="flex justify-between items-center">
                    <span>$100,000 ≈ {item.amount}</span>
                    <span className="text-sm text-gray-600">{item.note}</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-pink-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-pink-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">Understanding Bitcoin Investment Risks</h2>
            <p className="text-gray-700 mb-6">
              Before investing in Bitcoin, it's crucial to understand the various risks involved. Here are the key risk factors to consider:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Market Volatility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Extreme price fluctuations within short periods</li>
                  <li>• Historical drops of over 50% in value</li>
                  <li>• Susceptibility to market sentiment and news</li>
                  <li>• 24/7 trading leading to overnight price changes</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Security Risks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Potential for exchange hacks and theft</li>
                  <li>• Private key management responsibility</li>
                  <li>• Phishing attacks and scams</li>
                  <li>• No recourse for lost or stolen funds</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Regulatory Risks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Varying regulations across jurisdictions</li>
                  <li>• Potential for restrictive government policies</li>
                  <li>• Tax implications and reporting requirements</li>
                  <li>• Changes in legal status and classification</li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Technical Risks</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Network upgrades and forks</li>
                  <li>• Software bugs or vulnerabilities</li>
                  <li>• Infrastructure failures</li>
                  <li>• Technological obsolescence</li>
                </ul>
              </Card>
            </div>

            <Card className="mt-6 p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50 border border-orange-200 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Risk Mitigation Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 via-white to-green-50 p-6 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    Recommended Practices
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">Safe Investment</span>
                        <p className="text-sm text-gray-600">Only invest what you can afford to lose</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <Lock className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">Secure Storage</span>
                        <p className="text-sm text-gray-600">Use reputable exchanges and wallets</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <Key className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">Strong Security</span>
                        <p className="text-sm text-gray-600">Implement robust security measures</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <PieChart className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">Portfolio Balance</span>
                        <p className="text-sm text-gray-600">Diversify your investment portfolio</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <Landmark className="h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium">Regulatory Awareness</span>
                        <p className="text-sm text-gray-600">Stay informed about regulations</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-50 via-white to-red-50 p-6 rounded-lg border border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-red-700 mb-4 flex items-center gap-2 text-lg">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Practices to Avoid
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="font-medium">Borrowed Funds</span>
                        <p className="text-sm text-gray-600">Never invest with borrowed money</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <AlertOctagon className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="font-medium">Exchange Storage</span>
                        <p className="text-sm text-gray-600">Don't keep large amounts on exchanges</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Eye className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="font-medium">Private Information</span>
                        <p className="text-sm text-gray-600">Never share private keys or seed phrases</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Info className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="font-medium">Emotional Trading</span>
                        <p className="text-sm text-gray-600">Avoid emotional investment decisions</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <History className="h-5 w-5 text-red-600" />
                      <div>
                        <span className="font-medium">Tax Compliance</span>
                        <p className="text-sm text-gray-600">Don't ignore tax obligations</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This information is for educational purposes only and should not be considered financial advice. Always conduct your own research and consult with financial professionals before making investment decisions.
              </p>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-teal-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-teal-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">Bitcoin ETFs Explained</h2>
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

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-orange-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-orange-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-6">Practice Investment Strategies</h2>
            <p className="text-gray-700 mb-6">
              Now that you understand the different investment options, try out our interactive
              investment simulator to practice making investment decisions in a risk-free environment.
            </p>
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6 rounded-lg border border-orange-200 shadow-md">
              <BitcoinInvestmentExercise />
            </div>
          </motion.section>

          {isFullyRead && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BitcoinFundamentalsQuiz />

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-8">
                <Link href="/modules/module2/bitcoin-fundamentals">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bitcoin Fundamentals
                  </Button>
                </Link>

                <Link href="/modules/module2/security-risk">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    Next: Security and Risk Management <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        .section-card {
          background: linear-gradient(135deg, #fff 0%, #fff8f6 100%);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        .section-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .value-card {
          background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
          border-left: 4px solid #f56565;
        }
      `}</style>
    </div>
  );
}