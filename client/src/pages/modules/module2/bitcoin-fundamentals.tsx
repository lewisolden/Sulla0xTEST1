import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, BookOpen, Network } from "lucide-react";
import BitcoinBasicsDiagram from "@/components/diagrams/BitcoinBasicsDiagram";
import BitcoinFundamentalsQuiz from "@/components/modules/quizzes/BitcoinFundamentalsQuiz";
import ProofOfWorkDiagram from "@/components/diagrams/ProofOfWorkDiagram";
import { UTXOExercise } from "@/components/exercises/UTXOExercise";

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

export default function BitcoinFundamentalsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'bitcoin-fundamentals', true, 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

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
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <div className="flex items-center mb-6">
          <BitcoinLogo />
          <motion.h1
            className="text-4xl font-bold text-blue-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            2.1 Bitcoin Fundamentals
          </motion.h1>
        </div>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <BitcoinBasicsDiagram />
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Core Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">What is Bitcoin?</h3>
                </div>
                <p className="text-gray-700">
                  Bitcoin is a decentralized digital currency that enables instant payments to anyone, anywhere in the world.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Network className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">How it Works</h3>
                </div>
                <p className="text-gray-700">
                  Bitcoin transactions are verified by network nodes through cryptography and recorded on a public ledger called a blockchain.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Technical Concepts Explained</h2>
            <div className="grid grid-cols-1 gap-6 mt-4">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Blockchain Technology</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">Think of a blockchain as a digital ledger that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Records all Bitcoin transactions in blocks, like pages in a book</li>
                    <li>Each block links to the previous one, forming an unbreakable chain</li>
                    <li>Once information is recorded, it cannot be changed without changing all subsequent blocks</li>
                    <li>Every participant has a copy of the entire history</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">The Bitcoin Network</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">The Bitcoin network is a peer-to-peer system where:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Thousands of computers (nodes) work together without central control</li>
                    <li>Each node validates and relays transactions to others</li>
                    <li>Anyone can join or leave the network at any time</li>
                    <li>The network reaches consensus on the state of all Bitcoin transactions</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Bitcoin Mining</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">Mining is the process that:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Secures the network through complex mathematical computations</li>
                    <li>Creates new bitcoins as a reward for miners</li>
                    <li>Processes and verifies transactions</li>
                    <li>Requires significant computing power and electricity</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Historical Milestones</h2>
            <div className="relative mt-8">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>

              {/* Timeline events */}
              <div className="space-y-12">
                <motion.div
                  className="relative flex items-center justify-start md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:pr-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">October 31, 2008</h3>
                        <p className="text-gray-700">Bitcoin whitepaper published by Satoshi Nakamoto</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div
                  className="relative flex items-center justify-end md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:ml-auto md:pl-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">January 3, 2009</h3>
                        <p className="text-gray-700">Genesis Block mined with a message about bank bailouts</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div
                  className="relative flex items-center justify-start md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:pr-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">January 12, 2009</h3>
                        <p className="text-gray-700">First Bitcoin transaction between Satoshi and Hal Finney</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>

                <motion.div
                  className="relative flex items-center justify-end md:justify-between"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex md:w-1/2 md:ml-auto md:pl-8 items-center">
                    <div className="w-full">
                      <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800">May 22, 2010</h3>
                        <p className="text-gray-700">First real-world transaction: 10,000 BTC for two pizzas</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">The Birth of Bitcoin</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Historical Context and Significance</h3>
            <p>
              The 2008 financial crisis revealed fundamental problems in our financial system. During this turbulent time:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Banks were failing</li>
              <li>Governments were implementing massive bailouts</li>
              <li>Public trust in financial institutions was eroding</li>
              <li>The need for financial innovation became clear</li>
            </ul>
            <p>This environment gave birth to Bitcoin, introduced through a whitepaper by the mysterious Satoshi Nakamoto.</p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">How Bitcoin Works</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Simple Explanation</h3>
              <p>Think of Bitcoin as a digital ledger that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Records all transactions</li>
                <li>Is maintained by thousands of computers</li>
                <li>Cannot be changed once written</li>
                <li>Is visible to everyone</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Understanding Proof of Work</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">What is Proof of Work?</h3>
                <p className="text-gray-700 mb-4">
                  Think of Proof of Work like a complex puzzle competition where:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                  <li>Many computers (miners) compete to solve a mathematical puzzle</li>
                  <li>The first one to solve it gets to add a new block to the blockchain</li>
                  <li>The winner receives newly created bitcoins as a reward</li>
                  <li>The puzzle is hard to solve but easy to verify - like a Sudoku puzzle</li>
                </ul>

                <h4 className="text-xl font-semibold text-blue-600 mb-3">Why is it Important?</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Makes it expensive and difficult to cheat the system</li>
                  <li>Ensures all computers on the network agree on the transaction history</li>
                  <li>Provides a fair way to distribute new bitcoins</li>
                  <li>Secures the network through computational work</li>
                </ul>
              </div>

              <ProofOfWorkDiagram />

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">How it Works in Simple Terms</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">1. The Race Begins</h4>
                    <p className="text-gray-700">
                      Miners gather new transactions and compete to be the first to find a special number
                      that makes their block of transactions valid.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">2. The Mining Process</h4>
                    <p className="text-gray-700">
                      Miners' computers try millions of random numbers per second until one finds the
                      correct solution - like trying combinations on a lock.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">3. Winner Takes All</h4>
                    <p className="text-gray-700">
                      The first miner to find the solution gets to add their block to the blockchain
                      and receives newly created bitcoins as a reward.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Why does it use so much energy?</h4>
                    <p className="text-gray-700">
                      The high energy use is actually a feature, not a bug. It makes it extremely expensive
                      to attack the network, ensuring its security through real-world costs.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Can anyone be a miner?</h4>
                    <p className="text-gray-700">
                      Yes, but today most mining is done by specialized computers in large facilities.
                      Individual miners often join mining pools to share resources and rewards.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">What happens if two miners solve it at once?</h4>
                    <p className="text-gray-700">
                      The network will temporarily split but quickly resolves to the longest chain of blocks.
                      This is why exchanges often wait for multiple confirmations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Understanding Bitcoin Transactions</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">How Bitcoin Transactions Work</h3>

                {/* Simple Introduction */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">The Basics: Think of it Like Cash</h4>
                  <p className="text-gray-700">
                    Imagine you have a $20 bill and want to buy something that costs $8. What happens?
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                    <li>You give the $20 bill (you can't tear it in half!)</li>
                    <li>You get $12 back as change</li>
                    <li>The original $20 bill can't be used again by you</li>
                    <li>You now have a new $12 bill instead</li>
                  </ul>
                  <p className="mt-4 text-gray-700">
                    Bitcoin works very similarly! This is what we call the "UTXO model" - but don't worry about the fancy name yet.
                  </p>
                </div>

                {/* UTXO Explanation */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-800 mb-2">Bitcoin's Digital Wallet: UTXOs Explained</h4>
                  <p className="text-gray-700">
                    Your Bitcoin wallet doesn't actually store a single "balance" number. Instead, it's like having different bills in your physical wallet:
                  </p>
                  <div className="my-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">Example of Your Digital Wallet:</p>
                    <ul className="list-none pl-5 mt-2 space-y-2">
                      <li className="flex items-center">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        One "digital bill" worth 0.5 BTC
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        Another worth 0.3 BTC
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        And one worth 0.1 BTC
                      </li>
                      <li className="font-medium mt-2">Total Balance: 0.9 BTC</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    Each of these "digital bills" is called an Unspent Transaction Output (UTXO).
                  </p>
                </div>

                {/* Real World Example */}
                <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Let's Make a Purchase!</h4>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p className="text-gray-700 mb-2">
                      You want to send 0.6 BTC to your friend. Here's what happens:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>You need to use your 0.5 BTC and 0.3 BTC UTXOs (total 0.8 BTC)</li>
                      <li>Your friend gets their 0.6 BTC</li>
                      <li>You get 0.19 BTC back as change (after a 0.01 BTC transaction fee)</li>
                      <li>Your old 0.5 and 0.3 BTC UTXOs are now "spent" - like used up bills</li>
                      <li>You now have a new 0.19 BTC UTXO (plus your unused 0.1 BTC UTXO)</li>
                    </ol>
                  </div>
                </div>

                {/* Key Points */}
                <div className="bg-purple-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Remember These Simple Rules:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>You must use entire "digital bills" (UTXOs) - no tearing them in half!</li>
                    <li>If you spend more than needed, you get change back as a new UTXO</li>
                    <li>Once you spend a UTXO, it's gone (like spending a dollar bill)</li>
                    <li>Your wallet's balance is just the sum of all your unspent UTXOs</li>
                  </ul>
                </div>

                {/* Advanced Details (Optional) */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">Want to Learn More? (Optional)</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      Behind the scenes, each UTXO contains:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      <li>A unique identifier (like a serial number on a bill)</li>
                      <li>The amount it's worth</li>
                      <li>A digital lock that only you can unlock with your wallet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive UTXO Exercise */}
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 mb-12"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Interactive UTXO Exercise</h3>
              <p className="text-gray-700 mb-6">
                Now that you understand how UTXOs work, let's practice with an interactive exercise. 
                Try to complete transactions by selecting the right combination of UTXOs!
              </p>
              <UTXOExercise />
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
                  🎉 Congratulations! You've completed the Bitcoin Fundamentals section.
                </p>
              </Card>

              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                </Button>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                  <Link href="/modules/module2">
                    <Button variant="outline" className="w-full md:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                    </Button>
                  </Link>

                  <Link href="/modules/module2/bitcoin-investment">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                      Next: Bitcoin as an Investment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                  <BitcoinFundamentalsQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};