import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Code, Shield, Workflow, GitBranch, AlertTriangle, Coins } from "lucide-react";
import SmartContractsQuiz from "@/components/quizzes/SmartContractsQuiz";
import SmartContractWorkflow from "@/components/diagrams/SmartContractWorkflow";
import SmartContractStructure from "@/components/diagrams/SmartContractStructure";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SmartContractsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeExercise, setActiveExercise] = useState("smart-contract");
  const { updateProgress } = useProgress();

  const [smartContractCode] = useState(`// SPDX-License-Identifier: MIT
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

  const [nftContractCode] = useState(`// SPDX-License-Identifier: MIT
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'smart-contracts', true, {
          courseId: 1,
          timeSpent: Math.floor(Date.now() / 1000),
          lastAccessedRoute: '/modules/module3/smart-contracts'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => setShowQuiz(false)}
          className="mb-6"
          variant="outline"
        >
          ← Back to Content
        </Button>
        <SmartContractsQuiz />
      </div>
    );
  }

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
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.2 Smart Contract Development
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Interactive Exercises</h2>

              <Tabs defaultValue="smart-contract" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="smart-contract">Basic Smart Contract</TabsTrigger>
                  <TabsTrigger value="nft">NFT Minting</TabsTrigger>
                </TabsList>

                <TabsContent value="smart-contract">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-6 h-6 text-blue-600" />
                      <h3 className="text-2xl font-bold text-blue-700">Exercise 1: Your First Smart Contract</h3>
                    </div>

                    <p className="text-gray-700">
                      Let's create your first smart contract! We'll build a simple storage contract 
                      that can store and retrieve a number. This will teach you the basics of 
                      smart contract development.
                    </p>

                    <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                      <h4 className="font-semibold text-blue-800">Understanding the Code:</h4>

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
                </TabsContent>

                <TabsContent value="nft">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Coins className="w-6 h-6 text-purple-600" />
                      <h3 className="text-2xl font-bold text-purple-700">Exercise 2: Create Your First NFT</h3>
                    </div>

                    <p className="text-gray-700">
                      Now let's create a simple NFT (Non-Fungible Token) contract! This exercise will 
                      show you how to create and mint unique digital assets on the blockchain.
                    </p>

                    <div className="bg-purple-50 p-6 rounded-lg space-y-4">
                      <h4 className="font-semibold text-purple-800">Understanding NFT Contract:</h4>

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
                </TabsContent>
              </Tabs>
              
              <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-12"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Practical Applications</h2>

                <div className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Financial Services (DeFi)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Automated Lending:</span>
                          <p className="text-sm mt-1">Get loans instantly without bank approval</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Decentralized Trading:</span>
                          <p className="text-sm mt-1">Exchange tokens without intermediaries</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Insurance:</span>
                          <p className="text-sm mt-1">Automatic claim processing and payouts</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Payments:</span>
                          <p className="text-sm mt-1">Programmable money transfers</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Digital Rights Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Content Licensing:</span>
                          <p className="text-sm mt-1">Automatic royalty payments to creators</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Access Control:</span>
                          <p className="text-sm mt-1">Manage digital content permissions</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">NFT Creation:</span>
                          <p className="text-sm mt-1">Create and trade unique digital assets</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Usage Tracking:</span>
                          <p className="text-sm mt-1">Monitor and verify content usage</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Supply Chain Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Product Tracking:</span>
                          <p className="text-sm mt-1">Monitor items from factory to consumer</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Authenticity:</span>
                          <p className="text-sm mt-1">Verify genuine products and documents</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Payments:</span>
                          <p className="text-sm mt-1">Automatic payment on delivery confirmation</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <span className="font-semibold">Documentation:</span>
                          <p className="text-sm mt-1">Secure storage of shipping records</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            </motion.section>
            
            <UnderstandingSmartContractsSection/>
            <SmartContractWorkflowSection/>
            <SmartContractStructureSection/>
            <PracticalApplicationsSection/>

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
                  🎉 Congratulations! You've completed the Smart Contract Development section!
                </p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Take Section Quiz
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3/ethereum-fundamentals",
            label: "Ethereum Fundamentals"
          }}
          next={{
            path: "/modules/module3/investment-value",
            label: "Investment and Value"
          }}
        />
      </div>
    </motion.div>
  );
}

