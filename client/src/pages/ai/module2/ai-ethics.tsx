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
  Eye
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Ethical Decision Simulator
const EthicalDecisionSimulator = () => {
  const [scenario, setScenario] = useState(0);
  const [decision, setDecision] = useState<number | null>(null);
  const [showImpact, setShowImpact] = useState(false);

  const scenarios = [
    {
      title: "Facial Recognition Deployment",
      description: "A city wants to implement facial recognition for public safety. How would you proceed?",
      options: [
        {
          text: "Deploy widely with minimal restrictions",
          impact: "Increased security but significant privacy concerns and potential misuse of data"
        },
        {
          text: "Limited deployment with strict oversight",
          impact: "Balance between security and privacy, with transparent governance"
        },
        {
          text: "Focus on alternative solutions",
          impact: "Preserves privacy but may miss security benefits of the technology"
        }
      ]
    },
    {
      title: "AI in Healthcare Decisions",
      description: "An AI system is being developed to prioritize patient care. What approach should be taken?",
      options: [
        {
          text: "Pure efficiency-based decisions",
          impact: "Maximizes resource utilization but may perpetuate existing biases"
        },
        {
          text: "Balanced approach with human oversight",
          impact: "Slower but more equitable decisions with human judgment"
        },
        {
          text: "Advisory role only",
          impact: "Safer but doesn't fully utilize AI capabilities"
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

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-6 rounded-lg">
        <motion.div
          key={scenario}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-blue-800">
            {scenarios[scenario].title}
          </h3>
          <p className="text-gray-700 mb-4">{scenarios[scenario].description}</p>
          <div className="space-y-3">
            {scenarios[scenario].options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={decision === index ? "default" : "outline"}
                  className="w-full text-left justify-start p-4"
                  onClick={() => handleDecision(index)}
                  disabled={showImpact}
                >
                  {option.text}
                </Button>
                {showImpact && decision === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-3 bg-blue-100 rounded-md text-sm text-blue-800"
                  >
                    Impact: {option.impact}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          {showImpact && (
            <Button
              onClick={nextScenario}
              className="mt-4 w-full"
            >
              Next Scenario
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Bias Visualization Component
const BiasVisualizationDemo = () => {
  const [biasLevel, setBiasLevel] = useState(50);
  const [showingEffect, setShowingEffect] = useState(false);
  
  const startVisualization = () => {
    setShowingEffect(true);
    setTimeout(() => setShowingEffect(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">
            Dataset Bias Level
          </label>
          <Slider
            value={[biasLevel]}
            onValueChange={(value) => setBiasLevel(value[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div className="aspect-video bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {showingEffect ? (
              <motion.div
                className="grid grid-cols-5 gap-2 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: 25 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                      i < (25 * biasLevel) / 100
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                  />
                ))}
              </motion.div>
            ) : (
              <Button onClick={startVisualization}>
                Visualize Bias Effect
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ethics Framework Visualization
const EthicsFrameworkVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Fairness", icon: Scale },
    { title: "Privacy", icon: Lock },
    { title: "Transparency", icon: Eye },
    { title: "Accountability", icon: Shield }
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
        updateProgress('ai-module2', {
          sectionId: 'ai-ethics',
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