import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is a key characteristic of flash loans in DeFi?",
    options: [
      "They require high collateral",
      "They must be repaid within the same transaction block",
      "They have a 24-hour repayment period",
      "They can only be used for staking"
    ],
    correctAnswer: 1,
    explanation: "Flash loans are a unique DeFi innovation that must be borrowed and repaid within the same transaction block. This atomic execution ensures that if the repayment fails, the entire transaction is reversed, making them a powerful tool for arbitrage and advanced trading strategies."
  },
  {
    id: 2,
    question: "Which of the following is a concentrated liquidity feature?",
    options: [
      "Equal distribution across all price ranges",
      "Liquidity provided only in specific price ranges",
      "Fixed fee percentages",
      "Unlimited pool size"
    ],
    correctAnswer: 1,
    explanation: "Concentrated liquidity allows liquidity providers to focus their capital within specific price ranges, making it more efficient than traditional AMMs where liquidity is spread across the entire price curve. This innovation, pioneered by Uniswap v3, enables better capital efficiency and higher yields for LPs."
  },
  {
    id: 3,
    question: "What is MEV in DeFi?",
    options: [
      "Maximum Exchange Volume",
      "Miner Extractable Value",
      "Minimum Entry Value",
      "Multiple Exchange Verification"
    ],
    correctAnswer: 1,
    explanation: "MEV (Miner Extractable Value) refers to the value that miners/validators can extract by manipulating transaction order in a block. This includes practices like frontrunning, backrunning, and sandwich attacks. Understanding MEV is crucial for DeFi users to protect themselves from potential value extraction."
  },
  {
    id: 4,
    question: "Which strategy helps mitigate impermanent loss?",
    options: [
      "Increasing leverage",
      "Single-sided liquidity provision",
      "Delta-neutral positions",
      "Avoiding liquidity pools entirely"
    ],
    correctAnswer: 2,
    explanation: "Delta-neutral positions help mitigate impermanent loss by balancing long and short exposure, effectively hedging against price movements. This strategy involves maintaining offsetting positions that neutralize the overall price risk while still earning yields from liquidity provision."
  },
  {
    id: 5,
    question: "What is a key aspect of protocol-owned liquidity?",
    options: [
      "All liquidity is provided by users",
      "The protocol owns and controls its liquidity",
      "Liquidity is controlled by external market makers",
      "Liquidity is always locked for a fixed period"
    ],
    correctAnswer: 1,
    explanation: "Protocol-owned liquidity (POL) means the protocol itself owns and controls its liquidity rather than relying solely on external providers. This model, popularized by Olympus DAO, gives protocols more control over their markets and reduces dependence on mercenary capital."
  }
];

export default function DefiModule3Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Let's understand why this is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand the right answer.",
        variant: "destructive",
      });
    }

    // Auto-advance to next question after 7 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        const finalScore = (score / questions.length) * 100;
        updateProgress(
          3,
          'defi-module3-quiz',
          finalScore >= 70,
          1,
          undefined,
          finalScore,
          '/defi/module3/quiz',
          undefined,
          'DeFi'
        );
      }
    }, 7000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Advanced DeFi Concepts Quiz
          </h1>

          {!showResults ? (
            <>
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="mb-6"
              />
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? 
                        (index === questions[currentQuestion].correctAnswer ? "default" : "destructive") 
                        : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => !showExplanation && handleAnswerSelection(index)}
                      disabled={showExplanation}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 p-4 rounded-lg mt-4"
                >
                  <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                  <p className="text-blue-700">
                    {questions[currentQuestion].explanation}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Next question in 7 seconds...</p>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-4">
                Your score: {score} out of {questions.length}
              </p>
              <Progress
                value={(score / questions.length) * 100}
                className="mb-6"
              />
              {score === questions.length ? (
                <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered advanced DeFi concepts!</p>
              ) : score >= questions.length * 0.7 ? (
                <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of advanced DeFi concepts.</p>
              ) : (
                <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
              )}
              <Link href="/defi/module4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  Continue to Module 4
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}