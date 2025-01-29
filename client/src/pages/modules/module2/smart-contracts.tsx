import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SmartContractFlow from "@/components/diagrams/SmartContractFlow";

export default function SmartContractsSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { progress, updateProgress } = useProgress();

  // Add quiz completion tracking
  const isQuizCompleted = progress.some(
    p => p.moduleId === 2 && p.sectionId === 'smart-contracts-quiz' && p.completed
  );

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
    visible: { opacity: 1, y: 0 }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        duration: 0.7,
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
          2.4 Smart Contracts
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
              Smart contracts are self-executing contracts with the terms of the agreement 
              directly written into code. They are a key feature of many blockchain 
              platforms, enabling automated, trustless transactions and complex 
              decentralized applications.
            </motion.p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-4">Definition</h3>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Computer programs stored on a blockchain</motion.li>
              <motion.li variants={itemVariants}>Automatically execute when predetermined conditions are met</motion.li>
              <motion.li variants={itemVariants}>Enforce the terms of an agreement without intermediaries</motion.li>
            </motion.ul>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Key Characteristics</h2>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600">1. Autonomy</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Execute automatically without intervention</motion.li>
                <motion.li variants={itemVariants}>No need for intermediaries</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Decentralisation</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Exist on a distributed blockchain network</motion.li>
                <motion.li variants={itemVariants}>No central point of control</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">3. Transparency</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>All parties can view the contract's code</motion.li>
                <motion.li variants={itemVariants}>Terms are publicly visible on the blockchain</motion.li>
                <motion.li variants={itemVariants}>Execution results are verifiable</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">4. Immutability</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Once deployed, code cannot be changed</motion.li>
                <motion.li variants={itemVariants}>Ensures contract terms remain constant</motion.li>
                <motion.li variants={itemVariants}>Builds trust between parties</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">5. Deterministic</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Produce the same result for everyone who runs them</motion.li>
                <motion.li variants={itemVariants}>Predictable outcomes based on inputs</motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">How Smart Contracts Work</h2>
            <SmartContractFlow />
            <motion.ol 
              className="list-decimal pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Creation: Developer writes the contract code, defining conditions and actions</motion.li>
              <motion.li variants={itemVariants}>Deployment: Contract is uploaded to the blockchain</motion.li>
              <motion.li variants={itemVariants}>Execution: Contract self-executes when predefined conditions are met</motion.li>
              <motion.li variants={itemVariants}>Verification: Network nodes verify the execution</motion.li>
              <motion.li variants={itemVariants}>Update: Results are recorded on the blockchain</motion.li>
            </motion.ol>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Advantages and Limitations</h2>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600">Advantages</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Efficiency: Automate processes, reducing time and cost</motion.li>
                <motion.li variants={itemVariants}>Accuracy: Eliminate errors from manual processing</motion.li>
                <motion.li variants={itemVariants}>Trust: Remove the need for intermediaries</motion.li>
                <motion.li variants={itemVariants}>Transparency: All parties can view and verify the contract</motion.li>
                <motion.li variants={itemVariants}>Security: Encrypted and distributed across the network</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">Limitations and Challenges</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Code Vulnerabilities: Bugs can lead to unintended consequences</motion.li>
                <motion.li variants={itemVariants}>Lack of Flexibility: Difficult to change once deployed</motion.li>
                <motion.li variants={itemVariants}>Legal Status: Uncertain regulatory environment in many jurisdictions</motion.li>
                <motion.li variants={itemVariants}>Oracle Problem: Challenge of getting reliable external data</motion.li>
                <motion.li variants={itemVariants}>Scalability: Limited by the underlying blockchain's capacity</motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Use Cases</h2>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600">1. Financial Services</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Automated lending and borrowing</motion.li>
                <motion.li variants={itemVariants}>Insurance claim processing</motion.li>
                <motion.li variants={itemVariants}>Decentralized exchanges</motion.li>
                <motion.li variants={itemVariants}>Automated market makers</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Supply Chain</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Automated payments upon delivery</motion.li>
                <motion.li variants={itemVariants}>Product tracking and verification</motion.li>
                <motion.li variants={itemVariants}>Supplier management</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">3. Real Estate</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Property transfers</motion.li>
                <motion.li variants={itemVariants}>Rental agreements</motion.li>
                <motion.li variants={itemVariants}>Automated payments</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">4. Healthcare</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Secure sharing of patient records</motion.li>
                <motion.li variants={itemVariants}>Automated insurance claims</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">5. Intellectual Property</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Automated royalty payments</motion.li>
                <motion.li variants={itemVariants}>Proof of ownership and licensing</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">6. Voting Systems</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Transparent and tamper-resistant electronic voting</motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Smart Contract Platforms</h2>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600">1. Ethereum</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>First and most popular smart contract platform</motion.li>
                <motion.li variants={itemVariants}>Uses Solidity programming language</motion.li>
                <motion.li variants={itemVariants}>Large developer community</motion.li>
              </motion.ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-2xl font-semibold text-blue-600 mt-4">2. Alternative Platforms</h3>
              <motion.ul 
                className="list-disc pl-5 space-y-3"
                variants={listVariants}
              >
                <motion.li variants={itemVariants}>Cardano: Academic research and peer-reviewed development</motion.li>
                <motion.li variants={itemVariants}>Polkadot: Enables interoperability between blockchains</motion.li>
                <motion.li variants={itemVariants}>Binance Smart Chain: High-performance, EVM-compatible</motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>

          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700">Future of Smart Contracts</h2>
            <motion.ul 
              className="list-disc pl-5 space-y-3"
              variants={listVariants}
            >
              <motion.li variants={itemVariants}>Integration with artificial intelligence for complex decision-making</motion.li>
              <motion.li variants={itemVariants}>Improved interoperability between different blockchain networks</motion.li>
              <motion.li variants={itemVariants}>Development of more user-friendly interfaces</motion.li>
              <motion.li variants={itemVariants}>Potential for "smart legal contracts" recognized by legal systems</motion.li>
              <motion.li variants={itemVariants}>Enhanced security features</motion.li>
              <motion.li variants={itemVariants}>Wider adoption in traditional industries</motion.li>
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
                  🎉 Congratulations! You've completed the Smart Contracts section.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module2/consensus-mechanisms">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Consensus Mechanisms
                  </Button>
                </Link>

                <div className="flex gap-4 w-full md:w-auto">
                  <Link href="/modules/module2/smart-contracts/quiz">
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

                  <Link href="/modules/module2/quiz">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                      Take Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
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