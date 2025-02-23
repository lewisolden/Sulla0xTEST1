import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Wrench, Code, Award, Terminal, Check, AlertTriangle } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function ExercisesPage() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
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

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set([...Array.from(prev), step]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
        >
          Getting Started with Ethereum: Beginner's Practice Guide
        </motion.h1>

        <div className="space-y-8">
          {/* Exercise 1: Understanding MetaMask */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-purple-900/50 border-t border-blue-500/30 shadow-xl backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Exercise 1: Your First Ethereum Wallet
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Let's start with the basics! We'll learn how to set up and use MetaMask, 
                  the most popular Ethereum wallet. Think of MetaMask as your digital banking app for cryptocurrencies.
                </p>

                <div className="bg-black/30 p-6 rounded-lg space-y-4 border border-blue-500/20">
                  <h3 className="font-semibold text-blue-400">Step-by-Step Guide:</h3>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <div className="space-y-2">
                        <p className="text-blue-300"><strong>Install MetaMask:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Go to the Chrome Web Store</li>
                          <li>Search for "MetaMask"</li>
                          <li>Click "Add to Chrome"</li>
                          <li>Look for the fox icon in your browser</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="space-y-2">
                        <p className="text-blue-300"><strong>Create Your Wallet:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Click "Get Started"</li>
                          <li>Choose "Create a Wallet"</li>
                          <li>Create a strong password</li>
                          <li>Write down your Secret Recovery Phrase (Never share this!)</li>
                        </ul>
                        <div className="bg-yellow-900/30 p-4 rounded-lg mt-2 border border-yellow-500/20">
                          <AlertTriangle className="w-5 h-5 text-yellow-400 inline mr-2" />
                          <span className="text-yellow-300">
                            Important: Your Secret Recovery Phrase is like the master key to your wallet. 
                            Never share it with anyone and store it safely offline!
                          </span>
                        </div>
                      </div>
                    </li>
                  </ol>

                  <div className="mt-4">
                    <Button
                      onClick={() => markStepComplete(1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                      variant={completedSteps.has(1) ? "secondary" : "default"}
                    >
                      {completedSteps.has(1) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Completed!
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Exercise 2: Understanding Test Networks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50 border-t border-purple-500/30 shadow-xl backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Exercise 2: Playing with Test Networks
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Before we work with real Ethereum, let's practice on a test network. 
                  It's like a simulation where you can experiment without using real money!
                </p>

                <div className="bg-black/30 p-6 rounded-lg space-y-4 border border-purple-500/20">
                  <h3 className="font-semibold text-purple-400">Follow These Steps:</h3>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <div className="space-y-2">
                        <p className="text-purple-300"><strong>Switch to Sepolia Test Network:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Open MetaMask</li>
                          <li>Click the network dropdown (usually says "Ethereum Mainnet")</li>
                          <li>Select "Sepolia Test Network"</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="space-y-2">
                        <p className="text-purple-300"><strong>Get Test Ether:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Visit a Sepolia faucet (e.g., sepoliafaucet.com)</li>
                          <li>Copy your wallet address from MetaMask</li>
                          <li>Paste your address in the faucet website</li>
                          <li>Request test ETH</li>
                        </ul>
                      </div>
                    </li>
                  </ol>

                  <div className="bg-blue-900/30 p-4 rounded-lg mt-2 border border-blue-500/20">
                    <p className="text-blue-300">
                      <strong>Pro Tip:</strong> Test networks let you practice transactions 
                      and smart contract interactions without risking real money. Always experiment 
                      on test networks first!
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={() => markStepComplete(2)}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                      variant={completedSteps.has(2) ? "secondary" : "default"}
                    >
                      {completedSteps.has(2) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Completed!
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Exercise 3: Simple Smart Contract Interaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-900/50 via-teal-900/50 to-blue-900/50 border-t border-green-500/30 shadow-xl backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  Exercise 3: Your First Smart Contract Interaction
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Now let's interact with a simple smart contract! We'll use Remix IDE, 
                  a browser-based tool for writing and testing smart contracts.
                </p>

                <div className="bg-black/30 p-6 rounded-lg space-y-4 border border-green-500/20">
                  <h3 className="font-semibold text-green-400">Let's Practice:</h3>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <div className="space-y-2">
                        <p className="text-green-300"><strong>Open Remix IDE:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Go to remix.ethereum.org</li>
                          <li>Click "Create New File"</li>
                          <li>Name it "HelloWorld.sol"</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="space-y-2">
                        <p className="text-green-300"><strong>Copy this Simple Contract:</strong></p>
                        <pre className="bg-black/50 text-gray-300 p-4 rounded-md text-sm border border-gray-700">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, Ethereum!";

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}`}
                        </pre>
                        <p className="text-gray-400 mt-2">
                          This contract stores a message that anyone can read and update.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="space-y-2">
                        <p className="text-green-300"><strong>Deploy and Interact:</strong></p>
                        <ul className="list-disc pl-5 text-gray-400">
                          <li>Click the "Compile" button</li>
                          <li>Switch to the "Deploy" tab</li>
                          <li>Make sure you're connected to Sepolia Test Network</li>
                          <li>Click "Deploy"</li>
                          <li>Try reading and updating the message!</li>
                        </ul>
                      </div>
                    </li>
                  </ol>

                  <div className="bg-blue-900/30 p-4 rounded-lg mt-2 border border-blue-500/20">
                    <p className="text-blue-300">
                      <strong>Understanding:</strong> This simple contract demonstrates the basics 
                      of smart contracts - they can store data (the message) and have functions 
                      to change that data (updateMessage). Every interaction with the contract is 
                      recorded on the blockchain!
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={() => markStepComplete(3)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      variant={completedSteps.has(3) ? "secondary" : "default"}
                    >
                      {completedSteps.has(3) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Completed!
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {isFullyRead && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20 p-6 shadow-xl">
                <div className="flex flex-col items-center">
                  <p className="text-green-400 mb-4 font-semibold text-lg">
                    🎉 Congratulations! You've completed the basic Ethereum exercises!
                  </p>
                  <p className="text-green-300">
                    You now understand the basics of:
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Setting up a wallet</li>
                      <li>Using test networks</li>
                      <li>Interacting with smart contracts</li>
                    </ul>
                  </p>
                </div>
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
    </div>
  );
}