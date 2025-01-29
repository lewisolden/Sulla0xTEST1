import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
          <Link href="/modules/module2/blockchain-basics">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blockchain Basics
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

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Characteristics</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">1. Decentralisation</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>No single point of control or failure</li>
                  <li>Enhances resilience and reduces vulnerability to attacks</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">2. Transparency</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All participants can view the ledger</li>
                  <li>Increases trust and accountability</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">3. Immutability</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Once recorded, data is difficult to alter</li>
                  <li>Ensures data integrity and creates an auditable trail</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">4. Consensus</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Network participants agree on the validity of data</li>
                  <li>Various consensus mechanisms exist (e.g., Proof of Work, Proof of Stake)</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Distributed Ledgers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Public Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Open for anyone to participate</li>
                  <li>Example: Bitcoin blockchain</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Private Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Restricted to authorised participants</li>
                  <li>Often used in enterprise solutions</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Permissioned Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Participants need permission for certain actions</li>
                  <li>Combines elements of public and private ledgers</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Consortium Ledgers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Operated by a group of organisations</li>
                  <li>Balances decentralisation with central control</li>
                </ul>
              </Card>
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
                  You now understand how DLT forms the foundation for blockchain and other 
                  decentralised systems.
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
                    Next: Consensus Mechanisms <ArrowRight className="ml-2 h-4 w-4" />
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
