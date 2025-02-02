import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Shield, AlertTriangle, TrendingUp, Lock } from "lucide-react";
import { SecurityQuiz } from "@/components/quizzes/SecurityQuiz";

const SecurityRisksSection = () => {
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
        updateProgress(3, 'security-risks', true);
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
        <SecurityQuiz />
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
          3.4 Security and Risk Management
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Smart Contract Security</h2>
              <p className="text-gray-700 mb-4">
                Smart contract interactions carry unique risks that must be carefully understood and 
                mitigated. Security in the blockchain space requires a comprehensive approach that 
                addresses both technical and economic vulnerabilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Technical Vulnerabilities</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Code bugs and exploits</li>
                    <li>Logic flaws</li>
                    <li>Integration failures</li>
                    <li>Upgrade risks</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Economic Attack Vectors</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Flash loan attacks</li>
                    <li>Price manipulation</li>
                    <li>Front-running</li>
                    <li>Governance attacks</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Risk Management Practices</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Prevention Measures</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Thorough auditing</li>
                      <li>Formal verification</li>
                      <li>Extensive testing</li>
                      <li>Gradual deployment</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Personal Security</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Hardware wallet usage</li>
                      <li>Regular security audits</li>
                      <li>Backup procedures</li>
                      <li>Emergency planning</li>
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
                  🎉 Congratulations! You've completed the Security and Risk Management section!
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
            path: "/modules/module3/investment-value",
            label: "Investment and Value"
          }}
          next={{
            path: "/modules/module3/quiz",
            label: "Module Quiz"
          }}
        />
      </div>
    </motion.div>
  );
};

export default SecurityRisksSection;