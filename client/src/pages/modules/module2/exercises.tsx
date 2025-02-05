import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft, Wallet, Shield, Brain } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import WalletSimulator from "@/components/exercises/WalletSimulator";
import SecurityWorkshop from "@/components/exercises/SecurityWorkshop";
import AssessmentCenter from "@/components/exercises/AssessmentCenter";

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
                <WalletSimulator />
              </TabsContent>

              <TabsContent value="security">
                <SecurityWorkshop />
              </TabsContent>

              <TabsContent value="assessment">
                <AssessmentCenter />
              </TabsContent>
            </Tabs>
          </Card>

          <div className="mt-8 flex justify-between">
            <Link href="/modules/module2/bitcoin-investment">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous: Bitcoin Investment
              </Button>
            </Link>
            <Button
              className="gap-2"
              onClick={() => setActiveTab("security")}
            >
              Continue to Security Workshop
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}