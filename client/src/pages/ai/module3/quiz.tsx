import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { AIModule3Quiz } from "@/components/quizzes/AIModule3Quiz";

export default function AIModule3QuizPage() {
  useScrollTop();

  const handleQuizCompletion = () => {
    // Quiz completed, return to module overview
    window.location.href = "/ai/module3";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link href="/ai/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Module 3: Advanced AI Concepts
                </h1>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700">
                  This quiz will test your knowledge of advanced AI concepts including Deep Learning,
                  Reinforcement Learning, Generative AI, and Future AI Technologies. The quiz consists
                  of multiple choice questions covering key concepts from each topic in the module.
                </p>
                <p className="text-gray-700">
                  To pass the quiz, you need to score at least 60%. You can retake the quiz if needed.
                  Good luck!
                </p>
              </div>

              <AIModule3Quiz onComplete={handleQuizCompletion} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
