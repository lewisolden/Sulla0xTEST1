import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Wrench, Code, Award, Terminal } from "lucide-react";
import Mermaid from "mermaid";
import { useScrollTop } from "@/hooks/useScrollTop";

// Initialize mermaid
Mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
});

export default function ExercisesPage() {
  useScrollTop();
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
        updateProgress(3, 'exercises', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contractLifecycleDiagram = `
    graph TD
      A[Write Contract] -->|Compile| B[Bytecode]
      B --> C[Deploy]
      C --> D[Contract Address]
      D --> E[Interact]
      E -->|Read| F[View Functions]
      E -->|Write| G[State Changes]
      G --> H[Emit Events]
  `;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          Module 3: Practical Exercises
        </motion.h1>

        <div className="space-y-8">
          {/* Exercise 1: Wallet Setup */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Exercise 1: Ethereum Wallet Setup and Security</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">Set up and configure your Ethereum development environment:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-2">Wallet Setup</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Install MetaMask extension</li>
                        <li>Create a new wallet</li>
                        <li>Securely store recovery phrase</li>
                        <li>Configure security settings</li>
                      </ul>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-2">Network Configuration</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Connect to Ethereum testnet</li>
                        <li>Request test ETH from faucet</li>
                        <li>Configure gas settings</li>
                        <li>Verify network connection</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Exercise 2: Smart Contract Development */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Exercise 2: Smart Contract Development</h2>
              </div>
              <div className="space-y-6">
                <p className="text-gray-700">
                  Learn to write and deploy smart contracts using Remix IDE. We'll walk through each step
                  of the development process with interactive examples.
                </p>

                {/* Contract Lifecycle Diagram */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Smart Contract Lifecycle</h3>
                  <div className="mermaid">
                    {contractLifecycleDiagram}
                  </div>
                </div>

                {/* Interactive Contract Code */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Storage Contract</h3>

                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="space-y-4">
                        {/* Contract Setup */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 mb-2">1. Contract Setup</h4>
                          <pre className="text-sm bg-gray-900 text-white p-4 rounded-md">
                            <code>
                              {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;`}
                            </code>
                          </pre>
                          <p className="text-sm text-gray-600 mt-2">
                            Every Solidity contract starts with a license identifier and version pragma.
                          </p>
                        </div>

                        {/* State Variables */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 mb-2">2. State Variables</h4>
                          <pre className="text-sm bg-gray-900 text-white p-4 rounded-md">
                            <code>
                              {`contract BasicStorage {
    uint256 private value;
    event ValueChanged(uint256 newValue);`}
                            </code>
                          </pre>
                          <p className="text-sm text-gray-600 mt-2">
                            State variables persist in contract storage. Events allow logging to the blockchain.
                          </p>
                        </div>

                        {/* Contract Functions */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 mb-2">3. Contract Functions</h4>
                          <pre className="text-sm bg-gray-900 text-white p-4 rounded-md">
                            <code>
                              {`    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }`}
                            </code>
                          </pre>
                          <p className="text-sm text-gray-600 mt-2">
                            Functions can modify state (setValue) or view state without modification (getValue).
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Development Steps</h3>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <ol className="list-decimal pl-5 space-y-4">
                        <motion.li
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <h4 className="font-semibold">Set up Remix IDE</h4>
                          <p className="text-sm text-gray-600">
                            Access the web interface at remix.ethereum.org and create a new file.
                          </p>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <h4 className="font-semibold">Write and Compile</h4>
                          <p className="text-sm text-gray-600">
                            Write your contract and compile using the Solidity compiler.
                          </p>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <h4 className="font-semibold">Deploy Contract</h4>
                          <p className="text-sm text-gray-600">
                            Deploy to a test network using MetaMask and test ETH.
                          </p>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          className="cursor-pointer"
                        >
                          <h4 className="font-semibold">Interact and Test</h4>
                          <p className="text-sm text-gray-600">
                            Use Remix's interface to call functions and monitor events.
                          </p>
                        </motion.li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Project: DeFi Application */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Project: Build a DeFi Application</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">Create a decentralized application with the following features:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Implementation Tasks</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Token smart contract</li>
                    <li>Web3 integration</li>
                    <li>Wallet connectivity</li>
                    <li>Transaction handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Considerations</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Input validation</li>
                    <li>Access control</li>
                    <li>Gas optimization</li>
                    <li>Error handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Assessment */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Assessment</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Evaluation Criteria</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Code quality and organization</li>
                    <li>Security best practices</li>
                    <li>Documentation completeness</li>
                    <li>Test coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Deliverables</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Working DeFi application</li>
                    <li>Source code repository</li>
                    <li>Technical documentation</li>
                    <li>Test suite results</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Module 3 Practical Exercises section!
              </p>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3/security-risks",
            label: "Security and Risk Management"
          }}
          next={{
            path: "/modules/module3/quiz",
            label: "Module Quiz"
          }}
        />
      </div>
    </div>
  );
}