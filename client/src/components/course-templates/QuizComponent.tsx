import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  autoAdvanceDelay?: number;
}

export const QuizComponent: React.FC<QuizProps> = ({
  questions,
  onComplete,
  autoAdvanceDelay = 5000,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job! Let's see why.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Not quite. Let's learn why.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showExplanation) {
      timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setShowExplanation(false);
          setSelectedAnswer(null);
        } else {
          onComplete(Math.round((score / questions.length) * 100));
        }
      }, autoAdvanceDelay);
    }
    return () => clearTimeout(timer);
  }, [showExplanation, currentQuestionIndex, questions.length, score, onComplete, autoAdvanceDelay]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-800">
          Topic Quiz
        </h2>
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <Progress
        value={(currentQuestionIndex / questions.length) * 100}
        className="mb-6"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            {questions[currentQuestionIndex].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left p-4 ${
                    showExplanation && idx === questions[currentQuestionIndex].correctAnswer
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : showExplanation && idx === selectedAnswer
                      ? 'bg-red-50 border-red-500 text-red-700'
                      : ''
                  }`}
                  onClick={() => !showExplanation && handleAnswer(idx)}
                  disabled={showExplanation}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-blue-800">
                  <span className="font-semibold">Explanation: </span>
                  {questions[currentQuestionIndex].explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;