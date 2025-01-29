import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SmartContractsSection() {
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
        updateProgress(2, 'smart-contracts', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          2.4 Smart Contracts
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Introduction</h2>
            <p>
              Smart contracts are self-executing contracts with the terms of the agreement 
              directly written into code. They are a key feature of many blockchain 
              platforms, enabling automated, trustless transactions and complex 
              decentralized applications.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Key Characteristics</h2>
            <h3 className="text-2xl font-semibold text-blue-600">1. Autonomy</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Execute automatically without intervention</li>
              <li>No need for intermediaries</li>
              <li>Predetermined conditions trigger actions</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Transparency</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>All parties can view the contract's code</li>
              <li>Terms are publicly visible on the blockchain</li>
              <li>Execution results are verifiable</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">3. Immutability</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Once deployed, code cannot be changed</li>
              <li>Ensures contract terms remain constant</li>
              <li>Builds trust between parties</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">How Smart Contracts Work</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Developer writes the contract code, defining conditions and actions</li>
              <li>Contract is uploaded to the blockchain</li>
              <li>Contract self-executes when predefined conditions are met</li>
              <li>Network nodes verify the execution</li>
              <li>Results are recorded on the blockchain</li>
            </ol>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Advantages and Limitations</h2>

            <h3 className="text-2xl font-semibold text-blue-600">Advantages</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Efficiency: Automate processes, reducing time and cost</li>
              <li>Accuracy: Eliminate errors from manual processing</li>
              <li>Trust: Remove the need for intermediaries</li>
              <li>Security: Encrypted and distributed across the network</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Limitations</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Code Vulnerabilities: Bugs can lead to unintended consequences</li>
              <li>Lack of Flexibility: Difficult to change once deployed</li>
              <li>Oracle Problem: Challenge of getting reliable external data</li>
              <li>Scalability: Limited by the underlying blockchain's capacity</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Smart Contract Platforms</h2>

            <h3 className="text-2xl font-semibold text-blue-600">1. Ethereum</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>First and most popular smart contract platform</li>
              <li>Uses Solidity programming language</li>
              <li>Large developer community</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Alternative Platforms</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Cardano: Academic research and peer-reviewed development</li>
              <li>Polkadot: Enables interoperability between blockchains</li>
              <li>Binance Smart Chain: High-performance, EVM-compatible</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Future of Smart Contracts</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Integration with artificial intelligence for complex decision-making</li>
              <li>Improved interoperability between different blockchain networks</li>
              <li>Development of more user-friendly interfaces</li>
              <li>Potential for "smart legal contracts" recognized by legal systems</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Use Cases</h2>
            <h3 className="text-2xl font-semibold text-blue-600">1. Financial Services</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Automated lending and borrowing</li>
              <li>Insurance claim processing</li>
              <li>Decentralized exchanges</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Supply Chain</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Automated payments upon delivery</li>
              <li>Product tracking and verification</li>
              <li>Supplier management</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">3. Real Estate</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Property transfers</li>
              <li>Rental agreements</li>
              <li>Automated payments</li>
            </ul>
          </motion.section>


          {isFullyRead && (
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the Smart Contracts section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2/consensus-mechanisms">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Consensus Mechanisms
                  </Button>
                </Link>

                <Link href="/modules/module2/quiz">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Take Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}