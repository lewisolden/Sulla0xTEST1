import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight, Blocks, Network, Shield, Wallet } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is a key characteristic of flash loans in DeFi?",
    options: [
      "They require high collateral",
      "They must be repaid within the same transaction block",
      "They have a 24-hour repayment period",
      "They can only be used for staking"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of the following is a concentrated liquidity feature?",
    options: [
      "Equal distribution across all price ranges",
      "Liquidity provided only in specific price ranges",
      "Fixed fee percentages",
      "Unlimited pool size"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is MEV in DeFi?",
    options: [
      "Maximum Exchange Volume",
      "Miner Extractable Value",
      "Minimum Entry Value",
      "Multiple Exchange Verification"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which strategy helps mitigate impermanent loss?",
    options: [
      "Increasing leverage",
      "Single-sided liquidity provision",
      "Delta-neutral positions",
      "Avoiding liquidity pools entirely"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is a key aspect of protocol-owned liquidity?",
    options: [
      "All liquidity is provided by users",
      "The protocol owns and controls its liquidity",
      "Liquidity is controlled by external market makers",
      "Liquidity is always locked for a fixed period"
    ],
    correctAnswer: 1
  }
];

export default function DefiIntegrations() {
  const [showQuiz, setShowQuiz] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleStartQuiz = () => {
    setShowQuiz(true);
    toast({
      title: "Quiz Started",
      description: "Good luck! Test your knowledge of DeFi integrations.",
    });
  };

  if (showQuiz) {
    return <DefiIntegrationsQuiz />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              DeFi Integrations
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Building Bridges in the DeFi Ecosystem
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Cross-Chain Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <Network className="h-8 w-8 text-purple-400" />
                <h2 className="text-3xl font-bold text-purple-300">Cross-Chain Integrations</h2>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Cross-chain integrations are revolutionizing the DeFi ecosystem by enabling seamless asset transfers and interactions between different blockchain networks.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <span>Advanced bridge protocols for secure asset transfers</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <span>Cross-chain messaging protocols enabling network communication</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <span>Multi-chain smart contract deployments and management</span>
                </li>
              </ul>
            </motion.section>

            {/* Oracle Integration Section */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-pink-900/50 to-red-900/50 rounded-xl p-8 backdrop-blur-lg border border-pink-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <Blocks className="h-8 w-8 text-pink-400" />
                <h2 className="text-3xl font-bold text-pink-300">Oracle Integrations</h2>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Oracle integrations provide crucial real-world data feeds and enable sophisticated DeFi applications through reliable external data sources.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                  <span>Real-time price feeds for accurate asset valuation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                  <span>External data integration for synthetic assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                  <span>Advanced market data aggregation systems</span>
                </li>
              </ul>
            </motion.section>

            {/* TradFi Integration Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-8 backdrop-blur-lg border border-red-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <Wallet className="h-8 w-8 text-red-400" />
                <h2 className="text-3xl font-bold text-red-300">TradFi Integration</h2>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                The bridge between DeFi and traditional finance is essential for mainstream adoption and institutional participation.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <span>Seamless fiat on/off ramp solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <span>Institutional-grade custody solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <span>Regulatory compliance frameworks</span>
                </li>
              </ul>
            </motion.section>

            {/* Security Section */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 rounded-xl p-8 backdrop-blur-lg border border-orange-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-8 w-8 text-orange-400" />
                <h2 className="text-3xl font-bold text-orange-300">Security Framework</h2>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Robust security measures are crucial for protecting assets and maintaining trust in integrated DeFi systems.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Multi-signature security protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Advanced audit and monitoring systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Automated security checks and validations</span>
                </li>
              </ul>
            </motion.section>

            {/* Quiz Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <Button
                onClick={handleStartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg transform transition hover:scale-105"
              >
                Take the Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DefiIntegrationsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      const finalScore = (score / questions.length) * 100;
      updateProgress(
        4,
        'defi-module4-integrations-quiz',
        finalScore >= 70,
        1,
        undefined,
        finalScore,
        '/defi/module4/defi-integrations',
        undefined,
        'DeFi'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto p-8 bg-black/50 backdrop-blur-lg border border-purple-500/20">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            DeFi Integrations Quiz
          </h1>

          {!showResults ? (
            <>
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="mb-8 bg-gray-700"
              />
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <p className="text-xl mb-6 text-gray-300">{questions[currentQuestion].question}</p>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className={`w-full justify-start text-left p-4 text-lg ${
                        selectedAnswer === index 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-gray-300'
                      }`}
                      onClick={() => handleAnswerSelection(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Quiz Complete!</h2>
              <p className="text-2xl mb-6">
                Your score: {score} out of {questions.length}
              </p>
              <Progress
                value={(score / questions.length) * 100}
                className="mb-8 bg-gray-700"
              />
              {score === questions.length ? (
                <p className="text-green-400 font-semibold mb-8 text-xl">Perfect score! You've mastered DeFi integrations!</p>
              ) : score >= questions.length * 0.7 ? (
                <p className="text-blue-400 font-semibold mb-8 text-xl">Great job! You have a strong understanding of DeFi integrations.</p>
              ) : (
                <p className="text-yellow-400 font-semibold mb-8 text-xl">Keep learning! Review the material and try again to improve your score.</p>
              )}
              <Link href="/modules">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6 transform transition hover:scale-105">
                  Return to Modules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}