import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "What is the main characteristic of a public blockchain?",
    options: [
      "Only approved users can participate",
      "Anyone can participate without permission",
      "Only governments can access it",
      "It requires payment to join"
    ],
    correctAnswer: 1,
    explanation: "Public blockchains are permissionless, meaning anyone can participate in the network without requiring approval from any central authority."
  },
  {
    question: "Which type of blockchain is most suitable for business applications requiring controlled access?",
    options: [
      "Public blockchain",
      "Private blockchain",
      "Hybrid blockchain",
      "Open blockchain"
    ],
    correctAnswer: 1,
    explanation: "Private blockchains are ideal for business applications as they offer controlled access, better privacy, and higher transaction throughput."
  },
  {
    question: "What is a consortium blockchain?",
    options: [
      "A blockchain run by a single organization",
      "A public blockchain with restricted access",
      "A blockchain operated by a group of organizations",
      "A blockchain without consensus mechanisms"
    ],
    correctAnswer: 2,
    explanation: "A consortium blockchain is operated by a group of organizations that work together, combining the benefits of private and public blockchains."
  },
  {
    question: "Which statement about private blockchains is FALSE?",
    options: [
      "They offer faster transaction processing",
      "They are completely anonymous",
      "They have controlled access",
      "They are more energy-efficient"
    ],
    correctAnswer: 1,
    explanation: "Private blockchains are not completely anonymous. While they offer privacy, transactions can be traced by the controlling organization."
  },
  {
    question: "What advantage do consortium blockchains have over private blockchains?",
    options: [
      "Better decentralization while maintaining privacy",
      "Complete anonymity",
      "Unlimited scalability",
      "Zero transaction costs"
    ],
    correctAnswer: 0,
    explanation: "Consortium blockchains offer better decentralization than private blockchains while still maintaining privacy, as control is distributed among multiple organizations."
  }
];

const BlockchainTypesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
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
      updateProgress(3, 'blockchain-types-quiz', score >= passThreshold);
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
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Blockchain Types quiz!
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
        </Card>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Blockchain Types Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-6 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === currentQuizQuestion.correctAnswer 
                      ? 'bg-green-200' 
                      : selectedAnswer === index 
                        ? 'bg-red-200' 
                        : 'bg-gray-100'}
                  whitespace-normal break-words
                `}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-8 p-6 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-3 text-lg">
                {selectedAnswer === currentQuizQuestion.correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p className="text-lg leading-relaxed">{currentQuizQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-8 w-full bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BlockchainTypesQuiz;
