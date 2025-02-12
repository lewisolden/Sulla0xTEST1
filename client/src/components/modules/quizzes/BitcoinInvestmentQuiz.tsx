import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const questions = [
  {
    question: "What is a key characteristic of Bitcoin as an investment asset?",
    options: [
      "Low volatility and stable returns",
      "High volatility with potential for significant gains or losses",
      "Guaranteed returns similar to bonds",
      "Regular dividend payments"
    ],
    correctAnswer: 1
  },
  {
    question: "Which of the following is a recommended Bitcoin investment strategy?",
    options: [
      "Investing all savings at once",
      "Dollar-cost averaging (DCA)",
      "Day trading with leverage",
      "Waiting for the price to drop to zero"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a Bitcoin ETF?",
    options: [
      "A digital wallet for storing Bitcoin",
      "A mining pool for Bitcoin",
      "An investment fund that tracks Bitcoin's price",
      "A Bitcoin exchange platform"
    ],
    correctAnswer: 2
  },
  {
    question: "Which factor should NOT be considered when investing in Bitcoin?",
    options: [
      "Your risk tolerance",
      "Market sentiment",
      "Technical analysis",
      "Guaranteed quick profits"
    ],
    correctAnswer: 3
  },
  {
    question: "What is the primary purpose of holding Bitcoin long-term?",
    options: [
      "Store of value and potential appreciation",
      "Daily trading profits",
      "Mining rewards",
      "Network validation rights"
    ],
    correctAnswer: 0
  }
];

interface Props {
  onComplete?: () => void;
}

export const BitcoinInvestmentQuiz: React.FC<Props> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  if (showResults) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-4">
          You scored {score} out of {questions.length} questions correctly.
        </p>
        <p className="text-sm text-gray-600">
          {score >= 4 
            ? "Excellent! You have a strong understanding of Bitcoin investment concepts."
            : score >= 3
            ? "Good job! Keep learning about Bitcoin investment strategies."
            : "Consider reviewing the material to better understand Bitcoin investments."}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      <p className="mb-6">{questions[currentQuestion].question}</p>

      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={handleAnswerSelect}
        className="space-y-4"
      >
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        onClick={handleNextQuestion}
        className="mt-6"
      >
        {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
      </Button>
    </Card>
  );
};

export default BitcoinInvestmentQuiz;