import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import ConsensusComparison from "@/components/diagrams/ConsensusComparison";

export default function ConsensusMechanismsSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { progress, updateProgress } = useProgress();

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

  // Check if the quiz is completed
  const isQuizCompleted = progress.some(
    p => p.moduleId === 2 && p.sectionId === 'consensus-mechanisms-quiz' && p.completed
  );

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren"
      }
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          2.3 Consensus Mechanisms
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Introduction</h2>
            <motion.p variants={contentVariants}>
              Consensus mechanisms are crucial components of blockchain networks, ensuring 
              agreement on the state of the ledger across all participants.
            </motion.p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-4">What is a Consensus Mechanism?</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>A method for validating transactions and creating new blocks</motion.li>
              <motion.li variants={itemVariants}>Ensures all nodes in the network agree on the current state</motion.li>
              <motion.li variants={itemVariants}>Prevents double-spending and maintains network integrity</motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Comparison of Consensus Mechanisms</h2>
            <ConsensusComparison />
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Proof of Work (PoW)</h2>
            <motion.p variants={contentVariants}>
              A consensus mechanism that requires solving complex mathematical puzzles 
              to validate transactions and create new blocks.
            </motion.p>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">How PoW Works</h3>
            <motion.ol 
              className="list-decimal pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Miners compete to solve a cryptographic puzzle</motion.li>
              <motion.li variants={itemVariants}>First miner to solve the puzzle gets to add the next block</motion.li>
              <motion.li variants={itemVariants}>Other nodes verify the solution</motion.li>
              <motion.li variants={itemVariants}>If valid, the new block is added to the blockchain</motion.li>
            </motion.ol>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Advantages</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Highly secure against attacks</motion.li>
              <motion.li variants={itemVariants}>Proven track record (used by Bitcoin)</motion.li>
            </motion.ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Disadvantages</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Energy-intensive</motion.li>
              <motion.li variants={itemVariants}>Potential for mining centralization</motion.li>
              <motion.li variants={itemVariants}>Slower transaction processing</motion.li>
            </motion.ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Examples</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Bitcoin</motion.li>
              <motion.li variants={itemVariants}>Litecoin</motion.li>
              <motion.li variants={itemVariants}>Dogecoin</motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Proof of Stake (PoS)</h2>
            <motion.p variants={contentVariants}>
              A consensus mechanism where validators are chosen based on the amount 
              of cryptocurrency they hold and are willing to "stake".
            </motion.p>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">How PoS Works</h3>
            <motion.ol 
              className="list-decimal pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Validators lock up a certain amount of cryptocurrency as stake</motion.li>
              <motion.li variants={itemVariants}>The protocol selects a validator to create the next block</motion.li>
              <motion.li variants={itemVariants}>If the validator acts honestly, they receive a reward</motion.li>
              <motion.li variants={itemVariants}>If they act maliciously, they may lose their stake</motion.li>
            </motion.ol>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Advantages</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>More energy-efficient than PoW</motion.li>
              <motion.li variants={itemVariants}>Potentially faster transaction processing</motion.li>
              <motion.li variants={itemVariants}>Encourages long-term holding of cryptocurrency</motion.li>
            </motion.ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Disadvantages</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Potential for centralization (rich get richer)</motion.li>
              <motion.li variants={itemVariants}>Less proven than PoW</motion.li>
              <motion.li variants={itemVariants}>Possible security vulnerabilities</motion.li>
            </motion.ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Examples</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Solana</motion.li>
              <motion.li variants={itemVariants}>Mina</motion.li>
              <motion.li variants={itemVariants}>Tezos</motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Other Consensus Mechanisms</h2>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Delegated Proof of Stake (DPoS): Stakeholders vote for delegates</motion.li>
              <motion.li variants={itemVariants}>Proof of Authority (PoA): Transactions validated by approved accounts</motion.li>
              <motion.li variants={itemVariants}>Practical Byzantine Fault Tolerance (PBFT): Nodes vote on validity</motion.li>
              <motion.li variants={itemVariants}>Proof of Burn (PoB): Miners burn coins to earn mining rights</motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Future of Consensus Mechanisms</h2>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Ongoing research into more efficient and secure mechanisms</motion.li>
              <motion.li variants={itemVariants}>Hybrid models combining different consensus mechanisms</motion.li>
              <motion.li variants={itemVariants}>Focus on scalability and environmental sustainability</motion.li>
            </motion.ul>
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

                <div className="flex gap-4 w-full md:w-auto">
                  <Link href={`/modules/module2/consensus-mechanisms/quiz`}>
                    <Button 
                      variant="secondary"
                      size="lg"
                      className="gap-2"
                      disabled={!isFullyRead}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Topic Quiz
                    </Button>
                  </Link>
                  <Link href="/modules/module2/smart-contracts">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                      Next: Smart Contracts <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}