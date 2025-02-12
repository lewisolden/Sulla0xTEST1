import React, { useState } from 'react';
import { useProgress } from "@/context/progress-context";

const DistributedLedgerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions = [
    {
      question: "What is the main difference between public and private distributed ledgers?",
      options: [
        "Public ledgers are faster",
        "Private ledgers are cheaper",
        "Public ledgers allow anyone to participate",
        "Private ledgers have better security"
      ],
      correctAnswer: 2,
      explanation: "The key distinction is accessibility: public ledgers are open for anyone to participate, while private ledgers restrict access to authorized participants only."
    },
    {
      question: "What is a consortium distributed ledger?",
      options: [
        "A ledger controlled by one organization",
        "A ledger controlled by a group of organizations",
        "A completely open ledger",
        "A ledger without consensus mechanisms"
      ],
      correctAnswer: 1,
      explanation: "A consortium distributed ledger is operated by a group of organizations, balancing decentralization with some level of central control through collaborative governance."
    },
    {
      question: "Which of these is NOT a key characteristic of DLT?",
      options: [
        "Decentralization",
        "Transparency",
        "Central authority control",
        "Consensus-based validation"
      ],
      correctAnswer: 2,
      explanation: "Central authority control contradicts the fundamental nature of DLT, which is built on decentralization and distributed consensus rather than centralized control."
    },
    {
      question: "What is the primary advantage of distributed storage in DLT?",
      options: [
        "Lower costs",
        "Faster processing",
        "Improved data availability and redundancy",
        "Simpler maintenance"
      ],
      correctAnswer: 2,
      explanation: "Distributed storage improves data availability and redundancy by replicating data across multiple nodes, making the system more resilient to failures."
    },
    {
      question: "Which industry application of DLT focuses on tracking products from manufacture to delivery?",
      options: [
        "Healthcare records",
        "Supply chain management",
        "Digital voting",
        "Real estate"
      ],
      correctAnswer: 1,
      explanation: "Supply chain management uses DLT to track goods throughout their journey from manufacture to sale, enhancing transparency and reducing fraud in the supply chain."
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
      updateProgress(2, 'distributed-ledger-quiz', finalScore >= 60, finalScore);
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
                🎉 Congratulations! You've passed the Distributed Ledger Technology quiz!
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
            Distributed Ledger Technology Quiz
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

export default DistributedLedgerQuiz;