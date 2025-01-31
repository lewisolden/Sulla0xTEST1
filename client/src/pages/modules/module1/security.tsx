import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Shield, Key, Wallet } from "lucide-react";
import SecurityQuiz from "@/components/quizzes/SecurityQuiz";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import { SecurityThreats } from "@/components/diagrams/SecurityThreats";

export default function SecurityPage() {
  const [showQuiz, setShowQuiz] = useState(false);

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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 1
            </Button>
          </Link>
          <Link href="/modules/module1/digital-currencies">
            <Button variant="ghost" className="gap-2">
              Back to Digital Currencies <ArrowRight className="h-4 w-4" />
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

          {!showQuiz ? (
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
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

              {/* Topic Navigation */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                <Link href="/modules/module1/digital-currencies">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group"
                  >
                    Back to Topic: Introduction to Digital Currency
                    <ArrowLeft className="ml-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/modules/module1/cryptography">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto group"
                  >
                    Next Topic: Cryptography
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Quiz Button */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  Take the Quiz
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-800">Security Quiz</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowQuiz(false)}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Content
                </Button>
              </div>
              <SecurityQuiz />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}