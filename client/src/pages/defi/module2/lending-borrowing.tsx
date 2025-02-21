import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Code2, Network, Shield, TrendingUp, Lock, RefreshCw, Settings, Coins, Calculator, AlertTriangle, Building2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Animation variants for content sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const InteractiveLendingCalculator = () => {
  const [collateralAmount, setCollateralAmount] = useState("");
  const [ltv, setLtv] = useState("75");
  const [interestRate, setInterestRate] = useState("3");
  const [term, setTerm] = useState("30");

  const maxBorrow = parseFloat(collateralAmount) * (parseFloat(ltv) / 100);
  const interest = maxBorrow * (parseFloat(interestRate) / 100) * (parseFloat(term) / 365);
  const totalRepayment = maxBorrow + interest;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
        <Calculator className="h-6 w-6" />
        Interactive Lending Calculator
      </h3>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="collateral">Collateral Amount (ETH)</Label>
          <Input
            id="collateral"
            type="number"
            min="0"
            step="0.1"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            placeholder="Enter collateral amount"
          />
        </div>

        <div>
          <Label htmlFor="ltv">Loan-to-Value Ratio (%)</Label>
          <Input
            id="ltv"
            type="number"
            min="0"
            max="100"
            value={ltv}
            onChange={(e) => setLtv(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="interest">Annual Interest Rate (%)</Label>
          <Input
            id="interest"
            type="number"
            min="0"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="term">Loan Term (Days)</Label>
          <Input
            id="term"
            type="number"
            min="1"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Calculation Results</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Maximum Borrow Amount: <span className="font-medium text-purple-700">{maxBorrow.toFixed(2)} ETH</span>
            </p>
            <p className="text-sm text-gray-600">
              Interest Payment: <span className="font-medium text-purple-700">{interest.toFixed(4)} ETH</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Repayment: <span className="font-medium text-purple-700">{totalRepayment.toFixed(4)} ETH</span>
            </p>
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
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-purple-800 mb-3">Key Features</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-700">Multiple asset pools with different risk parameters</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-700">Automated interest rate adjustments based on pool utilization</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-700">Safety modules for protocol insurance</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="text-gray-700">Governance through AAVE token holders</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Learning Exercise",
      icon: Calculator,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-blue-800 mb-4">
              Practice DeFi Lending
            </h4>
            <p className="text-gray-700 mb-6">
              Use this interactive calculator to understand how lending and borrowing work in DeFi protocols. Experiment with different collateral amounts, LTV ratios, and loan terms to see how they affect your borrowing capacity and interest payments.
            </p>
            <InteractiveLendingCalculator />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-yellow-800 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Considerations
            </h4>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                <p>Higher LTV ratios increase your liquidation risk</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                <p>Variable interest rates can change based on market conditions</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                <p>Ensure you maintain a healthy collateral ratio to avoid liquidation</p>
              </li>
            </ul>
          </div>
        </div>
      )
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