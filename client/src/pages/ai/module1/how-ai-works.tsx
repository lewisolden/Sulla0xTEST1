import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Network, 
  Database, 
  Lightbulb,
  CheckCircle2,
  RefreshCcw,
  Code,
  Check,
  X
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Neural Network Animation Component
const NeuralNetworkDiagram = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [dataFlowAnimation, setDataFlowAnimation] = useState(false);

  // Trigger data flow animation periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setDataFlowAnimation(prev => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-inner">
      <div className="absolute top-4 left-4">
        <h3 className="text-blue-800 font-semibold mb-2">Interactive Neural Network</h3>
        <p className="text-sm text-gray-600">Click on nodes to see connections</p>
      </div>
      <motion.svg 
        viewBox="0 0 800 400" 
        className="w-full h-64 md:h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Input Layer */}
        {[0, 1, 2].map((i) => (
          <g key={`input-${i}`}>
            <motion.circle
              cx="100"
              cy={150 + i * 100}
              r="20"
              fill={activeNode === i ? "#60A5FA" : "#93C5FD"}
              stroke={activeNode === i ? "#2563EB" : "#1D4ED8"}
              strokeWidth="3"
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))" }}
              onClick={() => setActiveNode(i)}
              className="cursor-pointer"
            />
            <motion.text 
              x="85" 
              y={155 + i * 100} 
              fill={activeNode === i ? "#2563EB" : "#1E40AF"}
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              Input {i + 1}
            </motion.text>
          </g>
        ))}

        {/* Hidden Layer */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`hidden-${i}`}>
            <motion.circle
              cx="400"
              cy={100 + i * 80}
              r="20"
              fill={activeNode === i + 3 ? "#60A5FA" : "#93C5FD"}
              stroke={activeNode === i + 3 ? "#2563EB" : "#1D4ED8"}
              strokeWidth="3"
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))" }}
              onClick={() => setActiveNode(i + 3)}
              className="cursor-pointer"
            />
            <motion.text 
              x="385" 
              y={105 + i * 80} 
              fill={activeNode === i + 3 ? "#2563EB" : "#1E40AF"}
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              H{i + 1}
            </motion.text>
            {/* Connections from input to hidden layer */}
            {[0, 1, 2].map((j) => {
              const isActive = activeNode === j || activeNode === i + 3;
              return (
                <motion.g key={`conn-${i}-${j}`}>
                  <motion.line
                    x1="120"
                    y1={150 + j * 100}
                    x2="380"
                    y2={100 + i * 80}
                    stroke={isActive ? "#60A5FA" : "#BFDBFE"}
                    strokeWidth={isActive ? "3" : "2"}
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeWidth: isActive ? 3 : 2,
                      stroke: isActive ? "#60A5FA" : "#BFDBFE"
                    }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                  />
                  {dataFlowAnimation && isActive && (
                    <motion.circle
                      r="4"
                      fill="#2563EB"
                      initial={{ 
                        x: 120,
                        y: 150 + j * 100,
                        opacity: 0 
                      }}
                      animate={{ 
                        x: 380,
                        y: 100 + i * 80,
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "linear",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.g>
              );
            })}
          </g>
        ))}

        {/* Output Layer */}
        {[0, 1].map((i) => (
          <g key={`output-${i}`}>
            <motion.circle
              cx="700"
              cy={200 + i * 100}
              r="20"
              fill={activeNode === i + 7 ? "#60A5FA" : "#93C5FD"}
              stroke={activeNode === i + 7 ? "#2563EB" : "#1D4ED8"}
              strokeWidth="3"
              whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))" }}
              onClick={() => setActiveNode(i + 7)}
              className="cursor-pointer"
            />
            <motion.text 
              x="685" 
              y={205 + i * 100} 
              fill={activeNode === i + 7 ? "#2563EB" : "#1E40AF"}
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.2 }}
            >
              Out {i + 1}
            </motion.text>
            {/* Connections from hidden to output layer */}
            {[0, 1, 2, 3].map((j) => {
              const isActive = activeNode === j + 3 || activeNode === i + 7;
              return (
                <motion.g key={`conn-out-${i}-${j}`}>
                  <motion.line
                    x1="420"
                    y1={100 + j * 80}
                    x2="680"
                    y2={200 + i * 100}
                    stroke={isActive ? "#60A5FA" : "#BFDBFE"}
                    strokeWidth={isActive ? "3" : "2"}
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeWidth: isActive ? 3 : 2,
                      stroke: isActive ? "#60A5FA" : "#BFDBFE"
                    }}
                    transition={{ duration: 2, delay: (i + j) * 0.2 }}
                  />
                  {dataFlowAnimation && isActive && (
                    <motion.circle
                      r="4"
                      fill="#2563EB"
                      initial={{ 
                        x: 420,
                        y: 100 + j * 80,
                        opacity: 0 
                      }}
                      animate={{ 
                        x: 680,
                        y: 200 + i * 100,
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "linear",
                        times: [0, 0.5, 1],
                        repeat: Infinity
                      }}
                    />
                  )}
                </motion.g>
              );
            })}
          </g>
        ))}
      </motion.svg>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Input Layer</span>
          <span>Hidden Layer</span>
          <span>Output Layer</span>
        </div>
      </div>
    </div>
  );
};

