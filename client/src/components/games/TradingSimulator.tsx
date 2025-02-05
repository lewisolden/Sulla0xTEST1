import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Award, BookOpen, HelpCircle } from 'lucide-react';

interface Trade {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: JSX.Element;
}

export default function TradingSimulator() {
  const [balance, setBalance] = useState(10000); // Start with $10,000
  const [crypto, setCrypto] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [feedback, setFeedback] = useState('');
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

  // Simulate market price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 10;
        const newPrice = Math.max(1, prev + change);
        const now = new Date();
        setPriceHistory(prev => [...prev, {
          time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
          price: newPrice
        }].slice(-20)); // Keep last 20 data points
        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle trading
  const handleTrade = (type: 'buy' | 'sell', amount: number) => {
    const cost = amount * currentPrice;
    
    if (type === 'buy') {
      if (cost > balance) {
        setFeedback('❌ Not enough funds for this trade');
        return;
      }
      setBalance(prev => prev - cost);
      setCrypto(prev => prev + amount);
      setFeedback(`✅ Bought ${amount} crypto at $${currentPrice.toFixed(2)}`);
    } else {
      if (amount > crypto) {
        setFeedback('❌ Not enough crypto to sell');
        return;
      }
      setBalance(prev => prev + cost);
      setCrypto(prev => prev - amount);
      setFeedback(`✅ Sold ${amount} crypto at $${currentPrice.toFixed(2)}`);
    }

    const trade: Trade = {
      type,
      amount,
      price: currentPrice,
      timestamp: Date.now()
    };
    setTrades(prev => [...prev, trade]);

    // Check achievements
    checkAchievements(trade);
  };

  // Check and update achievements
  const checkAchievements = (trade: Trade) => {
    const newAchievements = [...achievements];

    // First trade achievement
    if (!newAchievements[0].unlocked && trades.length === 0) {
      newAchievements[0].unlocked = true;
      setFeedback(prev => `${prev}\n🏆 Achievement unlocked: First Steps!`);
    }

    // Profit master achievement
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
        setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Profit Master!`);
      }
    }

    // Smart trader achievement
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
        setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Smart Trader!`);
      }
    }

    setAchievements(newAchievements);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Crypto Trading Simulator</h2>
        <p className="text-gray-600">
          Learn to trade crypto in a risk-free environment! 📈
        </p>
      </div>

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
                  <br />• Buy low and sell high to make profits
                  <br />• Start with $10,000 virtual money
                  <br />• Earn achievements as you learn
                  <br />• Practice different trading strategies risk-free
                </p>
                <Button
                  onClick={() => setShowTutorial(false)}
                  variant="outline"
                  className="bg-yellow-100"
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
        <div>
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Price Chart</h3>
            <LineChart width={500} height={300} data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                activeDot={{ r: 8 }}
              />
            </LineChart>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-blue-800">
                Current Price: ${currentPrice.toFixed(2)}
              </p>
            </div>
          </Card>
        </div>

        {/* Trading Controls */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Your Portfolio</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                Cash Balance: <span className="font-bold text-green-600">${balance.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Crypto: <span className="font-bold text-blue-600">{crypto.toFixed(2)} units</span>
              </p>
              <p className="text-gray-600">
                Total Value: <span className="font-bold text-purple-600">
                  ${(balance + (crypto * currentPrice)).toFixed(2)}
                </span>
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <Button
                  onClick={() => handleTrade('buy', 1)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Buy 1 Crypto
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleTrade('sell', 1)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Sell 1 Crypto
                </Button>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Achievements</h3>
            <div className="space-y-2">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-2 p-2 rounded ${
                    achievement.unlocked ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  {achievement.icon}
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Award className="w-5 h-5 text-yellow-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Feedback Messages */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-700"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
