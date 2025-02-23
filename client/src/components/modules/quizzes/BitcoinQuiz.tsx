import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award } from "lucide-react";

interface BitcoinQuizProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "What significant event marked the beginning of Bitcoin?",
    options: [
      "The launch of the first cryptocurrency exchange",
      "The mining of the genesis block",
      "The first Bitcoin whitepaper publication",
      "The first Bitcoin transaction"
    ],
    correctAnswer: 1,
    explanation: "The mining of the genesis block on January 3, 2009, marked the official beginning of the Bitcoin blockchain, creating the first 50 bitcoins."
  },
  {
    question: "What is the primary purpose of Bitcoin's block size limit?",
    options: [
      "To make transactions faster",
      "To reduce network congestion and maintain decentralization",
      "To increase mining rewards",
      "To make Bitcoin more valuable"
    ],
    correctAnswer: 1,
    explanation: "The block size limit helps maintain decentralization by ensuring nodes can process blocks without requiring excessive computational resources."
  },
  {
    question: "What is the significance of Bitcoin's halving event?",
    options: [
      "It doubles transaction speed",
      "It reduces the block size",
      "It cuts the mining reward in half",
      "It increases network security"
    ],
    correctAnswer: 2,
    explanation: "The halving event reduces the mining reward by 50% approximately every four years, controlling Bitcoin's supply and maintaining its deflationary nature."
  },
  {
    question: "What role do nodes play in the Bitcoin network?",
    options: [
      "They only mine new blocks",
      "They verify transactions and maintain the blockchain",
      "They only process payments",
      "They create new Bitcoin addresses"
    ],
    correctAnswer: 1,
    explanation: "Nodes maintain and verify the entire blockchain, ensuring the network's integrity by validating all transactions and blocks."
  },
  {
    question: "What makes Bitcoin transactions irreversible?",
    options: [
      "Government regulations",
      "Exchange policies",
      "The blockchain's immutable nature",
      "User agreements"
    ],
    correctAnswer: 2,
    explanation: "Once confirmed, Bitcoin transactions cannot be reversed due to the blockchain's immutable nature and cryptographic security."
  }
];

const BitcoinQuiz: React.FC<BitcoinQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
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
            onComplete();
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
    setShowExplanation(false);
  };

  if (showResult) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-center mb-4">
            <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold mb-3 text-blue-800">
            Quiz Complete!
          </h2>
          <div className="text-lg mb-4">
            <p className="font-semibold">Your Score:</p>
            <p className={`text-2xl font-bold ${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              ({score} out of {quizQuestions.length} correct)
            </p>
          </div>
          {percentage >= 60 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-4 text-sm">
              <p className="text-green-700 flex items-center gap-2 justify-center">
                <CheckCircle className="h-4 w-4" />
                Congratulations! You've passed!
              </p>
              <p className="text-sm text-green-600 mt-1">Moving to next section in 8 seconds...</p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4 text-sm">
              <p className="text-red-700 flex items-center gap-2 justify-center">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={restartQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-sm"
            >
              Retry Quiz
            </Button>
            {percentage >= 60 && (
              <Link href="/modules/module2/crypto-market">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-sm"
                >
                  Continue to Next Section <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-3 max-w-xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Test Your Knowledge</h2>
        <p className="text-white/80">Complete the quiz to test your understanding of stablecoins</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center justify-between">
          Question {currentQuestion + 1} of {quizQuestions.length}
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            Score: {score}
          </span>
        </h3>

        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
          <p className="text-base text-gray-700">
            {quizQuestions[currentQuestion].question}
          </p>
        </div>

        <div className="grid gap-2">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300 text-sm
                ${selectedAnswer === null
                  ? 'bg-white hover:bg-blue-50 border border-gray-200'
                  : index === quizQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : selectedAnswer === index
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-white border border-gray-200'}
                whitespace-normal break-words hover:shadow-md
              `}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
            >
              <span>{option}</span>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg text-sm
              ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                ? 'bg-green-100 border-l-4 border-green-500'
                : 'bg-red-100 border-l-4 border-red-500'}
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
            </h3>
            <p className="leading-relaxed">{quizQuestions[currentQuestion].explanation}</p>
            <p className="text-xs mt-2 text-gray-600">Next question in 8 seconds...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BitcoinQuiz;