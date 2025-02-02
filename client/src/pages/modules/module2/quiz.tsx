import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const quizQuestions = [
  {
    question: "What is the maximum number of Bitcoins that will ever exist?",
    options: [
      "18 million",
      "21 million",
      "25 million",
      "There is no maximum"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin's code limits the total supply to 21 million coins. This scarcity is a fundamental feature of Bitcoin's economic model."
  },
  {
    question: "Which of these best describes a Bitcoin wallet?",
    options: [
      "A physical device that stores Bitcoin",
      "A software that stores your private keys and manages transactions",
      "An online account where you keep Bitcoin",
      "A bank account for cryptocurrency"
    ],
    correctAnswer: 1,
    explanation: "A Bitcoin wallet is software that manages your private keys and helps you interact with the Bitcoin network. It doesn't actually 'store' Bitcoins, as they exist on the blockchain."
  },
  {
    question: "What happens if you lose your Bitcoin wallet's recovery phrase?",
    options: [
      "Contact Bitcoin support to recover it",
      "Use your email to reset it",
      "Your Bitcoin is permanently lost",
      "Wait 30 days for automatic reset"
    ],
    correctAnswer: 2,
    explanation: "If you lose your recovery phrase, there is no way to recover your Bitcoin. There is no central authority or support team that can help - this highlights the importance of securing your recovery phrase."
  },
  {
    question: "What is the main advantage of a Bitcoin ETF over direct Bitcoin ownership?",
    options: [
      "Higher returns guaranteed",
      "No transaction fees",
      "Investment through traditional brokerage accounts",
      "Faster transactions"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin ETFs allow investors to gain Bitcoin exposure through traditional brokerage accounts without needing to manage private keys or deal with cryptocurrency exchanges."
  },
  {
    question: "Which statement about Bitcoin transactions is correct?",
    options: [
      "They can be reversed by contacting support",
      "They are anonymous and untraceable",
      "They are confirmed by network consensus",
      "They are free of charge"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin transactions are confirmed through network consensus (mining). Once confirmed, they cannot be reversed, and while they're public on the blockchain, they're not free (they require mining fees)."
  }
];

const Module2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(optionIndex);
      setShowExplanation(true);
    }
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
      const passThreshold = quizQuestions.length * 0.7; // 70% to pass
      if (score >= passThreshold) {
        updateProgress(2, 'module2-quiz', true);
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
                      🎉 Congratulations! You've passed the Bitcoin Module Quiz!
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      You've demonstrated a strong understanding of Bitcoin fundamentals.
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
                  {passed && (
                    <Link href="/modules/module3">
                      <Button 
                        size="lg"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                      >
                        Module 3 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
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
            <div className="mb-6 flex justify-between items-center">
              <Link href="/modules/module2">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Module Overview
                </Button>
              </Link>
            </div>

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
                          ? 'bg-green-100 border-green-500' 
                          : selectedAnswer === index 
                            ? 'bg-red-100 border-red-500' 
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