import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link, useLocation } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award, PencilLine } from "lucide-react";

const questions = [
  {
    question: "What is the primary innovation that makes Bitcoin unique?",
    options: [
      "Digital payment system",
      "Decentralized, trustless network",
      "Online banking platform",
      "Government-backed currency"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin's main innovation is its decentralized, trustless network that operates without intermediaries or central authorities."
  },
  {
    question: "How does Bitcoin ensure transaction security?",
    options: [
      "Through bank verification",
      "Using cryptographic algorithms",
      "With government oversight",
      "By manual verification"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin uses cryptographic algorithms to secure transactions and verify ownership of funds."
  },
  {
    question: "What is the purpose of Bitcoin mining?",
    options: [
      "To create new coins and validate transactions",
      "To hack other users' wallets",
      "To store Bitcoin offline",
      "To convert Bitcoin to cash"
    ],
    correctAnswer: 0,
    explanation: "Bitcoin mining serves the dual purpose of creating new bitcoins and validating transactions on the network."
  },
  {
    question: "What is a key characteristic of Bitcoin's supply?",
    options: [
      "Unlimited supply",
      "Supply controlled by banks",
      "Fixed maximum of 21 million coins",
      "Supply determined by demand"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin has a fixed maximum supply of 21 million coins, making it a deflationary currency."
  },
  {
    question: "What role do nodes play in the Bitcoin network?",
    options: [
      "They only process payments",
      "They verify and record transactions",
      "They convert Bitcoin to other currencies",
      "They control Bitcoin's price"
    ],
    correctAnswer: 1,
    explanation: "Nodes in the Bitcoin network verify and record transactions, maintaining the integrity of the blockchain."
  }
];

export default function BitcoinFundamentalsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    setTimeout(() => {
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;

        updateProgress(
          2,
          'bitcoin-fundamentals',
          finalScore >= 60,
          1,
          undefined,
          finalScore,
          '/modules/module2/bitcoin-fundamentals',
          '/modules/module2/bitcoin-investment',
          'Bitcoin Fundamentals'
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            setLocation('/modules/module2/bitcoin-investment');
          }, 8000);
        }
      }
    }, 8000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">You scored {score} out of {questions.length}</p>

          {percentage >= 60 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Congratulations! You've passed!
              </p>
              <p className="text-sm text-green-600 mt-1">
                Moving to Bitcoin Investment in 8 seconds...
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={restartQuiz} variant="outline">
              Retry Quiz
            </Button>
            {percentage >= 60 && (
              <Link href="/modules/module2/bitcoin-investment">
                <Button className="bg-green-600 hover:bg-green-700">
                  Continue to Bitcoin Investment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bitcoin Fundamentals Quiz</h2>
        <p className="opacity-90">Test your understanding of Bitcoin's core concepts</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Score: {score}
          </span>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`
                  w-full p-4 h-auto text-left justify-start
                  ${selectedAnswer === null
                    ? 'hover:bg-blue-50'
                    : index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : selectedAnswer === index
                        ? 'bg-red-100 border-red-500'
                        : ''}
                `}
                disabled={selectedAnswer !== null}
                variant="outline"
              >
                {option}
              </Button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className={`
              mt-4 p-4 rounded-lg
              ${selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'bg-green-100'
                : 'bg-red-100'}
            `}>
              <p className="font-semibold mb-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              <p>{questions[currentQuestion].explanation}</p>
              <p className="text-sm text-gray-600 mt-2">Next question in 8 seconds...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}