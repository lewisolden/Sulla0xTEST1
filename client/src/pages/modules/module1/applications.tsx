import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress({
          moduleId: 1,
          sectionId: 'practical-applications',
          completed: true,
          score: 100
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Practical Applications of Blockchain Technology
        </motion.h1>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardContent className="prose max-w-none p-6">
                <section>
                  <h2 className="text-2xl font-bold text-blue-700">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Blockchain technology is revolutionizing various sectors beyond just cryptocurrencies.
                    From financial services to supply chain management, its applications are creating new
                    possibilities for business and society. Let's explore how this technology is being
                    implemented in real-world scenarios.
                  </p>
                  <ApplicationShowcase />
                </section>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardContent className="prose max-w-none p-6">
                <section>
                  <h2 className="text-2xl font-bold text-blue-700">Financial Applications</h2>
                  <p className="text-gray-700 mb-6">
                    Financial inclusion is one of the most significant impacts of blockchain technology,
                    providing access to financial services for the unbanked and underbanked populations worldwide.
                  </p>
                  <FinancialInclusionDiagram />
                </section>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardContent className="prose max-w-none p-6">
                <section>
                  <h2 className="text-2xl font-bold text-blue-700">Technical Applications</h2>
                  <p className="text-gray-700 mb-6">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="mb-6">
              <CardContent className="prose max-w-none p-6">
                <section>
                  <h2 className="text-2xl font-bold text-blue-700">Social Impact</h2>
                  <p className="text-gray-700 mb-6">
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
          </motion.div>
        </div>

        {isFullyRead && (
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Practical Applications section!
              </p>
            </Card>

            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => setShowQuiz(!showQuiz)}
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
              </Button>

              <div className="flex flex-1 justify-end gap-4">
                <Link href="/modules/module1/security">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Topic
                  </Button>
                </Link>

                <Link href="/modules/module1/getting-started">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next Topic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <PracticalApplicationsQuiz />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
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

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = questions.length * 0.6;
      updateProgress(1, 'practical-applications-quiz', score >= passThreshold);
    }
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
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>
          {score >= questions.length * 0.6 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Practical Applications quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="mt-4"
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Practical Applications Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {Object.entries(currentQuizQuestion.options).map(([key, value], index) => (
              <Button
                key={key}
                onClick={() => handleAnswerSelect(parseInt(key))}
                className={`
                  w-full p-4 h-auto whitespace-normal text-left justify-start
                  ${selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    : index === currentQuizQuestion.correctAnswer
                      ? 'bg-green-200 text-gray-700'
                      : selectedAnswer === index
                        ? 'bg-red-200 text-gray-700'
                        : 'bg-gray-100 text-gray-700'}
                `}
                disabled={selectedAnswer !== null}
                variant="ghost"
              >
                {value}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-6 p-4 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer
                ? 'bg-green-100 border-l-4 border-green-500'
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuizQuestion.correctAnswer
                  ? '✅ Correct!'
                  : '❌ Incorrect'}
              </h3>
              <p>{currentQuizQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-6 w-full"
            >
              {currentQuestion < questions.length - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


const questions = [
  {
    id: "q1",
    question: "Which of the following best describes how blockchain technology promotes financial inclusion?",
    options: {
      0: "By requiring users to have traditional bank accounts",
      1: "By enabling access to financial services without traditional banking infrastructure",
      2: "By eliminating the need for money completely",
      3: "By making all transactions free"
    },
    correctAnswer: 1,
    explanation: "Blockchain technology promotes financial inclusion by allowing people to access financial services without requiring traditional banking infrastructure. This is particularly important for the unbanked and underbanked populations who may not have access to conventional banking services but can participate in the global economy through blockchain-based solutions."
  },
  {
    id: "q2",
    question: "What is a key advantage of blockchain-based payments over traditional banking systems?",
    options: {
      0: "They require more intermediaries",
      1: "They only work during banking hours",
      2: "They enable near-instant settlement 24/7",
      3: "They are only available in developed countries"
    },
    correctAnswer: 2,
    explanation: "Blockchain-based payments operate 24/7 and enable near-instant settlement of transactions. Unlike traditional banking systems that may take days to process payments and operate only during business hours, blockchain networks operate continuously and can validate transactions within minutes or even seconds."
  },
  {
    id: "q3",
    question: "How do smart contracts enhance payment systems?",
    options: {
      0: "By requiring manual verification for every transaction",
      1: "By automating payments based on predefined conditions",
      2: "By increasing transaction fees",
      3: "By slowing down transaction processing"
    },
    correctAnswer: 1,
    explanation: "Smart contracts enhance payment systems by automating transactions based on predefined conditions. This automation eliminates the need for manual intervention, reduces the risk of human error, and enables complex financial arrangements to execute automatically when specific criteria are met."
  },
  {
    id: "q4",
    question: "Which of these is NOT a typical investment opportunity in the blockchain space?",
    options: {
      0: "Digital asset trading",
      1: "Yield farming",
      2: "Risk-free guaranteed returns",
      3: "Tokenized real-world assets"
    },
    correctAnswer: 2,
    explanation: "Risk-free guaranteed returns is NOT a legitimate investment opportunity in the blockchain space. While blockchain offers various investment opportunities like digital asset trading, yield farming, and tokenized assets, all investments carry risks. Claims of guaranteed returns are often associated with scams or fraudulent schemes."
  }
];

export default PracticalApplicationsSection;