import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft, Wallet, Shield, Brain, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import WalletSimulator from "@/components/exercises/WalletSimulator";
import SecurityWorkshop from "@/components/exercises/SecurityWorkshop";
import AssessmentCenter from "@/components/exercises/AssessmentCenter";

const ExercisePreview = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: any;
  title: string;
  description: string;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden ${className}`}
  >
    <Card className="p-4 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <Icon className="h-6 w-6 text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function ModuleExercises() {
  useScrollTop();
  const [activeTab, setActiveTab] = useState("wallet");

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-6">
            <Link href="/modules/module2">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <motion.h1 className="text-4xl font-bold text-blue-800 mb-6">
            Module 2: Practical Exercises - Bitcoin Deep Dive
          </motion.h1>

          <Card className="p-6">
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Welcome to the practical exercises section of Module 2. Here you'll get hands-on experience with Bitcoin concepts through interactive simulations, security workshops, and real-world assessments.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 gap-4 bg-muted p-2">
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Wallet Practice
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security Workshop
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Assessment Center
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallet">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <WalletSimulator />
                </motion.div>
              </TabsContent>

              <TabsContent value="security">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <SecurityWorkshop />
                </motion.div>
              </TabsContent>

              <TabsContent value="assessment">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <AssessmentCenter />
                </motion.div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <ExercisePreview
                icon={Wallet}
                title="Interactive Wallet Simulation"
                description="Practice creating and managing a Bitcoin wallet in a safe environment. Learn about key management, transactions, and security best practices."
              />
              <ExercisePreview
                icon={Shield}
                title="Security Best Practices"
                description="Test your knowledge of security protocols and learn to identify common threats and scams in the cryptocurrency space."
              />
              <ExercisePreview
                icon={Brain}
                title="Knowledge Assessment"
                description="Evaluate your understanding of Bitcoin concepts through interactive quizzes and real-world scenarios."
              />
            </div>
          </Card>

          <div className="mt-8 flex justify-between">
            <Link href="/modules/module2/bitcoin-investment">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous: Bitcoin Investment
              </Button>
            </Link>
            <div className="space-x-4">
              <Button
                className="gap-2"
                onClick={() => setActiveTab("security")}
              >
                Continue to Security Workshop
                <Shield className="h-4 w-4" />
              </Button>
              <Link href="/modules/module2/quiz">
                <Button variant="default" className="gap-2">
                  Take Module Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}