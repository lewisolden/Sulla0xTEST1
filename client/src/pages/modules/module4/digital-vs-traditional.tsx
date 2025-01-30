import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import DigitalMoneyDiagram from "@/components/diagrams/DigitalMoneyDiagram";

export default function DigitalVsTraditionalSection() {
  useScrollTop(); // This hook handles scrolling to top on navigation
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(4, 'digital-vs-traditional', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
          <Link href="/modules/module4">
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
          Digital vs Traditional Money
        </motion.h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-blue-700">Understanding Different Forms of Money</h2>
            <p className="lead">
              Let's explore the evolution of money from physical to digital forms, and understand
              how cryptocurrency represents the next step in this evolution.
            </p>

            <DigitalMoneyDiagram />

            <Card className="p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Traditional Physical Cash</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Can be physically held and directly exchanged</li>
                <li>Works without electricity or internet</li>
                <li>Limited to country of origin</li>
                <li>Can be permanently lost or destroyed</li>
                <li>Expensive to transport in large amounts</li>
                <li>Susceptible to counterfeiting</li>
              </ul>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Digital Cryptocurrency</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Exists as computer code</li>
                <li>Can't be physically destroyed</li>
                <li>Can be backed up</li>
                <li>Works globally with internet access</li>
                <li>Cannot be counterfeited</li>
                <li>Instant global transfers</li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold text-blue-600 mt-8">Real-World Example</h3>
            <Card className="p-6 mb-6">
              <p className="mb-4">Sending $1,000 to Family Overseas</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Traditional Method:</h4>
                  <ol className="list-decimal pl-5">
                    <li>Visit physical bank</li>
                    <li>Convert to another currency</li>
                    <li>Pay high fees</li>
                    <li>Wait days for delivery</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cryptocurrency Method:</h4>
                  <ol className="list-decimal pl-5">
                    <li>Open phone wallet</li>
                    <li>Send to recipient's address</li>
                    <li>Pay minimal fees</li>
                    <li>Arrives in minutes</li>
                  </ol>
                </div>
              </div>
            </Card>
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
                  🎉 Congratulations! You've completed the Digital vs Traditional Money section.
                  You now understand the key differences between physical and digital currencies.
                </p>
              </Card>

              <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                <Link href="/modules/module4">
                  <Button variant="outline" className="w-full md:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
                  </Button>
                </Link>

                <div className="flex gap-4 w-full md:w-auto">
                  <Link href="/modules/module4/digital-vs-traditional/quiz">
                    <Button 
                      variant="secondary"
                      className="gap-2"
                      disabled={!isFullyRead}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Topic Quiz
                    </Button>
                  </Link>

                  <Link href="/wallet-simulator">
                    <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                      Next Topic: Wallet Simulator <ArrowRight className="ml-2 h-4 w-4" />
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