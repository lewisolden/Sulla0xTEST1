import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlockchainTypesDiagram } from "@/components/diagrams/BlockchainTypesDiagram";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import BlockchainTypesQuiz from "@/components/quizzes/BlockchainTypesQuiz";

const BlockchainTypesSection = () => {
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
        updateProgress(3, 'blockchain-types', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.2 Different Types of Blockchains
        </motion.h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700">Introduction</h2>
              <p className="text-gray-700">
                Blockchains can be categorised into different types based on their accessibility, level of decentralisation, 
                and purpose. The three main types are public, private, and consortium blockchains. Each type has its own 
                characteristics, advantages, and use cases.
              </p>

              <BlockchainTypesDiagram />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">1. Public Blockchains</h2>

                <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
                <p className="text-gray-700">
                  Open, decentralised networks where anyone can participate without permission.
                </p>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <li>Fully decentralised</li>
                  <li>Transparent</li>
                  <li>Anonymity or pseudonymity for users</li>
                  <li>Incentivized participation (usually through cryptocurrency rewards)</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <li>Bitcoin</li>
                  <li>Ethereum</li>
                  <li>Litecoin</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">2. Private Blockchains</h2>

                <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
                <p className="text-gray-700">
                  Permissioned networks operated by a single organisation, controlling who can participate.
                </p>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <li>Centralised control</li>
                  <li>Limited access</li>
                  <li>Higher degree of privacy</li>
                  <li>Faster transactions and lower costs</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <li>Hyperledger Fabric</li>
                  <li>Corda</li>
                  <li>Quorum</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">3. Consortium Blockchains</h2>

                <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
                <p className="text-gray-700">
                  Partially decentralised systems where a group of organisations govern the network.
                </p>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <li>Permissioned network</li>
                  <li>Shared control among multiple organisations</li>
                  <li>Balance between public and private blockchains</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <li>Energy Web Chain</li>
                  <li>IBM Food Trust</li>
                  <li>R3 Corda (when used by a consortium)</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">Comparison of Blockchain Types</h2>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { aspect: "Decentralisation", values: ["Public: Highest", "Consortium: Medium", "Private: Lowest"] },
                    { aspect: "Speed and Efficiency", values: ["Public: Lowest", "Consortium: Medium", "Private: Highest"] },
                    { aspect: "Transparency", values: ["Public: Highest", "Consortium: Medium", "Private: Lowest"] }
                  ].map((item, index) => (
                    <motion.div
                      key={item.aspect}
                      className="bg-blue-50 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6 + index * 0.2 }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2">{item.aspect}</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {item.values.map((value, i) => (
                          <li key={i}>{value}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.section>
          </CardContent>
        </Card>

        <ModuleNavigation
          prev={{
            path: "/modules/module3/scalability-interoperability",
            label: "Scalability & Interoperability"
          }}
          next={{
            path: "/modules/module3/development-platforms",
            label: "Development Platforms"
          }}
        />

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Different Types of Blockchains section!
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

              <ModuleNavigation
                prev={{
                  path: "/modules/module3/scalability-interoperability",
                  label: "Scalability & Interoperability"
                }}
                next={{
                  path: "/modules/module3/development-platforms",
                  label: "Development Platforms"
                }}
              />
            </div>

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                <BlockchainTypesQuiz />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BlockchainTypesSection;