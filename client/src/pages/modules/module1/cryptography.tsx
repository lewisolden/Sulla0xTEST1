import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop"; // Add this import
import CryptographyDiagram from "@/components/diagrams/CryptographyDiagram";
import HashFunctionDiagram from "@/components/diagrams/HashFunctionDiagram";
import BlockchainDiagram from "@/components/diagrams/BlockchainDiagram";
import CryptographyQuiz from "@/components/quizzes/CryptographyQuiz";

export default function CryptographySection() {
  useScrollTop(); // Add this hook at the top level
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
        updateProgress(1, 'cryptography', true);
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
          <Link href="/modules/module1/crypto-market">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Crypto Market Dynamics
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Cryptography in Cryptocurrency
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Cryptography forms the backbone of cryptocurrency security and functionality. 
              Without these mathematical techniques, secure digital transactions would be 
              impossible. Let's explore the key cryptographic concepts that make 
              cryptocurrencies possible.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Public Key Cryptography</h2>
            <CryptographyDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Key Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Public Key: Shared openly, used to receive funds</li>
                <li>Private Key: Kept secret, used to authorize transactions</li>
                <li>Digital Signatures: Prove ownership and authorize transfers</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-600">Applications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Transaction Authentication</li>
                <li>Wallet Security</li>
                <li>Message Encryption</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Hash Functions</h2>
            <HashFunctionDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Properties</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>One-way Function: Easy to compute, impossible to reverse</li>
                <li>Deterministic: Same input always produces same output</li>
                <li>Avalanche Effect: Small input changes create large output differences</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-600">Uses in Cryptocurrency</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Block Chain Links: Each block contains previous block's hash</li>
                <li>Transaction IDs: Unique identifiers for transactions</li>
                <li>Mining: Proof-of-work puzzle solving</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Blockchain Security</h2>
            <BlockchainDiagram />
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">Security Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Immutable Records: Once written, cannot be altered</li>
                <li>Distributed Consensus: Network agreement on transaction validity</li>
                <li>Cryptographic Verification: Every transaction is cryptographically signed</li>
              </ul>

              <h3 className="text-2xl font-semibold text-blue-600">Advanced Concepts</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Zero-Knowledge Proofs: Prove validity without revealing data</li>
                <li>Ring Signatures: Transaction privacy in certain cryptocurrencies</li>
                <li>Multi-signature Schemes: Require multiple approvals</li>
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
                  🎉 Congratulations! You've completed the Cryptography section. You now understand 
                  the fundamental cryptographic concepts that power cryptocurrencies and 
                  blockchain technology.
                </p>
              </Card>

              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                </Button>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                  <Link href="/modules/module1/crypto-market">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full md:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                    </Button>
                  </Link>

                  <Link href="/modules/module1/quiz">
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Take Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                  <CryptographyQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}