const UnderstandingSmartContractsSection = () => {
  return(
    <>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Understanding Smart Contracts</h2>

      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">What are Smart Contracts?</h3>
        <p className="text-gray-700 mb-4">
          Think of a smart contract as a digital vending machine: when you insert money and select an item, 
          the machine automatically gives you what you selected. No human needs to verify or approve the transaction. 
          Similarly, smart contracts are programs that automatically execute actions when specific conditions are met.
        </p>
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-blue-600 mb-2">Real-World Example:</h4>
          <p className="text-gray-600">
            Imagine buying a house. Traditionally, you need lawyers, banks, and other intermediaries to verify and 
            process the transaction. With a smart contract, once you send the payment, the deed is automatically 
            transferred to you - instantly and without intermediaries.
          </p>
        </div>
      </div>
    </>
  )
}

const SmartContractWorkflowSection = () => {
  return(
    <>
      <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">How Smart Contracts Work</h3>
        <SmartContractWorkflow />
        <div className="mt-4 space-y-3">
          <div className="bg-white p-3 rounded">
            <span className="font-semibold text-blue-700">1. Write Contract:</span>
            <span className="ml-2 text-gray-600">Create the rules and conditions in code (like Solidity)</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="font-semibold text-blue-700">2. Deploy:</span>
            <span className="ml-2 text-gray-600">Upload to the blockchain where it becomes permanent</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="font-semibold text-blue-700">3. Execute:</span>
            <span className="ml-2 text-gray-600">Contract runs automatically when conditions are met</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="font-semibold text-blue-700">4. Verify:</span>
            <span className="ml-2 text-gray-600">Network nodes verify the execution</span>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="font-semibold text-blue-700">5. Update:</span>
            <span className="ml-2 text-gray-600">Blockchain state is updated with the results</span>
          </div>
        </div>
      </div>
    </>
  )
}

const SmartContractStructureSection = () => {
  return(
    <>
      <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Structure</h3>
        <SmartContractStructure />
      </div>
    </>
  )
}

const PracticalApplicationsSection = () => {
  return(
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-700">Key Features</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Automatic Execution:</span>
              <p className="text-sm mt-1">No manual intervention needed once conditions are met</p>
            </li>
            <li>
              <span className="font-semibold">Transparency:</span>
              <p className="text-sm mt-1">Everyone can see and verify the contract's code</p>
            </li>
            <li>
              <span className="font-semibold">Immutable:</span>
              <p className="text-sm mt-1">Cannot be changed after deployment, ensuring trust</p>
            </li>
            <li>
              <span className="font-semibold">Decentralized:</span>
              <p className="text-sm mt-1">Runs on blockchain network, not controlled by any single entity</p>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-700">Important Considerations</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Gas Fees:</span>
              <p className="text-sm mt-1">Each operation costs a small amount of cryptocurrency</p>
            </li>
            <li>
              <span className="font-semibold">Code is Law:</span>
              <p className="text-sm mt-1">Contracts execute exactly as written - no exceptions</p>
            </li>
            <li>
              <span className="font-semibold">Security First:</span>
              <p className="text-sm mt-1">Thorough testing is crucial as bugs cannot be fixed after deployment</p>
            </li>
            <li>
              <span className="font-semibold">Network Limitations:</span>
              <p className="text-sm mt-1">Consider blockchain's speed and capacity constraints</p>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Practical Applications</h2>

        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Financial Services (DeFi)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Automated Lending:</span>
                  <p className="text-sm mt-1">Get loans instantly without bank approval</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Decentralized Trading:</span>
                  <p className="text-sm mt-1">Exchange tokens without intermediaries</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Insurance:</span>
                  <p className="text-sm mt-1">Automatic claim processing and payouts</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Payments:</span>
                  <p className="text-sm mt-1">Programmable money transfers</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Digital Rights Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Content Licensing:</span>
                  <p className="text-sm mt-1">Automatic royalty payments to creators</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Access Control:</span>
                  <p className="text-sm mt-1">Manage digital content permissions</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">NFT Creation:</span>
                  <p className="text-sm mt-1">Create and trade unique digital assets</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Usage Tracking:</span>
                  <p className="text-sm mt-1">Monitor and verify content usage</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Supply Chain Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Product Tracking:</span>
                  <p className="text-sm mt-1">Monitor items from factory to consumer</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Authenticity:</span>
                  <p className="text-sm mt-1">Verify genuine products and documents</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Payments:</span>
                  <p className="text-sm mt-1">Automatic payment on delivery confirmation</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <span className="font-semibold">Documentation:</span>
                  <p className="text-sm mt-1">Secure storage of shipping records</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};