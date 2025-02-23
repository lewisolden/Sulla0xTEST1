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
    question: "What is Bitcoin?",
    options: [
      "A physical form of digital currency",
      "A decentralized digital currency",
      "A government-issued cryptocurrency",
      "A traditional banking system"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin is a decentralized digital currency that operates without the need for intermediaries like banks or governments."
  },
  {
    question: "What technology powers Bitcoin?",
    options: [
      "Cloud computing",
      "Artificial intelligence",
      "Blockchain technology",
      "Traditional databases"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin is powered by blockchain technology, which is a distributed ledger that records all transactions across a network of computers."
  },
  {
    question: "What is the purpose of Bitcoin mining?",
    options: [
      "To create physical bitcoins",
      "To validate transactions and secure the network",
      "To hack other users' wallets",
      "To store bitcoin offline"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin mining serves to validate transactions, create new bitcoins, and secure the network through computational work."
  },
  {
    question: "What is a Bitcoin wallet?",
    options: [
      "A physical wallet for storing bitcoins",
      "A software for managing private keys and transactions",
      "A bank account for cryptocurrencies",
      "A website for buying bitcoin"
    ],
    correctAnswer: 1,
    explanation: "A Bitcoin wallet is software that stores private keys and allows users to send and receive bitcoin transactions."
  },
  {
    question: "What makes Bitcoin transactions secure?",
    options: [
      "Bank oversight",
      "Government regulations",
      "Cryptographic algorithms",
      "User passwords"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin transactions are secured through advanced cryptographic algorithms that ensure only the rightful owner can spend their bitcoins."
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
            window.location.href = '/modules/module2/bitcoin-investment';
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
              <p className="text-sm text-green-600 mt-1">Moving to Bitcoin Investment in 8 seconds...</p>
              <Link href="/modules/module2/bitcoin-investment">
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-sm">
                  Continue to Bitcoin Investment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4 text-sm">
              <p className="text-red-700 flex items-center gap-2 justify-center">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
              <Button
                onClick={restartQuiz}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-sm"
              >
                Retry Quiz
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-3 max-w-xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Test Your Knowledge</h2>
        <p className="text-white/80">Complete the quiz to test your understanding of Bitcoin fundamentals</p>
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