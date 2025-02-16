import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Book, MessageSquare, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react"; // Added import

export default function SenseiPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 border border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet Sensei - Your AI Learning Guide
              </h1>
            </div>

            <div className="prose max-w-none space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-800 m-0">What is Sensei?</h2>
                </div>
                <p className="text-gray-700">
                  Sensei is your dedicated AI learning assistant, designed specifically for Sulla's educational platform. Like a knowledgeable mentor, Sensei helps you navigate through course materials, understand complex concepts, and make the most of your learning journey.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50"
                >
                  <Book className="h-6 w-6 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Course Guidance</h3>
                  <p className="text-gray-600">
                    Get help understanding course topics, clarify concepts, and find relevant sections in your learning materials.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50"
                >
                  <Target className="h-6 w-6 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Learning Progress</h3>
                  <p className="text-gray-600">
                    Receive suggestions for exercises, quizzes, and next steps based on your current module and progress.
                  </p>
                </motion.div>
              </div>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-800 m-0">How to Use Sensei</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Look for the chat icon in the bottom-right corner of your screen. Click it to start a conversation with Sensei. You can ask questions about:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Specific topics from your current module</li>
                    <li>Clarification on course concepts</li>
                    <li>Help finding relevant course materials</li>
                    <li>Guidance on exercises and quizzes</li>
                  </ul>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-800 m-0">Tips for Better Interactions</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ask clear, specific questions about course content</li>
                  <li>Mention which module or topic you're studying</li>
                  <li>Use Sensei alongside course materials for better understanding</li>
                  <li>Ask for recommendations on what to study next</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}