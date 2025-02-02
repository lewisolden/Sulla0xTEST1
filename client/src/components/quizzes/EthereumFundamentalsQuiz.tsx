import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "What is the main innovation that Ethereum introduced to blockchain technology?",
    options: [
      "Faster transaction speeds",
      "Smart contract functionality",
      "Lower transaction fees",
      "Proof of stake consensus"
    ],
    correctAnswer: 1,
    explanation: "Ethereum's main innovation was introducing programmable smart contracts, enabling developers to build decentralized applications (dApps) on the blockchain."
  },
  {
    question: "What is the Ethereum Virtual Machine (EVM)?",
    options: [
      "A physical computer that runs Ethereum",
      "A runtime environment for smart contracts",
      "A cryptocurrency wallet",
      "A mining software"
    ],
    correctAnswer: 1,
    explanation: "The EVM is a runtime environment that executes smart contracts and ensures consistent execution across the network."
  },
  {
    question: "What role does gas play in Ethereum transactions?",
    options: [
      "It powers mining hardware",
      "It measures computational effort and costs",
      "It stores transaction data",
      "It secures private keys"
    ],
    correctAnswer: 1,
    explanation: "Gas is a measure of computational effort required for transactions and smart contract execution, helping prevent spam and allocate network resources."
  },
  {
    question: "Which of these is NOT a key feature of Ethereum?",
    options: [
      "Programmable smart contracts",
      "Fixed maximum supply",
      "Decentralized applications",
      "Turing complete programming"
    ],
    correctAnswer: 1,
    explanation: "Unlike Bitcoin, Ethereum does not have a fixed maximum supply. Its supply model is different and has been subject to changes through protocol upgrades."
  },
  {
    question: "What is a key difference between Bitcoin and Ethereum transactions?",
    options: [
      "Only Ethereum uses blockchain technology",
      "Ethereum transactions can execute code",
      "Bitcoin transactions are faster",
      "Ethereum transactions are free"
    ],
    correctAnswer: 1,
    explanation: "While both use blockchain technology, Ethereum transactions can execute code through smart contracts, enabling complex programmable functionality beyond simple value transfer."
  }
];

const EthereumFundamentalsQuiz = () => {
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
      updateProgress(3, 'ethereum-fundamentals-quiz', score >= passThreshold);
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
                🎉 Congratulations! You've passed the Ethereum Fundamentals quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <Button 
            onClick={restartQuiz}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Restart Quiz
          </Button>
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
            Ethereum Fundamentals Quiz
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

export default EthereumFundamentalsQuiz;
