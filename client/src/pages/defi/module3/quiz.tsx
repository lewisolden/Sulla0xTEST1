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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 1
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
    correctAnswer: 2
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
    correctAnswer: 1
  }
];

export default function DefiModule3Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
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
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => handleAnswerSelection(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
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