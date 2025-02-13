import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Brain, Target, Trophy, Code, Gamepad2, Wallet, Dumbbell, ArrowRight } from "lucide-react";
import ModuleCard from "@/components/modules/module-card";
import { motion } from "framer-motion";

const Button = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <button className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${className || ''}`}>
    {children}
  </button>
);

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          className="text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Master Blockchain, AI & Emerging Technologies
        </motion.h1>
        <motion.p 
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sulla is your comprehensive learning platform designed to demystify the complex world of digital currencies, artificial intelligence, and emerging blockchain technologies.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/modules/module1">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold">
              Start Learning
            </button>
          </Link>
          <Link href="/curriculum">
            <button className="bg-transparent text-white px-8 py-3 rounded-lg border border-white hover:bg-blue-700/20 transition duration-300 font-semibold">
              View Curriculum
            </button>
          </Link>
          <Link href="/games">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg border border-blue-400 hover:bg-blue-600 transition duration-300 font-semibold flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Play & Learn
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Why Choose Sulla Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 text-center mb-12"
            {...fadeInUp}
          >
            Why Choose Sulla
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/ai">
              <motion.div 
                className="bg-blue-50 p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                {...fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <Brain className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
                <p className="text-gray-600">
                  Personalized learning paths that adapt to your understanding and pace
                </p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  Learn More →
                </button>
              </motion.div>
            </Link>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Dumbbell className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Practical Exercises</h3>
              <p className="text-gray-600">
                Hands-on learning with interactive exercises and real-world examples
              </p>
              <Link href="/modules/module1/exercises">
                <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                  Start Exercises →
                </button>
              </Link>
            </motion.div>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Glossary</h3>
              <p className="text-gray-600">
                Comprehensive crypto terminology guide with easy-to-understand definitions
              </p>
              <Link href="/glossary">
                <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                  View Glossary →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Blockchain Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of learners mastering blockchain technology with our interactive platform. 
              Create your free account today and start learning!
            </p>
            <Link href="/register">
              <button className="bg-white text-blue-700 px-12 py-4 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold text-lg inline-flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 text-center mb-12"
            {...fadeInUp}
          >
            Interactive Learning Tools
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              {...fadeInUp}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive & Adaptive Learning</h3>
                  <p className="text-gray-600">
                    AI-powered learning paths that adapt to your understanding and pace
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-gray-600">
                    Monitor your learning journey with detailed progress analytics
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded">
                  <Trophy className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Achievement System</h3>
                  <p className="text-gray-600">
                    Unlock badges and rewards as you complete modules and challenges
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 text-center mb-8"
            {...fadeInUp}
          >
            Begin Your Learning Journey
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ModuleCard
              icon={BookOpen}
              title="Course 1: Introduction to Cryptocurrency"
              description="Master the fundamentals of cryptocurrency through interactive learning and practical exercises."
              link="/modules/module1"
            />
            <ModuleCard
              icon={Brain}
              title="Course 2: Introduction to Artificial Intelligence"
              description="Explore the fundamentals of AI, machine learning, and their real-world applications through hands-on learning."
              link="/modules/module2"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            {...fadeInUp}
          >
            Start Your Technology Journey Today
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-8"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners mastering blockchain technology, artificial intelligence, and emerging technologies
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link href="/modules/module1">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold">
                Get Started Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}