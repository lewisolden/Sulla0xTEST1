import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import EthereumFundamentalsQuiz from "@/components/quizzes/EthereumFundamentalsQuiz";
import { useScrollTop } from "@/hooks/useScrollTop";
import PosVsPowDiagram from "@/components/diagrams/PosVsPowDiagram";
import BitcoinEthereumComparison from "@/components/diagrams/BitcoinEthereumComparison";
import EVMWorkflow from "@/components/diagrams/EVMWorkflow";

const EthereumLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <path
      d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
      fill="#343434"
    />
  </svg>
);

const EthereumFundamentalsSection = () => {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();
  const [showQuizSection, setShowQuizSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95 && !isFullyRead) {
        setIsFullyRead(true);
        setShowQuizSection(true);
        updateProgress(
          3,
          'ethereum-fundamentals',
          false,
          3,
          undefined,
          0,
          '/modules/module3/ethereum-fundamentals',
          undefined,
          'Ethereum Fundamentals'
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress, isFullyRead]);

  const handleQuizComplete = () => {
    // Quiz completion is now handled by the quiz component itself
    // Here we just ensure proper navigation flow continues
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen"
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 border-b border-gray-600">
            <div className="flex items-center mb-2">
              <EthereumLogo />
              <div>
                <h1 className="text-4xl font-bold text-gray-100">
                  Ethereum Fundamentals
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                  A Deep Dive into the World's Most Popular Smart Contract Platform
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-lg mt-4 ml-16 pl-2">
              Understanding the revolutionary smart contract platform that powers the future of decentralized applications
            </p>
          </div>
        </motion.div>

        <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div className="p-6 prose max-w-none text-gray-200">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">What Makes Ethereum Different?</h2>

              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
                <p className="text-gray-300">
                  <strong className="text-blue-400">🎯 Think of it this way:</strong> If Bitcoin is like digital gold that you can send 
                  and receive, Ethereum is like a global computer that can run programs (called smart contracts) 
                  and store data. It's not just for sending money - it's for building entire applications that 
                  run on the blockchain!
                </p>
              </div>

              <p className="text-gray-300 mb-4">
                Unlike Bitcoin's focus on being digital money, Ethereum gives you the power to:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
                <li>Create and run applications that can't be shut down</li>
                <li>Build financial services without banks</li>
                <li>Make digital art and collectibles (NFTs)</li>
                <li>Form online organizations (DAOs) that run by code</li>
              </ul>

              <div className="my-8 p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl border border-gray-600">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Bitcoin vs Ethereum: A Simple Comparison</h3>
                <BitcoinEthereumComparison />
                <p className="text-sm text-gray-400 mt-4">
                  <strong className="text-blue-400">💡 Key Difference:</strong> Bitcoin focuses on doing one thing well (being digital money), 
                  while Ethereum can do many things because it's programmable!
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">📱 dApps (Decentralized Apps)</h4>
                  <p className="text-sm">Just like the apps on your phone, but they run on Ethereum instead of 
                  Apple or Google's servers. This means they're always available and can't be shut down!</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">📝 Smart Contracts</h4>
                  <p className="text-sm">These are like digital vending machines - they automatically run when 
                  you interact with them. No person needs to approve or process your request!</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">🎨 Digital Assets</h4>
                  <p className="text-sm">Create your own tokens, digital art, or virtual items that can be 
                  bought, sold, and collected.</p>
                </motion.div>
              </motion.div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">The Ethereum Virtual Machine (EVM)</h2>

              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
                <p className="text-gray-300">
                  <strong className="text-blue-400">🤔 Think of the EVM as:</strong> A giant, global computer that everyone can use. 
                  It's like having a computer that:
                  <ul className="list-disc pl-6 mt-2 text-gray-300">
                    <li>Never turns off</li>
                    <li>Can't be hacked or changed</li>
                    <li>Runs exactly the same for everyone</li>
                    <li>Keeps perfect track of everything it does</li>
                  </ul>
                </p>
              </div>

              <div className="my-8 p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl border border-gray-600">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">How the EVM Works</h3>
                <EVMWorkflow />
                <p className="text-sm text-gray-400 mt-4">
                  <strong className="text-blue-400">💡 Important:</strong> Every action on Ethereum costs a small fee called "gas". 
                  This is like paying for computer processing time!
                </p>
              </div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">🖥️ How It Runs Programs</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Every computer in the network runs the same code</li>
                    <li>Results are verified by everyone</li>
                    <li>Can't be tampered with or cheated</li>
                    <li>Keeps track of all changes</li>
                    <li>Runs 24/7 without stopping</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">⛽ Understanding Gas</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Gas is like fuel for Ethereum operations</li>
                    <li>More complex actions cost more gas</li>
                    <li>Prevents spam and infinite loops</li>
                    <li>Price changes based on network usage</li>
                    <li>You can choose how fast you want your transaction to process</li>
                  </ul>
                </motion.div>
              </motion.div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Understanding Proof of Stake (PoS)</h2>

              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
                <p className="text-gray-300">
                  <strong className="text-blue-400">🎯 Think of Proof of Stake like this:</strong> Instead of using powerful computers to solve puzzles (like in Bitcoin's Proof of Work), 
                  Ethereum now uses a system where people put their ETH as a security deposit to help verify transactions. It's like putting down a deposit 
                  when you rent an apartment - if you damage the place, you lose your deposit!
                </p>
              </div>

              <div className="my-8 p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl border border-gray-600">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Proof of Work vs Proof of Stake: A Simple Comparison</h3>
                <PosVsPowDiagram />
                <p className="text-sm text-gray-400 mt-4">
                  <strong className="text-blue-400">💡 Key Difference:</strong> While Proof of Work uses massive computing power and electricity, 
                  Proof of Stake uses financial stakes to keep the network secure and running.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">🌱 How PoS Works</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>You need 32 ETH to become a validator</li>
                    <li>Validators are chosen to create new blocks</li>
                    <li>Good behavior earns rewards</li>
                    <li>Bad behavior loses your stake</li>
                    <li>No special hardware needed</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-200 border border-gray-600"
                >
                  <h4 className="font-semibold text-blue-400 mb-3">🌍 Benefits for Everyone</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Uses 99.95% less energy than PoW</li>
                    <li>Faster transaction processing</li>
                    <li>Lower fees possible</li>
                    <li>More people can participate</li>
                    <li>Better for the environment</li>
                  </ul>
                </motion.div>
              </motion.div>

              <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
                <h4 className="font-semibold text-blue-400 mb-2">🤔 What if I don't have 32 ETH?</h4>
                <p className="text-gray-300">
                  Don't worry! You can join a staking pool where you combine your ETH with others. 
                  It's like a group of friends pooling money together to buy something expensive - 
                  everyone contributes what they can and shares the rewards!
                </p>
              </div>
            </motion.section>
          </div>
        </Card>

        {showQuizSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 border border-gray-700">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Test Your Knowledge
                </h2>
                <p className="text-gray-300 mb-6">
                  Let's verify your understanding of Ethereum fundamentals with a quick quiz.
                </p>
              </div>
              <EthereumFundamentalsQuiz onComplete={handleQuizComplete} />
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3",
            label: "Module Overview"
          }}
          next={{
            path: "/modules/module3/smart-contracts",
            label: "Smart Contract Development"
          }}
        />
      </div>
    </motion.div>
  );
};

export default EthereumFundamentalsSection;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};