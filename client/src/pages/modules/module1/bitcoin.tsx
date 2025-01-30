import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import BitcoinQuiz from "@/components/modules/quizzes/BitcoinQuiz";
import BlockchainDiagram from "@/components/diagrams/BlockchainDiagram";

export default function BitcoinSection() {
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
        updateProgress(1, 'bitcoin', true);
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
      transition: {
        duration: 0.5,
      },
    },
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
          <Link href="/modules/module1/history-of-money">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to History of Money
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Bitcoin: The First Cryptocurrency
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="lead">
              Bitcoin, launched in 2009, marked the beginning of the cryptocurrency era. 
              It represented a radical departure from traditional forms of money and payment systems.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">The Genesis of Bitcoin</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Created by an anonymous person or group using the pseudonym Satoshi Nakamoto</li>
              <li>Whitepaper "Bitcoin: A Peer-to-Peer Electronic Cash System" published on October 31, 2008</li>
              <li>First Bitcoin block (the "genesis block") mined on January 3, 2009</li>
              <li>First real-world transaction: 10,000 BTC for two pizzas in May 2010</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Innovations</h2>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Decentralisation</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>No central authority controls Bitcoin</li>
              <li>Transactions are verified by a network of computers worldwide</li>
              <li>Eliminates the need for intermediaries like banks</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Blockchain Technology</h3>
            <BlockchainDiagram />
            <ul className="list-disc pl-5 space-y-3">
              <li>A public, distributed ledger that records all transactions</li>
              <li>Ensures transparency and prevents double-spending</li>
              <li>Each block contains a group of transactions and a reference to the previous block</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Proof-of-Work Consensus</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Miners compete to solve complex mathematical problems to add new blocks</li>
              <li>Ensures network security and distributes new bitcoins</li>
              <li>Requires significant computational power, leading to concerns about energy consumption</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">4. Limited Supply</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Maximum of 21 million bitcoins will ever exist</li>
              <li>New bitcoins are created through mining, with the rate halving approximately every four years</li>
              <li>Designed to be deflationary, contrasting with inflationary fiat currencies</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">5. Pseudonymity</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Users can transact without revealing their real-world identity</li>
              <li>Transactions are linked to Bitcoin addresses, not personal information</li>
              <li>Raises both privacy benefits and regulatory concerns</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Bitcoin's Monetary Policy</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Fixed supply schedule: Approximately 21 million bitcoins by the year 2140</li>
              <li>Block reward: Initially 50 BTC per block, halves every 210,000 blocks (roughly every 4 years)</li>
              <li>Current block reward (as of 2024): 3.125 BTC</li>
              <li>Halving events have historically led to increased scarcity and price volatility</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Notable Events in Bitcoin's History</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>2013: Bitcoin price surpasses $1,000 for the first time</li>
              <li>2014: Mt. Gox, the largest Bitcoin exchange, collapses due to a hack</li>
              <li>2017: Bitcoin reaches nearly $20,000, sparking widespread media attention</li>
              <li>2021: El Salvador becomes the first country to adopt Bitcoin as legal tender</li>
              <li>2021: Bitcoin reaches an all-time high of nearly $69,000</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Challenges and Controversies</h2>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Scalability</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Bitcoin network can process only about 7 transactions per second</li>
              <li>Led to debates and proposals for scaling solutions (e.g., Lightning Network)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Energy Consumption</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Bitcoin mining requires significant electricity</li>
              <li>Raises environmental concerns and debates about sustainability</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Regulatory Issues</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Different countries have taken varying approaches to regulating Bitcoin</li>
              <li>Concerns about its use in illegal activities and tax evasion</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 mt-6">4. Volatility</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>Bitcoin's price has been subject to dramatic fluctuations</li>
              <li>Challenges its use as a stable store of value or medium of exchange</li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Bitcoin's Impact and Legacy</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>Sparked the creation of thousands of other cryptocurrencies and blockchain projects</li>
              <li>Challenged traditional notions of money and financial systems</li>
              <li>Attracted significant institutional interest and investment</li>
              <li>Influenced discussions about monetary policy and the role of central banks</li>
              <li>Demonstrated the potential of blockchain technology beyond just digital currency</li>
            </ul>
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
                  🎉 You've completed the Bitcoin section! You now understand the fundamental 
                  concepts behind Bitcoin, its innovations, and its impact on the financial world.
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
                  <Link href="/modules/module1/history-of-money">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full md:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                    </Button>
                  </Link>

                  <Link href="/modules/module1/altcoins-tokens">
                    <Button 
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Next Topic: Altcoins and Tokens <ArrowRight className="ml-2 h-4 w-4" />
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
                  <BitcoinQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}