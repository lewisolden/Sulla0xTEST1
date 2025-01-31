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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Manually trigger scroll to top on tab change
    window.scrollTo(0, 0);
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
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Module Overview
              </Button>
            </Link>
          </motion.div>

          <motion.h1 className="text-4xl font-bold text-blue-800 mb-6">
            Module 1: Practical Exercises
          </motion.h1>

          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}