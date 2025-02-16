import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Calculator, TrendingUp, Scale, AlertTriangle, Info } from "lucide-react";
import { useProgress } from "@/context/progress-context";

type Strategy = "dca" | "lump-sum" | "value-avg";

interface SimulationResult {
  roi: number;
  riskLevel: string;
  suggestion: string;
  pros: string[];
  cons: string[];
}

const strategyInfo = {
  dca: {
    title: "Dollar-Cost Averaging",
    description: "Invest a fixed amount at regular intervals, regardless of price",
    pros: [
      "Reduces impact of market volatility",
      "Removes emotional decision-making",
      "Consistent investment habit",
    ],
    cons: [
      "May miss out on large upward movements",
      "Higher transaction fees over time",
      "Requires long-term commitment",
    ],
  },
  "lump-sum": {
    title: "Lump Sum",
    description: "Invest all your money at once",
    pros: [
      "Maximizes potential returns in rising markets",
      "Lower total transaction fees",
      "Faster market exposure",
    ],
    cons: [
      "Higher timing risk",
      "More susceptible to market volatility",
      "Greater emotional stress",
    ],
  },
  "value-avg": {
    title: "Value Averaging",
    description: "Adjust investment amount based on performance vs target",
    pros: [
      "Combines benefits of DCA and timing",
      "Systematic approach to buying dips",
      "Potentially better returns than DCA",
    ],
    cons: [
      "More complex to implement",
      "Requires more active management",
      "May need larger cash reserves",
    ],
  },
};

export const BitcoinInvestmentExercise = () => {
  const [investment, setInvestment] = useState<number>(1000);
  const [timeframe, setTimeframe] = useState<number>(12);
  const [strategy, setStrategy] = useState<Strategy>("dca");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const { updateProgress } = useProgress();

  const calculateRisk = (strategy: Strategy, timeframe: number): string => {
    if (strategy === "dca" && timeframe >= 12) return "Low";
    if (strategy === "lump-sum") return "High";
    return "Medium";
  };

  const simulateInvestment = () => {
    // Simplified simulation
    const results: { [key in Strategy]: SimulationResult } = {
      dca: {
        roi: 15,
        riskLevel: "Low",
        suggestion: "Dollar-cost averaging helps reduce timing risk",
        pros: strategyInfo.dca.pros,
        cons: strategyInfo.dca.cons,
      },
      "lump-sum": {
        roi: 25,
        riskLevel: "High",
        suggestion: "Higher potential returns but also higher risk",
        pros: strategyInfo["lump-sum"].pros,
        cons: strategyInfo["lump-sum"].cons,
      },
      "value-avg": {
        roi: 20,
        riskLevel: "Medium",
        suggestion: "Balanced approach between DCA and lump-sum",
        pros: strategyInfo["value-avg"].pros,
        cons: strategyInfo["value-avg"].cons,
      },
    };

    setResult(results[strategy]);
    toast({
      title: "Simulation Complete",
      description: "Review your investment strategy results below",
    });
    updateProgress(2, "bitcoin-investment-exercise", true);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-blue-800">
          Bitcoin Investment Simulator
        </h3>
        <p className="text-gray-600">
          Practice different investment strategies with virtual Bitcoin
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Amount (USD)
          </label>
          <Slider
            value={[investment]}
            onValueChange={(value) => setInvestment(value[0])}
            max={10000}
            step={100}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            ${investment.toLocaleString()}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Timeframe (months)
          </label>
          <Slider
            value={[timeframe]}
            onValueChange={(value) => setTimeframe(value[0])}
            max={36}
            step={1}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{timeframe} months</span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Investment Strategy
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(strategyInfo).map(([key, info]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={strategy === key ? "default" : "outline"}
                      onClick={() => setStrategy(key as Strategy)}
                      className="flex items-center gap-2"
                    >
                      {key === "dca" && <Calculator className="w-4 h-4" />}
                      {key === "lump-sum" && <TrendingUp className="w-4 h-4" />}
                      {key === "value-avg" && <Scale className="w-4 h-4" />}
                      {info.title}
                      <Info className="w-4 h-4 ml-1" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-64 p-4">
                    <h4 className="font-semibold mb-2">{info.title}</h4>
                    <p className="text-sm mb-2">{info.description}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-green-600">Pros:</span>
                        <ul className="text-xs list-disc pl-4">
                          {info.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-red-600">Cons:</span>
                        <ul className="text-xs list-disc pl-4">
                          {info.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <Button
          onClick={simulateInvestment}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          Run Simulation
        </Button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <Card className="p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-800 mb-2">Simulation Results</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Expected ROI:</span>
                <span className="font-semibold text-green-600">
                  {result.roi}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Risk Level:</span>
                <span className={`font-semibold ${
                  result.riskLevel === "High" 
                    ? "text-red-600" 
                    : result.riskLevel === "Medium" 
                    ? "text-yellow-600" 
                    : "text-green-600"
                }`}>
                  {result.riskLevel}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">{result.suggestion}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h5 className="text-sm font-semibold text-green-600 mb-2">Advantages</h5>
                    <ul className="text-sm space-y-1">
                      {result.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-red-600 mb-2">Disadvantages</h5>
                    <ul className="text-sm space-y-1">
                      {result.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </Card>
  );
};

export default BitcoinInvestmentExercise;