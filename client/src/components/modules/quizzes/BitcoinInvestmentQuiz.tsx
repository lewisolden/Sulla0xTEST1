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
    question: "Which investment option is considered the lowest risk way to gain Bitcoin exposure?",
    options: {
      0: "Direct Bitcoin purchases on unregulated exchanges",
      1: "Bitcoin ETFs through regulated brokers",
      2: "Trading Bitcoin with leverage",
      3: "Lending Bitcoin on DeFi platforms"
    },
    correct: 1,
    explanation: "Bitcoin ETFs through regulated brokers are considered the lowest risk option as they provide exposure to Bitcoin through familiar, regulated investment structures without the need to manage private keys or deal with cryptocurrency exchanges directly."
  },
  {
    id: "q2",
    question: "What is a key characteristic that makes Bitcoin valuable as a store of value?",
    options: {
      0: "Unlimited supply potential",
      1: "Government backing",
      2: "Fixed maximum supply of 21 million coins",
      3: "Central bank control"
    },
    correct: 2,
    explanation: "Bitcoin's fixed maximum supply of 21 million coins is a key characteristic that makes it valuable as a store of value, similar to precious metals, as it ensures scarcity and prevents artificial inflation."
  },
  {
    id: "q3",
    question: "How does Metcalfe's Law apply to Bitcoin's network value?",
    options: {
      0: "The value is proportional to the square of connected users",
      1: "The value decreases with more users",
      2: "The value is fixed regardless of users",
      3: "The value is determined by mining difficulty"
    },
    correct: 0,
    explanation: "According to Metcalfe's Law, the value of a network is proportional to the square of the number of connected users. This applies to Bitcoin, where increased adoption leads to exponentially greater utility and network value."
  },
  {
    id: "q4",
    question: "Which of the following is NOT a recommended risk mitigation strategy for Bitcoin investment?",
    options: {
      0: "Using regulated exchanges",
      1: "Diversifying investment portfolio",
      2: "Investing with borrowed money",
      3: "Implementing strong security measures"
    },
    correct: 2,
    explanation: "Investing with borrowed money is explicitly warned against in risk mitigation strategies. It's important to only invest what you can afford to lose and avoid using borrowed funds, which can lead to significant financial risks."
  },
  {
    id: "q5",
    question: "What is the primary advantage of Bitcoin ETFs for traditional investors?",
    options: {
      0: "Complete anonymity in transactions",
      1: "Direct ownership of Bitcoin",
      2: "Higher potential returns",
      3: "Familiar investment structure through regular brokerage accounts"
    },
    correct: 3,
    explanation: "Bitcoin ETFs offer a familiar investment structure through regular brokerage accounts, making it easier for traditional investors to gain exposure to Bitcoin without managing private keys or dealing with cryptocurrency exchanges directly."
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