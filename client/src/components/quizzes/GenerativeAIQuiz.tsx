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

interface GenerativeAIQuizProps {
  onComplete?: () => void;
}

export function GenerativeAIQuiz({ onComplete }: GenerativeAIQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is a Generative Adversarial Network (GAN)?",
      options: [
        "A single neural network that generates images",
        "Two neural networks competing in a zero-sum game",
        "A network that only classifies images",
        "A reinforcement learning algorithm"
      ],
      correctAnswer: 1,
      explanation: "A GAN consists of two networks - a generator and discriminator - that compete against each other. The generator creates fake data while the discriminator tries to distinguish real from fake data."
    },
    {
      question: "What is the primary purpose of a Variational Autoencoder (VAE)?",
      options: [
        "To classify images",
        "To compress data losslessly",
        "To generate new data samples from a learned latent space",
        "To detect objects in images"
      ],
      correctAnswer: 2,
      explanation: "VAEs learn to encode data into a compressed latent space and then decode it back, allowing them to generate new samples by sampling from this latent space."
    },
    {
      question: "Which model architecture is commonly used for text generation?",
      options: [
        "Convolutional Neural Networks",
        "Transformers",
        "Random Forests",
        "Support Vector Machines"
      ],
      correctAnswer: 1,
      explanation: "Transformer architectures, introduced in the 'Attention is All You Need' paper, have become the standard for text generation tasks due to their ability to handle long-range dependencies."
    },
    {
      question: "What is the role of the latent space in generative models?",
      options: [
        "To store the training data",
        "To represent high-dimensional data in a compressed form",
        "To calculate loss functions",
        "To optimize the learning rate"
      ],
      correctAnswer: 1,
      explanation: "The latent space is a lower-dimensional representation of the data where similar features are mapped close together, enabling smooth interpolation and generation of new samples."
    },
    {
      question: "What is a key challenge in training GANs?",
      options: [
        "They require too little data",
        "They converge too quickly",
        "Achieving stable training and avoiding mode collapse",
        "They only work with small images"
      ],
      correctAnswer: 2,
      explanation: "GANs are notoriously difficult to train due to issues like mode collapse (where the generator produces limited varieties of outputs) and training instability between generator and discriminator."
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
      updateProgress(3, 'generative-ai-quiz', passed);
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
              🎉 Congratulations! You've passed the Generative AI quiz!
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
          Generative AI Quiz
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
