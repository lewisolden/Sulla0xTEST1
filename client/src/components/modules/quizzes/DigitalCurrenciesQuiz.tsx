import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

interface DigitalCurrenciesQuizProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "What is the primary characteristic of digital currencies?",
    options: [
      "They must be issued by a central bank",
      "They exist only in electronic form",
      "They require physical storage",
      "They can only be used for online purchases"
    ],
    correctAnswer: 1,
    explanation: "Digital currencies exist purely in electronic form, distinguishing them from traditional physical currencies. This allows for instant transfers and global accessibility."
  },
  {
    question: "Which of these is a key advantage of digital currencies?",
    options: [
      "They require traditional banking infrastructure",
      "They can only be used during banking hours",
      "They enable 24/7 borderless transactions",
      "They are immune to market volatility"
    ],
    correctAnswer: 2,
    explanation: "One of the main advantages of digital currencies is their ability to facilitate transactions 24/7 across borders without traditional banking limitations."
  },
  {
    question: "What is a stablecoin?",
    options: [
      "Any cryptocurrency with low volatility",
      "A digital currency pegged to a stable asset",
      "A government-issued digital currency",
      "A type of physical currency"
    ],
    correctAnswer: 1,
    explanation: "Stablecoins are digital currencies designed to maintain a stable value by pegging them to another stable asset, like the US dollar or gold."
  },
  {
    question: "Which development marked a significant milestone in digital currency evolution?",
    options: [
      "The creation of credit cards",
      "The launch of Bitcoin",
      "The invention of paper money",
      "The first bank transfer"
    ],
    correctAnswer: 1,
    explanation: "The launch of Bitcoin in 2009 marked a revolutionary milestone in digital currency evolution, introducing the first decentralized cryptocurrency."
  },
  {
    question: "What are CBDCs?",
    options: [
      "Centralized Bitcoin Distribution Centers",
      "Crypto Banking Digital Currencies",
      "Central Bank Digital Currencies",
      "Computerized Banking Data Centers"
    ],
    correctAnswer: 2,
    explanation: "CBDCs (Central Bank Digital Currencies) are digital versions of national currencies issued and regulated by central banks."
  }
];

const DigitalCurrenciesQuiz: React.FC<DigitalCurrenciesQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    setTimeout(() => {
      const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
        updateProgress(
          1,
          'digital-currencies',
          finalScore >= 60,
          1,
          undefined,
          finalScore,
          '/modules/module1/digital-currencies',
          undefined,
          'Digital Currencies'
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            onComplete();
          }, 8000);
        }
      }
    }, 8000);
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
      const passThreshold = quizQuestions.length * 0.6;
      updateProgress(1, 'digital-currencies-quiz', score >= passThreshold);
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
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= quizQuestions.length * 0.6 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Digital Currencies quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="mt-4"
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Digital Currencies Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 h-auto whitespace-normal text-left justify-start
                  ${selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    : index === currentQuizQuestion.correctAnswer
                      ? 'bg-green-200 text-gray-700'
                      : selectedAnswer === index
                        ? 'bg-red-200 text-gray-700'
                        : 'bg-gray-100 text-gray-700'}
                `}
                disabled={selectedAnswer !== null}
                variant="ghost"
              >
                {option}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-4 p-3 rounded-lg text-sm
                ${selectedAnswer === currentQuizQuestion.correctAnswer
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                {selectedAnswer === currentQuizQuestion.correctAnswer
                  ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                  : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
              </h3>
              <p className="leading-relaxed">{currentQuizQuestion.explanation}</p>
              <p className="text-xs mt-2 text-gray-600">Next question in 8 seconds...</p>
            </motion.div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-6 w-full"
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
};

export default DigitalCurrenciesQuiz;