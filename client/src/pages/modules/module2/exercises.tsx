import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft, Wallet, Shield, Brain } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

interface Exercise {
  title: string;
  objective: string;
  tasks: string[];
  completed: boolean[];
}

const WalletExercises = () => {
  const [exercises] = useState<Exercise[]>([
    {
      title: "Wallet Setup and Security",
      objective: "Set up your first Bitcoin wallet and implement basic security measures",
      tasks: [
        "Install a Test Wallet",
        "Complete initial setup",
        "Write down recovery phrase properly",
        "Enable basic security features",
        "Create strong password",
        "Enable biometric authentication",
        "Set up 2-factor authentication",
        "Store recovery phrase securely"
      ],
      completed: new Array(8).fill(false)
    },
    {
      title: "Understanding Transactions",
      objective: "Practice sending and receiving Bitcoin on a test network",
      tasks: [
        "Find a reliable Bitcoin testnet faucet",
        "Request test Bitcoin",
        "Confirm receipt in wallet",
        "Document transaction fee choices",
        "Monitor confirmation process",
        "Note time to confirmation"
      ],
      completed: new Array(6).fill(false)
    }
  ]);

  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{exercise.title}</h3>
          <p className="text-gray-600 mb-4">{exercise.objective}</p>
          <div className="space-y-3">
            {exercise.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={exercise.completed[taskIndex]}
                  onChange={() => {
                    const newExercises = [...exercises];
                    newExercises[index].completed[taskIndex] = !newExercises[index].completed[taskIndex];
                  }}
                  className="mt-1"
                />
                <span className="text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

const SecurityWorkshop = () => {
  const [exercises] = useState<Exercise[]>([
    {
      title: "Security Scenario Planning",
      objective: "Develop and test security procedures for different scenarios",
      tasks: [
        "Create response plan for lost device",
        "Document password recovery process",
        "Plan for compromise attempts",
        "Test hardware failure procedures",
        "Document emergency access steps"
      ],
      completed: new Array(5).fill(false)
    }
  ]);

  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{exercise.title}</h3>
          <p className="text-gray-600 mb-4">{exercise.objective}</p>
          <div className="space-y-3">
            {exercise.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={exercise.completed[taskIndex]}
                  onChange={() => {
                    const newExercises = [...exercises];
                    newExercises[index].completed[taskIndex] = !newExercises[index].completed[taskIndex];
                  }}
                  className="mt-1"
                />
                <span className="text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

const AssessmentCenter = () => {
  const [exercises] = useState<Exercise[]>([
    {
      title: "Portfolio Management",
      objective: "Create and manage a mock Bitcoin investment portfolio",
      tasks: [
        "Set investment goals",
        "Determine risk tolerance",
        "Create allocation strategy",
        "Set rebalancing rules",
        "Practice portfolio adjustments"
      ],
      completed: new Array(5).fill(false)
    },
    {
      title: "Market Research Report",
      objective: "Conduct and present Bitcoin market research",
      tasks: [
        "Analyze historical price data",
        "Study volume trends",
        "Identify market correlations",
        "Assess news impact",
        "Create presentation"
      ],
      completed: new Array(5).fill(false)
    }
  ]);

  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">{exercise.title}</h3>
          <p className="text-gray-600 mb-4">{exercise.objective}</p>
          <div className="space-y-3">
            {exercise.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={exercise.completed[taskIndex]}
                  onChange={() => {
                    const newExercises = [...exercises];
                    newExercises[index].completed[taskIndex] = !newExercises[index].completed[taskIndex];
                  }}
                  className="mt-1"
                />
                <span className="text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default function ModuleExercises() {
  useScrollTop();
  const [activeTab, setActiveTab] = useState("wallet");

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
            Module 2: Practical Exercises
          </motion.h1>

          <Card className="p-6">
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
                <WalletExercises />
              </TabsContent>

              <TabsContent value="security">
                <SecurityWorkshop />
              </TabsContent>

              <TabsContent value="assessment">
                <AssessmentCenter />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}