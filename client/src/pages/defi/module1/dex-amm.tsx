import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, ArrowDownUp, Wallet, RefreshCw, Settings, Info, Check, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEthereum, FaExchangeAlt } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { BsCurrencyExchange, BsGraphUp } from "react-icons/bs";
import { SiSolana } from "react-icons/si";

// Initial token data for the swap demo
const initialTokens = {
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    balance: 10000,
    Icon: BiDollarCircle,
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    balance: 0,
    Icon: FaEthereum,
  },
} as const;

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
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate] = useState(3000); // 1 ETH = 3000 USDC
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
  const calculateSwapOutput = (input: string) => {
    if (!input) return "";
    const amount = parseFloat(input);
    if (isNaN(amount)) return "";

    if (fromToken === "USDC") {
      return (amount / exchangeRate).toFixed(6);
    } else {
      return (amount * exchangeRate).toFixed(2);
    }
  };

  // Handle amount input change
  const handleAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateSwapOutput(value));
  };

  // Swap tokens function
  const swapTokens = () => {
    if (!fromAmount) {
      setSwapStatus({
        type: 'error',
        message: 'Please enter an amount to swap'
      });
      return;
    }

    const amount = parseFloat(fromAmount);
    if (isNaN(amount)) {
      setSwapStatus({
        type: 'error',
        message: 'Invalid amount'
      });
      return;
    }

    if (amount > initialTokens[fromToken as keyof typeof initialTokens].balance) {
      setSwapStatus({
        type: 'error',
        message: 'Insufficient balance'
      });
      return;
    }

    setSwapStatus({
      type: 'success',
      message: `Successfully swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`
    });

    // Reset form
    setFromAmount("");
    setToAmount("");

    // Clear status after 3 seconds
    setTimeout(() => {
      setSwapStatus({ type: null, message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <Link href="/defi/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Module Overview
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Decentralized Exchanges & AMMs
              </h1>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    How DEXs Work
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Decentralized Exchanges (DEXs) enable peer-to-peer trading of cryptocurrencies without intermediaries. They use smart contracts and liquidity pools to facilitate trades, ensuring constant availability of assets for trading.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Automated Market Makers (AMMs)
                  </h2>
                  <p className="text-gray-700 mb-4">
                    AMMs are smart contracts that create liquidity pools of tokens, allowing users to trade against these pools. The price of tokens is determined by a mathematical formula, typically using the constant product formula (x * y = k).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BsGraphUp className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-700">Price Discovery</h3>
                      </div>
                      <p className="text-gray-600">
                        AMMs use mathematical formulas to determine token prices based on the ratio of assets in the liquidity pool.
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FaExchangeAlt className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-700">Constant Liquidity</h3>
                      </div>
                      <p className="text-gray-600">
                        Liquidity is always available for trading, with prices adjusting automatically based on pool ratios.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <div className="mt-8 space-y-6">
                    <div className="bg-blue-50/50 rounded-lg p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Understanding Slippage</h3>
                      <p className="text-gray-700">
                        Slippage refers to the difference between the expected price of a trade and the actual executed price. This occurs because:
                      </p>
                      <ul className="mt-3 space-y-2 list-disc pl-6 text-gray-600">
                        <li>Market prices can change between when you submit a transaction and when it's executed</li>
                        <li>Large trades can significantly impact the pool's token ratio, leading to worse execution prices</li>
                        <li>Setting a slippage tolerance helps protect your trade from executing at unfavorable prices</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50/50 rounded-lg p-6 border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Perpetual DEXs Explained</h3>
                      <p className="text-gray-700">
                        Perpetual DEXs are specialized exchanges that allow traders to hold leveraged positions indefinitely without an expiration date. Key features include:
                      </p>
                      <ul className="mt-3 space-y-2 list-disc pl-6 text-gray-600">
                        <li>Continuous trading of synthetic assets without settlement dates</li>
                        <li>Leverage trading with automated liquidation mechanisms</li>
                        <li>Price feeds from multiple oracles to ensure accurate market prices</li>
                        <li>Funding rates to keep perpetual prices aligned with spot markets</li>
                      </ul>
                      <p className="mt-4 text-sm text-gray-500">
                        Examples include dYdX and Hyperliquid, which offer perpetual futures trading with deep liquidity and advanced trading features.
                      </p>
                    </div>
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
                        icon: FaExchangeAlt,
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

                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Interactive DEX Demo
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Try out this simulated DEX interface to understand how token swaps work in practice. You have 10,000 USDC to experiment with!
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="mb-4">
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
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Wallet className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        Available Balance: {initialTokens[fromToken as keyof typeof initialTokens].balance} {fromToken}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">From</span>
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Max: {initialTokens[fromToken as keyof typeof initialTokens].balance}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={fromAmount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            placeholder="0.0"
                            className="text-lg"
                          />
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                            {(() => {
                              const TokenIcon = initialTokens[fromToken as keyof typeof initialTokens].Icon;
                              return <TokenIcon className="h-5 w-5 text-blue-600" />;
                            })()}
                            <span className="font-medium">{fromToken}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const temp = fromToken;
                            setFromToken(toToken);
                            setToToken(temp);
                            setFromAmount("");
                            setToAmount("");
                          }}
                          className="bg-blue-100 hover:bg-blue-200 rounded-full h-8 w-8"
                        >
                          <ArrowDownUp className="h-4 w-4 text-blue-600" />
                        </Button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">To</span>
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Rate: 1 ETH = {exchangeRate} USDC
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Input
                            type="text"
                            value={toAmount}
                            readOnly
                            placeholder="0.0"
                            className="text-lg"
                          />
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                            {(() => {
                              const TokenIcon = initialTokens[toToken as keyof typeof initialTokens].Icon;
                              return <TokenIcon className="h-5 w-5 text-blue-600" />;
                            })()}
                            <span className="font-medium">{toToken}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={swapTokens}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                      >
                        Swap Tokens
                      </Button>

                      <div className="text-sm text-gray-500 flex items-start gap-2">
                        <Info className="h-4 w-4 mt-0.5" />
                        <p>
                          This is a simulated swap interface. In a real DEX, you would need to connect your wallet and approve token spending.
                        </p>
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