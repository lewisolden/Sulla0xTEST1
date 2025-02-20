import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, ArrowDownUp, Wallet, RefreshCw, Settings, Info, Check, X, CheckCircle2 } from "lucide-react";
import { FaEthereum, FaExchangeAlt } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { BsCurrencyExchange, BsGraphUp } from "react-icons/bs";
import { SiSolana } from "react-icons/si";

// Initial token data for the swap demo
const initialTokens = {
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    price: 1,
    balance: 10000, // Updated balance to 10,000 USDC
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    price: 3000, // 1 ETH = 3,000 USDC
    balance: 5,
  },
};

// Quiz questions with explanations
const quizQuestions = [
  {
    question: "What is the main advantage of using a DEX over a centralized exchange?",
    options: [
      "Non-custodial trading without intermediaries",
      "Faster transaction speeds",
      "Lower trading fees",
      "Better user interface"
    ],
    correctAnswer: 0,
    explanation: "DEXs allow users to trade directly from their wallets without surrendering custody of their funds to an intermediary, enhancing security and maintaining true ownership of assets."
  },
  {
    question: "How do Automated Market Makers (AMMs) determine token prices?",
    options: [
      "By following centralized exchange prices",
      "Through order books matching",
      "Using mathematical formulas and liquidity pools",
      "By manual price updates from administrators"
    ],
    correctAnswer: 2,
    explanation: "AMMs use mathematical formulas (like the constant product formula x*y=k) and liquidity pools to automatically determine token prices based on the ratio of tokens in the pool."
  },
  {
    question: "What is slippage in DEX trading?",
    options: [
      "A technical error in the smart contract",
      "The time delay between trades",
      "The difference between expected and actual execution price",
      "The fee charged by the DEX"
    ],
    correctAnswer: 2,
    explanation: "Slippage is the difference between the expected price of a trade and the actual executed price, often occurring due to market movement or large trade sizes relative to liquidity."
  }
];

