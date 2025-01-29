import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const quizQuestions = [
  {
    question: "Who created Bitcoin?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Charlie Lee",
      "Mark Zuckerberg"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin was created by the pseudonymous person or group known as Satoshi Nakamoto in 2008."
  },
  {
    question: "What problem did Bitcoin solve?",
    options: [
      "The double-spending problem",
      "The internet speed problem",
      "The email spam problem",
      "The social media problem"
    ],
    correctAnswer: 0,
    explanation: "Bitcoin solved the double-spending problem in digital currency through its blockchain technology and consensus mechanism."
  },
  {
    question: "What is the maximum supply of Bitcoin?",
    options: [
      "1 million",
      "10 million",
      "21 million",
      "Unlimited"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin has a fixed maximum supply of 21 million coins, which helps ensure its scarcity and value proposition."
  },
  {
    question: "What is Bitcoin mining?",
    options: [
      "Digging for digital gold",
      "Creating new transactions",
      "Process of validating transactions and creating new blocks",
      "Buying Bitcoin on exchanges"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin mining is the process of validating transactions and adding them to the blockchain while also creating new bitcoins as a reward."
  },
  {
    question: "What technology underlies Bitcoin?",
    options: [
      "Cloud computing",
      "Artificial intelligence",
      "Blockchain",
      "Virtual reality"
    ],
    correctAnswer: 2,
    explanation: "Blockchain technology is the fundamental innovation that enables Bitcoin's decentralized and secure transaction system."
  }
];

export default function BitcoinQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const passThreshold = Math.ceil(quizQuestions.length * 0.7);
      updateProgress(1, 'bitcoin-quiz', score >= passThreshold);
    }
  };

  if (quizCompleted) {
    const passThreshold = Math.ceil(quizQuestions.length * 0.7);
    const passed = score >= passThreshold;

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
            <p className="text-lg text-center mb-4">
              You scored {score} out of {quizQuestions.length}
            </p>
            
            {passed ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                <p className="text-green-700">
                  🎉 Congratulations! You've passed the Bitcoin quiz!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-yellow-700">
                  Keep studying and try again to improve your score. You need {passThreshold} correct answers to pass.
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/modules/module1/bitcoin">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Content
                </Button>
              </Link>
              
              {!passed ? (
                <Button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setScore(0);
                    setQuizCompleted(false);
                  }}
                >
                  Try Again
                </Button>
              ) : (
                <Link href="/modules/module1">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Continue to Module 1
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/modules/module1/bitcoin">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Bitcoin
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Bitcoin Quiz
            <span className="text-sm text-gray-500 ml-2">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <Progress 
            value={(currentQuestion / quizQuestions.length) * 100} 
            className="mb-6"
          />

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-lg">{quizQuestions[currentQuestion].question}</p>
          </div>

          <div className="space-y-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-200'
                      : selectedAnswer === index
                        ? 'bg-red-200'
                        : 'bg-gray-100'
                  }
                `}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'
              }`}>
                <p className="font-semibold mb-2">
                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? '✅ Correct!' 
                    : '❌ Incorrect'}
                </p>
                <p>{quizQuestions[currentQuestion].explanation}</p>
              </div>

              <Button
                className="w-full mt-4"
                onClick={moveToNextQuestion}
              >
                {currentQuestion === quizQuestions.length - 1 
                  ? 'Finish Quiz' 
                  : 'Next Question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
