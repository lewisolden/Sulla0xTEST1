import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";

const EthereumFundamentalsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'ethereum-fundamentals', true);
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
          3.1 Ethereum Fundamentals
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">What Makes Ethereum Different?</h2>
              <p className="text-gray-700 mb-4">
                Unlike Bitcoin's primary focus on monetary transactions, Ethereum represents a fundamental 
                shift in blockchain technology. It serves as a global, decentralized computing platform 
                that can run applications and handle complex financial interactions.
              </p>

              <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-4">Programmable Blockchain Platform</h3>
              <p className="text-gray-700 mb-4">
                Ethereum's key innovation lies in its programmability. While Bitcoin excels at being digital 
                money, Ethereum acts as a complete computational platform:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-700 mb-3">Key Features:</h4>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Decentralized Applications (dApps):</strong> Applications that run on the 
                    blockchain rather than centralized servers, ensuring continuous operation as long 
                    as the Ethereum network exists.
                  </li>
                  <li>
                    <strong>Smart Contract Capabilities:</strong> Self-executing programs that 
                    automatically enforce agreements, enabling automated loan processing, instant 
                    trade settlement, and more.
                  </li>
                  <li>
                    <strong>Digital Asset Creation:</strong> The ability to create various types of 
                    digital assets, including fungible tokens (ERC-20), non-fungible tokens (NFTs), 
                    and synthetic assets.
                  </li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">The Ethereum Virtual Machine (EVM)</h2>
              <p className="text-gray-700 mb-4">
                The Ethereum Virtual Machine is the engine that powers all Ethereum operations. Think of it 
                as a global computer that provides:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-700 mb-3">Execution Environment</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Consistent execution across all nodes</li>
                    <li>Deterministic operation</li>
                    <li>Secure code isolation</li>
                    <li>Resource management</li>
                    <li>State maintenance</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-700 mb-3">Gas System</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Operation-specific gas costs</li>
                    <li>Dynamic pricing based on demand</li>
                    <li>Spam prevention mechanism</li>
                    <li>Fair resource allocation</li>
                    <li>Optimization opportunities</li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>
        </Card>

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

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Ethereum Fundamentals section!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EthereumFundamentalsSection;
