import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ReinforcementLearningQuizProps {
  onComplete?: () => void;
}

export function ReinforcementLearningQuiz({ onComplete }: ReinforcementLearningQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the primary goal of reinforcement learning?",
      options: [
        "To classify data into categories",
        "To learn optimal behavior through trial and error",
        "To predict future values",
        "To cluster similar data points"
      ],
      correctAnswer: 1,
      explanation: "Reinforcement learning aims to learn optimal behavior by interacting with an environment and receiving rewards or penalties based on actions taken."
    },
    {
      question: "What are the three main components of a reinforcement learning system?",
      options: [
        "Input, Output, and Process",
        "Model, View, and Controller",
        "Agent, Environment, and Reward",
        "Data, Algorithm, and Results"
      ],
      correctAnswer: 2,
      explanation: "The three main components are: the agent (decision maker), the environment (what the agent interacts with), and the reward signal (feedback for actions)."
    },
    {
      question: "What is the exploration-exploitation trade-off in reinforcement learning?",
      options: [
        "Balancing memory usage vs processing speed",
        "Choosing between trying new actions vs using known good actions",
        "Trading accuracy for computational efficiency",
        "Balancing training time vs model size"
      ],
      correctAnswer: 1,
      explanation: "The exploration-exploitation trade-off involves balancing between exploring new actions to find better strategies and exploiting known good actions to maximize rewards."
    },
    {
      question: "What is a policy in reinforcement learning?",
      options: [
        "A set of rules for data preprocessing",
        "The strategy that the agent follows to choose actions",
        "A method for calculating rewards",
        "The learning rate of the algorithm"
      ],
      correctAnswer: 1,
      explanation: "A policy is the strategy or set of rules that determines how an agent selects actions in different states of the environment."
    },
    {
      question: "What is Q-learning in reinforcement learning?",
      options: [
        "A type of neural network architecture",
        "A method for data quality assessment",
        "An algorithm for learning optimal action-value functions",
        "A technique for feature selection"
      ],
      correctAnswer: 2,
      explanation: "Q-learning is a model-free reinforcement learning algorithm that learns the value of taking specific actions in different states, called the Q-value or action-value function."
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
      const passThreshold = quizQuestions.length * 0.6;
      const passed = score >= passThreshold;
      updateProgress(3, 'reinforcement-learning-quiz', passed);
      if (passed && onComplete) {
        setTimeout(onComplete, 2000);
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
    return (
      <Card className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">
          Quiz Completed!
        </h2>
        <p className="text-xl mb-4">
          You scored {score} out of {quizQuestions.length}
        </p>
        {score >= quizQuestions.length * 0.6 ? (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-green-700">
              🎉 Congratulations! You've passed the Reinforcement Learning quiz!
            </p>
          </div>
        ) : (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">
              You didn't pass this time. Review the content and try again.
            </p>
          </div>
        )}
        <Button
          onClick={restartQuiz}
          variant="outline"
          className="mt-4"
        >
          Restart Quiz
        </Button>
      </Card>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Reinforcement Learning Quiz
          <span className="text-sm ml-4 text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </h2>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-lg text-gray-700">
            {currentQuizQuestion.question}
          </p>
        </div>

        <div className="grid gap-4">
          {currentQuizQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`
                w-full p-4 h-auto whitespace-normal text-left justify-start
                ${selectedAnswer === null
                  ? 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                  : index === currentQuizQuestion.correctAnswer
                    ? 'bg-green-200 text-gray-700'
                    : selectedAnswer === index
                      ? 'bg-red-200 text-gray-700'
                      : 'bg-gray-100 text-gray-700'}
              `}
              disabled={selectedAnswer !== null}
              variant="ghost"
            >
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className={`
            mt-6 p-4 rounded-lg
            ${selectedAnswer === currentQuizQuestion.correctAnswer
              ? 'bg-green-100 border-l-4 border-green-500'
              : 'bg-red-100 border-l-4 border-red-500'}
          `}>
            <h3 className="font-bold mb-2">
              {selectedAnswer === currentQuizQuestion.correctAnswer
                ? '✅ Correct!'
                : '❌ Incorrect'}
            </h3>
            <p>{currentQuizQuestion.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <Button
            onClick={moveToNextQuestion}
            className="mt-6 w-full"
          >
            {currentQuestion < quizQuestions.length - 1
              ? 'Next Question'
              : 'Finish Quiz'}
          </Button>
        )}
      </div>
    </Card>
  );
}
