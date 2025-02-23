import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Users,
  FileText,
  Heart,
  Building2,
  PiggyBank,
  Send,
  Banknote,
  Landmark,
  LineChart,
  GraduationCap,
  Lock,
  Shield,
  X,
  Check
} from "lucide-react";

// Enhanced ApplicationCard Component
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
      className={`rounded-xl shadow-lg p-6 relative overflow-hidden ${gradient} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
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
                transition={{ delay: 0.1 * index + delay }}
                className="flex items-center gap-2 text-white/90"
              >
                <div className="h-1.5 w-1.5 bg-white rounded-full" />
                <span>{example}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Financial Inclusion Diagram
const FinancialInclusionDiagram = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { title: "Business", value: 85 },
    { title: "Healthcare", value: 78 },
    { title: "Education", value: 72 },
    { title: "Transportation", value: 68 },
    { title: "Entertainment", value: 65 }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          className="relative"
          onHoverStart={() => setActiveSection(index)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">{section.title}</span>
            <span className="text-blue-400">{section.value}%</span>
          </div>
          <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
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

const ApplicationShowcase = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {[
        {
          title: "Digital Payments",
          description: "Fast, secure, and borderless transactions for everyday purchases",
          icon: Banknote,
          examples: ["Cross-border remittances", "Online shopping", "Bill payments"],
          gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700"
        },
        {
          title: "Decentralized Finance",
          description: "Access to financial services without traditional banking infrastructure",
          icon: Landmark,
          examples: ["Lending platforms", "Yield farming", "Decentralized exchanges"],
          gradient: "bg-gradient-to-br from-violet-500 to-violet-700"
        },
        {
          title: "Smart Contracts",
          description: "Automated agreements and transactions without intermediaries",
          icon: FileText,
          examples: ["Insurance policies", "Real estate deals", "Supply chain tracking"],
          gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
        },
        {
          title: "Investment Opportunities",
          description: "New ways to grow and manage wealth",
          icon: LineChart,
          examples: ["Token investments", "Crypto index funds", "NFT marketplaces"],
          gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700"
        },
        {
          title: "Education",
          description: "Learning and certification on the blockchain",
          icon: GraduationCap,
          examples: ["Digital credentials", "Online courses", "Skill verification"],
          gradient: "bg-gradient-to-br from-cyan-500 to-cyan-700"
        },
        {
          title: "Social Impact",
          description: "Using blockchain for positive change",
          icon: Heart,
          examples: ["Charity transparency", "Sustainable projects", "Community initiatives"],
          gradient: "bg-gradient-to-br from-rose-500 to-rose-700"
        }
      ].map((app, index) => (
        <ApplicationCard key={index} {...app} delay={index * 0.1} />
      ))}
    </div>
  )
}

const PracticalApplicationsSection = () => {
  useScrollTop();
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
        setShowQuiz(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Module Overview
              </Button>
            </Link>

            <motion.div 
              className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative p-8 md:p-12">
                <motion.h1 
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Practical Applications of Blockchain Technology
                </motion.h1>
                <motion.p 
                  className="text-blue-100 text-lg md:text-xl max-w-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Understanding the real-world impact and implementation of blockchain technology
                </motion.p>
              </div>
            </motion.div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-2 border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <section>
                  <motion.h2 
                    className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Overview
                  </motion.h2>
                  <motion.p 
                    className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Blockchain technology is revolutionizing various sectors beyond just cryptocurrencies.
                    From financial services to supply chain management, its applications are creating new
                    possibilities for business and society. Let's explore how this technology is being
                    implemented in real-world scenarios.
                  </motion.p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[
                      {
                        title: "Digital Payments",
                        description: "Fast, secure, and borderless transactions for everyday purchases",
                        icon: Banknote,
                        examples: ["Cross-border remittances", "Online shopping", "Bill payments"],
                        gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700"
                      },
                      {
                        title: "Decentralized Finance",
                        description: "Access to financial services without traditional banking infrastructure",
                        icon: Landmark,
                        examples: ["Lending platforms", "Yield farming", "Decentralized exchanges"],
                        gradient: "bg-gradient-to-br from-violet-500 to-violet-700"
                      },
                      {
                        title: "Smart Contracts",
                        description: "Automated agreements and transactions without intermediaries",
                        icon: FileText,
                        examples: ["Insurance policies", "Real estate deals", "Supply chain tracking"],
                        gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
                      },
                      {
                        title: "Investment Opportunities",
                        description: "New ways to grow and manage wealth",
                        icon: LineChart,
                        examples: ["Token investments", "Crypto index funds", "NFT marketplaces"],
                        gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700"
                      },
                      {
                        title: "Education",
                        description: "Learning and certification on the blockchain",
                        icon: GraduationCap,
                        examples: ["Digital credentials", "Online courses", "Skill verification"],
                        gradient: "bg-gradient-to-br from-cyan-500 to-cyan-700"
                      },
                      {
                        title: "Social Impact",
                        description: "Using blockchain for positive change",
                        icon: Heart,
                        examples: ["Charity transparency", "Sustainable projects", "Community initiatives"],
                        gradient: "bg-gradient-to-br from-rose-500 to-rose-700"
                      }
                    ].map((app, index) => (
                      <ApplicationCard key={index} {...app} delay={index * 0.1} />
                    ))}
                  </div>
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

            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Technical Applications</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Blockchain's technical capabilities extend far beyond financial transactions,
                    enabling new solutions across various industries.
                  </p>
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

            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Social Impact</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Blockchain technology is enabling positive social change through transparency,
                    accountability, and improved resource distribution.
                  </p>
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

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg mb-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
                  <p className="text-blue-100">Test your understanding with this quick quiz.</p>
                </div>
                <Card className="border-2 border-slate-200 dark:border-slate-800">
                  <CardContent className="pt-6">
                    <PracticalApplicationsQuiz />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const PracticalApplicationsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswer = (index: number) => {
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
          nextSection: 'getting-started'
        });
      }
    }, 7000);  // Changed from 5000 to 7000
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">You scored {score} out of {questions.length}</p>
          <div className="mb-8">
            {score >= questions.length * 0.7 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 text-green-800 p-6 rounded-lg"
              >
                <p className="font-semibold">🎉 Excellent work!</p>
                <p>You've demonstrated a strong understanding of blockchain applications.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-100 text-yellow-800 p-6 rounded-lg"
              >
                <p className="font-semibold">Keep learning!</p>
                <p>Review the material and try again to improve your score.</p>
              </motion.div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/modules/module1/getting-started">
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Next Topic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={(currentQuestion + 1) / questions.length * 100} className="h-2" />
      </div>

      <Card className="border-2 border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6">
          <p className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-6">
            {questions[currentQuestion].question}
          </p>

          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === questions[currentQuestion].correctAnswer;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
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

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                selectedAnswer === questions[currentQuestion].correctAnswer
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-semibold mb-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer ? "✓ Correct!" : "✕ Incorrect"}
              </p>
              <p>{questions[currentQuestion].explanation}</p>
              <p className="text-sm mt-2">Next question in 7 seconds...</p> {/* Changed from 5 to 7 */}
            </motion.div>
          )}
        </CardContent>
      </Card>
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