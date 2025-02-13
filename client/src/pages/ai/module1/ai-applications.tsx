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
  MessageSquare,
  Image as ImageIcon,
  Car,
  Stethoscope,
  Bot,
  ShieldCheck,
  Code2,
  Check,
  X,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Cpu,
  Settings,
  Shield,
  Scale,
  MessageCircle,
  Palette,
  Database,
  Cloud,
  Atom
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Interactive AI Application Card Component
const ApplicationCard = ({
  title,
  description,
  icon: Icon,
  examples,
  delay,
  gradient
}: {
  title: string;
  description: string;
  icon: any;
  examples: string[];
  delay: number;
  gradient: string;
}) => {
  return (
    <motion.div
      className={`rounded-xl shadow-lg p-6 relative overflow-hidden ${gradient}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
          <h4 className="font-semibold text-white mb-3">Key Applications:</h4>
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

// AI Impact Visualization Component
const ImpactVisualization = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { title: "Business", value: 85 },
    { title: "Healthcare", value: 78 },
    { title: "Education", value: 72 },
    { title: "Transportation", value: 68 },
    { title: "Entertainment", value: 65 }
  ];

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          className="relative"
          onHoverStart={() => setActiveSection(index)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-800">{section.title}</span>
            <span className="text-blue-600">{section.value}%</span>
          </div>
          <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{
                width: `${section.value}%`,
                transition: { duration: 1, delay: index * 0.2 }
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function AIApplications() {
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
      question: "Which AI application is primarily used in autonomous vehicles?",
      options: [
        "Natural Language Processing",
        "Computer Vision",
        "Audio Processing",
        "Quantum Computing"
      ],
      correct: 1,
      explanation: "Computer Vision is crucial for autonomous vehicles as it helps them perceive and understand their environment through visual data from cameras and sensors."
    },
    {
      question: "What is the main application of Natural Language Processing (NLP)?",
      options: [
        "Image Recognition",
        "Financial Trading",
        "Language Translation and Understanding",
        "Robot Control"
      ],
      correct: 2,
      explanation: "Natural Language Processing (NLP) is primarily used for tasks involving human language, such as translation, chatbots, and text analysis."
    },
    {
      question: "In healthcare, AI is commonly used for:",
      options: [
        "Social Media Management",
        "Game Development",
        "Weather Forecasting",
        "Disease Diagnosis and Treatment Planning"
      ],
      correct: 3,
      explanation: "AI in healthcare is primarily used for disease diagnosis, treatment planning, and analyzing medical images to assist healthcare professionals."
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
          sectionId: 'ai-applications',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 4,
          currentSection: 3,
          nextModule: 'machine-learning-basics'
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
                      ? "Perfect score! You've mastered AI applications!"
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
                    <Link href="/ai/module1/machine-learning-basics">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        Next Topic: Machine Learning <ArrowRight className="h-4 w-4" />
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
                <Brain className="h-12 w-12" />
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    AI Applications in the Real World
                  </h1>
                  <p className="text-white/90">
                    Discover how artificial intelligence is transforming industries and enhancing our daily lives
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
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    Key Application Areas
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ApplicationCard
                      title="Natural Language Processing"
                      description="AI systems that understand, interpret, and generate human language"
                      icon={MessageSquare}
                      examples={[
                        "Language Translation",
                        "Chatbots and Virtual Assistants",
                        "Text Analysis and Generation",
                        "Speech Recognition"
                      ]}
                      delay={0.3}
                      gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                    />
                    <ApplicationCard
                      title="Computer Vision"
                      description="Systems that can understand and process visual information"
                      icon={ImageIcon}
                      examples={[
                        "Facial Recognition",
                        "Object Detection",
                        "Medical Image Analysis",
                        "Autonomous Vehicles"
                      ]}
                      delay={0.4}
                      gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                    />
                    <ApplicationCard
                      title="Robotics"
                      description="AI-powered machines that can perform physical tasks"
                      icon={Bot}
                      examples={[
                        "Manufacturing Automation",
                        "Warehouse Operations",
                        "Surgical Robots",
                        "Home Assistance Robots"
                      ]}
                      delay={0.5}
                      gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
                    />
                    <ApplicationCard
                      title="Healthcare"
                      description="AI applications in medical diagnosis and treatment"
                      icon={Stethoscope}
                      examples={[
                        "Disease Diagnosis",
                        "Drug Discovery",
                        "Patient Care Planning",
                        "Medical Image Analysis"
                      ]}
                      delay={0.6}
                      gradient="bg-gradient-to-br from-cyan-500 to-cyan-700"
                    />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Industry Impact
                  </h2>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl text-white">
                    <p className="text-white/90 mb-6 leading-relaxed">
                      AI's impact across different industries continues to grow,
                      transforming how businesses operate and deliver value to customers.
                    </p>
                    <ImpactVisualization />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6" />
                    Emerging Trends
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Edge AI",
                        desc: "AI processing on local devices for faster response times",
                        icon: Cpu
                      },
                      {
                        title: "AutoML",
                        desc: "Automated machine learning model development",
                        icon: Settings
                      },
                      {
                        title: "Explainable AI",
                        desc: "Making AI decisions more transparent and interpretable",
                        icon: Lightbulb
                      },
                      {
                        title: "AI Ethics",
                        desc: "Ensuring responsible and fair AI development",
                        icon: Shield
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-sm transform transition-all duration-300 hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                            <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-100">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    Popular AI Platforms
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "ChatGPT",
                        desc: "OpenAI's advanced language model capable of human-like conversations, coding assistance, and creative writing",
                        url: "https://chat.openai.com",
                        icon: MessageCircle
                      },
                      {
                        title: "DALL-E",
                        desc: "OpenAI's AI system that creates realistic images and art from natural language descriptions",
                        url: "https://openai.com/dall-e-3",
                        icon: Palette
                      },
                      {
                        title: "Midjourney",
                        desc: "AI-powered tool that generates high-quality images from text descriptions, known for artistic and creative outputs",
                        url: "https://www.midjourney.com",
                        icon: ImageIcon
                      },
                      {
                        title: "Claude",
                        desc: "Anthropic's AI assistant known for detailed analysis, writing, and coding with strong ethical considerations",
                        url: "https://www.anthropic.com/claude",
                        icon: Bot
                      },
                      {
                        title: "Google Gemini",
                        desc: "Google's multimodal AI model that can understand and process text, images, and code simultaneously",
                        url: "https://gemini.google.com",
                        icon: Brain
                      },
                      {
                        title: "DeepSeek",
                        desc: "Advanced language model focused on coding and technical tasks with deep understanding of software development",
                        url: "https://deepseek.ai",
                        icon: Code2
                      },
                      {
                        title: "LLaMA",
                        desc: "Meta's open-source large language model foundation, enabling customized AI applications",
                        url: "https://ai.meta.com/llama",
                        icon: Database
                      },
                      {
                        title: "DeepMind",
                        desc: "Google's AI research company known for breakthrough achievements in AI, including AlphaGo and protein folding",
                        url: "https://deepmind.google",
                        icon: Atom
                      }
                    ].map((platform, index) => (
                      <motion.div
                        key={platform.title}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                            <platform.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                            {platform.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{platform.desc}</p>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                        >
                          Visit Platform
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <div className="mt-12 flex justify-between items-center">
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Take Topic Quiz
                  </Button>
                  <Link href="/ai/module1/machine-learning-basics">
                    <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Next Topic: Machine Learning <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}