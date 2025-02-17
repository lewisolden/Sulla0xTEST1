import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import GlossaryTerms from "@/components/glossary/GlossaryTerms";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Book, Lightbulb, List } from "lucide-react";
import { useEffect } from "react";

export default function GlossaryPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
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

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Interactive Cryptocurrency Glossary
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Definitions</h3>
                  <p className="text-sm text-gray-600">
                    Clear explanations of cryptocurrency terms and concepts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visual Learning</h3>
                  <p className="text-sm text-gray-600">
                    Interactive diagrams and visual aids for better understanding
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <List className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Related Terms</h3>
                  <p className="text-sm text-gray-600">
                    Discover connections between different concepts
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