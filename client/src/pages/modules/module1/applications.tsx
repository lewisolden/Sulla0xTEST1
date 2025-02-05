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
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);

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
      correct: "b",
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
      correct: "c",
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
      correct: "b",
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
      correct: "c",
      explanation: "Risk-free guaranteed returns is NOT a legitimate investment opportunity in the blockchain space. While blockchain offers various investment opportunities like digital asset trading, yield farming, and tokenized assets, all investments carry risks. Claims of guaranteed returns are often associated with scams or fraudulent schemes."
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && !answers[questionId]) {
      const isCorrect = answer === question.correct;
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    }
  };

  const getOptionStyle = (questionId: string, option: string) => {
    if (answers[questionId]) {
      if (option === questions.find(q => q.id === questionId)?.correct) {
        return "bg-green-50 border-green-500";
      }
      if (answers[questionId] === option) {
        return "bg-red-50 border-red-200";
      }
    }
    return "hover:bg-gray-50 cursor-pointer";
  };

  const isQuestionAnswered = (questionId: string) => {
    return questionId in answers;
  };

  const canMoveNext = currentQuestion < questions.length - 1 && isQuestionAnswered(questions[currentQuestion].id);
  const canMovePrev = currentQuestion > 0;
  const currentQuestionData = questions[currentQuestion];
  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p className="text-sm text-gray-500">
          Score: {score} / {questions.length}
        </p>
      </div>

      <Progress value={(totalAnswered / questions.length) * 100} className="mb-4" />

      <div className="space-y-4">
        <p className="font-semibold text-lg text-blue-800">{currentQuestionData.question}</p>
        <RadioGroup
          value={answers[currentQuestionData.id] || ""}
          onValueChange={(value) => !isQuestionAnswered(currentQuestionData.id) && handleAnswer(currentQuestionData.id, value)}
          className="space-y-2"
          disabled={isQuestionAnswered(currentQuestionData.id)}
        >
          {Object.entries(currentQuestionData.options).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center p-4 rounded-lg border-2 transition-all ${getOptionStyle(currentQuestionData.id, key)} ${isQuestionAnswered(currentQuestionData.id) ? 'cursor-default' : 'cursor-pointer hover:shadow-md'}`}
            >
              <div className="flex items-center flex-1">
                <RadioGroupItem 
                  value={key} 
                  id={`${currentQuestionData.id}-${key}`}
                  className="hidden"
                />
                <Label htmlFor={`${currentQuestionData.id}-${key}`} className="text-gray-700 flex-1">
                  {value}
                </Label>
              </div>
              {answers[currentQuestionData.id] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {key === currentQuestionData.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                  ) : answers[currentQuestionData.id] === key ? (
                    <XCircle className="w-6 h-6 text-red-500 ml-2" />
                  ) : null}
                </motion.div>
              )}
            </motion.div>
          ))}
        </RadioGroup>

        {isQuestionAnswered(currentQuestionData.id) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
          >
            <p className="text-blue-800">{currentQuestionData.explanation}</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={!canMovePrev}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          onClick={() => setCurrentQuestion(prev => prev + 1)}
          disabled={!canMoveNext}
          className="gap-2"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {totalAnswered === questions.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-green-500"
        >
          <p className="text-xl font-semibold text-blue-800">
            Quiz Complete!
          </p>
          <p className="text-blue-600 mt-2">
            Final Score: {score} out of {questions.length}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PracticalApplicationsSection;