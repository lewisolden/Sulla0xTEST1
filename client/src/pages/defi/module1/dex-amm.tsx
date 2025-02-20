import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, ArrowDownUp, Wallet, RefreshCw, Settings, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { SiSushiswap, SiCoinbase, SiUniswap } from "react-icons/si";

// Mock token data for the swap demo
const tokens = {
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    price: 1,
    balance: 1000,
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    price: 3000,
    balance: 5,
  },
};

export default function DexAmm() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Swap interface state
  const [inputAmount, setInputAmount] = useState("");
  const [swapDirection, setSwapDirection] = useState<"USDC_TO_ETH" | "ETH_TO_USDC">("USDC_TO_ETH");
  const [slippage, setSlippage] = useState(0.5); // 0.5% default slippage
  const [showSwapDetails, setShowSwapDetails] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "dex-amm", true, 3);
    setIsCompleted(true);
  };

  // Calculate swap output based on constant product formula (x * y = k)
  const calculateSwapOutput = (inputAmount: number): number => {
    const poolSize = 1000000; // Mock liquidity pool size
    const k = poolSize * poolSize; // Constant product

    if (swapDirection === "USDC_TO_ETH") {
      const ethOut = poolSize - (k / (poolSize + inputAmount));
      return ethOut * (1 - slippage / 100);
    } else {
      const usdcOut = poolSize - (k / (poolSize + inputAmount));
      return usdcOut * (1 - slippage / 100);
    }
  };

  const handleSwap = () => {
    // In a real implementation, this would interact with smart contracts
    console.log("Swap executed:", {
      direction: swapDirection,
      inputAmount,
      outputAmount: calculateSwapOutput(parseFloat(inputAmount)),
      slippage
    });
  };

  const toggleSwapDirection = () => {
    setSwapDirection(prev => prev === "USDC_TO_ETH" ? "ETH_TO_USDC" : "USDC_TO_ETH");
    setInputAmount("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Decentralized Exchanges & Automated Market Makers
              </h1>

              <div className="prose max-w-none">
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding DEXs
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Decentralized Exchanges (DEXs) revolutionize cryptocurrency trading by eliminating intermediaries 
                    through smart contracts. Unlike centralized exchanges, DEXs operate entirely on blockchain 
                    networks, offering enhanced security, transparency, and user control over funds.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 my-8">
                    {[
                      {
                        name: "Uniswap",
                        icon: SiUniswap,
                        description: "Pioneer of the AMM model, largest Ethereum DEX",
                        features: ["Concentrated Liquidity", "Multiple Fee Tiers", "V3 Architecture"]
                      },
                      {
                        name: "SushiSwap",
                        icon: SiSushiswap,
                        description: "Community-driven DEX with yield farming",
                        features: ["Yield Farming", "Cross-chain Support", "NFT Platform"]
                      },
                      {
                        name: "Coinbase",
                        icon: SiCoinbase,
                        description: "Leading centralized exchange comparison",
                        features: ["High Liquidity", "Regulatory Compliance", "User-Friendly"]
                      }
                    ].map((dex, index) => (
                      <motion.div
                        key={dex.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <dex.icon className="h-8 w-8 text-blue-600" />
                          <h3 className="text-xl font-semibold">{dex.name}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{dex.description}</p>
                        <ul className="space-y-2">
                          {dex.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    AMM Mechanics
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Automated Market Makers use mathematical formulas to determine asset prices and facilitate trades. 
                    The most common model is the constant product formula (x * y = k), where the product of the two 
                    token quantities must remain constant after each trade.
                  </p>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Interactive DEX Demo</h3>
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">You Pay</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={inputAmount}
                              onChange={(e) => setInputAmount(e.target.value)}
                              placeholder="0.00"
                              className="flex-1"
                            />
                            <Button variant="outline" className="w-24 flex items-center gap-2">
                              {swapDirection === "USDC_TO_ETH" ? (
                                <>
                                  <BiDollarCircle className="h-4 w-4" />
                                  USDC
                                </>
                              ) : (
                                <>
                                  <FaEthereum className="h-4 w-4" />
                                  ETH
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSwapDirection}
                            className="rounded-full hover:bg-blue-50"
                          >
                            <ArrowDownUp className="h-6 w-6" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">You Receive</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={inputAmount ? calculateSwapOutput(parseFloat(inputAmount)).toFixed(6) : ""}
                              readOnly
                              placeholder="0.00"
                              className="flex-1 bg-gray-50"
                            />
                            <Button variant="outline" className="w-24 flex items-center gap-2">
                              {swapDirection === "USDC_TO_ETH" ? (
                                <>
                                  <FaEthereum className="h-4 w-4" />
                                  ETH
                                </>
                              ) : (
                                <>
                                  <BiDollarCircle className="h-4 w-4" />
                                  USDC
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => setShowSwapDetails(!showSwapDetails)}
                              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Info className="h-4 w-4" />
                              Swap Details
                            </button>
                            <span className="text-sm text-gray-500">
                              Slippage: {slippage}%
                            </span>
                          </div>

                          <AnimatePresence>
                            {showSwapDetails && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 rounded-lg p-4 space-y-2"
                              >
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Rate</span>
                                  <span className="text-gray-800">
                                    1 {swapDirection === "USDC_TO_ETH" ? "ETH" : "USDC"} = 
                                    {swapDirection === "USDC_TO_ETH" ? " 3000 USDC" : " 0.000333 ETH"}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Price Impact</span>
                                  <span className="text-blue-600">~0.05%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Minimum Received</span>
                                  <span className="text-gray-800">
                                    {inputAmount ? (calculateSwapOutput(parseFloat(inputAmount)) * (1 - slippage / 100)).toFixed(6) : "0.00"}
                                    {" "}{swapDirection === "USDC_TO_ETH" ? "ETH" : "USDC"}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Button
                          onClick={handleSwap}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                        >
                          Swap
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex justify-between items-center mt-12">
                  <Link href="/defi/module1/blockchain-contracts">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Previous Section
                    </Button>
                  </Link>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleComplete}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>

                    <Link href="/defi/module1/liquidity-yield">
                      <Button className="gap-2">
                        Next Section <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}