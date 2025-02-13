import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import DigitalCurrencyFeatures from "@/components/diagrams/DigitalCurrencyFeatures";

export default function DigitalCurrenciesSection() {
  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Double-check scroll position after mount
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []); // Empty dependency array means this runs once on mount

  const navigate = useNavigate();
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
        updateProgress(1, 'digital-currencies', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  // Enhanced animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        mass: 0.3,
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
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
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <NavigationWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="container mx-auto px-4 py-8"
        >
          <motion.div
            className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: scrollProgress / 100,
              transition: { duration: 0.2 }
            }}
            style={{ transformOrigin: "left" }}
          >
            <div className="h-full bg-blue-600" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ x: -5 }}
              className="mb-6"
            >
              <Button 
                variant="ghost" 
                className="gap-2 group"
                onClick={() => navigate("/modules/module1")}
              >
                <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                Back to Module Overview
              </Button>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100 
              }}
              className="text-4xl font-bold text-blue-800 mb-6"
            >
              Module 1: Understanding Cryptocurrency
            </motion.h1>

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
                  variants={listItemVariants}
                  className="mt-4"
                >
                  In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary approach to money and value transfer. Before diving into specific cryptocurrencies or technical details, it's essential to understand what makes digital currencies unique and how they differ from traditional money systems.
                </motion.p>

                {/* Add DigitalCurrencyFeatures component for visual engagement */}
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="my-8"
                >
                  <DigitalCurrencyFeatures />
                </motion.div>
              </motion.section>

              {/* Update the Traditional Money vs. Cryptocurrency section with better visuals */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-blue-700">Understanding Traditional Money vs. Cryptocurrency</h2>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Traditional Money</h3>
                    <motion.ul variants={sectionVariants} className="space-y-2">
                      {[
                        "Physical cash for tangible transactions",
                        "Requires banks as intermediaries",
                        "Limited by geographical boundaries",
                        "Controlled by central authorities",
                        "Subject to traditional banking hours"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={listItemVariants}
                          className="flex items-center gap-2"
                        >
                          <span className="h-2 w-2 bg-blue-500 rounded-full" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className="p-6 bg-white rounded-lg shadow-md border-l-4 border-purple-500"
                  >
                    <h3 className="text-xl font-semibold text-purple-600 mb-4">Cryptocurrency</h3>
                    <motion.ul variants={sectionVariants} className="space-y-2">
                      {[
                        "Digital-native transactions",
                        "Peer-to-peer without intermediaries",
                        "Global accessibility 24/7",
                        "Decentralized governance",
                        "Programmable money features"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={listItemVariants}
                          className="flex items-center gap-2"
                        >
                          <span className="h-2 w-2 bg-purple-500 rounded-full" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </div>
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
                <motion.p variants={listItemVariants} className="mt-4">
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
                      variants={listItemVariants}
                      custom={index}
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
                  <motion.p variants={listItemVariants} className="mt-4">
                    One of cryptocurrency's most revolutionary aspects is its decentralized nature. Traditional financial systems operate through centralized authorities – banks, governments, and financial institutions. These entities control money creation, verify transactions, and maintain account balances.
                  </motion.p>
                  <motion.p variants={listItemVariants} className="mt-4">
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
                  <motion.p variants={listItemVariants} className="mt-4">
                    Before cryptocurrency, creating genuine scarcity in digital assets seemed impossible. Digital files could be copied infinitely without degradation. Bitcoin solved this through its blockchain technology and precise supply controls. For example, Bitcoin has a fixed maximum supply of 21 million coins, with a predetermined release schedule that can't be altered without network consensus.
                  </motion.p>
                  <motion.p variants={listItemVariants} className="mt-4">
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
                  <motion.p variants={listItemVariants} className="mt-4">
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
                        variants={listItemVariants}
                        custom={index}
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
                  <motion.p variants={listItemVariants} className="mt-4">
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
                        variants={listItemVariants}
                        custom={index}
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
                  <motion.p variants={listItemVariants} className="mt-4">
                    One of cryptocurrency's most significant achievements is solving the "double-spending" problem for digital money. In traditional digital systems, preventing someone from copying and reusing digital money required central authorities to track all transactions. Cryptocurrency solves this through its blockchain and network consensus mechanism.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    viewport={{ once: true }}
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
                  <motion.p variants={listItemVariants} className="mt-4">
                    Cryptocurrency provides financial services access to previously underserved populations:
                  </motion.p>
                  <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                    {[
                      "People without bank accounts",
                      "Residents of countries with unstable currencies",
                      "Individuals with limited access to traditional banking",
                      "International workers needing to send remittances"
                    ].map((item, index) => (
                      <motion.li key={index} variants={listItemVariants} custom={index}>
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
                  <motion.p variants={listItemVariants} className="mt-4">
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
                      <motion.li key={index} variants={listItemVariants} custom={index}>
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
                  <motion.p variants={listItemVariants} className="mt-4">
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
                      <motion.li key={index} variants={listItemVariants} custom={index}>
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
                      <motion.li key={index} variants={listItemVariants} className="mt-4">
                        <strong className="font-bold">{item.title}</strong>
                        <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                          {item.items.map((subItem, subIndex) => (
                            <motion.li key={subIndex} variants={listItemVariants} custom={subIndex}>
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
                      <motion.li key={index} variants={listItemVariants} className="mt-4">
                        <strong className="font-bold">{item.title}</strong>
                        <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                          {item.items.map((subItem, subIndex) => (
                            <motion.li key={subIndex} variants={listItemVariants} custom={subIndex}>
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
                <motion.p variants={listItemVariants} className="mt-4">
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
                    <motion.li key={index} variants={listItemVariants} custom={index}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.p variants={listItemVariants} className="mt-4">
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
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                      <p className="text-green-700">
                        🎉 Congratulations! You've completed the Introduction to Digital Currencies section. You now understand the fundamental concepts of digital currencies and their revolutionary potential.
                      </p>
                    </Card>
                  </motion.div>

                  <div className="flex flex-col space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setShowQuiz(!showQuiz)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="lg"
                      >
                        {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                      </Button>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                      <motion.div
                        whileHover={{ scale: 1.02, x: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full md:w-auto group"
                            onClick={() => navigate("/modules/module1")}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                            Back to Overview
                          </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                          <Button
                            size="lg"
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 group"
                            onClick={() => navigate("/modules/module1/security")}
                          >
                            Next Topic: Understanding Security
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                          </Button>
                      </motion.div>
                    </div>
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
        </motion.div>
      </AnimatePresence>
    </NavigationWrapper>
  );
}