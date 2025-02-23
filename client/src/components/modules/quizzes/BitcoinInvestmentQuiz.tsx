import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";

const questions = [
  {
    id: "q1",
    question: "What is considered a 'low-risk' way to invest in Bitcoin?",
    options: {
      0: "Trading with high leverage",
      1: "Bitcoin ETFs and regulated investment products",
      2: "Day trading on unregulated exchanges",
      3: "Lending Bitcoin to anonymous borrowers"
    },
    correct: 1,
    explanation: "Bitcoin ETFs and regulated investment products are considered lower risk because they're overseen by financial regulators and often come with institutional-grade security measures."
  },
  {
    id: "q2",
    question: "Which of the following is a key characteristic that makes Bitcoin valuable as a store of value?",
    options: {
      0: "Unlimited supply",
      1: "Centralized control",
      2: "Fixed maximum supply of 21 million coins",
      3: "Ability to be created at will"
    },
    correct: 2,
    explanation: "Bitcoin's fixed maximum supply of 21 million coins is a key characteristic that makes it valuable as a store of value, similar to precious metals like gold."
  },
  {
    id: "q3",
    question: "Before investing in Bitcoin, what's the most important financial consideration?",
    options: {
      0: "Only invest what you can afford to lose",
      1: "Borrow money to buy more Bitcoin",
      2: "Invest all your savings",
      3: "Ignore your current financial situation"
    },
    correct: 0,
    explanation: "It's crucial to only invest what you can afford to lose in Bitcoin due to its volatile nature. This helps manage risk and protect your financial wellbeing."
  },
  {
    id: "q4",
    question: "What advantage do Bitcoin ETFs offer to traditional investors?",
    options: {
      0: "Complete anonymity",
      1: "Zero fees",
      2: "Guaranteed returns",
      3: "Familiar investment structure through regular brokerage accounts"
    },
    correct: 3,
    explanation: "Bitcoin ETFs offer a familiar investment structure through regular brokerage accounts, making it easier for traditional investors to gain exposure to Bitcoin without managing private keys or dealing with cryptocurrency exchanges."
  }
];

export default function BitcoinInvestmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

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
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>
          {score >= questions.length * 0.6 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Bitcoin Investment quiz!
              </p>
              <p className="text-sm text-green-600 mt-1">Moving to next section in 8 seconds...</p>
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