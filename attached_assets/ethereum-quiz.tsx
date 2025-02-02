import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const EthereumQuiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the main feature that distinguishes Ethereum from Bitcoin?",
      options: [
        "Faster transaction speeds",
        "Lower transaction fees",
        "Smart contract functionality",
        "Higher total supply"
      ],
      correct: 2,
      explanation: "While Ethereum has several differences from Bitcoin, its key distinguishing feature is smart contract functionality, allowing for programmable, self-executing contracts and decentralized applications (dApps)."
    },
    {
      id: 2,
      question: "What is 'gas' in the Ethereum network?",
      options: [
        "A type of cryptocurrency",
        "A measure of computational effort required for transactions",
        "A network security feature",
        "A type of smart contract"
      ],
      correct: 1,
      explanation: "Gas is a measure of computational effort required to execute operations on the Ethereum network. It helps prevent spam and allocate resources efficiently."
    },
    {
      id: 3,
      question: "What is a smart contract?",
      options: [
        "A legal document stored on the blockchain",
        "A self-executing program stored on the blockchain",
        "A type of cryptocurrency wallet",
        "A payment processing system"
      ],
      correct: 1,
      explanation: "Smart contracts are self-executing programs stored on the blockchain that automatically execute when predetermined conditions are met, enabling trustless agreements and automation."
    },
    {
      id: 4,
      question: "What is DeFi (Decentralized Finance)?",
      options: [
        "A new type of bank",
        "A cryptocurrency exchange",
        "Financial services built on blockchain technology",
        "A payment processing system"
      ],
      correct: 2,
      explanation: "DeFi refers to financial services and products built on blockchain technology, particularly Ethereum, that operate without traditional financial intermediaries."
    },
    {
      id: 5,
      question: "Which of these is a primary risk when using smart contracts?",
      options: [
        "Network downtime",
        "Code vulnerabilities",
        "High transaction fees",
        "Slow confirmation times"
      ],
      correct: 1,
      explanation: "Code vulnerabilities in smart contracts are a primary risk as they are immutable once deployed, and any bugs or security flaws could lead to loss of funds or other issues."
    }
  ];

  const handleAnswer = (questionId, selectedOption) => {
    if (!showResults) {
      setUserAnswers({
        ...userAnswers,
        [questionId]: selectedOption
      });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const renderQuestion = (question) => {
    const isAnswered = userAnswers[question.id] !== undefined;
    const isCorrect = userAnswers[question.id] === question.correct;

    return (
      <div key={question.id} className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{question.id}. {question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`p-3 rounded cursor-pointer transition-colors
                ${!showResults && !isAnswered ? 'hover:bg-gray-100' : ''}
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
          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <strong>Explanation:</strong> {question.explanation}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Ethereum Module Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {!quizStarted ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Ready to test your Ethereum knowledge?</h3>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map(q => renderQuestion(q))}
            
            {!showResults && Object.keys(userAnswers).length === questions.length && (
              <Button
                onClick={() => setShowResults(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Submit Answers
              </Button>
            )}
            
            {showResults && (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">
                  Your Score: {calculateScore()} out of {questions.length}
                </h3>
                {calculateScore() === questions.length ? (
                  <p className="text-green-600 mb-4">Perfect score! Excellent understanding of Ethereum concepts.</p>
                ) : (
                  <p className="text-blue-600 mb-4">Review the explanations above for any questions you missed.</p>
                )}
                <Button 
                  onClick={resetQuiz}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EthereumQuiz;