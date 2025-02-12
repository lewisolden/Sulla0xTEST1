import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Trophy,
  Star
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function AIModule2Quiz() {
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
      question: "What is the main purpose of Natural Language Processing (NLP) in AI?",
      options: [
        "To control robots",
        "To enable computers to understand and process human language",
        "To generate random text",
        "To create visual effects"
      ],
      correct: 1,
      explanation: "NLP is designed to help computers understand, interpret, and respond to human language in a meaningful way."
    },
    {
      question: "Which technology is fundamental to computer vision applications?",
      options: [
        "Sound processing",
        "Database management",
        "Convolutional Neural Networks",
        "Network protocols"
      ],
      correct: 2,
      explanation: "Convolutional Neural Networks (CNNs) are crucial for computer vision tasks as they excel at processing visual data."
    },
    {
      question: "In robotics, what is the primary function of sensors?",
      options: [
        "To provide power",
        "To gather information about the environment",
        "To make the robot look better",
        "To store data"
      ],
      correct: 1,
      explanation: "Sensors are essential in robotics for gathering environmental data, enabling robots to interact with their surroundings safely and effectively."
    },
    {
      question: "Which AI ethics principle ensures that AI systems are transparent in their decision-making?",
      options: [
        "Efficiency",
        "Explainability",
        "Speed",
        "Complexity"
      ],
      correct: 1,
      explanation: "Explainability is a key ethical principle that ensures AI decisions can be understood and interpreted by humans."
    },
    {
      question: "What is a key consideration in designing ethical AI systems?",
      options: [
        "Maximizing profit",
        "Processing speed",
        "Fairness and bias prevention",
        "Visual appearance"
      ],
      correct: 2,
      explanation: "Ensuring fairness and preventing bias are crucial ethical considerations in AI system design to avoid discriminatory outcomes."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setAnswerState({
      selectedAnswer: selectedIndex,
      isCorrect,
      showExplanation: true,
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
          showExplanation: false,
        });
      } else {
        setShowResults(true);
        updateProgress('ai-module2', {
          sectionId: 'module2-quiz',
          completed: true,
          score: Math.round((score / questions.length) * 100)
        });
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/ai/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
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
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    Module 2 Final Quiz: Question {currentQuestion + 1} of {questions.length}
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
                          onClick={() =>
                            !answerState.showExplanation && handleAnswer(index)
                          }
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
                    <p
                      className={`font-semibold ${
                        answerState.isCorrect ? "text-green-800" : "text-red-800"
                      }`}
                    >
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
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                  Module 2 Complete!
                </h2>
                <p className="text-lg mb-4">
                  You scored {score} out of {questions.length}
                </p>
                <div className="flex justify-center mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 ${
                        i < Math.ceil((score / questions.length) * 5)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  {score === questions.length
                    ? "Perfect score! You've mastered all the concepts in Module 2!"
                    : "Great effort! Review the content and try again to improve your score."}
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/ai/module2">
                    <Button variant="outline">
                      Review Module
                    </Button>
                  </Link>
                  <Link href="/ai/module3">
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                      Start Module 3 <ArrowRight className="h-4 w-4" />
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