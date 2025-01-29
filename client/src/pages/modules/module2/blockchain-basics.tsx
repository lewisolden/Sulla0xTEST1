import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlockchainBasicsSection() {
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
        updateProgress(2, 'blockchain-basics', true);
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
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Blockchain Basics
        </motion.h1>

        <Card>
          <CardContent className="pt-6">
            <div className="prose lg:prose-xl text-gray-700 space-y-6">
              <motion.section
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="lead">
                  A blockchain is a distributed, decentralised ledger that records transactions across many computers in a way that ensures the integrity and security of the data. It's the underlying technology that powers cryptocurrencies like Bitcoin, but its potential applications extend far beyond digital currencies.
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
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">1. Distributed Ledger</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Data is spread across multiple nodes (computers) in the network</li>
                      <li>Each node has a complete copy of the entire blockchain</li>
                      <li>Changes must be validated by the network</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-green-600 mb-4">2. Decentralisation</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>No single authority controls the blockchain</li>
                      <li>Consensus among network participants validates transactions</li>
                      <li>Resistant to manipulation and censorship</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-4">3. Immutability</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Once data is recorded, it's extremely difficult to change or delete</li>
                      <li>Each block contains a reference to the previous block</li>
                      <li>Creates an unbreakable chain of information</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-orange-600 mb-4">4. Transparency</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>All transactions are visible to all participants</li>
                      <li>Complete transaction history is maintained</li>
                      <li>Enhances accountability and reduces fraud</li>
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
                <h2 className="text-3xl font-bold text-blue-700 mt-8">Basic Structure</h2>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Blocks</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Contain a list of transactions</li>
                        <li>Include a timestamp</li>
                        <li>Have a unique identifier (hash)</li>
                        <li>Store reference to previous block</li>
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Chain</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Blocks linked in chronological order</li>
                        <li>Each block contains previous block's hash</li>
                        <li>Forms an immutable sequence</li>
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Transactions</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Represent transfer of value or data</li>
                        <li>Must be validated by network</li>
                        <li>Cryptographically secured</li>
                      </ul>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Nodes</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Computers in the blockchain network</li>
                        <li>Validate transactions</li>
                        <li>Maintain blockchain copy</li>
                      </ul>
                    </Card>
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
                      🎉 Congratulations! You've completed the Blockchain Basics section.
                      Return to Module 2 overview to continue your learning journey!
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-between">
          <Link href="/modules/module2">
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 2
            </Button>
          </Link>

          <Link href="/modules/module2/distributed-ledger">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Next: Distributed Ledger <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}