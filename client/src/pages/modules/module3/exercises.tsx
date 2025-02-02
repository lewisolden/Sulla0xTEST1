import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Wrench, Code, BookOpen, Award, Terminal } from "lucide-react";

export default function ExercisesPage() {
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
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Exercise 1: Ethereum Wallet Setup and Security</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">Set up and configure your Ethereum development environment:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Wallet Setup</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Install MetaMask extension</li>
                    <li>Create a new wallet</li>
                    <li>Securely store recovery phrase</li>
                    <li>Configure security settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Network Configuration</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Connect to Ethereum testnet</li>
                    <li>Request test ETH from faucet</li>
                    <li>Configure gas settings</li>
                    <li>Verify network connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Exercise 2: Smart Contract Development */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Exercise 2: Smart Contract Development</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">Learn to write and deploy smart contracts using Remix IDE:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Basic Contract</h4>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Let's understand each part of this basic smart contract:
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      {/* License and Version */}
                      <div>
                        <h5 className="text-sm font-semibold text-blue-600 mb-2">1. Contract Setup</h5>
                        <pre className="text-sm overflow-x-auto mb-2">
                          <code className="language-solidity">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;`}
                          </code>
                        </pre>
                        <p className="text-sm text-gray-600">
                          The license identifier is required for all Solidity contracts.
                          The pragma specifies which version of Solidity to use.
                        </p>
                      </div>

                      {/* Contract Declaration */}
                      <div>
                        <h5 className="text-sm font-semibold text-blue-600 mb-2">2. State Variable</h5>
                        <pre className="text-sm overflow-x-auto mb-2">
                          <code className="language-solidity">
{`contract BasicStorage {
    uint256 private value;`}
                          </code>
                        </pre>
                        <p className="text-sm text-gray-600">
                          We declare a private state variable that will store our value.
                          The uint256 type can store numbers from 0 up to 2^256 - 1.
                        </p>
                      </div>

                      {/* Event Declaration */}
                      <div>
                        <h5 className="text-sm font-semibold text-blue-600 mb-2">3. Event Definition</h5>
                        <pre className="text-sm overflow-x-auto mb-2">
                          <code className="language-solidity">
{`    event ValueChanged(uint256 newValue);`}
                          </code>
                        </pre>
                        <p className="text-sm text-gray-600">
                          Events allow us to log changes to the blockchain. 
                          Applications can listen for this event to know when the value changes.
                        </p>
                      </div>

                      {/* Functions */}
                      <div>
                        <h5 className="text-sm font-semibold text-blue-600 mb-2">4. Contract Functions</h5>
                        <pre className="text-sm overflow-x-auto mb-2">
                          <code className="language-solidity">
{`    function setValue(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }`}
                          </code>
                        </pre>
                        <p className="text-sm text-gray-600">
                          - setValue: A public function that updates the stored value and emits an event<br/>
                          - getValue: A view function that returns the current value without modifying state
                        </p>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h5 className="text-sm font-semibold text-blue-600 mb-2">Key Learning Points:</h5>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                          <li>Understanding state variables and visibility</li>
                          <li>Working with events for logging</li>
                          <li>Difference between view and state-modifying functions</li>
                          <li>Basic error handling and gas considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Development Steps</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Set up Remix IDE environment</li>
                    <li>Write and compile the contract</li>
                    <li>Deploy to testnet</li>
                    <li>Interact with contract functions</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

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