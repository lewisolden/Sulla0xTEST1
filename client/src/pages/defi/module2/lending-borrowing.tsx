import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Shield, TrendingUp, Lock, Coins, Calculator, AlertTriangle, Building2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState as useState2 } from "react";


// Types for the quiz
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  onComplete: (score: number) => void;
}

interface QuestionProps {
  question: QuizQuestion;
  onAnswer: (selectedIndex: number) => void;
  showExplanation: boolean;
}

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

const quiz: { questions: QuizQuestion[] } = {
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
      correctAnswer: 1,
      explanation: "Over-collateralization is a crucial risk management mechanism that protects lenders by ensuring borrowers provide more collateral value than their loan amount. This acts as a buffer against market volatility and potential defaults."
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
      correctAnswer: 1,
      explanation: "Flash loans are a unique DeFi innovation that allows users to borrow and repay within the same transaction block without collateral. They're commonly used for arbitrage and debt refinancing."
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
      correctAnswer: 2,
      explanation: "When collateral value drops below the required threshold, the position is automatically liquidated to protect lenders. This is why maintaining a healthy collateralization ratio is crucial."
    }
  ]
};

const QuizQuestion: React.FC<QuestionProps> = ({ question, onAnswer, showExplanation }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (idx: number) => {
    const correct = idx === question.correctAnswer;
    setIsCorrect(correct);
    setShowNotification(true);
    onAnswer(idx);

    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Button
              variant="outline"
              className={`w-full justify-start text-left p-4 ${
                showExplanation && idx === question.correctAnswer
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : ''
              }`}
              onClick={() => !showExplanation && handleOptionClick(idx)}
              disabled={showExplanation}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Answer Notification - Now below questions */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`${
              isCorrect ? 'bg-green-500' : 'bg-red-500'
            } text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 mt-4`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Correct!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5" />
                <span className="font-medium">Incorrect</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-4 p-4 rounded-lg bg-blue-50 text-blue-800`}
          >
            <p>
              <span className="font-semibold">Explanation: </span>
              {question.explanation}
            </p>
            <p className="text-sm text-gray-600 mt-2">Next question in 8 seconds...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InteractiveQuiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Added state for selected answer
  const [showResults, setShowResults] = useState(false); // Added state for showing results
  const { toast } = useToast();
  const quizQuestions = quiz.questions;


  const handleAnswer = (selectedIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);

    const isCorrect = selectedIndex === quizQuestions[currentQuestion].correctAnswer;
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
        updateProgress({
          courseId: 3,
          moduleId: 4,
          sectionId: 'lending-borrowing',
          completed: true,
          subsectionId: 'quiz',
          type: 'quiz',
          progress: finalScore,
          timestamp: new Date().toISOString(),
          userId: 'current',
          metadata: { score: finalScore }
        });
      }
    }, 8000); // Changed from 5000 to 8000
  };

  useEffect(() => {
    // Add effect to handle quiz completion and redirect
    if (showResults) {
      setTimeout(() => {
          // Assuming you want to redirect to the next section after a delay
          window.location.href = '/defi/module2/stablecoins'; // Replace with your actual next route
      }, 2000); // Adjust delay as needed
    }
  }, [showResults])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-800">
          Topic Quiz: Lending & Borrowing
        </h2>
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </span>
      </div>

      <Progress
        value={(currentQuestion / quizQuestions.length) * 100}
        className="mb-6"
      />

      <AnimatePresence mode="wait">
        <QuizQuestion
          key={currentQuestion}
          question={quizQuestions[currentQuestion]}
          onAnswer={handleAnswer}
          showExplanation={showExplanation}
        />
      </AnimatePresence>
      {showResults && (
        <div>
          <h3>Quiz complete! Your score is {((score) / quizQuestions.length) * 100}%</h3>
        </div>
      )}
    </div>
  );
};

export default function LendingBorrowing() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
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

  const handleQuizComplete = async (score: number) => {
    setScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
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
          metadata: { score }
        });

        toast({
          title: "Quiz Completed!",
          description: `You scored ${score}%. Great job!`,
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
        description: `You scored ${score}%. Try again to achieve at least 70%.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
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

        {/* Quiz Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all">
            <CardHeader
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white cursor-pointer"
              onClick={() => setShowQuiz(!showQuiz)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
                    <p className="text-purple-100 mt-1">
                      Complete the quiz to test your understanding of DeFi lending concepts
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuiz(!showQuiz);
                  }}
                >
                  {showQuiz ? "Hide Quiz" : "Start Quiz"}
                </Button>
              </div>
            </CardHeader>

            <AnimatePresence>
              {showQuiz && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-6">
                    <InteractiveQuiz onComplete={handleQuizComplete} />
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {quizSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-between items-center"
            >
              <div className={`p-4 rounded-lg ${
                score >= 70 ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
              }`}>
                <h4 className="font-semibold mb-2">Final Score: {score}%</h4>
                {score >= 70 ? (
                  <p>Excellent work! You've mastered the basics of DeFi lending.</p>
                ) : (
                  <p>Review the material and try again to achieve a passing score of 70%.</p>
                )}
              </div>

              <Link href="/defi/module2/stablecoins">
                <Button className="gap-2" variant="outline">
                  Next Topic: Stablecoins
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}