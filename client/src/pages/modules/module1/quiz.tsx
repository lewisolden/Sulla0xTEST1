import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the main difference between cryptocurrency and traditional digital banking?",
    options: [
      "Cryptocurrency transactions are faster",
      "Cryptocurrency operates on a decentralized network without central authority",
      "Cryptocurrency is only used online",
      "Cryptocurrency requires a bank account"
    ],
    correct: 1,
    explanation: "While cryptocurrencies offer several advantages, the key distinguishing feature is their decentralized nature, operating without the need for traditional financial intermediaries."
  },
  {
    id: 2,
    question: "What is the purpose of public key cryptography in cryptocurrency systems?",
    options: [
      "To make transactions faster",
      "To reduce transaction fees",
      "To secure and verify transactions without central authority",
      "To connect to the internet"
    ],
    correct: 2,
    explanation: "Public key cryptography enables secure transaction verification and ownership proof without requiring trust in a central authority."
  },
  {
    id: 3,
    question: "Which of the following is a key risk when using cryptocurrency?",
    options: [
      "Network downtime",
      "Private key loss",
      "Slow internet connection",
      "Bank holidays"
    ],
    correct: 1,
    explanation: "Losing your private key means permanent loss of access to your funds, making it one of the most critical risks in cryptocurrency ownership."
  },
  {
    id: 4,
    question: "What is the 'double-spending problem' that cryptocurrency solves?",
    options: [
      "Spending twice as much money as intended",
      "Using the same digital money more than once",
      "Paying double transaction fees",
      "Having two different wallets"
    ],
    correct: 1,
    explanation: "The double-spending problem refers to the risk of using the same digital currency multiple times, which cryptocurrency prevents through blockchain technology."
  },
  {
    id: 5,
    question: "Which storage method is generally recommended for large amounts of cryptocurrency?",
    options: [
      "Mobile wallet",
      "Exchange wallet",
      "Cold storage (hardware wallet)",
      "Web wallet"
    ],
    correct: 2,
    explanation: "Cold storage, particularly hardware wallets, offers the highest security for storing significant amounts of cryptocurrency by keeping private keys offline."
  }
];

const QuizPage = () => {
  useScrollTop();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  // Auto-advance to next question after showing explanation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showExplanation && currentQuestion < questions.length - 1) {
      timer = setTimeout(() => {
        moveToNextQuestion();
      }, 8000); // Changed from 5000 to 8000
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestion]);

  const handleAnswer = (questionId: number, selectedOption: number) => {
    if (userAnswers[questionId] !== undefined) return;

    const isCorrect = selectedOption === questions[questionId].correct;
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption
    });
    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Show immediate feedback toast
    toast({
      title: isCorrect ? "Correct! 🎉" : "Incorrect ❌",
      description: questions[questionId].explanation,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const moveToNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const passThreshold = questions.length * 0.7; // 70% to pass
      if (score >= passThreshold) {
        updateProgress(
          1, // moduleId
          'module1-quiz', // sectionId
          true, // completed
          5, // order
          undefined, // timeSpent
          (score / questions.length) * 100, // quizScore
          '/modules/module1/quiz', // pageUrl
          undefined, // nextUrl
          'Module 1 Quiz' // sectionName
        );

        // Navigate to next module after delay
        setTimeout(() => {
          window.location.href = '/modules/module2';
        }, 8000); // Changed from 5000 to 8000
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-2xl"
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <h2 className="text-3xl font-bold text-white text-center">
              Quiz Completed!
            </h2>
          </div>
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <p className="text-2xl mb-4">
                You scored {score} out of {questions.length}
              </p>
              {score >= questions.length * 0.7 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border-l-4 border-green-500 p-4 mb-6"
                >
                  <p className="text-green-700">
                    🎉 Congratulations! You've passed the module quiz!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6"
                >
                  <p className="text-amber-700">
                    Keep learning! Review the content and try again.
                  </p>
                </motion.div>
              )}
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Restart Quiz
                </motion.button>
                {score >= questions.length * 0.7 && (
                  <Link href="/modules/module2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Next Module <ArrowRight className="inline ml-2" />
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/modules/module1">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Module Overview
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Module 1 Quiz
          </h2>
          <p className="text-blue-100">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <CardContent className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <div className="grid gap-4">
              {currentQuizQuestion.options.map((option, index) => {
                const isSelected = userAnswers[currentQuestion] === index;
                const isCorrect = index === currentQuizQuestion.correct;
                const showResult = userAnswers[currentQuestion] !== undefined;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => !showResult && handleAnswer(currentQuestion, index)}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300
                      ${showResult
                        ? isCorrect
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : isSelected
                            ? 'bg-red-100 border-2 border-red-500 text-red-700'
                            : 'bg-gray-100'
                        : 'bg-gray-100 hover:bg-blue-100 hover:shadow-md'}
                    `}
                    disabled={showResult}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="text-green-500 h-5 w-5" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="text-red-500 h-5 w-5" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </AnimatePresence>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-6 p-4 rounded-lg
                ${userAnswers[currentQuestion] === currentQuizQuestion.correct
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                {userAnswers[currentQuestion] === currentQuizQuestion.correct
                  ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                  : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
              </h3>
              <p>{currentQuizQuestion.explanation}</p>
              <p className="text-xs mt-2 text-gray-600">Next question in 8 seconds...</p> {/* Updated message */}
            </motion.div>
          )}

          {showExplanation && currentQuestion === questions.length - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={moveToNextQuestion}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Finish Quiz
            </motion.button>
          )}
        </CardContent>
      </motion.div>
    </div>
  );
};

export default QuizPage;