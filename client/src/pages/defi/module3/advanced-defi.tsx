import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Lightbulb, Zap, Shield, BarChart4, Coins, Lock, ArrowLeft, ArrowRight, RefreshCw, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";

// Flash Loan Simulator Interface
interface FlashLoanSimulation {
  borrowedAmount: number;
  fee: number;
  profit: number;
  isValid: boolean;
}

const FlashLoanSimulator = () => {
  const [borrowedAmount, setBorrowedAmount] = useState(1000);
  const [arbitrageOpportunity, setArbitrageOpportunity] = useState(0.5);
  const [simulation, setSimulation] = useState<FlashLoanSimulation | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate flash loan outcome
    const fee = borrowedAmount * 0.001; // 0.1% fee
    const potentialProfit = borrowedAmount * (arbitrageOpportunity / 100);
    const netProfit = potentialProfit - fee;

    setSimulation({
      borrowedAmount,
      fee,
      profit: netProfit,
      isValid: netProfit > 0
    });
  }, [borrowedAmount, arbitrageOpportunity]);

  const executeFlashLoan = () => {
    if (simulation?.isValid) {
      toast({
        title: "Flash Loan Executed",
        description: `Profit: $${simulation.profit.toFixed(2)}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Transaction Would Fail",
        description: "The flash loan would not be profitable",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-800">
            Flash Loan Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-lg font-medium text-blue-700">
                Borrowed Amount (USDC)
              </Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  value={borrowedAmount}
                  onChange={(e) => setBorrowedAmount(Number(e.target.value))}
                  className="pl-10 text-lg"
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div>
              <Label htmlFor="opportunity" className="text-lg font-medium text-blue-700">
                Arbitrage Opportunity (%)
              </Label>
              <div className="mt-2">
                <Slider
                  id="opportunity"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[arbitrageOpportunity]}
                  onValueChange={(value) => setArbitrageOpportunity(value[0])}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  Price Difference: {arbitrageOpportunity}%
                </div>
              </div>
            </div>

            <Button
              onClick={executeFlashLoan}
              className={`w-full ${simulation?.isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              Execute Flash Loan
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Transaction Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {simulation && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Borrowed Amount:</span>
                        <span className="font-bold">${borrowedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Flash Loan Fee:</span>
                        <span className="font-bold text-red-600">
                          ${simulation.fee.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Expected Profit:</span>
                        <span className={`font-bold ${simulation.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${simulation.profit.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h5 className="font-semibold text-yellow-800">Flash Loan Basics</h5>
              </div>
              <ul className="space-y-2 text-yellow-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Flash loans must be borrowed and repaid in the same transaction</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>They are commonly used for arbitrage opportunities</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>If the transaction is not profitable, it will be reverted</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedDefiQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "What is a flash loan?",
      options: {
        a: "A loan that requires collateral",
        b: "A loan that must be repaid in the same transaction block",
        c: "A loan with high interest rates",
        d: "A loan that takes 24 hours to process"
      },
      correct: "b",
      explanation: "Flash loans are uncollateralized loans that must be borrowed and repaid within the same transaction block, making them useful for arbitrage opportunities."
    },
    {
      id: 2,
      question: "What happens if a flash loan transaction fails?",
      options: {
        a: "The user must pay a penalty",
        b: "The loan is extended",
        c: "The entire transaction is reverted",
        d: "The user loses their collateral"
      },
      correct: "c",
      explanation: "If a flash loan transaction fails (e.g., cannot be repaid), the entire transaction is reverted as if it never happened, ensuring the protocol's safety."
    },
    {
      id: 3,
      question: "What is concentrated liquidity in DeFi?",
      options: {
        a: "Liquidity focused on specific price ranges",
        b: "All liquidity in one pool",
        c: "Locked liquidity",
        d: "Infinite liquidity"
      },
      correct: "a",
      explanation: "Concentrated liquidity allows liquidity providers to focus their capital within specific price ranges, increasing capital efficiency and potential returns."
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
    }, 3000);
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
        <p className="text-blue-100 mt-2">
          Verify your understanding of advanced DeFi concepts
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to test your knowledge of flash loans, concentrated liquidity,
              and DeFi security?
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Question {currentQuestion + 1}/{questions.length}</h3>
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
                {currentQuestion === questions.length - 1 && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-bold">Quiz Complete!</h3>
                    <p className="text-gray-600">
                      Final Score: {score}/{questions.length}
                    </p>
                    <p className="text-gray-600">
                      {score === questions.length
                        ? "Perfect score! Excellent understanding!"
                        : "Good effort! Review the material and try again!"}
                    </p>
                    <Link href="/defi/module3/defi-security">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Continue to DeFi Security
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

const AdvancedDefi = () => {
  const { updateProgress } = useProgress();
  const { toast } = useToast();

  // Enrollment handling with proper error states
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

  // Show loading state
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

  // Show error state
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
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Advanced DeFi Concepts
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Master advanced DeFi mechanisms and risk management strategies
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  In this advanced module, we'll explore sophisticated DeFi concepts including flash loans,
                  concentrated liquidity, and advanced security measures. These concepts form the backbone
                  of modern DeFi protocols and enable complex financial operations.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Flash Loans</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Uncollateralized loans that must be borrowed and repaid within a single transaction block
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Coins className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Concentrated Liquidity</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Efficient capital deployment within specific price ranges for maximum returns
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Security</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Advanced security practices and risk management strategies
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flash Loan Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Flash Loans & MEV</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Flash loans are a groundbreaking DeFi innovation that allows users to borrow assets
                  without collateral, provided the loan is repaid within the same transaction block.
                  This enables complex arbitrage opportunities and efficient market operations.
                </p>

                <FlashLoanSimulator />
              </div>
            </CardContent>
          </Card>

          {/* Concentrated Liquidity Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Concentrated Liquidity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Concentrated liquidity represents a paradigm shift in AMM design, allowing LPs to
                  provide liquidity within specific price ranges for maximum capital efficiency.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                        <span>Higher capital efficiency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                        <span>Increased fee generation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                        <span>Custom price range selection</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Risks</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <span>Price range exits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <span>Impermanent loss exposure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <span>Active management required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Security & Risk Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Advanced security practices are crucial for protecting assets and ensuring protocol
                  safety in DeFi. Understanding and implementing these measures is essential for
                  both users and developers.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Smart Contract Security</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Code audits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Formal verification</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Bug bounties</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Protocol Safety</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Insurance coverage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Emergency procedures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Risk parameters</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">User Protection</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Hardware wallets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Multi-sig setups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Transaction monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <AdvancedDefiQuiz />
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedDefi;