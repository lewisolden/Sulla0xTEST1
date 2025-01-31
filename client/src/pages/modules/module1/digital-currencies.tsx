import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import DecentralizationDiagram from "@/components/diagrams/DecentralizationDiagram";
import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, SecurityIcon, WalletIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";

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
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Understanding Digital Currencies
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary 
              approach to money and value transfer. Before diving into specific cryptocurrencies or 
              technical details, it's essential to understand what makes digital currencies unique 
              and how they differ from traditional money systems.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Understanding Traditional Money vs. Cryptocurrency</h2>
            <p>
              Think about the cash in your wallet or the money in your bank account. Traditional money exists in two main forms: 
              physical cash and digital bank balances. Physical cash offers immediate, tangible transactions but comes with 
              limitations like physical degradation, security risks, and geographical restrictions. Digital bank money, while more 
              convenient for many transactions, relies entirely on banks and financial institutions as intermediaries.
            </p>
            <p>
              Cryptocurrency introduces a fundamentally different approach. It exists purely as digital information, but unlike 
              the numbers in your bank account, it doesn't represent a claim on a bank or institution. Instead, cryptocurrency 
              operates through a decentralized network of computers, using advanced cryptography to ensure security and verify transactions.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">The Evolution of Money</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Barter systems required direct exchange of goods</li>
              <li>Precious metals provided portable, divisible value</li>
              <li>Paper money offered convenient value representation</li>
              <li>Digital banking enabled electronic transfers</li>
              <li>Cryptocurrency introduces programmable, borderless money</li>
            </ul>
            <p>
              Each evolution solved previous limitations while introducing new capabilities. 
              Cryptocurrency represents the latest step in this evolution, addressing many traditional 
              financial system limitations while introducing new considerations and risks.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Core Concepts</h2>

            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <DecentralizationIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Decentralization</h3>
              </div>
              <p>
                One of cryptocurrency's most revolutionary aspects is its decentralized nature. Traditional 
                financial systems operate through centralized authorities – banks, governments, and financial 
                institutions. These entities control money creation, verify transactions, and maintain account balances.
              </p>
              <DecentralizationDiagram />
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <BlockchainIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Digital Scarcity</h3>
              </div>
              <p>
                Before cryptocurrency, creating genuine scarcity in digital assets seemed impossible. Digital files 
                could be copied infinitely without degradation. Bitcoin solved this through its blockchain technology 
                and precise supply controls. For example, Bitcoin has a fixed maximum supply of 21 million coins, 
                with a predetermined release schedule that can't be altered without network consensus.
              </p>
              <TransactionFlowDiagram />
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Security Features</h2>

            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <SecurityIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Cryptographic Foundations</h3>
              </div>
              <p>
                Cryptocurrency security relies on advanced cryptography, specifically public-key cryptography. 
                This system uses pairs of keys:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>A private key (like your secret password)</li>
                <li>A public key (like your public email address)</li>
              </ul>
              <DoubleSpendDiagram />
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Storage and Access Security</h3>
              </div>
              <h4 className="text-xl font-semibold mb-2">Hot Wallets (Online):</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mobile applications</li>
                <li>Desktop software</li>
                <li>Web-based services</li>
              </ul>
              <p className="mt-2 text-sm">Suitable for small amounts and frequent transactions</p>

              <h4 className="text-xl font-semibold mt-4 mb-2">Cold Storage (Offline):</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hardware wallets</li>
                <li>Paper wallets</li>
                <li>Air-gapped computers</li>
              </ul>
              <p className="mt-2 text-sm">Recommended for larger holdings and long-term storage</p>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Risk Considerations</h2>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">Market Volatility</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Market sentiment impacts</li>
              <li>Regulatory news effects</li>
              <li>Technology development influence</li>
              <li>Market manipulation risks</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">Security Risks</h3>
            <div className="ml-4">
              <h4 className="text-xl font-semibold mt-4 mb-2">1. Personal Security Risks:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Private key loss or theft</li>
                <li>Phishing attacks</li>
                <li>Social engineering attempts</li>
                <li>Malware threats</li>
              </ul>

              <h4 className="text-xl font-semibold mt-4 mb-2">2. Technical Risks:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Software vulnerabilities</li>
                <li>Network attacks</li>
                <li>Smart contract exploits</li>
                <li>Exchange security breaches</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Practical Applications</h2>

            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600">Financial Inclusion</h3>
              <p>Cryptocurrency provides financial services access to previously underserved populations:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>People without bank accounts</li>
                <li>Residents of countries with unstable currencies</li>
                <li>Individuals with limited access to traditional banking</li>
                <li>International workers needing to send remittances</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600">Payment Efficiency</h3>
              <ul className="list-disc pl-5 mt-2">
                <li>Near-instant transfers globally</li>
                <li>Lower transaction fees</li>
                <li>24/7 operation</li>
                <li>No intermediary requirements</li>
                <li>Programmable payment options</li>
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
                  🎉 Congratulations! You've completed the Introduction to Digital Currencies section.
                  You now understand the fundamental concepts of digital currencies and their revolutionary potential.
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
                      Next Topic: Understanding Security 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {showQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <DigitalCurrenciesQuiz />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}