import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useProgress } from "@/context/progress-context";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizTemplateProps {
  moduleId: string;
  sectionId: string;
  questions: Question[];
  onComplete?: () => void;
  backLink: string;
  backLabel: string;
  nextLink: string;
  nextLabel: string;
  totalSections: number;
  currentSection: number;
}

export const QuizTemplate = ({
  moduleId,
  sectionId,
  questions,
  onComplete,
  backLink,
  backLabel,
  nextLink,
  nextLabel,
  totalSections,
  currentSection
}: QuizTemplateProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null as number | null,
    isCorrect: false,
    showExplanation: false
  });

  const { updateProgress } = useProgress();

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setAnswerState({
      selectedAnswer: selectedIndex,
      isCorrect,
      showExplanation: true
    });

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerState({
          selectedAnswer: null,
          isCorrect: false,
          showExplanation: false
        });
      } else {
        setShowResults(true);
        updateProgress({
          moduleId,
          sectionId,
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections,
          currentSection
        });
        if (onComplete) {
          onComplete();
        }
      }
    }, 2000);
  };

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                  Quiz Completed!
                </h2>
                <p className="text-lg mb-4">
                  You scored {score} out of {questions.length}
                </p>
                <p className="text-gray-600 mb-6">
                  {score === questions.length
                    ? "Perfect score! You've mastered this topic!"
                    : "Great effort! Review the content and try again to improve your score."}
                </p>
                <div className="flex justify-center gap-4">
                  <Link href={backLink}>
                    <Button variant="outline">
                      Back to Content
                    </Button>
                  </Link>
                  <Link href={nextLink}>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      {nextLabel} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
              </Button>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = answerState.selectedAnswer === index;
                  const isCorrect = index === questions[currentQuestion].correct;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left p-4 relative ${
                          isSelected
                            ? isCorrect
                              ? "bg-green-100 border-green-500 hover:bg-green-100"
                              : "bg-red-100 border-red-500 hover:bg-red-100"
                            : "hover:bg-blue-50"
                        }`}
                        onClick={() => !answerState.showExplanation && handleAnswer(index)}
                        disabled={answerState.showExplanation}
                      >
                        <div className="flex items-center gap-4">
                          <span>{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                          {isSelected && (
                            <div className="absolute right-4">
                              {isCorrect ? (
                                <Check className="h-5 w-5 text-green-600" />
                              ) : (
                                <X className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>

              {answerState.showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    answerState.isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p className={`font-semibold ${
                    answerState.isCorrect ? "text-green-800" : "text-red-800"
                  }`}>
                    {answerState.isCorrect ? "Correct!" : "Incorrect."}
                  </p>
                  <p className="mt-2 text-gray-700">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
