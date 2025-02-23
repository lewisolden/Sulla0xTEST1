import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useProgress } from "@/context/progress-context";

const questions = [
  {
    question: "What is a key characteristic of deep learning networks?",
    options: [
      "They require no training data",
      "They have multiple layers for feature extraction",
      "They can only process text data",
      "They need manual feature engineering"
    ],
    correctAnswer: 1,
    explanation: "Deep learning networks are characterized by their multiple layers that automatically learn and extract features from data, enabling them to process complex patterns."
  },
  {
    question: "What distinguishes reinforcement learning from other AI approaches?",
    options: [
      "It requires no input data",
      "It learns through trial and error with rewards",
      "It only works with images",
      "It needs labeled datasets"
    ],
    correctAnswer: 1,
    explanation: "Reinforcement learning is unique because it learns through interaction with an environment, receiving rewards or penalties for actions taken."
  },
  {
    question: "Which is a primary application of generative AI?",
    options: [
      "Network security",
      "Database management",
      "Content creation and synthesis",
      "Hardware optimization"
    ],
    correctAnswer: 2,
    explanation: "Generative AI excels at creating and synthesizing new content, such as images, text, or music, based on patterns learned from training data."
  },
  {
    question: "What is a key challenge in modern AI development?",
    options: [
      "Ethical considerations and bias",
      "Limited computing power",
      "Lack of programming languages",
      "Too much training data"
    ],
    correctAnswer: 0,
    explanation: "Ethical considerations and bias are major challenges in AI development, affecting fairness, transparency, and responsible deployment of AI systems."
  }
];

export default function AIModule3QuizPage() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    setTimeout(() => {
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;

      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / questions.length) * 100;
        updateProgress(
          3, // moduleId
          'module3-quiz', // sectionId
          finalScore >= 60, // completed
          5, // order
          undefined, // timeSpent
          finalScore, // quizScore
          '/ai/module3/quiz', // pageUrl
          undefined, // nextUrl
          'Advanced AI Concepts Quiz' // sectionName
        );

        if (finalScore >= 60) {
          setTimeout(() => {
            setLocation('/modules/completed');
          }, 5000);
        }
      }
    }, 5000); // Changed from 3000 to 5000
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/ai/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Module 3: Advanced AI Concepts Quiz
                </h1>
              </div>

              {showResult ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                  <p className="text-xl mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  {score >= questions.length * 0.6 ? (
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                      <p className="text-green-700">
                        🎉 Congratulations! You've passed the Advanced AI Concepts quiz!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                      <p className="text-red-700">
                        Keep learning and try again.
                      </p>
                    </div>
                  )}
                  <Button onClick={restartQuiz} className="mt-4">
                    Retry Quiz
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-lg">{questions[currentQuestion].question}</p>
                  </div>

                  <div className="grid gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`
                          w-full p-4 h-auto whitespace-normal text-left justify-start
                          ${selectedAnswer === null 
                            ? 'bg-gray-100 hover:bg-blue-100 text-gray-700' 
                            : index === questions[currentQuestion].correctAnswer 
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
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        mt-4 p-3 rounded-lg text-sm
                        ${selectedAnswer === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-l-4 border-green-500'
                          : 'bg-red-100 border-l-4 border-red-500'}
                      `}
                    >
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        {selectedAnswer === questions[currentQuestion].correctAnswer
                          ? <><CheckCircle className="h-4 w-4 text-green-600" /> Correct!</>
                          : <><XCircle className="h-4 w-4 text-red-600" /> Incorrect</>}
                      </h3>
                      <p className="leading-relaxed">{questions[currentQuestion].explanation}</p>
                      <p className="text-xs mt-2 text-gray-600">Next question in 5 seconds...</p>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}