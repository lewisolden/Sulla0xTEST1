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
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Introduction</h2>
              <p className="lead">
                In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary 
                approach to money and value transfer. Before diving into specific cryptocurrencies or 
                technical details, it's essential to understand what makes digital currencies unique 
                and how they differ from traditional money systems.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-blue-700">Understanding Traditional Money vs. Cryptocurrency</h2>
              <p>
                Think about the cash in your wallet or the money in your bank account. Traditional money 
                exists in two main forms: physical cash and digital bank balances. While physical cash 
                offers immediate, tangible transactions, it comes with limitations like physical degradation, 
                security risks, and geographical restrictions. Digital bank money, while more convenient 
                for many transactions, relies entirely on banks and financial institutions as intermediaries.
              </p>
              <p>
                Cryptocurrency introduces a fundamentally different approach. It exists purely as digital 
                information, but unlike the numbers in your bank account, it doesn't represent a claim 
                on a bank or institution. Instead, cryptocurrency operates through a decentralized network 
                of computers, using advanced cryptography to ensure security and verify transactions.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue-700">Core Concepts</h2>

              <motion.div 
                variants={sectionVariants}
                className="mt-6 p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <DecentralizationIcon size={32} className="text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Decentralization: A New Paradigm</h3>
                </div>
                <p>
                  Unlike traditional financial systems controlled by central authorities, cryptocurrencies 
                  operate through a network of computers running specialized blockchain software, ensuring 
                  transparency and removing single points of failure.
                </p>
                <DecentralizationDiagram />
              </motion.div>

              <motion.div 
                variants={sectionVariants}
                className="mt-8 p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <BlockchainIcon size={32} className="text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Digital Scarcity</h3>
                </div>
                <p>
                  Before cryptocurrency, creating genuine scarcity in digital assets seemed impossible. 
                  Digital files could be copied infinitely without degradation. Bitcoin solved this 
                  through its blockchain technology and precise supply controls.
                </p>
                <TransactionFlowDiagram />
              </motion.div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue-700">Security Features</h2>

              <motion.div 
                variants={sectionVariants}
                className="mt-6 p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <SecurityIcon size={32} className="text-blue-600" />
                  <h3 className="text-2xl font-semibold text-blue-600">Cryptographic Protection</h3>
                </div>
                <p>
                  Cryptocurrency security relies on advanced cryptography, specifically public-key 
                  cryptography. This system uses pairs of keys: a private key (like your secret password) 
                  and a public key (like your public email address).
                </p>
                <DoubleSpendDiagram />
              </motion.div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-blue-700">Practical Applications</h2>

              <motion.div 
                variants={sectionVariants}
                className="mt-6 p-6 bg-white rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-semibold text-blue-600">Financial Inclusion</h3>
                <p>Cryptocurrency provides financial services access to previously underserved populations:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>People without bank accounts</li>
                  <li>Residents of countries with unstable currencies</li>
                  <li>Individuals with limited access to traditional banking</li>
                  <li>International workers needing to send remittances</li>
                </ul>
              </motion.div>
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
                      transition={{ duration: 0.5 }}
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
      </motion.div>
    </AnimatePresence>
  );
}