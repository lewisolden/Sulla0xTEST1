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
  Database,
  GitBranch,
  Network,
  Target,
  TrendingUp,
  Check,
  X
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Algorithm Card Component
const AlgorithmCard = ({
  title,
  description,
  icon: Icon,
  examples,
  delay
}: {
  title: string;
  description: string;
  icon: any;
  examples: string[];
  delay: number;
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-700 mb-3">Key Applications:</h4>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-2 text-blue-600"
            >
              <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
              <span>{example}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function MachineLearningBasics() {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);
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
      question: "What is Machine Learning?",
      options: [
        "A programming language",
        "A type of computer hardware",
        "A method of teaching computers to learn from data",
        "A database management system"
      ],
      correct: 2,
      explanation: "Machine Learning is a method of data analysis that automates analytical model building, allowing computers to learn and improve from experience without being explicitly programmed."
    },
    {
      question: "Which of the following is NOT a type of machine learning?",
      options: [
        "Supervised Learning",
        "Unsupervised Learning",
        "Manual Learning",
        "Reinforcement Learning"
      ],
      correct: 2,
      explanation: "Manual Learning is not a type of machine learning. The main types are Supervised Learning, Unsupervised Learning, and Reinforcement Learning."
    },
    {
      question: "What is the primary purpose of supervised learning?",
      options: [
        "To find hidden patterns in unlabeled data",
        "To learn from trial and error",
        "To predict outputs based on labeled training data",
        "To create random data patterns"
      ],
      correct: 2,
      explanation: "Supervised learning uses labeled training data to learn patterns and make predictions on new, unseen data based on those patterns."
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
          sectionId: 'machine-learning-basics',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 5,
          currentSection: 4
        });
      }
    }, 2000);
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              {!showResults ? (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setShowQuiz(false)}
                    className="mb-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
                  </Button>

                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-lg mb-6 font-medium">{questions[currentQuestion].question}</p>
                  <div className="grid gap-4">
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
                              <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
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
                      className={`mt-6 p-6 rounded-lg ${
                        answerState.isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <p className={`font-semibold text-lg ${
                        answerState.isCorrect ? "text-green-800" : "text-red-800"
                      }`}>
                        {answerState.isCorrect ? "Correct!" : "Incorrect."}
                      </p>
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {questions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Check className="h-20 w-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    Quiz Completed!
                  </h2>
                  <p className="text-xl mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {score === questions.length
                      ? "Perfect score! You've mastered the basics of Machine Learning!"
                      : "Great effort! Review the content and try again to improve your score."}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowQuiz(false);
                        setCurrentQuestion(0);
                        setScore(0);
                        setShowResults(false);
                      }}
                      className="min-w-[120px]"
                    >
                      Back to Content
                    </Button>
                    <Link href="/ai/module1/neural-networks">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700 min-w-[180px]">
                        Next Topic <ArrowRight className="h-4 w-4" />
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

        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8 bg-blue-50 p-6 rounded-lg">
                <Brain className="h-12 w-12 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-blue-800 mb-2">
                    Machine Learning Basics
                  </h1>
                  <p className="text-gray-600">
                    Discover the foundational concepts of machine learning and its various applications
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6" />
                    Understanding Machine Learning
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience. Unlike traditional programming where rules are explicitly defined, machine learning algorithms can learn patterns from data and make decisions with minimal human intervention.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Database className="h-6 w-6" />
                    Types of Machine Learning
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <AlgorithmCard
                      title="Supervised Learning"
                      description="Learning from labeled data to make predictions"
                      icon={Target}
                      examples={[
                        "Image Classification",
                        "Spam Detection",
                        "Price Prediction",
                        "Disease Diagnosis"
                      ]}
                      delay={0.6}
                    />
                    <AlgorithmCard
                      title="Unsupervised Learning"
                      description="Finding patterns in unlabeled data"
                      icon={Database}
                      examples={[
                        "Customer Segmentation",
                        "Anomaly Detection",
                        "Pattern Recognition",
                        "Feature Learning"
                      ]}
                      delay={0.7}
                    />
                    <AlgorithmCard
                      title="Reinforcement Learning"
                      description="Learning through trial and error interactions"
                      icon={GitBranch}
                      examples={[
                        "Game AI",
                        "Robot Navigation",
                        "Resource Management",
                        "Autonomous Systems"
                      ]}
                      delay={0.8}
                    />
                    <AlgorithmCard
                      title="Deep Learning"
                      description="Learning through neural networks with multiple layers"
                      icon={Network}
                      examples={[
                        "Natural Language Processing",
                        "Computer Vision",
                        "Speech Recognition",
                        "Generative AI"
                      ]}
                      delay={0.9}
                    />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    The Machine Learning Process
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8">
                    <ol className="space-y-6">
                      {[
                        {
                          title: "Data Collection",
                          desc: "Gathering relevant data for training"
                        },
                        {
                          title: "Data Preparation",
                          desc: "Cleaning and preprocessing the data"
                        },
                        {
                          title: "Model Selection",
                          desc: "Choosing appropriate algorithms"
                        },
                        {
                          title: "Training",
                          desc: "Teaching the model using training data"
                        },
                        {
                          title: "Evaluation",
                          desc: "Testing the model's performance"
                        },
                        {
                          title: "Deployment",
                          desc: "Implementing the model in real-world applications"
                        }
                      ].map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="flex items-center justify-center bg-blue-100 h-8 w-8 rounded-full shrink-0">
                            <span className="text-blue-600 font-semibold">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-800 text-lg">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">{step.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                    Applications and Impact
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Healthcare",
                        desc: "Disease prediction and medical imaging analysis",
                        icon: "🏥"
                      },
                      {
                        title: "Finance",
                        desc: "Fraud detection and algorithmic trading",
                        icon: "💰"
                      },
                      {
                        title: "Transportation",
                        desc: "Autonomous vehicles and traffic prediction",
                        icon: "🚗"
                      },
                      {
                        title: "Entertainment",
                        desc: "Content recommendations and gaming AI",
                        icon: "🎮"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 + index * 0.2 }}
                      >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="font-semibold text-blue-800 text-xl mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module1/neural-networks">
                  <Button className="gap-2">
                    Next Topic: Neural Networks <ArrowRight className="h-4 w-4" />
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