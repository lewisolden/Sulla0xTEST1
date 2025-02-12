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

export function DeepLearningQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the main characteristic that distinguishes deep learning from traditional machine learning?",
      options: [
        "It only works with numerical data",
        "It automatically learns hierarchical feature representations",
        "It requires less computational power",
        "It only works with supervised learning"
      ],
      correctAnswer: 1,
      explanation: "Deep learning's key distinction is its ability to automatically learn hierarchical representations of features through multiple layers, unlike traditional ML which often requires manual feature engineering."
    },
    {
      question: "In a neural network, what happens during the forward pass?",
      options: [
        "Weights are updated based on the error",
        "The loss function is minimized",
        "Input data is processed through the layers to generate predictions",
        "Gradients are calculated and propagated backwards"
      ],
      correctAnswer: 2,
      explanation: "During the forward pass, input data flows through the network's layers, with each layer performing its computations to eventually produce output predictions."
    },
    {
      question: "What is backpropagation in deep learning?",
      options: [
        "A method to initialize network weights",
        "The process of adding more layers to the network",
        "A technique to compress the neural network",
        "An algorithm to calculate gradients and update weights"
      ],
      correctAnswer: 3,
      explanation: "Backpropagation is the algorithm used to calculate gradients of the error with respect to the network weights, allowing the network to learn by updating weights to minimize error."
    },
    {
      question: "Which type of layer is commonly used for image processing in deep learning?",
      options: [
        "Convolutional layers",
        "Recurrent layers",
        "Dense layers",
        "Normalization layers"
      ],
      correctAnswer: 0,
      explanation: "Convolutional layers are specifically designed for processing grid-like data such as images, as they can effectively detect spatial patterns and features."
    },
    {
      question: "What is the purpose of activation functions in neural networks?",
      options: [
        "To store network weights",
        "To introduce non-linearity and enable complex pattern learning",
        "To reduce the number of parameters",
        "To speed up training time"
      ],
      correctAnswer: 1,
      explanation: "Activation functions introduce non-linearity into the network, allowing it to learn and model complex patterns and relationships in the data that wouldn't be possible with just linear transformations."
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
      updateProgress(3, 'deep-learning-quiz', score >= passThreshold);
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
              🎉 Congratulations! You've passed the Deep Learning quiz!
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
          Deep Learning Quiz
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
