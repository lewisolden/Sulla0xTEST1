import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Users,
  Wallet,
  Timer,
  Lock,
  Clock,
  Building2,
  PiggyBank,
  Send,
  ShieldCheck,
  Banknote,
  Landmark,
  FileText,
  LineChart,
  GraduationCap,
  Heart,
  Shield
} from "lucide-react";

// Enhanced Financial Inclusion Diagram Component with Animation
const FinancialInclusionDiagram = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
      {[
        {
          icon: Globe2,
          title: "Global Access",
          description: "Connect to the financial system from anywhere",
          color: "blue"
        },
        {
          icon: PiggyBank,
          title: "Cost Reduction",
          description: "Lower fees for sending money internationally",
          color: "green"
        },
        {
          icon: Users,
          title: "Peer-to-Peer",
          description: "Direct financial transactions without intermediaries",
          color: "purple"
        },
        {
          icon: Building2,
          title: "Banking Alternative",
          description: "Financial services without traditional bank accounts",
          color: "orange"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className={`bg-${item.color}-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="mb-4 flex justify-center">
            <div className={`p-4 bg-${item.color}-100 rounded-full`}>
              <item.icon className={`w-8 h-8 text-${item.color}-600`} />
            </div>
          </div>
          <h4 className={`font-semibold text-${item.color}-800 text-lg mb-2 text-center`}>{item.title}</h4>
          <p className="text-gray-600 text-center">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// New Component: Real World Applications Showcase
const ApplicationShowcase = () => {
  const applications = [
    {
      icon: Banknote,
      title: "Digital Payments",
      description: "Fast, secure, and borderless transactions for everyday purchases",
      examples: ["Cross-border remittances", "Online shopping", "Bill payments"],
      color: "emerald"
    },
    {
      icon: Landmark,
      title: "Decentralized Finance",
      description: "Access to financial services without traditional banking infrastructure",
      examples: ["Lending platforms", "Yield farming", "Decentralized exchanges"],
      color: "violet"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated agreements and transactions without intermediaries",
      examples: ["Insurance policies", "Real estate deals", "Supply chain tracking"],
      color: "blue"
    },
    {
      icon: LineChart,
      title: "Investment Opportunities",
      description: "New ways to grow and manage wealth",
      examples: ["Token investments", "Crypto index funds", "NFT marketplaces"],
      color: "indigo"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Learning and certification on the blockchain",
      examples: ["Digital credentials", "Online courses", "Skill verification"],
      color: "cyan"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Using blockchain for positive change",
      examples: ["Charity transparency", "Sustainable projects", "Community initiatives"],
      color: "rose"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {applications.map((app, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-${app.color}-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className={`p-3 bg-${app.color}-100 rounded-full w-fit mb-4`}>
            <app.icon className={`w-6 h-6 text-${app.color}-600`} />
          </div>
          <h3 className={`text-xl font-bold text-${app.color}-800 mb-2`}>{app.title}</h3>
          <p className="text-gray-600 mb-4">{app.description}</p>
          <div className="space-y-2">
            {app.examples.map((example, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${app.color}-400`} />
                <span className="text-sm text-gray-600">{example}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const PracticalApplicationsSection = () => {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress({
          moduleId: 'module1',
          sectionId: 'practical-applications',
          completed: true,
          score: 100,
          totalSections: 8,
          currentSection: 6,
          nextSection: 'security'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with updated styling */}
          <div className="space-y-4">
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Module Overview
              </Button>
            </Link>

            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="relative">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Practical Applications of Blockchain Technology
                </h1>
                <p className="text-blue-100 max-w-xl">
                  Understanding the real-world impact and implementation of blockchain technology
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Overview</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Blockchain technology is revolutionizing various sectors beyond just cryptocurrencies.
                    From financial services to supply chain management, its applications are creating new
                    possibilities for business and society. Let's explore how this technology is being
                    implemented in real-world scenarios.
                  </p>
                  <ApplicationShowcase />
                </section>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Financial Applications</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Financial inclusion is one of the most significant impacts of blockchain technology,
                    providing access to financial services for the unbanked and underbanked populations worldwide.
                  </p>
                  <FinancialInclusionDiagram />
                </section>
              </CardContent>
            </Card>

            {/* Technical Applications Section - preserve existing content with updated styling */}
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Technical Applications</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Blockchain's technical capabilities extend far beyond financial transactions,
                    enabling new solutions across various industries.
                  </p>
                  {/* Keep existing technical applications grid with updated styling */}
                  <div className="grid gap-6">
                    {[
                      {
                        icon: FileText,
                        title: "Supply Chain Management",
                        description: "Track products from origin to consumer with immutable records",
                        features: [
                          "Real-time tracking and verification",
                          "Counterfeit prevention",
                          "Automated compliance",
                          "Inventory optimization"
                        ],
                        color: "blue"
                      },
                      {
                        icon: Shield,
                        title: "Healthcare Records",
                        description: "Secure and interoperable medical data management",
                        features: [
                          "Patient data privacy",
                          "Cross-institution sharing",
                          "Clinical trial tracking",
                          "Drug supply verification"
                        ],
                        color: "green"
                      },
                      {
                        icon: Lock,
                        title: "Digital Identity",
                        description: "Decentralized identity verification and management",
                        features: [
                          "Self-sovereign identity",
                          "Credential verification",
                          "Access control",
                          "Privacy preservation"
                        ],
                        color: "purple"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-${item.color}-50 p-6 rounded-lg shadow-lg`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 bg-${item.color}-100 rounded-full`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold text-${item.color}-800 mb-2`}>
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <ul className="space-y-2">
                              {item.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full bg-${item.color}-400`} />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>

            {/* Social Impact Section - preserve existing content with updated styling */}
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Social Impact</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Blockchain technology is enabling positive social change through transparency,
                    accountability, and improved resource distribution.
                  </p>
                  {/* Keep existing social impact grid with updated styling */}
                  <div className="grid gap-6">
                    {[
                      {
                        icon: Heart,
                        title: "Humanitarian Aid",
                        description: "Transparent and efficient distribution of aid",
                        impact: [
                          "Direct beneficiary payments",
                          "Aid fund tracking",
                          "Reduced fraud",
                          "Faster emergency response"
                        ],
                        color: "rose"
                      },
                      {
                        icon: Globe2,
                        title: "Environmental Protection",
                        description: "Supporting sustainability and conservation efforts",
                        impact: [
                          "Carbon credit tracking",
                          "Environmental compliance",
                          "Conservation funding",
                          "Waste management"
                        ],
                        color: "emerald"
                      },
                      {
                        icon: Users,
                        title: "Community Empowerment",
                        description: "Enabling local governance and cooperation",
                        impact: [
                          "Decentralized governance",
                          "Community voting",
                          "Resource sharing",
                          "Local economies"
                        ],
                        color: "indigo"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-${item.color}-50 p-6 rounded-lg shadow-lg`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 bg-${item.color}-100 rounded-full`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold text-${item.color}-800 mb-2`}>
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <ul className="space-y-2">
                              {item.impact.map((point, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full bg-${item.color}-400`} />
                                  <span className="text-sm text-gray-600">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            {isFullyRead && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-2 border-slate-200 dark:border-slate-800">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Test Your Knowledge
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Complete this quiz to test your understanding of blockchain applications.
                      </p>
                      <PracticalApplicationsQuiz />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticalApplicationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        updateProgress({
          moduleId: 'module1',
          sectionId: 'practical-applications',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 8,
          currentSection: 6,
          nextSection: 'security'
        });
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-lg mb-4">
            You scored {score} out of {questions.length}
          </p>
          <div className="mb-6">
            {score >= questions.length * 0.7 ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                <p>🎉 Great job! You've passed this section!</p>
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                <p>Keep studying and try again to improve your score.</p>
              </div>
            )}
          </div>
          <Button onClick={restartQuiz} variant="outline">
            Retry Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="text-sm font-medium">
          Score: {score}/{questions.length}
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === questions[currentQuestion].correctAnswer;
            let buttonClass = "w-full text-left p-4 rounded-lg border ";

            if (selectedAnswer !== null) {
              if (isCorrect) {
                buttonClass += "bg-green-100 border-green-500 text-green-700";
              } else if (isSelected) {
                buttonClass += "bg-red-100 border-red-500 text-red-700";
              } else {
                buttonClass += "bg-gray-100 border-gray-300 text-gray-700";
              }
            } else {
              buttonClass += "bg-white hover:bg-blue-50 border-gray-300";
            }

            return (
              <Button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6">
                    {String.fromCharCode(65 + index)}.
                  </div>
                  <div className="flex-1">{option}</div>
                </div>
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === questions[currentQuestion].correctAnswer
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
            <p className="font-semibold mb-2">
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? "✅ Correct!"
                : "❌ Incorrect"}
            </p>
            <p>{questions[currentQuestion].explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const questions = [
  {
    question: "Which blockchain application has the potential to revolutionize healthcare data management?",
    options: [
      "Digital asset trading platforms",
      "Secure, interoperable medical records",
      "Cryptocurrency mining operations",
      "Social media networks"
    ],
    correctAnswer: 1,
    explanation: "Blockchain technology enables secure, interoperable medical records management, allowing healthcare providers to share patient data securely while maintaining privacy and ensuring data integrity. This improves care coordination and reduces medical errors."
  },
  {
    question: "How does blockchain technology support environmental sustainability efforts?",
    options: [
      "By increasing energy consumption",
      "By replacing traditional currencies",
      "By tracking carbon credits and environmental compliance",
      "By eliminating the need for environmental monitoring"
    ],
    correctAnswer: 2,
    explanation: "Blockchain supports environmental sustainability by providing transparent tracking of carbon credits, ensuring environmental compliance, and enabling efficient management of conservation funding and waste management initiatives."
  },
  {
    question: "What is a key benefit of using blockchain in supply chain management?",
    options: [
      "Increased shipping costs",
      "Real-time tracking and verification of products",
      "Elimination of all intermediaries",
      "Slower delivery times"
    ],
    correctAnswer: 1,
    explanation: "Blockchain technology in supply chain management enables real-time tracking and verification of products from origin to consumer, helping prevent counterfeiting, ensure compliance, and optimize inventory management."
  },
  {
    question: "How does blockchain technology enhance humanitarian aid distribution?",
    options: [
      "By requiring aid recipients to have bank accounts",
      "By increasing administrative costs",
      "By restricting access to specific regions",
      "By enabling transparent, direct beneficiary payments"
    ],
    correctAnswer: 3,
    explanation: "Blockchain improves humanitarian aid distribution through transparent, direct beneficiary payments, efficient aid fund tracking, reduced fraud, and faster emergency response capabilities."
  },
  {
    question: "Which feature of blockchain technology enables community empowerment?",
    options: [
      "Centralized control",
      "Decentralized governance and voting",
      "Restricted access to resources",
      "Limited participation options"
    ],
    correctAnswer: 1,
    explanation: "Blockchain enables community empowerment through decentralized governance and voting systems, allowing communities to make collective decisions, share resources, and build local economies in a transparent and equitable way."
  }
];

export default PracticalApplicationsSection;