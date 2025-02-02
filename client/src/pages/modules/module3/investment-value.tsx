import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { TrendingUp, Users, Code, Coins } from "lucide-react";
import InvestmentValueQuiz from "@/components/quizzes/InvestmentValueQuiz";

const InvestmentValueSection = () => {
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
        updateProgress(3, 'investment-value', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => setShowQuiz(false)}
          className="mb-6"
          variant="outline"
        >
          ← Back to Content
        </Button>
        <InvestmentValueQuiz />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.3 Investment and Value Proposition
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Understanding Ethereum's Value</h2>
              <p className="text-gray-700 mb-4">
                Ethereum's value derives from its utility and network effects. The platform's ability to 
                support diverse applications and its growing ecosystem contribute to its fundamental value 
                proposition.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-blue-50 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Developer Ecosystem</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Largest blockchain developer community</li>
                    <li>Extensive tooling and documentation</li>
                    <li>Regular protocol improvements</li>
                    <li>Active research and development</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-50 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Network Effects</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Growing user base</li>
                    <li>Increasing application diversity</li>
                    <li>Enhanced platform utility</li>
                    <li>Strengthening network security</li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Economic Model</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Coins className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Supply Mechanics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Proof of Stake rewards</li>
                      <li>EIP-1559 fee burning</li>
                      <li>Reduced issuance</li>
                      <li>Deflationary potential</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Staking Economics</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Validator rewards</li>
                      <li>Network security incentives</li>
                      <li>Participation incentives</li>
                      <li>Yield opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </Card>

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <div className="flex flex-col items-center">
                <p className="text-green-700 mb-4">
                  🎉 Congratulations! You've completed the Investment and Value Proposition section!
                </p>
                <Button
                  onClick={startQuiz}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Take Section Quiz
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3/smart-contracts",
            label: "Smart Contract Development"
          }}
          next={{
            path: "/modules/module3/security-risks",
            label: "Security and Risk Management"
          }}
        />
      </div>
    </motion.div>
  );
};

export default InvestmentValueSection;