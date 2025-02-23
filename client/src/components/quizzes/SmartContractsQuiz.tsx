import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { CheckCircle, XCircle, Award, ArrowRight } from "lucide-react";

interface SmartContractsQuizProps {
  onComplete: () => void;
}

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

const SmartContractsQuiz: React.FC<SmartContractsQuizProps> = ({ onComplete }) => {
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
          3,
          'smart-contracts',
          finalScore >= 60,
          3,
          undefined,
          finalScore,
          '/modules/module3/smart-contracts',
          undefined,
          'Smart Contract Development'
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            onComplete();
          }, 5000);
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
              <Link href="/modules/module3/investment-value">
                <Button 
                  className="w-full bg-black hover:bg-gray-900 text-sm"
                >
                  Continue to Investment Value <ArrowRight className="ml-2 h-4 w-4" />
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
        <div className="bg-gradient-to-r from-gray-800 to-black p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center justify-between">
            Question {currentQuestion + 1} of {quizQuestions.length}
            <span className="text-sm bg-white/10 px-2 py-1 rounded-full text-white">
              Score: {score}
            </span>
          </h3>
        </div>

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

export default SmartContractsQuiz;