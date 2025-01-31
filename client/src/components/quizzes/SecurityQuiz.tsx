import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Which of the following is NOT a recommended security practice for cryptocurrency?",
    options: [
      "Writing down your private key on paper",
      "Using the same password across multiple exchanges",
      "Enabling two-factor authentication",
      "Using a hardware wallet for large amounts"
    ],
    correctAnswer: 1,
    explanation: "Using the same password across multiple platforms is a significant security risk. If one account is compromised, all others become vulnerable. Always use unique, strong passwords for each service."
  },
  {
    question: "What is a 'cold wallet' in cryptocurrency?",
    options: [
      "A wallet that's always connected to the internet",
      "A wallet stored offline and not connected to the internet",
      "A wallet that's been inactive for a long time",
      "A wallet with a frozen balance"
    ],
    correctAnswer: 1,
    explanation: "A cold wallet is a cryptocurrency wallet that's stored offline and not connected to the internet, providing enhanced security against online threats and hackers."
  },
  {
    question: "What should you do before sending a large amount of cryptocurrency?",
    options: [
      "Send the full amount immediately",
      "Send a test transaction with a small amount first",
      "Share your private key with the recipient",
      "Disable two-factor authentication temporarily"
    ],
    correctAnswer: 1,
    explanation: "Always send a small test transaction first to verify the correct recipient address and ensure everything works as expected before sending larger amounts."
  },
  {
    question: "Which of these is a sign of a potential cryptocurrency scam?",
    options: [
      "Promises of guaranteed returns",
      "Open-source code",
      "Detailed whitepaper",
      "Active developer community"
    ],
    correctAnswer: 0,
    explanation: "Promises of guaranteed returns are a major red flag in cryptocurrency investments. Legitimate projects acknowledge the risks and volatility inherent in cryptocurrency markets."
  },
  {
    question: "What is the best way to store your recovery phrase?",
    options: [
      "In a password manager",
      "In an email draft",
      "In multiple secure physical locations",
      "On your smartphone"
    ],
    correctAnswer: 2,
    explanation: "Storing your recovery phrase in multiple secure physical locations (like a safe) provides redundancy while keeping it offline and safe from digital threats."
  }
];

export const SecurityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = questions.length * 0.7; // 70% to pass
      updateProgress(1, 'security', score >= passThreshold);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-4">
          You scored {score} out of {questions.length}
        </p>
        {score >= questions.length * 0.7 ? (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-green-700">
              🎉 Congratulations! You've passed the Security quiz!
            </p>
          </div>
        ) : (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">
              Keep learning! Review the security concepts and try again.
            </p>
          </div>
        )}
        <Button onClick={restartQuiz} className="w-full">
          Restart Quiz
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <span className="text-sm text-gray-500">
            Score: {score}/{currentQuestion}
          </span>
        </div>

        <p className="text-lg mb-4">{questions[currentQuestion].question}</p>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-3 text-left rounded-lg transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-100 hover:bg-blue-50'
                  : index === questions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : selectedAnswer === index
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-100'
              }`}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-blue-800">
              {questions[currentQuestion].explanation}
            </p>
          </motion.div>
        )}

        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <Button
              onClick={handleNextQuestion}
              className="w-full"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </motion.div>
        )}
      </div>
    </Card>
  );
};