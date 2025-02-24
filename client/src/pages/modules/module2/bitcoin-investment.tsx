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
  Landmark, Scale, Network, Code, Brain, Database, Binary,
  Blocks, Cpu, Layers, GitBranch, Building2, LineChart, Wallet,
  BadgeDollarSign, Building, CircleDollarSign, Bitcoin, Phone, Users, RefreshCw,
  BarChart3
} from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import BitcoinInvestmentExercise from "@/components/modules/exercises/BitcoinInvestmentExercise";
import BitcoinInvestmentQuiz from "@/components/modules/quizzes/BitcoinInvestmentQuiz";

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

// Growth data for visualization
const growthData = {
  internet: [
    { year: 1995, users: 16, height: "h-[20%]" },
    { year: 2005, users: 1000, height: "h-[40%]" },
    { year: 2015, users: 3000, height: "h-[60%]" },
    { year: 2025, users: 5800, height: "h-[100%]" }
  ],
  mobile: [
    { year: 1995, users: 80, height: "h-[15%]" },
    { year: 2005, users: 2000, height: "h-[40%]" },
    { year: 2015, users: 4500, height: "h-[70%]" },
    { year: 2025, users: 7800, height: "h-[100%]" }
  ],
  bitcoin: [
    { year: 2013, users: 3, height: "h-[10%]" },
    { year: 2018, users: 32, height: "h-[30%]" },
    { year: 2022, users: 300, height: "h-[60%]" },
    { year: 2025, users: 850, height: "h-[100%]" }
  ]
};

