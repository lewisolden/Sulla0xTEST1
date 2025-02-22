import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Network, Shield, Brain, Database, Code, TrendingUp } from "lucide-react";

// Mock progress tracking (would typically come from a context or global state)
const getModuleCompletionPercentage = () => {
  // In a real implementation, this would track actual progress
  return 50; // Starting at 50% completion for demonstration
};

const Module1Overview = () => {
  const moduleCompletion = getModuleCompletionPercentage();

  const sections = [
    {
      id: 'digital-currencies',
      title: 'Introduction to Digital Currencies',
      description: 'Explore the revolutionary world of digital currencies and their potential to transform financial systems.',
      icon: Network,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      id: 'money-evolution',
      title: 'History and Evolution of Money',
      description: 'Trace the fascinating journey of money from barter systems to digital currencies.',
      icon: BookOpen,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      id: 'bitcoin',
      title: 'Bitcoin: The First Cryptocurrency',
      description: 'Dive deep into the origins, innovations, and impact of Bitcoin.',
      icon: Brain,
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    },
    {
      id: 'altcoins-tokens',
      title: 'Altcoins and Tokens',
      description: 'Discover the diverse ecosystem of cryptocurrencies beyond Bitcoin.',
      icon: Database,
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-700"
    },
    {
      id: 'market-dynamics',
      title: 'Cryptocurrency Market Dynamics',
      description: 'Understanding the unique characteristics and behavior of crypto markets.',
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700"
    },
    {
      id: 'cryptography',
      title: 'Basic Cryptography Concepts',
      description: 'Explore the fundamental cryptographic principles that secure digital currencies.',
      icon: Shield,
      gradient: "bg-gradient-to-br from-rose-500 to-rose-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/curriculum">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Curriculum
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Module 1: Fundamentals of Cryptocurrency
              </motion.h1>
              <motion.p 
                className="text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Master the core concepts of cryptocurrency and blockchain technology
              </motion.p>
            </div>

            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Module Progress</p>
                  <p className="text-sm font-medium text-blue-600">{moduleCompletion}%</p>
                </div>
                <Progress value={moduleCompletion} className="bg-blue-100" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${section.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                    </div>
                    <p className="text-white/90 mb-4">{section.description}</p>
                    <button
                      onClick={() => {
                        // In a real app, this would use routing
                        console.log(`Navigate to ${section.id}`);
                      }}
                      className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Start Section
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-white"
              >
                <h2 className="text-2xl font-bold mb-4">Module Learning Objectives</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Define digital currencies and distinguish between different types",
                    "Trace the evolution of money from barter systems to modern digital currencies",
                    "Explain Bitcoin's fundamental innovations and impact",
                    "Understand the diverse ecosystem of altcoins and tokens",
                    "Analyze cryptocurrency market dynamics",
                    "Grasp basic cryptographic principles underlying cryptocurrencies"
                  ].map((objective, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-200">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Module1Overview;