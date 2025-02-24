import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft, ArrowRight, Code2, Database, FileCode,
  LockIcon, RefreshCw, Settings, CheckCircle2, X, Check,
  Zap, Globe, Lock, ChevronRight, AlertCircle, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Component for displaying transaction animation
const TransactionAnimation = ({ isActive, success }) => {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r ${
        success ? 'from-green-500/20 to-blue-500/20' : 'from-red-500/20 to-orange-500/20'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    />
  );
};

// Smart Contract Rules Component
const ContractRules = ({ rules }) => {
  return (
    <div className="space-y-2">
      {rules.map((rule, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-help">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700">{rule.title}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{rule.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

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

  useScrollTop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const [contractState, setContractState] = useState({
    balance: 100,
    threshold: 50,
    lastTransaction: null,
    transactionCount: 0,
    successfulTransactions: 0,
    failedTransactions: 0
  });
  const [transferAmount, setTransferAmount] = useState("");
  const [exerciseOutput, setExerciseOutput] = useState<Array<{ type: 'success' | 'error', message: string }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationSuccess, setAnimationSuccess] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [showHelp, setShowHelp] = useState(true);

  const contractRules = [
    {
      title: "Positive Balance Rule",
      description: "Transfers must be positive numbers and cannot exceed your current balance."
    },
    {
      title: "Transfer Threshold",
      description: "The smart contract has a built-in safety feature that rejects transfers above 50 tokens."
    },
    {
      title: "Automatic Execution",
      description: "Once conditions are met, the contract automatically executes without intermediaries."
    },
    {
      title: "Transaction Logging",
      description: "All transaction attempts are recorded, whether successful or failed, ensuring transparency."
    }
  ];

  const steps = [
    {
      title: "Understanding Smart Contracts",
      description: "Smart contracts are self-executing programs that automatically enforce rules when conditions are met."
    },
    {
      title: "Contract Rules",
      description: "Explore the rules that govern this smart contract's behavior."
    },
    {
      title: "Making Transactions",
      description: "Try different transaction amounts to see how the contract behaves."
    }
  ];

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
    }, 8000);
  };

  const executeSmartContract = () => {
    const amount = parseFloat(transferAmount);
    setShowAnimation(true);

    if (isNaN(amount) || amount <= 0) {
      setAnimationSuccess(false);
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: 'Invalid amount. Please enter a positive number.'
      }]);
      setTimeout(() => setShowAnimation(false), 1000);
      return;
    }

    if (amount > contractState.balance) {
      setAnimationSuccess(false);
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: 'Insufficient balance for transfer.'
      }]);
      setTimeout(() => setShowAnimation(false), 1000);
      return;
    }

    if (amount > contractState.threshold) {
      setAnimationSuccess(false);
      setExerciseOutput(prev => [...prev, {
        type: 'error',
        message: `Transfer amount exceeds threshold (${contractState.threshold} tokens). Transaction rejected.`
      }]);
      setTimeout(() => setShowAnimation(false), 1000);
      return;
    }

    setAnimationSuccess(true);
    setContractState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      lastTransaction: amount,
      transactionCount: prev.transactionCount + 1,
      successfulTransactions: prev.successfulTransactions + 1
    }));

    setExerciseOutput(prev => [...prev, {
      type: 'success',
      message: `Successfully transferred ${amount} tokens. New balance: ${contractState.balance - amount} tokens.`
    }]);
    setTransferAmount("");

    setTimeout(() => {
      setShowAnimation(false);
      if (activeStep === 2) setActiveStep(3);
    }, 1000);
  };

  // Quiz questions with explanations (remains unchanged)
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
                Interactive Smart Contract Simulator
              </CardTitle>
              <p className="text-purple-100 mt-2 z-10">
                Experience how smart contracts work in a safe, educational environment
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className={`flex-1 ${index !== steps.length - 1 ? 'border-r' : ''} px-4`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`h-2 rounded-full ${
                        index <= activeStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                      <h3 className="text-sm font-medium mt-2">{step.title}</h3>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <TransactionAnimation 
                    isActive={showAnimation} 
                    success={animationSuccess} 
                  />

                  <Card className="bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Smart Contract Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Balance</p>
                            <motion.p
                              key={contractState.balance}
                              className="text-xl font-semibold text-blue-700"
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                            >
                              {contractState.balance} tokens
                            </motion.p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Threshold</p>
                            <p className="text-xl font-semibold text-purple-700">
                              {contractState.threshold} tokens
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-sm text-gray-600">Total Transactions</p>
                            <p className="text-lg font-medium text-gray-800">
                              {contractState.transactionCount}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Successful</p>
                            <p className="text-lg font-medium text-green-600">
                              {contractState.successfulTransactions}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Failed</p>
                            <p className="text-lg font-medium text-red-600">
                              {contractState.failedTransactions}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
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
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={executeSmartContract}
                                    className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                                  >
                                    Execute Contract
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Execute the smart contract with the specified amount</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setContractState({
                              balance: 100,
                              threshold: 50,
                              lastTransaction: null,
                              transactionCount: 0,
                              successfulTransactions: 0,
                              failedTransactions: 0
                            });
                            setExerciseOutput([]);
                            setTransferAmount("");
                          }}
                          variant="outline"
                          className="w-full hover:bg-blue-50"
                        >
                          Reset Contract
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <Card className="bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                        <FileCode className="h-5 w-5" />
                        Transaction History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] overflow-y-auto space-y-2">
                        <AnimatePresence mode="popLayout">
                          {exerciseOutput.length === 0 ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center text-gray-500 italic p-4"
                            >
                              No transactions yet. Start by executing a transfer!
                            </motion.p>
                          ) : (
                            exerciseOutput.map((output, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className={`p-3 rounded-lg flex items-start gap-2 ${
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
                                <span className={output.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                                  {output.message}
                                </span>
                              </motion.div>
                            ))
                          )}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                        <LockIcon className="h-5 w-5" />
                        Contract Rules
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ContractRules rules={contractRules} />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-blue-50 p-6 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-800">How to Use This Simulator</h3>
                        <p className="text-sm text-blue-600">Follow these steps to learn about smart contracts:</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHelp(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-blue-700">
                      1. Start with small transfers (e.g., 10-20 tokens) to understand basic execution
                    </p>
                    <p className="text-sm text-blue-700">
                      2. Try amounts above the threshold (50 tokens) to see how contract rules work
                    </p>
                    <p className="text-sm text-blue-700">
                      3. Watch the transaction history to understand contract behavior
                    </p>
                    <p className="text-sm text-blue-700">
                      4. Hover over rules to learn more about smart contract principles
                    </p>
                  </div>
                </motion.div>
              )}


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
                                <p className="text-sm text-blue-600 italic mt-2">
                                  Next question in 8 seconds...
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