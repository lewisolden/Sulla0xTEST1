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

export default function Module1Quiz() {
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

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {progress}%</p>
        </motion.div>

        <Quiz moduleId={1} onComplete={handleQuizComplete} />

        <motion.div 
          className="mt-8 flex flex-col md:flex-row items-center gap-4 justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/modules/module1">
            <Button 
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module 1
            </Button>
          </Link>

          <Link href="/modules/module2">
            <Button 
              size="lg"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              disabled={!showCompletion}
            >
              Continue to Module 2 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <MilestoneTransition
        title="Quiz Complete!"
        description="Congratulations on completing Module 1! You're ready to move on to the next chapter of your blockchain journey."
        isVisible={showCompletion}
        onComplete={() => setShowCompletion(false)}
      />

      <Footer />
    </div>
  );
}