// Machine Learning Process Animation
const MLProcessDiagram = () => {
  const [step, setStep] = useState(0);
  const steps = ['Data Collection', 'Preprocessing', 'Training', 'Evaluation', 'Deployment'];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full p-4 bg-blue-50 rounded-lg">
      <motion.div className="flex justify-between items-center">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            className={`flex flex-col items-center ${
              i === step ? 'text-blue-600' : 'text-gray-400'
            }`}
            animate={{
              scale: i === step ? 1.1 : 1,
              opacity: i === step ? 1 : 0.5,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
              {i === 0 && <Database className="w-6 h-6" />}
              {i === 1 && <RefreshCcw className="w-6 h-6" />}
              {i === 2 && <Brain className="w-6 h-6" />}
              {i === 3 && <CheckCircle2 className="w-6 h-6" />}
              {i === 4 && <Code className="w-6 h-6" />}
            </div>
            <span className="text-sm font-medium">{s}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="h-2 bg-blue-200 mt-4 rounded-full overflow-hidden"
        initial={{ width: '0%' }}
      >
        <motion.div
          className="h-full bg-blue-600"
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function HowAIWorks() {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null as number | null,
    isCorrect: false,
    showExplanation: false,
  });
  const { updateProgress } = useProgress();

  const questions: QuizQuestion[] = [
    {
      question: "Which component of a neural network processes the initial input data?",
      options: [
        "Output Layer",
        "Hidden Layer",
        "Input Layer",
        "Processing Layer"
      ],
      correct: 2,
      explanation: "The Input Layer is the first layer of a neural network that receives and processes the raw input data before passing it to the hidden layers."
    },
    {
      question: "What is the primary purpose of the hidden layers in a neural network?",
      options: [
        "To store the final output",
        "To process and transform the input data",
        "To collect input data",
        "To display results"
      ],
      correct: 1,
      explanation: "Hidden layers process and transform the input data through various mathematical operations, helping the network learn complex patterns and features."
    },
    {
      question: "Which step in the machine learning process involves cleaning and organizing the data?",
      options: [
        "Deployment",
        "Training",
        "Preprocessing",
        "Evaluation"
      ],
      correct: 2,
      explanation: "Preprocessing is the crucial step where raw data is cleaned, organized, and transformed into a format suitable for training the machine learning model."
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
        updateProgress(1, 'how-ai-works', true);
      }
    }, 2000);
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              {!showResults ? (
                <motion.div
                  className="space-y-4"
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
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                    Quiz Completed!
                  </h2>
                  <p className="text-lg mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {score === questions.length
                      ? "Perfect score! You've mastered how AI works!"
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
                    >
                      Back to Content
                    </Button>
                    <Link href="/ai/module1/ai-applications">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
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

        <Card>
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  How AI Works: Understanding the Basics
                </h1>
              </div>

              <div className="prose max-w-none">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Network className="h-6 w-6" />
                    Neural Networks: The Building Blocks
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Neural networks are the foundation of modern AI systems. They consist of
                    interconnected nodes (neurons) organized in layers that process and
                    transform data to learn patterns and make decisions.
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
                    <NeuralNetworkDiagram />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Database className="h-6 w-6" />
                    Machine Learning Process
                  </h2>
                  <p className="text-gray-700 mb-4">
                    The machine learning process involves several key steps, from data
                    collection to model deployment. Each step is crucial for creating
                    effective AI systems.
                  </p>
                  <MLProcessDiagram />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    Key Concepts
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Training",
                        desc: "The process of teaching the model using example data"
                      },
                      {
                        title: "Inference",
                        desc: "Using the trained model to make predictions"
                      },
                      {
                        title: "Backpropagation",
                        desc: "Algorithm for optimizing neural network weights"
                      },
                      {
                        title: "Activation Functions",
                        desc: "Mathematical operations that introduce non-linearity"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-blue-50 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.2 }}
                      >
                        <h3 className="font-semibold text-blue-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module1/ai-applications">
                  <Button className="gap-2">
                    Next Topic <ArrowRight className="h-4 w-4" />
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