import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Quiz Questions
const quizQuestions = [
  {
    question: "What is a key characteristic of smart contracts?",
    options: [
      "They require manual execution",
      "They are self-executing when conditions are met",
      "They can be modified after deployment",
      "They need intermediaries"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing contracts where the terms are directly written into code and execute automatically when predetermined conditions are met, eliminating the need for intermediaries."
  },
  {
    question: "What is the 'Oracle Problem' in smart contracts?",
    options: [
      "Software bugs in the code",
      "High transaction fees",
      "Difficulty in getting reliable external data",
      "Slow execution speed"
    ],
    correctAnswer: 2,
    explanation: "The Oracle Problem refers to the challenge of getting reliable real-world data into blockchain smart contracts while maintaining decentralization and security."
  },
  {
    question: "Which platform was the first to implement smart contracts?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Cardano",
      "Solana"
    ],
    correctAnswer: 1,
    explanation: "Ethereum was the first blockchain platform to implement smart contracts, using its Solidity programming language and becoming the foundation for many decentralized applications."
  },
  {
    question: "What makes smart contracts immutable?",
    options: [
      "Regular updates",
      "Code cannot be changed after deployment",
      "Administrative controls",
      "User permissions"
    ],
    correctAnswer: 1,
    explanation: "Once deployed on the blockchain, smart contract code cannot be changed. This immutability ensures contract terms remain constant and builds trust between parties."
  },
  {
    question: "Which is NOT a common use case for smart contracts?",
    options: [
      "Automated lending",
      "Supply chain tracking",
      "Personal messaging",
      "Insurance claims processing"
    ],
    correctAnswer: 2,
    explanation: "Personal messaging is not a common use case for smart contracts, as they are primarily designed for automating business logic and transactions rather than communication functions."
  }
];

export default function SmartContractsSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        setShowQuiz(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const passThreshold = quizQuestions.length * 0.6;
      updateProgress(2, 'smart-contracts-quiz', score >= passThreshold);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (showQuiz && !showResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Smart Contracts Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {quizQuestions[currentQuestion].question}
            </p>
          </div>

          <div className="grid gap-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-300
                  ${selectedAnswer === null 
                    ? 'bg-gray-100 hover:bg-blue-100' 
                    : index === quizQuestions[currentQuestion].correctAnswer 
                      ? 'bg-green-200' 
                      : selectedAnswer === index 
                        ? 'bg-red-200' 
                        : 'bg-gray-100'}
                `}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-6 p-4 rounded-lg
                ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                  ? 'bg-green-100 border-l-4 border-green-500' 
                  : 'bg-red-100 border-l-4 border-red-500'}
              `}
            >
              <h3 className="font-bold mb-2">
                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                  ? '✅ Correct!' 
                  : '❌ Incorrect'}
              </h3>
              <p>{quizQuestions[currentQuestion].explanation}</p>
            </motion.div>
          )}

          {selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={moveToNextQuestion}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              {currentQuestion < quizQuestions.length - 1 
                ? 'Next Question' 
                : 'Finish Quiz'}
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white shadow-lg rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          {score >= 3 ? (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-700">
                🎉 Congratulations! You've passed the Smart Contracts quiz!
              </p>
            </div>
          ) : (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">
                You didn't pass this time. Review the content and try again.
              </p>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={restartQuiz}
              variant="outline"
            >
              Retry Quiz
            </Button>
            <Link href="/modules/module3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue to Module 3
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2/consensus-mechanisms">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Consensus Mechanisms
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Smart Contracts
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Smart contracts are self-executing contracts with the terms of the agreement directly 
              written into code. They are a key feature of many blockchain platforms, enabling 
              automated, trustless transactions and complex decentralised applications.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Characteristics</h2>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Autonomy</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Execute automatically without intervention</li>
                    <li>No need for intermediaries</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Decentralisation</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Exist on distributed blockchain network</li>
                    <li>No central point of control</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All parties can view the contract's code</li>
                    <li>Execution is visible to all</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Immutability</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Once deployed, code cannot be changed</li>
                    <li>Creates trust in the system</li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Use Cases</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Financial Services</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated lending and borrowing</li>
                  <li>Insurance claim processing</li>
                  <li>Decentralized finance (DeFi) applications</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">Supply Chain</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated payments upon delivery</li>
                  <li>Product tracking and verification</li>
                  <li>Supplier management</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Real Estate</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated property transfers</li>
                  <li>Rent payments and agreements</li>
                  <li>Property tokenization</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Popular Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ethereum</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>First and most popular platform</li>
                  <li>Uses Solidity programming language</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Cardano</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Academic research-based approach</li>
                  <li>Uses Haskell-based Plutus</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Polkadot</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Enables cross-chain interoperability</li>
                  <li>Multiple language support</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Binance Smart Chain</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>High performance and low cost</li>
                  <li>EVM compatible</li>
                </ul>
              </Card>
            </div>
          </motion.section>

          {isFullyRead && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the Smart Contracts section. 
                  Time to test your knowledge with a quick quiz!
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Button 
                  onClick={() => setShowQuiz(true)}
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}