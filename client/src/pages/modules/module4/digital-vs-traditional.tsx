import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  Banknote,
  Globe2,
  Zap,
  Shield,
  Wallet,
  RefreshCw,
  Wifi,
  BanknoteIcon,
  Clock,
  AlertTriangle
} from "lucide-react";
import DigitalMoneyDiagram from "@/components/diagrams/DigitalMoneyDiagram";

export default function DigitalVsTraditionalSection() {
  useScrollTop(); 
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
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Banknote className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Can be physically held and directly exchanged</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Works without electricity or internet</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Limited to country of origin</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Can be permanently lost or destroyed</span>
                </div>
                <div className="flex items-center gap-3">
                  <BanknoteIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Expensive to transport in large amounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Susceptible to counterfeiting</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Digital Cryptocurrency</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Exists as computer code</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Can't be physically destroyed</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Can be backed up</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Works globally with internet access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Cannot be counterfeited</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span>Instant global transfers</span>
                </div>
              </div>
            </Card>

            <h3 className="text-2xl font-semibold text-blue-600 mt-8">Real-World Example</h3>
            <Card className="p-6 mb-6">
              <p className="mb-4">Sending $1,000 to Family Overseas</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Traditional Method:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BanknoteIcon className="h-5 w-5 text-blue-500" />
                      <span>Visit physical bank</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-blue-500" />
                      <span>Convert to another currency</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-blue-500" />
                      <span>Pay high fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span>Wait days for delivery</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cryptocurrency Method:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-blue-500" />
                      <span>Open phone wallet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span>Send to recipient's address</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BanknoteIcon className="h-5 w-5 text-blue-500" />
                      <span>Pay minimal fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span>Arrives in minutes</span>
                    </div>
                  </div>
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