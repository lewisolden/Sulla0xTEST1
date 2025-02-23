import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Wallet, Building2, Lock, Globe, CheckCircle2, X, Check, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Quiz questions remain the same
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

// Features array remains the same
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
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleComplete = async () => {
    await updateProgress(3, "defi-intro", true, 3);
    setIsCompleted(true);
    toast({
      title: "Progress Updated",
      description: "Section completed successfully!",
    });
  };

  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    const correct = selectedOption === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowPopup(true);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // Hide popup after 1.5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);

    // Auto advance after showing the explanation
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Introduction to DeFi
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Discover the revolutionary world of decentralized finance
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Learning Progress</p>
                  <p className="text-sm font-medium text-blue-600">
                    {showQuiz ? "Quiz in Progress" : "Reading Material"}
                  </p>
                </div>
                <Progress
                  value={showQuiz ? ((currentQuestion + 1) / quizQuestions.length) * 100 : 50}
                  className="bg-blue-100"
                />
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    What is DeFi?
                  </h2>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">Key Concept</h3>
                    </div>
                    <p className="text-gray-700">
                      Decentralized Finance (DeFi) represents a revolutionary shift in how financial services are delivered and accessed. Unlike traditional financial systems that rely on centralized intermediaries like banks and brokerages, DeFi leverages blockchain technology and smart contracts to provide financial services in a trustless, transparent, and permissionless manner.
                    </p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    DeFi applications (dApps) enable users to lend, borrow, trade, and invest without traditional intermediaries. This not only reduces costs and increases efficiency but also opens up financial services to anyone with an internet connection, regardless of their location or economic status.
                  </p>

                  {/* Enhanced Comparison Section */}
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                        <Building2 className="h-6 w-6" />
                        Traditional Finance
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          <span className="text-gray-700">Requires intermediaries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          <span className="text-gray-700">Limited access hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          <span className="text-gray-700">High fees</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 mt-1" />
                          <span className="text-gray-700">Geographic restrictions</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                        <Globe className="h-6 w-6" />
                        DeFi
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          <span className="text-gray-700">Trustless & automated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          <span className="text-gray-700">24/7 availability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          <span className="text-gray-700">Lower costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                          <span className="text-gray-700">Global access</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                  {/* Enhanced Feature Cards */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {!showQuiz ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                  >
                    <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all">
                      <CardHeader
                        onClick={() => setShowQuiz(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                            <div>
                              <CardTitle className="text-2xl text-white">Test Your Knowledge</CardTitle>
                              <p className="text-blue-50 mt-1">Complete the quiz to test your understanding</p>
                            </div>
                          </div>
                          <ArrowRight className="h-6 w-6 text-white" />
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ) : (
                  <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Topic Quiz
                    </h2>
                    {!quizCompleted ? (
                      <div className="relative">
                        {/* Answer Popup */}
                        <AnimatePresence>
                          {showPopup && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className={`absolute top-0 left-0 right-0 z-10 ${
                                isCorrect ? 'bg-green-500' : 'bg-red-500'
                              } text-white px-8 py-4 rounded-lg shadow-lg flex items-center justify-center gap-2`}
                            >
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="h-6 w-6" />
                                  <span className="text-xl font-bold">Correct!</span>
                                </>
                              ) : (
                                <>
                                  <X className="h-6 w-6" />
                                  <span className="text-xl font-bold">Incorrect</span>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                            <p className="text-sm text-gray-500">Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
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
                              let buttonStyle = "w-full justify-start text-left transition-all duration-300 hover:bg-blue-50";

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

                        <AnimatePresence>
                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4"
                            >
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
                                  <span className="font-semibold">Explanation: </span>
                                  {quizQuestions[currentQuestion].explanation}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300"
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
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>

                    <Link href="/defi/module1/blockchain-contracts">
                      <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        Next Section <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}