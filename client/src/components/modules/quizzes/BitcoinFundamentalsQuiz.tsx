import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link, useLocation } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award, PencilLine } from "lucide-react";

const questions = [
  {
    question: "Which risk level is associated with Bitcoin ETFs and regulated investment products?",
    options: [
      "High Risk",
      "Medium Risk", 
      "Low Risk",
      "No Risk"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin ETFs and regulated investment products are considered Low Risk investment options because they offer exposure to Bitcoin through traditional, regulated financial instruments with institutional oversight."
  },
  {
    question: "Which of the following is a key store of value property of Bitcoin?",
    options: [
      "Unlimited supply",
      "Central bank control",
      "Fixed supply of 21 million coins",
      "Variable issuance schedule"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin's fixed supply of 21 million coins is a crucial store of value property, making it scarce and resistant to inflation, similar to precious metals like gold."
  },
  {
    question: "How does Metcalfe's Law apply to Bitcoin's network value?",
    options: [
      "The value decreases with more users",
      "The value is proportional to the square of connected users",
      "The value remains constant regardless of users",
      "The value is determined by mining difficulty"
    ],
    correctAnswer: 1,
    explanation: "According to Metcalfe's Law, the value of a network is proportional to the square of the number of connected users. This principle explains Bitcoin's increasing utility and value as more users join the network."
  },
  {
    question: "Which of the following is NOT a recommended risk mitigation strategy for Bitcoin investment?",
    options: [
      "Using reputable exchanges and wallets",
      "Keeping large amounts on exchanges",
      "Only investing what you can afford to lose",
      "Implementing robust security measures"
    ],
    correctAnswer: 1,
    explanation: "Keeping large amounts of Bitcoin on exchanges is NOT recommended as it increases security risks. Instead, users should use secure personal wallets for significant holdings and only keep necessary amounts on exchanges for trading."
  },
  {
    question: "What distinguishes Bitcoin from traditional investment vehicles like real estate?",
    options: [
      "Bitcoin requires no down payment",
      "Bitcoin is completely risk-free",
      "Bitcoin is purely digital and globally transferable",
      "Bitcoin is backed by physical assets"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin's unique characteristic is its digital nature and global transferability, unlike traditional investments like real estate which are physical, location-dependent, and require significant down payments and paperwork."
  }
];

export default function BitcoinFundamentalsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();

  const handleAnswer = (answerIndex: number) => {
    // Prevent answering if already selected
    if (selectedAnswer !== null) return;

    // Record the answer
    setSelectedAnswer(answerIndex);

    // Auto advance after 5 seconds
    setTimeout(() => {
      // Check if correct and update score
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      // Move to next question or show results
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;

        // Update progress
        updateProgress(
          2,
          'bitcoin-fundamentals',
          finalScore >= 60,
          2,
          undefined,
          finalScore,
          '/modules/module2/bitcoin-fundamentals',
          undefined,
          'Bitcoin Fundamentals'
        );
      }
    }, 8000); 
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="container mx-auto px-6 py-4 max-w-6xl">
        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex items-center justify-center gap-4">
            <Award className={`h-10 w-10 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
            <div>
              <h2 className="text-xl font-bold text-orange-800">Quiz Complete!</h2>
              <div className="text-lg">
                <span className="font-semibold">Your Score: </span>
                <span className={`font-bold ${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                  {percentage.toFixed(0)}%
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  ({score} out of {questions.length} correct)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {percentage >= 60 ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-3 text-sm">
                <p className="text-green-700 flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4" />
                  Congratulations! You've passed!
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Moving to Bitcoin Investment in 8 seconds...
                </p>
              </div>
            ) : (
              <div className="bg-red-100 border-l-4 border-red-500 p-3 text-sm">
                <p className="text-red-700 flex items-center gap-2 justify-center">
                  <XCircle className="h-4 w-4" />
                  Keep learning and try again
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={restartQuiz}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm"
            >
              Retry Quiz
            </Button>
            {percentage >= 60 && (
              <Link href="/modules/module2/bitcoin-investment" className="flex-1">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm">
                  Continue to Bitcoin Investment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-4 max-w-6xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-lg mb-4 text-white flex items-center gap-4">
        <PencilLine className="h-6 w-6" />
        <div>
          <h2 className="text-xl font-bold">Test Your Knowledge</h2>
          <p className="text-white/90 text-sm">Complete the quiz to test your understanding of Module 2</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-orange-600">Question {currentQuestion + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{questions.length}</span>
          </div>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
            Score: {score}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-700 text-lg mb-4">
              {questions[currentQuestion].question}
            </p>
          </div>

          <div className="grid gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`
                  w-full p-2.5 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null
                    ? 'bg-white hover:bg-orange-50 border border-gray-200'
                    : index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-2 border-green-500'
                      : selectedAnswer === index
                        ? 'bg-red-100 border-2 border-red-500'
                        : 'bg-white border border-gray-200'}
                  whitespace-normal break-words hover:shadow-md
                `}
                disabled={selectedAnswer !== null}
                whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
                whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
              >
                <span className="text-base">{option}</span>
              </motion.button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-3 p-2 rounded-lg text-sm
                ${selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                  : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
              </h3>
              <p className="text-sm leading-snug text-gray-700">{questions[currentQuestion].explanation}</p>
              <p className="text-xs mt-1 text-gray-500">
                Next question in 8 seconds...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}