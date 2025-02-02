import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";

const quizQuestions = [
  {
    question: "What is one of the key factors contributing to Ethereum's network effects?",
    options: [
      "Growing developer ecosystem",
      "Marketing campaigns",
      "Government support",
      "Hardware requirements"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following best describes Ethereum's economic model after the merge?",
    options: [
      "Pure inflationary model",
      "Deflationary potential through fee burning",
      "Fixed supply like Bitcoin",
      "No economic model"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a key benefit of Ethereum's staking mechanism?",
    options: [
      "Free tokens for everyone",
      "Centralized control",
      "Network security through validator participation",
      "Faster transaction times"
    ],
    correctAnswer: 2
  },
  {
    question: "Which factor contributes to Ethereum's fundamental value?",
    options: [
      "Celebrity endorsements",
      "Platform utility and smart contract capabilities",
      "Marketing budget",
      "Number of exchanges listing ETH"
    ],
    correctAnswer: 1
  }
];

export default function InvestmentValueQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      updateProgress(3, 'investment-value-quiz', true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Results</h2>
          <div className="text-center mb-6">
            <p className="text-xl">
              You scored {score} out of {quizQuestions.length}!
            </p>
            {score >= 3 ? (
              <p className="text-green-600 mt-2">
                Congratulations! You've passed the quiz! 🎉
              </p>
            ) : (
              <p className="text-amber-600 mt-2">
                Try again to improve your score.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <Button 
              onClick={restartQuiz}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Restart Quiz
            </Button>
            {score >= 3 && (
              <Link href="/modules/module3/security-risks">
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Continue to Security and Risk Management →
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Question {currentQuestion + 1}</h2>
          <p className="text-gray-600">
            {quizQuestions[currentQuestion].question}
          </p>
        </div>
        
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleAnswer(index)}
                variant="outline"
                className="w-full text-left justify-start hover:bg-blue-50"
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
      </Card>
    </div>
  );
}
