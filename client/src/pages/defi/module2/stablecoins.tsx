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
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Shield, TrendingUp, Lock, Coins, DollarSign, AlertTriangle, Building2, Bank, ChartLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types for components
interface StablecoinSimulatorProps {
  onUpdate?: (volatility: number) => void;
}

interface StablecoinComparisonProps {
  type: 'fiat' | 'crypto' | 'algorithmic';
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

const StablecoinSimulator: React.FC<StablecoinSimulatorProps> = ({ onUpdate }) => {
  const [marketPrice, setMarketPrice] = useState(1.00);
  const [collateralRatio, setCollateralRatio] = useState(150);
  const [isAnimating, setIsAnimating] = useState(false);
  const [volatility, setVolatility] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market fluctuations
      const fluctuation = (Math.random() - 0.5) * 0.02;
      const newPrice = Number((marketPrice + fluctuation).toFixed(4));
      setMarketPrice(newPrice);
      
      // Calculate volatility
      const priceDeviation = Math.abs(1 - newPrice);
      setVolatility(priceDeviation * 100);
      onUpdate?.(priceDeviation * 100);
      
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [marketPrice, onUpdate]);

  const stabilityScore = Math.max(0, 100 - (volatility * 10));

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500 rounded-lg">
            <ChartLine className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-800">
            Live Stablecoin Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="collateral" className="text-lg font-medium text-blue-700">
                Collateralization Ratio (%)
              </Label>
              <div className="relative">
                <Input
                  id="collateral"
                  type="number"
                  min="100"
                  max="300"
                  value={collateralRatio}
                  onChange={(e) => setCollateralRatio(Number(e.target.value))}
                  className="pl-10 text-lg"
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
              <motion.div
                className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden"
                animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-green-500"
                  animate={{ width: `${(collateralRatio / 300) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>

            <div>
              <Label className="text-lg font-medium text-blue-700">
                Current Market Price
              </Label>
              <motion.div
                className={`text-4xl font-bold ${
                  Math.abs(1 - marketPrice) > 0.01 ? 'text-red-600' : 'text-green-600'
                }`}
                animate={{ scale: isAnimating ? [1, 1.1, 1] : 1 }}
              >
                ${marketPrice.toFixed(4)}
              </motion.div>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              animate={{ scale: isAnimating ? [1, 1.02, 1] : 1 }}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Stability Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price Deviation:</span>
                    <span className={`font-bold ${
                      volatility > 1 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {volatility.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        volatility > 1 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      animate={{ width: `${Math.min(100, volatility * 10)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Stability Score:</span>
                    <span className={`font-bold ${
                      stabilityScore > 90 ? 'text-green-600' :
                      stabilityScore > 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {stabilityScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      animate={{ width: `${stabilityScore}%` }}
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
                  <p>High volatility may trigger automatic rebalancing</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Collateral ratio affects stability and liquidation risk</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StablecoinComparison: React.FC<StablecoinComparisonProps> = ({ type }) => {
  const getTypeInfo = () => {
    switch(type) {
      case 'fiat':
        return {
          title: "Fiat-Collateralized Stablecoins",
          icon: Bank,
          color: "blue",
          examples: ["USDT", "USDC", "BUSD"],
          features: [
            "1:1 backing with fiat currency",
            "Regular audits of reserves",
            "Centralized issuance and management",
            "High market liquidity"
          ],
          risks: [
            "Counterparty risk",
            "Regulatory compliance requirements",
            "Centralization concerns"
          ]
        };
      case 'crypto':
        return {
          title: "Crypto-Collateralized Stablecoins",
          icon: Coins,
          color: "purple",
          examples: ["DAI", "MIM", "sUSD"],
          features: [
            "Over-collateralization with crypto assets",
            "Decentralized governance",
            "Transparent on-chain collateral",
            "Automatic liquidation mechanisms"
          ],
          risks: [
            "Collateral volatility",
            "Complex liquidation processes",
            "Smart contract risks"
          ]
        };
      case 'algorithmic':
        return {
          title: "Algorithmic Stablecoins",
          icon: ChartLine,
          color: "green",
          examples: ["AMPL", "FRAX", "FEI"],
          features: [
            "No collateral requirement",
            "Supply adjustments based on demand",
            "Fully decentralized",
            "Elastic supply mechanism"
          ],
          risks: [
            "Complexity of stabilization mechanisms",
            "Potential for death spirals",
            "Market confidence dependency"
          ]
        };
    }
  };

  const info = getTypeInfo();
  const ColorIcon = info.icon;

  return (
    <Card className={`border-${info.color}-200 hover:border-${info.color}-300 transition-all`}>
      <CardHeader className={`bg-gradient-to-r from-${info.color}-50 to-${info.color}-100`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${info.color}-500 rounded-lg`}>
            <ColorIcon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {info.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Popular Examples</h4>
            <div className="flex gap-2">
              {info.examples.map((example, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm bg-${info.color}-100 text-${info.color}-700`}
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Key Features</h4>
            <ul className="space-y-2">
              {info.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className={`h-5 w-5 text-${info.color}-500 flex-shrink-0`} />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Risk Factors</h4>
            <ul className="space-y-2">
              {info.risks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-600">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Quiz types and data
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

const quiz: { questions: QuizQuestion[] } = {
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of stablecoins?",
      options: [
        "To maximize investment returns",
        "To maintain a stable value relative to a reference asset",
        "To replace traditional cryptocurrencies",
        "To eliminate the need for fiat currencies"
      ],
      correctAnswer: 1,
      explanation: "Stablecoins are designed to maintain a stable value, typically pegged to a fiat currency like the US dollar, providing a reliable medium of exchange and store of value in the crypto ecosystem."
    },
    {
      id: 2,
      question: "Which type of stablecoin typically requires the highest collateralization ratio?",
      options: [
        "Fiat-collateralized",
        "Crypto-collateralized",
        "Algorithmic",
        "Hybrid"
      ],
      correctAnswer: 1,
      explanation: "Crypto-collateralized stablecoins typically require higher collateralization ratios (often 150% or more) to account for the volatility of their cryptocurrency collateral."
    },
    {
      id: 3,
      question: "What happens when a crypto-collateralized stablecoin's collateral ratio falls below the required threshold?",
      options: [
        "The stablecoin is automatically burned",
        "New coins are minted",
        "The position is liquidated",
        "The peg is temporarily suspended"
      ],
      correctAnswer: 2,
      explanation: "When the collateral ratio falls below the required threshold, the position is automatically liquidated to protect the stability of the system and maintain the peg."
    }
  ]
};

const QuizQuestion: React.FC<QuestionProps> = ({ question, onAnswer, showExplanation }) => {
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
              onClick={() => onAnswer(idx)}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-blue-800">
              <span className="font-semibold">Explanation: </span>
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InteractiveQuiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedIndex
    }));

    // Show correct/incorrect toast
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect ? "Great job! Let's see why." : "Not quite. Let's learn why.",
      variant: isCorrect ? "default" : "destructive",
    });

    // Show explanation
    setShowExplanation(true);

    // Auto advance after 3 seconds
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
      } else {
        // Calculate final score
        const correctAnswers = Object.entries(answers).filter(
          ([questionId, answer]) =>
            answer === quiz.questions.find(q => q.id === parseInt(questionId)).correctAnswer
        ).length;
        const finalScore = (correctAnswers / quiz.questions.length) * 100;
        setScore(finalScore);
        onComplete(finalScore);
      }
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-800">
          Topic Quiz: Stablecoins
        </h2>
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>

      <Progress
        value={(currentQuestionIndex / quiz.questions.length) * 100}
        className="mb-6"
      />

      <AnimatePresence mode="wait">
        <QuizQuestion
          key={currentQuestionIndex}
          question={quiz.questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showExplanation={showExplanation}
        />
      </AnimatePresence>
    </div>
  );
};

export default function Stablecoins() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const sections = [
    {
      id: "overview",
      title: "Understanding Stablecoins",
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            Stablecoins are cryptocurrencies designed to maintain a stable value relative to a reference asset, 
            typically a fiat currency like the US dollar. They serve as a bridge between traditional finance 
            and the crypto ecosystem, offering the benefits of blockchain technology while minimizing price volatility.
          </p>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Concept
            </h4>
            <p className="text-blue-700">
              Stablecoins achieve price stability through various mechanisms, including collateralization 
              with other assets or algorithmic supply adjustments.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "types",
      title: "Types of Stablecoins",
      icon: Coins,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StablecoinComparison type="fiat" />
            <StablecoinComparison type="crypto" />
            <StablecoinComparison type="algorithmic" />
          </div>
        </div>
      )
    },
    {
      id: "simulator",
      title: "Interactive Stablecoin Simulator",
      icon: ChartLine,
      content: <StablecoinSimulator />
    }
  ];

  const handleSectionComplete = async (index: number) => {
    try {
      await updateProgress({
        courseId: 3,
        moduleId: 4,
        sectionId: 'stablecoins',
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
          sectionId: 'stablecoins',
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
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Stablecoins in DeFi
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Explore the foundations of price stability in the cryptocurrency ecosystem
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-blue-600">
                    {Math.round((currentSection / sections.length) * 100)}%
                  </p>
                </div>
                <Progress
                  value={(currentSection / sections.length) * 100}
                  className="bg-blue-100"
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
                index === currentSection ? 'border-2 border-blue-500' : ''
              } rounded-lg overflow-hidden`}
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6 text-blue-500" />
                    <CardTitle className="text-xl font-semibold text-blue-800">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {section.content}
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => handleSectionComplete(index)}
                      className="bg-blue-600 hover:bg-blue-700"
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
          <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all">
            <CardHeader
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
              onClick={() => setShowQuiz(!showQuiz)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
                    <p className="text-blue-100 mt-1">
                      Complete the quiz to test your understanding of stablecoins
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
                  <p>Excellent work! You've mastered the basics of stablecoins.</p>
                ) : (
                  <p>Review the material and try again to achieve a passing score of 70%.</p>
                )}
              </div>

              <Link href="/defi/module2/defi-derivatives">
                <Button className="gap-2" variant="outline">
                  Next Topic: DeFi Derivatives
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
