import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "Which of the following is NOT a key feature of Ethereum as a development platform?",
    options: [
      "Smart contract functionality",
      "Proof of Work consensus",
      "Instant transaction finality",
      "Solidity programming language"
    ],
    correctAnswer: 2,
    explanation: "Ethereum does not provide instant transaction finality. Like many blockchain platforms, it requires multiple block confirmations to ensure transaction security."
  },
  {
    question: "What is the primary purpose of the Hyperledger Fabric platform?",
    options: [
      "Public cryptocurrency trading",
      "Enterprise blockchain solutions",
      "Gaming and NFTs",
      "Personal blockchain development"
    ],
    correctAnswer: 1,
    explanation: "Hyperledger Fabric is designed specifically for enterprise blockchain solutions, offering modular architecture and permissioned network capabilities."
  },
  {
    question: "Which development platform is specifically designed for building decentralized applications (dApps)?",
    options: [
      "MySQL",
      "Apache Kafka",
      "Solana",
      "Redis"
    ],
    correctAnswer: 2,
    explanation: "Solana is a blockchain platform specifically designed for building and deploying decentralized applications (dApps) with high throughput and low fees."
  },
  {
    question: "What is a key advantage of using Polkadot for blockchain development?",
    options: [
      "Cross-chain interoperability",
      "Free transactions",
      "Centralized control",
      "Limited scalability"
    ],
    correctAnswer: 0,
    explanation: "Polkadot's key advantage is its cross-chain interoperability, allowing different blockchains to communicate and transfer assets through its relay chain architecture."
  },
  {
    question: "Which feature is most important for enterprise blockchain development platforms?",
    options: [
      "Anonymous transactions",
      "Mining rewards",
      "Permissioned access control",
      "Public accessibility"
    ],
    correctAnswer: 2,
    explanation: "Permissioned access control is crucial for enterprise blockchain platforms as it allows organizations to control who can participate in the network and maintain security and privacy."
  }
];

const DevelopmentPlatformsQuiz = () => {
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
      updateProgress(3, 'development-platforms-quiz', score >= passThreshold);
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
                🎉 Congratulations! You've passed the Development Platforms quiz!
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
            Development Platforms Quiz
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

export default DevelopmentPlatformsQuiz;
