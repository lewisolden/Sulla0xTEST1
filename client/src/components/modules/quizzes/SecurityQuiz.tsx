import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award } from "lucide-react";

interface SecurityQuizProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "What is the most secure way to store large amounts of cryptocurrency?",
    options: [
      "In an online exchange wallet",
      "Using a hardware wallet",
      "In a mobile wallet app",
      "Writing down private keys on paper"
    ],
    correctAnswer: 1,
    explanation: "Hardware wallets are the most secure option as they store private keys offline, protecting them from online threats and hackers."
  },
  {
    question: "Which of these is NOT a recommended security practice?",
    options: [
      "Using 2FA on all accounts",
      "Storing recovery phrases digitally",
      "Regular wallet backups",
      "Using hardware security keys"
    ],
    correctAnswer: 1,
    explanation: "Storing recovery phrases digitally (on computers or phones) makes them vulnerable to hacking. Always store them physically in secure locations."
  },
  {
    question: "What is a private key used for in cryptocurrency?",
    options: [
      "To share with others for receiving funds",
      "To log into cryptocurrency exchanges",
      "To prove ownership and control funds",
      "To verify other users' transactions"
    ],
    correctAnswer: 2,
    explanation: "Private keys are used to prove ownership of cryptocurrency and authorize transactions. They should never be shared with anyone."
  },
  {
    question: "Which 2FA method is generally considered most secure?",
    options: [
      "SMS verification codes",
      "Email verification codes",
      "Hardware security keys",
      "Recovery questions"
    ],
    correctAnswer: 2,
    explanation: "Hardware security keys provide the strongest security as they can't be intercepted or duplicated like SMS or email codes."
  },
  {
    question: "What is the best practice for protecting against phishing attacks?",
    options: [
      "Only use mobile wallets",
      "Share keys across multiple devices",
      "Click links from trusted emails",
      "Verify website URLs carefully"
    ],
    correctAnswer: 3,
    explanation: "Always verify website URLs carefully before entering any sensitive information, as phishing sites often mimic legitimate cryptocurrency services."
  }
];

const SecurityQuiz: React.FC<SecurityQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
        updateProgress(
          3,
          'security',
          finalScore >= 60,
          1,
          undefined,
          finalScore
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      }
    }, 3000);
  };

  if (showResult) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Card className="p-6 text-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold mb-3 text-gray-100">
            Quiz Complete!
          </h2>
          <div className="text-lg mb-4">
            <p className="font-semibold text-gray-200">Your Score:</p>
            <p className={`text-2xl font-bold ${percentage >= 60 ? 'text-green-400' : 'text-red-400'}`}>
              {percentage}%
            </p>
            <p className="text-gray-400 mt-1 text-sm">
              ({score} out of {quizQuestions.length} correct)
            </p>
          </div>
          {percentage >= 60 ? (
            <div className="bg-green-900/20 border-l-4 border-green-500 p-3 mb-4 text-sm">
              <p className="text-green-400 flex items-center gap-2 justify-center">
                <CheckCircle className="h-4 w-4" />
                Congratulations! You've passed!
              </p>
              <p className="text-sm text-green-400/80 mt-1">Continue to next section in 3 seconds...</p>
            </div>
          ) : (
            <div className="bg-red-900/20 border-l-4 border-red-500 p-3 mb-4 text-sm">
              <p className="text-red-400 flex items-center gap-2 justify-center">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-3 max-w-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center justify-between">
          Question {currentQuestion + 1} of {quizQuestions.length}
          <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
            Score: {score}
          </span>
        </h3>

        <div className="bg-gray-800 rounded-lg p-3 mb-3">
          <p className="text-base text-gray-200">
            {currentQuizQuestion.question}
          </p>
        </div>

        <div className="grid gap-2">
          {currentQuizQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300 text-sm
                ${selectedAnswer === null 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200' 
                  : index === currentQuizQuestion.correctAnswer 
                    ? 'bg-green-900/20 border-2 border-green-500 text-green-400' 
                    : selectedAnswer === index 
                      ? 'bg-red-900/20 border-2 border-red-500 text-red-400' 
                      : 'bg-gray-800 border border-gray-700 text-gray-400'}
                whitespace-normal break-words hover:shadow-md
              `}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
            >
              <span>{option}</span>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg text-sm
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-900/20 border-l-4 border-green-500' 
                : 'bg-red-900/20 border-l-4 border-red-500'}
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === currentQuizQuestion.correctAnswer 
                ? <><CheckCircle className="h-4 w-4 text-green-400" /> Correct!</>
                : <><XCircle className="h-4 w-4 text-red-400" /> Incorrect</>}
            </h3>
            <p className="leading-relaxed text-gray-300">{currentQuizQuestion.explanation}</p>
            <p className="text-xs mt-2 text-gray-400">Next question in 3 seconds...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuiz;