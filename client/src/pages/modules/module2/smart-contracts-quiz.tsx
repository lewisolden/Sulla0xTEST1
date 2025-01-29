import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

const quizQuestions = [
  {
    question: "What is a key characteristic of smart contracts?",
    options: [
      "They require manual execution",
      "They are self-executing when conditions are met",
      "They can be modified after deployment",
      "They need intermediaries"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing contracts where the terms are directly written into code and execute automatically when predetermined conditions are met, eliminating the need for intermediaries."
  },
  {
    question: "What is the 'Oracle Problem' in smart contracts?",
    options: [
      "Software bugs in the code",
      "High transaction fees",
      "Difficulty in getting reliable external data",
      "Slow execution speed"
    ],
    correctAnswer: 2,
    explanation: "The Oracle Problem refers to the challenge of getting reliable real-world data into blockchain smart contracts while maintaining decentralization and security."
  },
  {
    question: "Which platform was the first to implement smart contracts?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Cardano",
      "Solana"
    ],
    correctAnswer: 1,
    explanation: "Ethereum was the first blockchain platform to implement smart contracts, using its Solidity programming language and becoming the foundation for many decentralized applications."
  },
  {
    question: "What makes smart contracts immutable?",
    options: [
      "Regular updates",
      "Code cannot be changed after deployment",
      "Administrative controls",
      "User permissions"
    ],
    correctAnswer: 1,
    explanation: "Once deployed on the blockchain, smart contract code cannot be changed. This immutability ensures contract terms remain constant and builds trust between parties."
  },
  {
    question: "Which is NOT a common use case for smart contracts?",
    options: [
      "Automated lending",
      "Supply chain tracking",
      "Personal messaging",
      "Insurance claims processing"
    ],
    correctAnswer: 2,
    explanation: "Personal messaging is not a common use case for smart contracts, as they are primarily designed for automating business logic and transactions rather than communication functions."
  }
];

export default function SmartContractsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const passThreshold = quizQuestions.length * 0.6;
      updateProgress(2, 'smart-contracts-quiz', score >= passThreshold);
    }
  };

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
            <p className="text-lg text-center mb-4">
              You scored {score} out of {quizQuestions.length}
            </p>
            
            {score >= quizQuestions.length * 0.6 ? (
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                <p className="text-green-700">
                  🎉 Congratulations! You've passed the Smart Contracts quiz!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-yellow-700">
                  Keep studying and try again to improve your score.
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/modules/module2/smart-contracts">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Content
                </Button>
              </Link>
              
              <Link href="/modules/module2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Continue to Module 2
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/modules/module2/smart-contracts">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Smart Contracts
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            Smart Contracts Quiz
            <span className="text-sm text-gray-500 ml-2">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <Progress 
            value={(currentQuestion / quizQuestions.length) * 100} 
            className="mb-6"
          />

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-lg">{quizQuestions[currentQuestion].question}</p>
          </div>

          <div className="space-y-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === quizQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-200'
                      : selectedAnswer === index
                        ? 'bg-red-200'
                        : 'bg-gray-100'
                  }
                `}
                disabled={selectedAnswer !== null}
                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className={`p-4 rounded-lg ${
                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-l-4 border-green-500'
                  : 'bg-red-100 border-l-4 border-red-500'
              }`}>
                <p className="font-semibold mb-2">
                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? '✅ Correct!' 
                    : '❌ Incorrect'}
                </p>
                <p>{quizQuestions[currentQuestion].explanation}</p>
              </div>

              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={moveToNextQuestion}
              >
                {currentQuestion === quizQuestions.length - 1 
                  ? 'Finish Quiz' 
                  : 'Next Question'}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
