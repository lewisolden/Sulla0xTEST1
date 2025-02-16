import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Calculator, TrendingUp, Scale, AlertTriangle } from "lucide-react";
import { useProgress } from "@/context/progress-context";

type Strategy = "dca" | "lump-sum" | "value-avg";

interface SimulationResult {
  roi: number;
  riskLevel: string;
  suggestion: string;
}

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
        suggestion: "Dollar-cost averaging helps reduce timing risk"
      },
      "lump-sum": {
        roi: 25,
        riskLevel: "High",
        suggestion: "Higher potential returns but also higher risk"
      },
      "value-avg": {
        roi: 20,
        riskLevel: "Medium",
        suggestion: "Balanced approach between DCA and lump-sum"
      }
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
            <Button
              variant={strategy === "dca" ? "default" : "outline"}
              onClick={() => setStrategy("dca")}
              className="flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Dollar-Cost Averaging
            </Button>
            <Button
              variant={strategy === "lump-sum" ? "default" : "outline"}
              onClick={() => setStrategy("lump-sum")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Lump Sum
            </Button>
            <Button
              variant={strategy === "value-avg" ? "default" : "outline"}
              onClick={() => setStrategy("value-avg")}
              className="flex items-center gap-2"
            >
              <Scale className="w-4 h-4" />
              Value Averaging
            </Button>
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
            <div className="space-y-2">
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
              <div className="mt-4 flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600">{result.suggestion}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </Card>
  );
};

export default BitcoinInvestmentExercise;
