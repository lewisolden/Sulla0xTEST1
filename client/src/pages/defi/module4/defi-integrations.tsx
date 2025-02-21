import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Building2, ArrowLeft, Network, Blocks, Database,
  BadgeCheck, ChartBar, GitFork, Lock, BookOpen, ArrowRight,
  Activity, CircleDollarSign, Shield, Wallet
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useProgress } from "@/context/progress-context";

// Quiz questions for the DeFi Integrations section
const quizQuestions = [
  {
    question: "What is a key characteristic of flash loans in DeFi?",
    options: [
      "They require high collateral",
      "They must be repaid within the same transaction block",
      "They have a 24-hour repayment period",
      "They can only be used for staking"
    ],
    correctAnswer: 1,
    explanation: "Flash loans must be borrowed and repaid within the same transaction block, enabling unique DeFi opportunities without requiring collateral."
  },
  {
    question: "Which of the following is a concentrated liquidity feature?",
    options: [
      "Equal distribution across all price ranges",
      "Liquidity provided only in specific price ranges",
      "Fixed fee percentages",
      "Unlimited pool size"
    ],
    correctAnswer: 1,
    explanation: "Concentrated liquidity allows liquidity providers to focus their capital in specific price ranges, improving capital efficiency."
  },
  {
    question: "What is MEV in DeFi?",
    options: [
      "Maximum Exchange Volume",
      "Miner Extractable Value",
      "Minimum Entry Value",
      "Multiple Exchange Verification"
    ],
    correctAnswer: 1,
    explanation: "MEV (Miner Extractable Value) refers to the value miners can extract by reordering, including, or excluding transactions in blocks."
  },
  {
    question: "Which strategy helps mitigate impermanent loss?",
    options: [
      "Increasing leverage",
      "Single-sided liquidity provision",
      "Delta-neutral positions",
      "Avoiding liquidity pools entirely"
    ],
    correctAnswer: 2,
    explanation: "Delta-neutral positions help offset potential losses from price movements, reducing impermanent loss risk in liquidity provision."
  },
  {
    question: "What is a key aspect of protocol-owned liquidity?",
    options: [
      "All liquidity is provided by users",
      "The protocol owns and controls its liquidity",
      "Liquidity is controlled by external market makers",
      "Liquidity is always locked for a fixed period"
    ],
    correctAnswer: 1,
    explanation: "Protocol-owned liquidity means the protocol itself owns and controls its liquidity, reducing dependence on external liquidity providers."
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
          <h3 className="text-2xl font-bold text-blue-800">DeFi Integration Systems</h3>
          <p className="text-gray-700 leading-relaxed">
            DeFi integrations form the backbone of the interconnected decentralized finance ecosystem,
            enabling seamless interactions between protocols, chains, and traditional finance through
            sophisticated bridge protocols and oracle systems.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Network className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-800">Cross-Chain Bridges</h4>
              </div>
              <p className="text-gray-600">
                Secure asset transfers and communication between different blockchain networks.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-purple-600" />
                <h4 className="text-lg font-semibold text-purple-800">Oracle Systems</h4>
              </div>
              <p className="text-gray-600">
                Real-world data integration and price feeds for DeFi applications.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="h-8 w-8 text-indigo-600" />
                <h4 className="text-lg font-semibold text-indigo-800">TradFi Bridges</h4>
              </div>
              <p className="text-gray-600">
                Connecting traditional finance with DeFi through compliant gateways.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "mechanisms",
    title: "Mechanisms",
    icon: GitFork,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Integration Mechanisms</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Bridge Protocols</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Network className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Cross-chain asset transfers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Security mechanisms</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Message passing protocols</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Oracle Systems</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Price feed networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChartBar className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Data aggregation systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Validation mechanisms</span>
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
    icon: BadgeCheck,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Real-World Examples</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Bridge Solutions</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Multichain</span>
                      <p className="text-sm text-gray-600">Cross-chain bridge protocol</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Chainlink</span>
                      <p className="text-sm text-gray-600">Decentralized oracle network</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">LayerZero</span>
                      <p className="text-sm text-gray-600">Omnichain interoperability protocol</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-purple-800 mb-4">Integration Types</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Cross-chain Messaging</span>
                      <p className="text-sm text-gray-600">Inter-blockchain communication</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Oracle Networks</span>
                      <p className="text-sm text-gray-600">External data integration</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Fiat Gateways</span>
                      <p className="text-sm text-gray-600">TradFi connectivity</p>
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

export default function DefiIntegrations() {
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

    // Auto advance after showing explanation
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
          'defi-integrations',
          finalScore >= 70,
          4,
          undefined,
          finalScore,
          '/defi/module4/defi-infrastructure',
          undefined,
          'DeFi'
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
                    DeFi Integrations: Building Connected Finance
                  </CardTitle>
                  <p className="text-blue-100 mt-2">
                    Explore the interconnected world of DeFi through cross-chain bridges,
                    oracle networks, and traditional finance integrations that power the
                    future of decentralized finance.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Understanding DeFi integrations is crucial for building robust and
                      interconnected financial applications. Learn about different types
                      of integrations and their real-world implementations.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                              <Network className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Bridge Protocols</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Cross-chain communication and asset transfers
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                              <Database className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Oracle Networks</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Real-world data and price feeds
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-indigo-200">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                              <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">TradFi Bridges</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Traditional finance connectivity
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
                    Verify your understanding of DeFi Integration concepts
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {!quizStarted ? (
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        Ready to test your knowledge of DeFi Integration concepts and implementation?
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
                    <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered DeFi Integration concepts!</p>
                  ) : score >= quizQuestions.length * 0.7 ? (
                    <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of DeFi Integration.</p>
                  ) : (
                    <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
                  )}
                  <Link href="/defi/module4/defi-infrastructure">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Continue to DeFi Infrastructure
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