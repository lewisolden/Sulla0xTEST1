import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ChevronRight, Award, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of a lending protocol in DeFi?",
    options: [
      "To provide decentralized storage solutions",
      "To enable users to lend and borrow assets without intermediaries",
      "To create new cryptocurrencies",
      "To manage network consensus"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of stablecoin?",
    options: [
      "Fiat-collateralized",
      "Crypto-collateralized",
      "Mining-backed",
      "Algorithmic"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What role do oracles play in DeFi protocols?",
    options: [
      "They mine new blocks",
      "They provide external data to smart contracts",
      "They store user funds",
      "They create new tokens"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is a synthetic asset in DeFi?",
    options: [
      "A physical commodity",
      "A tokenized derivative that tracks the value of another asset",
      "A new cryptocurrency",
      "A type of stablecoin"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the main purpose of a DAO?",
    options: [
      "To centralize decision-making",
      "To provide decentralized governance and community-driven decisions",
      "To store cryptocurrency",
      "To mine new blocks"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is liquidation in DeFi lending?",
    options: [
      "Adding more collateral",
      "Withdrawing funds",
      "Forced closure of a position when collateral ratio falls below threshold",
      "Creating new loans"
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What are governance tokens primarily used for?",
    options: [
      "Making payments",
      "Mining new blocks",
      "Voting on protocol changes and proposals",
      "Storing value"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is the main benefit of using perpetual futures in DeFi?",
    options: [
      "No expiration date",
      "Lower fees",
      "Guaranteed profits",
      "Simplified trading"
    ],
    correctAnswer: 0
  }
];

export default function DefiModule2Quiz() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleAnswer = (selectedIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(selectedIndex);
    const isCorrect = selectedIndex === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedIndex;
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! That's the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not quite right. Keep trying!",
        variant: "destructive",
      });
    }

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        // Update progress when quiz is completed
        updateProgress({
          courseId: 3,
          moduleId: 4,
          sectionId: "quiz",
          subsectionId: "defi-module2-quiz",
          progress: 100,
          completed: true,
          type: "quiz",
          data: {
            score,
            totalQuestions: questions.length
          }
        });
      }
    }, 1500);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <Award className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Quiz Completed!
              </h1>
              <p className="text-xl text-gray-600">
                You scored {score} out of {questions.length}
              </p>
              <div className="mt-4">
                <Progress value={(score / questions.length) * 100} className="h-3" />
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {questions.map((q, index) => (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {answers[index] === q.correctAnswer ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mt-1" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                      <p className="text-sm text-gray-600">
                        Your answer: {q.options[answers[index]]}
                      </p>
                      {answers[index] !== q.correctAnswer && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Link href="/defi/module2">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Module
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button className="gap-2">
                  Continue Learning <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Module
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <span className="text-sm text-gray-500">
                  Progress: {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].question}
              </h3>
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedAnswer === null
                        ? "hover:bg-purple-50 border border-gray-200"
                        : selectedAnswer === index
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-500 border"
                          : "bg-red-100 border-red-500 border"
                        : index === questions[currentQuestion].correctAnswer
                        ? "bg-green-100 border-green-500 border"
                        : "bg-gray-50 border-gray-200 border opacity-60"
                    }`}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}