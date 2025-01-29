import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const quizQuestions = [
  {
    question: "What is a distributed ledger?",
    options: [
      "A single database controlled by one entity",
      "A record of transactions spread across multiple nodes",
      "A centralized system for tracking assets",
      "A private network for storing data"
    ],
    correctAnswer: 1,
    explanation: "A distributed ledger is a database that exists across several locations or among multiple participants, eliminating the need for a central authority."
  },
  {
    question: "How do nodes in a distributed ledger maintain consistency?",
    options: [
      "Through central server updates",
      "By consensus mechanisms",
      "Manual synchronization",
      "Random updates"
    ],
    correctAnswer: 1,
    explanation: "Nodes in a distributed ledger maintain consistency through consensus mechanisms where all participants agree on the state of the ledger."
  },
  {
    question: "What is a key advantage of distributed ledger technology?",
    options: [
      "Faster transaction speed",
      "Lower costs",
      "Enhanced security through decentralization",
      "Simpler implementation"
    ],
    correctAnswer: 2,
    explanation: "One of the main advantages of DLT is enhanced security through decentralization, as there is no single point of failure."
  },
  {
    question: "Which statement about distributed ledgers is FALSE?",
    options: [
      "They provide transparency",
      "They are immutable",
      "They require a central authority",
      "They are fault-tolerant"
    ],
    correctAnswer: 2,
    explanation: "Distributed ledgers do NOT require a central authority - that's one of their key features. They operate through distributed consensus."
  }
];

export default function DistributedLedgerQuiz() {
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
      updateProgress(2, 'distributed-ledger-quiz', score >= passThreshold);
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
                  🎉 Congratulations! You've passed the Distributed Ledger quiz!
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
              <Link href="/modules/module2/distributed-ledger">
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
                <Link href="/modules/module2">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Continue to Module 2
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
        <Link href="/modules/module2/distributed-ledger">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Distributed Ledger
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Distributed Ledger Quiz
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
