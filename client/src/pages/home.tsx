import { Link } from "wouter";
import { BookOpen, GraduationCap, Brain, Target, Trophy, Code, Gamepad2, Wallet, Dumbbell, ArrowRight, Bot, Sparkles, CheckCircle, Users } from "lucide-react";
import ModuleCard from "@/components/modules/module-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function Home() {
  useScrollTop();

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Why Choose Sulla
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized learning paths that adapt to your understanding and pace",
                link: "/ai",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Gamepad2,
                title: "Games & Practical Exercises",
                description: "Hands-on learning with interactive exercises and real-world examples",
                link: "/games",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: BookOpen,
                title: "Interactive Glossary",
                description: "Comprehensive blockchain and AI terminology guide with easy-to-understand definitions",
                link: "/glossary",
                gradient: "from-pink-500 to-red-500"
              },
              {
                icon: Bot,
                title: "Sensei AI Tutor",
                description: "Your personal AI guide through the curriculum, providing focused assistance",
                link: "/sensei",
                gradient: "from-red-500 to-blue-500"
              }
            ].map((feature, index) => (
              <Link key={feature.title} href={feature.link}>
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl transform rotate-2 group-hover:rotate-0 transition-all duration-300"></div>
                  <div className="relative bg-white p-8 rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-blue-100">
                    <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-lg inline-block mb-6 transform group-hover:scale-110 transition-all duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
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
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-blue-900 mb-4">
              Begin Your Learning Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Choose your path and start mastering the technologies of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Blockchain Fundamentals",
                description: "Master the basics of digital currencies and blockchain technology",
                path: "/curriculum?subject=crypto&course=1",
                badge: "Course 1",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Brain,
                title: "AI & Machine Learning",
                description: "Explore the world of AI, machine learning, and neural networks",
                path: "/curriculum?subject=ai&course=2",
                badge: "Course 2",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Wallet,
                title: "Advanced DeFi",
                description: "Learn advanced decentralized finance concepts and strategies",
                path: "/defi/module1",
                badge: "Course 3",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -10 }}
              >
                <Link href={course.path}>
                  <a className="block relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl transform rotate-2 group-hover:rotate-0 transition-all duration-300"></div>
                    <div className="relative bg-white rounded-xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-blue-100">
                      <div className={`bg-gradient-to-r ${course.gradient} p-4 rounded-lg inline-block mb-6 transform group-hover:scale-110 transition-all duration-300`}>
                        <course.icon className="w-12 h-12 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                        {course.badge}
                      </span>
                      <h3 className="text-2xl font-semibold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {course.title}
                      </h3>
                      <p className="text-blue-600 mb-6 group-hover:text-blue-700 transition-colors duration-300">
                        {course.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300">
                        Start Learning
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
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