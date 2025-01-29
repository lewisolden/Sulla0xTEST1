import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Brain, Target, Users, Code, PlayCircle, PauseCircle, X } from "lucide-react"; 
import ModuleCard from "@/components/modules/module-card";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
          Master Cryptocurrency & Blockchain Technology
        </motion.h1>
        <motion.p 
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sulla is your comprehensive learning platform designed to demystify the complex world of digital currencies and blockchain innovation.
        </motion.p>

        <motion.div 
          className="flex justify-center space-x-4"
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
            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Personalized learning paths that adapt to your understanding and pace
              </p>
            </motion.div>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Practical Experience</h3>
              <p className="text-gray-600">
                Interactive simulations and real-world applications
              </p>
            </motion.div>

            <motion.div 
              className="bg-blue-50 p-6 rounded-lg"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Learn alongside a global community of crypto enthusiasts
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 text-center mb-12"
            {...fadeInUp}
          >
            Experience Interactive Learning
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              {...fadeInUp}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hands-on Practice</h3>
                  <p className="text-gray-600">
                    Try our interactive coding exercises and blockchain simulations
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
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                  <p className="text-gray-600">
                    Get help from our community of blockchain experts
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg overflow-hidden cursor-pointer group"
                   onClick={() => setIsVideoModalOpen(true)}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center text-white">
                    <PlayCircle className="w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg font-medium">Watch Course Preview</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Get started with our comprehensive blockchain education platform
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative pt-[56.25%]">
                <video
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                  preload="metadata"
                  poster="/assets/images/video-thumbnail.jpg"
                >
                  <source src="/introduction.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Modules Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-blue-900 text-center mb-12"
            {...fadeInUp}
          >
            Your Journey into the Future of Finance
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ModuleCard
              icon={BookOpen}
              title="Module 1: Fundamentals of Cryptocurrency"
              description="Dive into the world of digital currencies, exploring their history, technology, and potential."
              link="/modules/module1"
            />
            <ModuleCard
              icon={GraduationCap}
              title="Module 2: Understanding Blockchain"
              description="Understand the core technology behind cryptocurrencies and its revolutionary potential."
              link="/modules/module2"
            />
            <ModuleCard
              icon={Zap}
              title="Module 3: Advanced Concepts"
              description="Explore advanced blockchain concepts, platforms, and real-world applications."
              link="/modules/module3"
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
            Start Your Blockchain Journey Today
          </motion.h2>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-8"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of learners mastering blockchain technology and cryptocurrency
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

      <Footer />
    </div>
  );
}