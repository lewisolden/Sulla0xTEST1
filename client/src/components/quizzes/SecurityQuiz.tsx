import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle, Award } from "lucide-react";

interface SecurityQuizProps {
  onComplete: () => void;
}

const questions = [
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

const SecurityQuiz: React.FC<SecurityQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(
          1,
          'security',
          finalScore >= 60,
          1,
          undefined,
          finalScore
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            onComplete();
          }, 5000);
        }
      }
    }, 3000);
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
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-center mb-4">
            <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold mb-3 text-blue-800">
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
                Congratulations! You've passed!
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-sm"
            >
              Retry Quiz
            </Button>
            {percentage >= 60 && (
              <Link href="/modules/module1/smart-contracts">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-sm"
                >
                  Continue to Smart Contracts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-3 max-w-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center justify-between">
          Question {currentQuestion + 1} of {questions.length}
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            Score: {score}
          </span>
        </h3>

        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
          <p className="text-base text-gray-700">
            {questions[currentQuestion].question}
          </p>
        </div>

        <div className="grid gap-2">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-300 text-sm
                ${selectedAnswer === null 
                  ? 'bg-white hover:bg-blue-50 border border-gray-200' 
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
              <span className="text-gray-700">{option}</span>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg text-sm
              ${selectedAnswer === questions[currentQuestion].correctAnswer 
                ? 'bg-white border-l-4 border-green-500' 
                : 'bg-white border-l-4 border-red-500'}
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2 text-gray-900">
              {selectedAnswer === questions[currentQuestion].correctAnswer 
                ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
            </h3>
            <p className="leading-relaxed text-gray-700">{questions[currentQuestion].explanation}</p>
            <p className="text-xs mt-2 text-gray-600">Next question in 3 seconds...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuiz;