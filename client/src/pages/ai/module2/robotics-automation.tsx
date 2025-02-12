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
  Check,
  X,
  RefreshCcw,
  Play,
  Pause,
  RotateCcw
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
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="aspect-video bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg relative">
          <motion.div
            className="absolute left-1/2 top-1/2 w-40 h-2 bg-gray-700 origin-left"
            style={{ rotate: angle1 }}
          >
            <motion.div
              className="absolute right-0 w-32 h-2 bg-gray-800 origin-left"
              style={{ rotate: angle2 }}
            >
              <div className="absolute right-0 w-4 h-4 bg-red-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="gap-2"
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
            className="gap-2"
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
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-full flex items-center">
            {items.map((id, index) => (
              <motion.div
                key={id}
                className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: index * 100, opacity: 1 }}
                exit={{ x: 600, opacity: 0 }}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="mt-4 gap-2"
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
    { title: "Input", icon: Factory },
    { title: "Processing", icon: Cog },
    { title: "Assembly", icon: Bot },
    { title: "Quality Check", icon: Workflow }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center z-10 ${
                index === activeStep ? "text-blue-600" : "text-gray-400"
              }`}
              animate={{
                scale: index === activeStep ? 1.1 : 1,
                opacity: index === activeStep ? 1 : 0.7,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 border-2 border-current">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </motion.div>
          );
        })}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-blue-600"
            animate={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
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
        updateProgress('ai-module2', {
          sectionId: 'robotics-automation',
          completed: true,
          score: Math.round((score / questions.length) * 100)
        });
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
                    >
                      Back to Content
                    </Button>
                    <Link href="/ai/module2/ai-ethics">
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
          <Link href="/ai/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
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
                <Bot className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Robotics and Automation
                </h1>
              </div>

              <div className="prose max-w-none">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding Robotics and Automation
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Robotic Arm Simulation
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Assembly Line Automation
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Industrial Manufacturing",
                        desc: "Automated assembly lines and quality control"
                      },
                      {
                        title: "Healthcare",
                        desc: "Surgical robots and automated diagnostics"
                      },
                      {
                        title: "Logistics",
                        desc: "Warehouse automation and package sorting"
                      },
                      {
                        title: "Agriculture",
                        desc: "Automated harvesting and crop monitoring"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-blue-50 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
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
                <Link href="/ai/module2/ai-ethics">
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