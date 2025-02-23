import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Progress } from "@/components/ui/progress";

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

const QuizQuestion: React.FC<QuestionProps> = ({ question, onAnswer, showExplanation }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (idx: number) => {
    const correct = idx === question.correctAnswer;
    setIsCorrect(correct);
    setShowNotification(true);
    onAnswer(idx);

    // Hide notification after 2 seconds
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

      {/* Answer Notification */}
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
            className={`mt-4 p-4 rounded-lg ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p>
              <span className="font-semibold">Explanation: </span>
              {question.explanation}
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
  const { updateProgress } = useProgress();

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedIndex
    }));

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        // Calculate final score
        const correctAnswers = Object.entries(answers).filter(
          ([questionId, answer]) => {
            const question = quiz.questions.find(q => q.id === parseInt(questionId));
            return question && answer === question.correctAnswer;
          }
        ).length;
        const finalScore = (correctAnswers / quiz.questions.length) * 100;

        if (finalScore >= 70) {
          updateProgress("module2", "quiz", true, "completed", new Date().toISOString(), finalScore, quiz.questions.length);
        }
      }
    }, 3000);
  };

  return (
    <div className="space-y-6">
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