import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"; // Import Slider component
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, TrendingUp, Lock, DollarSign, AlertTriangle, LineChart, Zap, CandlestickChart, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

// Types for the trading simulator
interface Position {
  asset: string;
  size: number;
  leverage: number;
  entryPrice: number;
  liquidationPrice: number;
  pnl: number;
  margin: number;
}

interface TradingSimulatorProps {
  onPositionChange?: (position: Position | null) => void;
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

const TradingSimulator: React.FC<TradingSimulatorProps> = ({ onPositionChange }) => {
  const [asset, setAsset] = useState("ETH");
  const [price, setPrice] = useState(3000);
  const [leverage, setLeverage] = useState(1);
  const [margin, setMargin] = useState(1000); // Set initial margin to $1,000
  const [position, setPosition] = useState<Position | null>(null);
  const [isLong, setIsLong] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate price movements
    const interval = setInterval(() => {
      setPrice(prevPrice => {
        const change = (Math.random() - 0.5) * 20; // Random price movement
        return Number((prevPrice + change).toFixed(2));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (position) {
      // Calculate PnL and check liquidation
      const currentPnl = calculatePnL(position, price, isLong);
      const updatedPosition = { ...position, pnl: currentPnl };

      if (price <= position.liquidationPrice && isLong) {
        handleLiquidation();
      } else if (price >= position.liquidationPrice && !isLong) {
        handleLiquidation();
      } else {
        setPosition(updatedPosition);
        onPositionChange?.(updatedPosition);
      }
    }
  }, [price]);

  const calculateLiquidationPrice = (entryPrice: number, leverage: number, isLong: boolean): number => {
    const maintenanceMargin = 0.05; // 5% maintenance margin
    if (isLong) {
      return entryPrice * (1 - (1 / leverage) + maintenanceMargin);
    } else {
      return entryPrice * (1 + (1 / leverage) - maintenanceMargin);
    }
  };

  const calculatePnL = (pos: Position, currentPrice: number, isLong: boolean): number => {
    const priceDiff = isLong ? currentPrice - pos.entryPrice : pos.entryPrice - currentPrice;
    return (priceDiff / pos.entryPrice) * pos.size * pos.leverage;
  };

  const handleOpenPosition = () => {
    if (leverage > 10) {
      toast({
        title: "Invalid Leverage",
        description: "Maximum leverage is 10x",
        variant: "destructive"
      });
      return;
    }

    const size = margin * leverage;
    const newPosition: Position = {
      asset,
      size,
      leverage,
      entryPrice: price,
      liquidationPrice: calculateLiquidationPrice(price, leverage, isLong),
      pnl: 0,
      margin
    };

    setPosition(newPosition);
    onPositionChange?.(newPosition);

    toast({
      title: "Position Opened",
      description: `${isLong ? 'Long' : 'Short'} ${asset} position opened with ${leverage}x leverage`,
    });
  };

  const handleLiquidation = () => {
    toast({
      title: "Position Liquidated",
      description: "Your position has been liquidated due to insufficient margin",
      variant: "destructive"
    });
    setPosition(null);
    onPositionChange?.(null);
  };

  const handleClosePosition = () => {
    if (position) {
      toast({
        title: "Position Closed",
        description: `PnL: ${position.pnl.toFixed(2)}%`,
        variant: position.pnl >= 0 ? "default" : "destructive"
      });
    }
    setPosition(null);
    onPositionChange?.(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500 rounded-lg">
            <CandlestickChart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-800">
            Leverage Trading Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="leverage" className="text-lg font-medium text-blue-700">
                Leverage (1x - 10x)
              </Label>
              <div className="mt-2">
                <Slider
                  id="leverage"
                  min={1}
                  max={10}
                  step={1}
                  value={[leverage]}
                  onValueChange={(value) => setLeverage(value[0])}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  Selected Leverage: {leverage}x
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="margin" className="text-lg font-medium text-blue-700">
                Initial Margin (USDC)
              </Label>
              <div className="relative">
                <Input
                  id="margin"
                  type="number"
                  min="100"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="pl-10 text-lg"
                  disabled // Lock the initial margin to $1,000
                />
                <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
              <p className="mt-1 text-sm text-gray-500">Starting capital: $1,000 USDC</p>
            </div>

            <div>
              <Label className="text-lg font-medium text-blue-700">
                Position Size
              </Label>
              <div className="text-3xl font-bold text-blue-600">
                ${(margin * leverage).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setIsLong(true)}
                variant={isLong ? "default" : "outline"}
                className="flex-1"
              >
                Long
              </Button>
              <Button
                onClick={() => setIsLong(false)}
                variant={!isLong ? "default" : "outline"}
                className="flex-1"
              >
                Short
              </Button>
            </div>

            {!position ? (
              <Button
                onClick={handleOpenPosition}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Open Position
              </Button>
            ) : (
              <Button
                onClick={handleClosePosition}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Close Position
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Position Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="font-bold">${price.toLocaleString()}</span>
                  </div>

                  {position && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Entry Price:</span>
                        <span className="font-bold">${position.entryPrice.toLocaleString()}</span>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex justify-between items-center">
                          <span className="text-red-800 font-medium">Liquidation Price:</span>
                          <span className="font-bold text-red-600">
                            ${position.liquidationPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-red-600 mt-2">
                          ⚠️ If price reaches this level, your position will be liquidated and you'll lose your collateral
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">PnL:</span>
                        <span className={`font-bold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {position.pnl.toFixed(2)}%
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
                <h5 className="font-semibold text-yellow-800">Risk Warning</h5>
              </div>
              <ul className="space-y-2 text-yellow-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Higher leverage increases both potential profits and losses</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Your position will be liquidated at the liquidation price, resulting in loss of collateral</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <p>Always manage your risk and use stop-loss orders</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const HyperliquidOverview: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="text-2xl">Understanding Hyperliquid: Next-Gen Decentralized Exchange</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Differences from Centralized Exchanges</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-blue-700 mb-2">Decentralized Order Book</h4>
                <p className="text-gray-600">
                  Unlike centralized exchanges that maintain private order books, Hyperliquid operates a fully on-chain order book,
                  ensuring complete transparency and preventing market manipulation.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-blue-700 mb-2">Self-Custody</h4>
                <p className="text-gray-600">
                  Traders maintain control of their assets through smart contracts, eliminating counterparty risk
                  associated with centralized exchanges holding user funds.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Cross-Collateralization</h4>
                  <p className="text-gray-600">Efficient capital utilization by using a single margin account for multiple positions</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Universal Oracle Integration</h4>
                  <p className="text-gray-600">Robust price feeds from multiple oracle providers ensuring accurate and manipulation-resistant pricing</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Automated Risk Management</h4>
                  <p className="text-gray-600">Smart contract-based liquidations and dynamic margin requirements</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">How Hyperliquid Works</h3>
            <div className="space-y-4">
              <p className="text-blue-700">
                Hyperliquid utilizes a unique hybrid architecture combining the best of centralized and decentralized systems:
              </p>
              <ol className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                  <p className="text-blue-700">Orders are matched off-chain for speed but settled on-chain for security</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                  <p className="text-blue-700">Zero-knowledge proofs verify trade execution without compromising performance</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                  <p className="text-blue-700">Multi-collateral system supports various assets for margin</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DerivativesQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "What is leverage trading?",
      options: {
        a: "Trading with borrowed money to amplify potential returns",
        b: "Trading only with your own capital",
        c: "Trading without any risk",
        d: "Trading physical assets only"
      },
      correct: "a",
      explanation: "Leverage trading allows traders to open positions larger than their capital by borrowing funds. This amplifies both potential profits and losses."
    },
    {
      id: 2,
      question: "What happens at the liquidation price?",
      options: {
        a: "You make maximum profit",
        b: "Nothing happens",
        c: "You lose your collateral and position is closed",
        d: "The trade is automatically extended"
      },
      correct: "c",
      explanation: "When the price reaches the liquidation level, the position is automatically closed and the trader loses their collateral. This is a risk management mechanism to prevent further losses."
    },
    {
      id: 3,
      question: "How does Hyperliquid differ from centralized exchanges?",
      options: {
        a: "It's more expensive",
        b: "It uses fully on-chain order books and self-custody",
        c: "It's slower",
        d: "It requires KYC"
      },
      correct: "b",
      explanation: "Hyperliquid combines the benefits of decentralization with the speed of centralized exchanges. It maintains order books on-chain and allows users to retain custody of their assets, enhancing transparency and security."
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
        description: "Great job! Let's see the explanation.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand why. Check the explanation below.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setUserAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (!quizStarted) {
    return (
      <Card className="mt-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
          <p className="text-blue-100 mt-2">
            Ready to test your understanding of DeFi derivatives and leverage trading?
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              This quiz will test your knowledge of leverage trading, liquidation mechanics,
              and decentralized derivatives platforms.
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Question {currentQuestion + 1}/{questions.length}</CardTitle>
          <span className="text-sm font-medium text-blue-600">
            Score: {score}/{questions.length}
          </span>
        </div>
        <Progress
          value={(currentQuestion / questions.length) * 100}
          className="mt-4"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
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
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={handleNextQuestion} className="mt-4">
                  Next Question
                </Button>
              ) : (
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
                  <Link href="/defi/module2/governance-dao">
                    <Button className="w-full">
                      Continue to Governance & DAO
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DerivativesSection() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: "overview",
      title: "Understanding DeFi Derivatives",
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            DeFi derivatives are financial instruments whose value is derived from the performance
            of underlying assets, indexes, or entities. In the decentralized finance space, these
            instruments enable traders to speculate on asset prices, hedge their positions, and
            gain exposure to various markets without owning the underlying assets.
          </p>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Concepts
            </h4>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>Leverage trading allows amplified exposure with smaller capital</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>Perpetual futures contracts never expire, making them popular for long-term positions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>Automated market makers (AMMs) provide liquidity for derivative trading</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "simulator",
      title: "Interactive Trading Simulator",
      icon: CandlestickChart,
      content: <TradingSimulator />
    },
    {
      id: "hyperliquid",
      title: "Hyperliquid Overview",
      icon: TrendingUp,
      content: <HyperliquidOverview />
    },
    {
      id: "quiz",
      title: "Derivatives Quiz",
      icon: BookOpen,
      content: <DerivativesQuiz />
    }
  ];

  const handleSectionComplete = (index: number) => {
    updateProgress(
      3, // courseId for DeFi course
      'derivatives', // sectionId
      true, //completed
      ((index + 1) / sections.length) * 100 // progress percentage
    );

    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
      toast({
        title: "Section Complete!",
        description: "Moving to next section...",
      });
    } else {
      toast({
        title: "Topic Complete! 🎉",
        description: "You've completed the Derivatives section!",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/defi/module2" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">DeFi Derivatives</h1>
          </div>
          <Progress value={progress} className="w-32" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className={`${
                index === currentSection ? 'border-2 border-blue-500' : ''
              } rounded-lg overflow-hidden`}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-blue-800">
                        {section.title}
                      </CardTitle>
                    </div>
                    {index < currentSection && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
                {currentSection === index && index < sections.length - 1 && (
                  <CardFooter>
                    <Button onClick={() => handleSectionComplete(index)} className="ml-auto">
                      Complete Section
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}