export default function BitcoinInvestmentSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const { updateProgress } = useProgress();
  const [calculatorAmount, setCalculatorAmount] = useState(100000);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(
          2,
          'bitcoin-investment',
          true,
          null,
          undefined,
          undefined,
          undefined,
          undefined,
          '/modules/module2/bitcoin-investment',
          '/modules/module2/security-risk',
          'Bitcoin Investment'
        );
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

      <div className="container mx-auto px-4 py-8">
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
            className="bg-gradient-to-br from-white via-green-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-green-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-6">
              Metcalfe's Law and Network Growth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Internet Growth */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Internet Growth
                </h4>
                <div className="h-32 relative mt-2">
                  <div className="absolute inset-0 flex items-end space-x-1">
                    {growthData.internet.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full bg-blue-400 rounded-t-sm transition-all duration-500 ${data.height}`}
                        />
                        <span className="text-xs mt-1 text-gray-600">{data.year}</span>
                        <span className="text-xs text-gray-500">{data.users}M</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Mobile Growth */}
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-white">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Mobile Phones
                </h4>
                <div className="h-32 relative mt-2">
                  <div className="absolute inset-0 flex items-end space-x-1">
                    {growthData.mobile.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full bg-purple-400 rounded-t-sm transition-all duration-500 ${data.height}`}
                        />
                        <span className="text-xs mt-1 text-gray-600">{data.year}</span>
                        <span className="text-xs text-gray-500">{data.users}M</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Bitcoin Growth */}
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-white">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Bitcoin Wallets
                </h4>
                <div className="h-32 relative mt-2">
                  <div className="absolute inset-0 flex items-end space-x-1">
                    {growthData.bitcoin.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full bg-orange-400 rounded-t-sm transition-all duration-500 ${data.height}`}
                        />
                        <span className="text-xs mt-1 text-gray-600">{data.year}</span>
                        <span className="text-xs text-gray-500">{data.users}M</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Network Effect Implications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    text: "As more users adopt Bitcoin, its utility as a payment network increases exponentially"
                  },
                  {
                    icon: LineChart,
                    text: "Growing adoption leads to increased liquidity and price stability"
                  },
                  {
                    icon: RefreshCw,
                    text: "Network effects create a positive feedback loop for adoption"
                  },
                  {
                    icon: TrendingUp,
                    text: "Similar adoption curve to early internet and mobile phone growth"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <item.icon className="h-5 w-5 text-green-600 mt-1" />
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-pink-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-pink-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">Understanding Bitcoin Investment Risks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Market Volatility",
                  description: "Price fluctuations and market dynamics",
                  icon: BarChart3,
                  risks: [
                    {
                      title: "Price Swings",
                      description: "Daily volatility can exceed 10%"
                    },
                    {
                      title: "Market Cycles",
                      description: "Historical drawdowns of 50%+"
                    },
                    {
                      title: "Sentiment Driven",
                      description: "News and events impact heavily"
                    },
                    {
                      title: "24/7 Trading",
                      description: "Price changes occur at any time"
                    }
                  ]
                },
                {
                  title: "Security Concerns",
                  description: "Protecting digital assets",
                  icon: Shield,
                  risks: [
                    {
                      title: "Cyber Threats",
                      description: "Exchange hacks and phishing"
                    },
                    {
                      title: "Key Management",
                      description: "Private key security critical"
                    },
                    {
                      title: "Platform Risk",
                      description: "Exchange/custody reliability"
                    },
                    {
                      title: "User Error",
                      description: "Irreversible transactions"
                    }
                  ]
                },
                {
                  title: "Regulatory Environment",
                  description: "Legal and compliance factors",
                  icon: Scale,
                  risks: [
                    {
                      title: "Policy Changes",
                      description: "Government regulations vary"
                    },
                    {
                      title: "Tax Implications",
                      description: "Complex reporting requirements"
                    },
                    {
                      title: "Jurisdiction Issues",
                      description: "Different rules by country"
                    },
                    {
                      title: "Future Uncertainty",
                      description: "Evolving legal landscape"
                    }
                  ]
                },
                {
                  title: "Technical Complexity",
                  description: "Technology and infrastructure",
                  icon: Code,
                  risks: [
                    {
                      title: "Protocol Updates",
                      description: "Network upgrades impact"
                    },
                    {
                      title: "Infrastructure",
                      description: "Technical failures possible"
                    },
                    {
                      title: "Innovation Risk",
                      description: "New tech may disrupt"
                    },
                    {
                      title: "Scaling Challenges",
                      description: "Network capacity limits"
                    }
                  ]
                }
              ].map((risk, index) => (
                <Card
                  key={risk.title}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <risk.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{risk.title}</h3>
                          <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {risk.risks.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-gray-50"
                        >
                          <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-blue-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-blue-100 transition-all duration-300 hover:shadow-xl"
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
            className="bg-gradient-to-br from-white via-purple-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-purple-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Value Comparisons</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Gold",
                  amount: "1.6 kilograms of gold",
                  note: "(Based on ~$2,000/oz)",
                  icon: CircleDollarSign,
                  gradient: "from-yellow-100 to-yellow-50",
                  iconColor: "text-yellow-600"
                },
                {
                  title: "S&P 500 Index Fund",
                  amount: "200 shares",
                  note: "(Based on ~$500/share)",
                  icon: LineChart,
                  gradient: "from-blue-100 to-blue-50",
                  iconColor: "text-blue-600"
                },
                {
                  title: "Real Estate",
                  amount: "20% down payment on $500,000 property",
                  note: "(Typical down payment)",
                  icon: Building,
                  gradient: "from-green-100 to-green-50",
                  iconColor: "text-green-600"
                },
                {
                  title: "Bitcoin",
                  amount: "1 BTC",
                  note: "(Based on ~$100,000/BTC)",
                  icon: Bitcoin,
                  gradient: "from-orange-100 to-orange-50",
                  iconColor: "text-orange-600"
                }
              ].map((item) => (
                <Card key={item.title} className={`p-6 bg-gradient-to-br ${item.gradient} shadow-md hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm ${item.iconColor}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <div className="space-y-1">
                        <p className="text-lg font-medium">$100,000 ≈ {item.amount}</p>
                        <p className="text-sm text-gray-600">{item.note}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Interactive Value Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Amount in USD
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter amount..."
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">Equivalent Value:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4 text-yellow-600" />
                      <span>Gold: {(calculatorAmount / 2000 * 1.6).toFixed(2)} kg</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-blue-600" />
                      <span>S&P 500: {(calculatorAmount / 500).toFixed(0)} shares</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-600" />
                      <span>Real Estate: ${(calculatorAmount * 5).toLocaleString()} property value</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Bitcoin className="h-4 w-4 text-orange-600" />
                      <span>Bitcoin: {(calculatorAmount / 100000).toFixed(4)} BTC</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white via-teal-50 to-white rounded-lg shadow-lg p-8 mt-8 border border-teal-100 transition-all duration-300 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">Bitcoin ETFs Explained</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">What is a Bitcoin ETF?</h3>
                  <p className="text-gray-700">
                    A Bitcoin ETF (Exchange-Traded Fund) allows investors to gain exposure to Bitcoin through a traditional investment vehicle, without the complexities of direct cryptocurrency ownership.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-teal-800 mb-4">Key Benefits</h4>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: Building2,
                        text: "Trade through traditional brokerage accounts"
                      },
                      {
                        icon: Shield,
                        text: "Regulated and familiar structure"
                      },
                      {
                        icon: Users,
                        text: "Professional management"
                      },
                      {
                        icon: BadgeDollarSign,
                        text: "No need to manage private keys"
                      }
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <benefit.icon className="h-5 w-5 text-teal-600" />
                        <span className="text-gray-700">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">Major Bitcoin ETF Issuers</h3>

                {[
                  {
                    name: "BlackRock",
                    ticker: "IBIT",
                    description: "World's largest asset manager",
                    aum: "$13.8B",
                    icon: Building
                  },
                  {
                    name: "Fidelity",
                    ticker: "FBTC",
                    description: "Leading investment firm",
                    aum: "$11.2B",
                    icon: Landmark
                  },
                  {
                    name: "Grayscale",
                    ticker: "GBTC",
                    description: "Cryptocurrency investment pioneer",
                    aum: "$25.1B",
                    icon: Building2
                  },
                  {
                    name: "Bitwise",
                    ticker: "BITB",
                    description: "Crypto-focused asset manager",
                    aum: "$1.2B",
                    icon: Landmark
                  }
                ].map((issuer) => (
                  <Card key={issuer.name} className="p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-teal-50">
                        <issuer.icon className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{issuer.name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-teal-600 font-medium">{issuer.ticker}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">{issuer.description}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">AUM: {issuer.aum}</p>
                      </div>
                    </div>
                  </Card>
                ))}

                <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> AUM (Assets Under Management) values are as of February 2025. These figures can change significantly over time.
                  </p>
                </div>
              </div>
            </div>
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
              <BitcoinInvestmentQuiz />

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-8">
                <Link href="/modules/module2/bitcoin-fundamentals">
                  <Button variant="outline" className="wfull md:w-auto">
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
    </div>
  );
}