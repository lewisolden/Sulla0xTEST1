import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Wrench, Code, BookOpen, Award } from "lucide-react";

export default function ExercisesPage() {
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
        updateProgress(3, 'exercises', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
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
          Module 3: Practical Exercises
        </motion.h1>

        <div className="space-y-8">
          {/* Exercise 1 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Exercise 1: Ethereum Wallet Setup and Security</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Basic Wallet Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Wallet Creation and Management</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Install MetaMask extension</li>
                    <li>Create new wallet</li>
                    <li>Secure recovery phrase</li>
                    <li>Configure security settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Network Configuration</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Add test networks</li>
                    <li>Switch between networks</li>
                    <li>Understand gas settings</li>
                    <li>Manage network connections</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Exercise 2 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Exercise 2: Smart Contract Development</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600">Development Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Contract Development</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Write simple contracts</li>
                    <li>Test and debug</li>
                    <li>Deploy to testnet</li>
                    <li>Verify contracts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Smart Contract Interaction</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Connect to contracts</li>
                    <li>Call functions</li>
                    <li>Handle events</li>
                    <li>Monitor transactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Project */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Project: Build a DeFi Application</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Project Components</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Smart contract development</li>
                    <li>Frontend integration</li>
                    <li>Web3 connectivity</li>
                    <li>Transaction handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced Features</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Token integration</li>
                    <li>Wallet connection</li>
                    <li>State management</li>
                    <li>Error handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Assessment */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-700">Assessment</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Evaluation Criteria</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Code quality</li>
                    <li>Security practices</li>
                    <li>Documentation</li>
                    <li>Testing coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Deliverables</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Working application</li>
                    <li>Source code</li>
                    <li>Documentation</li>
                    <li>Test results</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Module 3 Practical Exercises section!
              </p>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3/security-risks",
            label: "Security and Risk Management"
          }}
          next={{
            path: "/modules/module3/quiz",
            label: "Module Quiz"
          }}
        />
      </div>
    </div>
  );
}