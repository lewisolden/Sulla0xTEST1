import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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

const DigitalCurrenciesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = quizQuestions.length * 0.6;
      updateProgress(1, 'digital-currencies-quiz', score >= passThreshold);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Digital Currencies quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Restart Quiz
            </Button>
            {score >= 3 && (
              <Link href="/modules/module1/security">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Next Topic <ArrowRight className="ml-2 h-4 w-4" />
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Digital Currencies Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-6 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === currentQuizQuestion.correctAnswer 
                      ? 'bg-green-200' 
                      : selectedAnswer === index 
                        ? 'bg-red-200' 
                        : 'bg-gray-100'}
                  whitespace-normal break-words
                `}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-8 p-6 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-3 text-lg">
                {selectedAnswer === currentQuizQuestion.correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p className="text-lg leading-relaxed">{currentQuizQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-8 w-full bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DigitalCurrenciesQuiz;