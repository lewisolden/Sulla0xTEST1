import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Wallet, Building2, Lock, Globe, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Quiz questions
const quizQuestions = [
  {
    question: "What is the primary difference between DeFi and traditional finance?",
    options: [
      "DeFi operates without centralized intermediaries",
      "DeFi only uses digital currencies",
      "DeFi is faster than traditional finance",
      "DeFi is more expensive to use"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is NOT a key feature of DeFi?",
    options: [
      "Permissionless access",
      "Centralized control",
      "Smart contract automation",
      "Transparent transactions"
    ],
    correctAnswer: 1
  },
  {
    question: "What enables trustless execution in DeFi applications?",
    options: [
      "Government regulations",
      "Bank guarantees",
      "Smart contracts",
      "Human intermediaries"
    ],
    correctAnswer: 2
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

  const handleComplete = async () => {
    await updateProgress(3, "defi-intro", true, 3);
    setIsCompleted(true);
  };

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const features = [
    {
      icon: Globe,
      title: "Permissionless Access",
      description: "Anyone with an internet connection can access DeFi services without traditional barriers"
    },
    {
      icon: Lock,
      title: "Trustless Operations",
      description: "Smart contracts automatically enforce rules without requiring trust in intermediaries"
    },
    {
      icon: Building2,
      title: "Financial Innovation",
      description: "New financial instruments and services that weren't possible in traditional finance"
    },
    {
      icon: Wallet,
      title: "Asset Control",
      description: "Users maintain full control of their assets without relying on custodial services"
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
                    Decentralized Finance (DeFi) represents a fundamental shift in how financial services are delivered and accessed. Unlike traditional financial systems that rely on centralized intermediaries like banks and brokerages, DeFi leverages blockchain technology and smart contracts to provide financial services in a trustless, transparent, and permissionless manner.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
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
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                            />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          {quizQuestions[currentQuestion].question}
                        </h3>
                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              variant="outline"
                              className="w-full justify-start text-left"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
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
                          }}
                          variant="outline"
                        >
                          Retake Quiz
                        </Button>
                      </div>
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