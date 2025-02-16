import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy, Zap, Globe, Shield, Users, Terminal, Rocket, ChartLine, Bot, Sparkles, BrainCircuit, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const AboutFeature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-blue-100"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Welcome to Sulla
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Where AI-Powered Learning Meets Blockchain Education
            </p>
          </div>

          {/* Sensei Section */}
          <Card className="p-8 mb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center mb-6">
              <Bot className="w-10 h-10 mr-4" />
              <h2 className="text-3xl font-bold">Meet Sensei - Your AI Learning Companion</h2>
            </div>
            <p className="text-lg opacity-90 mb-8">
              Sensei is our advanced AI learning system that personalizes your educational journey. 
              Using cutting-edge artificial intelligence, Sensei adapts to your learning style, 
              pace, and preferences to create a truly personalized learning experience.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Sparkles className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">Adaptive Learning</h3>
                <p className="opacity-80">Dynamically adjusts content difficulty based on your progress</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <BrainCircuit className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-2">Smart Assessment</h3>
                <p className="opacity-80">AI-powered evaluation of your understanding and skills</p>
              </div>
            </div>
          </Card>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AboutFeature
                icon={Brain}
                title="AI-Powered Learning"
                description="Our platform leverages advanced AI algorithms to create personalized learning paths, ensuring optimal knowledge retention and progress."
              />
              <AboutFeature
                icon={Terminal}
                title="Interactive Modules"
                description="Engage with hands-on simulations and AI-guided practical exercises that bring blockchain concepts to life."
              />
              <AboutFeature
                icon={Target}
                title="Real-time AI Feedback"
                description="Receive instant, intelligent feedback on your progress and understanding from our AI system."
              />
              <AboutFeature
                icon={Globe}
                title="Dynamic Curriculum"
                description="AI-curated content that evolves with the blockchain industry, ensuring you're always learning the most relevant information."
              />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Advanced Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AboutFeature
                icon={Shield}
                title="Expert-Verified Content"
                description="All content is validated by industry experts and enhanced by our AI system for accuracy and relevance."
              />
              <AboutFeature
                icon={Users}
                title="AI-Enhanced Community"
                description="Connect with peers and receive AI-powered recommendations for study groups and collaborations."
              />
              <AboutFeature
                icon={ChartLine}
                title="Smart Analytics"
                description="Track your progress with AI-powered analytics that provide deep insights into your learning journey."
              />
              <AboutFeature
                icon={Rocket}
                title="Future-Ready Learning"
                description="Stay ahead with AI-predicted industry trends and automatically updated course content."
              />
            </div>
          </section>

          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Start Your Journey Today</h2>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
              Join thousands of learners benefiting from our AI-powered platform. Whether you're 
              a beginner or an experienced professional, Sulla's adaptive learning system and 
              Sensei AI will guide you to mastery in blockchain technology and cryptocurrency.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}