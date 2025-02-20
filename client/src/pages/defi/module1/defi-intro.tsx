import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Wallet, Building2, Lock, Globe, CheckCircle2, X, Check } from "lucide-react";
import { motion } from "framer-motion";

// Quiz questions with explanations
const quizQuestions = [
  {
    question: "What is the primary difference between DeFi and traditional finance?",
    options: [
      "DeFi operates without centralized intermediaries",
      "DeFi only uses digital currencies",
      "DeFi is faster than traditional finance",
      "DeFi is more expensive to use"
    ],
    correctAnswer: 0,
    explanation: "DeFi's key innovation is its ability to provide financial services without centralized intermediaries like banks. This is achieved through smart contracts and blockchain technology, enabling trustless transactions and automated financial services."
  },
  {
    question: "Which of the following is NOT a key feature of DeFi?",
    options: [
      "Permissionless access",
      "Centralized control",
      "Smart contract automation",
      "Transparent transactions"
    ],
    correctAnswer: 1,
    explanation: "Centralized control goes against the fundamental principles of DeFi, which emphasizes decentralization and removes the need for central authorities. All other options are core features that make DeFi revolutionary."
  },
  {
    question: "What enables trustless execution in DeFi applications?",
    options: [
      "Government regulations",
      "Bank guarantees",
      "Smart contracts",
      "Human intermediaries"
    ],
    correctAnswer: 2,
    explanation: "Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce agreements without requiring trust in intermediaries, making them the foundation of trustless execution in DeFi."
  }
];

export default function DefiIntro() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "defi-intro", true, 3);
    setIsCompleted(true);
  };

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const features = [
    {
      icon: Globe,
      title: "Permissionless Access",
      description: "Anyone with an internet connection can access DeFi services without traditional barriers. No bank accounts, credit checks, or identity verification required."
    },
    {
      icon: Lock,
      title: "Trustless Operations",
      description: "Smart contracts automatically enforce rules without requiring trust in intermediaries. All transactions are verifiable on the blockchain."
    },
    {
      icon: Building2,
      title: "Financial Innovation",
      description: "Novel financial instruments like flash loans, yield farming, and liquidity mining enable new ways of generating returns and managing assets."
    },
    {
      icon: Wallet,
      title: "Asset Control",
      description: "Users maintain full custody of their assets with private keys, eliminating counterparty risk and the need for traditional custodians."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
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
              <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Introduction to DeFi
              </h1>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    What is DeFi?
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Decentralized Finance (DeFi) represents a revolutionary shift in how financial services are delivered and accessed. Unlike traditional financial systems that rely on centralized intermediaries like banks and brokerages, DeFi leverages blockchain technology and smart contracts to provide financial services in a trustless, transparent, and permissionless manner.
                  </p>
                  <p className="text-gray-700 mb-6">
                    DeFi applications (dApps) enable users to lend, borrow, trade, and invest without traditional intermediaries. This not only reduces costs and increases efficiency but also opens up financial services to anyone with an internet connection, regardless of their location or economic status.
                  </p>

                  {/* Comparison Diagram */}
                  <div className="grid md:grid-cols-2 gap-8 mb-12 bg-gray-50 p-6 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                        <Building2 className="h-6 w-6" />
                        Traditional Finance
                      </h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          Requires intermediaries
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          Limited access hours
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          High fees
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          Geographic restrictions
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                        <Globe className="h-6 w-6" />
                        DeFi
                      </h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          Trustless & automated
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          24/7 availability
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          Lower costs
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          Global access
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                  {/* Interactive Feature Cards */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* DeFi Ecosystem Visualization */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-6 text-center">
                      The DeFi Ecosystem
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <h4 className="font-semibold text-blue-700 mb-2">Lending & Borrowing</h4>
                        <p className="text-sm text-gray-600">Earn interest or get loans without banks</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <h4 className="font-semibold text-blue-700 mb-2">Decentralized Exchange</h4>
                        <p className="text-sm text-gray-600">Trade assets without intermediaries</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <h4 className="font-semibold text-blue-700 mb-2">Yield Farming</h4>
                        <p className="text-sm text-gray-600">Optimize returns across protocols</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Key Advantages Section */}
                  <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">The DeFi Advantage</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                        <span className="text-gray-700">24/7 market access with no trading hours or holidays</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                        <span className="text-gray-700">Lower fees due to automated processes and reduced overhead</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                        <span className="text-gray-700">Instant settlement of trades and transactions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                        <span className="text-gray-700">Full transparency with all transactions visible on the blockchain</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {!showQuiz ? (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Take Topic Quiz
                    </Button>
                  </div>
                ) : (
                  <section className="bg-gray-50 rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Topic Quiz
                    </h2>
                    {!quizCompleted ? (
                      <div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                            />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          {quizQuestions[currentQuestion].question}
                        </h3>
                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                            let buttonStyle = "w-full justify-start text-left transition-all duration-300";

                            if (isSelected) {
                              buttonStyle += isCorrect 
                                ? " bg-green-50 border-green-500 text-green-700" 
                                : " bg-red-50 border-red-500 text-red-700";
                            }

                            return (
                              <Button
                                key={index}
                                onClick={() => !selectedAnswer && handleAnswer(index)}
                                variant="outline"
                                className={buttonStyle}
                                disabled={selectedAnswer !== null}
                              >
                                <span className="flex items-center gap-2 w-full">
                                  {option}
                                  {isSelected && (
                                    isCorrect 
                                      ? <Check className="h-5 w-5 text-green-500 ml-auto" />
                                      : <X className="h-5 w-5 text-red-500 ml-auto" />
                                  )}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-4 p-4 rounded-lg ${
                              selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                            }`}
                          >
                            <p className={`text-sm ${
                              selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                ? "text-green-800"
                                : "text-red-800"
                            }`}>
                              {quizQuestions[currentQuestion].explanation}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          Quiz Completed!
                        </h3>
                        <p className="text-gray-600 mb-4">
                          You scored {score} out of {quizQuestions.length}
                        </p>
                        <Button
                          onClick={() => {
                            setShowQuiz(false);
                            setCurrentQuestion(0);
                            setScore(0);
                            setQuizCompleted(false);
                            setSelectedAnswer(null);
                            setShowExplanation(false);
                          }}
                          variant="outline"
                        >
                          Retake Quiz
                        </Button>
                      </motion.div>
                    )}
                  </section>
                )}

                <div className="flex justify-between items-center mt-12">
                  <Link href="/defi/module1">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Module Overview
                    </Button>
                  </Link>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleComplete}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>

                    <Link href="/defi/module1/blockchain-contracts">
                      <Button className="gap-2">
                        Next Section <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}