import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award } from "lucide-react";

interface DigitalCurrenciesQuizProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "What is the fundamental innovation of digital currencies?",
    options: [
      "Creating digital art",
      "Decentralization and peer-to-peer transactions",
      "Replacing physical money completely",
      "Reducing bank fees"
    ],
    correctAnswer: 1,
    explanation: "Digital currencies introduce decentralization, allowing peer-to-peer transactions without intermediaries like banks."
  },
  {
    question: "What problem did Bitcoin specifically aim to solve?",
    options: [
      "Slow internet speeds",
      "Global communication challenges",
      "The double-spending problem in digital transactions",
      "Reducing carbon emissions"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin was designed to solve the double-spending problem, ensuring that a digital token cannot be spent more than once without a central authority."
  },
  {
    question: "What makes cryptocurrencies different from traditional fiat currencies?",
    options: [
      "They are printed on special paper",
      "They are controlled by a central bank",
      "They use blockchain technology and are decentralized",
      "They can only be used online"
    ],
    correctAnswer: 2,
    explanation: "Cryptocurrencies are unique because they use decentralized blockchain technology, operating without a central controlling authority."
  },
  {
    question: "What is a key characteristic of blockchain technology?",
    options: [
      "It's completely anonymous",
      "It can be easily modified",
      "It provides transparency and is immutable",
      "It requires no computational power"
    ],
    correctAnswer: 2,
    explanation: "Blockchain technology ensures transparency and immutability, meaning once data is recorded, it cannot be easily changed."
  },
  {
    question: "What is the primary purpose of a stablecoin?",
    options: [
      "To make quick profits",
      "To minimize price volatility",
      "To replace traditional banking",
      "To create digital art"
    ],
    correctAnswer: 1,
    explanation: "Stablecoins are designed to minimize price volatility by pegging their value to a stable asset like a fiat currency."
  }
];

const DigitalCurrenciesQuiz: React.FC<DigitalCurrenciesQuizProps> = ({ onComplete }) => {
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
          1,
          'digital-currencies',
          finalScore >= 60,
          1,
          undefined,
          finalScore,
          '/modules/module1/digital-currencies',
          undefined,
          'Blockchain Fundamentals'
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            onComplete();
          }, 5000); // Show score for 5 seconds
        }
      }
    }, 3000);
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
              <p className="text-sm text-green-600 mt-1">Moving to next section in 5 seconds...</p>
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
              <Link href="/modules/module1/security">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-sm"
                >
                  Continue to Security <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-3 max-w-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center justify-between">
          Question {currentQuestion + 1} of {quizQuestions.length}
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            Score: {score}
          </span>
        </h3>

        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
          <p className="text-base text-gray-700">
            {currentQuizQuestion.question}
          </p>
        </div>

        <div className="grid gap-2">
          {currentQuizQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300 text-sm
                ${selectedAnswer === null 
                  ? 'bg-white hover:bg-blue-50 border border-gray-200' 
                  : index === currentQuizQuestion.correctAnswer 
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
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === currentQuizQuestion.correctAnswer 
                ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
            </h3>
            <p className="leading-relaxed">{currentQuizQuestion.explanation}</p>
            <p className="text-xs mt-2 text-gray-600">Next question in 3 seconds...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DigitalCurrenciesQuiz;