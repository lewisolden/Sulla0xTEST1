import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Code, Shield, Workflow, GitBranch, User } from "lucide-react";
import SmartContractsQuiz from "@/components/quizzes/SmartContractsQuiz";
import SmartContractWorkflow from "@/components/diagrams/SmartContractWorkflow";
import SmartContractStructure from "@/components/diagrams/SmartContractStructure";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const SimpleSmartContractExercise = () => {
  const [balance, setBalance] = useState(100);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleTransfer = () => {
    if (!recipient || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const transferAmount = Number(amount);
    if (transferAmount > balance) {
      toast({
        title: "Transfer Failed",
        description: "Insufficient balance - This is how smart contracts protect against invalid transactions!",
        variant: "destructive",
      });
      return;
    }

    setBalance(prev => prev - transferAmount);
    setStep(3);
    toast({
      title: "Transfer Successful!",
      description: "The smart contract automatically executed the transfer once all conditions were met.",
      variant: "default",
    });
  };

  return (
    <Card className="p-6 my-8">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">Interactive Smart Contract Exercise</h3>

      {/* Introduction */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-700 mb-2">What is a Smart Contract?</h4>
        <p className="text-gray-700 mb-4">
          Think of a smart contract like a vending machine: when you put in money and make a selection,
          it automatically gives you what you want without needing anyone to help. Smart contracts work
          the same way - they automatically execute actions when certain conditions are met.
        </p>
      </div>

      {/* The Exercise */}
      <div className="space-y-6">
        {/* Step 1: Understand the Contract */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 mb-2">Step 1: Understanding Your First Smart Contract</h4>
          <p className="mb-4">
            Below is a simple smart contract that can transfer tokens between addresses.
            It automatically checks if you have enough tokens before allowing a transfer.
          </p>
          <div className="bg-black text-green-400 p-4 rounded overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              {`// This is a simple token transfer contract
contract SimpleToken {
    // Store everyone's balance
    mapping(address => uint256) balances;

    // Check if sender has enough tokens
    function transfer(address to, uint256 amount) {
        require(balances[sender] >= amount, 
                "Must have enough tokens");

        // If they do, subtract from sender
        balances[sender] = balances[sender] - amount;

        // And add to recipient
        balances[to] = balances[to] + amount;
    }
}`}
            </pre>
          </div>
        </div>

        {/* Step 2: Try the Contract */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-700 mb-2">Step 2: Try It Yourself!</h4>
          <p className="mb-4">
            Let's try sending some tokens! You have {balance} tokens to experiment with.
            The smart contract will automatically check if you have enough tokens before allowing the transfer.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Recipient's Address:</label>
              <Input
                placeholder="Enter any address (e.g. 0x123...)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">
                This is where your tokens will be sent
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount to Send:</label>
              <Input
                type="number"
                placeholder="How many tokens to send?"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">
                The smart contract will check if you have enough tokens
              </p>
            </div>

            <Button 
              onClick={handleTransfer} 
              className="w-full"
              variant="default"
            >
              Execute Smart Contract
            </Button>
          </div>
        </div>

        {/* Step 3: Understanding What Happened */}
        {step === 3 && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Success! Here's What Happened:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>The smart contract first checked if you had enough tokens</li>
              <li>Once verified, it automatically subtracted tokens from your balance</li>
              <li>Then it added those tokens to the recipient's balance</li>
              <li>All of this happened automatically without any middleman!</li>
            </ol>
            <p className="mt-4 text-sm text-green-600">
              This is the power of smart contracts - they automatically execute and enforce rules without
              needing anyone to oversee the transaction.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

const NFTMintingExercise = () => {
  const [isMinted, setIsMinted] = useState(false);
  const [ethBalance, setEthBalance] = useState(20);
  const { toast } = useToast();

  const handleMint = () => {
    if (ethBalance < 10) {
      toast({
        title: "Minting Failed",
        description: "Insufficient ETH balance (need 10 ETH)",
        variant: "destructive",
      });
      return;
    }

    setEthBalance(prev => prev - 10);
    setIsMinted(true);
    toast({
      title: "NFT Minted Successfully!",
      description: "Your CryptoPunk NFT has been minted",
      variant: "default",
    });
  };

  return (
    <Card className="p-6 my-8">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">NFT Minting Exercise</h3>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">Your ETH Balance: {ethBalance} ETH</p>
          {!isMinted ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-32 h-32 mx-auto rounded-lg flex items-center justify-center">
                  <img 
                    src="/attached_assets/Screenshot 2025-02-16 at 23.23.28.png"
                    alt="CryptoPunk NFT"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center mt-2">CryptoPunk #1337</p>
                <p className="text-center text-sm text-gray-600">Price: 10 ETH</p>
              </div>
              <Button onClick={handleMint} className="w-full">
                Mint NFT (10 ETH)
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-bold mb-2">🎉 Congratulations!</p>
              <p>You now own CryptoPunk #1337</p>
              <div className="w-32 h-32 mx-auto my-4 rounded-lg flex items-center justify-center">
                <img 
                  src="/attached_assets/Screenshot 2025-02-16 at 23.23.28.png"
                  alt="CryptoPunk NFT"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const SmartContractsSection = () => {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'smart-contracts', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

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

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          3.2 Smart Contract Development
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
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

              <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Structure</h3>
                <SmartContractStructure />
              </div>
            </motion.section>

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
                  onClick={startQuiz}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Take Section Quiz
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Add Interactive Exercises Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-12"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Interactive Exercises</h2>
        <SimpleSmartContractExercise />
        <NFTMintingExercise />
      </motion.section>

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
    </motion.div>
  );
};

export default SmartContractsSection;