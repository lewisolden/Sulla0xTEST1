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

interface FutureAIQuizProps {
  onComplete?: () => void;
}

export function FutureAIQuiz({ onComplete }: FutureAIQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is artificial general intelligence (AGI)?",
      options: [
        "AI that can only perform specific tasks",
        "AI that can match human intelligence across any task",
        "AI that controls physical robots",
        "AI that generates images and text"
      ],
      correctAnswer: 1,
      explanation: "AGI refers to artificial intelligence that can understand, learn, and apply knowledge across different domains at a level comparable to human intelligence."
    },
    {
      question: "Which of these is a major ethical consideration in future AI development?",
      options: [
        "Making AI systems as fast as possible",
        "Ensuring AI aligns with human values and safety",
        "Creating the most powerful AI possible",
        "Maximizing AI system complexity"
      ],
      correctAnswer: 1,
      explanation: "AI alignment and safety are crucial ethical considerations to ensure AI systems benefit humanity and operate within ethical boundaries."
    },
    {
      question: "What is the concept of technological singularity?",
      options: [
        "When AI becomes obsolete",
        "When computers stop working",
        "When AI surpasses human intelligence and accelerates technological growth",
        "When all AI systems are connected"
      ],
      correctAnswer: 2,
      explanation: "The technological singularity refers to a hypothetical future point when artificial intelligence surpasses human intelligence, potentially leading to rapid and unpredictable technological growth."
    },
    {
      question: "Which field is NOT a key area for future AI development?",
      options: [
        "Quantum AI computing",
        "Mechanical typewriters",
        "Brain-computer interfaces",
        "Neuromorphic computing"
      ],
      correctAnswer: 1,
      explanation: "Mechanical typewriters represent outdated technology, while the other options are cutting-edge areas of AI research and development."
    },
    {
      question: "What is the main goal of AI safety research?",
      options: [
        "Making AI systems faster",
        "Creating more powerful AI",
        "Ensuring AI systems remain beneficial to humanity",
        "Reducing AI development costs"
      ],
      correctAnswer: 2,
      explanation: "AI safety research focuses on ensuring that advanced AI systems remain aligned with human values and beneficial to humanity throughout their development and deployment."
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
      updateProgress(3, 'future-ai-quiz', passed);
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
              🎉 Congratulations! You've passed the Future AI quiz!
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
          Future AI Quiz
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
