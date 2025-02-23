import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  onAnswer: (selectedIndex: number) => void;
  showExplanation: boolean;
}

const quiz = {
  questions: [
    {
      id: 0,
      question: "What is the maximum number of Bitcoins that will ever exist?",
      options: ["18 million", "21 million", "25 million", "There is no maximum"],
      correctAnswer: 1,
      explanation: "Bitcoin's code limits the total supply to 21 million coins. This scarcity is a fundamental feature of Bitcoin's economic model."
    },
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
  ]
};

const QuizResults = ({ score, totalQuestions }) => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-purple-800">
        Quiz Complete!
      </h2>
      <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {Math.round((score / totalQuestions) * 100)}%
          </div>
          <p className="text-gray-600">
            You got {score} out of {totalQuestions} questions correct
          </p>
        </div>
        {score >= Math.ceil(0.7 * totalQuestions) ? (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-green-800">
              Congratulations! You've passed the quiz and completed Module 2!
              {!user && (
                <span className="block mt-2 text-sm">
                  Sign in to track your progress and earn certificates!
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-orange-800">
              Keep studying and try again. You need 70% to pass.
            </p>
          </div>
        )}
        <Link href="/modules/module3">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Continue to Module 3
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const QuizQuestion: React.FC<QuestionProps> = ({ question, onAnswer, showExplanation }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (idx: number) => {
    const correct = idx === question.correctAnswer;
    setIsCorrect(correct);
    setShowNotification(true);
    onAnswer(idx);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              variant="outline"
              className={`w-full justify-start text-left p-4 ${
                showExplanation && idx === question.correctAnswer
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : ''
              }`}
              onClick={() => !showExplanation && handleOptionClick(idx)}
              disabled={showExplanation}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`${
              isCorrect ? 'bg-green-500' : 'bg-red-500'
            } text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 mt-4`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Correct!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5" />
                <span className="font-medium">Incorrect</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-800"
          >
            <p>
              <span className="font-semibold">Explanation: </span>
              {question.explanation}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Next question in 8 seconds...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InteractiveQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { updateProgress } = useProgress();
  const { user } = useAuth();

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selected: selectedIndex,
        correct: isCorrect
      }
    }));

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        const correctAnswers = Object.values(answers).filter(a => a.correct).length + (isCorrect ? 1 : 0);
        const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);

        if (user) {
          try {
            updateProgress(2, "quiz", true, 2, new Date().toISOString(), finalScore, quiz.questions.length);
          } catch (error) {
            console.error("Failed to update progress:", error);
          }
        }

        setShowResults(true);
      }
    }, 8000); // Changed to 8 seconds
  };

  const correctAnswers = Object.values(answers).filter(a => a.correct).length;

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-800">
              Module 2 Quiz: Blockchain Fundamentals
            </h2>
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>

          <Progress value={(currentQuestionIndex / quiz.questions.length) * 100} className="mb-6" />

          <AnimatePresence mode="wait">
            <QuizQuestion
              key={currentQuestionIndex}
              question={quiz.questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              showExplanation={showExplanation}
            />
          </AnimatePresence>
        </>
      ) : (
        <QuizResults
          score={correctAnswers}
          totalQuestions={quiz.questions.length}
        />
      )}
    </div>
  );
};

const Module2Quiz = () => {
  useScrollTop();
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-bold">Module 2 Final Quiz</CardTitle>
            <p className="text-gray-100 mt-2">
              Test your understanding of blockchain fundamentals and Bitcoin concepts
            </p>
          </CardHeader>
          <CardContent>
            {!quizStarted ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Ready to test your knowledge?</h3>
                <p className="text-gray-600 mb-6">
                  This quiz will test your understanding of key concepts covered in Module 2.
                  You need to score at least 70% to pass.
                </p>
                <Button
                  onClick={() => setQuizStarted(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <InteractiveQuiz />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Module2Quiz;