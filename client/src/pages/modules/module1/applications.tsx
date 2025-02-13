import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Users,
  Wallet,
  Timer,
  Lock,
  Building2,
  PiggyBank,
  Send,
  ShieldCheck,
  Code2,
  Banknote,
  CheckCircle,
  XCircle,
  Building,
  Coins,
  LineChart
} from "lucide-react";

// Custom components for visual appeal
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

const MarketImpactSection = () => {
  const items = [
    { sector: "Finance", impact: 85 },
    { sector: "Supply Chain", impact: 75 },
    { sector: "Healthcare", impact: 70 },
    { sector: "Real Estate", impact: 65 },
    { sector: "Government", impact: 60 }
  ];

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={item.sector}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-blue-800">{item.sector}</span>
            <span className="text-blue-600">{item.impact}%</span>
          </div>
          <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${item.impact}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
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

  // Add aggressive scroll-to-top on mount
  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceScrollTop();
    setTimeout(forceScrollTop, 0);
    requestAnimationFrame(() => {
      forceScrollTop();
      requestAnimationFrame(forceScrollTop);
    });
  }, []);

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
          score: 100,
          totalSections: 8,
          currentSection: 5
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const applications = [
    {
      title: "Financial Services",
      description: "Revolutionizing traditional banking and financial services through blockchain technology",
      icon: Building,
      examples: [
        "Cross-border payments",
        "Asset tokenization",
        "Decentralized lending",
        "Smart contracts"
      ],
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      title: "Supply Chain",
      description: "Enhancing transparency and traceability in global supply chains",
      icon: Send,
      examples: [
        "Product tracking",
        "Authenticity verification",
        "Inventory management",
        "Automated payments"
      ],
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      title: "Digital Identity",
      description: "Secure and decentralized identity management solutions",
      icon: ShieldCheck,
      examples: [
        "Self-sovereign identity",
        "KYC verification",
        "Access control",
        "Privacy protection"
      ],
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    {
      title: "Investment",
      description: "New investment opportunities and asset management",
      icon: LineChart,
      examples: [
        "Cryptocurrency trading",
        "DeFi platforms",
        "NFT marketplaces",
        "Yield farming"
      ],
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Module Overview
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <Coins className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Practical Applications of Blockchain
              </h1>
              <p className="text-white/90">
                Discover how blockchain technology is transforming industries and creating new opportunities
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="prose max-w-none p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {applications.map((app, index) => (
                  <ApplicationCard
                    key={app.title}
                    {...app}
                    delay={index * 0.2}
                  />
                ))}
              </div>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                  <LineChart className="h-6 w-6" />
                  Market Impact Analysis
                </h2>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl text-white">
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Blockchain's impact across different sectors continues to grow,
                    transforming how businesses operate and deliver value.
                  </p>
                  <MarketImpactSection />
                </div>
              </motion.section>
            </CardContent>
          </Card>

          {isFullyRead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the Practical Applications section!
                </p>
              </Card>

              <div className="flex justify-between mt-4">
                <Link href="/modules/module1/security">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Previous Topic
                  </Button>
                </Link>
                <Link href="/modules/module1/getting-started">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2"
                  >
                    Next Topic: Getting Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
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
      updateProgress({
        moduleId: 1,
        sectionId: 'practical-applications-quiz',
        completed: score >= passThreshold,
        score: score,
        totalSections: 8,
        currentSection: 6
      });
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