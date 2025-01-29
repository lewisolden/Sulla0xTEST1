import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { SelectQuiz } from "@db/schema";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface QuizProps {
  moduleId: number;
}

export default function Quiz({ moduleId }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { toast } = useToast();

  const { data: questions, isLoading, error } = useQuery<SelectQuiz[]>({
    queryKey: [`/api/modules/${moduleId}/quizzes`],
    onError: () => {
      toast({
        title: "Error loading quiz",
        description: "There was a problem loading the quiz questions. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-500">Failed to load quiz questions. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !questions) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleAnswerClick = async (answer: string) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: questions[currentQuestion].explanation,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: questions[currentQuestion].explanation,
        variant: "destructive",
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-4">
            You scored {score} out of {questions.length}
          </p>
          <Progress 
            value={(score / questions.length) * 100} 
            className="w-full mb-4"
          />
          <Button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
            }}
          >
            Retry Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];
  const options = JSON.parse(currentQuizQuestion.options);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="question-count">
              <span className="font-medium">Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <Progress 
              value={((currentQuestion + 1) / questions.length) * 100} 
              className="w-1/3"
            />
          </div>

          <h3 className="text-lg font-medium">{currentQuizQuestion.question}</h3>

          <div className="grid gap-4">
            {options.map((option: string, index: number) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}