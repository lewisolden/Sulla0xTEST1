import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft, ArrowRight, Code2, Database, FileCode,
  LockIcon, RefreshCw, Settings, CheckCircle2, X, Check,
  Zap, Globe, Lock, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTop } from "@/hooks/useScrollTop";

// Quiz questions with explanations
const quizQuestions = [
  {
    question: "What is the primary function of a smart contract in DeFi?",
    options: [
      "Automatically execute predefined conditions without intermediaries",
      "Store cryptocurrency in a digital wallet",
      "Connect to traditional banking systems",
      "Process credit card payments"
    ],
    correctAnswer: 0,
    explanation: "Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute agreements when predefined conditions are met, eliminating the need for intermediaries in financial transactions."
  },
  {
    question: "Which property of blockchain technology makes smart contracts trustless?",
    options: [
      "High transaction speed",
      "Low transaction fees",
      "Immutable and transparent code execution",
      "Colorful user interface"
    ],
    correctAnswer: 2,
    explanation: "The immutable and transparent nature of blockchain ensures that smart contract code cannot be altered once deployed, and its execution is visible to all participants, creating a trustless environment where users don't need to rely on third parties."
  },
  {
    question: "How do smart contracts handle token transfers in DeFi?",
    options: [
      "Through manual bank transfers",
      "Using paper contracts",
      "Via automated code execution based on predefined rules",
      "By contacting customer support"
    ],
    correctAnswer: 2,
    explanation: "Smart contracts automatically handle token transfers based on predefined rules in their code. When conditions are met (like receiving payment), the contract automatically executes the transfer without requiring manual intervention."
  }
];

