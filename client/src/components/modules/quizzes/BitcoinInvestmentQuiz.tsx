import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    id: 1,
    question: "What is a key factor to consider when investing in Bitcoin?",
    options: [
      "Only invest when the price is at an all-time high",
      "Invest based on your risk tolerance and financial goals",
      "Always use leverage to maximize returns",
      "Only invest in Bitcoin mining equipment"
    ],
    correctAnswer: 1,
    explanation: "Responsible Bitcoin investment starts with understanding your personal risk tolerance and financial goals. Never invest more than you can afford to lose and consider your investment timeline."
  },
  {
    id: 2,
    question: "What is dollar-cost averaging (DCA) in Bitcoin investment?",
    options: [
      "Buying Bitcoin only when the price drops",
      "Investing a fixed amount at regular intervals",
      "Trading Bitcoin daily for quick profits",
      "Converting all your dollars to Bitcoin at once"
    ],
    correctAnswer: 1,
    explanation: "Dollar-cost averaging is a strategy where you invest a fixed amount regularly, regardless of price. This helps reduce the impact of volatility and emotional decision-making."
  },
  {
    id: 3,
    question: "What is a Bitcoin ETF?",
    options: [
      "A type of Bitcoin wallet",
      "A mining pool",
      "A regulated investment fund tracking Bitcoin's price",
      "A cryptocurrency exchange"
    ],
    correctAnswer: 2,
    explanation: "A Bitcoin ETF (Exchange-Traded Fund) is a regulated investment vehicle that tracks the price of Bitcoin, allowing investors to gain exposure to Bitcoin through traditional brokerage accounts without directly holding the cryptocurrency."
  },
  {
    id: 4,
    question: "Which of these is a responsible Bitcoin investment practice?",
    options: [
      "Borrowing money to buy Bitcoin",
      "Diversifying your investment portfolio",
      "Day trading with leverage",
      "Investing your entire savings in Bitcoin"
    ],
    correctAnswer: 1,
    explanation: "Diversification is a key principle of responsible investing. By spreading investments across different assets, you can reduce risk while maintaining potential for returns."
  },
  {
    id: 5,
    question: "What is the significance of Bitcoin's halving event for investors?",
    options: [
      "It doubles your Bitcoin holdings",
      "It reduces the rate of new Bitcoin creation",
      "It increases transaction fees",
      "It makes mining more profitable"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin halving is when the reward for mining new blocks is cut in half, reducing the rate at which new Bitcoins are created. This event, occurring approximately every four years, has historically impacted Bitcoin's supply and price dynamics."
  }
];

export default function BitcoinInvestmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      if (score >= Math.floor(questions.length * 0.7)) {
        updateProgress(2, 'bitcoin-investment-quiz', true);
      }
    }
  };

  if (showResult) {
    const passed = score >= Math.floor(questions.length * 0.7);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <Card className={`p-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="text-xl font-semibold mb-4">
            Quiz Complete! Your Score: {score}/{questions.length}
          </h3>
          <div className="flex items-center gap-2">
            {passed ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <p className="text-green-700">
                  Congratulations! You've passed the quiz and demonstrated a solid understanding of Bitcoin investment concepts.
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">
                  Keep learning and try again. Review the sections you found challenging to improve your understanding.
                </p>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Card className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-lg text-gray-700">{questions[currentQuestion].question}</p>
        </div>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full p-6 justify-start text-left text-lg transition-colors
                ${selectedAnswer !== null ? 
                  index === questions[currentQuestion].correctAnswer ?
                    "bg-green-100 hover:bg-green-100 text-green-800 border-green-500" :
                    selectedAnswer === index ?
                      "bg-red-100 hover:bg-red-100 text-red-800 border-red-500" :
                      "opacity-50"
                  : ""
                }
              `}
              onClick={() => !isAnswered && handleAnswer(index)}
              disabled={isAnswered}
            >
              {option}
            </Button>
          ))}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className={`p-4 ${
              selectedAnswer === questions[currentQuestion].correctAnswer
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-green-700">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <span className="font-semibold text-red-700">Incorrect!</span>
                  </>
                )}
              </div>
              <p className={`text-lg ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? "text-green-800"
                  : "text-red-800"
              }`}>
                {questions[currentQuestion].explanation}
              </p>
            </Card>

            <Button
              onClick={handleNext}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-lg p-6"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}