import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const Module1Quiz = () => {
  const { toast } = useToast();
  const handleQuizCompletion = async (score, totalQuestions) => {
    try {
      const quizData = {
        moduleId: 1,
        courseId: 1,
        sectionId: 'module-1-quiz',
        completed: true,
        quizScore: Math.round((score / totalQuestions) * 100),
        timeSpent: 0
      };

      console.log('Submitting quiz completion:', quizData);

      const response = await fetch('/api/learning-path/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Quiz submission failed",
          description: errorData.error || 'Failed to update progress',
          variant: "destructive",
        });
        throw new Error(errorData.error || 'Failed to update progress');
      }

      const result = await response.json();
      console.log('Quiz progress updated:', result);

      const metricsResponse = await fetch('/api/user/metrics', {
        credentials: 'include',
      });

      if (!metricsResponse.ok) {
        console.error('Failed to refresh metrics');
      }

      toast({
        title: "Quiz completed!",
        description: "Your progress has been saved.",
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit quiz",
        variant: "destructive",
      });
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Add auto-advance functionality
  useEffect(() => {
    let timer;
    if (showExplanation && currentQuestion < quizQuestions.length - 1) {
      timer = setTimeout(() => {
        moveToNextQuestion();
      }, 5000); // 5 seconds delay before advancing
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestion]);

  const quizQuestions = [
    {
      question: "What is the fundamental innovation of digital currencies?",
      options: [
        "Creating digital art",
        "Decentralization and peer-to-peer transactions",
        "Replacing physical money completely",
        "Reducing bank fees"
      ],
      correctAnswer: 1,
      explanation: "Digital currencies introduce decentralization, allowing peer-to-peer transactions without intermediaries like banks."
    },
    {
      question: "What problem did Bitcoin specifically aim to solve?",
      options: [
        "Slow internet speeds",
        "Global communication challenges",
        "The double-spending problem in digital transactions",
        "Reducing carbon emissions"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin was designed to solve the double-spending problem, ensuring that a digital token cannot be spent more than once without a central authority."
    },
    {
      question: "What makes cryptocurrencies different from traditional fiat currencies?",
      options: [
        "They are printed on special paper",
        "They are controlled by a central bank",
        "They use blockchain technology and are decentralized",
        "They can only be used online"
      ],
      correctAnswer: 2,
      explanation: "Cryptocurrencies are unique because they use decentralized blockchain technology, operating without a central controlling authority."
    },
    {
      question: "What is a key characteristic of blockchain technology?",
      options: [
        "It's completely anonymous",
        "It can be easily modified",
        "It provides transparency and is immutable",
        "It requires no computational power"
      ],
      correctAnswer: 2,
      explanation: "Blockchain technology ensures transparency and immutability, meaning once data is recorded, it cannot be easily changed."
    },
    {
      question: "What is the primary purpose of a stablecoin?",
      options: [
        "To make quick profits",
        "To minimize price volatility",
        "To replace traditional banking",
        "To create digital art"
      ],
      correctAnswer: 1,
      explanation: "Stablecoins are designed to minimize price volatility by pegging their value to a stable asset like a fiat currency."
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    // Show immediate feedback toast
    const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
    toast({
      title: isCorrect ? "Correct! 🎉" : "Incorrect",
      description: quizQuestions[currentQuestion].explanation,
      variant: isCorrect ? "default" : "destructive",
    });
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
      const finalScore = score + (isCorrect ? 1 : 0);
      handleQuizCompletion(finalScore, quizQuestions.length);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-2xl"
      >
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-100 border-l-4 border-green-500 p-4 mb-4"
            >
              <p className="text-green-700">
                🎉 Congratulations! You've passed the module quiz!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-100 border-l-4 border-red-500 p-4 mb-4"
            >
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Restart Quiz
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Module 1 Quiz
          </h2>
          <p className="text-blue-100">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {currentQuizQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuizQuestion.correctAnswer;
              const showResult = selectedAnswer !== null;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !selectedAnswer && handleAnswerSelect(index)}
                  className={`
                    w-full p-4 rounded-lg text-left transition-all duration-300
                    ${showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : isSelected
                          ? 'bg-red-100 border-red-500 text-red-700'
                          : 'bg-gray-100'
                      : 'bg-gray-100 hover:bg-blue-100'}
                  `}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-6 p-4 rounded-lg
                ${selectedAnswer === currentQuizQuestion.correctAnswer
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuizQuestion.correctAnswer
                  ? '✅ Correct!'
                  : '❌ Incorrect'}
              </h3>
              <p>{currentQuizQuestion.explanation}</p>
            </motion.div>
          )}

          {selectedAnswer !== null && currentQuestion === quizQuestions.length - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={moveToNextQuestion}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Finish Quiz
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Module1Quiz;