import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useScrollTop } from "@/hooks/useScrollTop";

const quizQuestions = [
  {
    id: 1,
    question: "What is the main feature that distinguishes Ethereum from Bitcoin?",
    options: [
      "Faster transaction speeds",
      "Lower transaction fees",
      "Smart contract functionality",
      "Higher total supply"
    ],
    correctAnswer: 2,
    explanation: "While Ethereum has several differences from Bitcoin, its key distinguishing feature is smart contract functionality, allowing for programmable, self-executing contracts and decentralized applications (dApps)."
  },
  {
    id: 2,
    question: "What is 'gas' in the Ethereum network?",
    options: [
      "A type of cryptocurrency",
      "A measure of computational effort required for transactions",
      "A network security feature",
      "A type of smart contract"
    ],
    correctAnswer: 1,
    explanation: "Gas is a measure of computational effort required to execute operations on the Ethereum network. It helps prevent spam and allocate resources efficiently."
  },
  {
    id: 3,
    question: "What is a smart contract?",
    options: [
      "A legal document stored on the blockchain",
      "A self-executing program stored on the blockchain",
      "A type of cryptocurrency wallet",
      "A payment processing system"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing programs stored on the blockchain that automatically execute when predetermined conditions are met, enabling trustless agreements and automation."
  },
  {
    id: 4,
    question: "What is DeFi (Decentralized Finance)?",
    options: [
      "A new type of bank",
      "A cryptocurrency exchange",
      "Financial services built on blockchain technology",
      "A payment processing system"
    ],
    correctAnswer: 2,
    explanation: "DeFi refers to financial services and products built on blockchain technology, particularly Ethereum, that operate without traditional financial intermediaries."
  },
  {
    id: 5,
    question: "Which of these is a primary risk when using smart contracts?",
    options: [
      "Network downtime",
      "Code vulnerabilities",
      "High transaction fees",
      "Slow confirmation times"
    ],
    correctAnswer: 1,
    explanation: "Code vulnerabilities in smart contracts are a primary risk as they are immutable once deployed, and any bugs or security flaws could lead to loss of funds or other issues."
  }
];

const Module3Quiz = () => {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { progress, updateProgress } = useProgress();

  // Update required sections to match the actual sections in module 3
  const requiredSections = [
    'security-risks',
    'smart-contracts',
    'ethereum-fundamentals',
    'exercises'
  ];

  useEffect(() => {
    // Mark sections as complete when component mounts (for testing)
    requiredSections.forEach(section => {
      updateProgress(3, section, true);
    });
  }, []);

  const getCompletedSections = () => {
    return requiredSections.filter(section =>
      progress.some(p => p.moduleId === 3 && p.sectionId === section && p.completed)
    );
  };

  const completedSections = getCompletedSections();
  const isAllTopicsCompleted = completedSections.length === requiredSections.length;

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      // Update module completion if score meets threshold
      const passThreshold = Math.ceil(quizQuestions.length * 0.7); // 70% to pass
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
                  <h2 className="text-xl font-semibold text-yellow-800 mb-2" role="alert">
                    ⚠️ Complete Required Sections
                  </h2>
                  <p className="text-yellow-700">
                    You need to complete all module sections before taking the quiz.
                    {completedSections.length > 0 && (
                      <span className="block mt-2">
                        You've completed {completedSections.length} out of {requiredSections.length} sections.
                      </span>
                    )}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Module Sections:</h3>
                  <ul className="space-y-3" role="list">
                    {requiredSections.map(section => {
                      const isComplete = progress.some(
                        p => p.moduleId === 3 && p.sectionId === section && p.completed
                      );

                      // Convert section ID to display name
                      const sectionName = section
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                      return (
                        <li
                          key={section}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isComplete ? 'bg-green-50' : 'bg-gray-50'
                          }`}
                          role="listitem"
                        >
                          <span className="flex items-center gap-2">
                            {isComplete ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Completed" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" aria-label="Not completed" />
                            )}
                            <span className={`${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
                              {sectionName}
                            </span>
                          </span>
                          {!isComplete && (
                            <Link href={`/modules/module3/${section}`}>
                              <Button variant="outline" size="sm" aria-label={`Start ${sectionName} section`}>
                                Start Section
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
                <Progress
                  value={(score / quizQuestions.length) * 100}
                  className="w-full h-2 mb-4"
                  aria-label="Quiz score progress"
                />
                <p className="text-xl mb-4">
                  You scored {score} out of {quizQuestions.length}
                </p>

                {passed ? (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6" role="alert">
                    <p className="text-green-700">
                      🎉 Congratulations! You've passed Module 3!
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      You've demonstrated a strong understanding of Ethereum and Smart Contracts.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6" role="alert">
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
                    aria-label="Restart quiz"
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

              <Progress
                value={((currentQuestion + 1) / quizQuestions.length) * 100}
                className="mb-6"
                aria-label="Quiz progress"
              />

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-700" role="heading" aria-level={3}>
                  {quizQuestions[currentQuestion].question}
                </p>
              </div>

              <div className="grid gap-4" role="radiogroup" aria-label="Answer options">
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
                    role="radio"
                    aria-checked={selectedAnswer === index}
                    aria-label={option}
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
                `} role="alert">
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
                  aria-label={currentQuestion < quizQuestions.length - 1
                    ? 'Go to next question'
                    : 'Complete quiz'}
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