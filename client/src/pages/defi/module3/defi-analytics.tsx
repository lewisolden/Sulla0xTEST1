import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  LineChart,
  PieChart,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Activity,
  Database,
  ChartBar,
  CircleDollarSign,
  Calculator
} from "lucide-react";

// Analytics Dashboard Interface
interface AnalyticsData {
  tvl: number;
  volume24h: number;
  transactions: number;
  users: number;
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    tvl: 1500000000,
    volume24h: 250000000,
    transactions: 45000,
    users: 12000
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
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-800">
            DeFi Analytics Dashboard Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Total Value Locked</p>
                  <p className="text-2xl font-bold">${formatNumber(analyticsData.tvl)}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CircleDollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">24h Volume</p>
                  <p className="text-2xl font-bold">${formatNumber(analyticsData.volume24h)}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Transactions</p>
                  <p className="text-2xl font-bold">{formatNumber(analyticsData.transactions)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold">{formatNumber(analyticsData.users)}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Database className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AnalyticsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const questions = [
    {
      id: 1,
      question: "What does TVL stand for in DeFi analytics?",
      options: {
        a: "Total Value Listed",
        b: "Total Value Locked",
        c: "Token Value Limit",
        d: "Trading Volume Level"
      },
      correct: "b",
      explanation: "TVL (Total Value Locked) represents the total value of crypto assets deposited in a DeFi protocol. It's a key metric for measuring the size and adoption of DeFi platforms."
    },
    {
      id: 2,
      question: "Which metric is most important for measuring DeFi protocol activity?",
      options: {
        a: "Number of developers",
        b: "Social media followers",
        c: "Trading volume",
        d: "Website visits"
      },
      correct: "c",
      explanation: "Trading volume is a crucial metric for measuring actual protocol activity and usage. It indicates the level of user engagement and liquidity in the protocol."
    },
    {
      id: 3,
      question: "What is impermanent loss in DeFi?",
      options: {
        a: "A permanent loss of funds",
        b: "A temporary network fee",
        c: "The difference in value between holding tokens and providing liquidity",
        d: "A type of transaction fee"
      },
      correct: "c",
      explanation: "Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when they were deposited. The loss is 'impermanent' because it can be recovered if prices return to their original ratio."
    }
  ];

  const handleAnswer = (answer: string) => {
    if (showExplanation) return;

    setUserAnswer(answer);
    setShowExplanation(true);

    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: isCorrect ? "Well done!" : "Let's review the explanation.",
        variant: isCorrect ? "default" : "destructive",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's review the explanation.",
        variant: "destructive",
      });
    }

    // Handle quiz completion
    if (currentQuestion === questions.length - 1) {
      // Show completion message immediately
      toast({
        title: "Quiz Complete! 🎉",
        description: "Get ready to move to DeFi Innovation section...",
        variant: "default",
      });

      // Set a longer delay for navigation to ensure explanation is visible
      setTimeout(() => {
        // Show final navigation message
        toast({
          title: "Moving to Next Section",
          description: "Redirecting to DeFi Innovation...",
          variant: "default",
        });

        // Add a small delay after the toast before actual navigation
        setTimeout(() => {
          try {
            console.log("Navigating to defi-innovation");
            setLocation("/defi/module3/defi-innovation");
          } catch (error) {
            console.error("Navigation failed:", error);
            toast({
              title: "Navigation Error",
              description: "Please click 'Continue' to proceed",
              variant: "destructive",
            });
          }
        }, 1000);
      }, 5000);
    } else {
      // Move to next question after showing explanation
      setTimeout(() => {
        setShowExplanation(false);
        setUserAnswer(null);
        setCurrentQuestion(prev => prev + 1);
      }, 3000);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl">Test Your Analytics Knowledge</CardTitle>
        <p className="text-blue-100 mt-2">
          Verify your understanding of DeFi analytics concepts
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to test your knowledge of DeFi analytics and metrics?
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">
                Question {currentQuestion + 1}/{questions.length}
              </h3>
              <span className="text-sm font-medium text-blue-600">
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
                className="bg-blue-50 p-4 rounded-lg"
              >
                <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {currentQuestion === questions.length - 1
                    ? "Quiz complete! Moving to DeFi Innovation section in 5 seconds..."
                    : "Next question in 3 seconds..."}
                </p>
                {currentQuestion === questions.length - 1 && (
                  <Link href="/defi/module3/defi-innovation">
                    <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                      Continue to DeFi Innovation
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DefiAnalytics = () => {
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
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">
                DeFi Analytics & Metrics
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Master essential analytics concepts and metrics in DeFi
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Understanding DeFi analytics is crucial for making informed decisions. Learn about key metrics,
                  data interpretation, and market analysis techniques.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <ChartBar className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Key Metrics</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Understanding and interpreting essential DeFi metrics
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Activity className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Market Analysis</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Tools and techniques for analyzing DeFi markets
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                          <Calculator className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Risk Assessment</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Evaluating and managing DeFi investment risks
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <AnalyticsDashboard />

          {/* Key Metrics Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <ChartBar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Understanding Key Metrics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">Total Value Locked (TVL)</h4>
                    <p className="text-gray-600 mb-4">
                      TVL represents the total value of crypto assets deposited in a DeFi protocol.
                      It's a key indicator of protocol adoption and trust.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Measures protocol size and market share</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Indicates user confidence and adoption</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">Trading Volume</h4>
                    <p className="text-gray-600 mb-4">
                      Trading volume shows the total amount of assets traded within a specific timeframe.
                      High volume indicates active market participation.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Reflects market activity and liquidity</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Important for price discovery</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">User Metrics</h4>
                    <p className="text-gray-600 mb-4">
                      User metrics include unique addresses, transaction counts, and user retention rates.
                      These metrics help measure protocol adoption and growth.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Tracks user growth and engagement</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Measures protocol adoption rate</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="text-xl font-semibold text-blue-800 mb-4">Yield Metrics</h4>
                    <p className="text-gray-600 mb-4">
                      Yield metrics show the returns generated from various DeFi activities,
                      including lending, liquidity provision, and farming.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Compares investment opportunities</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Helps in risk-reward assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <AnalyticsQuiz />
        </motion.div>
      </div>
    </div>
  );
};

export default DefiAnalytics;