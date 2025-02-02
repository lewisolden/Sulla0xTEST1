import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";

const quizQuestions = [
  {
    question: "What is a key characteristic of smart contracts?",
    options: [
      "They require legal approval",
      "They are self-executing when conditions are met",
      "They can be modified after deployment",
      "They need constant maintenance"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing programs that automatically execute when predetermined conditions are met, without requiring manual intervention."
  },
  {
    question: "Which is NOT a common use case for smart contracts?",
    options: [
      "Decentralized Finance (DeFi)",
      "Physical property maintenance",
      "Token distribution",
      "Supply chain tracking"
    ],
    correctAnswer: 1,
    explanation: "While smart contracts can handle digital transactions and data, they cannot directly maintain physical property. They need external data sources (oracles) to interact with the physical world."
  },
  {
    question: "What is a key security consideration when deploying smart contracts?",
    options: [
      "Network speed",
      "Code immutability",
      "Storage costs",
      "Visual design"
    ],
    correctAnswer: 1,
    explanation: "Once deployed, smart contracts cannot be modified due to their immutable nature. This makes thorough testing and auditing crucial before deployment."
  },
  {
    question: "What role does gas play in smart contract execution?",
    options: [
      "Powers the mining hardware",
      "Measures computational cost",
      "Stores contract data",
      "Encrypts transactions"
    ],
    correctAnswer: 1,
    explanation: "Gas measures and prices the computational resources required to execute smart contract operations, helping prevent infinite loops and resource abuse."
  },
  {
    question: "Which component is essential for smart contracts to interact with external data?",
    options: [
      "Web server",
      "Oracle",
      "Database",
      "GUI interface"
    ],
    correctAnswer: 1,
    explanation: "Oracles provide smart contracts with external data they cannot access directly, enabling them to interact with real-world information."
  }
];

const SmartContractsQuiz = () => {
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
      updateProgress(3, 'smart-contracts-quiz', score >= passThreshold);
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
                🎉 Congratulations! You've passed the Smart Contracts quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <div className="flex flex-col gap-4 mt-6">
            <Button 
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Restart Quiz
            </Button>
            {score >= 3 && (
              <Link href="/modules/module3/practical-applications">
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Continue to Practical Applications →
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
            Smart Contracts Quiz
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

export default SmartContractsQuiz;
