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
    correctAnswer: 0,
    explanation: "The growing developer ecosystem is crucial for Ethereum's network effects. As more developers build applications, it attracts more users, which in turn attracts more developers - creating a powerful positive feedback loop that increases the network's value."
  },
  {
    question: "Which of the following best describes Ethereum's economic model after the merge?",
    options: [
      "Pure inflationary model",
      "Deflationary potential through fee burning",
      "Fixed supply like Bitcoin",
      "No economic model"
    ],
    correctAnswer: 1,
    explanation: "After the merge to Proof of Stake, Ethereum introduced a fee-burning mechanism (EIP-1559) that can make ETH deflationary when network usage is high. This means the total supply can decrease over time as transaction fees are burned, potentially increasing scarcity."
  },
  {
    question: "What is a key benefit of Ethereum's staking mechanism?",
    options: [
      "Free tokens for everyone",
      "Centralized control",
      "Network security through validator participation",
      "Faster transaction times"
    ],
    correctAnswer: 2,
    explanation: "Staking is fundamental to Ethereum's security. When validators stake their ETH, they put their assets at risk of being slashed if they behave maliciously, creating strong economic incentives to maintain network security and integrity."
  },
  {
    question: "Which factor contributes to Ethereum's fundamental value?",
    options: [
      "Celebrity endorsements",
      "Platform utility and smart contract capabilities",
      "Marketing budget",
      "Number of exchanges listing ETH"
    ],
    correctAnswer: 1,
    explanation: "Ethereum's fundamental value comes from its utility as a platform for smart contracts and decentralized applications. The ability to create and execute programmable agreements and applications gives Ethereum real-world utility beyond simple value transfer."
  }
];

const InvestmentValueQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

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
      const passThreshold = quizQuestions.length * 0.6;
      updateProgress(3, 'investment-value-quiz', score >= passThreshold);
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
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Investment Value quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
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

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Investment Value Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {currentQuizQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-6 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === currentQuizQuestion.correctAnswer 
                      ? 'bg-green-200' 
                      : selectedAnswer === index 
                        ? 'bg-red-200' 
                        : 'bg-gray-100'}
                  whitespace-normal break-words
                `}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg">{option}</span>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-8 p-6 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-3 text-lg">
                {selectedAnswer === currentQuizQuestion.correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p className="text-lg leading-relaxed">{currentQuizQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-8 w-full bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InvestmentValueQuiz;