import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "What is the main difference between altcoins and tokens?",
    options: [
      "Altcoins are newer than tokens",
      "Altcoins have their own blockchain while tokens operate on existing blockchains",
      "Tokens are more valuable than altcoins",
      "Altcoins can only be mined, while tokens can't"
    ],
    correctAnswer: 1,
    explanation: "Altcoins operate on their own independent blockchain, while tokens are built on top of existing blockchain platforms like Ethereum."
  },
  {
    question: "Which of these is a common type of token?",
    options: [
      "Security tokens",
      "Utility tokens",
      "Non-fungible tokens (NFTs)",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Security tokens, utility tokens, and NFTs are all common types of tokens, each serving different purposes in the cryptocurrency ecosystem."
  },
  {
    question: "What is a utility token primarily used for?",
    options: [
      "Representing ownership in a company",
      "Accessing specific services or products on a platform",
      "Storing value like a stablecoin",
      "Creating digital art"
    ],
    correctAnswer: 1,
    explanation: "Utility tokens are primarily used to access specific services, features, or products within a blockchain platform or application."
  },
  {
    question: "Which statement about altcoins is true?",
    options: [
      "All altcoins are forks of Bitcoin",
      "Altcoins can never implement new features",
      "They can introduce innovative features not found in Bitcoin",
      "Altcoins are always more valuable than Bitcoin"
    ],
    correctAnswer: 2,
    explanation: "Altcoins can introduce innovative features and improvements not found in Bitcoin, such as smart contracts, different consensus mechanisms, or enhanced privacy features."
  },
  {
    question: "What is a key characteristic of security tokens?",
    options: [
      "They represent physical assets or financial instruments",
      "They can only be used for gaming",
      "They have no real-world value",
      "They cannot be regulated"
    ],
    correctAnswer: 0,
    explanation: "Security tokens represent ownership in real-world assets like stocks, bonds, or real estate, and are subject to securities regulations."
  }
];

export default function AltcoinsTokensQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    // Wait 5 seconds before moving to next question
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
        const passThreshold = quizQuestions.length * 0.6;
        updateProgress(1, 'altcoins-tokens-quiz', score >= passThreshold);
      }
    }, 5000);
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
      updateProgress(1, 'altcoins-tokens-quiz', score >= passThreshold);
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
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Altcoins and Tokens quiz!
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
            className="bg-blue-500 hover:bg-blue-600"
          >
            Restart Quiz
          </Button>
        </div>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Altcoins and Tokens Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === currentQuizQuestion.correctAnswer 
                      ? 'bg-green-200' 
                      : selectedAnswer === index 
                        ? 'bg-red-200' 
                        : 'bg-gray-100'}
                `}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-6 p-4 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuizQuestion.correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p>{currentQuizQuestion.explanation}</p>
              <p className="text-sm text-gray-600 mt-2">Next question in 5 seconds...</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}