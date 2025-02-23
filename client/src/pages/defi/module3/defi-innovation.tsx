import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  Rocket,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  Zap,
  Layers,
  Network,
  GitBranch,
  Cpu,
  Globe
} from "lucide-react";

// Innovation Dashboard Interface
interface InnovationMetrics {
  totalProjects: number;
  activeUsers: number;
  marketCap: number;
  growthRate: number;
}

const InnovationDashboard = () => {
  const [metrics, setMetrics] = useState<InnovationMetrics>({
    totalProjects: 850,
    activeUsers: 2500000,
    marketCap: 45000000000,
    growthRate: 127
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500 rounded-lg">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-800">
            DeFi Innovation Tracker
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Total Projects</p>
                  <p className="text-2xl font-bold">{formatNumber(metrics.totalProjects)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <GitBranch className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold">{formatNumber(metrics.activeUsers)}</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-lg">
                  <Globe className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Market Cap</p>
                  <p className="text-2xl font-bold">${formatNumber(metrics.marketCap)}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Network className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                  <p className="text-2xl font-bold">{metrics.growthRate}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const InnovationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "What is Layer 2 scaling in DeFi?",
      options: {
        a: "A backup blockchain network",
        b: "A secondary processing system built on top of the main blockchain",
        c: "A type of cryptocurrency",
        d: "A blockchain consensus mechanism"
      },
      correct: "b",
      explanation: "Layer 2 scaling solutions are secondary frameworks or protocols built on top of existing blockchains (Layer 1) to improve their scalability and efficiency while maintaining the security of the main chain."
    },
    {
      id: 2,
      question: "Which innovation aims to make DeFi more environmentally sustainable?",
      options: {
        a: "Proof of Stake",
        b: "Proof of Work",
        c: "Proof of Authority",
        d: "Proof of Space"
      },
      correct: "a",
      explanation: "Proof of Stake (PoS) is an environmentally friendly consensus mechanism that requires validators to stake tokens rather than solve complex mathematical problems, significantly reducing energy consumption."
    },
    {
      id: 3,
      question: "What is the primary goal of cross-chain interoperability in DeFi?",
      options: {
        a: "To create new cryptocurrencies",
        b: "To enable communication between different blockchain networks",
        c: "To increase transaction fees",
        d: "To replace existing blockchains"
      },
      correct: "b",
      explanation: "Cross-chain interoperability allows different blockchain networks to communicate and share data, enabling seamless asset transfers and increasing the efficiency of the DeFi ecosystem."
    }
  ];

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowExplanation(true);

    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Moving to next question...",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand why before moving on.",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setShowExplanation(false);
        setUserAnswer(null);
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 7000); // Changed from 3000 to 7000
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="text-2xl">Test Your Innovation Knowledge</CardTitle>
        <p className="text-purple-100 mt-2">
          Verify your understanding of DeFi innovations and future trends
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to test your knowledge of DeFi innovations, emerging trends,
              and technological advancements?
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Question {currentQuestion + 1}/{questions.length}</h3>
              <span className="text-sm font-medium text-purple-600">
                Score: {score}/{questions.length}
              </span>
            </div>
            <Progress
              value={(currentQuestion / questions.length) * 100}
              className="mb-6"
            />
            <div className="space-y-4">
              <h3 className="text-xl font-medium">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => !showExplanation && handleAnswer(key)}
                    variant={userAnswer === key ?
                      (key === questions[currentQuestion].correct ? "default" : "destructive")
                      : "outline"}
                    disabled={showExplanation}
                    className="w-full justify-start text-left"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h4 className="font-medium text-purple-800 mb-2">Explanation</h4>
                <p className="text-purple-700">{questions[currentQuestion].explanation}</p>
                <p className="text-sm text-gray-600 mt-2">Next question in 7 seconds...</p>
                {currentQuestion === questions.length - 1 && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-bold">Quiz Complete!</h3>
                    <p className="text-gray-600">
                      Final Score: {score}/{questions.length}
                    </p>
                    <p className="text-gray-600">
                      {score === questions.length
                        ? "Perfect score! You're well-versed in DeFi innovations!"
                        : "Good effort! Review the innovation concepts and try again!"}
                    </p>
                    <Link href="/defi/module3/quiz">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Continue to Module 3 Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DefiInnovation = () => {
  useScrollTop();
  const { updateProgress } = useProgress();
  const { toast } = useToast();

  const { data: enrollments, isLoading: loadingEnrollments, error: enrollmentError } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const isEnrolled = enrollments?.some(
    (enrollment: any) => enrollment.courseId === 3
  );

  if (loadingEnrollments) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <RefreshCw className="h-8 w-8 text-purple-500" />
          </motion.div>
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (enrollmentError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
          <p className="text-gray-600 mb-4">Failed to load course content. Please try again later.</p>
          <Link href="/defi/module3">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Course Enrollment Required</h1>
          <p className="mb-6">Please enroll in the DeFi course to access this content.</p>
          <Link href="/defi/module3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Overview Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-3xl font-bold">
                DeFi Innovations & Future Trends
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Explore cutting-edge developments and future directions in DeFi
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Stay ahead of the curve by understanding emerging DeFi innovations and
                  their potential impact on the future of finance.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-purple-200">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Layers className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Layer 2 Solutions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Scaling solutions for faster and cheaper transactions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-pink-200">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-500 rounded-lg">
                          <Network className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Cross-chain DeFi</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Interoperability between different blockchain networks
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Cpu className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">AI Integration</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Machine learning for improved DeFi operations
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Innovation Dashboard */}
          <InnovationDashboard />

          {/* Future Trends Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Emerging Trends</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Layer 2 Scaling Solutions</h4>
                    <p className="text-gray-600 mb-4">
                      Layer 2 solutions are revolutionizing DeFi by addressing scalability
                      challenges while maintaining security and decentralization.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Optimistic Rollups (e.g., Optimism, Arbitrum)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>ZK-Rollups (e.g., zkSync, StarkNet)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>State Channels (e.g., Lightning Network)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Cross-chain Interoperability</h4>
                    <p className="text-gray-600 mb-4">
                      The future of DeFi lies in seamless communication between different
                      blockchain networks, enabling unified liquidity and asset transfer.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Cross-chain Bridges (e.g., Poly Network, Portal)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Multi-chain Protocols (e.g., LayerZero, Cosmos IBC)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Unified Liquidity (e.g., THORChain, Multichain)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">AI & Machine Learning</h4>
                    <p className="text-gray-600 mb-4">
                      Integration of AI and machine learning is enhancing DeFi protocols
                      with improved risk assessment and automated trading strategies.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>ML-powered Trading (e.g., Numerai, DeFi Yield)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Risk Analysis Tools (e.g., Gauntlet, Credmark)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Predictive Oracle Networks (e.g., API3, Chainlink)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Sustainable DeFi</h4>
                    <p className="text-gray-600 mb-4">
                      Environmental sustainability is becoming a key focus in DeFi
                      development, with new solutions prioritizing energy efficiency.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Proof of Stake Networks (e.g., Ethereum 2.0, Cardano)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Carbon Credit Markets (e.g., Toucan Protocol, KlimaDAO)</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Energy-Efficient Consensus (e.g., Algorand, Solana)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InnovationQuiz />
        </motion.div>
      </div>
    </div>
  );
};

export default DefiInnovation;