import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Award, BookOpen, HelpCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Trade {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
  profit?: number;
}

interface PriceData {
  timestamp: Date;
  price: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: JSX.Element;
}

type TimeFrame = '1m' | '1h' | 'all';

export default function TradingSimulator() {
  const [balance, setBalance] = useState(10000);
  const [crypto, setCrypto] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [minuteData, setMinuteData] = useState<PriceData[]>([]);
  const [hourData, setHourData] = useState<PriceData[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('1m');
  const { toast } = useToast();

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_trade',
      title: 'First Steps',
      description: 'Made your first trade',
      unlocked: false,
      icon: <DollarSign className="w-6 h-6 text-green-500" />
    },
    {
      id: 'profit_master',
      title: 'Profit Master',
      description: 'Achieved 20% profit on a single trade',
      unlocked: false,
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'smart_trader',
      title: 'Smart Trader',
      description: 'Made 5 profitable trades in a row',
      unlocked: false,
      icon: <Award className="w-6 h-6 text-purple-500" />
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentPrice(prev => {
        const volatility = Math.random() * 0.05;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const change = prev * volatility * direction;
        const newPrice = Math.max(1, prev + change);

        const newPriceData = { timestamp: now, price: newPrice };

        // Update minute data
        setMinuteData(prev => {
          const newData = [...prev, newPriceData];
          const minuteAgo = new Date(now.getTime() - 60000);
          return newData.filter(d => d.timestamp > minuteAgo).slice(-60);
        });

        // Update hour data
        setHourData(prev => {
          const newData = [...prev, newPriceData];
          const hourAgo = new Date(now.getTime() - 3600000);
          return newData.filter(d => d.timestamp > hourAgo);
        });

        return newPrice;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    switch (selectedTimeFrame) {
      case '1m':
        return minuteData;
      case '1h':
        return hourData;
      case 'all':
        return [...minuteData, ...hourData].sort((a, b) => 
          a.timestamp.getTime() - b.timestamp.getTime()
        );
      default:
        return minuteData;
    }
  };

  const formatChartTime = (timestamp: Date) => {
    switch (selectedTimeFrame) {
      case '1m':
        return format(timestamp, 'HH:mm:ss');
      case '1h':
        return format(timestamp, 'HH:mm');
      default:
        return format(timestamp, 'HH:mm:ss');
    }
  };

  const handleTrade = (type: 'buy' | 'sell') => {
    const cost = tradeAmount * currentPrice;

    if (type === 'buy') {
      if (cost > balance) {
        toast({
          title: "Insufficient Funds",
          description: `You need $${cost.toFixed(2)} but only have $${balance.toFixed(2)}`,
          variant: "destructive"
        });
        return;
      }
      setBalance(prev => prev - cost);
      setCrypto(prev => prev + tradeAmount);
      toast({
        title: "Trade Successful",
        description: `Bought ${tradeAmount} crypto at $${currentPrice.toFixed(2)}`,
        variant: "default"
      });
    } else {
      if (tradeAmount > crypto) {
        toast({
          title: "Insufficient Crypto",
          description: `You need ${tradeAmount} crypto but only have ${crypto}`,
          variant: "destructive"
        });
        return;
      }
      setBalance(prev => prev + cost);
      setCrypto(prev => prev - tradeAmount);
      toast({
        title: "Trade Successful",
        description: `Sold ${tradeAmount} crypto at $${currentPrice.toFixed(2)}`,
        variant: "default"
      });
    }

    const trade: Trade = {
      type,
      amount: tradeAmount,
      price: currentPrice,
      timestamp: Date.now()
    };
    setTrades(prev => [...prev, trade]);

    checkAchievements(trade);
  };

  const checkAchievements = (trade: Trade) => {
    const newAchievements = [...achievements];

    if (!newAchievements[0].unlocked && trades.length === 0) {
      newAchievements[0].unlocked = true;
      toast({
        title: "Achievement Unlocked!",
        description: "First Steps - Made your first trade",
      });
    }

    if (!newAchievements[1].unlocked) {
      const profit = trades.some(t => {
        if (t.type === 'sell') {
          const buyTrade = trades.find(bt => bt.type === 'buy' && bt.amount === t.amount);
          if (buyTrade) {
            return (t.price - buyTrade.price) / buyTrade.price >= 0.2;
          }
        }
        return false;
      });
      if (profit) {
        newAchievements[1].unlocked = true;
        toast({
          title: "Achievement Unlocked!",
          description: "Profit Master - Achieved 20% profit on a single trade",
        });
      }
    }

    if (!newAchievements[2].unlocked) {
      const lastFiveTrades = trades.slice(-5);
      const allProfitable = lastFiveTrades.every(t => {
        if (t.type === 'sell') {
          const buyTrade = trades.find(bt => bt.type === 'buy' && bt.amount === t.amount);
          return buyTrade ? t.price > buyTrade.price : false;
        }
        return true;
      });
      if (allProfitable && lastFiveTrades.length === 5) {
        newAchievements[2].unlocked = true;
        toast({
          title: "Achievement Unlocked!",
          description: "Smart Trader - Made 5 profitable trades in a row",
        });
      }
    }

    setAchievements(newAchievements);
  };

  const portfolioValue = balance + (crypto * currentPrice);
  const totalProfit = portfolioValue - 10000;
  const profitPercentage = ((portfolioValue / 10000) - 1) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Crypto Trading Simulator
        </h2>
        <p className="text-gray-600">
          Master crypto trading in a risk-free environment! 📈
        </p>
      </motion.div>

      {/* Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6"
          >
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Welcome to Trading Simulator!</h3>
                <p className="text-yellow-700 mb-4">
                  Here's how to get started:
                  <br />• Watch the price chart to understand market movements
                  <br />• Switch between 1-minute and 1-hour views
                  <br />• Buy low and sell high to make profits
                  <br />• Start with $10,000 virtual money
                  <br />• Earn achievements as you learn
                </p>
                <Button
                  onClick={() => setShowTutorial(false)}
                  variant="outline"
                  className="bg-yellow-100 hover:bg-yellow-200"
                >
                  Got it! Let's trade! 📊
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trading Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart and Price */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-700">Price Chart</h3>
              <div className="flex gap-2">
                <Button
                  variant={selectedTimeFrame === '1m' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeFrame('1m')}
                >
                  1M
                </Button>
                <Button
                  variant={selectedTimeFrame === '1h' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeFrame('1h')}
                >
                  1H
                </Button>
                <Button
                  variant={selectedTimeFrame === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeFrame('all')}
                >
                  All
                </Button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="timestamp"
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatChartTime}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    labelFormatter={(value: Date) => format(value, 'PPpp')}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={300}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <motion.div 
              className="mt-4 text-center"
              animate={{
                scale: [1, 1.02, 1],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            >
              <p className="text-2xl font-bold text-blue-800">
                Current Price: ${currentPrice.toFixed(2)}
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* Trading Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Card className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Your Portfolio</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Cash Balance</p>
                <p className="text-xl font-bold text-green-600">${balance.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Crypto Holdings</p>
                <p className="text-xl font-bold text-blue-600">{crypto.toFixed(4)} BTC</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Portfolio Value</span>
                <span className="text-lg font-bold text-blue-600">${portfolioValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Profit/Loss</span>
                <motion.span
                  className={`text-lg font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  animate={{
                    scale: totalProfit !== 0 ? [1, 1.05, 1] : 1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
                </motion.span>
              </div>
            </div>

            {/* Trading Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  onClick={() => setTradeAmount(prev => Math.max(0.1, prev - 0.1))}
                  variant="outline"
                  size="sm"
                >-</Button>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-600">Trade Amount:</span>
                  <span className="ml-2 font-bold">{tradeAmount.toFixed(1)} BTC</span>
                </div>
                <Button
                  onClick={() => setTradeAmount(prev => prev + 0.1)}
                  variant="outline"
                  size="sm"
                >+</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleTrade('buy')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button
                  onClick={() => handleTrade('sell')}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  animate={achievement.unlocked ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  {achievement.icon}
                  <div>
                    <p className="font-semibold text-gray-800">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Award className="w-5 h-5 text-yellow-500 ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Card>
  );
}