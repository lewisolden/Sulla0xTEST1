import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    question: "Which real-world application uses blockchain for tracking products from manufacturer to consumer?",
    options: [
      "Supply Chain Management",
      "Digital Art Galleries",
      "Social Media Networks",
      "Gaming Platforms"
    ],
    correct: 0
  },
  {
    question: "How can blockchain be utilized in real estate?",
    options: [
      "Only for rental payments",
      "Property tokenization and management",
      "Just for property listings",
      "Exclusively for commercial properties"
    ],
    correct: 1
  },
  {
    question: "What is a key benefit of blockchain-based voting systems?",
    options: [
      "Faster vote counting only",
      "Lower cost only",
      "Secure and tamper-proof records",
      "Paper backup requirement"
    ],
    correct: 2
  },
  {
    question: "How can blockchain improve healthcare systems?",
    options: [
      "Medical records and drug tracking",
      "Only for billing purposes",
      "Just for appointment scheduling",
      "Employee management only"
    ],
    correct: 0
  },
  {
    question: "Which travel industry application of blockchain is correct?",
    options: [
      "Only flight bookings",
      "Just hotel reservations",
      "Exclusively car rentals",
      "Loyalty programs and booking verification"
    ],
    correct: 3
  }
];

export const PracticalApplicationsQuiz = () => {
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
        updateProgress(1, 'practical-applications-quiz', true);
      }
    }, 1000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (showResults) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h3>
          <p className="text-center text-xl mb-4">
            Your score: {score} out of {questions.length}
          </p>
          {score >= questions.length * 0.7 ? (
            <p className="text-green-600 text-center">
              Great job! You've demonstrated a good understanding of blockchain's practical applications.
            </p>
          ) : (
            <p className="text-blue-600 text-center">
              Consider reviewing the material to better understand blockchain's practical applications.
            </p>
          )}
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
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

export default PracticalApplicationsQuiz;
