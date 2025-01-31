import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the main difference between cryptocurrency and traditional digital banking?",
      options: [
        "Cryptocurrency transactions are faster",
        "Cryptocurrency operates on a decentralized network without central authority",
        "Cryptocurrency is only used online",
        "Cryptocurrency requires a bank account"
      ],
      correct: 1,
      explanation: "While cryptocurrencies offer several advantages, the key distinguishing feature is their decentralized nature, operating without the need for traditional financial intermediaries."
    },
    {
      id: 2,
      question: "What is the purpose of public key cryptography in cryptocurrency systems?",
      options: [
        "To make transactions faster",
        "To reduce transaction fees",
        "To secure and verify transactions without central authority",
        "To connect to the internet"
      ],
      correct: 2,
      explanation: "Public key cryptography enables secure transaction verification and ownership proof without requiring trust in a central authority."
    },
    {
      id: 3,
      question: "Which of the following is a key risk when using cryptocurrency?",
      options: [
        "Network downtime",
        "Private key loss",
        "Slow internet connection",
        "Bank holidays"
      ],
      correct: 1,
      explanation: "Losing your private key means permanent loss of access to your funds, making it one of the most critical risks in cryptocurrency ownership."
    },
    {
      id: 4,
      question: "What is the 'double-spending problem' that cryptocurrency solves?",
      options: [
        "Spending twice as much money as intended",
        "Using the same digital money more than once",
        "Paying double transaction fees",
        "Having two different wallets"
      ],
      correct: 1,
      explanation: "The double-spending problem refers to the risk of using the same digital currency multiple times, which cryptocurrency prevents through blockchain technology."
    },
    {
      id: 5,
      question: "Which storage method is generally recommended for large amounts of cryptocurrency?",
      options: [
        "Mobile wallet",
        "Exchange wallet",
        "Cold storage (hardware wallet)",
        "Web wallet"
      ],
      correct: 2,
      explanation: "Cold storage, particularly hardware wallets, offers the highest security for storing significant amounts of cryptocurrency by keeping private keys offline."
    }
  ];

  const handleAnswer = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const renderQuestion = (question) => {
    const isAnswered = userAnswers[question.id] !== undefined;
    const isCorrect = userAnswers[question.id] === question.correct;

    return (
      <div key={question.id} className="mb-8 p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => !showResults && handleAnswer(question.id, index)}
              className={`p-3 rounded cursor-pointer transition-colors
                ${!showResults ? 'hover:bg-gray-100' : ''}
                ${showResults && index === question.correct ? 'bg-green-100' : ''}
                ${showResults && userAnswers[question.id] === index && index !== question.correct ? 'bg-red-100' : ''}
                ${!showResults && userAnswers[question.id] === index ? 'bg-blue-100' : ''}
                border`}
            >
              {option}
              {showResults && index === question.correct && (
                <CheckCircle className="inline ml-2 text-green-500" size={20} />
              )}
              {showResults && userAnswers[question.id] === index && index !== question.correct && (
                <XCircle className="inline ml-2 text-red-500" size={20} />
              )}
            </div>
          ))}
        </div>
        {showResults && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>Explanation:</strong> {question.explanation}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Module 1: Knowledge Check</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions.map(q => renderQuestion(q))}
          
          {!showResults && Object.keys(userAnswers).length === questions.length && (
            <button
              onClick={() => setShowResults(true)}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Answers
            </button>
          )}
          
          {showResults && (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-bold">
                Your Score: {calculateScore()} out of {questions.length}
              </h3>
              {calculateScore() === questions.length ? (
                <p className="text-green-600 mt-2">Perfect score! Excellent understanding of the material.</p>
              ) : (
                <p className="text-blue-600 mt-2">Review the explanations above for any questions you missed.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;