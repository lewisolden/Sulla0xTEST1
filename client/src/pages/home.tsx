import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Brain, Target, Trophy, Code, Gamepad2, Wallet, Dumbbell, ArrowRight, Bot, Sparkles } from "lucide-react";
import ModuleCard from "@/components/modules/module-card";
import { motion } from "framer-motion";

const Button = ({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "secondary" | "outline" }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-blue-50 text-blue-700",
    outline: "border-2 border-white hover:bg-white/10 text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className || ''}`}>
      {children}
    </button>
  );
};

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute top-48 -left-48 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-1/4 text-blue-300 opacity-50"
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Master <span className="text-blue-300">Blockchain</span>, <br/>
              <span className="text-blue-200">AI</span> & Emerging Tech
            </h1>

            <motion.p 
              className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of learners on Sulla's comprehensive platform designed to 
              demystify the complex world of digital currencies, artificial intelligence, 
              and emerging blockchain technologies.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-6"
              variants={containerAnimation}
              initial="hidden"
              animate="show"
            >
              <Link href="/modules/module1">
                <Button variant="secondary">
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button variant="outline">
                  View Curriculum
                  <BookOpen className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/games">
                <Button variant="primary">
                  <Gamepad2 className="w-5 h-5" />
                  Play & Learn
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Sulla Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="container relative mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-blue-900 text-center mb-16"
            {...fadeInUp}
          >
            Why Choose Sulla
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/ai">
              <motion.div 
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                {...fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-blue-100 p-3 rounded-lg inline-block mb-6">
                  <Brain className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Personalized learning paths that adapt to your understanding and pace
                </p>
                <div className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>

            <motion.div 
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-6">
                <Dumbbell className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Practical Exercises</h3>
              <p className="text-gray-600 leading-relaxed">
                Hands-on learning with interactive exercises and real-world examples
              </p>
              <Link href="/modules/module1/exercises">
                <div className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  Start Exercises
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-6">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Glossary</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive blockchain and AI terminology guide with easy-to-understand definitions
              </p>
              <Link href="/glossary">
                <div className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  View Glossary
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>

            <Link href="/sensei">
              <motion.div 
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                {...fadeInUp}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-blue-100 p-3 rounded-lg inline-block mb-6">
                  <Bot className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sensei AI Tutor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your personal AI guide through the curriculum, providing focused assistance
                </p>
                <div className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  Meet Sensei
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Begin Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600">
              Choose your path and start mastering the technologies of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link href="/curriculum?subject=crypto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ModuleCard
                  icon={BookOpen}
                  title="Course 1: Introduction to Cryptocurrency"
                  description="Master the fundamentals of cryptocurrency through interactive learning and practical exercises."
                  link="/curriculum?subject=crypto"
                />
              </motion.div>
            </Link>
            <Link href="/curriculum?subject=ai">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ModuleCard
                  icon={Brain}
                  title="Course 2: Introduction to Artificial Intelligence"
                  description="Explore the fundamentals of AI, machine learning, and their real-world applications through hands-on learning."
                  link="/curriculum?subject=ai"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute top-48 -left-48 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            {...fadeInUp}
          >
            Start Your Technology Journey Today
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-12 text-blue-100"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners mastering blockchain technology, artificial intelligence, 
            and emerging technologies with our comprehensive platform.
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link href="/modules/module1">
              <Button variant="secondary">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}