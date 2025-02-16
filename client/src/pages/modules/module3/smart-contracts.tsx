import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Code, Shield, Workflow, GitBranch, AlertTriangle, Coins } from "lucide-react";
import SmartContractsQuiz from "@/components/quizzes/SmartContractsQuiz";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SmartContractsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [storedNumber, setStoredNumber] = useState<number | null>(null);
  const [inputNumber, setInputNumber] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [mintedNFTs, setMintedNFTs] = useState<Array<{id: number, name: string, description: string}>>([]);
  const { updateProgress } = useProgress();

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

  const handleStoreNumber = () => {
    const num = parseInt(inputNumber);
    if (!isNaN(num)) {
      setStoredNumber(num);
      setInputNumber("");
    }
  };

  const handleMintNFT = () => {
    if (nftName && nftDescription) {
      const newNFT = {
        id: mintedNFTs.length + 1,
        name: nftName,
        description: nftDescription
      };
      setMintedNFTs([...mintedNFTs, newNFT]);
      setNftName("");
      setNftDescription("");
    }
  };

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
          Smart Contract Development
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <Tabs defaultValue="smart-contract" className="space-y-4">
              <TabsList>
                <TabsTrigger value="smart-contract">Simple Storage Contract</TabsTrigger>
                <TabsTrigger value="nft">NFT Creation</TabsTrigger>
              </TabsList>

              <TabsContent value="smart-contract">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-700 mb-4">Practice: Store and Retrieve Numbers</h3>
                    <p className="text-gray-700 mb-4">
                      This simple smart contract lets you store and retrieve a number. 
                      Try it out to understand how smart contracts work!
                    </p>

                    <div className="flex gap-4 mb-4">
                      <Input
                        type="number"
                        placeholder="Enter a number"
                        value={inputNumber}
                        onChange={(e) => setInputNumber(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button onClick={handleStoreNumber}>Store Number</Button>
                    </div>

                    {storedNumber !== null && (
                      <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-green-700">
                          Stored number: <span className="font-bold">{storedNumber}</span>
                        </p>
                      </div>
                    )}

                    <div className="mt-6 bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">How it works:</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Enter any number in the input field</li>
                        <li>Click "Store Number" to save it (like calling the set() function)</li>
                        <li>The stored number is displayed below (like calling the get() function)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nft">
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">Practice: Create Your Own NFT</h3>
                    <p className="text-gray-700 mb-4">
                      Try creating your own NFT! Add a name and description to mint a unique token.
                    </p>

                    <div className="space-y-4 mb-6">
                      <Input
                        placeholder="NFT Name"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                        className="max-w-xs"
                      />
                      <Textarea
                        placeholder="NFT Description"
                        value={nftDescription}
                        onChange={(e) => setNftDescription(e.target.value)}
                        className="max-w-md"
                      />
                      <Button onClick={handleMintNFT}>Mint NFT</Button>
                    </div>

                    {mintedNFTs.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-600 mb-4">Your NFT Collection:</h4>
                        <div className="grid gap-4">
                          {mintedNFTs.map(nft => (
                            <div key={nft.id} className="bg-purple-100 p-4 rounded-lg">
                              <p className="font-bold text-purple-700">#{nft.id} - {nft.name}</p>
                              <p className="text-gray-600">{nft.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-600 mb-2">How it works:</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Enter a name for your NFT</li>
                        <li>Add a description</li>
                        <li>Click "Mint NFT" to create your token</li>
                        <li>Each NFT gets a unique ID (like tokenId in the contract)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Articles moved to bottom */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Learn More About Smart Contracts</h2>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">What are Smart Contracts?</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
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
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">Automatic:</span>
                          <span>Executes without human intervention</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">Transparent:</span>
                          <span>Everyone can see the code</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">Immutable:</span>
                          <span>Can't be changed after deployment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">Trustless:</span>
                          <span>No need for intermediaries</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Workflow</h3>
                  <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
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
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Structure</h3>
                  <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <SmartContractStructure />
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Practical Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      variants={itemVariants}
                      className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-6 h-6 text-blue-600" />
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

                    <motion.div
                      variants={itemVariants}
                      className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-blue-700">Practical Applications</h3>
                      </div>
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
                    </motion.div>
                  </div>
                </section>
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