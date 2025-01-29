import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useProgress } from "@/context/progress-context";

export default function ConsensusMechanismsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions = [
    {
      question: "What is the main purpose of a consensus mechanism in blockchain?",
      options: [
        "To store data",
        "To validate transactions and maintain network agreement",
        "To create new cryptocurrencies",
        "To connect to the internet"
      ],
      correctAnswer: 1,
      explanation: "Consensus mechanisms are crucial for validating transactions and ensuring all network participants agree on the state of the blockchain."
    },
    {
      question: "Which consensus mechanism is used by Bitcoin?",
      options: [
        "Proof of Stake",
        "Proof of Authority",
        "Proof of Work",
        "Delegated Proof of Stake"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin uses Proof of Work (PoW), where miners compete to solve complex mathematical puzzles to validate transactions and create new blocks."
    },
    {
      question: "What is a key advantage of Proof of Stake over Proof of Work?",
      options: [
        "It's more secure",
        "It's more centralized",
        "It's more energy-efficient",
        "It's slower"
      ],
      correctAnswer: 2,
      explanation: "Proof of Stake (PoS) is significantly more energy-efficient than Proof of Work as it doesn't require intensive computational work."
    },
    {
      question: "In Delegated Proof of Stake (DPoS), what role do stakeholders play?",
      options: [
        "They mine blocks",
        "They vote for delegates",
        "They create new tokens",
        "They store data"
      ],
      correctAnswer: 1,
      explanation: "In DPoS, stakeholders vote for delegates who will validate transactions and maintain the network on their behalf."
    },
    {
      question: "What happens in Proof of Stake if a validator acts maliciously?",
      options: [
        "Nothing",
        "They gain more tokens",
        "They lose their staked tokens",
        "They get more voting power"
      ],
      correctAnswer: 2,
      explanation: "In PoS, validators who act maliciously can lose their staked tokens (slashing), which serves as a deterrent to bad behavior."
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = 0.6; // 60% to pass
      updateProgress(2, 'consensus-mechanisms-quiz', (score + (isCorrect ? 1 : 0)) / quizQuestions.length >= passThreshold);
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
    const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0);
    const passed = finalScore / quizQuestions.length >= 0.6;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/modules/module2/consensus-mechanisms">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Consensus Mechanisms
            </Button>
          </Link>

          <Card className="p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">
                Quiz Completed!
              </h2>
              <p className="text-lg mb-4">
                You scored {finalScore} out of {quizQuestions.length}
              </p>
              
              {passed ? (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-700">
                    🎉 Congratulations! You've passed the Consensus Mechanisms quiz!
                  </p>
                </div>
              ) : (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">
                    You need to score at least 60% to pass. Try again!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/modules/module2/consensus-mechanisms">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Content
                  </Button>
                </Link>
                <Button
                  onClick={restartQuiz}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Restart Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2/consensus-mechanisms">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Consensus Mechanisms
            </Button>
          </Link>
        </motion.div>

        <Card className="p-8">
          <CardContent>
            {currentQuestion === 0 && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  Consensus Mechanisms Quiz
                </h1>
                <p className="text-gray-600">
                  Test your knowledge about blockchain consensus mechanisms. You need to score at least 60% to pass.
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h2>
                <span className="text-sm text-gray-500">
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>

              <p className="text-lg mb-4">
                {quizQuestions[currentQuestion].question}
              </p>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300
                      ${selectedAnswer === null 
                        ? 'bg-gray-100 hover:bg-blue-100' 
                        : index === quizQuestions[currentQuestion].correctAnswer 
                          ? 'bg-green-200' 
                          : selectedAnswer === index 
                            ? 'bg-red-200' 
                            : 'bg-gray-100'}
                    `}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className={`
                  mt-8 p-6 rounded-lg
                  ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? 'bg-green-100 border-l-4 border-green-500' 
                    : 'bg-red-100 border-l-4 border-red-500'}
                `}>
                  <h3 className="font-bold mb-2">
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                      ? '✅ Correct!' 
                      : '❌ Incorrect'}
                  </h3>
                  <p className="text-gray-700">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <Button
                  onClick={moveToNextQuestion}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {currentQuestion < quizQuestions.length - 1 
                    ? 'Next Question' 
                    : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