const BlockchainContracts = () => {
  const { updateProgress } = useProgress();
  const mountTimeRef = useRef(Date.now());
  const renderCountRef = useRef(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useScrollTop(); // Keep existing hook

  // Add explicit scroll behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]); // Scroll to top when question changes

  // Smart Contract Exercise State
  const [contractState, setContractState] = useState({
    balance: 100,
    threshold: 50,
    lastTransaction: null as number | null,
  });
  const [transferAmount, setTransferAmount] = useState("");
  const [exerciseOutput, setExerciseOutput] = useState<Array<{ type: 'success' | 'error', message: string }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "blockchain-contracts", true, 3);
    setIsCompleted(true);
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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

  // Smart Contract Exercise Functions
  const executeSmartContract = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: 'Invalid amount. Please enter a positive number.'
      }]);
      return;
    }

    if (amount > contractState.balance) {
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: 'Insufficient balance for transfer.'
      }]);
      return;
    }

    if (amount > contractState.threshold) {
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: `Transfer amount exceeds threshold (${contractState.threshold} tokens). Transaction rejected.`
      }]);
      return;
    }

    // Execute transfer
    setContractState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      lastTransaction: amount
    }));

    setExerciseOutput(prev => [...prev, {
      type: 'success',
      message: `Successfully transferred ${amount} tokens. New balance: ${contractState.balance - amount} tokens.`
    }]);
    setTransferAmount("");
  };

  const resetExercise = () => {
    setContractState({
      balance: 100,
      threshold: 50,
      lastTransaction: null,
    });
    setTransferAmount("");
    setExerciseOutput([]);
  };

  // Simplified performance monitoring
  useEffect(() => {
    const mountDuration = Date.now() - mountTimeRef.current;
    console.log(`[Performance] Initial mount took: ${mountDuration}ms`);
    renderCountRef.current += 1;
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/defi/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 pb-8">
              <div className="absolute inset-0 bg-grid-white/20" />
              <CardTitle className="text-3xl font-bold text-white z-10">
                Blockchain & Smart Contracts in DeFi
              </CardTitle>
              <p className="text-purple-100 mt-2 z-10">
                Discover the foundational technology powering modern decentralized finance
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <section className="mb-12">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl font-semibold text-blue-800 mb-6 flex items-center gap-2"
                >
                  <Globe className="h-6 w-6" />
                  The Role of Blockchain in DeFi
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-700 leading-relaxed mb-6"
                >
                  Blockchain technology serves as the foundation for DeFi applications, providing a secure, transparent, and decentralized infrastructure. In DeFi, blockchains like Ethereum enable trustless execution of financial services through smart contracts and provide a reliable way to track ownership of digital assets.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  {[
                    {
                      icon: Database,
                      title: "Decentralized Ledger",
                      description: "Distributed record-keeping eliminates single points of failure"
                    },
                    {
                      icon: Lock,
                      title: "Cryptographic Security",
                      description: "Advanced encryption protects transactions and data"
                    },
                    {
                      icon: RefreshCw,
                      title: "Consensus Mechanisms",
                      description: "Network participants agree on system state"
                    },
                    {
                      icon: Zap,
                      title: "Smart Contracts",
                      description: "Self-executing code powers DeFi applications"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-semibold text-blue-800 mb-6 flex items-center gap-2 relative z-10"
                  >
                    <Code2 className="h-6 w-6" />
                    Interactive Smart Contract Simulator
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Contract Interface */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white rounded-xl p-6 shadow-lg"
                    >
                      <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Contract Interface
                      </h3>

                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Balance:</span>
                            <motion.span
                              key={contractState.balance}
                              initial={{ scale: 1.2, color: "#2563EB" }}
                              animate={{ scale: 1, color: "#1E40AF" }}
                              className="font-medium"
                            >
                              {contractState.balance} tokens
                            </motion.span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Transfer Limit:</span>
                            <span className="font-medium text-blue-800">{contractState.threshold} tokens</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Transfer Amount
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={transferAmount}
                              onChange={(e) => setTransferAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="flex-1"
                            />
                            <Button
                              onClick={executeSmartContract}
                              className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                            >
                              Execute
                            </Button>
                          </div>
                        </div>

                        <Button
                          onClick={resetExercise}
                          variant="outline"
                          className="w-full hover:bg-blue-50"
                        >
                          Reset Contract
                        </Button>
                      </div>
                    </motion.div>

                    {/* Transaction Log */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white rounded-xl p-6 shadow-lg"
                    >
                      <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <FileCode className="h-5 w-5" />
                        Transaction Log
                      </h3>

                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg h-[200px] overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                          {exerciseOutput.length === 0 ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center text-gray-500 italic"
                            >
                              No transactions yet. Try executing a transfer!
                            </motion.p>
                          ) : (
                            exerciseOutput.map((output, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className={`mb-2 p-3 rounded-lg flex items-start gap-2 ${
                                  output.type === 'success'
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-red-50 border border-red-200'
                                }`}
                              >
                                {output.type === 'success' ? (
                                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                                )}
                                <span className={`text-sm ${
                                  output.type === 'success' ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {output.message}
                                </span>
                              </motion.div>
                            ))
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>

                  {/* Smart Contract Rules */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg p-6"
                  >
                    <h4 className="font-semibold text-blue-800 mb-4">Contract Rules:</h4>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {[
                        "Transfer amount must be positive and less than current balance",
                        "Transfers exceeding 50 tokens will be rejected (transfer threshold)",
                        "Contract state updates automatically after successful transfers",
                        "Failed transactions are logged but don't affect contract state"
                      ].map((rule, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          {rule}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </section>

              {/* Quiz Banner */}
              {!showQuiz ? (
                <div className="my-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
                  <div className="absolute inset-0 bg-grid-white/20" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Ready to Test Your Knowledge?
                      </h3>
                      <p className="text-purple-100">
                        Challenge yourself with our comprehensive quiz on blockchain technology and smart contracts
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-white text-purple-600 hover:bg-purple-50"
                      size="lg"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mt-8">
                  <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                    Knowledge Check
                  </h2>

                  {!quizCompleted ? (
                    <div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-gray-600">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                          </p>
                          <p className="text-sm font-medium text-blue-600">
                            Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-blue-600 h-2 rounded-full"
                            initial={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                            animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-gray-800">
                          {quizQuestions[currentQuestion].question}
                        </h3>

                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                            const showResult = selectedAnswer !== null;

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                <Button
                                  onClick={() => !selectedAnswer && handleAnswer(index)}
                                  variant="outline"
                                  className={`w-full justify-start text-left transition-all duration-300 ${
                                    showResult
                                      ? isCorrect
                                        ? "bg-green-50 border-green-500 text-green-700"
                                        : isSelected
                                          ? "bg-red-50 border-red-500 text-red-700"
                                          : ""
                                      : "hover:bg-blue-50"
                                  }`}
                                  disabled={selectedAnswer !== null}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span>{option}</span>
                                    {showResult && (isCorrect || isSelected) && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="ml-2"
                                      >
                                        {isCorrect ? (
                                          <Check className="h-5 w-5 text-green-500" />
                                        ) : (
                                          <X className="h-5 w-5 text-red-500" />
                                        )}
                                      </motion.span>
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
                            transition={{ duration: 0.5 }}
                            className={`mt-6 p-6 rounded-lg ${
                              selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                              ) : (
                                <X className="h-6 w-6 text-red-500 mt-1" />
                              )}
                              <div>
                                <h4 className={`font-medium mb-2 ${
                                  selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                    ? "text-green-800"
                                    : "text-red-800"
                                }`}>
                                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                    ? "Correct!"
                                    : "Incorrect"
                                  }
                                </h4>
                                <p className="text-gray-700">
                                  {quizQuestions[currentQuestion].explanation}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                          Quiz Completed!
                        </h3>
                        <p className="text-gray-600 text-lg mb-2">
                          You scored {score} out of {quizQuestions.length}
                        </p>
                        <p className="text-gray-500">
                          {score === quizQuestions.length
                            ? "Perfect score! You've mastered this topic!"
                            : "Keep learning and try again to improve your score!"}
                        </p>
                      </div>

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
                        className="transform hover:scale-105 transition-all duration-300"
                      >
                        Retake Quiz
                      </Button>
                    </motion.div>
                  )}
                </section>
              )}

              <div className="flex justify-between items-center mt-12">
                <Link href="/defi/module1/defi-intro">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Previous Section
                  </Button>
                </Link>

                <div className="flex gap-4">
                  <Button
                    onClick={handleComplete}
                    className={`transform transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed!" : "Mark as Complete"}
                  </Button>

                  <Link href="/defi/module1/dex-amm">
                    <Button className="gap-2">
                      Next Section <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainContracts;