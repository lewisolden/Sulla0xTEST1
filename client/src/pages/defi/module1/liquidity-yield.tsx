import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Wallet, RefreshCw, Settings, Info, Check, X, CheckCircle2, Coins, TrendingUp, Lock, Percent, Timer, BarChart3 } from "lucide-react";
import { FaExchangeAlt, FaWater, FaChartLine, FaLayerGroup, FaSearch, FaShieldAlt, FaPercent, FaChartBar, FaCoins } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { Trophy } from "lucide-react"; // Import the Trophy icon


// Quiz questions with explanations
const quizQuestions = [
  {
    question: "What is impermanent loss in liquidity provision?",
    options: [
      "A temporary loss that becomes permanent when you withdraw liquidity",
      "The difference in value between holding tokens and providing liquidity",
      "A loss caused by network fees",
      "The cost of transaction fees in DeFi"
    ],
    correctAnswer: 1,
    explanation: "Impermanent loss occurs when the price ratio of your provided tokens changes compared to when you deposited them. This can result in having less value than if you had simply held the tokens."
  },
  {
    question: "Which of the following is NOT a common yield farming strategy?",
    options: [
      "Providing liquidity to AMM pools",
      "Lending assets on money markets",
      "Day trading on centralized exchanges",
      "Staking in governance protocols"
    ],
    correctAnswer: 2,
    explanation: "Day trading on centralized exchanges is not a yield farming strategy as it involves active trading rather than passive earning through DeFi protocols."
  },
  {
    question: "What is the primary purpose of liquidity mining?",
    options: [
      "To create new cryptocurrencies",
      "To incentivize users to provide liquidity",
      "To reduce transaction fees",
      "To increase token prices"
    ],
    correctAnswer: 1,
    explanation: "Liquidity mining programs incentivize users to provide liquidity to protocols by rewarding them with additional tokens, helping to bootstrap liquidity and protocol adoption."
  }
];

