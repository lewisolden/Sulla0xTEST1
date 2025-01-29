import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlatformsDiagram } from "@/components/diagrams/PlatformsDiagram";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import DevelopmentPlatformsQuiz from "@/components/quizzes/DevelopmentPlatformsQuiz";

const DevelopmentPlatformsSection = () => {
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
        updateProgress(3, 'development-platforms', true);
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
          3.3 Blockchain Development Platforms
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
                Blockchain development platforms provide the necessary tools and infrastructure for creating 
                decentralised applications (DApps) and smart contracts. These platforms vary in their features, 
                performance, and ecosystem support.
              </p>

              <PlatformsDiagram />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">1. Ethereum</h2>

                <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <li>Launched in 2015 by Vitalik Buterin</li>
                  <li>First blockchain platform to introduce smart contracts</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <li>Turing-complete programming language (Solidity)</li>
                  <li>Large and active developer community</li>
                  <li>Extensive ecosystem of tools and resources</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">2. Solana</h2>

                <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <li>Launched in 2020</li>
                  <li>Focuses on high performance and low transaction costs</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <li>Proof of History (PoH) consensus mechanism</li>
                  <li>Capable of processing up to 65,000 transactions per second</li>
                  <li>Low transaction fees</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">3. Cardano</h2>

                <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <li>Launched in 2017 by Charles Hoskinson</li>
                  <li>Emphasises academic research and peer-reviewed development</li>
                </motion.ul>

                <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
                <motion.ul 
                  className="list-disc pl-5 text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <li>Proof of Stake consensus (Ouroboros)</li>
                  <li>Layered architecture separating computation from settlement</li>
                  <li>Focus on sustainability and scalability</li>
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 }}
              >
                <h2 className="text-2xl font-bold text-blue-700 mt-8">Platform Comparison</h2>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { aspect: "Speed", values: ["Solana: Highest", "Cardano: Medium", "Ethereum: Lowest"] },
                    { aspect: "Ecosystem", values: ["Ethereum: Largest", "Solana: Growing", "Cardano: Developing"] },
                    { aspect: "Development", values: ["Ethereum: Most Mature", "Solana: Fast Growing", "Cardano: Research-Driven"] }
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

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Blockchain Development Platforms section!
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
                  path: "/modules/module3/blockchain-types",
                  label: "Types of Blockchains"
                }}
                next={{
                  path: "/modules/module3/quiz",
                  label: "Module Quiz"
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
                <DevelopmentPlatformsQuiz />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DevelopmentPlatformsSection;