import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  X
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function ModuleQuiz() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null as number | null,
    isCorrect: false,
    showExplanation: false
  });
  const { updateProgress } = useProgress();

  const questions = [
    {
      question: "What distinguishes artificial intelligence from traditional programming?",
      options: [
        "It only works with numbers",
        "It requires a specific programming language",
        "It can learn and adapt from data",
        "It only runs on supercomputers"
      ],
      correct: 2,
      explanation: "AI systems can learn patterns from data and adapt their behavior, unlike traditional programs that follow fixed rules."
    },
    {
      question: "Which AI application has revolutionized language understanding?",
      options: [
        "File compression",
        "Natural Language Processing",
        "Database management",
        "Network routing"
      ],
      correct: 1,
      explanation: "Natural Language Processing (NLP) has transformed how AI systems understand and interact with human language."
    },
    {
      question: "In machine learning, what is supervised learning?",
      options: [
        "Learning without any data",
        "Learning from unlabeled data",
        "Learning from labeled data with known outcomes",
        "Learning only from text data"
      ],
      correct: 2,
      explanation: "Supervised learning uses labeled data where the desired outcomes are known to train the model."
    },
    {
      question: "What is the role of hidden layers in neural networks?",
      options: [
        "To store data permanently",
        "To process and transform data between input and output",
        "To connect to the internet",
        "To compress the input data"
      ],
      correct: 1,
      explanation: "Hidden layers in neural networks process and transform data, learning complex patterns between input and output."
    },
    {
      question: "Which component is NOT typically part of a neural network?",
      options: [
        "Input layer",
        "Hidden layer",
        "Storage layer",
        "Output layer"
      ],
      correct: 2,
      explanation: "Storage layers are not part of neural networks. The main components are input layers, hidden layers, and output layers."
    }
  ];

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
          moduleId: 'ai-module1',
          sectionId: 'module1-quiz',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 6,
          currentSection: 6,
          nextModule: 'ai-module2'
        });
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/ai/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 1
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!showResults ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <Brain className="h-10 w-10 text-blue-600" />
                  <h1 className="text-3xl font-bold text-blue-800">
                    Module 1 Quiz: AI Fundamentals
                  </h1>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </h2>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
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
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                  Module 1 Completed!
                </h2>
                <p className="text-lg mb-4">
                  You scored {score} out of {questions.length}
                </p>
                <p className="text-gray-600 mb-6">
                  {score === questions.length
                    ? "Perfect score! You've mastered the fundamentals of AI!"
                    : score >= questions.length * 0.8
                    ? "Great job! You have a solid understanding of AI fundamentals."
                    : "Good effort! Consider reviewing the material to strengthen your understanding."}
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/ai/module1">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Review Module
                    </Button>
                  </Link>
                  <Link href="/ai/module2">
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      Start Module 2 <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
