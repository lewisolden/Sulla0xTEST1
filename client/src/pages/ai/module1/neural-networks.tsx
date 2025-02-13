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
  Network,
  Layers,
  GitBranch,
  Activity,
  Check,
  X,
  Lightbulb,
  Cpu
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

const LayerCard = ({
  title,
  description,
  icon: Icon,
  examples,
  delay,
  gradient = "bg-gradient-to-br from-blue-500 to-blue-700"
}: {
  title: string;
  description: string;
  icon: any;
  examples: string[];
  delay: number;
  gradient?: string;
}) => {
  return (
    <motion.div
      className={`${gradient} rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/90 mb-6 leading-relaxed">{description}</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h4 className="font-semibold text-white mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {examples.map((example, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2 text-white/90"
              >
                <div className="h-1.5 w-1.5 bg-white rounded-full"></div>
                <span>{example}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function NeuralNetworks() {
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
      question: "What is a neural network?",
      options: [
        "A computer networking protocol",
        "A biological brain structure",
        "A machine learning model inspired by the human brain",
        "A type of computer hardware"
      ],
      correct: 2,
      explanation: "Neural networks are machine learning models inspired by the structure and function of biological neural networks in the human brain."
    },
    {
      question: "Which of these is NOT a typical layer in a neural network?",
      options: [
        "Input Layer",
        "Hidden Layer",
        "Storage Layer",
        "Output Layer"
      ],
      correct: 2,
      explanation: "Neural networks typically consist of input layers, hidden layers, and output layers. Storage layers are not a standard component."
    },
    {
      question: "What is the purpose of activation functions in neural networks?",
      options: [
        "To store data",
        "To introduce non-linearity",
        "To connect to the internet",
        "To save the model"
      ],
      correct: 1,
      explanation: "Activation functions introduce non-linearity into the network, allowing it to learn complex patterns and relationships in the data."
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
          sectionId: 'neural-networks',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 5,
          currentSection: 5,
          nextModule: 'module1-quiz'
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
                    Quiz Completed!
                  </h2>
                  <p className="text-lg mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {score === questions.length
                      ? "Perfect score! You've mastered Neural Networks!"
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
                    <Link href="/ai/module1/quiz">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        Take Module Quiz <ArrowRight className="h-4 w-4" />
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
              <div className="flex items-center gap-4 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
                <Network className="h-12 w-12" />
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Neural Networks
                  </h1>
                  <p className="text-white/90">
                    Understanding the architecture and functionality of artificial neural networks
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
                    Understanding Neural Networks
                  </h2>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl text-white">
                    <p className="text-white/90 leading-relaxed">
                      Neural networks are computing systems inspired by biological neural networks in human brains. They consist of interconnected nodes (neurons) organized in layers that can learn patterns from data.
                    </p>
                    <motion.div 
                      className="mt-6 grid grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {[
                        { icon: Brain, text: "Inspired by human brain" },
                        { icon: Network, text: "Interconnected nodes" },
                        { icon: Cpu, text: "Pattern learning" }
                      ].map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-blue-400" />
                          <span className="text-white/80 text-sm">{item.text}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Layers className="h-6 w-6" />
                    Network Architecture
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <LayerCard
                      title="Input Layer"
                      description="Receives and processes initial data"
                      icon={Network}
                      examples={[
                        "Image pixels",
                        "Text embeddings",
                        "Numerical features",
                        "Sensor data"
                      ]}
                      delay={0.6}
                      gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                    />
                    <LayerCard
                      title="Hidden Layers"
                      description="Processes and transforms data through multiple stages"
                      icon={Layers}
                      examples={[
                        "Feature extraction",
                        "Pattern recognition",
                        "Representation learning",
                        "Data transformation"
                      ]}
                      delay={0.7}
                      gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                    />
                    <LayerCard
                      title="Output Layer"
                      description="Produces final predictions or outputs"
                      icon={Activity}
                      examples={[
                        "Classification results",
                        "Regression values",
                        "Generated content",
                        "Decision scores"
                      ]}
                      delay={0.8}
                      gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
                    />
                    <LayerCard
                      title="Activation Functions"
                      description="Introduces non-linearity into the network"
                      icon={GitBranch}
                      examples={[
                        "ReLU",
                        "Sigmoid",
                        "Tanh",
                        "Softmax"
                      ]}
                      delay={0.9}
                      gradient="bg-gradient-to-br from-cyan-500 to-cyan-700"
                    />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    Training Process
                  </h2>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg p-8 text-white">
                    <ol className="space-y-6">
                      {[
                        {
                          title: "Forward Propagation",
                          desc: "Data flows through the network from input to output",
                          icon: "➡️"
                        },
                        {
                          title: "Loss Calculation",
                          desc: "Measuring prediction errors",
                          icon: "📊"
                        },
                        {
                          title: "Backpropagation",
                          desc: "Error signals flow backwards to update weights",
                          icon: "⬅️"
                        },
                        {
                          title: "Weight Updates",
                          desc: "Network parameters are adjusted to minimize errors",
                          icon: "🔄"
                        }
                      ].map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm h-12 w-12 rounded-full shrink-0">
                            <span className="text-2xl">{step.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-lg mb-1">
                              {step.title}
                            </h3>
                            <p className="text-white/80">{step.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </motion.section>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module1/quiz">
                  <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Module Quiz <ArrowRight className="h-4 w-4" />
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