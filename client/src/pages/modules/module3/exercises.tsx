import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Wrench, Code, Award, Terminal, Check, AlertTriangle, Coins } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExercisesPage() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeExercise, setActiveExercise] = useState("smart-contract");
  const [smartContractCode, setSmartContractCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}`);

  const [nftContractCode, setNftContractCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    uint256 private _tokenIds;

    constructor() ERC721("SimpleNFT", "SNFT") {}

    function mintNFT(address recipient)
        public
        returns (uint256)
    {
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        return newItemId;
    }
}`);

  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'exercises', true, {
          courseId: 1, // Blockchain course
          timeSpent: Math.floor(Date.now() / 1000),
          lastAccessedRoute: '/modules/module3/exercises'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set([...Array.from(prev), step]));
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
          Smart Contract Development Exercises
        </motion.h1>

        <Tabs defaultValue="smart-contract" className="space-y-4">
          <TabsList>
            <TabsTrigger value="smart-contract">Basic Smart Contract</TabsTrigger>
            <TabsTrigger value="nft">NFT Minting</TabsTrigger>
          </TabsList>

          <TabsContent value="smart-contract">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Exercise 1: Your First Smart Contract</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Let's create your first smart contract! We'll build a simple storage contract 
                  that can store and retrieve a number. This will teach you the basics of 
                  smart contract development.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-blue-800">Understanding the Code:</h3>

                  <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{smartContractCode}</pre>
                  </div>

                  <div className="space-y-4 mt-4">
                    <h4 className="font-semibold text-blue-700">Code Breakdown:</h4>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        <strong>License & Version</strong>
                        <p className="text-gray-600">
                          The first two lines specify the license (MIT) and Solidity version (0.8.0 or higher).
                        </p>
                      </li>
                      <li>
                        <strong>Contract Declaration</strong>
                        <p className="text-gray-600">
                          <code>contract SimpleStorage</code> defines our contract name.
                        </p>
                      </li>
                      <li>
                        <strong>State Variable</strong>
                        <p className="text-gray-600">
                          <code>uint256 private storedData;</code> declares a private variable to store our number.
                        </p>
                      </li>
                      <li>
                        <strong>Set Function</strong>
                        <p className="text-gray-600">
                          <code>function set(uint256 x)</code> allows updating the stored number.
                        </p>
                      </li>
                      <li>
                        <strong>Get Function</strong>
                        <p className="text-gray-600">
                          <code>function get()</code> retrieves the stored number.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-lg mt-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 inline mr-2" />
                    <span className="text-yellow-700">
                      Remember: Every function call that modifies state (like set()) costs gas,
                      while view functions (like get()) are free to call!
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nft">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Coins className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-700">Exercise 2: Create Your First NFT</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Now let's create a simple NFT (Non-Fungible Token) contract! This exercise will 
                  show you how to create and mint unique digital assets on the blockchain.
                </p>

                <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-purple-800">Understanding NFT Contract:</h3>

                  <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{nftContractCode}</pre>
                  </div>

                  <div className="space-y-4 mt-4">
                    <h4 className="font-semibold text-purple-700">Code Breakdown:</h4>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        <strong>Import Statement</strong>
                        <p className="text-gray-600">
                          We import OpenZeppelin's ERC721 contract - a standard implementation for NFTs.
                        </p>
                      </li>
                      <li>
                        <strong>Contract Declaration</strong>
                        <p className="text-gray-600">
                          Our contract inherits from ERC721, giving us standard NFT functionality.
                        </p>
                      </li>
                      <li>
                        <strong>Constructor</strong>
                        <p className="text-gray-600">
                          Sets the NFT collection name ("SimpleNFT") and symbol ("SNFT").
                        </p>
                      </li>
                      <li>
                        <strong>Minting Function</strong>
                        <p className="text-gray-600">
                          <code>mintNFT()</code> creates a new NFT and assigns it to the recipient.
                        </p>
                      </li>
                      <li>
                        <strong>Token ID Tracking</strong>
                        <p className="text-gray-600">
                          We use <code>_tokenIds</code> to ensure each NFT has a unique identifier.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-blue-800 mb-2">How NFTs Work:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Each NFT has a unique ID (like a serial number)</li>
                      <li>NFTs can't be duplicated or divided</li>
                      <li>Ownership is tracked on the blockchain</li>
                      <li>They can represent digital art, collectibles, or any unique asset</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-lg mt-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 inline mr-2" />
                    <span className="text-yellow-700">
                      Important: This is a basic NFT implementation. Real-world NFTs often include 
                      additional features like metadata URI storage for artwork links and more 
                      complex minting logic.
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

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