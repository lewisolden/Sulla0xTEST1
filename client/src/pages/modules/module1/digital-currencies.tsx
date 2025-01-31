import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import DecentralizationDiagram from "@/components/diagrams/DecentralizationDiagram";
import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";

export default function DigitalCurrenciesSection() {
  useScrollTop();
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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
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
        stiffness: 100,
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  return (
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
          animate={{ scaleX: scrollProgress / 100 }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-full bg-blue-600" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-blue-800 mb-6"
          >
            Module 1: Understanding Cryptocurrency - A Comprehensive Guide
          </motion.h1>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            {/* Introduction Section */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Introduction to Digital Currency</h2>
              <p className="mt-4">
                In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary approach to money and value transfer. Before diving into specific cryptocurrencies or technical details, it's essential to understand what makes digital currencies unique and how they differ from traditional money systems.
              </p>
            </motion.section>

            {/* Understanding Traditional Money vs. Cryptocurrency */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Understanding Traditional Money vs. Cryptocurrency</h2>
              <p className="mt-4">
                Think about the cash in your wallet or the money in your bank account. Traditional money exists in two main forms: physical cash and digital bank balances. Physical cash offers immediate, tangible transactions but comes with limitations like physical degradation, security risks, and geographical restrictions. Digital bank money, while more convenient for many transactions, relies entirely on banks and financial institutions as intermediaries.
              </p>
              <p className="mt-4">
                Cryptocurrency introduces a fundamentally different approach. It exists purely as digital information, but unlike the numbers in your bank account, it doesn't represent a claim on a bank or institution. Instead, cryptocurrency operates through a decentralized network of computers, using advanced cryptography to ensure security and verify transactions.
              </p>
            </motion.section>

            {/* The Evolution of Money */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">The Evolution of Money</h2>
              <p className="mt-4">To understand cryptocurrency's significance, consider how money has evolved:</p>
              <motion.ul
                variants={sectionVariants}
                className="list-disc pl-5 space-y-2 mt-4"
              >
                <li>Barter systems required direct exchange of goods</li>
                <li>Precious metals provided portable, divisible value</li>
                <li>Paper money offered convenient value representation</li>
                <li>Digital banking enabled electronic transfers</li>
                <li>Cryptocurrency introduces programmable, borderless money</li>
              </motion.ul>
              <p className="mt-4">
                Each evolution solved previous limitations while introducing new capabilities. Cryptocurrency represents the latest step in this evolution, addressing many traditional financial system limitations while introducing new considerations and risks.
              </p>
            </motion.section>

            {/* Core Concepts and Features */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Core Concepts and Features</h2>

              <motion.div variants={sectionVariants} className="mt-6">
                <h3 className="text-2xl font-semibold text-blue-600">Decentralization: A New Paradigm</h3>
                <p className="mt-4">
                  One of cryptocurrency's most revolutionary aspects is its decentralized nature. Traditional financial systems operate through centralized authorities – banks, governments, and financial institutions. These entities control money creation, verify transactions, and maintain account balances.
                </p>
                <p className="mt-4">
                  Cryptocurrency works differently. Instead of relying on central authorities, it uses a network of computers running specialized software. This network collectively maintains and verifies all transactions through a system called blockchain. Think of it as a shared digital ledger that everyone can see but no one can alter without network consensus.
                </p>
                <DecentralizationDiagram />
              </motion.div>

              <motion.div variants={sectionVariants} className="mt-8">
                <h3 className="text-2xl font-semibold text-blue-600">Digital Scarcity: A Breakthrough Innovation</h3>
                <p className="mt-4">
                  Before cryptocurrency, creating genuine scarcity in digital assets seemed impossible. Digital files could be copied infinitely without degradation. Bitcoin solved this through its blockchain technology and precise supply controls. For example, Bitcoin has a fixed maximum supply of 21 million coins, with a predetermined release schedule that can't be altered without network consensus.
                </p>
                <p className="mt-4">
                  This digital scarcity creates value similarly to how limited resources like gold or fine art maintain value. Unlike traditional currency, which central banks can print at will, cryptocurrency supply is often mathematically guaranteed and transparent.
                </p>
              </motion.div>
            </motion.section>

            {/* Understanding Cryptocurrency Security */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Understanding Cryptocurrency Security</h2>

              <motion.div variants={sectionVariants} className="mt-6">
                <h3 className="text-2xl font-semibold text-blue-600">Cryptographic Foundations</h3>
                <p className="mt-4">
                  Cryptocurrency security relies on advanced cryptography, specifically public-key cryptography. This system uses pairs of keys:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>A private key (like your secret password)</li>
                  <li>A public key (like your public email address)</li>
                </ul>
                <p className="mt-4">
                  The private key generates valid signatures for transactions, while the public key allows others to verify these signatures. This system creates a secure, mathematically verified way to prove ownership and authorize transactions without requiring trust in third parties.
                </p>
              </motion.div>

              <motion.div variants={sectionVariants} className="mt-8">
                <h3 className="text-2xl font-semibold text-blue-600">The Double-Spending Solution</h3>
                <p className="mt-4">
                  One of cryptocurrency's most significant achievements is solving the "double-spending" problem for digital money. In traditional digital systems, preventing someone from copying and reusing digital money required central authorities to track all transactions. Cryptocurrency solves this through its blockchain and network consensus mechanism.
                </p>
                <DoubleSpendDiagram />
              </motion.div>
            </motion.section>

            {/* Practical Applications */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Practical Applications</h2>

              <motion.div variants={sectionVariants} className="mt-6">
                <h3 className="text-2xl font-semibold text-blue-600">Financial Inclusion</h3>
                <p className="mt-4">
                  Cryptocurrency provides financial services access to previously underserved populations:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>People without bank accounts</li>
                  <li>Residents of countries with unstable currencies</li>
                  <li>Individuals with limited access to traditional banking</li>
                  <li>International workers needing to send remittances</li>
                </ul>
              </motion.div>

              <motion.div variants={sectionVariants} className="mt-8">
                <h3 className="text-2xl font-semibold text-blue-600">Payment Efficiency</h3>
                <p className="mt-4">
                  Cryptocurrency offers several advantages for payments:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Near-instant transfers globally</li>
                  <li>Lower transaction fees</li>
                  <li>24/7 operation</li>
                  <li>No intermediary requirements</li>
                  <li>Programmable payment options</li>
                </ul>
              </motion.div>
            </motion.section>

            {/* Getting Started Safely */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Getting Started Safely</h2>

              <motion.div variants={sectionVariants} className="mt-6">
                <h3 className="text-2xl font-semibold text-blue-600">First Steps</h3>
                <ol className="list-decimal pl-5 mt-2">
                  <li>
                    <strong>Education First:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Understand basic concepts</li>
                      <li>Learn security principles</li>
                      <li>Study market dynamics</li>
                      <li>Review risk factors</li>
                    </ul>
                  </li>
                  <li className="mt-4">
                    <strong>Start Small:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Use small amounts initially</li>
                      <li>Practice with test networks</li>
                      <li>Learn wallet management</li>
                      <li>Understand transaction processes</li>
                    </ul>
                  </li>
                </ol>
              </motion.div>

              <motion.div variants={sectionVariants} className="mt-8">
                <h3 className="text-2xl font-semibold text-blue-600">Security Best Practices</h3>
                <ol className="list-decimal pl-5 mt-2">
                  <li>
                    <strong>Essential Security Measures:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Use strong passwords</li>
                      <li>Enable two-factor authentication</li>
                      <li>Maintain secure backups</li>
                      <li>Keep software updated</li>
                      <li>Verify all transactions</li>
                    </ul>
                  </li>
                  <li className="mt-4">
                    <strong>Advanced Protection:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Hardware wallet usage</li>
                      <li>Multi-signature setups</li>
                      <li>Cold storage implementation</li>
                      <li>Regular security audits</li>
                    </ul>
                  </li>
                </ol>
              </motion.div>
            </motion.section>

            {/* Conclusion */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Conclusion and Next Steps</h2>
              <p className="mt-4">
                Understanding cryptocurrency requires balancing its revolutionary potential with practical risks and limitations. As you continue learning, remember:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Start with fundamentals before advancing</li>
                <li>Prioritize security in all activities</li>
                <li>Stay informed about developments</li>
                <li>Practice with small amounts first</li>
                <li>Maintain proper risk management</li>
              </ul>
              <p className="mt-4">
                The cryptocurrency space continues evolving, making ongoing education essential for safe and effective participation.
              </p>
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
                    🎉 Congratulations! You've completed the Introduction to Digital Currencies section. You now understand the fundamental concepts of digital currencies and their revolutionary potential.
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
                    <Link href="/modules/module1">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full md:w-auto"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
                      </Button>
                    </Link>

                    <Link href="/modules/module1/security">
                      <Button
                        size="lg"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                      >
                        Next Topic: Understanding Security <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
  );
}