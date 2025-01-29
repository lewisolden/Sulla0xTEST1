import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlockchainBasicsDiagram from "@/components/diagrams/BlockchainBasicsDiagram";
import BlockStructureDiagram from "@/components/diagrams/BlockStructureDiagram";
import DistributedLedgerDiagram from "@/components/diagrams/DistributedLedgerDiagram";

export default function BlockchainFundamentalsSection() {
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
        updateProgress(2, 'blockchain-fundamentals', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
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
          Understanding Blockchain Fundamentals
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              A blockchain is a revolutionary technology that combines cryptography, 
              distributed systems, and consensus mechanisms to create a secure, 
              transparent, and immutable record of transactions. Let's explore the 
              core concepts that make blockchain technology possible.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">What is a Blockchain?</h2>
            <BlockchainBasicsDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Decentralized: No single point of control</li>
                <li>Immutable: Once recorded, data cannot be changed</li>
                <li>Transparent: All transactions are visible to participants</li>
                <li>Secure: Protected by cryptography</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Block Structure</h2>
            <BlockStructureDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Block Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Block Header: Contains metadata about the block</li>
                <li>Previous Block Hash: Links to the previous block</li>
                <li>Timestamp: When the block was created</li>
                <li>Merkle Root: Hash of all transactions in the block</li>
                <li>Nonce: Used in the mining process</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Distributed Ledger Technology</h2>
            <DistributedLedgerDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Network Structure</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Peer-to-Peer Network: Direct communication between nodes</li>
                <li>Data Replication: Each node maintains a copy of the ledger</li>
                <li>Consensus: Network agrees on the state of the ledger</li>
                <li>Fault Tolerance: Network continues even if some nodes fail</li>
              </ul>
            </div>
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
                  🎉 Congratulations! You've completed the Blockchain Fundamentals section. 
                  You now understand the basic building blocks of blockchain technology and 
                  how they work together to create a secure, distributed ledger.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 2
                  </Button>
                </Link>

                <Link href="/modules/module2/consensus-mechanisms">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Next Topic: Consensus Mechanisms <ArrowRight className="ml-2 h-4 w-4" />
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
