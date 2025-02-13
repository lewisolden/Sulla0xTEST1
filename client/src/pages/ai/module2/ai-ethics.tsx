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
  Shield,
  Scale,
  Users,
  AlertTriangle,
  Check,
  X,
  RefreshCcw,
  Lock,
  Eye,
  Brain,
  Network
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Particle Animation Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Ethical Decision Simulator
const EthicalDecisionSimulator = () => {
  const [scenario, setScenario] = useState(0);
  const [decision, setDecision] = useState<number | null>(null);
  const [showImpact, setShowImpact] = useState(false);

  const scenarios = [
    {
      title: "Facial Recognition Deployment",
      description: "A city wants to implement facial recognition for public safety. How would you proceed?",
      icon: Eye,
      options: [
        {
          text: "Deploy widely with minimal restrictions",
          impact: "Increased security but significant privacy concerns and potential misuse of data",
          color: "from-red-500 to-orange-500"
        },
        {
          text: "Limited deployment with strict oversight",
          impact: "Balance between security and privacy, with transparent governance",
          color: "from-green-500 to-emerald-500"
        },
        {
          text: "Focus on alternative solutions",
          impact: "Preserves privacy but may miss security benefits of the technology",
          color: "from-blue-500 to-indigo-500"
        }
      ]
    },
    {
      title: "AI in Healthcare Decisions",
      description: "An AI system is being developed to prioritize patient care. What approach should be taken?",
      icon: Brain,
      options: [
        {
          text: "Pure efficiency-based decisions",
          impact: "Maximizes resource utilization but may perpetuate existing biases",
          color: "from-purple-500 to-pink-500"
        },
        {
          text: "Balanced approach with human oversight",
          impact: "Slower but more equitable decisions with human judgment",
          color: "from-cyan-500 to-blue-500"
        },
        {
          text: "Advisory role only",
          impact: "Safer but doesn't fully utilize AI capabilities",
          color: "from-yellow-500 to-orange-500"
        }
      ]
    }
  ];

  const handleDecision = (index: number) => {
    setDecision(index);
    setShowImpact(true);
  };

  const nextScenario = () => {
    setScenario((prev) => (prev + 1) % scenarios.length);
    setDecision(null);
    setShowImpact(false);
  };

  const currentScenario = scenarios[scenario];
  const Icon = currentScenario.icon;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900/90 to-blue-900/90 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 shadow-xl">
        <motion.div
          key={scenario}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentScenario.title}
              </h3>
              <p className="text-blue-200">{currentScenario.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {currentScenario.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full text-left justify-start p-6 relative overflow-hidden group transition-all duration-300 
                    ${decision === index ? 'border-blue-500' : 'border-blue-800'} 
                    hover:border-blue-400`}
                  onClick={() => !showImpact && handleDecision(index)}
                  disabled={showImpact}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4">
                      <span className="text-lg">{option.text}</span>
                    </div>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300
                    ${decision === index ? 'opacity-20' : ''}`} />
                </Button>
                {showImpact && decision === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 p-4 rounded-lg bg-gradient-to-r ${option.color} bg-opacity-10 border border-blue-500/20`}
                  >
                    <p className="text-blue-200">{option.impact}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          {showImpact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={nextScenario}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                Next Scenario
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Bias Visualization Demo
const BiasVisualizationDemo = () => {
  const [biasLevel, setBiasLevel] = useState(50);
  const [showingEffect, setShowingEffect] = useState(false);

  const startVisualization = () => {
    setShowingEffect(true);
    setTimeout(() => setShowingEffect(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900/90 to-blue-900/90 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 shadow-xl">
        <div className="mb-6">
          <label className="text-lg font-medium mb-3 block text-blue-200">
            Dataset Bias Level
          </label>
          <Slider
            value={[biasLevel]}
            onValueChange={(value) => setBiasLevel(value[0])}
            min={0}
            max={100}
            step={1}
            className="py-4"
          />
        </div>
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-blue-900 rounded-xl relative overflow-hidden border border-blue-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {showingEffect ? (
              <motion.div
                className="grid grid-cols-8 gap-3 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                      i < (64 * biasLevel) / 100
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: i * 0.01,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <Button
                onClick={startVisualization}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                Visualize Bias Effect
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Ethics Framework Visualization
const EthicsFrameworkVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { 
      title: "Fairness",
      icon: Scale,
      description: "Ensuring equal treatment and opportunities",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Privacy",
      icon: Lock,
      description: "Protecting sensitive information",
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "Transparency",
      icon: Eye,
      description: "Clear and understandable AI decisions",
      color: "from-green-500 to-emerald-600"
    },
    { 
      title: "Accountability",
      icon: Shield,
      description: "Taking responsibility for AI outcomes",
      color: "from-orange-500 to-red-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-900/90 to-blue-900/90 rounded-xl backdrop-blur-sm border border-blue-500/20 shadow-xl">
      <div className="flex justify-between relative px-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center z-10 ${
                isActive ? "text-white" : "text-blue-300"
              }`}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                  isActive ? step.color : "from-gray-700 to-gray-800"
                } flex items-center justify-center mb-4 shadow-lg ${
                  isActive ? "shadow-blue-500/30" : ""
                }`}
                animate={{
                  rotate: isActive ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Icon className={`w-10 h-10 ${isActive ? "text-white" : "text-gray-400"}`} />
              </motion.div>
              <span className="text-lg font-semibold mb-2">{step.title}</span>
              <span className="text-sm text-center max-w-[150px] text-blue-200">
                {step.description}
              </span>
              {isActive && (
                <motion.div
                  className="w-2 h-2 bg-blue-500 rounded-full mt-4"
                  layoutId="indicator"
                />
              )}
            </motion.div>
          );
        })}
        <div className="absolute top-10 left-0 w-full h-1 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
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

export default function AIEthics() {
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
      question: "Which principle ensures AI systems treat all individuals fairly?",
      options: [
        "Maximum efficiency",
        "Fairness and non-discrimination",
        "Rapid deployment",
        "Cost optimization"
      ],
      correct: 1,
      explanation: "Fairness and non-discrimination is a fundamental ethical principle in AI, ensuring systems don't perpetuate or amplify existing biases."
    },
    {
      question: "What is the primary purpose of AI transparency?",
      options: [
        "Increase processing speed",
        "Reduce development costs",
        "Enable understanding of AI decisions",
        "Maximize data collection"
      ],
      correct: 2,
      explanation: "Transparency allows stakeholders to understand how AI systems make decisions, building trust and accountability."
    },
    {
      question: "Which is NOT a key consideration in AI ethics?",
      options: [
        "Privacy protection",
        "Maximizing profit",
        "Accountability",
        "Social impact"
      ],
      correct: 1,
      explanation: "While business viability is important, maximizing profit should not override ethical considerations in AI development."
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
          sectionId: 'ai-ethics',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 4,
          currentSection: 4
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
                      ? "Perfect score! You've mastered AI ethics concepts!"
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
                    <Link href="/ai/module2">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        Complete Module <ArrowRight className="h-4 w-4" />
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
    <div className="container mx-auto px-4 py-8 relative">
      <ParticleBackground /> {/* Added Particle Background */}
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
                <Shield className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  AI Ethics and Safety
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
                    Understanding AI Ethics
                  </h2>
                  <p className="text-gray-700 mb-4">
                    AI ethics encompasses the moral principles and guidelines that
                    govern the development and deployment of artificial intelligence
                    systems. These principles ensure AI benefits society while
                    minimizing potential harm.
                  </p>
                  <EthicsFrameworkVisualization />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Ethical Decision Making
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Explore how ethical principles are applied in real-world AI
                    scenarios. Make decisions and see their potential impacts on
                    different stakeholders.
                  </p>
                  <EthicalDecisionSimulator />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Bias in AI Systems
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Understanding and addressing bias in AI systems is crucial for
                    developing fair and equitable solutions. This demonstration
                    shows how bias can affect AI outcomes.
                  </p>
                  <BiasVisualizationDemo />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Ethical Principles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Fairness",
                        desc: "Ensuring AI systems treat all individuals equitably"
                      },
                      {
                        title: "Transparency",
                        desc: "Making AI decision-making processes understandable"
                      },
                      {
                        title: "Privacy",
                        desc: "Protecting individual data and rights"
                      },
                      {
                        title: "Accountability",
                        desc: "Taking responsibility for AI outcomes"
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
                <Link href="/ai/module2/quiz">
                  <Button className="gap-2">
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