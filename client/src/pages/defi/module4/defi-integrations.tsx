import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            DeFi Integrations: Building the Future of Finance
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                {/* Icon removed as per edited code example */}
                Cross-Chain Integrations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cross-chain integrations are becoming increasingly important in the DeFi ecosystem, enabling seamless asset transfers and interactions between different blockchain networks. Key aspects include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Bridge protocols for asset transfers between chains</li>
                <li>Cross-chain messaging protocols for communication</li>
                <li>Multi-chain smart contract deployments</li>
                <li>Unified liquidity pools across chains</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                {/* Icon removed as per edited code example */}
                API and Oracle Integrations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                DeFi protocols rely heavily on external data and services through APIs and oracles. Essential components include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Price feed oracles for accurate asset valuations</li>
                <li>Real-world data integration for synthetic assets</li>
                <li>API gateways for institutional access</li>
                <li>Weather data oracles for parametric insurance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                {/* Icon removed as per edited code example */}
                Traditional Finance (TradFi) Integration
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The bridge between DeFi and traditional finance is crucial for mainstream adoption:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Payment processor integrations</li>
                <li>Bank API connections for fiat on/off ramps</li>
                <li>KYC/AML compliance tools</li>
                <li>Traditional asset tokenization platforms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                {/* Icon removed as per edited code example */}
                Smart Contract Integrations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Smart contract integrations enable complex DeFi functionality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Composable DeFi protocols</li>
                <li>Flash loan integrations</li>
                <li>Automated market maker (AMM) implementations</li>
                <li>Yield aggregation strategies</li>
              </ul>
            </section>

            <div className="mt-8">
              <Button
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Take Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            DeFi Integrations Quiz
          </h1>

          {!showResults ? (
            <>
              <Progress
                value={(currentQuestion / questions.length) * 100}
                className="mb-6"
              />
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left"
                      onClick={() => handleAnswerSelection(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
              <p className="text-xl mb-4">
                Your score: {score} out of {questions.length}
              </p>
              <Progress
                value={(score / questions.length) * 100}
                className="mb-6"
              />
              {score === questions.length ? (
                <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered DeFi integrations!</p>
              ) : score >= questions.length * 0.7 ? (
                <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of DeFi integrations.</p>
              ) : (
                <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
              )}
              <Link href="/modules">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                  Return to Modules
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}