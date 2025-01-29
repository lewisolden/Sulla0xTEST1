import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { SelectQuiz } from "@db/schema";

interface QuizProps {
  moduleId: number;
}

export default function Quiz({ moduleId }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const { data: quizzes, isLoading } = useQuery<SelectQuiz[]>([
    `/api/modules/${moduleId}/quizzes`,
  ]);

  const submitAnswer = useMutation({
    mutationFn: async (answer: string) => {
      const response = await fetch(`/api/modules/${moduleId}/quizzes/${quizzes![currentQuestionIndex].id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      if (!response.ok) throw new Error("Failed to submit answer");
      return response.json();
    },
    onSuccess: (data) => {
      setShowExplanation(true);
      toast({
        title: data.isCorrect ? "Correct!" : "Incorrect",
        description: data.isCorrect 
          ? "Well done! Let's move to the next question."
          : "Don't worry! Review the explanation and try again.",
        variant: data.isCorrect ? "default" : "destructive",
      });
    },
  });

  if (isLoading || !quizzes) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading quiz questions...</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuiz = quizzes[currentQuestionIndex];
  const options = JSON.parse(currentQuiz.options);

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, quizzes.length - 1));
    setSelectedAnswer("");
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You need to choose an option before submitting",
        variant: "destructive",
      });
      return;
    }
    submitAnswer.mutate(selectedAnswer);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {quizzes.length}
            </h3>
            <span className="text-sm text-muted-foreground">
              Progress: {Math.round(((currentQuestionIndex + 1) / quizzes.length) * 100)}%
            </span>
          </div>

          <p className="text-lg">{currentQuiz.question}</p>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Explanation:</p>
              <p>{currentQuiz.explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleSubmit}
              disabled={!selectedAnswer || showExplanation}
            >
              Submit Answer
            </Button>
            {showExplanation && (
              <Button onClick={handleNext}>
                {currentQuestionIndex === quizzes.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
