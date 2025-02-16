import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { TrendingUp, Users, Code, Coins, Activity, Lock, Shield, Zap } from "lucide-react";
import InvestmentValueQuiz from "@/components/quizzes/InvestmentValueQuiz";
import { useScrollTop } from "@/hooks/useScrollTop";
import { EthereumStakingExercise } from "@/components/modules/exercises/EthereumStakingExercise";

const InvestmentValueSection = () => {
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
        />
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

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">What Makes Ethereum Valuable?</h3>
                <p className="text-gray-700 mb-4">
                  Think of Ethereum like a global computer that anyone can use. Just as the internet 
                  revolutionized information sharing, Ethereum is revolutionizing how we handle digital 
                  value and agreements. Its value comes from its utility and growing network of users 
                  and developers.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Real-World Analogy:</h4>
                  <p className="text-gray-600">
                    Imagine a city where buildings are smart contracts, roads are blockchain networks, 
                    and ETH is the electricity powering everything. The more businesses (applications) 
                    and people (users) move into the city, the more valuable the entire ecosystem becomes.
                  </p>
                </div>
              </div>

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
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Active Developers:</span>
                      <p className="text-sm mt-1">Largest blockchain developer community building new applications daily</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Development Tools:</span>
                      <p className="text-sm mt-1">Rich set of tools and frameworks making development easier</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Innovation:</span>
                      <p className="text-sm mt-1">Continuous improvements and new features being added</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Documentation:</span>
                      <p className="text-sm mt-1">Extensive resources and community support</p>
                    </div>
                  </div>
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
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">User Growth:</span>
                      <p className="text-sm mt-1">More users mean more valuable applications and services</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Application Diversity:</span>
                      <p className="text-sm mt-1">From finance to gaming, increasing use cases</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Network Security:</span>
                      <p className="text-sm mt-1">More participants strengthen the network's security</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <span className="font-semibold">Market Liquidity:</span>
                      <p className="text-sm mt-1">Easier to buy and sell with more trading activity</p>
                    </div>
                  </div>
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
                    <h3 className="text-xl font-semibold text-blue-700">Understanding ETH Supply</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">How New ETH is Created</h4>
                      <p className="text-gray-700 mb-2">
                        Unlike Bitcoin's fixed supply, Ethereum's supply model is dynamic:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          <span className="font-semibold">Staking Rewards:</span>
                          <p className="text-sm mt-1">Validators earn new ETH for helping secure the network</p>
                        </li>
                        <li>
                          <span className="font-semibold">Fee Burning:</span>
                          <p className="text-sm mt-1">Part of transaction fees is permanently removed from supply</p>
                        </li>
                        <li>
                          <span className="font-semibold">Balance:</span>
                          <p className="text-sm mt-1">The interplay between new ETH creation and burning can make ETH deflationary</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Staking: Earning from Your ETH</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">How Staking Works</h4>
                      <p className="text-gray-700 mb-2">
                        Staking is like putting your money in a savings account that helps secure the network:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Solo Staking:</span>
                          <p className="text-sm mt-1">Run your own validator with 32 ETH minimum</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Pooled Staking:</span>
                          <p className="text-sm mt-1">Join others to stake with any amount</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Rewards:</span>
                          <p className="text-sm mt-1">Earn regular ETH rewards for participation</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Security:</span>
                          <p className="text-sm mt-1">Your stake helps protect the network</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add ETH Staking Exercise */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-8"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                      Try It Yourself: ETH Staking Simulator
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get hands-on experience with ETH staking through our interactive simulator. 
                      Learn about different staking options, calculate potential rewards, and 
                      understand the requirements and risks involved.
                    </p>
                    <EthereumStakingExercise />
                  </div>
                </motion.div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Investment Considerations</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">What to Consider Before Investing</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Market Volatility:</span>
                          <p className="text-sm mt-1">Prices can change significantly in short periods</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Technology Risk:</span>
                          <p className="text-sm mt-1">New upgrades and changes can affect value</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Regulatory Environment:</span>
                          <p className="text-sm mt-1">Government policies can impact adoption</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <span className="font-semibold">Long-term Potential:</span>
                          <p className="text-sm mt-1">Consider the growing ecosystem and adoption</p>
                        </div>
                      </div>
                    </div>
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