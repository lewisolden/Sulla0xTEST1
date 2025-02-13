import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "What is the blockchain scalability trilemma?",
    options: [
      "A choice between speed, cost, and security",
      "A balance between decentralization, security, and scalability",
      "A trade-off between privacy, transparency, and efficiency",
      "A conflict between miners, nodes, and users"
    ],
    correctAnswer: 1,
    explanation: "The blockchain scalability trilemma refers to the challenge of achieving decentralization, security, and scalability simultaneously in blockchain systems."
  },
  {
    question: "Which of the following is a Layer 2 scaling solution?",
    options: [
      "Increasing block size",
      "Reducing block time",
      "Lightning Network",
      "Proof of Stake"
    ],
    correctAnswer: 2,
    explanation: "The Lightning Network is a Layer 2 scaling solution that operates on top of blockchain, enabling faster and cheaper transactions through payment channels."
  },
  {
    question: "What is blockchain interoperability?",
    options: [
      "The ability to modify blockchain code",
      "The capability of different blockchains to communicate and share data",
      "The process of mining across multiple chains",
      "The speed of transaction confirmation"
    ],
    correctAnswer: 1,
    explanation: "Blockchain interoperability refers to the ability of different blockchain networks to communicate, share, and access information across chains."
  },
  {
    question: "Which is NOT a common approach to blockchain scalability?",
    options: [
      "Sharding",
      "Sidechains",
      "Increasing mining difficulty",
      "State channels"
    ],
    correctAnswer: 2,
    explanation: "Increasing mining difficulty is related to network security and mining regulation, not scalability. The other options are genuine scalability solutions."
  },
  {
    question: "What is the primary goal of cross-chain bridges?",
    options: [
      "To increase mining rewards",
      "To enable asset transfer between different blockchains",
      "To improve transaction speed",
      "To reduce energy consumption"
    ],
    correctAnswer: 1,
    explanation: "Cross-chain bridges primarily aim to enable the transfer of assets and data between different blockchain networks, improving interoperability."
  }
];

const ScalabilityQuiz = () => {
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
      const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
      updateProgress(3, 'scalability-interoperability-quiz', finalScore >= 60, 1, undefined, finalScore);
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
                🎉 Congratulations! You've passed the Scalability and Interoperability quiz!
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
            Scalability and Interoperability Quiz
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

export default ScalabilityQuiz;