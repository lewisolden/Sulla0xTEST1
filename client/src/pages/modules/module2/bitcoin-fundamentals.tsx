import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import BitcoinBasicsDiagram from "@/components/diagrams/BitcoinBasicsDiagram";
import ProofOfWorkDiagram from "@/components/diagrams/ProofOfWorkDiagram";
import { UTXOExercise } from "@/components/exercises/UTXOExercise";

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
    </motion.div>
  );
};

const QuizResults = ({ score, totalQuestions }: { score: number; totalQuestions: number }) => (
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
    </div>
  </motion.div>
);

interface BitcoinFundamentalsQuizProps {
  onComplete: () => void;
}

const BitcoinFundamentalsQuiz: React.FC<BitcoinFundamentalsQuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [showResults, setShowResults] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What is Bitcoin?",
      correctAnswer: 0,
      options: ["A cryptocurrency", "A stock", "A bond"],
      explanation: "Bitcoin is a decentralized digital currency."
    },
    {
      id: 2,
      question: "Who invented Bitcoin?",
      correctAnswer: 2,
      options: ["Vitalik Buterin", "Charlie Lee", "Satoshi Nakamoto"],
      explanation: "Satoshi Nakamoto is the pseudonymous creator of Bitcoin."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
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
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, 8000); // Changed to 8 seconds
  };

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            showExplanation={showExplanation}
          />
          {showExplanation && (
            <div className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-800">
              <p>
                <span className="font-semibold">Explanation: </span>
                {quizQuestions[currentQuestionIndex].explanation}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Next question in 8 seconds...
              </p>
            </div>
          )}
        </>
      ) : (
        <QuizResults
          score={Object.values(answers).filter(a => a.correct).length}
          totalQuestions={quizQuestions.length}
        />
      )}
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const FeatureCard = ({ title, description, icon: Icon, gradient }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl shadow-lg ${gradient} text-white`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-white/90 pl-2 border-l-2 border-white/20">{description}</p>
  </motion.div>
);

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

export default function BitcoinFundamentalsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'bitcoin-fundamentals', true, 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-orange-500 to-red-600" />
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link href="/modules/module2">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-xl p-8 mb-12 shadow-lg">
            <div className="flex items-center">
              <BitcoinLogo />
              <div>
                <motion.h1
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  2.1 Bitcoin Fundamentals
                </motion.h1>
                <p className="text-xl text-orange-100">
                  Understanding the World's First Cryptocurrency
                </p>
              </div>
            </div>
          </div>

          <div className="prose lg:prose-xl text-gray-700 space-y-12">
            {/* Content remains here */}
            {isFullyRead && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <BitcoinFundamentalsQuiz onComplete={() => updateProgress(2, 'bitcoin-fundamentals', true, 2)}/> {/* Added onComplete prop */}
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-8">
                  <Link href="/modules/module2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                    </Button>
                  </Link>

                  <Link href="/modules/module2/bitcoin-investment">
                    <Button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                      Next: Bitcoin as an Investment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};