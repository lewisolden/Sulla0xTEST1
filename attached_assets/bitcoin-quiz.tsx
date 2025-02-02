import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const BitcoinQuiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the maximum number of Bitcoins that will ever exist?",
      options: [
        "18 million",
        "21 million",
        "25 million",
        "There is no maximum"
      ],
      correct: 1,
      explanation: "Bitcoin's code limits the total supply to 21 million coins. This scarcity is a fundamental feature of Bitcoin's economic model."
    },
    {
      id: 2,
      question: "Which of these best describes a Bitcoin wallet?",
      options: [
        "A physical device that stores Bitcoin",
        "A software that stores your private keys and manages transactions",
        "An online account where you keep Bitcoin",
        "A bank account for cryptocurrency"
      ],
      correct: 1,
      explanation: "A Bitcoin wallet is software that manages your private keys and helps you interact with the Bitcoin network. It doesn't actually 'store' Bitcoins, as they exist on the blockchain."
    },
    {
      id: 3,
      question: "What happens if you lose your Bitcoin wallet's recovery phrase?",
      options: [
        "Contact Bitcoin support to recover it",
        "Use your email to reset it",
        "Your Bitcoin is permanently lost",
        "Wait 30 days for automatic reset"
      ],
      correct: 2,
      explanation: "If you lose your recovery phrase, there is no way to recover your Bitcoin. There is no central authority or support team that can help - this highlights the importance of securing your recovery phrase."
    },
    {
      id: 4,
      question: "What is the main advantage of a Bitcoin ETF over direct Bitcoin ownership?",
      options: [
        "Higher returns guaranteed",
        "No transaction fees",
        "Investment through traditional brokerage accounts",
        "Faster transactions"
      ],
      correct: 2,
      explanation: "Bitcoin ETFs allow investors to gain Bitcoin exposure through traditional brokerage accounts without needing to manage private keys or deal with cryptocurrency exchanges."
    },
    {
      id: 5,
      question: "Which statement about Bitcoin transactions is correct?",
      options: [
        "They can be reversed by contacting support",
        "They are anonymous and untraceable",
        "They are confirmed by network consensus",
        "They are free of charge"
      ],
      correct: 2,
      explanation: "Bitcoin transactions are confirmed through network consensus (mining). Once confirmed, they cannot be reversed, and while they're public on the blockchain, they're not free (they require mining fees)."
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
        <CardTitle>Bitcoin Module Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {!quizStarted ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Ready to test your Bitcoin knowledge?</h3>
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
                  <p className="text-green-600 mb-4">Perfect score! Excellent understanding of Bitcoin concepts.</p>
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

export default BitcoinQuiz;