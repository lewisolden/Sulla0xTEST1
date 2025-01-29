import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DigitalRevolutionDiagram from "@/components/diagrams/DigitalRevolutionDiagram";
import DigitalCurrencyFeatures from "@/components/diagrams/DigitalCurrencyFeatures";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz"; // Import the quiz component


export default function DigitalCurrenciesSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false); // State for the quiz
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
          Introduction to Digital Currencies: The Dawn of a New Financial Era
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p>
              Imagine a world where you can send money to anyone, anywhere, at any time, without needing a bank. A world where you have complete control over your finances, free from government interference or corporate oversight. A world where the very nature of money itself is being redefined. This isn't science fiction—it's the world of digital currencies, and it's happening right now.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">The Digital Revolution of Money</h2>
            <DigitalRevolutionDiagram />
            <p>
              Just as the internet revolutionised information, digital currencies are transforming the very fabric of our financial systems. But what exactly are digital currencies? At their core, they're a new form of money designed for the digital age—intangible, yet as real and valuable as the cash in your wallet.
            </p>
            <p>
              Digital currencies come in various forms, from the cryptocurrencies that make headlines to the less-known virtual currencies used in online games. But it's cryptocurrencies like Bitcoin that have truly captured the world's imagination, promising a future where financial transactions are as easy as sending an email.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">More Than Just Money</h2>
            <p>
              But digital currencies are about more than just a new way to pay for things. They represent a fundamental shift in how we think about money, value, and trust in the digital age.
            </p>
            <DigitalCurrencyFeatures />
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Decentralisation:</strong> Many digital currencies operate on decentralised networks, free from the control of any single entity. This means no central bank, no CEO, and no single point of failure.
              </li>
              <li>
                <strong>Transparency:</strong> Transactions are often recorded on public ledgers, viewable by anyone. This level of transparency was unthinkable in traditional financial systems.
              </li>
              <li>
                <strong>Programmable Money:</strong> Some digital currencies, like Ethereum, allow for "smart contracts"—self-executing agreements that can automate complex financial transactions.
              </li>
              <li>
                <strong>Global Access:</strong> Digital currencies have the potential to provide financial services to the billions of people worldwide who don't have access to traditional banking.
              </li>
            </ul>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">Challenges and Controversies</h2>
            <p>
              Of course, this brave new world of digital currencies isn't without its challenges. Volatile prices, regulatory uncertainties, and concerns about illegal activities have all made headlines. Critics argue that cryptocurrencies are a bubble, a fad, or worse.
            </p>
            <p>
              But supporters see these as growing pains of a technology that could be as transformative as the internet itself. They point to the underlying blockchain technology, which has applications far beyond just digital money.
            </p>
          </motion.section>

          <motion.section
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-700 mt-8">The Future is Digital</h2>
            <p>
              Whether digital currencies will replace traditional money entirely is yet to be seen. But one thing is clear: they're already changing the way we think about finance, technology, and the nature of trust in the digital age.
            </p>
            <p>
              As we embark on this journey to understand digital currencies, we'll explore their history, their underlying technology, and their potential to reshape our financial future. We'll separate fact from fiction, hype from reality, and explore both the promises and pitfalls of this revolutionary technology.
            </p>
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
                  🎉 You've completed the Introduction to Digital Currencies section! You now understand the fundamental concepts and potential impact of digital currencies.
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

                  <Link href="/modules/module1/history-of-money">
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Next Topic: History of Money <ArrowRight className="ml-2 h-4 w-4" />
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
                  <DigitalCurrenciesQuiz />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}