import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Module2Overview = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Module 2: What is a Blockchain?
        </h1>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Course Overview</h2>
          <div className="prose max-w-none text-gray-700">
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
              of the data. Students will also gain insights into the consensus mechanisms that allow 
              blockchain networks to agree on the state of the ledger without central authority.
            </p>
            <p>
              By the end of this module, learners will have a clear understanding of what blockchain 
              is, how it differs from traditional databases, and why it's considered a transformative 
              technology with implications far beyond the realm of digital currencies.
            </p>
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Learning Objectives</h2>
          <div className="space-y-4">
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
        </Card>

        <div className="text-center">
          <Link href="/modules/module2/blockchain-basics">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Module2Overview;
