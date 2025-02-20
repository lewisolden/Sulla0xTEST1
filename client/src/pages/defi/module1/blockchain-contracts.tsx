import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Code2, Database, FileCode, LockIcon, RefreshCw, Settings, CheckCircle2, X, Check } from "lucide-react";
import { motion } from "framer-motion";

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

export default function BlockchainContracts() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Smart Contract Exercise State
  const [contractState, setContractState] = useState({
    balance: 100,
    threshold: 50,
    lastTransaction: null as number | null,
  });
  const [transferAmount, setTransferAmount] = useState("");
  const [exerciseOutput, setExerciseOutput] = useState<Array<{ type: 'success' | 'error', message: string }>>([]);

  const handleComplete = async () => {
    await updateProgress(3, "blockchain-contracts", true, 3);
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

  // Smart Contract Exercise Functions
  const executeSmartContract = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setExerciseOutput(prev => [...prev, { type: 'error', message: 'Invalid amount. Please enter a positive number.' }]);
      return;
    }

    if (amount > contractState.balance) {
      setExerciseOutput(prev => [...prev, { type: 'error', message: 'Insufficient balance for transfer.' }]);
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
                Blockchain & Smart Contracts in DeFi
              </h1>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    The Role of Blockchain in DeFi
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Blockchain technology serves as the foundation for DeFi applications, providing a secure, transparent, and decentralized infrastructure. In DeFi, blockchains like Ethereum enable trustless execution of financial services through smart contracts and provide a reliable way to track ownership of digital assets.
                  </p>

                  {/* Blockchain Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    {[
                      {
                        icon: Database,
                        title: "Decentralized Ledger",
                        description: "Distributed record-keeping eliminates single points of failure and ensures data integrity"
                      },
                      {
                        icon: LockIcon,
                        title: "Cryptographic Security",
                        description: "Advanced encryption protects transactions and ensures immutability of records"
                      },
                      {
                        icon: RefreshCw,
                        title: "Consensus Mechanisms",
                        description: "Network participants agree on the state of the system without central authority"
                      },
                      {
                        icon: Settings,
                        title: "Programmable Platform",
                        description: "Enables creation and execution of complex financial applications"
                      }
                    ].map((feature, index) => (
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
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding Smart Contracts
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute agreements when predetermined conditions are met, eliminating the need for intermediaries in financial transactions.
                  </p>

                  {/* Smart Contract Components */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Smart Contract Components</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <Code2 className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-2">Code Logic</h4>
                        <p className="text-sm text-gray-600">Rules and conditions for execution</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <FileCode className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-2">State Storage</h4>
                        <p className="text-sm text-gray-600">Contract data and variables</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <Settings className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-2">Functions</h4>
                        <p className="text-sm text-gray-600">Methods to interact with contract</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Smart Contract Exercise */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      <Code2 className="h-6 w-6" />
                      Interactive Smart Contract Simulator
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Experience how smart contracts work by interacting with this simulated token transfer contract.
                      The contract implements basic safety features like balance checks and transfer limits.
                    </p>

                    {/* Contract Features */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <LockIcon className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-1">Safety Controls</h4>
                        <p className="text-sm text-gray-600">Built-in limits and balance checks prevent unauthorized transfers</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <Database className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-1">State Management</h4>
                        <p className="text-sm text-gray-600">Contract maintains balance and transaction history</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <RefreshCw className="h-6 w-6 text-blue-500 mb-2" />
                        <h4 className="font-semibold text-blue-700 mb-1">Automated Execution</h4>
                        <p className="text-sm text-gray-600">Instant validation and processing of transfers</p>
                      </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contract Interface */}
                      <div className="bg-white rounded-lg p-6 shadow-md">
                        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Contract Interface
                        </h4>

                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-600">Current Balance:</span>
                              <span className="font-medium text-blue-600">{contractState.balance} tokens</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-600">Transfer Limit:</span>
                              <span className="font-medium text-blue-600">{contractState.threshold} tokens</span>
                            </div>
                            {contractState.lastTransaction && (
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Last Transfer:</span>
                                <span className="font-medium text-blue-600">{contractState.lastTransaction} tokens</span>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Transfer Amount
                            </label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(e.target.value)}
                                placeholder="Enter amount to transfer"
                                className="flex-1"
                              />
                              <Button
                                onClick={executeSmartContract}
                                className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                              >
                                Execute Transfer
                              </Button>
                            </div>
                          </div>

                          <Button
                            onClick={resetExercise}
                            variant="outline"
                            className="w-full hover:bg-gray-50 transition-colors"
                          >
                            Reset Contract State
                          </Button>
                        </div>
                      </div>

                      {/* Transaction Log */}
                      <div className="bg-white rounded-lg p-6 shadow-md">
                        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          <FileCode className="h-5 w-5" />
                          Transaction Log
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg h-[250px] overflow-y-auto">
                          {exerciseOutput.length === 0 ? (
                            <p className="text-gray-500 text-center italic">No transactions yet. Try executing a transfer!</p>
                          ) : (
                            exerciseOutput.map((output, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mb-2 p-2 rounded ${
                                  output.type === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {output.type === 'success'
                                    ? <Check className="h-4 w-4 mt-1" />
                                    : <X className="h-4 w-4 mt-1" />
                                  }
                                  <span className="text-sm">{output.message}</span>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Smart Contract Rules */}
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-blue-800 mb-3">Contract Rules:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Transfer amount must be positive and less than current balance
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Transfers exceeding 50 tokens will be rejected (transfer threshold)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Contract state updates automatically after successful transfers
                        </li>
                      </ul>
                    </div>
                  </div>

                </section>

                {!showQuiz ? (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
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
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                            <p className="text-sm text-gray-500">Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</p>
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
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="mb-6"
                        >
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
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                  <Button
                                    onClick={() => !selectedAnswer && handleAnswer(index)}
                                    variant="outline"
                                    className={buttonStyle}
                                    disabled={selectedAnswer !== null}
                                  >
                                    <span className="flex items-center gap-2 w-full">
                                      {option}
                                      {isSelected && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                          className="ml-auto"
                                        >
                                          {isCorrect
                                            ? <Check className="h-5 w-5 text-green-500" />
                                            : <X className="h-5 w-5 text-red-500" />
                                          }
                                        </motion.span>
                                      )}
                                    </span>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>

                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-4"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 10 }}
                              className="flex justify-center"
                            >
                              <div
                                className={`text-lg font-semibold px-4 py-2 rounded-full ${
                                  selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
                              </div>
                            </motion.div>

                            <div className={`p-4 rounded-lg ${
                              selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                            }`}>
                              <p className={`text-sm ${
                                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                  ? "text-green-800"
                                  : "text-red-800"
                              }`}>
                                {quizQuestions[currentQuestion].explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
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
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>

                    <Link href="/defi/module1/dex-amm">
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