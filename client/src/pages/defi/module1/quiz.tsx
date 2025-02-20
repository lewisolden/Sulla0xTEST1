```tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, ArrowRight, Star } from "lucide-react";
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
    question: "Which strategy is generally considered lowest risk for beginning yield farmers?",
    options: [
      "Providing liquidity for volatile token pairs",
      "Stablecoin liquidity provision",
      "Leveraged yield farming",
      "Token staking with new protocols"
    ],
    correctAnswer: 1,
    explanation: "Stablecoin liquidity provision is considered lower risk because stablecoins maintain relatively stable prices, minimizing impermanent loss risk."
  },
  {
    question: "What are governance tokens in DeFi?",
    options: [
      "Tokens used only for trading",
      "Tokens that represent voting rights in a protocol",
      "Tokens used to pay transaction fees",
      "Tokens that automatically generate yield"
    ],
    correctAnswer: 1,
    explanation: "Governance tokens give holders voting rights in a DeFi protocol, allowing them to participate in decision-making about protocol changes and upgrades."
  },
  {
    question: "What is the main benefit of automated market makers (AMMs) in DeFi?",
    options: [
      "They require central authority approval",
      "They provide constant liquidity without traditional market makers",
      "They guarantee profits for traders",
      "They eliminate all trading fees"
    ],
    correctAnswer: 1,
    explanation: "AMMs provide constant liquidity for trading pairs through mathematical formulas and liquidity pools, eliminating the need for traditional market makers."
  },
  {
    question: "How do liquidity pools typically handle trading fees?",
    options: [
      "All fees go to the protocol developers",
      "Fees are burned to reduce token supply",
      "Fees are distributed proportionally to liquidity providers",
      "Fees are returned to traders"
    ],
    correctAnswer: 2,
    explanation: "Trading fees are typically distributed proportionally to liquidity providers based on their share of the pool, serving as a reward for providing liquidity."
  },
  {
    question: "What is 'smart contract risk' in yield farming?",
    options: [
      "The risk of network congestion",
      "The risk of losing funds due to code vulnerabilities",
      "The risk of low returns",
      "The risk of high gas fees"
    ],
    correctAnswer: 1,
    explanation: "Smart contract risk refers to the potential loss of funds due to vulnerabilities or bugs in the protocol's smart contract code."
  }
];

export default function ModuleQuiz() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
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
      }, 4000);
    } else if (showExplanation && currentQuestion === quizQuestions.length - 1) {
      timer = setTimeout(() => {
        setQuizCompleted(true);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestion]);

  const handleComplete = async () => {
    await updateProgress(3, "module1-quiz", true);
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
              DeFi Module 1 Quiz
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
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                      animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
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
                            {option}
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
                {score >= 7 ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        Congratulations! 🎉
                      </h3>
                      <p className="text-gray-600 text-lg mb-2">
                        You scored {score} out of {quizQuestions.length}
                      </p>
                      <p className="text-green-600">
                        You've mastered the fundamentals of DeFi! Ready for the next module?
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        Quiz Completed
                      </h3>
                      <p className="text-gray-600 text-lg mb-2">
                        You scored {score} out of {quizQuestions.length}
                      </p>
                      <p className="text-blue-600">
                        Keep learning! Try reviewing the material and attempt the quiz again.
                      </p>
                    </div>
                  </>
                )}

                <div className="flex justify-center gap-4">
                  {score >= 7 ? (
                    <Button
                      onClick={handleComplete}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Continue to Module 2
                    </Button>
                  ) : (
                    <Link href="/defi/module1/liquidity-yield">
                      <Button variant="outline">
                        Review Material
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```
