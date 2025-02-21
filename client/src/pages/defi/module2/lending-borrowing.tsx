import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Code2, Network, Shield, TrendingUp, Lock, RefreshCw, Settings, Coins, Calculator, AlertTriangle, Building2, DollarSign } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const InteractiveLendingCalculator = () => {
  const [collateralAmount, setCollateralAmount] = useState("");
  const [ltv, setLtv] = useState("75");
  const [interestRate, setInterestRate] = useState("3");
  const [term, setTerm] = useState("30");
  const [isAnimating, setIsAnimating] = useState(false);

  const maxBorrow = parseFloat(collateralAmount) * (parseFloat(ltv) / 100);
  const interest = maxBorrow * (parseFloat(interestRate) / 100) * (parseFloat(term) / 365);
  const totalRepayment = maxBorrow + interest;
  const healthFactor = 100 / (parseFloat(ltv) || 1);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [collateralAmount, ltv, interestRate, term]);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500 rounded-lg">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-800">
            DeFi Lending Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="collateral" className="text-lg font-medium text-purple-700">
                Collateral Amount (ETH)
              </Label>
              <div className="relative">
                <Input
                  id="collateral"
                  type="number"
                  min="0"
                  step="0.1"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="pl-10 text-lg"
                />
                <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
              </div>
            </div>

            <div>
              <Label htmlFor="ltv" className="text-lg font-medium text-purple-700">
                Loan-to-Value Ratio (%)
              </Label>
              <div className="relative">
                <Input
                  id="ltv"
                  type="number"
                  min="0"
                  max="100"
                  value={ltv}
                  onChange={(e) => setLtv(e.target.value)}
                  className="pl-10 text-lg"
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
              </div>
              <motion.div 
                className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden"
                animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-red-500"
                  animate={{ width: `${ltv}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>

            <div>
              <Label htmlFor="interest" className="text-lg font-medium text-purple-700">
                Annual Interest Rate (%)
              </Label>
              <div className="relative">
                <Input
                  id="interest"
                  type="number"
                  min="0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="pl-10 text-lg"
                />
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
              </div>
            </div>

            <div>
              <Label htmlFor="term" className="text-lg font-medium text-purple-700">
                Loan Term (Days)
              </Label>
              <div className="relative">
                <Input
                  id="term"
                  type="number"
                  min="1"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="pl-10 text-lg"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
            >
              <h4 className="text-xl font-semibold text-purple-800 mb-4">Position Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maximum Borrow:</span>
                  <motion.span 
                    className="font-bold text-purple-700"
                    animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
                  >
                    {maxBorrow.toFixed(2)} ETH
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interest Payment:</span>
                  <motion.span 
                    className="font-bold text-purple-700"
                    animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
                  >
                    {interest.toFixed(4)} ETH
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Repayment:</span>
                  <motion.span 
                    className="font-bold text-purple-700"
                    animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
                  >
                    {totalRepayment.toFixed(4)} ETH
                  </motion.span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Health Factor:</span>
                    <span className={`font-bold ${
                      healthFactor >= 1.5 ? 'text-green-600' : 
                      healthFactor >= 1.1 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {healthFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        healthFactor >= 1.5 ? 'bg-green-500' : 
                        healthFactor >= 1.1 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      animate={{ width: `${Math.min(100, healthFactor * 50)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h5 className="font-semibold text-yellow-800">Risk Indicators</h5>
              </div>
              <ul className="space-y-2 text-yellow-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Liquidation at {(parseFloat(ltv) * 1.1).toFixed(1)}% LTV ratio</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Market volatility can affect collateral value</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const quiz = {
  questions: [
    {
      id: 1,
      question: "What is the main purpose of over-collateralization in DeFi lending?",
      options: [
        "To increase protocol revenue",
        "To protect lenders against default risk",
        "To encourage more borrowing",
        "To maintain token price stability"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which feature allows AAVE users to borrow and repay within the same transaction block?",
      options: [
        "Quick loans",
        "Flash loans",
        "Instant loans",
        "Lightning loans"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What happens when a borrower's collateral value falls below the required threshold?",
      options: [
        "The loan is automatically refinanced",
        "The borrower receives a warning",
        "The position is liquidated",
        "Interest rates are increased"
      ],
      correctAnswer: 2
    }
  ]
};

export default function LendingBorrowing() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTab, setCurrentTab] = useState("content");
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const sections = [
    {
      id: "lending-borrowing",
      title: "Understanding DeFi Lending",
      icon: Building2,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            DeFi lending platforms revolutionize traditional borrowing by eliminating intermediaries and enabling peer-to-peer transactions through smart contracts. These protocols allow users to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Earn interest by providing liquidity to lending pools</li>
            <li>Borrow assets using cryptocurrency as collateral</li>
            <li>Access loans without traditional credit checks</li>
            <li>Benefit from transparent and automated interest rates</li>
          </ul>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Concept
            </h4>
            <p className="text-blue-700">
              Smart contracts automatically manage the entire lending process, from collateral lockup to interest rate adjustments and liquidations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "stablecoins",
      title: "AAVE Protocol Deep Dive",
      icon: Building2,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-purple-600" />
              <h4 className="text-purple-800 font-semibold">What is AAVE?</h4>
            </div>
            <p className="text-gray-700 mb-4">
              AAVE is one of the leading DeFi lending protocols, allowing users to lend and borrow various cryptocurrencies. It introduces several innovative features:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-white">
                <CardContent className="pt-4">
                  <h5 className="font-medium text-purple-700 mb-2">Flash Loans</h5>
                  <p className="text-sm text-gray-600">
                    Uncollateralized loans that must be borrowed and repaid within the same transaction block
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="pt-4">
                  <h5 className="font-medium text-purple-700 mb-2">Rate Switching</h5>
                  <p className="text-sm text-gray-600">
                    Users can switch between stable and variable interest rates
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "defi-derivatives",
      title: "Interactive Learning Exercise",
      icon: Calculator,
      content: <InteractiveLendingCalculator />
    }
  ];

  const handleSectionComplete = async (index: number) => {
    try {
      await updateProgress({
        courseId: 3,
        moduleId: 4,
        sectionId: 'lending-borrowing',
        completed: true,
        subsectionId: `subsection-${index + 1}`,
        type: 'section',
        progress: ((index + 1) / sections.length) * 100,
        timestamp: new Date().toISOString(),
        userId: 'current',
        metadata: {}
      });

      toast({
        title: "Progress Updated",
        description: "Section completed successfully!",
      });

      if (index < sections.length - 1) {
        setCurrentSection(index + 1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const handleQuizSubmit = async () => {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const calculatedScore = (correctAnswers / totalQuestions) * 100;

    setScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 70) {
      try {
        await updateProgress({
          courseId: 3,
          moduleId: 4,
          sectionId: 'lending-borrowing',
          completed: true,
          subsectionId: 'quiz',
          type: 'quiz',
          progress: 100,
          timestamp: new Date().toISOString(),
          userId: 'current',
          metadata: { score: calculatedScore }
        });

        toast({
          title: "Quiz Completed!",
          description: `You scored ${calculatedScore}%. Great job!`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update progress",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Quiz Result",
        description: `You scored ${calculatedScore}%. Try again to achieve at least 70%.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Lending & Borrowing in DeFi
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Master the fundamentals of decentralized lending and borrowing protocols
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-purple-600">
                    {Math.round((currentSection / sections.length) * 100)}%
                  </p>
                </div>
                <Progress
                  value={(currentSection / sections.length) * 100}
                  className="bg-purple-100"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Topic Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`${
                    index === currentSection ? 'border-2 border-purple-500' : ''
                  } rounded-lg overflow-hidden`}
                >
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                      <div className="flex items-center gap-3">
                        <section.icon className="h-6 w-6 text-purple-500" />
                        <CardTitle className="text-xl font-semibold text-purple-800">
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {section.content}
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={() => handleSectionComplete(index)}
                          className="bg-purple-600 hover:bg-purple-700"
                          disabled={index !== currentSection}
                        >
                          {index === sections.length - 1 ? "Complete Topic" : "Next Section"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-800">
                  Topic Quiz: Lending & Borrowing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quiz.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-white rounded-lg shadow">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        {q.question}
                      </h3>
                      <div className="space-y-2">
                        {q.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedAnswers[q.id] === idx
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-200'
                            }`}
                            onClick={() => !quizSubmitted && setSelectedAnswers({
                              ...selectedAnswers,
                              [q.id]: idx
                            })}
                          >
                            <p className="text-gray-700">{option}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center mt-6">
                    <Link href="/defi/module2/stablecoins">
                      <Button variant="outline" className="gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Next Topic: Stablecoins
                      </Button>
                    </Link>

                    <Button
                      onClick={handleQuizSubmit}
                      disabled={quizSubmitted || Object.keys(selectedAnswers).length !== quiz.questions.length}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {quizSubmitted ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {score >= 70 ? "Completed!" : "Try Again"}
                        </div>
                      ) : (
                        "Submit Quiz"
                      )}
                    </Button>
                  </div>

                  {quizSubmitted && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      score >= 70 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
                    }`}>
                      <h4 className="font-semibold mb-2">Quiz Results</h4>
                      <p>You scored: {score}%</p>
                      {score < 70 && (
                        <p className="mt-2">
                          You need 70% to pass. Review the material and try again!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}