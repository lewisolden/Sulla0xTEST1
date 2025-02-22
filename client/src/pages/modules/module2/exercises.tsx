import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Wallet, Shield, Brain, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import WalletSimulator from "@/components/exercises/WalletSimulator";
import SecurityWorkshop from "@/components/exercises/SecurityWorkshop";
import AssessmentCenter from "@/components/exercises/AssessmentCenter";

const ExerciseSection = ({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  description: string;
  icon: any;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-8 ${className}`}
  >
    <Card className="p-6 bg-gradient-to-br from-orange-50 via-white to-red-50 border-2 border-transparent hover:border-orange-200 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-orange-600" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </Card>
  </motion.div>
);

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
    <Card className="p-4 h-full bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-200">
      <div className="flex items-start gap-3">
        <Icon className="h-6 w-6 text-orange-600 mt-1" />
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

          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Brain className="h-8 w-8" />
              Practical Exercises & Simulations
            </h1>
            <p className="text-orange-100 text-lg">
              Apply your Bitcoin knowledge through hands-on wallet management, security training, and real-world scenarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
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

          <div className="space-y-8">
            <ExerciseSection
              title="Wallet Practice"
              description="Get hands-on experience with Bitcoin wallet management in a risk-free environment."
              icon={Wallet}
            >
              <WalletSimulator />
            </ExerciseSection>

            <ExerciseSection
              title="Security Workshop"
              description="Learn and practice essential security measures to protect your cryptocurrency assets."
              icon={Shield}
            >
              <SecurityWorkshop />
            </ExerciseSection>

            <ExerciseSection
              title="Assessment Center"
              description="Test your knowledge and understanding of Bitcoin concepts through practical scenarios."
              icon={Brain}
            >
              <AssessmentCenter />
            </ExerciseSection>
          </div>

          <div className="mt-8 flex justify-between">
            <Link href="/modules/module2/bitcoin-investment">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous: Bitcoin Investment
              </Button>
            </Link>
            <div className="space-x-4">
              <Link href="/modules/module2/quiz">
                <Button 
                  className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
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