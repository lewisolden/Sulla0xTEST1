import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    question: "What is the first recommended step for someone new to cryptocurrency?",
    options: [
      "Invest large amounts immediately",
      "Learn and understand the basics",
      "Start day trading",
      "Buy multiple cryptocurrencies"
    ],
    correct: 1
  },
  {
    question: "Which of the following is a critical security practice?",
    options: [
      "Share your private keys with friends",
      "Store passwords in plain text",
      "Enable two-factor authentication",
      "Use the same password everywhere"
    ],
    correct: 2
  },
  {
    question: "What should you do before making your first cryptocurrency purchase?",
    options: [
      "Research and choose a reputable exchange",
      "Borrow money to invest",
      "Share investment plans on social media",
      "Follow random trading advice"
    ],
    correct: 0
  },
  {
    question: "Which is the safest way to store significant amounts of cryptocurrency?",
    options: [
      "In an exchange wallet",
      "In a hardware wallet",
      "On your phone",
      "In a browser extension"
    ],
    correct: 1
  },
  {
    question: "What is a recommended practice for backup phrases?",
    options: [
      "Store them digitally",
      "Share with trusted friends",
      "Store physical copies in multiple secure locations",
      "Keep them on your computer"
    ],
    correct: 2
  }
];

export const GettingStartedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const { updateProgress } = useProgress();

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
        updateProgress(1, 'getting-started-quiz', true);
      }
    }, 1000);
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h3>
          <p className="text-center text-xl mb-4">
            Your score: {score} out of {questions.length}
          </p>
          {score >= questions.length * 0.7 ? (
            <p className="text-green-600 text-center">
              Great job! You've demonstrated a good understanding of cryptocurrency safety practices.
            </p>
          ) : (
            <p className="text-blue-600 text-center">
              Consider reviewing the safety guidelines to better protect your cryptocurrency investments.
            </p>
          )}
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
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h3 className="text-xl font-semibold mt-2">
            {questions[currentQuestion].question}
          </h3>
        </div>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedOption !== null}
              className={`w-full justify-start text-left ${
                selectedOption === index
                  ? index === questions[currentQuestion].correct
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  : ""
              }`}
              variant={selectedOption === null ? "outline" : "default"}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default GettingStartedQuiz;
