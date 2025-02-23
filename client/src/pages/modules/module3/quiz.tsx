import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
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
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
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
      const passThreshold = Math.ceil(quizQuestions.length * 0.7);
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

  const renderQuizInProgress = () => (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-t border-blue-500/30 shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Module 3: Ethereum & Smart Contracts Quiz
            </h2>
            <span className="text-gray-300">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>

          <Progress
            value={((currentQuestion + 1) / quizQuestions.length) * 100}
            className="mb-6"
          />

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-blue-500/20">
            <p className="text-xl text-gray-100">
              {quizQuestions[currentQuestion].question}
            </p>
          </div>

          <div className="grid gap-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-6 rounded-lg text-left transition-all duration-300 text-lg
                  ${selectedAnswer === null
                    ? 'bg-gray-800/50 hover:bg-blue-900/30 border border-gray-700 hover:border-blue-500/30'
                    : index === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-900/30 border border-green-500/30'
                      : selectedAnswer === index
                        ? 'bg-red-900/30 border border-red-500/30'
                        : 'bg-gray-800/50 border border-gray-700'}
                `}
                disabled={selectedAnswer !== null}
              >
                <span className="text-gray-100">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-8 p-6 rounded-lg border
              ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                ? 'bg-green-900/30 border-green-500/30'
                : 'bg-red-900/30 border-red-500/30'}
            `}>
              <h3 className="text-xl font-bold mb-3 text-white">
                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                  ? '✅ Correct!'
                  : '❌ Incorrect'}
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                {quizQuestions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
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
  );

  const renderQuizResults = () => {
    const passThreshold = Math.ceil(quizQuestions.length * 0.7);
    const passed = score >= passThreshold;

    return (
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-t border-blue-500/30 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quiz Results
            </h2>

            <Progress
              value={(score / quizQuestions.length) * 100}
              className="mb-6"
            />

            <p className="text-xl text-gray-200 mb-4">
              You scored {score} out of {quizQuestions.length}
            </p>

            {passed ? (
              <div className="bg-green-900/30 border border-green-500/30 p-6 rounded-lg mb-6">
                <p className="text-green-300 text-xl">
                  🎉 Congratulations! You've passed Module 3!
                </p>
                <p className="text-green-200 mt-2 text-lg">
                  You've demonstrated a strong understanding of Ethereum and Smart Contracts.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-900/30 border border-yellow-500/30 p-6 rounded-lg mb-6">
                <p className="text-yellow-300 text-xl">
                  You need a few more correct answers to pass.
                </p>
                <p className="text-yellow-200 mt-2 text-lg">
                  Review the material and try again! You need {passThreshold} correct answers to pass.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/modules/module3">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto bg-gray-800 border-blue-500/30 text-white hover:bg-gray-700 hover:text-white text-lg px-6 py-3"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Return to Module
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto bg-gray-800 border-blue-500/30 text-white hover:bg-gray-700 hover:text-white text-lg px-6 py-3"
                >
                  Return to Curriculum
                </Button>
              </Link>
              <Button
                onClick={restartQuiz}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3"
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex gap-4"
          >
            <Link href="/modules/module3">
              <Button 
                variant="outline" 
                className="gap-2 bg-gray-800 border-blue-500/30 text-white hover:bg-gray-700 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Module 3
              </Button>
            </Link>
            <Link href="/curriculum">
              <Button 
                variant="outline" 
                className="gap-2 bg-gray-800 border-blue-500/30 text-white hover:bg-gray-700 hover:text-white"
              >
                Return to Curriculum
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!showResult && renderQuizInProgress()}
            {showResult && renderQuizResults()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Module3Quiz;