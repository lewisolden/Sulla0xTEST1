import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const quizQuestions = [
  // Scalability & Interoperability Questions
  {
    question: "What is the Blockchain Scalability Trilemma?",
    options: [
      "A trade-off between decentralization, security, and scalability",
      "A problem with blockchain storage capacity",
      "A conflict between miners and validators",
      "A limitation of smart contracts"
    ],
    correctAnswer: 0,
    explanation: "The Blockchain Scalability Trilemma refers to the challenge of achieving optimal levels of decentralization, security, and scalability simultaneously in blockchain systems."
  },
  {
    question: "Which solution aims to improve blockchain scalability by processing transactions off the main chain?",
    options: [
      "Sharding",
      "Layer 2 solutions",
      "Proof of Stake",
      "Increased block size"
    ],
    correctAnswer: 1,
    explanation: "Layer 2 solutions improve scalability by processing transactions off the main chain while inheriting the security of the main chain."
  },
  // Blockchain Types Questions
  {
    question: "What is the main characteristic of a private blockchain?",
    options: [
      "Open participation for anyone",
      "Controlled access and permissions",
      "No consensus mechanism",
      "Maximum transparency"
    ],
    correctAnswer: 1,
    explanation: "Private blockchains are characterized by controlled access and permissions, where participation is limited to authorized entities."
  },
  {
    question: "Which type of blockchain is most suitable for public cryptocurrencies?",
    options: [
      "Private blockchain",
      "Consortium blockchain",
      "Public blockchain",
      "Hybrid blockchain"
    ],
    correctAnswer: 2,
    explanation: "Public blockchains are ideal for cryptocurrencies as they offer open participation, transparency, and decentralization."
  },
  // Development Platforms Questions
  {
    question: "Which blockchain platform introduced smart contracts?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Solana",
      "Cardano"
    ],
    correctAnswer: 1,
    explanation: "Ethereum was the first blockchain platform to introduce smart contracts, enabling programmable and autonomous transactions."
  },
  {
    question: "What is a key feature of the Solana blockchain platform?",
    options: [
      "Proof of History consensus",
      "Smart contracts in Solidity",
      "Academic peer review",
      "Limited transaction speed"
    ],
    correctAnswer: 0,
    explanation: "Solana's Proof of History (PoH) consensus mechanism is a key innovation that enables high transaction throughput."
  }
];

const Module3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { progress, updateProgress } = useProgress();

  // Check if required sections are completed
  const requiredSections = [
    'scalability-interoperability',
    'blockchain-types',
    'development-platforms'
  ];

  const isAllTopicsCompleted = requiredSections.every(section =>
    progress.some(p => p.moduleId === 3 && p.sectionId === section && p.completed)
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
        updateProgress(3, 'module-quiz', true);
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
                    You need to complete all three sections below before you can take the quiz.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Required Sections:</h3>
                  <ul className="space-y-3">
                    {requiredSections.map(section => {
                      const isComplete = progress.some(
                        p => p.moduleId === 3 && p.sectionId === section && p.completed
                      );
                      return (
                        <li 
                          key={section} 
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
                              {section.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </span>
                          {!isComplete && (
                            <Link href={`/modules/module3/${section}`}>
                              <Button variant="outline" size="sm">
                                Complete Section
                              </Button>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link href="/modules/module3">
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
                  Module 3 Quiz Results
                </h2>
                <p className="text-xl mb-4">
                  You scored {score} out of {quizQuestions.length}
                </p>

                {passed ? (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-700">
                      🎉 Congratulations! You've passed Module 3!
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      You've demonstrated a strong understanding of Advanced Blockchain Technology.
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
                  <Link href="/modules/module3">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to Module
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
                  Module 3 Final Quiz
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

export default Module3Quiz;