import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DistributedLedgerDiagram from "@/components/diagrams/DistributedLedgerDiagram";

export default function DistributedLedgerSection() {
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
        updateProgress(2, 'distributed-ledger', true);
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
          Distributed Ledger Technology
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Distributed Ledger Technology (DLT) is the broader category of decentralised databases that blockchain belongs to. 
              It represents a paradigm shift in how data is stored, shared, and verified across a network of multiple participants.
            </p>
          </motion.section>

          <DistributedLedgerDiagram />

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-4">Key Characteristics of DLT</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">1. Decentralisation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>No single point of control or failure</li>
                  <li>Enhances resilience and reduces vulnerability to attacks</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. Transparency</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All participants can view the ledger</li>
                  <li>Increases trust and accountability</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. Immutability</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Once recorded, data is difficult to alter</li>
                  <li>Ensures data integrity and creates an auditable trail</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">4. Consensus</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Network participants agree on the validity of data</li>
                  <li>Various consensus mechanisms exist</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-4">Types of Distributed Ledgers</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Public Distributed Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Open for anyone to participate</li>
                  <li>Example: Bitcoin blockchain</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. Private Distributed Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Restricted to authorised participants</li>
                  <li>Often used in enterprise solutions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. Permissioned Distributed Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Participants need permission to perform certain actions</li>
                  <li>Combines elements of public and private ledgers</li>
                </ul>
              </div>
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
                  🎉 Congratulations! You've completed the Distributed Ledger Technology section.
                  You now understand how DLT works and its various implementations.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2/blockchain-basics">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
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
