import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const quizQuestions = [
  {
    question: "What is a digital currency?",
    options: [
      "Physical money in digital form",
      "Any form of currency that exists electronically",
      "Only cryptocurrencies",
      "Only central bank digital currencies"
    ],
    correctAnswer: 1,
    explanation: "Digital currency refers to any form of currency that exists electronically. This includes cryptocurrencies, virtual currencies, and central bank digital currencies."
  },
  {
    question: "Which of these is NOT a characteristic of most digital currencies?",
    options: [
      "Can be used for online transactions",
      "Requires physical storage",
      "Can be transferred instantly",
      "Uses encryption technology"
    ],
    correctAnswer: 1,
    explanation: "Digital currencies exist purely in electronic form and do not require physical storage, unlike traditional cash or coins."
  },
  {
    question: "What advantage do digital currencies offer over traditional payment systems?",
    options: [
      "Always require a bank account",
      "Cannot be counterfeited",
      "24/7 transaction capability",
      "No transaction fees"
    ],
    correctAnswer: 2,
    explanation: "Digital currencies enable 24/7 transaction capability, allowing transfers at any time without being limited by bank operating hours."
  },
  {
    question: "Which statement about digital currencies is true?",
    options: [
      "They all require internet access",
      "They are all decentralized",
      "They are all anonymous",
      "They all use blockchain"
    ],
    correctAnswer: 0,
    explanation: "All digital currencies require internet access for transactions, as they exist and operate in electronic form. However, not all are decentralized, anonymous, or use blockchain technology."
  },
  {
    question: "What is the main difference between digital and traditional currencies?",
    options: [
      "Digital currencies are always more valuable",
      "Digital currencies exist only in electronic form",
      "Digital currencies cannot be regulated",
      "Digital currencies are always free to use"
    ],
    correctAnswer: 1,
    explanation: "The main difference is that digital currencies exist solely in electronic form, without physical counterparts like bills or coins."
  }
];

export default function DigitalCurrenciesQuiz() {
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
      updateProgress(1, 'digital-currencies-quiz', score >= passThreshold);
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
                  🎉 Congratulations! You've passed the Digital Currencies quiz!
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
              <Link href="/modules/module1/digital-currencies">
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
        <Link href="/modules/module1/digital-currencies">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Digital Currencies
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Digital Currencies Quiz
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
