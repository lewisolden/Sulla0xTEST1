import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, Check, X, ArrowRight } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";

const quizQuestions = [
  {
    question: "What is the main purpose of yield farming in DeFi?",
    options: [
      "To mine new cryptocurrencies",
      "To earn passive income from crypto assets",
      "To store cryptocurrencies securely",
      "To trade cryptocurrencies quickly"
    ],
    correctAnswer: 1,
    explanation: "Yield farming allows users to earn passive income by putting their crypto assets to work in various DeFi protocols, generating returns through interest, fees, and rewards."
  },
  {
    question: "How does impermanent loss affect liquidity providers?",
    options: [
      "It only occurs when the market crashes",
      "It's a permanent loss of tokens",
      "It happens when token prices change relative to when liquidity was provided",
      "It only affects stablecoin pairs"
    ],
    correctAnswer: 2,
    explanation: "Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when they were deposited, potentially resulting in less value than if you had held the tokens."
  },
  {
    question: "What is APR in the context of yield farming?",
    options: [
      "Annual Percentage Risk",
      "Automated Protocol Return",
      "Annual Percentage Rate",
      "Automated Position Ratio"
    ],
    correctAnswer: 2,
    explanation: "APR (Annual Percentage Rate) represents the yearly earnings you can expect from your yield farming position, expressed as a percentage of your initial investment."
  },
  {
    question: "Which DeFi protocol feature is essential for yield farming?",
    options: [
      "Smart contracts",
      "Hardware wallets",
      "Centralized exchanges",
      "Physical asset backing"
    ],
    correctAnswer: 0,
    explanation: "Smart contracts are essential for yield farming as they automate the process of depositing assets, collecting rewards, and managing liquidity positions in a trustless manner."
  },
  {
    question: "What is a liquidity pool in DeFi?",
    options: [
      "A centralized exchange's order book",
      "A collection of cryptocurrencies locked in a smart contract",
      "A type of cryptocurrency wallet",
      "A mining pool for new tokens"
    ],
    correctAnswer: 1,
    explanation: "A liquidity pool is a smart contract containing locked cryptocurrencies that enables decentralized trading, lending, and other DeFi activities."
  },
  {
    question: "What is the primary risk of providing liquidity to new, unproven protocols?",
    options: [
      "High gas fees",
      "Smart contract vulnerabilities",
      "Network congestion",
      "Low trading volume"
    ],
    correctAnswer: 1,
    explanation: "Smart contract vulnerabilities in new, unaudited protocols pose the biggest risk as they could lead to loss of funds through exploits or bugs in the code."
  },
  {
    question: "How do automated market makers (AMMs) determine asset prices?",
    options: [
      "Through centralized order books",
      "Using mathematical formulas and pool ratios",
      "Based on the last traded price",
      "Through manual price updates"
    ],
    correctAnswer: 1,
    explanation: "AMMs use mathematical formulas, typically constant product formulas, to determine prices based on the ratio of assets in their liquidity pools."
  },
  {
    question: "What is the purpose of governance tokens in DeFi protocols?",
    options: [
      "To pay transaction fees",
      "To vote on protocol changes and updates",
      "To store value",
      "To generate yield"
    ],
    correctAnswer: 1,
    explanation: "Governance tokens give holders voting rights to participate in the decision-making process for protocol changes, updates, and parameter adjustments."
  }
];

export default function ModuleQuiz() {
  useScrollTop();
  const [, setLocation] = useLocation();
  const { updateProgress } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    const isCorrect = selectedOption === quizQuestions[currentQuestion].correctAnswer;
    setFeedbackMessage({
      text: isCorrect ? "Correct!" : "Incorrect!",
      isCorrect
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showExplanation && currentQuestion < quizQuestions.length - 1) {
      timer = setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setFeedbackMessage(null);
      }, 4000);
    } else if (showExplanation && currentQuestion === quizQuestions.length - 1) {
      timer = setTimeout(() => {
        setQuizCompleted(true);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestion]);

  const handleComplete = async () => {
    await updateProgress(3, "module1-quiz", true, score);
    setLocation("/defi/module2");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1/liquidity-yield">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Yield Farming
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
              DeFi Module 1 Final Quiz
            </h1>

            {!quizCompleted ? (
              <div className="space-y-6">
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
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {feedbackMessage && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className={`text-center py-2 rounded-lg ${
                        feedbackMessage.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      <p className="font-semibold">{feedbackMessage.text}</p>
                    </motion.div>
                  )}

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
                      className="bg-blue-50 p-4 rounded-lg"
                    >
                      <p className="text-blue-800">
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Quiz Completed!
                  </h3>
                  <p className="text-gray-600 text-lg mb-2">
                    You scored {score} out of {quizQuestions.length}
                  </p>
                  <p className="text-blue-600 mb-4">
                    {score >= 7
                      ? "Excellent work! You've demonstrated a strong understanding of DeFi concepts!"
                      : "Keep learning and exploring DeFi concepts to deepen your understanding."}
                  </p>
                  <Button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue to Module 2 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}