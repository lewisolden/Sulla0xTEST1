import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";
import { useNavigate } from "@/hooks/useNavigate";
import MoneyEvolutionTimeline from "@/components/diagrams/MoneyEvolutionTimeline";

export default function DigitalCurrenciesSection() {
  const navigate = useNavigate();
  const { updateProgress, metrics } = useProgress();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95 && !isFullyRead) {
        setIsFullyRead(true);
        updateProgress(1, 'digital-currencies', true).catch(console.error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress, isFullyRead]);

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        mass: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3
      }
    }
  };

  return (
    <NavigationWrapper>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => navigate("/modules/module1")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          Module 1: Understanding Cryptocurrency
        </motion.h1>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-full bg-blue-600" />
        </motion.div>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          {/* Introduction Section */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Introduction to Digital Currency</h2>
            <motion.p 
              variants={sectionVariants}
              className="mt-4"
            >
              In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary approach to money and value transfer. Before diving into specific cryptocurrencies or technical details, it's essential to understand what makes digital currencies unique and how they differ from traditional money systems.
            </motion.p>
          </motion.section>

          {/* Understanding Traditional Money vs. Cryptocurrency */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Understanding Traditional Money vs. Cryptocurrency</h2>
            <motion.p variants={sectionVariants} className="mt-4">
              Think about the cash in your wallet or the money in your bank account. Traditional money exists in two main forms: physical cash and digital bank balances. Physical cash offers immediate, tangible transactions but comes with limitations like physical degradation, security risks, and geographical restrictions. Digital bank money, while more convenient for many transactions, relies entirely on banks and financial institutions as intermediaries.
            </motion.p>
            <motion.p variants={sectionVariants} className="mt-4">
              Cryptocurrency introduces a fundamentally different approach. It exists purely as digital information, but unlike the numbers in your bank account, it doesn't represent a claim on a bank or institution. Instead, cryptocurrency operates through a decentralized network of computers, using advanced cryptography to ensure security and verify transactions.
            </motion.p>
          </motion.section>

          {/* The Evolution of Money */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">The Evolution of Money</h2>
            <motion.p variants={sectionVariants} className="mt-4">
              To understand cryptocurrency's significance, consider how money has evolved through history:
            </motion.p>

            {/* Add the Timeline component */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <MoneyEvolutionTimeline />
            </motion.div>

            <motion.ul
              variants={sectionVariants}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              {[
                "Barter systems required direct exchange of goods",
                "Precious metals provided portable, divisible value",
                "Paper money offered convenient value representation",
                "Digital banking enabled electronic transfers",
                "Cryptocurrency introduces programmable, borderless money"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={sectionVariants}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* Core Concepts and Features */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Core Concepts and Features</h2>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <DecentralizationIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Decentralization: A New Paradigm</h3>
              </div>
              <motion.p variants={sectionVariants} className="mt-4">
                One of cryptocurrency's most revolutionary aspects is its decentralized nature. Traditional financial systems operate through centralized authorities – banks, governments, and financial institutions. These entities control money creation, verify transactions, and maintain account balances.
              </motion.p>
              <motion.p variants={sectionVariants} className="mt-4">
                Cryptocurrency works differently. Instead of relying on central authorities, it uses a network of computers running specialized software. This network collectively maintains and verifies all transactions through a system called blockchain. Network consensus, which is the process where all participating computers agree on the validity of transactions and the current state of the network using predefined rules and cryptographic proofs, ensures that everyone has the same version of truth without needing a central authority. Think of it as a shared digital ledger that everyone can see but no one can alter without network consensus.
              </motion.p>
              {/*DecentralizationDiagram removed here*/}
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <BlockchainIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Digital Scarcity: A Breakthrough Innovation</h3>
              </div>
              <motion.p variants={sectionVariants} className="mt-4">
                Before cryptocurrency, creating genuine scarcity in digital assets seemed impossible. Digital files could be copied infinitely without degradation. Bitcoin solved this through its blockchain technology and precise supply controls. For example, Bitcoin has a fixed maximum supply of 21 million coins, with a predetermined release schedule that can't be altered without network consensus.
              </motion.p>
              <motion.p variants={sectionVariants} className="mt-4">
                This digital scarcity creates value similarly to how limited resources like gold or fine art maintain value. Unlike traditional currency, which central banks can print at will, cryptocurrency supply is often mathematically guaranteed and transparent.
              </motion.p>
            </motion.div>

            {/* Transaction Flow Section */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Understanding Transaction Flow</h3>
              <motion.p variants={sectionVariants} className="mt-4">
                When you make a cryptocurrency transaction, it goes through several important steps to ensure security and validity:
              </motion.p>

              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-4 mb-6">
                {[
                  "Transaction Broadcast: When you initiate a transfer, your transaction is announced to the network",
                  "Verification: Network nodes check the transaction's validity and your available balance",
                  "Consensus: Multiple nodes work together to confirm the transaction",
                  "Validation: The transaction is validated and added to the blockchain",
                  "Completion: The recipient receives the funds after network confirmation"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={sectionVariants}
                    className="mb-2"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <TransactionFlowDiagram />

              <motion.div className="mt-6 text-gray-600">
                <p className="text-sm">
                  This visualization shows how your transaction moves through the cryptocurrency network. 
                  Each node represents a computer in the network that helps verify and process the transaction. 
                  The arrows show the flow of information and validation steps required before the transaction is complete.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/*Understanding Cryptocurrency Security */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Understanding Cryptocurrency Security</h2>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <SecurityIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Cryptographic Foundations</h3>
              </div>
              <motion.p variants={sectionVariants} className="mt-4">
                Cryptocurrency security relies on advanced cryptography, specifically public-key cryptography. This system uses pairs of keys:
              </motion.p>
              <motion.ul 
                variants={sectionVariants}
                className="list-disc pl-5 mt-2"
              >
                {[
                  "A private key (like your secret password)",
                  "A public key (like your public email address)"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={sectionVariants}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">The Double-Spending Solution</h3>
              <motion.p variants={sectionVariants} className="mt-4">
                One of cryptocurrency's most significant achievements is solving the "double-spending" problem for digital money. In traditional digital systems, preventing someone from copying and reusing digital money required central authorities to track all transactions. Cryptocurrency solves this through its blockchain and network consensus mechanism.
              </motion.p>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DoubleSpendDiagram />
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Practical Applications */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Practical Applications</h2>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Financial Inclusion</h3>
              <motion.p variants={sectionVariants} className="mt-4">
                Cryptocurrency provides financial services access to previously underserved populations:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "People without bank accounts",
                  "Residents of countries with unstable currencies",
                  "Individuals with limited access to traditional banking",
                  "International workers needing to send remittances"
                ].map((item, index) => (
                  <motion.li key={index} variants={sectionVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Payment Efficiency</h3>
              <motion.p variants={sectionVariants} className="mt-4">
                Cryptocurrency offers several advantages for payments:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "Near-instant transfers globally",
                  "Lower transaction fees",
                  "24/7 operation",
                  "No intermediary requirements",
                  "Programmable payment options"
                ].map((item, index) => (
                  <motion.li key={index} variants={sectionVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Stablecoins: Bridging Traditional and Digital Finance</h3>
              <motion.p variants={sectionVariants} className="mt-4">
                Stablecoins represent a crucial innovation in the cryptocurrency space, designed to minimize volatility by maintaining a stable value:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "Pegged to stable assets like USD, reducing price volatility",
                  "Ideal for everyday transactions and commerce",
                  "Provides a reliable store of value in volatile markets",
                  "Enables easier conversion between traditional and digital currencies",
                  "Useful for international trade and remittances"
                ].map((item, index) => (
                  <motion.li key={index} variants={sectionVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.section>

          {/* Getting Started Safely */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Getting Started Safely</h2>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">First Steps</h3>
              </div>
              <motion.ol variants={sectionVariants} className="list-decimal pl-5 mt-2">
                {[
                  {
                    title: "Education First:",
                    items: [
                      "Understand basic concepts",
                      "Learn security principles",
                      "Study market dynamics",
                      "Review risk factors"
                    ]
                  },
                  {
                    title: "Start Small:",
                    items: [
                      "Use small amounts initially",
                      "Practice with test networks",
                      "Learn wallet management",
                      "Understand transaction processes"
                    ]
                  }
                ].map((item, index) => (
                  <motion.li key={index} variants={sectionVariants} className="mt-4">
                    <strong className="font-bold">{item.title}</strong>
                    <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                      {item.items.map((subItem, subIndex) => (
                        <motion.li key={subIndex} variants={sectionVariants}>
                          {subItem}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Security Best Practices</h3>
              <motion.ol variants={sectionVariants} className="list-decimal pl-5 mt-2">
                {[
                  {
                    title: "Essential Security Measures:",
                    items: [
                      "Use strong passwords",
                      "Enable two-factor authentication",
                      "Maintain secure backups",
                      "Keep software updated",
                      "Verify all transactions"
                    ]
                  },
                  {
                    title: "Advanced Protection:",
                    items: [
                      "Hardware wallet usage",
                      "Multi-signature setups",
                      "Cold storage implementation",
                      "Regular security audits"
                    ]
                  }
                ].map((item, index) => (
                  <motion.li key={index} variants={sectionVariants} className="mt-4">
                    <strong className="font-bold">{item.title}</strong>
                    <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                      {item.items.map((subItem, subIndex) => (
                        <motion.li key={subIndex} variants={sectionVariants}>
                          {subItem}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-700">Conclusion and Next Steps</h2>
            <motion.p variants={sectionVariants} className="mt-4">
              Understanding cryptocurrency requires balancing its revolutionary potential with practical risks and limitations. As you continue learning, remember:
            </motion.p>
            <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
              {[
                "Start with fundamentals before advancing",
                "Prioritize security in all activities",
                "Stay informed about developments",
                "Practice with small amounts first",
                "Maintain proper risk management by considering factors such as liquidity (ability to buy/sell quickly), volatility (price fluctuations), portfolio concentration (avoiding overexposure to single assets), and diversification (spreading risk across different types of assets)"
              ].map((item, index) => (
                <motion.li key={index} variants={sectionVariants}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p variants={sectionVariants} className="mt-4">
              The cryptocurrency space continues evolving, making ongoing education essential for safe and effective participation.
            </motion.p>
          </motion.section>

          {isFullyRead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                <p className="text-green-700">
                  🎉 Congratulations! You've completed the Introduction to Digital Currencies section.
                </p>
              </Card>

              <Button
                onClick={() => setShowQuiz(!showQuiz)}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
              </Button>

              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={() => navigate("/modules/module1")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Overview
                </Button>

                <Button
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/modules/module1/security")}
                >
                  Next Topic: Understanding Security
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                  <DigitalCurrenciesQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </NavigationWrapper>
  );
}