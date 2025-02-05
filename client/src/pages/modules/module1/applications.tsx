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
  Globe,
  Users,
  Wallet,
  Timer,
  Lock,
  Clock,
  Building2,
  PiggyBank,
  Send,
  ShieldCheck,
  Code2,
  Banknote,
  CheckCircle,
  XCircle
} from "lucide-react";

// Financial Inclusion Diagram Component
const FinancialInclusionDiagram = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {[
        {
          icon: Globe,
          title: "Global Access",
          description: "Connect to the financial system from anywhere"
        },
        {
          icon: PiggyBank,
          title: "Cost Reduction",
          description: "Lower fees for sending money internationally"
        },
        {
          icon: Users,
          title: "Peer-to-Peer",
          description: "Direct financial transactions without intermediaries"
        },
        {
          icon: Building2,
          title: "Banking Alternative",
          description: "Financial services without traditional bank accounts"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-blue-50 p-4 rounded-lg text-center"
        >
          <div className="mb-3 flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h4 className="font-semibold text-blue-800 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
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
        updateProgress(1, 'practical-applications', true);
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

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Practical Applications of Blockchain Technology
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <section>
              <h2 className="text-2xl font-bold text-blue-700">Overview</h2>
              <p className="text-gray-700">
                While blockchain technology gained prominence through cryptocurrencies, its potential applications extend far beyond digital currencies. This section explores how blockchain is transforming various industries and creating new possibilities for business and society.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">
                  Through this section, you'll learn about:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Financial inclusion and accessibility</li>
                  <li>Payment system improvements</li>
                  <li>Investment opportunities</li>
                  <li>Real-world blockchain applications</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Financial Inclusion</h2>
              <p className="text-gray-700 mb-4">
                One of the most significant applications of blockchain is providing financial services to the unbanked and underbanked populations worldwide.
              </p>

              <FinancialInclusionDiagram />

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Impact on Global Financial Access</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Enables participation in the global economy without traditional bank accounts</li>
                  <li>Reduces remittance costs for international money transfers</li>
                  <li>Facilitates micro-lending and peer-to-peer financial services</li>
                  <li>Provides secure and affordable cross-border transactions</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Payment Efficiency</h2>
              <p className="text-gray-700 mb-6">
                Blockchain technology is revolutionizing payment systems through several key innovations:
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Timer,
                    title: "Near-instant settlements",
                    description: "Unlike traditional banking systems that can take days to settle transactions, blockchain enables almost immediate settlement of payments. This is achieved through decentralized consensus mechanisms that validate transactions in minutes or seconds."
                  },
                  {
                    icon: Clock,
                    title: "24/7 operation without banking hours restrictions",
                    description: "Blockchain networks operate continuously without downtime, allowing transactions to be processed at any time. This eliminates the limitations of traditional banking hours and enables global commerce across time zones."
                  },
                  {
                    icon: Send,
                    title: "Lower transaction fees for international transfers",
                    description: "By removing intermediary banks and reducing operational costs, blockchain significantly lowers the fees associated with international money transfers. This makes cross-border payments more accessible and economical."
                  },
                  {
                    icon: Code2,
                    title: "Programmable payments through smart contracts",
                    description: "Smart contracts enable automated, condition-based payments that execute when predefined criteria are met. This allows for complex financial arrangements without the need for manual intervention or trust in intermediaries."
                  },
                  {
                    icon: ShieldCheck,
                    title: "Enhanced security through cryptographic verification",
                    description: "Every transaction is secured using advanced cryptography and must be verified by multiple network participants. This makes fraud extremely difficult and provides transparent, immutable records of all transactions."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-full mt-1">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Investment Opportunities</h2>
              <p className="text-gray-700 mb-4">
                Blockchain has created new investment possibilities:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Banknote,
                    title: "Digital asset trading",
                    description: "Trade cryptocurrencies and digital tokens"
                  },
                  {
                    icon: Building2,
                    title: "DeFi opportunities",
                    description: "Access decentralized finance platforms"
                  },
                  {
                    icon: Lock,
                    title: "Tokenized assets",
                    description: "Invest in tokenized real-world assets"
                  },
                  {
                    icon: Wallet,
                    title: "Yield farming",
                    description: "Earn returns through liquidity provision"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <item.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-blue-800">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
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

            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
            </Button>

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <PracticalApplicationsQuiz />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex justify-between mt-4">
              <Link href="/modules/module1/security">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Topic
                </Button>
              </Link>
              <Link href="/modules/module1/getting-started">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  Next Topic: Getting Started Safely
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
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
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;

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
                    : index === currentQuizQuestion.correct 
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
              ${selectedAnswer === currentQuizQuestion.correct 
                ? 'bg-green-100 border-l-4 border-green-500' 
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuizQuestion.correct 
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
        a: "By requiring users to have traditional bank accounts",
        b: "By enabling access to financial services without traditional banking infrastructure",
        c: "By eliminating the need for money completely",
        d: "By making all transactions free"
      },
      correct: 1,
      explanation: "Blockchain technology promotes financial inclusion by allowing people to access financial services without requiring traditional banking infrastructure. This is particularly important for the unbanked and underbanked populations who may not have access to conventional banking services but can participate in the global economy through blockchain-based solutions."
    },
    {
      id: "q2",
      question: "What is a key advantage of blockchain-based payments over traditional banking systems?",
      options: {
        a: "They require more intermediaries",
        b: "They only work during banking hours",
        c: "They enable near-instant settlement 24/7",
        d: "They are only available in developed countries"
      },
      correct: 2,
      explanation: "Blockchain-based payments operate 24/7 and enable near-instant settlement of transactions. Unlike traditional banking systems that may take days to process payments and operate only during business hours, blockchain networks operate continuously and can validate transactions within minutes or even seconds."
    },
    {
      id: "q3",
      question: "How do smart contracts enhance payment systems?",
      options: {
        a: "By requiring manual verification for every transaction",
        b: "By automating payments based on predefined conditions",
        c: "By increasing transaction fees",
        d: "By slowing down transaction processing"
      },
      correct: 1,
      explanation: "Smart contracts enhance payment systems by automating transactions based on predefined conditions. This automation eliminates the need for manual intervention, reduces the risk of human error, and enables complex financial arrangements to execute automatically when specific criteria are met."
    },
    {
      id: "q4",
      question: "Which of these is NOT a typical investment opportunity in the blockchain space?",
      options: {
        a: "Digital asset trading",
        b: "Yield farming",
        c: "Risk-free guaranteed returns",
        d: "Tokenized real-world assets"
      },
      correct: 2,
      explanation: "Risk-free guaranteed returns is NOT a legitimate investment opportunity in the blockchain space. While blockchain offers various investment opportunities like digital asset trading, yield farming, and tokenized assets, all investments carry risks. Claims of guaranteed returns are often associated with scams or fraudulent schemes."
    }
  ];

export default PracticalApplicationsSection;