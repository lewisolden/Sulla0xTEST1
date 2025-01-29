import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ConsensusMechanismsSection() {
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
        updateProgress(2, 'consensus-mechanisms', true);
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
          2.3 Consensus Mechanisms
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Introduction</h2>
            <p>
              Consensus mechanisms are crucial components of blockchain networks, ensuring 
              agreement on the state of the ledger across all participants.
            </p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-4">What is a Consensus Mechanism?</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>A method for validating transactions and creating new blocks</li>
              <li>Ensures all nodes in the network agree on the current state</li>
              <li>Prevents double-spending and maintains network integrity</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Proof of Work (PoW)</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Definition</h3>
            <p>
              A consensus mechanism that requires solving complex mathematical puzzles 
              to validate transactions and create new blocks.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">How PoW Works</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Miners compete to solve a cryptographic puzzle</li>
              <li>First miner to solve the puzzle gets to add the next block</li>
              <li>Other nodes verify the solution</li>
              <li>If valid, the new block is added to the blockchain</li>
            </ol>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Advantages</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Highly secure against attacks</li>
              <li>Proven track record (used by Bitcoin)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Disadvantages</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Energy-intensive</li>
              <li>Potential for mining centralization</li>
              <li>Slower transaction processing</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Examples</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Bitcoin</li>
              <li>Litecoin</li>
              <li>Dogecoin</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Proof of Stake (PoS)</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Definition</h3>
            <p>
              A consensus mechanism where validators are chosen based on the amount 
              of cryptocurrency they hold and are willing to "stake".
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">How PoS Works</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Validators lock up a certain amount of cryptocurrency as stake</li>
              <li>The protocol selects a validator to create the next block</li>
              <li>If the validator acts honestly, they receive a reward</li>
              <li>If they act maliciously, they may lose their stake</li>
            </ol>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Advantages</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>More energy-efficient than PoW</li>
              <li>Potentially faster transaction processing</li>
              <li>Encourages long-term holding of cryptocurrency</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Disadvantages</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Potential for centralization (rich get richer)</li>
              <li>Less proven than PoW</li>
              <li>Possible security vulnerabilities</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Examples</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Solana</li>
              <li>Mina</li>
              <li>Tezos</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Other Consensus Mechanisms</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Delegated Proof of Stake (DPoS): Stakeholders vote for delegates</li>
              <li>Proof of Authority (PoA): Transactions validated by approved accounts</li>
              <li>Practical Byzantine Fault Tolerance (PBFT): Nodes vote on validity</li>
              <li>Proof of Burn (PoB): Miners burn coins to earn mining rights</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Future of Consensus Mechanisms</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Ongoing research into more efficient and secure mechanisms</li>
              <li>Hybrid models combining different consensus mechanisms</li>
              <li>Focus on scalability and environmental sustainability</li>
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
                  🎉 Congratulations! You've completed the Consensus Mechanisms section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2/distributed-ledger">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Distributed Ledger
                  </Button>
                </Link>

                <Link href="/modules/module2/smart-contracts">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                    Next: Smart Contracts <ArrowRight className="ml-2 h-4 w-4" />
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