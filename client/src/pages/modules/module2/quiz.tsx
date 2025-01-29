import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const quizQuestions = [
  {
    question: "What is a blockchain?",
    options: [
      "A centralized database",
      "A distributed, immutable ledger of transactions",
      "A type of cryptocurrency",
      "A computer programming language"
    ],
    correctAnswer: 1,
    explanation: "A blockchain is a distributed, immutable ledger that records transactions across a network of computers."
  },
  {
    question: "What is the main purpose of distributed ledger technology (DLT)?",
    options: [
      "To create cryptocurrencies",
      "To maintain a single, centralized record",
      "To enable decentralized, transparent record-keeping",
      "To speed up database queries"
    ],
    correctAnswer: 2,
    explanation: "DLT enables decentralized and transparent record-keeping across a network of participants."
  },
  {
    question: "Which consensus mechanism does Bitcoin use?",
    options: [
      "Proof of Stake",
      "Proof of Work",
      "Proof of Authority",
      "Delegated Proof of Stake"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin uses Proof of Work (PoW) as its consensus mechanism to validate transactions and create new blocks."
  },
  {
    question: "What are smart contracts?",
    options: [
      "Legal documents stored on blockchain",
      "Self-executing contracts with code",
      "Digital signatures",
      "Cryptocurrency wallets"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing contracts where the terms are directly written into code."
  }
];

const Module2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { progress, updateProgress } = useProgress();

  // Check if required topics are completed
  const requiredTopics = [
    'blockchain-basics',
    'distributed-ledger',
    'consensus-mechanisms',
    'smart-contracts'
  ];

  const isAllTopicsCompleted = requiredTopics.every(topic =>
    progress.some(p => p.moduleId === 2 && p.sectionId === topic && p.completed)
  );

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
      // Update module completion if score meets threshold
      const passThreshold = quizQuestions.length * 0.7; // 70% to pass
      if (score >= passThreshold) {
        updateProgress(2, 'module-quiz', true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (!isAllTopicsCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                    ⚠️ Access Requirements
                  </h2>
                  <p className="text-yellow-700">
                    You need to complete all four topics below before you can take the quiz.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Required Topics:</h3>
                  <ul className="space-y-3">
                    {requiredTopics.map(topic => {
                      const isComplete = progress.some(
                        p => p.moduleId === 2 && p.sectionId === topic && p.completed
                      );
                      return (
                        <li 
                          key={topic} 
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isComplete ? 'bg-green-50' : 'bg-gray-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isComplete ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <span className={`${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
                              {topic.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </span>
                          {!isComplete && (
                            <Link href={`/modules/module2/${topic}`}>
                              <Button variant="outline" size="sm">
                                Complete Topic
                              </Button>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link href="/modules/module2">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Return to Module Overview
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResult) {
    const passThreshold = quizQuestions.length * 0.7;
    const passed = score >= passThreshold;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <CardContent>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">
                  Module 2 Quiz Results
                </h2>
                <p className="text-xl mb-4">
                  You scored {score} out of {quizQuestions.length}
                </p>

                {passed ? (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-700">
                      🎉 Congratulations! You've passed Module 2!
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      You've demonstrated a strong understanding of Blockchain Technology fundamentals.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">
                      You didn't pass this time. Review the topics and try again.
                    </p>
                    <p className="text-red-600 text-sm mt-2">
                      You need {Math.ceil(passThreshold)} correct answers to pass.
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/modules/module2">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 2
                    </Button>
                  </Link>
                  <Button 
                    onClick={restartQuiz}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <CardContent>
            {currentQuestion === 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Quiz Requirements</h3>
                <div className="space-y-4">
                  <p className="text-blue-800 font-semibold">
                    To pass this quiz, you need to:
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-lg text-blue-900 font-medium">
                      Get at least {Math.ceil(quizQuestions.length * 0.7)} out of {quizQuestions.length} questions correct (70%)
                    </p>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-blue-800">
                    <li>You can retake the quiz as many times as needed</li>
                    <li>You'll see immediately if each answer is correct</li>
                    <li>Take your time - there's no time limit</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">
                  Module 2 Final Quiz
                </h2>
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-700">
                  {quizQuestions[currentQuestion].question}
                </p>
              </div>

              <div className="grid gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300
                      ${selectedAnswer === null 
                        ? 'bg-gray-100 hover:bg-blue-100' 
                        : index === quizQuestions[currentQuestion].correctAnswer 
                          ? 'bg-green-200' 
                          : selectedAnswer === index 
                            ? 'bg-red-200' 
                            : 'bg-gray-100'}
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
                  ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? 'bg-green-100 border-l-4 border-green-500' 
                    : 'bg-red-100 border-l-4 border-red-500'}
                `}>
                  <h3 className="font-bold mb-2">
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                      ? '✅ Correct!' 
                      : '❌ Incorrect'}
                  </h3>
                  <p className="text-gray-700">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <Button
                  onClick={moveToNextQuestion}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {currentQuestion < quizQuestions.length - 1 
                    ? 'Next Question' 
                    : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Module2Quiz;