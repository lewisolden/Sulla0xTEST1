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
  Building2,
  Wallet,
  Globe,
  Users,
  PiggyBank,
  Send,
  ShieldCheck,
  Code2,
  Timer,
  Lock,
  Clock,
  Check,
  X
} from "lucide-react";

// Application Card Component
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
          <h4 className="font-semibold text-white mb-3">Key Examples:</h4>
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

// Financial Technology Section Component
const FinTechSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {[
        {
          icon: Globe,
          title: "Global Access",
          description: "Connect to financial systems worldwide"
        },
        {
          icon: PiggyBank,
          title: "Cost Reduction",
          description: "Lower fees for financial transactions"
        },
        {
          icon: Users,
          title: "Peer-to-Peer",
          description: "Direct transactions without intermediaries"
        },
        {
          icon: Building2,
          title: "Banking Alternative",
          description: "Financial services without traditional banks"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-blue-50 p-6 rounded-lg transform transition-all duration-300 hover:scale-105"
        >
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h4 className="font-semibold text-blue-800 mb-2 text-center">{item.title}</h4>
          <p className="text-gray-600 text-center">{item.description}</p>
        </motion.div>
      ))}
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
        moduleId: 'module1',
        sectionId: 'practical-applications-quiz',
        completed: true,
        score: Math.round((score / questions.length) * 100),
        totalSections: 8,
        currentSection: 4,
        nextModule: 'security'
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

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Topic Quiz
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">{questions[currentQuestion].question}</p>
            <div className="grid gap-3">
              {Object.entries(questions[currentQuestion].options).map(([key, value], index) => (
                <Button
                  key={key}
                  onClick={() => handleAnswerSelect(parseInt(key))}
                  className={`
                    w-full p-4 h-auto whitespace-normal text-left justify-start
                    ${selectedAnswer === null 
                      ? 'bg-gray-100 hover:bg-blue-100 text-gray-700' 
                      : index === questions[currentQuestion].correctAnswer 
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  mt-6 p-4 rounded-lg
                  ${selectedAnswer === questions[currentQuestion].correctAnswer 
                    ? 'bg-green-100 border-l-4 border-green-500' 
                    : 'bg-red-100 border-l-4 border-red-500'}
                `}
              >
                <h3 className="font-bold mb-2">
                  {selectedAnswer === questions[currentQuestion].correctAnswer 
                    ? '✅ Correct!' 
                    : '❌ Incorrect'}
                </h3>
                <p>{questions[currentQuestion].explanation}</p>
              </motion.div>
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
        </div>
      </CardContent>
    </Card>
  );
};

// Quiz questions data
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

const PracticalApplicationsSection = () => {
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
          currentSection: 4,
          nextModule: 'security'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div
          className="h-full bg-blue-600"
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
          className="flex items-center gap-4 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white"
        >
          <Building2 className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Practical Applications in Finance
            </h1>
            <p className="text-white/90">
              Discover how blockchain technology is revolutionizing the financial industry
            </p>
          </div>
        </motion.div>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Overview</h2>
              <p className="text-gray-700">
                While blockchain technology gained prominence through cryptocurrencies, its potential applications extend far beyond digital currencies. This section explores how blockchain is transforming various industries and creating new possibilities for business and society.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <ApplicationCard
                  title="Payment Systems"
                  description="Revolutionary improvements in transaction processing"
                  icon={Send}
                  examples={[
                    "Instant Cross-border Payments",
                    "Reduced Transaction Fees",
                    "24/7 Operation",
                    "Smart Contract Automation"
                  ]}
                  delay={0.3}
                  gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                />
                <ApplicationCard
                  title="Financial Services"
                  description="Transforming traditional banking and finance"
                  icon={Building2}
                  examples={[
                    "Decentralized Lending",
                    "Asset Tokenization",
                    "Automated Compliance",
                    "Identity Verification"
                  ]}
                  delay={0.4}
                  gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Financial Technology Impact</h2>
              <FinTechSection />
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Key Benefits</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Timer,
                    title: "Speed and Efficiency",
                    description: "Near-instant settlement of transactions, eliminating traditional delays in financial processes."
                  },
                  {
                    icon: ShieldCheck,
                    title: "Enhanced Security",
                    description: "Advanced cryptography and decentralized validation ensure transaction safety."
                  },
                  {
                    icon: Code2,
                    title: "Automation",
                    description: "Smart contracts enable automated execution of complex financial arrangements."
                  },
                  {
                    icon: Globe,
                    title: "Accessibility",
                    description: "Global access to financial services without traditional banking infrastructure."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-blue-50 p-6 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <benefit.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">{benefit.title}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              <Link href="/modules/module1/blockchain-basics">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Topic
                </Button>
              </Link>
              <Link href="/modules/module1/security">
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  Next Topic: Security
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {showQuiz && <PracticalApplicationsQuiz />}
      </div>
    </div>
  );
};

export default PracticalApplicationsSection;