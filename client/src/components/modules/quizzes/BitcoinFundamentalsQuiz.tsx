import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    id: 1,
    question: "What is the main innovation that Bitcoin introduced?",
    options: [
      "A digital payment system with central control",
      "A decentralized digital currency without intermediaries",
      "A new type of bank account",
      "A government-backed cryptocurrency"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is the function of Bitcoin mining?",
    options: [
      "To create physical coins",
      "To hack other cryptocurrencies",
      "To secure the network and process transactions",
      "To store Bitcoin in digital wallets"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "When was the Bitcoin whitepaper published?",
    options: [
      "October 31, 2008",
      "January 3, 2009",
      "May 22, 2010",
      "December 25, 2008"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "What is the Bitcoin blockchain?",
    options: [
      "A private database owned by banks",
      "A public ledger that records all transactions",
      "A type of cryptocurrency wallet",
      "A mining software"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What was significant about the 'Pizza Transaction' in Bitcoin's history?",
    options: [
      "It was the first Bitcoin transaction ever",
      "It proved Bitcoin was a scam",
      "It was the first real-world purchase using Bitcoin",
      "It crashed the Bitcoin network"
    ],
    correctAnswer: 2
  }
];

export default function BitcoinFundamentalsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      if (score >= Math.floor(questions.length * 0.7)) {
        updateProgress(2, 'bitcoin-fundamentals-quiz', true);
      }
    }
  };

  if (showResult) {
    const passed = score >= Math.floor(questions.length * 0.7);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <Card className={`p-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="text-xl font-semibold mb-4">
            Quiz Complete! Your Score: {score}/{questions.length}
          </h3>
          <div className="flex items-center gap-2">
            {passed ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-green-700">
                  Congratulations! You've passed the quiz.
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">
                  Keep learning and try again to improve your score.
                </p>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-gray-700">{questions[currentQuestion].question}</p>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full justify-start text-left ${
                selectedAnswer === index ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-4">
            <Button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
