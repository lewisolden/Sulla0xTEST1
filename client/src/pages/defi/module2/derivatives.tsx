import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [margin, setMargin] = useState(1000);
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
                Leverage (max 10x)
              </Label>
              <div className="relative">
                <Input
                  id="leverage"
                  type="number"
                  min="1"
                  max="10"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="pl-10 text-lg"
                />
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
            </div>

            <div>
              <Label htmlFor="margin" className="text-lg font-medium text-blue-700">
                Margin (USDC)
              </Label>
              <div className="relative">
                <Input
                  id="margin"
                  type="number"
                  min="100"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="pl-10 text-lg"
                />
                <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
              </div>
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
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Liquidation Price:</span>
                        <span className="font-bold text-red-600">
                          ${position.liquidationPrice.toLocaleString()}
                        </span>
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
                  <p>Positions are liquidated when losses exceed maintenance margin</p>
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

export default function DerivativesSection() {
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
      id: "mechanics",
      title: "Derivatives Trading Mechanics",
      icon: LineChart,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Collateral & Margin</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Traders must deposit collateral to open leveraged positions. This collateral, 
                    or margin, protects against potential losses and determines the maximum 
                    position size.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Initial Margin: Required to open a position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Maintenance Margin: Minimum collateral to keep position open</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Leverage & Liquidation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Leverage multiplies both potential profits and losses. When losses approach 
                    the maintenance margin, positions risk liquidation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Leverage = Position Size / Collateral</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Higher leverage = Higher liquidation risk</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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
      title: "Hyperliquid Case Study",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="text-2xl">Hyperliquid: Next-Gen Derivatives Exchange</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Generation Event (TGE)</h3>
                  <p className="text-gray-700">
                    Hyperliquid's unique token launch focused on fair distribution and long-term 
                    sustainability. The protocol implemented innovative tokenomics with:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">No pre-mine for team or investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">100% fair launch through trading rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Dynamic emission schedule based on trading volume</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">HypeEVM Innovation</h3>
                  <p className="text-gray-700">
                    The HypeEVM represents a breakthrough in DeFi infrastructure, offering:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Zero-knowledge proof verification for fast settlements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Custom-built orderbook matching engine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Optimized for high-frequency trading</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Liquidity Management</h3>
                  <p className="text-gray-700">
                    Hyperliquid achieves superior liquidity through:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Professional market makers with dedicated pools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Dynamic fee structure incentivizing liquidity provision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Cross-margin efficiency for capital utilization</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <h5 className="font-semibold text-yellow-800">Key Advantages</h5>
                  </div>
                  <ul className="space-y-2 text-yellow-700">
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>Minimal price impact on large trades</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>Competitive spreads across all trading pairs</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>High capital efficiency through unified liquidity pools</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  const handleSectionComplete = (index: number) => {
    updateProgress(
      3, // courseId for DeFi course
      'derivatives', // sectionId
      true, // completed
      ((index + 1) / sections.length) * 100 // progress percentage
    );

    toast({
      title: "Progress Updated",
      description: "Section completed successfully!",
    });

    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
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
                DeFi Derivatives & Leverage Trading
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Master advanced trading concepts and explore modern DeFi derivatives platforms
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
      </div>
    </div>
  );
}