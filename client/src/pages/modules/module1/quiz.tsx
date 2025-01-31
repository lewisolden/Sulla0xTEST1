import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import Quiz from "@/components/modules/quiz";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { MilestoneTransition } from "@/components/modules/milestone-transition";

export default function Module1KnowledgeCheck() {
  const [showCompletion, setShowCompletion] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleQuizComplete = (score: number) => {
    setProgress(100);
    setShowCompletion(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1 
          className="text-4xl font-bold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Module 1: Knowledge Check
        </motion.h1>

        <Quiz moduleId={1} onComplete={handleQuizComplete} />

        <MilestoneTransition
          title="Knowledge Check Complete!"
          description="Congratulations on completing Module 1! You're ready to move on to the next chapter of your blockchain journey."
          isVisible={showCompletion}
          onComplete={() => setShowCompletion(false)}
        />
        <Footer />
      </div>
    </div>
  );
}