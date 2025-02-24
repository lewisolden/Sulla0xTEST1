import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

const questions = [
  {
    id: "q1",
    question: "What is one of the key market volatility risks when investing in Bitcoin?",
    options: {
      0: "Guaranteed stable prices",
      1: "Price fluctuations limited to business hours",
      2: "Extreme price fluctuations within short periods",
      3: "Price changes only during weekdays"
    },
    correct: 2,
    explanation: "Bitcoin experiences extreme price fluctuations within short periods, with historical drops of over 50% in value. The market operates 24/7, leading to potential overnight price changes."
  },
  {
    id: "q2",
    question: "Which of the following is a critical security risk in Bitcoin investment?",
    options: {
      0: "Banks guaranteeing all losses",
      1: "Government insurance for stolen funds",
      2: "Automatic recovery of lost keys",
      3: "No recourse for lost or stolen funds"
    },
    correct: 3,
    explanation: "One of the main security risks in Bitcoin investment is that there is no recourse for lost or stolen funds. This makes proper security measures and private key management crucial."
  },
  {
    id: "q3",
    question: "What is a significant regulatory risk for Bitcoin investors?",
    options: {
      0: "Uniform global regulations",
      1: "Varying regulations across jurisdictions",
      2: "No tax implications",
      3: "Guaranteed legal status"
    },
    correct: 1,
    explanation: "A major regulatory risk is that Bitcoin regulations vary across jurisdictions, with potential for restrictive government policies and varying tax implications and reporting requirements."
  },
  {
    id: "q4",
    question: "Which of the following is a recommended practice for Bitcoin investment?",
    options: {
      0: "Investing with borrowed money",
      1: "Keeping large amounts on exchanges",
      2: "Only investing what you can afford to lose",
      3: "Sharing private keys for backup"
    },
    correct: 2,
    explanation: "A key recommended practice is to only invest what you can afford to lose. This is crucial for risk management and maintaining financial stability."
  },
  {
    id: "q5",
    question: "What should investors avoid when managing their Bitcoin investments?",
    options: {
      0: "Using regulated exchanges",
      1: "Implementing security measures",
      2: "Emotional trading decisions",
      3: "Portfolio diversification"
    },
    correct: 2,
    explanation: "Investors should avoid emotional investment decisions. Trading based on emotions rather than strategy can lead to poor investment choices and potential losses."
  }
];

export default function BitcoinInvestmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    setTimeout(() => {
      const isCorrect = optionIndex === questions[currentQuestion].correct;

      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(
          2, // moduleId
          'bitcoin-investment', // sectionId
          finalScore >= 60, // completed
          2, // order
          undefined, // timeSpent
          finalScore, // quizScore
          '/modules/module2/bitcoin-investment', // pageUrl
          '/modules/module2/security-risk', // nextUrl
          'Bitcoin Investment' // sectionName
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            setLocation('/modules/module2/security-risk');
          }, 8000);
        }
      }
    }, 8000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>
          {percentage >= 60 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Bitcoin Investment quiz!
              </p>
              <p className="text-sm text-green-600 mt-1">Moving to Security & Risk Management in 8 seconds...</p>
              <Link href="/modules/module2/security-risk">
                <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                  Continue to Security & Risk Management
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
              <Button
                onClick={restartQuiz}
                variant="outline"
                className="mt-4"
              >
                Restart Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Bitcoin Investment Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {Object.entries(currentQuizQuestion.options).map(([key, value]) => (
              <Button
                key={key}
                onClick={() => handleAnswerSelect(parseInt(key))}
                className={`
                  w-full p-4 h-auto whitespace-normal text-left justify-start
                  ${selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    : parseInt(key) === currentQuizQuestion.correct
                      ? 'bg-green-200 text-gray-700'
                      : selectedAnswer === parseInt(key)
                        ? 'bg-red-200 text-gray-700'
                        : 'bg-gray-100 text-gray-700'}
                `}
                disabled={selectedAnswer !== null}
                variant="ghost"
              >
                {value}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-4 p-3 rounded-lg text-sm
                ${selectedAnswer === currentQuizQuestion.correct
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                {selectedAnswer === currentQuizQuestion.correct
                  ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                  : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
              </h3>
              <p className="leading-relaxed">{currentQuizQuestion.explanation}</p>
              <p className="text-xs mt-2 text-gray-600">Next question in 8 seconds...</p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}