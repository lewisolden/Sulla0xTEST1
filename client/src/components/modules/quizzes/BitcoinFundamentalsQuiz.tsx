import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    id: 1,
    question: "What is the main innovation that Bitcoin introduced?",
    options: [
      "A digital payment system with central control",
      "A decentralized digital currency without intermediaries",
      "A new type of bank account",
      "A government-backed cryptocurrency"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin's revolutionary innovation was creating the first decentralized digital currency that operates without any central authority or intermediaries. This solved the 'double-spending problem' without requiring a trusted third party."
  },
  {
    id: 2,
    question: "What is the function of Bitcoin mining?",
    options: [
      "To create physical coins",
      "To hack other cryptocurrencies",
      "To secure the network and process transactions",
      "To store Bitcoin in digital wallets"
    ],
    correctAnswer: 2,
    explanation: "Bitcoin mining serves multiple purposes: it secures the network through proof-of-work, processes and validates transactions, and introduces new bitcoins into circulation according to a predetermined schedule."
  },
  {
    id: 3,
    question: "When was the Bitcoin whitepaper published?",
    options: [
      "October 31, 2008",
      "January 3, 2009",
      "May 22, 2010",
      "December 25, 2008"
    ],
    correctAnswer: 0,
    explanation: "Satoshi Nakamoto published the Bitcoin whitepaper titled 'Bitcoin: A Peer-to-Peer Electronic Cash System' on October 31, 2008. This date marks the theoretical foundation of Bitcoin, though the network wouldn't launch until January 2009."
  },
  {
    id: 4,
    question: "What is the Bitcoin blockchain?",
    options: [
      "A private database owned by banks",
      "A public ledger that records all transactions",
      "A type of cryptocurrency wallet",
      "A mining software"
    ],
    correctAnswer: 1,
    explanation: "The blockchain is a public, distributed ledger that permanently records all Bitcoin transactions. It's called a 'chain' because each block of transactions links to the previous one, creating an immutable history."
  },
  {
    id: 5,
    question: "What was significant about the 'Pizza Transaction' in Bitcoin's history?",
    options: [
      "It was the first Bitcoin transaction ever",
      "It proved Bitcoin was a scam",
      "It was the first real-world purchase using Bitcoin",
      "It crashed the Bitcoin network"
    ],
    correctAnswer: 2,
    explanation: "On May 22, 2010, Laszlo Hanyecz paid 10,000 BTC for two pizzas, marking the first documented real-world purchase using Bitcoin. This transaction helped establish Bitcoin's potential as a medium of exchange and is now celebrated as 'Bitcoin Pizza Day'."
  }
];

export default function BitcoinFundamentalsQuiz() {
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
        updateProgress(2, 'bitcoin-fundamentals-quiz', true);
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
                  Congratulations! You've passed the quiz and demonstrated a solid understanding of Bitcoin fundamentals.
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