import React from 'react';
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import Footer from "@/components/layout/footer";
import Module2Routes from './Module2Routes';

const Module2 = () => {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / 4) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Module 2: What is a Blockchain?
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {Math.round(progressPercentage)}%
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Introduction</h2>
          <div className="prose lg:prose-xl text-gray-700">
            <p className="mb-4">
              This module introduces students to the fundamental concept of blockchain technology, 
              which underlies cryptocurrencies and has potential applications across various industries. 
              Blockchain represents a revolutionary approach to storing and validating data in a 
              decentralized and secure manner.
            </p>
            <p className="mb-4">
              Students will learn about the basic structure of a blockchain, understanding how it 
              functions as a distributed ledger that records transactions across many computers. 
              The module explores the key features that make blockchain unique, such as its 
              immutability, transparency, and resistance to tampering.
            </p>
            <p className="mb-4">
              The course will cover how blocks are created, validated, and linked together to form 
              the chain, emphasizing the role of cryptography in ensuring the security and integrity 
              of the data. You'll also gain insights into the consensus mechanisms that allow 
              blockchain networks to agree on the state of the ledger without central authority.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Learning Objectives</h2>
          <div className="space-y-4">
            <p className="text-gray-700">At the end of this module, you will be able to:</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Define what a blockchain is and its basic structure</li>
              <li>Explain how blocks are created and linked in a blockchain</li>
              <li>Describe the key features of blockchain technology (e.g., immutability, transparency, decentralization)</li>
              <li>Identify the basic components of a blockchain system</li>
              <li>Distinguish between blockchain and traditional databases</li>
              <li>Explain the role of cryptography in maintaining blockchain security</li>
              <li>Recognize potential applications of blockchain technology beyond cryptocurrencies</li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Module Sections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                1. Blockchain Basics
              </h3>
              <p className="text-gray-700 mb-4">
                Understand the fundamental structure and components of blockchain technology.
              </p>
              <Link href="/modules/module2/blockchain-basics">
                <Button className="text-blue-600 hover:text-blue-800 font-medium">
                  Start Section →
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                2. Distributed Ledger Technology
              </h3>
              <p className="text-gray-700 mb-4">
                Explore how distributed ledgers work and their role in blockchain systems.
              </p>
              <Link href="/modules/module2/distributed-ledger">
                <Button className="text-blue-600 hover:text-blue-800 font-medium">
                  Start Section →
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                3. Consensus Mechanisms
              </h3>
              <p className="text-gray-700 mb-4">
                Learn about different consensus mechanisms like Proof of Work and Proof of Stake.
              </p>
              <Link href="/modules/module2/consensus-mechanisms">
                <Button className="text-blue-600 hover:text-blue-800 font-medium">
                  Start Section →
                </Button>
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                4. Smart Contracts
              </h3>
              <p className="text-gray-700 mb-4">
                Discover how smart contracts enable automated, trustless transactions on blockchain.
              </p>
              <Link href="/modules/module2/smart-contracts">
                <Button className="text-blue-600 hover:text-blue-800 font-medium">
                  Start Section →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/modules/module2/blockchain-basics">
            <Button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Begin Module 2
            </Button>
          </Link>
        </div>
        <Module2Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Module2;