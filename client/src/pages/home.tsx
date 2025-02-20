import { Link } from "wouter";
import { BookOpen, GraduationCap, Brain, Target, Trophy, Code, Gamepad2, Wallet, Dumbbell, ArrowRight, Bot, Sparkles, CheckCircle, Users } from "lucide-react";
import ModuleCard from "@/components/modules/module-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
                <a className="inline-flex items-center px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-semibold transition-all duration-300">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Link>
              <Link href="/curriculum">
                <a className="inline-flex items-center px-6 py-3 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300">
                  View Curriculum
                  <BookOpen className="w-5 h-5 ml-2" />
                </a>
              </Link>
              <Link href="/games">
                <a className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Play & Learn
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
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
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized learning paths that adapt to your understanding and pace",
                link: "/ai"
              },
              {
                icon: Dumbbell,
                title: "Practical Exercises",
                description: "Hands-on learning with interactive exercises and real-world examples",
                link: "/modules/module1/exercises"
              },
              {
                icon: BookOpen,
                title: "Interactive Glossary",
                description: "Comprehensive blockchain and AI terminology guide with easy-to-understand definitions",
                link: "/glossary"
              },
              {
                icon: Bot,
                title: "Sensei AI Tutor",
                description: "Your personal AI guide through the curriculum, providing focused assistance",
                link: "/sensei"
              }
            ].map((feature, index) => (
              <Link key={feature.title} href={feature.link}>
                <motion.div 
                  className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  {...fadeInUp}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <div className="bg-blue-100 p-3 rounded-lg inline-block mb-6">
                    <feature.icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Begin Your Learning Adventure
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Join our community of learners and master the technologies shaping the future.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/register">
                <a className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-semibold text-lg transition-all duration-300">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}