import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function BitcoinQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const quizQuestions = [
    {
      question: "When was the first Bitcoin block (genesis block) mined?",
      options: [
        "December 25, 2008",
        "January 3, 2009",
        "March 15, 2010",
        "October 31, 2008"
      ],
      correctAnswer: 1,
      explanation: "The genesis block of Bitcoin was mined on January 3, 2009, marking the official beginning of the Bitcoin blockchain."
    },
    {
      question: "What is the maximum number of bitcoins that will ever exist?",
      options: [
        "100 million",
        "1 billion",
        "21 million",
        "Unlimited"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin has a fixed supply cap of 21 million coins, which is one of its key features as a deflationary currency."
    },
    {
      question: "What was the first real-world transaction using Bitcoin?",
      options: [
        "Buying a car",
        "Purchasing two pizzas",
        "Paying rent",
        "Buying a computer"
      ],
      correctAnswer: 1,
      explanation: "The first real-world Bitcoin transaction was the purchase of two pizzas for 10,000 BTC in May 2010, now celebrated as 'Bitcoin Pizza Day'."
    },
    {
      question: "Which consensus mechanism does Bitcoin use?",
      options: [
        "Proof of Stake",
        "Proof of Authority",
        "Proof of Work",
        "Delegated Proof of Stake"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin uses Proof of Work (PoW) as its consensus mechanism, where miners compete to solve complex mathematical problems to add new blocks."
    },
    {
      question: "What is the main innovation that Bitcoin introduced?",
      options: [
        "Online banking",
        "Digital payments",
        "Social networking",
        "Decentralized digital currency without intermediaries"
      ],
      correctAnswer: 3,
      explanation: "Bitcoin's main innovation was creating a decentralized digital currency that could operate without intermediaries like banks or governments."
    }
  ];

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
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">
              Quiz Completed!
            </h2>
            <p className="text-xl mb-4">
              You scored {score} out of {quizQuestions.length}
            </p>
            {score >= quizQuestions.length * 0.6 ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've passed the Bitcoin quiz!
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
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Bitcoin Quiz
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
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`
                    w-full p-4 h-auto whitespace-normal text-left justify-start
                    ${selectedAnswer === null 
                      ? 'bg-gray-100 hover:bg-blue-100 text-gray-700' 
                      : index === currentQuizQuestion.correctAnswer 
                        ? 'bg-green-200 text-gray-700' 
                        : selectedAnswer === index 
                          ? 'bg-red-200 text-gray-700' 
                          : 'bg-gray-100 text-gray-700'}
                  `}
                  disabled={selectedAnswer !== null}
                  variant="ghost"
                >
                  {option}
                </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}
