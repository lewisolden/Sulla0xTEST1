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
    setCompletedSteps(prev => new Set([...prev, step]));
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
          Getting Started with Ethereum: Beginner's Practice Guide
        </motion.h1>

        <div className="space-y-8">
          {/* Exercise 1: Understanding MetaMask */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Exercise 1: Your First Ethereum Wallet</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Let's start with the basics! We'll learn how to set up and use MetaMask, 
                the most popular Ethereum wallet. Think of MetaMask as your digital banking app for cryptocurrencies.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-blue-800">Step-by-Step Guide:</h3>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <div className="space-y-2">
                      <p><strong>Install MetaMask:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Go to the Chrome Web Store</li>
                        <li>Search for "MetaMask"</li>
                        <li>Click "Add to Chrome"</li>
                        <li>Look for the fox icon in your browser</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-2">
                      <p><strong>Create Your Wallet:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Click "Get Started"</li>
                        <li>Choose "Create a Wallet"</li>
                        <li>Create a strong password</li>
                        <li>Write down your Secret Recovery Phrase (Never share this!)</li>
                      </ul>
                      <div className="bg-yellow-100 p-4 rounded-lg mt-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 inline mr-2" />
                        <span className="text-yellow-700">
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
                    className="flex items-center gap-2"
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

          {/* Exercise 2: Understanding Test Networks */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-purple-700">Exercise 2: Playing with Test Networks</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Before we work with real Ethereum, let's practice on a test network. 
                It's like a simulation where you can experiment without using real money!
              </p>

              <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-purple-800">Follow These Steps:</h3>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <div className="space-y-2">
                      <p><strong>Switch to Sepolia Test Network:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Open MetaMask</li>
                        <li>Click the network dropdown (usually says "Ethereum Mainnet")</li>
                        <li>Select "Sepolia Test Network"</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-2">
                      <p><strong>Get Test Ether:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Visit a Sepolia faucet (e.g., sepoliafaucet.com)</li>
                        <li>Copy your wallet address from MetaMask</li>
                        <li>Paste your address in the faucet website</li>
                        <li>Request test ETH</li>
                      </ul>
                    </div>
                  </li>
                </ol>

                <div className="bg-blue-100 p-4 rounded-lg mt-2">
                  <p className="text-blue-700">
                    <strong>Pro Tip:</strong> Test networks let you practice transactions 
                    and smart contract interactions without risking real money. Always experiment 
                    on test networks first!
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => markStepComplete(2)}
                    className="flex items-center gap-2"
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

          {/* Exercise 3: Simple Smart Contract Interaction */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-green-700">Exercise 3: Your First Smart Contract Interaction</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Now let's interact with a simple smart contract! We'll use Remix IDE, 
                a browser-based tool for writing and testing smart contracts.
              </p>

              <div className="bg-green-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-green-800">Let's Practice:</h3>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <div className="space-y-2">
                      <p><strong>Open Remix IDE:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Go to remix.ethereum.org</li>
                        <li>Click "Create New File"</li>
                        <li>Name it "HelloWorld.sol"</li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-2">
                      <p><strong>Copy this Simple Contract:</strong></p>
                      <pre className="bg-gray-800 text-white p-4 rounded-md text-sm">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, Ethereum!";

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}`}
                      </pre>
                      <p className="text-gray-600 mt-2">
                        This contract stores a message that anyone can read and update.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-2">
                      <p><strong>Deploy and Interact:</strong></p>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Click the "Compile" button</li>
                        <li>Switch to the "Deploy" tab</li>
                        <li>Make sure you're connected to Sepolia Test Network</li>
                        <li>Click "Deploy"</li>
                        <li>Try reading and updating the message!</li>
                      </ul>
                    </div>
                  </li>
                </ol>

                <div className="bg-blue-100 p-4 rounded-lg mt-2">
                  <p className="text-blue-700">
                    <strong>Understanding:</strong> This simple contract demonstrates the basics 
                    of smart contracts - they can store data (the message) and have functions 
                    to change that data (updateMessage). Every interaction with the contract is 
                    recorded on the blockchain!
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => markStepComplete(3)}
                    className="flex items-center gap-2"
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

          {isFullyRead && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <div className="flex flex-col items-center">
                  <p className="text-green-700 mb-4">
                    🎉 Congratulations! You've completed the basic Ethereum exercises!
                  </p>
                  <p className="text-green-600">
                    You now understand the basics of:
                    <ul className="list-disc pl-5 mt-2">
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