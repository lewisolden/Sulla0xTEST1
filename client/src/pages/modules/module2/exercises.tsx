import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Wallet, Shield, Brain, ArrowRight, Trophy, Star } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import WalletSimulator from "@/components/exercises/WalletSimulator";
import SecurityWorkshop from "@/components/exercises/SecurityWorkshop";

const ExerciseSection = ({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  description: string;
  icon: any;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-8 ${className}`}
  >
    <Card className="p-6 bg-gradient-to-br from-orange-50 via-white to-red-50 border-2 border-transparent hover:border-orange-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-orange-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </Card>
  </motion.div>
);

const ExercisePreview = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: any;
  title: string;
  description: string;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden ${className}`}
  >
    <Card className="p-4 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-200">
      <div className="flex items-start gap-3">
        <Icon className="h-6 w-6 text-orange-600 mt-1" />
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function ModuleExercises() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null as number | null,
    isCorrect: false,
    showExplanation: false
  });

  const questions = [
    {
      question: "Which of the following is a key aspect of Bitcoin wallet security?",
      options: [
        "Sharing your private keys with trusted friends",
        "Storing your seed phrase digitally for easy access",
        "Using a hardware wallet for large amounts",
        "Keeping all funds on exchanges"
      ],
      correct: 2,
      explanation: "Hardware wallets provide the highest level of security for storing large amounts of Bitcoin by keeping private keys offline."
    },
    {
      question: "What is the primary purpose of cold storage?",
      options: [
        "To make frequent trades",
        "To keep funds offline and secure",
        "To earn interest on Bitcoin",
        "To speed up transactions"
      ],
      correct: 1,
      explanation: "Cold storage keeps cryptocurrency offline, significantly reducing the risk of hacks or theft."
    },
    {
      question: "Which practice improves Bitcoin transaction security?",
      options: [
        "Using public WiFi for transactions",
        "Verifying addresses multiple times",
        "Sending large amounts without testing",
        "Using simple passwords"
      ],
      correct: 1,
      explanation: "Always verify recipient addresses multiple times before sending Bitcoin to prevent irreversible transaction errors."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setAnswerState({
      selectedAnswer: selectedIndex,
      isCorrect,
      showExplanation: true,
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setAnswerState({
          selectedAnswer: null,
          isCorrect: false,
          showExplanation: false,
        });
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-6">
            <Link href="/modules/module2">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Brain className="h-8 w-8" />
              Practical Exercises & Simulations
            </h1>
            <p className="text-orange-100 text-lg">
              Apply your Bitcoin knowledge through hands-on wallet management, security training, and real-world scenarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <ExercisePreview
              icon={Wallet}
              title="Interactive Wallet Simulation"
              description="Practice creating and managing a Bitcoin wallet in a safe environment. Learn about key management, transactions, and security best practices."
            />
            <ExercisePreview
              icon={Shield}
              title="Security Best Practices"
              description="Test your knowledge of security protocols and learn to identify common threats and scams in the cryptocurrency space."
            />
            <ExercisePreview
              icon={Brain}
              title="Knowledge Assessment"
              description="Evaluate your understanding of Bitcoin concepts through interactive quizzes and real-world scenarios."
            />
          </div>

          <div className="space-y-8">
            <ExerciseSection
              title="Wallet Practice"
              description="Get hands-on experience with Bitcoin wallet management in a risk-free environment."
              icon={Wallet}
            >
              <WalletSimulator />
            </ExerciseSection>

            <ExerciseSection
              title="Security Workshop"
              description="Learn and practice essential security measures to protect your cryptocurrency assets."
              icon={Shield}
            >
              <SecurityWorkshop />
            </ExerciseSection>

            <ExerciseSection
              title="Knowledge Check"
              description="Test your understanding of key Bitcoin concepts"
              icon={Brain}
            >
              {!showResults ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-orange-800 mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
                  <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answerState.selectedAnswer === index;
                      const isCorrect = index === questions[currentQuestion].correct;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left p-4 relative ${
                              isSelected
                                ? isCorrect
                                  ? "bg-green-100 border-green-500 hover:bg-green-100"
                                  : "bg-red-100 border-red-500 hover:bg-red-100"
                                : "hover:bg-orange-50"
                            }`}
                            onClick={() => !answerState.showExplanation && handleAnswer(index)}
                            disabled={answerState.showExplanation}
                          >
                            <div className="flex items-center gap-4">
                              <span>{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                            </div>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {answerState.showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg ${
                        answerState.isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <p className={`font-semibold ${
                        answerState.isCorrect ? "text-green-800" : "text-red-800"
                      }`}>
                        {answerState.isCorrect ? "Correct!" : "Incorrect."}
                      </p>
                      <p className="mt-2 text-gray-700">
                        {questions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-orange-800 mb-4">
                    Knowledge Check Complete!
                  </h2>
                  <p className="text-lg mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <div className="flex justify-center mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-8 w-8 ${
                          i < Math.ceil((score / questions.length) * 5)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    {score === questions.length
                      ? "Perfect score! You've mastered these Bitcoin concepts!"
                      : "Great effort! Review the content and try again to improve your score."}
                  </p>
                </motion.div>
              )}
            </ExerciseSection>
          </div>

          <div className="mt-8 flex justify-between">
            <Link href="/modules/module2/bitcoin-investment">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous: Bitcoin Investment
              </Button>
            </Link>
            <div className="space-x-4">
              <Link href="/modules/module2/quiz">
                <Button 
                  className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Take Module Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}