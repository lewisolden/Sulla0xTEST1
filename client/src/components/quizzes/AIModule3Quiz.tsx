import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

interface AIModule3QuizProps {
  onComplete?: () => void;
}

export function AIModule3Quiz({ onComplete }: AIModule3QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "Which of the following best describes deep learning?",
      options: [
        "A type of machine learning using neural networks with multiple layers",
        "A simple linear regression model",
        "A rule-based expert system",
        "A database management system"
      ],
      correctAnswer: 0,
      explanation: "Deep learning uses neural networks with multiple layers (deep neural networks) to learn hierarchical representations of data.",
      topic: "Deep Learning"
    },
    {
      question: "In reinforcement learning, what is the role of the reward signal?",
      options: [
        "To store training data",
        "To guide the agent's learning by providing feedback about its actions",
        "To generate random actions",
        "To create visualization of the environment"
      ],
      correctAnswer: 1,
      explanation: "The reward signal in reinforcement learning provides feedback to the agent about the quality of its actions, helping it learn optimal behavior.",
      topic: "Reinforcement Learning"
    },
    {
      question: "What is the main purpose of a GAN (Generative Adversarial Network)?",
      options: [
        "To classify images",
        "To compress data",
        "To generate new, synthetic data that resembles real data",
        "To optimize database queries"
      ],
      correctAnswer: 2,
      explanation: "GANs consist of two networks (generator and discriminator) that work together to generate new, realistic data samples.",
      topic: "Generative AI"
    },
    {
      question: "What is the key difference between narrow AI and AGI?",
      options: [
        "AGI can perform any intellectual task that a human can",
        "Narrow AI is more powerful than AGI",
        "AGI only works with specific tasks",
        "There is no difference between them"
      ],
      correctAnswer: 0,
      explanation: "Artificial General Intelligence (AGI) can perform any intellectual task that a human can, while narrow AI is specialized for specific tasks.",
      topic: "Future AI"
    },
    {
      question: "Which technique is used in deep learning to prevent overfitting?",
      options: [
        "Increasing learning rate",
        "Adding more layers",
        "Dropout",
        "Using smaller datasets"
      ],
      correctAnswer: 2,
      explanation: "Dropout is a regularization technique that randomly deactivates neurons during training to prevent overfitting.",
      topic: "Deep Learning"
    },
    {
      question: "What is a key component of a reinforcement learning system?",
      options: [
        "Training labels",
        "Policy function",
        "Database schema",
        "Web server"
      ],
      correctAnswer: 1,
      explanation: "The policy function in reinforcement learning determines which action the agent should take in a given state.",
      topic: "Reinforcement Learning"
    },
    {
      question: "Which model architecture is commonly used for text generation?",
      options: [
        "CNN",
        "Transformer",
        "Random Forest",
        "K-means"
      ],
      correctAnswer: 1,
      explanation: "Transformer architectures are the current state-of-the-art for text generation tasks due to their ability to handle sequential data effectively.",
      topic: "Generative AI"
    },
    {
      question: "What is a major ethical consideration in future AI development?",
      options: [
        "Making AI systems faster",
        "AI alignment with human values",
        "Using more GPUs",
        "Creating larger datasets"
      ],
      correctAnswer: 1,
      explanation: "AI alignment, ensuring AI systems remain beneficial and aligned with human values, is a crucial ethical consideration for future AI development.",
      topic: "Future AI"
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
      updateProgress(3, 'module3-quiz', passed);
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
          Module 3 Quiz Completed!
        </h2>
        <p className="text-xl mb-4">
          You scored {score} out of {quizQuestions.length}
        </p>
        {score >= quizQuestions.length * 0.6 ? (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-green-700">
              🎉 Congratulations! You've passed Module 3: Advanced AI Concepts!
            </p>
          </div>
        ) : (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">
              You didn't pass this time. Review the module content and try again.
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
          Module 3: Advanced AI Concepts Quiz
          <span className="text-sm ml-4 text-gray-600">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </h2>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-lg text-gray-700">
            {currentQuizQuestion.question}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Topic: {currentQuizQuestion.topic}
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
