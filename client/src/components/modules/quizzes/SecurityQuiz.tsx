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
      "Using hardware wallets",
      "Storing private keys online",
      "Enabling 2FA",
      "Regular software updates"
    ],
    correctAnswer: 1,
    explanation: "Storing private keys online makes them vulnerable to hacking. Always keep private keys offline in secure physical locations."
  },
  {
    question: "What is the most secure type of cryptocurrency wallet?",
    options: [
      "Hardware wallet",
      "Mobile wallet",
      "Web wallet",
      "Exchange wallet"
    ],
    correctAnswer: 0,
    explanation: "Hardware wallets provide the highest level of security by keeping private keys offline and protected from online threats."
  },
  {
    question: "Which 2FA method is generally considered most secure?",
    options: [
      "SMS verification",
      "Email verification",
      "Hardware security key",
      "Phone call verification"
    ],
    correctAnswer: 2,
    explanation: "Hardware security keys provide the strongest protection as they can't be intercepted or duplicated like SMS or email codes."
  },
  {
    question: "What should you do if you receive an urgent request to transfer cryptocurrency?",
    options: [
      "Transfer immediately to avoid delays",
      "Share your private key for faster processing",
      "Verify through official channels first",
      "Click provided links to confirm"
    ],
    correctAnswer: 2,
    explanation: "Always verify urgent requests through official channels, as cryptocurrency transfers are irreversible and scammers often create false urgency."
  },
  {
    question: "How should you store your recovery phrase?",
    options: [
      "In a password manager",
      "In multiple physical locations",
      "In cloud storage",
      "In your email drafts"
    ],
    correctAnswer: 1,
    explanation: "Storing your recovery phrase in multiple secure physical locations provides redundancy while keeping it offline and safe from digital threats."
  }
];

export const SecurityQuiz: React.FC<SecurityQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    // Wait 5 seconds before moving to next question
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
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(1, 'security', finalScore >= 60);

        if (finalScore >= 60 && onComplete) {
          setTimeout(() => {
            onComplete();
          }, 5000);
        }
      }
    }, 5000); // Changed from 3000 to 5000
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-xl mx-auto">
        <Card className="p-4">
          <div className="flex items-center justify-center mb-4">
            <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
            Quiz Complete!
          </h2>
          <div className="text-lg mb-4 text-center">
            <p className="font-semibold text-gray-700">Your Score:</p>
            <p className={`text-2xl font-bold ${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              ({score} out of {questions.length} correct)
            </p>
          </div>
          {percentage >= 60 ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700 flex items-center gap-2 justify-center">
                <CheckCircle className="h-4 w-4" />
                Congratulations! You've passed!
              </p>
              <p className="text-sm text-green-600 mt-1 text-center">
                Moving to next section in 5 seconds...
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700 flex items-center gap-2 justify-center">
                <XCircle className="h-4 w-4" />
                Keep learning and try again
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            Score: {score}
          </span>
        </div>

        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 mb-4">
          <p className="text-gray-800">
            {questions[currentQuestion].question}
          </p>
        </div>

        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-200 text-sm
                ${selectedAnswer === null 
                  ? 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700' 
                  : index === questions[currentQuestion].correctAnswer 
                    ? 'bg-green-50 border-2 border-green-500 text-green-700' 
                    : selectedAnswer === index 
                      ? 'bg-red-50 border-2 border-red-500 text-red-700' 
                      : 'bg-white border border-gray-200 text-gray-600'
                }
              `}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer === null ? 1.01 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.99 : 1 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-4 p-3 rounded-lg bg-white border-l-4 text-sm
              ${selectedAnswer === questions[currentQuestion].correctAnswer 
                ? 'border-green-500 text-gray-800' 
                : 'border-red-500 text-gray-800'
              }
            `}
          >
            <h3 className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === questions[currentQuestion].correctAnswer 
                ? <><CheckCircle className="h-4 w-4 text-green-500" /> Correct!</>
                : <><XCircle className="h-4 w-4 text-red-500" /> Incorrect</>
              }
            </h3>
            <p className="text-gray-700">
              {questions[currentQuestion].explanation}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Next question in 5 seconds...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuiz;