import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Database, Server, Network, Shield, Cpu, ArrowLeft, ArrowRight, BookOpen, Activity, CheckCircle2 } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useProgress } from "@/context/progress-context";

const quizQuestions = [
  {
    question: "Which Layer 2 scaling solution provides immediate transaction finality using zero-knowledge proofs?",
    options: [
      "Optimistic Rollups",
      "ZK-Rollups",
      "Plasma Chains",
      "State Channels"
    ],
    correctAnswer: 1,
    explanation: "ZK-Rollups use zero-knowledge proofs to validate transactions, providing immediate finality without the waiting period required by Optimistic Rollups."
  },
  {
    question: "What is the primary function of RPC nodes in DeFi infrastructure?",
    options: [
      "Mining new blocks",
      "Providing API access to blockchain data",
      "Creating smart contracts",
      "Managing user wallets"
    ],
    correctAnswer: 1,
    explanation: "RPC (Remote Procedure Call) nodes provide API access to blockchain data, allowing DeFi applications to interact with the blockchain network."
  },
  {
    question: "Which component is essential for enabling cross-chain DeFi operations?",
    options: [
      "Bridge protocols",
      "Mining software",
      "NFT marketplaces",
      "Social media integration"
    ],
    correctAnswer: 0,
    explanation: "Bridge protocols are essential for cross-chain DeFi as they enable the secure transfer of assets and data between different blockchain networks."
  },
  {
    question: "What is a key feature of decentralized oracle networks?",
    options: [
      "Single data source reliability",
      "Centralized price feeds",
      "Multiple independent data validators",
      "Manual data updates"
    ],
    correctAnswer: 2,
    explanation: "Decentralized oracle networks use multiple independent validators to ensure reliable and manipulation-resistant data feeds for DeFi protocols."
  },
  {
    question: "Which infrastructure component helps prevent MEV exploitation?",
    options: [
      "Block explorers",
      "Transaction ordering protocols",
      "Wallet interfaces",
      "Smart contract languages"
    ],
    correctAnswer: 1,
    explanation: "Transaction ordering protocols help prevent Maximal Extractable Value (MEV) exploitation by protecting users from front-running and other transaction ordering attacks."
  }
];

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">The Foundation of DeFi</h3>
          <p className="text-gray-700 leading-relaxed">
            DeFi infrastructure represents the fundamental building blocks that enable decentralized
            financial applications to operate efficiently, securely, and at scale. Understanding these
            components is crucial for developers, users, and stakeholders in the DeFi ecosystem.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-800">Scalability Solutions</h4>
              </div>
              <p className="text-gray-600">
                Layer 2 solutions and scaling technologies enabling high-throughput DeFi applications with reduced costs.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Network className="h-8 w-8 text-purple-600" />
                <h4 className="text-lg font-semibold text-purple-800">Network Architecture</h4>
              </div>
              <p className="text-gray-600">
                Robust node infrastructure and RPC services supporting reliable DeFi protocol operations.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
                <h4 className="text-lg font-semibold text-indigo-800">Security Framework</h4>
              </div>
              <p className="text-gray-600">
                Comprehensive security measures including oracle networks and MEV protection mechanisms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "components",
    title: "Components",
    icon: Activity,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Core Infrastructure Components</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Layer 2 Solutions</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Optimistic Rollups (Optimism, Arbitrum)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">ZK-Rollups (zkSync, StarkNet)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Network className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">State Channels and Plasma Networks</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Node Infrastructure</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Server className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">RPC Service Providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Validator Networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Data Indexing Services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "implementation",
    title: "Implementation",
    icon: CheckCircle2,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Implementation Examples</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Layer 2 Protocols</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Optimism</span>
                      <p className="text-sm text-gray-600">Optimistic rollup solution for Ethereum</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">zkSync</span>
                      <p className="text-sm text-gray-600">ZK-rollup platform with EVM compatibility</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Polygon zkEVM</span>
                      <p className="text-sm text-gray-600">Zero-knowledge scaling solution</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-purple-800 mb-4">Infrastructure Providers</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Infura</span>
                      <p className="text-sm text-gray-600">Enterprise-grade node infrastructure</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">The Graph</span>
                      <p className="text-sm text-gray-600">Decentralized indexing protocol</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Chainlink</span>
                      <p className="text-sm text-gray-600">Decentralized oracle network</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
];

export default function DefiInfrastructure() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();
  const [activeTab, setActiveTab] = useState("overview");
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Let's look at why this is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand the correct answer.",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
        updateProgress(
          4,
          'defi-infrastructure',
          finalScore >= 70,
          4,
          undefined,
          finalScore,
          '/defi/module4/quiz'
        );
      }
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module4">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 4
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {!showResults ? (
            <>
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-3xl">
                    DeFi Infrastructure and Scaling Solutions
                  </CardTitle>
                  <p className="text-blue-100 mt-2">
                    Explore the foundational infrastructure that powers DeFi protocols,
                    from Layer 2 scaling solutions to oracle networks and security frameworks.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Understanding DeFi infrastructure is crucial for building and participating in the
                      decentralized financial ecosystem. Learn about key components and their roles.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                              <Database className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Scaling</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Layer 2 solutions and scaling technologies
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                              <Network className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Networks</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Node infrastructure and RPC services
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-indigo-200">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                              <Shield className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Security</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Oracle networks and MEV protection
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  {sections.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center gap-2"
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id}>
                    <Card>
                      <CardContent className="p-6">
                        {section.content}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
                  <p className="text-blue-100 mt-2">
                    Verify your understanding of DeFi infrastructure concepts
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {!quizStarted ? (
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        Ready to test your knowledge of DeFi infrastructure and scaling solutions?
                      </p>
                      <Button onClick={handleStartQuiz} className="w-full md:w-auto">
                        Start Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mb-6" />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            Question {currentQuestion + 1}/{quizQuestions.length}
                          </h3>
                          <span className="text-sm font-medium text-blue-600">
                            Score: {score}/{quizQuestions.length}
                          </span>
                        </div>
                        <p className="text-lg">{quizQuestions[currentQuestion].question}</p>
                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              variant={selectedAnswer === index ? 
                                (index === quizQuestions[currentQuestion].correctAnswer ? "default" : "destructive")
                                : "outline"}
                              disabled={showExplanation}
                              className="w-full justify-start text-left"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-50 p-4 rounded-lg"
                          >
                            <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                            <p className="text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                  <p className="text-xl mb-4">
                    Your score: {score}/{quizQuestions.length}
                  </p>
                  <Progress value={(score / quizQuestions.length) * 100} className="mb-6" />
                  {score === quizQuestions.length ? (
                    <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered DeFi infrastructure concepts!</p>
                  ) : score >= quizQuestions.length * 0.7 ? (
                    <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of DeFi infrastructure.</p>
                  ) : (
                    <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
                  )}
                  <Link href="/defi/module4/quiz">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Continue to Module Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}