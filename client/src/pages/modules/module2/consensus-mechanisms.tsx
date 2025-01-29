import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
          <Link href="/modules/module2/distributed-ledger">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Distributed Ledger
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Consensus Mechanisms
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Consensus mechanisms are crucial components of blockchain networks, ensuring agreement 
              on the state of the ledger across all participants. Let's explore the two primary 
              mechanisms: Proof of Work (PoW) and Proof of Stake (PoS).
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Proof of Work (PoW)</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">How PoW Works</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Miners compete to solve a cryptographic puzzle</li>
                  <li>First miner to solve the puzzle gets to add the next block</li>
                  <li>Other nodes verify the solution</li>
                  <li>If valid, the new block is added to the blockchain</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Advantages</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Highly secure against attacks</li>
                    <li>Proven track record (used by Bitcoin)</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Disadvantages</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Energy-intensive</li>
                    <li>Potential for mining centralization</li>
                    <li>Slower transaction processing</li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Proof of Stake (PoS)</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">How PoS Works</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Validators lock up cryptocurrency as stake</li>
                  <li>Protocol selects validator to create next block</li>
                  <li>Honest validation earns rewards</li>
                  <li>Malicious behavior risks stake loss</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Advantages</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>More energy-efficient than PoW</li>
                    <li>Faster transaction processing</li>
                    <li>Encourages long-term holding</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Disadvantages</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Potential centralization (rich get richer)</li>
                    <li>Less proven than PoW</li>
                    <li>Possible security vulnerabilities</li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Other Consensus Mechanisms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Delegated Proof of Stake (DPoS)</h3>
                <p>Stakeholders vote for delegates to validate transactions</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Proof of Authority (PoA)</h3>
                <p>Transactions are validated by approved accounts</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Byzantine Fault Tolerance</h3>
                <p>Nodes vote on the validity of transactions</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Proof of Burn (PoB)</h3>
                <p>Miners burn coins to earn mining rights</p>
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
                  🎉 Congratulations! You've completed the Consensus Mechanisms section. 
                  You now understand how different consensus mechanisms ensure the security 
                  and integrity of blockchain networks.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2/distributed-ledger">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                  </Button>
                </Link>

                <Link href="/modules/module2/smart-contracts">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
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
