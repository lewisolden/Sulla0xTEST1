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
import { Lock, Coins, AlertTriangle, Info, Users, Server } from "lucide-react";
import { useProgress } from "@/context/progress-context";

type StakingType = "solo" | "pooled";

interface SimulationResult {
  annualReturn: number;
  monthlyRewards: number;
  lockupPeriod: string;
  stakingRequirements: string[];
  risks: string[];
  nextSteps: string[];
}

const stakingInfo = {
  solo: {
    title: "Solo Staking",
    description: "Run your own validator node with 32 ETH",
    requirements: [
      "32 ETH minimum stake",
      "Technical knowledge required",
      "Dedicated hardware",
      "Reliable internet connection",
    ],
    risks: [
      "Slashing penalties for downtime",
      "Technical maintenance required",
      "Higher initial investment",
    ],
    rewards: "5-10% APR estimated",
  },
  pooled: {
    title: "Pooled Staking",
    description: "Join a staking pool with any amount of ETH",
    requirements: [
      "Minimum 0.01 ETH",
      "Choose a reliable staking service",
      "Basic crypto knowledge",
    ],
    risks: [
      "Lower rewards due to pool fees",
      "Dependence on pool operator",
      "Smart contract risks",
    ],
    rewards: "4-8% APR estimated",
  },
};

export const EthereumStakingExercise = () => {
  const [stakeAmount, setStakeAmount] = useState<number>(1);
  const [stakingType, setStakingType] = useState<StakingType>("pooled");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const { updateProgress } = useProgress();

  const simulateStaking = () => {
    const baseAPR = stakingType === "solo" ? 0.08 : 0.06; // 8% for solo, 6% for pooled
    const annualReturn = stakeAmount * baseAPR;
    const monthlyRewards = annualReturn / 12;

    const results: SimulationResult = {
      annualReturn,
      monthlyRewards,
      lockupPeriod: "Minimum 1-2 years until withdrawals enabled",
      stakingRequirements: stakingInfo[stakingType].requirements,
      risks: stakingInfo[stakingType].risks,
      nextSteps: [
        "Set up a secure wallet",
        "Research staking providers or validator setup",
        "Start with a small amount to learn",
        "Join staking communities for support",
      ],
    };

    setResult(results);
    toast({
      title: "Staking Simulation Complete",
      description: "Review your potential staking rewards and requirements below",
    });
    updateProgress(3, "eth-staking-exercise", true);
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-blue-800">
          ETH Staking Simulator
        </h3>
        <p className="text-gray-600">
          Learn about ETH staking options and simulate potential rewards
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Stake (ETH)
          </label>
          <Slider
            value={[stakeAmount]}
            onValueChange={(value) => setStakeAmount(value[0])}
            max={stakingType === "solo" ? 100 : 32}
            min={stakingType === "solo" ? 32 : 0.01}
            step={stakingType === "solo" ? 1 : 0.01}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            {stakeAmount.toFixed(2)} ETH
          </span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Staking Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(stakingInfo).map(([key, info]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={stakingType === key ? "default" : "outline"}
                      onClick={() => setStakingType(key as StakingType)}
                      className="w-full flex items-center gap-2"
                    >
                      {key === "solo" ? (
                        <Server className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                      {info.title}
                      <Info className="w-4 h-4 ml-1" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-64 p-4">
                    <h4 className="font-semibold mb-2">{info.title}</h4>
                    <p className="text-sm mb-2">{info.description}</p>
                    <p className="text-sm font-medium text-green-600">
                      {info.rewards}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <Button
          onClick={simulateStaking}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          Calculate Staking Rewards
        </Button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <Card className="p-6 bg-white">
            <h4 className="font-semibold text-blue-800 mb-4">Staking Results</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Return:</span>
                  <span className="font-semibold text-green-600">
                    {result.annualReturn.toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Rewards:</span>
                  <span className="font-semibold text-green-600">
                    {result.monthlyRewards.toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <Lock className="w-4 h-4 text-yellow-600 mt-1" />
                  <p className="text-sm text-yellow-600">{result.lockupPeriod}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-blue-700 mb-2">Requirements</h5>
                  <ul className="text-sm space-y-1">
                    {result.stakingRequirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-red-600 mb-2">Risks to Consider</h5>
                  <ul className="text-sm space-y-1">
                    {result.risks.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-1" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-blue-700 mb-2">Next Steps</h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                    <Coins className="w-4 h-4 text-blue-600 mt-1" />
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      )}
    </Card>
  );
};

export default EthereumStakingExercise;
