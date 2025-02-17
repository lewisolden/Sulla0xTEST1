import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import GlossaryTerms from "@/components/glossary/GlossaryTerms";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Book, Brain, Lightbulb, List, Cpu, Coins } from "lucide-react";
import { useEffect } from "react";

export default function GlossaryPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/curriculum">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Curriculum
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Interactive Knowledge Base
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore comprehensive definitions and concepts from the worlds of cryptocurrency and artificial intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cryptocurrency Terms</h3>
                  <p className="text-sm text-gray-600">
                    From blockchain basics to advanced trading concepts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Concepts</h3>
                  <p className="text-sm text-gray-600">
                    Understanding artificial intelligence and machine learning
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200">
                  <Cpu className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Technical Concepts</h3>
                  <p className="text-sm text-gray-600">
                    Deep dive into the technology behind both domains
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <GlossaryTerms />
      </div>
    </div>
  );
}