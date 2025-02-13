import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Cog,
  Factory,
  Workflow,
  Box,
  Eye,
  Check,
  X,
  RefreshCcw,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  CircuitBoard,
  Boxes,
  GitBranch
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Robot Arm Simulation Component
const RobotArmSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setAngle1(prev => (prev + 2) % 360);
        setAngle2(prev => (prev + 3) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-xl backdrop-blur-sm border border-blue-300/20">
        <div className="aspect-video bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl relative overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 w-40 h-3 bg-gradient-to-r from-gray-700 to-gray-800 origin-left rounded-full shadow-lg"
            style={{ rotate: angle1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <motion.div
              className="absolute right-0 w-32 h-3 bg-gradient-to-r from-gray-800 to-gray-900 origin-left rounded-full shadow-lg"
              style={{ rotate: angle2 }}
            >
              <motion.div
                className="absolute right-0 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg"
                animate={{
                  scale: isRunning ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setAngle1(0);
              setAngle2(0);
            }}
            className="gap-2 border-blue-500 text-blue-400 hover:text-blue-300"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

// Assembly Line Animation
const AssemblyLineSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setItems(prev => {
          const newItems = [...prev];
          if (newItems.length < 5) {
            newItems.push(Date.now());
          } else {
            newItems.shift();
            newItems.push(Date.now());
          }
          return newItems;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-xl backdrop-blur-sm border border-blue-300/20">
        <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{
              backgroundPosition: isRunning ? "100% 0%" : "0% 0%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)"
            }}
          />
          <div className="absolute inset-y-0 left-0 w-full flex items-center">
            <AnimatePresence>
              {items.map((id, index) => (
                <motion.div
                  key={id}
                  className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-blue-300 shadow-lg border border-gray-600"
                  initial={{ x: -100, opacity: 0, scale: 0.5 }}
                  animate={{ x: index * 120, opacity: 1, scale: 1 }}
                  exit={{ x: 800, opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 12 }}
                >
                  <span className="text-xl font-bold">{index + 1}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="mt-6 gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none w-full"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Stop Assembly
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Start Assembly
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

// Automation Pipeline Visualization
const AutomationPipelineVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Input", icon: Factory, desc: "Raw materials and data input" },
    { title: "Processing", icon: Cog, desc: "Automated processing and transformation" },
    { title: "Assembly", icon: Bot, desc: "Robotic assembly and integration" },
    { title: "Quality Check", icon: Workflow, desc: "Automated quality assurance" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-12 px-4 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl border border-blue-300/20 backdrop-blur-sm">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center z-10 ${
                isActive ? "text-blue-400" : "text-gray-500"
              }`}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                isActive ? "from-blue-500 to-indigo-600" : "from-gray-700 to-gray-800"
              } flex items-center justify-center mb-3 shadow-lg ${
                isActive ? "shadow-blue-500/30" : ""
              } transition-all duration-300`}>
                <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-gray-400"}`} />
              </div>
              <span className="text-sm font-medium mb-1">{step.title}</span>
              <span className="text-xs text-gray-400 text-center max-w-[120px]">{step.desc}</span>
            </motion.div>
          );
        })}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
            animate={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function RoboticsAutomation() {
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
      question: "Which component is essential for a robot to interact with its environment?",
      options: [
        "Social media interface",
        "Sensors and actuators",
        "Web browser",
        "Email client"
      ],
      correct: 1,
      explanation: "Sensors and actuators are crucial for robots to perceive and interact with their environment. Sensors gather data about the surroundings, while actuators enable physical movement and manipulation."
    },
    {
      question: "What is the primary benefit of industrial automation?",
      options: [
        "Reduced social interaction",
        "Increased production efficiency",
        "More paperwork",
        "Higher energy consumption"
      ],
      correct: 1,
      explanation: "Industrial automation primarily increases production efficiency by enabling consistent, high-speed operations with minimal errors and reduced downtime."
    },
    {
      question: "Which of these is NOT typically a component of an automated manufacturing system?",
      options: [
        "Robotic arms",
        "Conveyor belts",
        "Social media manager",
        "Quality control sensors"
      ],
      correct: 2,
      explanation: "A social media manager is not a component of automated manufacturing systems. The other options are common components that handle physical operations and quality control."
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
        updateProgress({
          moduleId: 'ai-module2',
          sectionId: 'robotics-automation',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 4,
          currentSection: 3,
          nextModule: 'ai-ethics'
        });
      }
    }, 2000);
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none bg-gradient-to-br from-gray-900 to-blue-900">
            <CardContent className="p-8">
              {!showResults ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setShowQuiz(false)}
                    className="mb-4 text-blue-300 hover:text-blue-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
                  </Button>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-blue-300 mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <p className="text-lg mb-6 text-blue-100">
                    {questions[currentQuestion].question}
                  </p>
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
                                  ? "bg-green-900/30 border-green-500 hover:bg-green-900/30 text-green-300"
                                  : "bg-red-900/30 border-red-500 hover:bg-red-900/30 text-red-300"
                                : "hover:bg-blue-800/30 text-blue-200 border-blue-700"
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
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-500" />
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
                        answerState.isCorrect ? "bg-green-900/30" : "bg-red-900/30"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          answerState.isCorrect ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {answerState.isCorrect ? "Correct!" : "Incorrect."}
                      </p>
                      <p className="mt-2 text-blue-200">
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
                  <div className="mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">
                    Quiz Completed!
                  </h2>
                  <p className="text-xl mb-4 text-blue-200">
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-blue-300 mb-6">
                    {score === questions.length
                      ? "Perfect score! You've mastered robotics and automation concepts!"
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
                      className="border-blue-600 text-blue-300 hover:bg-blue-900/30"
                    >
                      Back to Content
                    </Button>
                    <Link href="/ai/module2/ai-ethics">
                      <Button className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none">
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
          <Link href="/ai/module2">
            <Button variant="ghost" className="gap-2 text-blue-300 hover:text-blue-200">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none bg-gradient-to-br from-gray-900 to-blue-900">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Robotics and Automation
                  </h1>
                  <p className="text-blue-200">
                    Explore how AI powers modern robotics and automation systems
                  </p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-300">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Understanding Robotics and Automation
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Robotics and automation represent the intersection of artificial
                    intelligence and physical systems. These technologies enable
                    machines to perform complex tasks with precision, efficiency, and
                    consistency, transforming industries from manufacturing to
                    healthcare.
                  </p>
                  <AutomationPipelineVisualization />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Robotic Arm Simulation
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Experience how robotic arms operate in industrial settings. This
                    simulation demonstrates basic movement patterns and control
                    systems used in manufacturing and assembly processes.
                  </p>
                  <RobotArmSimulation />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Assembly Line Automation
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Modern assembly lines combine robotics, sensors, and AI to
                    achieve high-speed, precise production. Watch this simulation of
                    an automated assembly line in action.
                  </p>
                  <AssemblyLineSimulation />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Industrial Manufacturing",
                        desc: "Automated assembly lines and quality control",
                        icon: Factory,
                        gradient: "from-blue-500 to-blue-700"
                      },
                      {
                        title: "Smart Automation",
                        desc: "Intelligent process control and optimization",
                        icon: Cpu,
                        gradient: "from-indigo-500 to-indigo-700"
                      },
                      {
                        title: "Robotic Systems",
                        desc: "Advanced robotics and control systems",
                        icon: CircuitBoard,
                        gradient: "from-purple-500 to-purple-700"
                      },
                      {
                        title: "Logistics & Supply Chain",
                        desc: "Automated warehousing and distribution",
                        icon: Boxes,
                        gradient: "from-pink-500 to-pink-700"
                      }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          className={`bg-gradient-to-br ${item.gradient} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + index * 0.2 }}
                        >
                          <div className="bg-white/10 p-3 rounded-lg w-fit mb-4">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-white text-lg mb-2">
                            {item.title}
                          </h3>
                          <p className="text-blue-100 text-sm">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module2/ai-ethics">
                  <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none">
                    Next Topic <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}