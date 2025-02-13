import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Database, Brain, Layout, Users, Shield, Radio, Rocket, Server, Code, Infinity, Network, Layers, GitBranch, Workflow, Book, Cpu, MessageSquare, ChartBar, Target, Clock, Settings, Sliders, Route, Lightbulb, BarChart, PieChart, LineChart, Timer, Award, FileText, Edit, Upload, List, PackageCheck, Gauge, Blocks, Puzzle, Zap, Globe, Laptop, CloudCog, Trophy, Medal, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const slides = [
  {
    id: 1,
    title: "Sulla - Technology Overview",
    content: (
      <div className="space-y-8">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Central Logo Animation */}
          <div className="relative w-48 h-48 mb-12">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                rotate: 360
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-full"
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: -360
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-24 h-24 text-blue-500" />
            </div>
          </div>

          <motion.h1
            className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Next-Gen Learning Platform
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 text-center max-w-2xl mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Advanced blockchain and AI educational platform delivering immersive, technology-driven learning experiences
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <Brain className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="font-semibold mb-2 text-gray-200">AI-Powered</h3>
            <p className="text-sm text-gray-400">Adaptive learning with advanced AI technology</p>
          </Card>
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <Database className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="font-semibold mb-2 text-gray-200">Secure Architecture</h3>
            <p className="text-sm text-gray-400">Enterprise-grade security and scalability</p>
          </Card>
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <Layout className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="font-semibold mb-2 text-gray-200">Modern Stack</h3>
            <p className="text-sm text-gray-400">Built with cutting-edge technologies</p>
          </Card>
        </motion.div>
      </div>
    )
  },
  {
    id: 2,
    title: "Technical Architecture",
    content: (
      <div className="space-y-6">
        <div className="mb-8">
          {/* Architecture Diagram */}
          <div className="relative h-64 bg-gray-50 rounded-lg p-4 border-2 border-blue-200">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 p-2 bg-blue-100 rounded text-center">
              <Layout className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              Frontend
            </div>
            <div className="absolute top-24 left-1/4 transform -translate-x-1/2 w-32 p-2 bg-green-100 rounded text-center">
              <Server className="w-6 h-6 mx-auto mb-2 text-green-600" />
              API Layer
            </div>
            <div className="absolute top-24 right-1/4 transform translate-x-1/2 w-32 p-2 bg-purple-100 rounded text-center">
              <Database className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              Database
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 p-2 bg-orange-100 rounded text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              Security
            </div>
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line x1="50%" y1="20%" x2="25%" y2="40%" stroke="#93C5FD" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="75%" y2="40%" stroke="#93C5FD" strokeWidth="2" />
              <line x1="25%" y1="40%" x2="50%" y2="60%" stroke="#93C5FD" strokeWidth="2" />
              <line x1="75%" y1="40%" x2="50%" y2="60%" stroke="#93C5FD" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2 flex items-center">
              <Code className="w-5 h-5 mr-2 text-blue-600" />
              Frontend Stack
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Next.js with TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>Shadcn UI Components</li>
            </ul>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2 flex items-center">
              <Server className="w-5 h-5 mr-2 text-green-600" />
              Backend Stack
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>PostgreSQL Database</li>
              <li>Express.js API</li>
              <li>Drizzle ORM</li>
              <li>WebSocket Support</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Data Storage & Management",
    content: (
      <div className="space-y-6">
        <div className="mb-8">
          {/* Data Flow Diagram */}
          <div className="relative h-48 bg-gray-50 rounded-lg p-4 border-2 border-blue-200">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="flex flex-col items-center justify-center">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-sm font-medium">User Data</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Database className="w-8 h-8 text-purple-600 mb-2" />
                <div className="text-sm font-medium">Secure Storage</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Brain className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-sm font-medium">AI Analysis</div>
              </div>
            </div>
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line x1="33%" y1="50%" x2="66%" y2="50%" stroke="#93C5FD" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-600" />
              Database Schema
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>User Profiles & Authentication</li>
              <li>Learning Progress Tracking</li>
              <li>Course Content Management</li>
              <li>Assessment Results</li>
              <li>AI Interaction History</li>
            </ul>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-600" />
              Data Security
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Encrypted User Data</li>
              <li>Regular Backups</li>
              <li>Access Control</li>
              <li>GDPR Compliance</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "AI Integration",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Core AI Features</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Cpu className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Adaptive Learning</h4>
                  <p className="text-sm text-gray-400">Dynamically adjusts content difficulty and pacing based on individual performance metrics and learning patterns</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Natural Language Processing</h4>
                  <p className="text-sm text-gray-400">Processes and understands user queries using advanced NLP models for accurate and contextual responses</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Network className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Pattern Recognition</h4>
                  <p className="text-sm text-gray-400">Identifies learning patterns and knowledge gaps to provide targeted recommendations</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Workflow className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Learning Optimization</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <GitBranch className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Dynamic Learning Paths</h4>
                  <p className="text-sm text-gray-400">Creates personalized learning journeys that adapt to user progress and goals in real-time</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Book className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Smart Content Recommendations</h4>
                  <p className="text-sm text-gray-400">Suggests relevant materials and resources based on learning history and success patterns</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Layers className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Skill Gap Analysis</h4>
                  <p className="text-sm text-gray-400">Continuously assesses and identifies areas needing improvement to optimize learning outcomes</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Adaptive Learning System",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Brain className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Learning Analysis</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <ChartBar className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Performance Tracking</h4>
                  <p className="text-sm text-gray-400">Monitors quiz scores, completion rates, and engagement metrics to gauge understanding</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Learning Style Detection</h4>
                  <p className="text-sm text-gray-400">Identifies preferred learning methods through interaction analysis and content engagement patterns</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Pace Optimization</h4>
                  <p className="text-sm text-gray-400">Adjusts content delivery speed based on individual learning velocity and comprehension rates</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Settings className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Content Adaptation</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Sliders className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Dynamic Difficulty</h4>
                  <p className="text-sm text-gray-400">Automatically adjusts content complexity based on user performance and confidence levels</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Route className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Custom Learning Paths</h4>
                  <p className="text-sm text-gray-400">Creates tailored learning sequences that adapt to individual progress and goals</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Smart Recommendations</h4>
                  <p className="text-sm text-gray-400">Suggests supplementary materials and practice exercises based on performance data</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "User Progress Tracking",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <BarChart className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Performance Metrics</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <PieChart className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Completion Analytics</h4>
                  <p className="text-sm text-gray-400">Detailed tracking of course completion rates with module-level progress indicators</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <LineChart className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Assessment Performance</h4>
                  <p className="text-sm text-gray-400">Comprehensive analysis of quiz scores and practical exercise results</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Timer className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Time Analytics</h4>
                  <p className="text-sm text-gray-400">Monitors time spent on different learning activities to optimize engagement</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Award className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Achievement System</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Trophy className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Progress Milestones</h4>
                  <p className="text-sm text-gray-400">Recognition system for completing key learning objectives and achievements</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Medal className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Skill Badges</h4>
                  <p className="text-sm text-gray-400">Visual representations of acquired skills and completed certifications</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Learning Goals</h4>
                  <p className="text-sm text-gray-400">Personalized objective tracking with progress visualization</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Content Management",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <FileText className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Content Creation</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Edit className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Rich Text Editor</h4>
                  <p className="text-sm text-gray-400">Advanced WYSIWYG editor with support for interactive elements and code snippets</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Upload className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Media Management</h4>
                  <p className="text-sm text-gray-400">Integrated system for handling images, videos, and interactive media content</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <List className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Content Organization</h4>
                  <p className="text-sm text-gray-400">Hierarchical content structure with tags and categories for easy navigation</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <PackageCheck className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Quality Assurance</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Gauge className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Content Validation</h4>
                  <p className="text-sm text-gray-400">Automated checks for content accuracy and completeness</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Blocks className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Version Control</h4>
                  <p className="text-sm text-gray-400">Track content changes and maintain multiple versions of learning materials</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Puzzle className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Content Templates</h4>
                  <p className="text-sm text-gray-400">Standardized formats for consistent learning experience across modules</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Future Capabilities",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <Rocket className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-200">Upcoming Features</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Advanced AI Tutoring</h4>
                  <p className="text-sm text-gray-400">One-on-one AI tutoring sessions with natural language understanding</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Global Learning Network</h4>
                  <p className="text-sm text-gray-400">Collaborative learning platform connecting students worldwide</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Laptop className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Interactive Simulations</h4>
                  <p className="text-sm text-gray-400">Real-time blockchain and AI concept demonstrations</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <CloudCog className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-200">Technical Evolution</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Enhanced AI Models</h4>
                  <p className="text-sm text-gray-400">Integration of latest language models for improved learning assistance</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <BarChart className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Advanced Analytics</h4>
                  <p className="text-sm text-gray-400">Predictive learning analytics for better outcome forecasting</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Smartphone className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-200">Mobile Learning</h4>
                  <p className="text-sm text-gray-400">Native mobile apps with offline learning capabilities</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Quiz & Assessment Engine",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Interactive Assessments</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <h4 className="font-bold mb-2 text-gray-200">Quiz Features</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>Multiple Question Types</li>
              <li>Adaptive Difficulty</li>
              <li>Instant Feedback</li>
              <li>Progress Tracking</li>
              <li>Performance Analytics</li>
            </ul>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray700">
            <h4 className="font-bold mb-2 text-gray-200">Technical Implementation</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>React Components</li>
              <li>State Management</li>
              <li>Score Calculation</li>
              <li>Data Persistence</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Course Creation System",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Content Management</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <h4 className="font-bold mb-2 text-gray-200">Content Types</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>Text & Media</li>
              <li>Interactive Elements</li>
              <li>Assessments</li>
              <li>Practice Exercises</li>
            </ul>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <h4 className="font-bold mb-2 text-gray-200">Creation Tools</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>Rich Text Editor</li>
              <li>Media Upload</li>
              <li>Quiz Builder</li>
              <li>Course Structuring</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Future Capabilities",
    content: (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-blue-700">Roadmap & Vision</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <h4 className="font-bold mb-2 text-gray-200">Upcoming Features</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>Advanced AI Tutoring</li>
              <li>VR/AR Integration</li>
              <li>Blockchain Certificates</li>
              <li>Peer Learning Networks</li>
              <li>Real-time Collaboration</li>
            </ul>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <h4 className="font-bold mb-2 text-gray-200">Technology Evolution</h4>
            <ul className="list-disc pl-4 text-gray-400">
              <li>Enhanced AI Models</li>
              <li>Improved Analytics</li>
              <li>Mobile Applications</li>
              <li>API Ecosystem</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  }
];

const TechnologyDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="relative bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-12 min-h-[700px] border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress line */}
          <div className="absolute top-0 left-0 w-full h-1">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="absolute top-6 right-6 px-4 py-2 bg-gray-800/50 rounded-full">
            <motion.span
              className="text-sm font-medium text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentSlide + 1} / {slides.length}
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="pt-12"
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute bottom-8 right-8 flex space-x-4">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="group hover:bg-gray-800 transition-all duration-300 border-gray-700 text-gray-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Previous
            </Button>
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'bg-gray-700'
                }`}
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: currentSlide === index ? 1.2 : 1,
                  opacity: currentSlide === index ? 1 : 0.6
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechnologyDeck;