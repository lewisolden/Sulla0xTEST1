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

interface SecurityQuizProps {
  onComplete: (score: number) => void;
}

const SecurityQuiz = ({ onComplete }: SecurityQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is the most secure way to store large amounts of cryptocurrency?",
      options: [
        "In an online exchange wallet",
        "Using a hardware wallet",
        "In a mobile wallet app",
        "Writing down private keys on paper"
      ],
      correctAnswer: 1,
      explanation: "Hardware wallets are the most secure option as they store private keys offline, protecting them from online threats and hackers."
    },
    {
      question: "Which of these is NOT a recommended security practice?",
      options: [
        "Using 2FA on all accounts",
        "Storing recovery phrases digitally",
        "Regular wallet backups",
        "Using hardware security keys"
      ],
      correctAnswer: 1,
      explanation: "Storing recovery phrases digitally (on computers or phones) makes them vulnerable to hacking. Always store them physically in secure locations."
    },
    {
      question: "What is a private key used for in cryptocurrency?",
      options: [
        "To share with others for receiving funds",
        "To log into cryptocurrency exchanges",
        "To prove ownership and control funds",
        "To verify other users' transactions"
      ],
      correctAnswer: 2,
      explanation: "Private keys are used to prove ownership of cryptocurrency and authorize transactions. They should never be shared with anyone."
    },
    {
      question: "Which 2FA method is generally considered most secure?",
      options: [
        "SMS verification codes",
        "Email verification codes",
        "Hardware security keys",
        "Recovery questions"
      ],
      correctAnswer: 2,
      explanation: "Hardware security keys provide the strongest security as they can't be intercepted or duplicated like SMS or email codes."
    },
    {
      question: "What is the best practice for protecting against phishing attacks?",
      options: [
        "Only use mobile wallets",
        "Share keys across multiple devices",
        "Click links from trusted emails",
        "Verify website URLs carefully"
      ],
      correctAnswer: 3,
      explanation: "Always verify website URLs carefully before entering any sensitive information, as phishing sites often mimic legitimate cryptocurrency services."
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
      const finalScore = isCorrect ? score + 1 : score;
      const passThreshold = quizQuestions.length * 0.6;
      if (finalScore >= passThreshold) {
        updateProgress(1, 'security', true, 100);
      }
      onComplete(finalScore);
    }
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
                🎉 Congratulations! You've passed the Security quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
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
            Security Quiz
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
      </CardContent>
    </Card>
  );
};

export default SecurityQuiz;