const APRExplanation = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-xl p-8 mb-8 shadow-lg"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-blue-500 rounded-full p-3">
        <FaPercent className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-blue-800">Understanding APR in Yield Farming</h3>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <p className="text-gray-700 text-lg">
          Annual Percentage Rate (APR) represents your yearly earnings from yield farming, expressed as a percentage of your initial investment.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
            <FaChartBar className="h-5 w-5" />
            Example Calculation
          </h4>
          <div className="space-y-2 text-blue-800">
            <p className="flex items-center gap-2">
              <span className="bg-blue-100 rounded-full p-1">💰</span>
              Initial Investment: $1,000
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-blue-100 rounded-full p-1">📈</span>
              APR: 20%
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-blue-100 rounded-full p-1">💵</span>
              Yearly Earnings: $200
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-blue-100 rounded-full p-1">📅</span>
              Monthly: ~$16.67
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-blue-100 rounded-full p-1">⏰</span>
              Daily: ~$0.55
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-blue-700 flex items-center gap-2">
          <FaCoins className="h-5 w-5" />
          APR Sources in Yield Farming
        </h4>
        <div className="space-y-4">
          {[
            {
              icon: "💱",
              title: "Trading Fees",
              description: "Earn from other users' trades in your liquidity pool"
            },
            {
              icon: "🎁",
              title: "Protocol Rewards",
              description: "Additional tokens given by the platform"
            },
            {
              icon: "🏛️",
              title: "Governance Incentives",
              description: "Rewards for participating in platform governance"
            }
          ].map((source, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-3"
            >
              <span className="text-2xl">{source.icon}</span>
              <div>
                <h5 className="font-medium text-blue-800">{source.title}</h5>
                <p className="text-gray-600 text-sm">{source.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const YieldFarmingExamples = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="space-y-8 mb-8"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-green-500 rounded-full p-3">
        <FaChartLine className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-green-800">Real-World Examples of Yield Farming</h3>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Stablecoin Liquidity Pool",
          description: "Like a digital savings account with better returns",
          icon: "🏦",
          color: "blue",
          steps: [
            "Deposit $1,000 worth of USDC and USDT",
            "Traders use your liquidity to swap tokens",
            "Earn 0.3% from each trade",
            "Get bonus platform tokens",
            "Total APR: 5-20% or higher"
          ]
        },
        {
          title: "ETH-USDC Trading Pool",
          description: "Run your own mini crypto exchange",
          icon: "💱",
          color: "purple",
          steps: [
            "Provide equal amounts of ETH and USDC",
            "Earn fees from ETH/USDC trades",
            "Receive platform reward tokens",
            "Higher risk, higher return (20-100% APR)"
          ]
        }
      ].map((example, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.3 }}
          className={`bg-${example.color}-50 rounded-xl p-6 shadow-lg border border-${example.color}-100`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{example.icon}</span>
            <div>
              <h4 className={`text-xl font-semibold text-${example.color}-700`}>{example.title}</h4>
              <p className="text-gray-600">{example.description}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {example.steps.map((step, stepIndex) => (
              <motion.li
                key={stepIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.3) + (stepIndex * 0.1) }}
                className="flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full bg-${example.color}-400`} />
                <span className="text-gray-700">{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-yellow-500 rounded-full p-2">
          <Info className="h-5 w-5 text-white" />
        </div>
        <h4 className="text-xl font-semibold text-yellow-800">Important Tips for Beginners</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            tip: "Start with stablecoins to minimize volatility",
            icon: "🛡️"
          },
          {
            tip: "Use established platforms with good security",
            icon: "🔒"
          },
          {
            tip: "Higher APR usually means higher risk",
            icon: "⚠️"
          },
          {
            tip: "Watch out for impermanent loss",
            icon: "📊"
          }
        ].map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + (index * 0.1) }}
            className="flex items-center gap-2 text-yellow-800"
          >
            <span className="text-xl">{tip.icon}</span>
            <span>{tip.tip}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const yieldFarmingStrategies = [
  {
    icon: FaWater,
    title: "Liquidity Provision",
    description: "Supply token pairs to AMM pools and earn trading fees plus additional token rewards."
  },
  {
    icon: FaChartLine,
    title: "Lending Markets",
    description: "Lend assets on DeFi platforms to earn interest and platform tokens."
  },
  {
    icon: FaLayerGroup,
    title: "Yield Aggregation",
    description: "Automatically move assets between protocols to maximize returns."
  },
  {
    icon: FaShieldAlt,
    title: "Risk Management",
    description: "Diversify across multiple protocols and token pairs to minimize risk."
  }
];

export default function LiquidityYield() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [, setLocation] = useLocation();

  // Farm simulation state
  const [pooledTokens, setPooledTokens] = useState({ USDC: 1000, ETH: 1 });
  const [earnedRewards, setEarnedRewards] = useState(0);
  const [apr, setApr] = useState(20);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSimulatorGuide, setShowSimulatorGuide] = useState(true);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "liquidity-yield", true, 3);
    setIsCompleted(true);
    setLocation("/defi/module1/quiz");
  };

  // Yield farming simulation logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulationRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        setEarnedRewards(prev => {
          const newRewards = prev + (pooledTokens.USDC * (apr / 100) / (365 * 24 * 60)) / 60;
          return Number(newRewards.toFixed(6));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulationRunning, pooledTokens, apr]);

  const toggleSimulation = () => {
    if (!isSimulationRunning) {
      setShowSimulatorGuide(false);
    }
    setIsSimulationRunning(!isSimulationRunning);
  };

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setEarnedRewards(0);
    setElapsedTime(0);
    setShowSimulatorGuide(true);
  };

  // Quiz handlers
  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };


  // Add auto-advance functionality for quiz
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showExplanation && currentQuestion < quizQuestions.length - 1) {
      timer = setTimeout(() => {
        handleNextQuestion();
      }, 8000); // Changed from 5000 to 8000
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestion]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/defi/module1/dex-amm">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Previous Section
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 pb-8">
              <div className="absolute inset-0 bg-grid-white/20" />
              <CardTitle className="text-3xl font-bold text-white z-10">
                Yield Farming & Liquidity Provision
              </CardTitle>
              <p className="text-purple-100 mt-2 z-10">
                Master the art of earning passive income in DeFi through liquidity provision and yield optimization
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <section className="mb-12">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                      What is Yield Farming?
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Yield farming is like earning interest on your cryptocurrency assets, but with potentially higher returns than traditional banking. Instead of letting your crypto sit idle in a wallet, you put it to work in various DeFi (Decentralized Finance) protocols.
                    </p>
                    <p className="text-gray-700 mb-6">
                      Think of it like being both a bank and an investor: You provide your crypto assets to help others trade (like a bank providing loans), and in return, you earn a portion of the fees plus additional reward tokens (like earning both interest and stock dividends).
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                          <Percent className="h-5 w-5" />
                          <h3 className="font-medium">Multiple Yields</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Earn various forms of rewards simultaneously
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                          <Timer className="h-5 w-5" />
                          <h3 className="font-medium">Compound Growth</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Reinvest earnings to accelerate returns
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-lg p-4 shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                          <BarChart3 className="h-5 w-5" />
                          <h3 className="font-medium">Dynamic APY</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Yields vary based on market conditions
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <APRExplanation />
                  <YieldFarmingExamples />

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {yieldFarmingStrategies.map((strategy, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-100 rounded-full p-2">
                            <strategy.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-700">{strategy.title}</h3>
                        </div>
                        <p className="text-gray-600">{strategy.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Interactive Yield Farming Simulator
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Experience the mechanics of yield farming with our interactive simulator.
                      Watch how your liquidity position grows over time through trading fees and reward tokens.
                    </p>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                        {showSimulatorGuide && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 bg-blue-50 p-4 rounded-lg"
                          >
                            <h4 className="text-lg font-semibold text-blue-800 mb-2">How it Works:</h4>
                            <ul className="space-y-2 text-sm text-blue-700">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                Start with 1000 USDC and 1 ETH in the pool
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                Earn FARM tokens at 20% APR
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                Watch rewards accumulate in real-time
                              </li>
                            </ul>
                          </motion.div>
                        )}

                        <div className="space-y-6">
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">Your Farm Position</h3>
                            <div className="flex justify-center gap-4">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-blue-50 px-4 py-2 rounded-lg"
                              >
                                <p className="text-sm text-gray-600">Pooled USDC</p>
                                <p className="font-semibold text-blue-800">{pooledTokens.USDC}</p>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-blue-50 px-4 py-2 rounded-lg"
                              >
                                <p className="text-sm text-gray-600">Pooled ETH</p>
                                <p className="font-semibold text-blue-800">{pooledTokens.ETH}</p>
                              </motion.div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>APR</span>
                              <span>{apr}%</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Time Elapsed</span>
                              <span>{Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-blue-800">
                              <span>Earned Rewards</span>
                              <span>{earnedRewards.toFixed(6)} FARM</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={toggleSimulation}
                              className={`flex-1 ${isSimulationRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                              {isSimulationRunning ? 'Stop Farming' : 'Start Farming'}
                            </Button>
                            <Button
                              onClick={resetSimulation}
                              variant="outline"
                              className="flex-1"
                            >
                              Reset
                            </Button>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                            <p className="flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              This simulator demonstrates simplified yield farming mechanics. Real yields vary based on market conditions and protocol parameters.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                      Knowledge Check
                    </h2>

                    {!quizCompleted ? (
                      <div>
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-600">
                              Question {currentQuestion + 1} of {quizQuestions.length}
                            </p>
                            <p className="text-sm font-medium text-blue-600">
                              Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-blue-600 h-2 rounded-full"
                              initial={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <motion.div
                          key={currentQuestion}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-medium text-gray-800">
                            {quizQuestions[currentQuestion].question}
                          </h3>

                          <div className="space-y-3">
                            {quizQuestions[currentQuestion].options.map((option, index) => {
                              const isSelected = selectedAnswer === index;
                              const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                              const showResult = selectedAnswer !== null;

                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                  <Button
                                    onClick={() => !selectedAnswer && handleAnswer(index)}
                                    variant="outline"
                                    className={`w-full justify-start text-left ${
                                      showResult
                                        ? isCorrect
                                          ? "bg-green-50 border-green-500 text-green-700"
                                          : isSelected
                                            ? "bg-red-50 border-red-500 text-red-700"
                                            : ""
                                        : "hover:bg-blue-50"
                                    }`}
                                    disabled={selectedAnswer !== null}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span>{option}</span>
                                      {showResult && (isCorrect || isSelected) && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        >
                                          {isCorrect ? (
                                            <Check className="h-5 w-5 text-green-500" />
                                          ) : (
                                            <X className="h-5 w-5 text-red-500" />
                                          )}
                                        </motion.span>
                                      )}
                                    </div>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>

                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="space-y-4"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="flex justify-center"
                              >
                                <div
                                  className={`text-lg font-semibold px-4 py-2 rounded-full ${
                                    selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
                                </div>
                              </motion.div>

                              <div className={`p-4 rounded-lg ${
                                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-red-50 border border-red-200"
                              }`}>
                                <p className={`text-sm ${
                                  selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                    ? "text-green-800"
                                    : "text-red-800"
                                }`}>
                                  {quizQuestions[currentQuestion].explanation}
                                </p>
                                <p className="text-sm text-blue-600 italic mt-2">
                                  Next question in 8 seconds...
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            Quiz Completed!
                          </h3>
                          <p className="text-gray-600 text-lg mb-2">
                            You scored {score} out of {quizQuestions.length}
                          </p>
                          {score === quizQuestions.length ? (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10}}
                              >
                                <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                              </motion.div>
                              <p className="text-green-600">Perfect score! You're ready for the module quiz!</p>
                              <Button
                                onClick={handleComplete}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Continue to Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </motion.div>
                          ) : (
                            <p className="text-gray-500">
                              Keep learning and try again to improve your score!
                            </p>
                          )}
                        </div>

                        <Button
                          onClick={() => {
                            setShowQuiz(false);
                            setCurrentQuestion(0);
                            setScore(0);
                            setQuizCompleted(false);
                            setSelectedAnswer(null);
                            setShowExplanation(false);
                          }}
                          variant="outline"
                          className="transform hover:scale-105 transition-all duration-300"
                        >
                          Retake Quiz
                        </Button>
                      </motion.div>
                    )}
                  </section>

                  <div className="flex justify-between items-center mt-12">
                    <Link href="/defi/module1/dex-amm">
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Previous Section
                      </Button>
                    </Link>

                    <div className="flex gap-4">
                      <Button
                        onClick={handleComplete}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isCompleted}
                      >
                        {isCompleted ? "Completed" : "Mark as Complete"}
                      </Button>

                      <Link href="/defi/module1/quiz">
                        <Button className="gap-2">
                          Module Quiz <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}