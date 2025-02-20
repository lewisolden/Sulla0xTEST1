import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Wallet, RefreshCw, Settings, Info, Check, X, CheckCircle2, Coins, TrendingUp, Lock, Percent, Timer, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExchangeAlt, FaWater, FaChartLine, FaLayerGroup, FaSearch, FaShieldAlt } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";

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

export default function LiquidityYield() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1/dex-amm">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Previous Section
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Yield Farming & Liquidity Provision
              </h1>

              <div className="prose max-w-none">
                {/* Introduction Section */}
                <section className="mb-12">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                      What is Yield Farming?
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Yield farming is a DeFi strategy where users provide liquidity or stake assets to earn rewards.
                      These rewards often come in multiple forms: trading fees, interest rates, and governance tokens.
                      Think of it as putting your crypto assets to work in various DeFi protocols to maximize returns.
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

                  {/* Yield Farming Strategies */}
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

                  {/* Yield Farming Simulator */}
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

                  {/* Quiz Section */}
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
                                          className="ml-2"
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
                              </div>

                              {currentQuestion < quizQuestions.length - 1 && (
                                <div className="flex justify-center">
                                  <Button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Next Question
                                  </Button>
                                </div>
                              )}
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
                          <p className="text-gray-500">
                            {score === quizQuestions.length
                              ? "Perfect score! You've mastered liquidity provision and yield farming concepts!"
                              : "Keep learning and try again to improve your score!"}
                          </p>
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