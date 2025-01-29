import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
          Smart Contracts
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Smart contracts are self-executing contracts with the terms of the agreement directly 
              written into code. They are a key feature of many blockchain platforms, enabling 
              automated, trustless transactions and complex decentralised applications.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Autonomy</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Execute automatically without intervention</li>
                    <li>No need for intermediaries</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Decentralisation</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Exist on distributed blockchain network</li>
                    <li>No central point of control</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All parties can view the contract's code</li>
                    <li>Execution is visible to all</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Immutability</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Once deployed, code cannot be changed</li>
                    <li>Creates trust in the system</li>
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
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Use Cases</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Financial Services</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated lending and borrowing</li>
                  <li>Insurance claim processing</li>
                  <li>Decentralized finance (DeFi) applications</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">Supply Chain</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated payments upon delivery</li>
                  <li>Product tracking and verification</li>
                  <li>Supplier management</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">Real Estate</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automated property transfers</li>
                  <li>Rent payments and agreements</li>
                  <li>Property tokenization</li>
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
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Popular Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ethereum</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>First and most popular platform</li>
                  <li>Uses Solidity programming language</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Cardano</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Academic research-based approach</li>
                  <li>Uses Haskell-based Plutus</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Polkadot</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Enables cross-chain interoperability</li>
                  <li>Multiple language support</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Binance Smart Chain</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>High performance and low cost</li>
                  <li>EVM compatible</li>
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
                  🎉 Congratulations! You've completed the Smart Contracts section. 
                  You can now take the quiz to test your knowledge!
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

                <Link href="/modules/module2/smart-contracts-quiz">
                  <Button 
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Take Quiz <ArrowRight className="ml-2 h-4 w-4" />
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