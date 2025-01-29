import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const quizQuestions = [
  {
    question: "What is a key characteristic of smart contracts?",
    options: [
      "They require manual execution",
      "They are self-executing when conditions are met",
      "They can be modified after deployment",
      "They need intermediaries"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing contracts where the terms are directly written into code and execute automatically when predetermined conditions are met, eliminating the need for intermediaries."
  },
  {
    question: "What is the 'Oracle Problem' in smart contracts?",
    options: [
      "Software bugs in the code",
      "High transaction fees",
      "Difficulty in getting reliable external data",
      "Slow execution speed"
    ],
    correctAnswer: 2,
    explanation: "The Oracle Problem refers to the challenge of getting reliable real-world data into blockchain smart contracts while maintaining decentralization and security."
  },
  {
    question: "What makes smart contracts immutable?",
    options: [
      "Regular updates",
      "Code cannot be changed after deployment",
      "Administrative controls",
      "User permissions"
    ],
    correctAnswer: 1,
    explanation: "Once deployed on the blockchain, smart contract code cannot be changed. This immutability ensures contract terms remain constant and builds trust between parties."
  },
  {
    question: "Which is NOT a common use case for smart contracts?",
    options: [
      "Automated lending",
      "Supply chain tracking",
      "Personal messaging",
      "Insurance claims processing"
    ],
    correctAnswer: 2,
    explanation: "Personal messaging is not a common use case for smart contracts, as they are primarily designed for automating business logic and transactions rather than communication functions."
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
      const passThreshold = quizQuestions.length * 0.7; // 70% to pass
      if (score >= passThreshold) {
        updateProgress(2, 'smart-contracts-quiz', true);
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
                  Smart Contracts Quiz Results
                </h2>
                <p className="text-xl mb-4">
                  You scored {score} out of {quizQuestions.length}
                </p>

                {passed ? (
                  <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                    <p className="text-green-700">
                      🎉 Congratulations! You've passed the Smart Contracts quiz!
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      You've demonstrated a good understanding of smart contracts.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">
                      You didn't pass this time. Review the content and try again.
                    </p>
                    <p className="text-red-600 text-sm mt-2">
                      You need {Math.ceil(passThreshold)} correct answers to pass.
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/modules/module2/smart-contracts">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Content
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2/smart-contracts">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Smart Contracts
            </Button>
          </Link>
        </motion.div>

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
                  Smart Contracts Quiz
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

export default SmartContractsQuiz;
