import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function HistoryOfMoneyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What was the primary form of trade before money?",
      options: [
        "Credit systems",
        "Barter system",
        "Gold coins",
        "Paper currency"
      ],
      correctAnswer: 1,
      explanation: "The barter system, where goods were directly exchanged for other goods, was the primary form of trade before the invention of money."
    },
    {
      question: "What was one of the first forms of standardized currency?",
      options: [
        "Paper bills",
        "Cowrie shells",
        "Credit cards",
        "Digital tokens"
      ],
      correctAnswer: 1,
      explanation: "Cowrie shells were among the earliest forms of standardized currency, used across multiple civilizations due to their durability and relative scarcity."
    },
    {
      question: "When was the first paper money introduced?",
      options: [
        "Ancient Rome",
        "Medieval Europe",
        "Ancient China",
        "Colonial America"
      ],
      correctAnswer: 2,
      explanation: "Paper money was first introduced in Ancient China during the Tang Dynasty (618-907 CE), initially as privately issued bills of credit."
    },
    {
      question: "What was the gold standard?",
      options: [
        "A way to measure gold purity",
        "A system where currency was backed by gold",
        "A trading system using only gold",
        "A way to price gold"
      ],
      correctAnswer: 1,
      explanation: "The gold standard was a monetary system where a country's currency was directly linked to gold, with the currency being convertible into a fixed amount of gold."
    },
    {
      question: "When did the current era of fiat currency begin?",
      options: [
        "1944",
        "1971",
        "1991",
        "2009"
      ],
      correctAnswer: 1,
      explanation: "The modern era of fiat currency began in 1971 when the US ended the gold standard, making the dollar a purely fiat currency not backed by gold."
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    // Wait 5 seconds before moving to next question
    setTimeout(() => {
      const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;

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
        updateProgress(1, 'history-of-money-quiz', score >= passThreshold);
      }
    }, 5000);
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
      updateProgress(1, 'history-of-money-quiz', score >= passThreshold);
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
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= quizQuestions.length * 0.6 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the History of Money quiz!
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
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            History of Money Quiz
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
              <p className="text-sm text-gray-600 mt-2">Next question in 5 seconds...</p>
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
      </CardContent>
    </Card>
  );
}