export default function DexAmm() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Swap interface state
  const [inputAmount, setInputAmount] = useState("");
  const [swapDirection, setSwapDirection] = useState<"USDC_TO_ETH" | "ETH_TO_USDC">("USDC_TO_ETH");
  const [slippage, setSlippage] = useState(0.5); // 0.5% default slippage
  const [showSwapDetails, setShowSwapDetails] = useState(false);
  const [tokens, setTokens] = useState(initialTokens);
  const [swapStatus, setSwapStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "dex-amm", true, 3);
    setIsCompleted(true);
  };

  // Quiz handlers
  const handleAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowExplanation(true);

    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  // Calculate swap output based on exchange rate
  const calculateSwapOutput = (inputAmount: number): number => {
    if (swapDirection === "USDC_TO_ETH") {
      return (inputAmount / 3000) * (1 - slippage / 100);
    } else {
      return (inputAmount * 3000) * (1 - slippage / 100);
    }
  };

  const validateSwap = (input: number): { isValid: boolean; message: string } => {
    if (isNaN(input) || input <= 0) {
      return { isValid: false, message: "Please enter a valid amount" };
    }

    const sourceToken = swapDirection === "USDC_TO_ETH" ? tokens.USDC : tokens.ETH;
    if (input > sourceToken.balance) {
      return { isValid: false, message: `Insufficient ${sourceToken.symbol} balance` };
    }

    return { isValid: true, message: "" };
  };

  const handleSwap = () => {
    const input = parseFloat(inputAmount);
    const validation = validateSwap(input);

    if (!validation.isValid) {
      setSwapStatus({ type: 'error', message: validation.message });
      return;
    }

    const output = calculateSwapOutput(input);

    // Update token balances
    setTokens(prev => {
      if (swapDirection === "USDC_TO_ETH") {
        return {
          USDC: { ...prev.USDC, balance: prev.USDC.balance - input },
          ETH: { ...prev.ETH, balance: prev.ETH.balance + output }
        };
      } else {
        return {
          ETH: { ...prev.ETH, balance: prev.ETH.balance - input },
          USDC: { ...prev.USDC, balance: prev.USDC.balance + output }
        };
      }
    });

    // Show success message
    setSwapStatus({
      type: 'success',
      message: `Successfully swapped ${input} ${swapDirection === "USDC_TO_ETH" ? "USDC" : "ETH"} for ${output.toFixed(6)} ${swapDirection === "USDC_TO_ETH" ? "ETH" : "USDC"}`
    });

    // Reset input
    setInputAmount("");
  };

  const toggleSwapDirection = () => {
    setSwapDirection(prev => prev === "USDC_TO_ETH" ? "ETH_TO_USDC" : "USDC_TO_ETH");
    setInputAmount("");
    setSwapStatus({ type: null, message: '' });
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
                        name: "Automated Market Maker",
                        icon: FaExchangeAlt,
                        description: "Algorithmic trading using liquidity pools",
                        features: ["No Order Books", "Constant Product Formula", "Liquidity Pools"]
                      },
                      {
                        name: "Order Book DEX",
                        icon: BsCurrencyExchange,
                        description: "Traditional order matching system",
                        features: ["Limit Orders", "Market Orders", "Order Matching"]
                      },
                      {
                        name: "Hybrid Exchange",
                        icon: BsGraphUp,
                        description: "Combines AMM and order book features",
                        features: ["Best of Both", "Enhanced Liquidity", "Price Efficiency"]
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

                {/* Popular DEXs section */}
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Popular Decentralized Exchanges
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Explore some of the most innovative and widely-used decentralized exchanges in the ecosystem:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        name: "Uniswap",
                        icon: FaExchangeAlt,  // Using a generic exchange icon for Uniswap
                        description: "Leading Ethereum DEX with concentrated liquidity",
                        url: "https://app.uniswap.org",
                        features: ["V3 Architecture", "Multi-chain", "Best-in-class UX"]
                      },
                      {
                        name: "Jupiter",
                        icon: SiSolana,
                        description: "Solana's most popular aggregator & DEX",
                        url: "https://jup.ag",
                        features: ["Best Price Routes", "High Speed", "Low Fees"]
                      },
                      {
                        name: "Hyperliquid",
                        icon: FaExchangeAlt,
                        description: "Perpetual DEX with advanced features",
                        url: "https://app.hyperliquid.xyz",
                        features: ["Perpetuals", "Cross-margin", "Advanced Trading"]
                      },
                      {
                        name: "dYdX",
                        icon: BsCurrencyExchange,
                        description: "Leading decentralized derivatives exchange",
                        url: "https://dydx.exchange",
                        features: ["Perpetual Trading", "Low Latency", "Cross-margin"]
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
                          <div className="bg-blue-100 rounded-full p-2">
                            <dex.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold">{dex.name}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{dex.description}</p>
                        <ul className="space-y-2 mb-4">
                          {dex.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={dex.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          Visit {dex.name} <ArrowRight className="h-4 w-4" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </section>


                {/*NEW SECTION START HERE*/}
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key DEX Concepts
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Slippage Explanation */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 rounded-full p-2">
                          <ArrowDownUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold">Understanding Slippage</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Slippage is the difference between the expected price of a trade and the actual executed price. This occurs due to:
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Market Movement: Prices can change between when you submit a trade and when it's executed
                        </li>
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Trade Size: Large orders can significantly impact the price, especially in smaller liquidity pools
                        </li>
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Network Congestion: Blockchain network delays can lead to price changes
                        </li>
                      </ul>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                          💡 Setting a slippage tolerance helps protect your trade from executing at an unfavorable price. Our demo uses a 0.5% default slippage tolerance.
                        </p>
                      </div>
                    </div>

                    {/* Perpetual DEX Explanation */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 rounded-full p-2">
                          <BsGraphUp className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold">Perpetual DEXs</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Perpetual DEXs are specialized exchanges that offer perpetual futures contracts - cryptocurrency derivatives that never expire. Key features include:
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Leverage: Trade with borrowed funds to amplify potential returns (and risks)
                        </li>
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          No Expiry: Positions can be held indefinitely, unlike traditional futures
                        </li>
                        <li className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Funding Rates: Periodic payments between longs and shorts to maintain price alignment
                        </li>
                      </ul>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                          ⚠️ Perpetual trading involves significant risks due to leverage and complex mechanics. Always understand the product before trading.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/*NEW SECTION END HERE*/}


                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Interactive DEX Demo
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Experience how decentralized exchanges work with our interactive demo. Swap between USDC and ETH 
                    while observing how prices and balances update in real-time.
                  </p>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                    <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Welcome to the DEX Demo!</h3>
                      <p className="text-gray-600 mb-4">
                        Try out a decentralized exchange with this interactive demo. You have:
                      </p>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                          <BiDollarCircle className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{tokens.USDC.balance.toFixed(2)} USDC</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                          <FaEthereum className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">{tokens.ETH.balance.toFixed(6)} ETH</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Current exchange rate: 1 ETH = 3,000 USDC
                      </p>
                    </div>

                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                      <div className="space-y-4">
                        {/* Swap Status Message */}
                        <AnimatePresence>
                          {swapStatus.type && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`p-3 rounded-lg ${
                                swapStatus.type === 'success'
                                  ? 'bg-green-50 border border-green-200 text-green-700'
                                  : 'bg-red-50 border border-red-200 text-red-700'
                              }`}
                            >
                              {swapStatus.message}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">You Pay</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={inputAmount}
                              onChange={(e) => {
                                setInputAmount(e.target.value);
                                setSwapStatus({ type: null, message: '' });
                              }}
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
                          <p className="text-sm text-gray-500">
                            Balance: {swapDirection === "USDC_TO_ETH" ? tokens.USDC.balance.toFixed(2) : tokens.ETH.balance.toFixed(6)} {swapDirection === "USDC_TO_ETH" ? "USDC" : "ETH"}
                          </p>
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
                                    1 ETH = 3,000 USDC
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Price Impact</span>
                                  <span className="text-blue-600">~0.05%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Minimum Received</span>
                                  <span className="text-gray-800">
                                    {inputAmount ? (calculateSwapOutput(parseFloat(inputAmount))).toFixed(6) : "0.00"}
                                    {" "}{swapDirection === "USDC_TO_ETH" ? "ETH" : "USDC"}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Button
                          onClick={handleSwap}
                          className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                          disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                        >
                          Swap
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Quiz Section */}
                {!showQuiz ? (
                  <div className="text-center mt-8">
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                    >
                      Take Topic Quiz
                    </Button>
                  </div>
                ) : (
                  <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                      Knowledge Check
                    </h2>

                    {!quizCompleted ? (
                      <div>
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-600">
                              Question {currentQuestion + 1} of {quizQuestions.length}
                            </p>
                            <p className="text-sm font-medium text-blue-600">
                              Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-blue-600 h-2 rounded-full"
                              initial={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <motion.div
                          key={currentQuestion}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-medium text-gray-800">
                            {quizQuestions[currentQuestion].question}
                          </h3>

                          <div className="space-y-3">
                            {quizQuestions[currentQuestion].options.map((option, index) => {
                              const isSelected = selectedAnswer === index;
                              const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                              const showResult = selectedAnswer !== null;

                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                  <Button
                                    onClick={() => !selectedAnswer && handleAnswer(index)}
                                    variant="outline"
                                    className={`w-full justify-start text-left transition-all duration-300 ${
                                      showResult
                                        ? isCorrect
                                          ? "bg-green-50 border-green-500 text-green-700"
                                          : isSelected
                                            ? "bg-red-50 border-red-500 text-red-700"
                                            : ""
                                        : "hover:bg-blue-50"
                                    }`}
                                    disabled={selectedAnswer !== null}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span>{option}</span>
                                      {showResult && (isCorrect || isSelected) && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                          className="ml-2"
                                        >
                                          {isCorrect ? (
                                            <Check className="h-5 w-5 text-green-500" />
                                          ) : (
                                            <X className="h-5 w-5 text-red-500" />
                                          )}
                                        </motion.span>
                                      )}
                                    </div>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </div>

                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className={`mt-6 p-6 rounded-lg ${
                                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                  ? "bg-green-50 border border-green-200"
                                  : "bg-red-50 border border-red-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                                ) : (
                                  <X className="h-6 w-6 text-red-500 mt-1" />
                                )}
                                <div>
                                  <h4 className={`font-medium mb-2 ${
                                    selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                      ? "text-green-800"
                                      : "text-red-800"
                                  }`}>
                                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                                      ? "Correct!"
                                      : "Incorrect"
                                    }
                                  </h4>
                                  <p className="text-gray-700">
                                    {quizQuestions[currentQuestion].explanation}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                        </motion.div>

                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            Quiz Completed!
                          </h3>
                          <p className="text-gray-600 text-lg mb-2">
                            You scored {score} out of {quizQuestions.length}
                          </p>
                          <p className="text-gray-500">
                            {score === quizQuestions.length
                              ? "Perfect score! You've mastered this topic!"
                              : "Keep learning and try again to improve your score!"}
                          </p>
                        </div>

                        <Button
                          onClick={() => {
                            setShowQuiz(false);
                            setCurrentQuestion(0);
                            setScore(0);
                            setQuizCompleted(false);
                                                        setSelectedAnswer(null);
                            setShowExplanation(false);
                          }}
                          variant="outline"
                          className="transform hover:scale-105 transition-all duration-300"
                        >
                          Retake Quiz
                        </Button>
                      </motion.div>
                    )}
                  </section>
                )}

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