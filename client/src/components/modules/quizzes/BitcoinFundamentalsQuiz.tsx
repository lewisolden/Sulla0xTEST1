import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award, PencilLine } from "lucide-react";

const questions = [
  {
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
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { updateProgress } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(
          2,
          'bitcoin-fundamentals',
          finalScore >= 60,
          1,
          undefined,
          finalScore,
          '/modules/module2/bitcoin-fundamentals',
          undefined,
          'Bitcoin Fundamentals'
        );
      }
    }, 3000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex items-center justify-center mb-4">
            <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold mb-3 text-orange-800">
            Quiz Complete!
          </h2>
          <div className="text-lg mb-4">
            <p className="font-semibold">Your Score:</p>
            <p className={`text-2xl font-bold ${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              ({score} out of {questions.length} correct)
            </p>
          </div>
          {percentage >= 60 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-4 text-sm">
              <p className="text-green-700 flex items-center gap-2 justify-center">
                <CheckCircle className="h-4 w-4" />
                You've passed!
              </p>
              <p className="text-sm text-green-600 mt-1">Moving to next section in 5 seconds...</p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4 text-sm">
              <p className="text-red-700 flex items-center gap-2 justify-center">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={restartQuiz}
              className="w-full bg-orange-500 hover:bg-orange-600 text-sm"
            >
              Retry Quiz
            </Button>
            {percentage >= 60 && (
              <Link href="/modules/module2/bitcoin-investment">
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-sm"
                >
                  Continue to Next Section <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-3 max-w-3xl">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg mb-4 text-white flex items-center gap-4">
        <PencilLine className="h-6 w-6" />
        <div>
          <h2 className="text-2xl font-bold">Test Your Knowledge</h2>
          <p className="text-white/90 text-sm mt-1">Complete the quiz to test your understanding of Bitcoin</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-orange-600">Question {currentQuestion + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{questions.length}</span>
          </div>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
            Score: {score}
          </span>
        </div>

        <p className="text-gray-700 text-lg mb-4">
          {questions[currentQuestion].question}
        </p>

        <div className="grid gap-2">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !selectedAnswer && handleAnswer(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300
                ${selectedAnswer === null
                  ? 'bg-white hover:bg-orange-50 border border-gray-200'
                  : index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-2 border-green-500'
                    : selectedAnswer === index
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-white border border-gray-200'}
                whitespace-normal break-words hover:shadow-md
              `}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
            >
              <span className="text-base">{option}</span>
            </motion.button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-4 rounded-lg
              ${selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'bg-green-100 border-l-4 border-green-500'
                : 'bg-red-100 border-l-4 border-red-500'}
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? <><CheckCircle className="h-5 w-5 text-green-600" /> Correct!</>
                : <><XCircle className="h-5 w-5 text-red-600" /> Incorrect</>}
            </h3>
            <p className="leading-relaxed text-gray-700">{questions[currentQuestion].explanation}</p>
            <p className="text-sm mt-2 text-gray-500">Next question in 3 seconds...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}