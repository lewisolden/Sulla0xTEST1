import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ChartBar,
  Lock,
  BookOpen,
  Lightbulb,
  Bot,
  Target,
  Code,
  Wand2,
  GraduationCap,
  LineChart,
  Users,
  Settings
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
    <Card className="relative bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-300 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function AIOverview() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning Paths",
      description: "Our AI analyzes your learning patterns, quiz performance, and engagement to create personalized learning paths that adapt in real-time to your progress and understanding."
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Advanced analytics track your progress across modules, identifying strengths and areas for improvement to optimize your learning journey."
    },
    {
      icon: Code,
      title: "Smart Content Generation",
      description: "AI-powered systems generate tailored examples, practice questions, and explanations based on your specific learning style and needs."
    },
    {
      icon: LineChart,
      title: "Progress Prediction",
      description: "Machine learning algorithms predict your learning outcomes and suggest optimal study patterns for better results."
    }
  ];

  const upcomingFeatures = [
    {
      title: "AI Course Assistant",
      description: "An intelligent assistant trained specifically on our course content, providing instant, contextually relevant support and explanations to enhance your learning experience."
    },
    {
      title: "Dynamic Learning Path Optimization",
      description: "Real-time adjustments to your learning journey based on performance metrics, engagement patterns, and learning speed to ensure optimal knowledge retention."
    },
    {
      title: "Smart Content Recommendations",
      description: "Advanced AI algorithms that analyze your learning style and progress to suggest the most relevant content, exercises, and resources for your specific needs."
    },
    {
      title: "Adaptive Difficulty System",
      description: "Intelligent adjustment of content difficulty based on your performance and comfort level, ensuring you're always challenged but never overwhelmed."
    },
    {
      title: "Natural Language Query System",
      description: "Advanced NLP capabilities allowing you to ask questions in plain language and receive accurate, context-aware responses about blockchain and cryptocurrency concepts."
    },
    {
      title: "Learning Outcome Prediction",
      description: "Predictive analytics that forecast your learning trajectory and potential outcomes, helping you stay on track to achieve your educational goals."
    },
    {
      title: "AI Assessment Generation",
      description: "Dynamically generated assessments that adapt to your knowledge level and learning progress, ensuring comprehensive understanding of key concepts."
    },
    {
      title: "Adaptive Content Generation",
      description: "AI-powered system that creates personalized learning materials, examples, and exercises tailored to your unique learning style and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              AI-Powered Learning Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of education with our advanced AI systems that adapt and evolve with your learning journey.
            </p>
          </motion.div>

          {/* Sensei Spotlight Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Bot className="w-12 h-12" />
                  <div>
                    <h2 className="text-3xl font-bold">Meet Sensei</h2>
                    <p className="text-blue-100">Your Personal AI Learning Companion</p>
                  </div>
                </div>
                <p className="text-lg mb-8 text-blue-50">
                  Sensei is our state-of-the-art AI tutor that personalizes your entire learning experience.
                  Using advanced machine learning algorithms, Sensei understands your learning style,
                  tracks your progress, and adapts content to optimize your educational journey.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <Target className="w-6 h-6 mb-2" />
                    <h3 className="font-semibold mb-1">Personalized Learning</h3>
                    <p className="text-sm text-blue-100">Adapts content difficulty to your pace</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <GraduationCap className="w-6 h-6 mb-2" />
                    <h3 className="font-semibold mb-1">Smart Assessment</h3>
                    <p className="text-sm text-blue-100">Real-time feedback and progress tracking</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <Wand2 className="w-6 h-6 mb-2" />
                    <h3 className="font-semibold mb-1">Interactive Learning</h3>
                    <p className="text-sm text-blue-100">Engaging exercises and examples</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/sensei">
                    <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      Start Learning with Sensei
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Core Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
              Powered by Advanced AI
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Data & Privacy Section */}
          <Card className="mb-16 border border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Data Collection & Platform Evolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Our AI systems securely collect and analyze learning patterns to continuously improve:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="mb-2">Data Collection</Badge>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Learning progression patterns</li>
                      <li>Quiz performance metrics</li>
                      <li>Content engagement levels</li>
                      <li>Interactive exercise results</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mb-2">Platform Improvements</Badge>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Content optimization</li>
                      <li>Learning path refinement</li>
                      <li>Performance prediction</li>
                      <li>Feature enhancement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Link href="/ai/module1">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Start Your AI Learning Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}