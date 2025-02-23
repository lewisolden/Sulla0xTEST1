import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    question: "What is the first recommended step for someone new to cryptocurrency?",
    options: [
      "Invest large amounts immediately",
      "Learn and understand the basics",
      "Start day trading",
      "Buy multiple cryptocurrencies"
    ],
    correctAnswer: 1,
    explanation: "Understanding the fundamentals before investing is crucial. This helps you make informed decisions and reduces the risk of costly mistakes."
  },
  {
    question: "Which of the following is a critical security practice?",
    options: [
      "Share your private keys with friends",
      "Store passwords in plain text",
      "Enable two-factor authentication",
      "Use the same password everywhere"
    ],
    correctAnswer: 2,
    explanation: "Two-factor authentication adds an extra layer of security beyond just passwords, making it much harder for unauthorized users to access your accounts."
  },
  {
    question: "What should you do before making your first cryptocurrency purchase?",
    options: [
      "Research and choose a reputable exchange",
      "Borrow money to invest",
      "Share investment plans on social media",
      "Follow random trading advice"
    ],
    correctAnswer: 0,
    explanation: "Using a reputable exchange is crucial for security and reliability. Research helps you find exchanges with good security practices, customer support, and reasonable fees."
  },
  {
    question: "Which is the safest way to store significant amounts of cryptocurrency?",
    options: [
      "In an exchange wallet",
      "In a hardware wallet",
      "On your phone",
      "In a browser extension"
    ],
    correctAnswer: 1,
    explanation: "Hardware wallets provide the highest level of security by keeping your private keys offline, protected from online threats and hackers."
  },
  {
    question: "What is a recommended practice for backup phrases?",
    options: [
      "Store them digitally",
      "Share with trusted friends",
      "Store physical copies in multiple secure locations",
      "Keep them on your computer"
    ],
    correctAnswer: 2,
    explanation: "Physical copies in secure locations protect against both digital threats and physical damage, while maintaining the security of your backup phrases."
  }
];

export const GettingStartedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(optionIndex);
      setShowExplanation(true);

      // Auto advance after 5 seconds
      setTimeout(() => {
        const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
        if (isCorrect) {
          setScore(prev => prev + 1);
        }

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        } else {
          setShowResult(true);
          const passThreshold = questions.length * 0.7;
          if (score >= passThreshold) {
            updateProgress(1, 'getting-started-quiz', true);
          }
        }
      }, 5000);
    }
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = questions.length * 0.7; // 70% to pass
      if (score >= passThreshold) {
        updateProgress(1, 'getting-started-quiz', true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResult) {
    const passThreshold = questions.length * 0.7;
    const passed = score >= passThreshold;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Quiz Complete!</h3>
            <p className="text-xl mb-4">
              You scored {score} out of {questions.length}
            </p>
            {passed ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                <p className="text-green-700">
                  🎉 Congratulations! You've passed the Getting Started quiz!
                </p>
                <p className="text-green-600 text-sm mt-2">
                  You've demonstrated a good understanding of cryptocurrency safety practices.
                </p>
              </div>
            ) : (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">
                  You didn't pass this time. Review the content and try again.
                </p>
                <p className="text-red-600 text-sm mt-2">
                  You need {Math.ceil(passThreshold)} correct answers to pass.
                </p>
              </div>
            )}
            <Button 
              onClick={restartQuiz}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-white">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {questions[currentQuestion].question}
            </p>
          </div>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === questions[currentQuestion].correctAnswer 
                      ? 'bg-green-100 border-green-500' 
                      : selectedAnswer === index 
                        ? 'bg-red-100 border-red-500' 
                        : 'bg-gray-100'}
                `}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-6 p-4 rounded-lg
                ${selectedAnswer === questions[currentQuestion].correctAnswer 
                  ? 'bg-green-100 border-l-4 border-green-500' 
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p className="text-gray-700">
                {questions[currentQuestion].explanation}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Next question in 5 seconds...
              </p>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default GettingStartedQuiz;