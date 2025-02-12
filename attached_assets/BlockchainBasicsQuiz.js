import React, { useState } from 'react';
import { useProgress } from "@/context/progress-context";

const BlockchainBasicsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions = [
    {
      question: "What is a key characteristic that makes blockchain different from traditional databases?",
      options: [
        "Faster processing speed",
        "Lower storage costs",
        "Decentralized control",
        "Unlimited storage capacity"
      ],
      correctAnswer: 2,
      explanation: "Unlike traditional centralized databases, blockchain operates on a decentralized network where no single entity has control, making it more resistant to manipulation and censorship."
    },
    {
      question: "How are blocks connected in a blockchain?",
      options: [
        "Through random numbers",
        "Through timestamps only",
        "Through cryptographic hashes",
        "Through user IDs"
      ],
      correctAnswer: 2,
      explanation: "Each block contains a cryptographic hash of the previous block, creating an unbreakable chain that ensures the integrity and chronological order of the blockchain."
    },
    {
      question: "What makes blockchain records immutable?",
      options: [
        "Regular backups",
        "Government regulations",
        "Cryptographic linking and distributed consensus",
        "Password protection"
      ],
      correctAnswer: 2,
      explanation: "Blockchain achieves immutability through a combination of cryptographic linking between blocks and distributed consensus mechanisms, making it extremely difficult to alter historical records."
    },
    {
      question: "What is the primary role of nodes in a blockchain network?",
      options: [
        "To provide internet connectivity",
        "To store and validate transactions",
        "To create new cryptocurrencies",
        "To manage user accounts"
      ],
      correctAnswer: 1,
      explanation: "Nodes in a blockchain network maintain copies of the ledger and validate transactions, ensuring the network's integrity and decentralization."
    },
    {
      question: "Which of these is NOT a key characteristic of blockchain technology?",
      options: [
        "Transparency",
        "Centralized control",
        "Immutability",
        "Distributed ledger"
      ],
      correctAnswer: 1,
      explanation: "Centralized control is the opposite of blockchain's fundamental characteristic of decentralization. Blockchain operates through distributed consensus rather than central authority."
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
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
      const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
      updateProgress(2, 'blockchain-basics-quiz', finalScore >= 60, finalScore);
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
                🎉 Congratulations! You've passed the Blockchain Basics quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <button 
            onClick={restartQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Restart Quiz
          </button>
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
            Blockchain Basics Quiz
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
            </div>
          )}

          {selectedAnswer !== null && (
            <button
              onClick={moveToNextQuestion}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainBasicsQuiz;