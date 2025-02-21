import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";

const questions = [
  {
    question: "What is a key characteristic of flash loans in DeFi?",
    options: [
      "They require high collateral",
      "They must be repaid within the same transaction block",
      "They have a 24-hour repayment period",
      "They can only be used for staking"
    ],
    correctAnswer: 1,
    explanation: "Flash loans must be borrowed and repaid within the same transaction block, enabling unique DeFi opportunities without requiring collateral."
  },
  {
    question: "What is the primary purpose of a DAO in DeFi governance?",
    options: [
      "Decentralized decision-making and community control",
      "Centralized management only",
      "Purely for profit distribution",
      "Marketing purposes"
    ],
    correctAnswer: 0,
    explanation: "DAOs enable decentralized decision-making and community control over protocol development and treasury management."
  },
  {
    question: "Which feature helps prevent governance attacks?",
    options: [
      "Time locks and quorum requirements",
      "Unlimited voting power",
      "Instant execution",
      "Anonymous proposals"
    ],
    correctAnswer: 0,
    explanation: "Time locks and quorum requirements are essential security features that prevent malicious governance attacks by ensuring proper community participation and review periods."
  },
  {
    question: "What is a key aspect of protocol-owned liquidity?",
    options: [
      "All liquidity is provided by users",
      "The protocol owns and controls its liquidity",
      "Liquidity is controlled by external market makers",
      "Liquidity is always locked for a fixed period"
    ],
    correctAnswer: 1,
    explanation: "Protocol-owned liquidity means the protocol itself owns and controls its liquidity, reducing dependence on external liquidity providers."
  },
  {
    question: "Which of the following best describes cross-chain bridges?",
    options: [
      "Single blockchain transactions only",
      "Centralized exchange platforms",
      "Secure asset transfers between different blockchains",
      "Layer 2 scaling solutions only"
    ],
    correctAnswer: 2,
    explanation: "Cross-chain bridges enable secure asset transfers and communication between different blockchain networks, facilitating interoperability in the DeFi ecosystem."
  }
];

export default function DefiModule4Quiz() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Let's look at why this is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand the correct answer.",
        variant: "destructive",
      });
    }

    // Auto advance after showing explanation
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(
          4,
          'defi-module4-quiz',
          finalScore >= 70,
          4,
          undefined,
          finalScore,
          '/defi/module4',
          undefined,
          'DeFi'
        );
      }
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto p-6">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg p-6">
            <CardTitle className="text-3xl text-center">
              DeFi Module 4: Final Quiz
            </CardTitle>
            <p className="text-blue-100 text-center mt-2">
              Test your knowledge of DeFi Governance and Integrations
            </p>
          </CardHeader>

          {!showResults ? (
            <CardContent className="pt-6">
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="mb-6"
              />
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Question {currentQuestion + 1} of {questions.length}
                  </h3>
                  <span className="text-sm font-medium text-blue-600">
                    Score: {score}/{questions.length}
                  </span>
                </div>
                <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant={selectedAnswer === index ?
                        (index === questions[currentQuestion].correctAnswer ? "default" : "destructive")
                        : "outline"}
                      disabled={showExplanation}
                      className="w-full justify-start text-left"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                    <p className="text-blue-700">
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          ) : (
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Module Quiz Complete!</h3>
                <p className="text-xl mb-4">
                  Your score: {score}/{questions.length}
                </p>
                <Progress
                  value={(score / questions.length) * 100}
                  className="mb-6"
                />
                {score === questions.length ? (
                  <p className="text-green-500 font-semibold mb-6">
                    Perfect score! You've mastered DeFi Governance and Integrations!
                  </p>
                ) : score >= questions.length * 0.7 ? (
                  <p className="text-blue-500 font-semibold mb-6">
                    Great job! You have a strong understanding of the concepts.
                  </p>
                ) : (
                  <p className="text-yellow-500 font-semibold mb-6">
                    Keep learning! Review the material and try again to improve your score.
                  </p>
                )}
                <Link href="/defi/module4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                    Return to Module 4
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </div>
  );
}