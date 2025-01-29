import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { formatDistance } from "date-fns";

interface Trade {
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: Date;
}

interface Portfolio {
  balance: number;
  coins: number;
  trades: Trade[];
}

// Mock price data - will be replaced with real API data
const generateMockPrices = () => {
  const prices = [];
  let price = 45000;
  for (let i = 0; i < 100; i++) {
    price = price + (Math.random() - 0.5) * 1000;
    prices.push({
      timestamp: new Date(Date.now() - (100 - i) * 15 * 60000),
      price: price,
    });
  }
  return prices;
};

export default function TradingSimulator() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    balance: 100000, // Start with $100,000
    coins: 0,
    trades: [],
  });
  const [amount, setAmount] = useState("");
  const [priceData, setPriceData] = useState(generateMockPrices());
  const { toast } = useToast();

  const currentPrice = priceData[priceData.length - 1]?.price || 0;

  const handleTrade = (type: "buy" | "sell") => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    if (type === "buy") {
      const cost = amountNum * currentPrice;
      if (cost > portfolio.balance) {
        toast({
          title: "Insufficient funds",
          description: "You don't have enough balance for this trade",
          variant: "destructive",
        });
        return;
      }

      setPortfolio(prev => ({
        balance: prev.balance - cost,
        coins: prev.coins + amountNum,
        trades: [...prev.trades, { type, amount: amountNum, price: currentPrice, timestamp: new Date() }],
      }));
    } else {
      if (amountNum > portfolio.coins) {
        toast({
          title: "Insufficient coins",
          description: "You don't have enough coins to sell",
          variant: "destructive",
        });
        return;
      }

      setPortfolio(prev => ({
        balance: prev.balance + (amountNum * currentPrice),
        coins: prev.coins - amountNum,
        trades: [...prev.trades, { type, amount: amountNum, price: currentPrice, timestamp: new Date() }],
      }));
    }

    setAmount("");
    toast({
      title: "Trade executed",
      description: `Successfully ${type === "buy" ? "bought" : "sold"} ${amountNum} BTC`,
    });
  };

  const portfolioValue = portfolio.balance + (portfolio.coins * currentPrice);
  const profitLoss = portfolioValue - 100000; // Initial balance was $100,000

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Crypto Trading Simulator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-2xl font-semibold mb-4">Bitcoin Price</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => {
                    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
                  }}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                  formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Trading Interface */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Trading</h2>
          <div className="space-y-4">
            <div className="text-lg">
              Current Price: <span className="font-bold">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Amount (BTC)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleTrade("buy")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => handleTrade("sell")}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Sell
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Portfolio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Cash Balance</div>
                <div className="text-lg font-semibold">${portfolio.balance.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">BTC Holdings</div>
                <div className="text-lg font-semibold">{portfolio.coins.toFixed(8)}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-lg font-semibold">${portfolioValue.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Profit/Loss</div>
              <div className={`text-lg font-semibold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)} USD
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Trades</h3>
            <div className="space-y-2">
              {portfolio.trades.slice(-5).reverse().map((trade, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.amount.toFixed(8)} BTC
                    </span>
                    <span className="text-sm text-gray-600">
                      ${trade.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDistance(trade.timestamp, new Date(), { addSuffix: true })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
