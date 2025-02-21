import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Server, Network, Shield, Cpu, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";

const topicQuizQuestions = [
  {
    question: "Which Layer 2 scaling solution processes transactions off-chain and posts transaction data to the main chain?",
    options: [
      "Sidechains",
      "Optimistic Rollups",
      "Plasma Chains",
      "State Channels"
    ],
    correctAnswer: 1
  },
  {
    question: "What is the primary purpose of oracle networks in DeFi infrastructure?",
    options: [
      "To provide external data to smart contracts",
      "To process transactions faster",
      "To store user data",
      "To validate network nodes"
    ],
    correctAnswer: 0
  },
  {
    question: "Which of the following is a key feature of cross-chain infrastructure?",
    options: [
      "Single chain optimization",
      "Centralized control",
      "Interoperability between different blockchains",
      "Maximum transaction fees"
    ],
    correctAnswer: 2
  }
];

export default function DefiInfrastructure() {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === topicQuizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < topicQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      const finalScore = (score / topicQuizQuestions.length) * 100;
      updateProgress(4, 'defi-module4-infrastructure', true, 1, undefined, finalScore);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {!showQuiz ? (
          <>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                DeFi Infrastructure and Future Development
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore the foundational infrastructure that powers DeFi protocols and the future developments shaping the ecosystem.
              </p>
            </div>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="grid gap-8">
                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <Database className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold">Layer 1 and Layer 2 Infrastructure</h2>
                  </motion.div>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      Layer 1 blockchains serve as the foundation for DeFi, providing security and decentralization. However, scalability challenges have led to the development of Layer 2 solutions:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Card className="p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                        <h3 className="font-semibold text-blue-800 mb-2">Optimistic Rollups</h3>
                        <p className="text-sm">Process transactions off-chain and post proofs to mainnet, offering significant scalability improvements.</p>
                      </Card>
                      <Card className="p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                        <h3 className="font-semibold text-blue-800 mb-2">ZK-Rollups</h3>
                        <p className="text-sm">Use zero-knowledge proofs for transaction validation, providing privacy and scalability benefits.</p>
                      </Card>
                    </div>
                  </div>
                </section>

                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <Server className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold">Node Infrastructure and RPC Services</h2>
                  </motion.div>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      Reliable node infrastructure is crucial for DeFi applications to interact with blockchain networks effectively and securely.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-3">Key Components:</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Decentralized Node Networks (Infura, Alchemy)</li>
                        <li>Self-Hosted Node Solutions</li>
                        <li>Light Client Implementations</li>
                        <li>Cross-Chain Communication Protocols</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <Shield className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold">Security and Oracle Infrastructure</h2>
                  </motion.div>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      Security infrastructure and reliable data feeds are essential for DeFi protocols to operate safely and efficiently.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Card className="p-4 bg-purple-50 hover:bg-purple-100 transition-colors">
                        <h3 className="font-semibold text-purple-800 mb-2">Oracle Networks</h3>
                        <p className="text-sm">Chainlink and Pyth provide secure, decentralized price feeds and external data.</p>
                      </Card>
                      <Card className="p-4 bg-purple-50 hover:bg-purple-100 transition-colors">
                        <h3 className="font-semibold text-purple-800 mb-2">Security Tools</h3>
                        <p className="text-sm">Automated auditing systems and MEV protection solutions enhance protocol security.</p>
                      </Card>
                    </div>
                  </div>
                </section>

                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <Cpu className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold">Future Infrastructure Developments</h2>
                  </motion.div>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      The future of DeFi infrastructure focuses on improving scalability, security, and user experience through innovative solutions.
                    </p>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-3">Emerging Technologies:</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Account Abstraction and Smart Accounts</li>
                        <li>Zero-Knowledge Proof Applications</li>
                        <li>Modular Blockchain Architecture</li>
                        <li>AI-Enhanced DeFi Infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  Take Topic Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <Card className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DeFi Infrastructure Quiz
            </h2>

            {!showResults ? (
              <>
                <Progress 
                  value={(currentQuestion / topicQuizQuestions.length) * 100} 
                  className="mb-6"
                />
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Question {currentQuestion + 1} of {topicQuizQuestions.length}
                  </h3>
                  <p className="text-lg mb-4">{topicQuizQuestions[currentQuestion].question}</p>
                  <div className="space-y-3">
                    {topicQuizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => handleAnswerSelection(index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === topicQuizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <p className="text-xl mb-4">
                  Your score: {score} out of {topicQuizQuestions.length}
                </p>
                <Progress 
                  value={(score / topicQuizQuestions.length) * 100} 
                  className="mb-6"
                />
                {score === topicQuizQuestions.length ? (
                  <div className="flex items-center justify-center gap-2 text-green-500 font-semibold mb-6">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Perfect score! You've mastered DeFi infrastructure concepts!</span>
                  </div>
                ) : score >= topicQuizQuestions.length * 0.7 ? (
                  <div className="flex items-center justify-center gap-2 text-blue-500 font-semibold mb-6">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Great job! You have a solid understanding of DeFi infrastructure.</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-yellow-500 font-semibold mb-6">
                    <XCircle className="h-5 w-5" />
                    <span>Keep learning! Review the material and try again to improve your score.</span>
                  </div>
                )}
                <Link href="/defi/module4/quiz">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity">
                    Continue to Module Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
}