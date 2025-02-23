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
    correct: 0,
    explanation: "Supply Chain Management is a key real-world application of blockchain, allowing transparent tracking of products throughout their journey from manufacturer to consumer."
  },
  {
    question: "How can blockchain be utilized in real estate?",
    options: [
      "Only for rental payments",
      "Property tokenization and management",
      "Just for property listings",
      "Exclusively for commercial properties"
    ],
    correct: 1,
    explanation: "Blockchain enables property tokenization and comprehensive management, including ownership records, transfers, and automated payments through smart contracts."
  },
  {
    question: "What is a key benefit of blockchain-based voting systems?",
    options: [
      "Faster vote counting only",
      "Lower cost only",
      "Secure and tamper-proof records",
      "Paper backup requirement"
    ],
    correct: 2,
    explanation: "Blockchain-based voting systems provide secure, immutable records that cannot be tampered with, ensuring the integrity of the voting process."
  },
  {
    question: "How can blockchain improve healthcare systems?",
    options: [
      "Medical records and drug tracking",
      "Only for billing purposes",
      "Just for appointment scheduling",
      "Employee management only"
    ],
    correct: 0,
    explanation: "Blockchain can significantly improve healthcare by providing secure, accessible medical records and enabling reliable drug tracking throughout the supply chain."
  },
  {
    question: "Which travel industry application of blockchain is correct?",
    options: [
      "Only flight bookings",
      "Just hotel reservations",
      "Exclusively car rentals",
      "Loyalty programs and booking verification"
    ],
    correct: 3,
    explanation: "Blockchain enhances travel industry operations through secure loyalty programs and verified booking systems across multiple services."
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
        const finalScore = (score / questions.length) * 100;
        updateProgress(
          1, 
          'practical-applications', 
          finalScore >= 70,
          1,
          undefined,
          finalScore,
          '/modules/module1/applications',
          undefined,
          'Practical Applications'
        );
      }
    }, 5000); // Changed from 1000 to 5000
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

        {selectedOption !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg ${
              selectedOption === questions[currentQuestion].correct
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <h4 className="font-semibold mb-2">
              {selectedOption === questions[currentQuestion].correct ? "Correct!" : "Incorrect"}
            </h4>
            <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
            <p className="text-sm text-gray-600 mt-2">Next question in 5 seconds...</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default PracticalApplicationsQuiz;