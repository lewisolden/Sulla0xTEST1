import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Shield, Key, Wallet } from "lucide-react";
import { SecurityQuiz } from "@/components/quizzes/SecurityQuiz";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import { SecurityThreats } from "@/components/diagrams/SecurityThreats";

export default function SecurityPage() {
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
        updateProgress(1, 'security', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            Understanding Cryptocurrency Security
          </h1>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            {/* Security Overview Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Key Security Concepts</h2>
              </div>
              <SecurityDiagram />
            </Card>

            {/* Security Threats Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Key className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Security Threats & Vulnerabilities</h2>
              </div>
              <SecurityThreats />
            </Card>

            {/* Best Practices Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Best Practices</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Creating and managing strong passwords</li>
                <li>Hardware wallet usage and storage</li>
                <li>Regular security audits and updates</li>
                <li>Safe transaction verification procedures</li>
                <li>Offline storage strategies for large holdings</li>
              </ul>
            </Card>

            {isFullyRead && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                  <p className="text-green-700">
                    🎉 Congratulations! You've completed the Security section!
                  </p>
                </Card>

                <Button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
                </Button>

                {showQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mt-4">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                        <SecurityQuiz />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="flex justify-between mt-4">
                  <Link href="/modules/module1/digital-currencies">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Previous Topic
                    </Button>
                  </Link>
                  <Link href="/modules/module1/applications">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 gap-2"
                    >
                      Next Topic
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}