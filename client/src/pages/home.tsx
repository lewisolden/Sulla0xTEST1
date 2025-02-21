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

  const modules = [
    {
      icon: BookOpen,
      title: "Cryptocurrency Fundamentals",
      description: "Master the basics of digital currencies and blockchain technology",
      path: "/modules/module1",
      badge: "Module 1"
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Explore the world of AI, machine learning, and neural networks",
      path: "/ai/module1",
      badge: "Module 2"
    },
    {
      icon: Wallet,
      title: "DeFi Mastery",
      description: "Learn advanced decentralized finance concepts and strategies",
      path: "/defi/module1",
      badge: "Module 3"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Hero Section - Keeping as is */}
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
              <Link href="/register">
                <a className="inline-flex items-center px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Link>
              <Link href="/curriculum">
                <a className="inline-flex items-center px-6 py-3 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300">
                  View Curriculum
                  <BookOpen className="w-5 h-5 ml-2" />
                </a>
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
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized learning paths that adapt to your understanding and pace",
                link: "/ai"
              },
              {
                icon: Gamepad2,
                title: "Games & Practical Exercises",
                description: "Hands-on learning with interactive exercises and real-world examples",
                link: "/games"
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

      {/* Begin Your Learning Adventure Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 -left-48 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div 
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated star */}
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

            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Begin Your Learning Adventure
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our community of learners and master the technologies shaping the future. Start your journey today with our comprehensive learning platform.
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <Link href="/register">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:shadow-lg"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
              </Link>
              <Link href="/curriculum">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  Explore Curriculum
                  <BookOpen className="w-5 h-5 ml-2" />
                </motion.a>
              </Link>
            </div>
            <motion.div 
              className="flex justify-center gap-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Free to get started</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <Users className="w-5 h-5" />
                <span>Join 1,000+ learners</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <Trophy className="w-5 h-5" />
                <span>Earn certificates</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Begin Your Learning Journey Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Begin Your Learning Journey
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Choose your path and start mastering the technologies of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <Link href={module.path}>
                  <a className="block">
                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="bg-blue-100 p-4 rounded-lg inline-block mb-6">
                        <module.icon className="w-12 h-12 text-blue-600" />
                      </div>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        {module.badge}
                      </span>
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">{module.title}</h3>
                      <p className="text-blue-600 mb-6">{module.description}</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
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
              Start Your Technology Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Join thousands of learners mastering blockchain technology, artificial intelligence, and emerging technologies with our comprehensive platform.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/register">
                <a className="inline-flex items-center px-8 py-4 bg-white hover:bg-blue-50 text-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Link>
              <p className="text-blue-100 mt-6">Free to get started</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}