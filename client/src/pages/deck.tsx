import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Rocket,
  AlertTriangle,
  Lightbulb,
  Layers,
  Target,
  Globe,
  BarChart,
  Brain,
  Trophy,
  Award,
  BarChart2,
  Zap,
  LineChart,
  Book,
  GitBranch,
  Monitor,
  Code,
  Terminal,
  Users,
  ArrowRight,
  Building,
  Blocks,
  Lock,
  CheckCircle,
  Coins,
  Network,
  MessageCircle,
  Building2,
  Globe2,
  Wallet,
  Mail,
  Twitter,
  type LucideIcon,
  Sparkles,
  Bot,
  Puzzle,
  Laptop,
  GraduationCap,
  BrainCircuit,
  School,
  BookOpen,
  Microscope,
  CircleDollarSign,
  TrendingUp,
  UserCheck,
  PieChart,
  DollarSign,
  BellRing,
  BadgePercent,
  ShieldCheck,
  Infinity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideProps {
  key: string;
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return <>{children}</>;
};

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 50"
    className={`h-10 w-auto ${className}`}
    fill="currentColor"
  >
    <text
      x="50%"
      y="35"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="32"
      fontWeight="bold"
      textAnchor="middle"
    >
      Sulla
    </text>
  </svg>
);

const titleSlide = <Slide key="title">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center h-full text-center"
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Logo className="text-white h-20 w-auto mb-8" />
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-blue-400 mb-6">
        Next-Generation Crypto Education Platform
      </h1>
      <p className="text-2xl text-blue-200 mb-8">Investor Pitch Deck</p>
      <p className="text-xl text-blue-300">2025</p>
    </motion.div>
  </motion.div>
</Slide>;

const problemSlide = <Slide key="problem">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-red-500/20 rounded-lg">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Problem</h2>
    </div>
    <p className="text-xl text-blue-200 mb-8">
      The cryptocurrency industry is rapidly evolving, yet:
    </p>
    <motion.div className="space-y-4">
      {[
        { icon: Blocks, text: "Structured, high-quality educational resources remain fragmented" },
        { icon: Code, text: "Content is often overly technical or unreliable" },
        { icon: Users, text: "Many newcomers struggle to understand the fundamentals" },
        { icon: ArrowRight, text: "Experienced users lack clear pathways for advanced learning" }
      ].map((point, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <div className="p-2 bg-blue-400/20 rounded-full">
            <point.icon className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-lg text-blue-100">{point.text}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</Slide>;

const solutionSlide = <Slide key="solution">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <Lightbulb className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Solution</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Sparkles className="w-6 h-6 text-blue-400" />
        <p className="text-xl text-blue-100">
          Sulla is a next-generation crypto education platform that bridges this gap by offering interactive, structured, and engaging courses tailored for beginners, developers, and institutions.
        </p>
      </div>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Adaptive Learning</h3>
        </div>
        <p className="text-blue-100">
          AI-driven personalization tailors content based on individual learning styles
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Intelligent Recommendations</h3>
        </div>
        <p className="text-blue-100">
          Machine learning algorithms suggest the most relevant courses
        </p>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const featuresSlide = <Slide key="features">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Layers className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Key Features</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          icon: Puzzle,
          title: "Modular Learning",
          description: "Comprehensive coverage of Bitcoin, Ethereum, DeFi, Smart Contracts, Security"
        },
        {
          icon: GraduationCap,
          title: "Interactive Experience",
          description: "Gamified quizzes, real-world scenarios, and NFT certifications"
        },
        {
          icon: BadgePercent,
          title: "Freemium Model",
          description: "Free introductory content with premium offerings for deeper knowledge"
        },
        {
          icon: Building2,
          title: "B2B Integration",
          description: "White-label solutions for fintech companies and institutions"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <feature.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{feature.title}</h3>
          </div>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const missionSlide = <Slide key="mission">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <Target className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Our Mission</h2>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-lg mb-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <Infinity className="w-8 h-8 text-blue-400" />
        <h3 className="text-2xl font-semibold text-blue-300">
          To make crypto education accessible, engaging, and financially rewarding
        </h3>
      </div>
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-blue-900/30 p-6 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <ShieldCheck className="w-6 h-6 text-blue-400" />
        <p className="text-xl text-blue-100">
          Empowering users to confidently navigate the blockchain space through structured, high-quality educational resources and interactive learning experiences.
        </p>
      </div>
    </motion.div>
  </motion.div>
</Slide>;

const marketOpportunitySlide = <Slide key="market-opportunity">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Globe className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Market Opportunity</h2>
    </div>
    <div className="flex items-center gap-4 mb-6">
      <CircleDollarSign className="w-6 h-6 text-blue-400" />
      <h3 className="text-2xl font-semibold text-blue-300">Why Now?</h3>
    </div>
    <motion.div className="space-y-4">
      {[
        {
          icon: UserCheck,
          text: "Over 420 million crypto users worldwide (2024)"
        },
        {
          icon: Building2,
          text: "80% of major banks exploring digital assets"
        },
        {
          icon: School,
          text: "Lack of quality education leading to confusion and security risks"
        }
      ].map((point, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <point.icon className="w-6 h-6 text-blue-400 mt-1" />
          <p className="text-lg text-blue-100">{point.text}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</Slide>;

const marketSizeSlide = <Slide key="market-size">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Market Size</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <LineChart className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-semibold text-blue-300">Current Market Value</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-900/30 p-4 rounded-lg flex items-center gap-4">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <p className="text-lg text-blue-100">Crypto Education Market (2024): $1.5B+ and growing</p>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg flex items-center gap-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <p className="text-lg text-blue-100">Expected to exceed $5B by 2028 as Web3 adoption accelerates</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <PieChart className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-semibold text-blue-300">Target Audience</h3>
        </div>
        <div className="space-y-4">
          {[
            {
              icon: BookOpen,
              text: "Crypto enthusiasts and newcomers"
            },
            {
              icon: Laptop,
              text: "Developers and technical professionals"
            },
            {
              icon: LineChart,
              text: "Traders and investors"
            },
            {
              icon: Building2,
              text: "Fintech institutions"
            }
          ].map((audience, index) => (
            <motion.div
              key={index}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 bg-blue-900/30 p-4 rounded-lg"
            >
              <audience.icon className="w-5 h-5 text-blue-400" />
              <p className="text-lg text-blue-100">{audience.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const productOverviewSlide = <Slide key="product-overview">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <Layers className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Product Overview</h2>
    </div>
    <p className="text-xl text-blue-200 mb-8">What Makes Sulla Unique:</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          icon: Brain,
          title: "AI-Powered Learning",
          description: "Personalized learning paths that adapt to your understanding and pace"
        },
        {
          icon: Target,
          title: "Practical Exercises",
          description: "Hands-on learning with interactive exercises and real-world examples"
        },
        {
          icon: Award,
          title: "Achievement NFTs",
          description: "Earn verifiable NFT certificates as you complete modules"
        },
        {
          icon: LineChart,
          title: "Progress Tracking",
          description: "Monitor your learning journey with detailed analytics"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <feature.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{feature.title}</h3>
          </div>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const interactiveToolsSlide = <Slide key="interactive-tools">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Zap className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Interactive Learning Tools</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: Brain,
          title: "Interactive & Adaptive Learning",
          description: "AI-powered learning paths that adapt to your understanding and pace"
        },
        {
          icon: BarChart2,
          title: "Progress Tracking",
          description: "Monitor your learning journey with detailed progress analytics"
        },
        {
          icon: Trophy,
          title: "Achievement System",
          description: "Unlock badges and rewards as you complete modules and challenges"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <feature.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{feature.title}</h3>
          </div>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const futureFinanceSlide = <Slide key="future-finance">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <Book className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Your Journey into the Future of Finance</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Course 1: Introduction to Cryptocurrency</h3>
    </Card>
    <div className="space-y-6">
      {[
        {
          title: "Module 1: Understanding Cryptocurrency",
          description: "Master the fundamentals through interactive learning and practical exercises"
        },
        {
          title: "Module 2: Bitcoin Fundamentals",
          description: "Deep dive into Bitcoin, investment strategies, and security considerations"
        },
        {
          title: "Module 3: Ethereum & Smart Contracts",
          description: "Explore Ethereum, smart contracts, and their practical applications"
        }
      ].map((module, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-400/20 rounded-full mt-1">
              <GitBranch className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-300 mb-2">{module.title}</h4>
              <p className="text-blue-100">{module.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const roadmapSlide = <Slide key="roadmap">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Rocket className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Product Roadmap</h2>
    </div>
    <h3 className="text-2xl font-semibold text-blue-300 mb-6">Next 12 Months</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: Book,
          title: "Expand Course Library",
          description: "Launch advanced DeFi, Smart Contracts, and Trading courses"
        },
        {
          icon: Brain,
          title: "AI-Powered Learning Tools",
          description: "Enhanced personalization and adaptive assessments"
        },
        {
          icon: Trophy,
          title: "Gamification Expansion",
          description: "Leaderboards, NFT achievements, and competitions"
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <item.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{item.title}</h3>
          </div>
          <p className="text-blue-100">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const whatIsBuiltSlide = <Slide key="whats-built">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">What's Been Built</h2>
    </div>
    <div className="space-y-6">
      <Card className="bg-blue-900/30 p-6">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">First Course Launch Success</h3>
        <div className="space-y-4">
          {[
            {
              icon: Book,
              title: "Understanding Cryptocurrency",
              desc: "Evolution of money and digital assets"
            },
            {
              icon: Blocks,
              title: "Bitcoin & Ethereum Basics",
              desc: "Deep dive into technology and use cases"
            },
            {
              icon: Lock,
              title: "Security & Risk Management",
              desc: "Asset protection and scam prevention"
            }
          ].map((module, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                <module.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-1">{module.title}</h4>
                <p className="text-blue-100">{module.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6">
        <p className="text-lg text-blue-100 mb-4">
          This course serves as a proven framework for future course expansion and has been tested with early users, providing valuable data to refine the platform.
        </p>
        <p className="text-lg text-blue-100">
          The entire platform, including the learning management system and course delivery infrastructure, has been built from the ground up using proprietary code. This gives us complete control over the user experience and allows us to rapidly adapt the platform based on user feedback and emerging market needs.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Monitor, text: "React.js frontend" },
          { icon: Terminal, text: "Node.js backend" },
          { icon: Building, text: "PostgreSQL database" },
          { icon: Code, text: "TypeScript" },
          { icon: Blocks, text: "Blockchain integration" }
        ].map((tech, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg flex items-center gap-3"
          >
            <tech.icon className="w-5 h-5 text-blue-400" />
            <span className="text-blue-100">{tech.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
</Slide>;

const goToMarketSlide = <Slide key="go-to-market">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Rocket className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Go-to-Market Strategy</h2>
    </div>
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 1: Community Growth (0-6 Months)</h3>
        <ul className="space-y-3">
          {[
            "Leverage Web3 Twitter, Discord, and Telegram for viral adoption",
            "Run interactive quizzes & NFT rewards to engage users",
            "YouTube & influencer partnerships for educational content distribution",
            "SEO & content strategy for long-term organic traffic"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <ArrowRight className="w-4 h4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 2: Pre-Monetization & User Scaling (6-12 Months)</h3>
        <ul className="space-y-3">
          {[
            "Expand AI learning personalization with increased user data",
            "Optimize onboarding experience for engagement and retention",
            "Strengthen partnerships with crypto projects, DAOs, and institutions"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const growthExpansionSlide = <Slide key="growth-expansion">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart2 className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Growth & Expansion Strategy</h2>
    </div>
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 3: Monetization & Scaling (12-18 Months)</h3>
        <ul className="space-y-3">
          {[
            "Launch paid subscriptions & B2B deals with exchanges & fintechs",
            "Secure institutional licensing with universities & corporate training programs",
            "Expand platform features, AI-driven learning tools, and gamification"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <Building className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 4: Global Expansion (18-24 Months)</h3>
        <ul className="space-y-3">
          {[
            "Multi-language support for Europe, LATAM, and Asia",
            "Partnerships with blockchain-based job networks",
            "Web3 education DAO for decentralized governance & course development"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const teamSlide = <Slide key="team">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Users className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Team</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          role: "Founder - Lewis Olden",
          description: "Entrepreneur with finance & education expertise"
        },
        {
          role: "CTO",
          description: "Blockchain developer & AI specialist"
        },
        {
          role: "Head of Content",
          description: "Crypto educator & research analyst"
        },
        {
          role: "Marketing Lead",
          description: "Web3 community builder & digital strategist"
        }
      ].map((member, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{member.role}</h3>
          </div>
          <p className="text-blue-100">{member.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const joinUsSlide = <Slide key="join-us">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <MessageCircle className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Join Us</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">
        Join us in revolutionizing crypto education
      </h3>
      <p className="text-lg text-blue-100 mb-4">
        Seeking investors, partners, and early adopters
      </p>
    </Card>
    <div className="space-y-4">
      {[
        { icon: Mail, text: "Email: lewis@sullacrypto.com" },
        { icon: Twitter, text: "Twitter: @SullaCrypto" },
        { icon: Globe2, text: "Website: sullacrypto.com" }
      ].map((contact, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <contact.icon className="w-6 h-6 text-blue-400" />
          <p className="text-lg text-blue-100">{contact.text}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const tokenIntegrationSlide = <Slide key="token-integration">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <Coins className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Future Token Integration</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100 mb-4">
        As Sulla continues to grow and establish itself as a trusted leader in crypto education, 
        the possibility of a future token launch will be carefully evaluated. A token integration 
        will only be pursued once the platform has amassed a large and engaged user base, ensuring 
        that it provides genuine value rather than speculative trading.
      </p>
      <p className="text-lg text-blue-100">
        As an education platform, our integrity and reputation are paramount. Any token launch 
        must be meticulously designed and responsibly executed to enhance the user experience 
        and strengthen the ecosystem in a meaningful way.
      </p>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          icon: Trophy,
          title: "Tokenized Rewards",
          description: "Users earn tokens for completing courses, contributing to the community, and achieving learning milestones"
        },
        {
          icon: Lock,
          title: "Staking for Premium Access",
          description: "Users stake tokens to unlock advanced courses and exclusive content"
        },
        {
          icon: Users,
          title: "Decentralized Governance",
          description: "Token holders vote on course additions, platform updates, and feature prioritization"
        },
        {
          icon: Network,
          title: "Marketplace & Peer Learning",
          description: "Incentivizing expert contributions, tutoring, and user-generated content with token rewards"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <feature.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{feature.title}</h3>
          </div>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <p className="text-lg text-blue-100">
        The Sulla token will serve as the backbone of an ecosystem, ensuring long-term engagement, 
        responsible adoption, and community-driven growth. We are committed to designing a token 
        model that aligns with educational integrity, transparency, and user empowerment, while 
        preventing speculative risks.
      </p>
    </Card>
  </motion.div>
</Slide>;

const tractionSlide = <Slide key="traction">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Traction & Milestones</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        Our primary goal in the first 12 months is to onboard as many users as possible, 
        as more user data improves our AI capabilities.
      </p>
    </Card>

    <div className="space-y-6">
      {[
        {
          icon: Users,
          phase: "0-12M: Community Growth",
          metrics: "100K users, 10K Discord members"
        },
        {
          icon: BarChart,
          phase: "12-18M: Monetization",
          metrics: "First $500K revenue from subscriptions & B2B deals"
        },
        {
          icon: Building2,
          phase: "18-24M: Institutional",
          metrics: "500K+ users, major fintech & university partnerships"
        },
        {
          icon: Globe2,
          phase: "24M+: Global",
          metrics: "1M users, $5M+ ARR"
        }
      ].map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-400/20 rounded-full">
              <milestone.icon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-300">{milestone.phase}</h3>
              <p className="text-blue-100">{milestone.metrics}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const financialSlide = <Slide key="financial">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">5-Year Financial Forecasts & Growth Projections</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        As Sulla scales, we project significant growth in user adoption, revenue streams, and enterprise partnerships. 
        Below is our 5-year financial outlook, assuming steady market adoption and expansion of our platform features.
      </p>
    </Card>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg">
        <thead className="border-b border-blue-400/30">
          <tr>
            <th className="px-4 py-3 text-left text-blue-300">Year</th>
            <th className="px-4 py-3 text-left text-blue-300">Users</th>
            <th className="px-4 py-3 text-left text-blue-300">Revenue</th>
            <th className="px-4 py-3 text-left text-blue-300">Expenses</th>
            <th className="px-4 py-3 text-left text-blue-300">Net Profit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-400/30">
          <tr>
            <td className="px-4 py-3 text-blue-100">Year 1</td>
            <td className="px-4 py-3 text-blue-100">100K+ users</td>
            <td className="px-4 py-3 text-blue-100">$0 (User Growth Focus)</td>
            <td className="px-4 py-3 text-blue-100">$400K - $500K</td>
            <td className="px-4 py-3 text-red-400">($400K - $500K) Loss</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100">Year 2</td>
            <td className="px-4 py-3 text-blue-100">500K+ users</td>
            <td className="px-4 py-3 text-blue-100">$500K</td>
            <td className="px-4 py-3 text-blue-100">$1.2M</td>
            <td className="px-4 py-3 text-red-400">($700K) Loss</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100">Year 3</td>
            <td className="px-4 py-3 text-blue-100">1M+ users</td>
            <td className="px-4 py-3 text-blue-100">$2M - $5M</td>
            <td className="px-4 py-3 text-blue-100">$3M</td>
            <td className="px-4 py-3 text-green-400">Break-even to $2M Profit</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100">Year 4</td>
            <td className="px-4 py-3 text-blue-100">2.5M+ users</td>
            <td className="px-4 py-3 text-blue-100">$10M+</td>
            <td className="px-4 py-3 text-blue-100">$6M</td>
            <td className="px-4 py-3 text-green-400">$4M+ Profit</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100">Year 5</td>
            <td className="px-4 py-3 text-blue-100">5M+ users</td>
            <td className="px-4 py-3 text-blue-100">$20M+</td>
            <td className="px-4 py-3 text-blue-100">$10M</td>
            <td className="px-4 py-3 text-green-400">$10M+ Profit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Revenue Growth Drivers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Wallet,
            title: "Subscription Plans",
            description: "Users pay $9.99 - $49.99/month for premium courses"
          },
          {
            icon: Building,
            title: "Institutional Licensing",
            description: "Crypto exchanges, fintech firms, and universities integrate Sulla's courses"
          },
          {
            icon: Award,
            title: "NFT-Based Certifications",
            description: "Users pay $99 - $499 for blockchain-backed credentials"
          },
          {
            icon: MessageCircle,
            title: "Sponsored Content & Partnerships",
            description: "Crypto brands pay to feature learning modules"
          },
          {
            icon: Trophy,
            title: "Gamified Microtransactions",
            description: "Monetization of in-app rewards and premium content"
          }
        ].map((driver, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <driver.icon className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-blue-300">{driver.title}</h4>
            </div>
            <p className="text-blue-100 text-sm">{driver.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📌</span>
        <p className="text-lg text-blue-100">
          Year 1 is dedicated solely to user acquisition, with revenue generation beginning in Year 2 once a critical mass of engaged users has been established. 
          Given the anticipated burn rate, we will likely need to raise additional funding in Year 2 to sustain momentum and continue scaling effectively.
        </p>
      </div>
    </Card>
  </motion.div>
</Slide>;

const financialModelSlide = <Slide key="financial-model">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Comprehensive Financial Model</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        Sulla's financial model is structured to ensure long-term sustainability, strong cash flow, and strategic reinvestment into growth.
      </p>
    </Card>

    <Card className="bg-blue-900/30 p-6">
      <h3 className="text-xl font-semibold text-blue-300 mb-4">Key Financial Assumptions</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">User Acquisition Cost (CAC):</span>
            <span className="ml-2 text-blue-100">$10-$20 per active user</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Customer Lifetime Value (LTV):</span>
            <span className="ml-2 text-blue-100">$300+ per premium user</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Conversion Rate:</span>
            <span className="ml-2 text-blue-100">5-10% of free users upgrade to paid plans</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Institutional Partnerships:</span>
            <span className="ml-2 text-blue-100">10-50 enterprise clients within 5 years</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Operating Margins:</span>
            <span className="ml-2 text-blue-100">Greater than 60% due to digital content scalability</span>
          </div>
        </li>
      </ul>
    </Card>

    <div className="overflow-x-auto mt-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Projected Financial Breakdown (Year 2-5)</h3>
      <table className="min-w-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg">
        <thead className="border-b border-blue-400/30">
          <tr>
            <th className="px-4 py-3 text-left text-blue-300">Category</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 2</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 3</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 4</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 5</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-400/30">
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Revenue</td>
            <td className="px-4 py-3 text-blue-100">$500K</td>
            <td className="px-4 py-3 text-blue-100">$2M-$5M</td>
            <td className="px-4 py-3 text-blue-100">$10M+</td>
            <td className="px-4 py-3 text-blue-100">$20M+</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Marketing Spend</td>
            <td className="px-4 py-3 text-blue-100">$150K</td>
            <td className="px-4 py-3 text-blue-100">$400K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Tech & Development</td>
            <td className="px-4 py-3 text-blue-100">$300K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Operational Costs</td>
            <td className="px-4 py-3 text-blue-100">$750K</td>
            <td className="px-4 py-3 text-blue-100">$1.5M</td>
            <td className="px-4 py-3 text-blue-100">$3M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Profitability Projection</td>
            <td className="px-4 py-3 text-red-400">($700K) Loss</td>
            <td className="px-4 py-3 text-green-400">Break-even to $2M Profit</td>
            <td className="px-4 py-3 text-green-400">$4M+ Profit</td>
            <td className="px-4 py-3 text-green-400">$10M+ Profit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Break-Even & Scalability</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">Break-even occurs in Year 3, following an aggressive user acquisition phase in Year 1 and modest monetization in Year 2.</p>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">High-margin digital content model ensures scalability with minimal additional costs per new user.</p>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">Future Token Integration (post-500K users) will unlock additional revenue streams through staking, governance, and in-platform rewards.</p>
        </li>
      </ul>
    </Card>
  </motion.div>
</Slide>;

const fundingNarrativeSlide = <Slide key="funding-narrative">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Funding Requirements</h2>
    </div>
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-blue-900/30 p-6 mb-6">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Narrative</h3>
        <p className="text-lg text-blue-100 mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, 
          marketing, platform improvements, and operational growth. Our focus is on building a 
          user-centric platform with AI-driven personalization, ensuring high engagement and 
          long-term retention.
        </p>
        <p className="text-lg text-blue-100">
          We have strategically allocated funds to maximize user acquisition in the first 12 months 
          while setting up monetization in the second year. Security, legal compliance, and 
          infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </Card>
    </motion.div>
  </motion.div>
</Slide>;

const fundingBreakdownSlide = <Slide key="funding-breakdown">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-400">Funding Breakdown</h2>
    <div className="spacey-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-900/30 p-4"><h3 className="font-semibold text-blue-300 mb-2">Content Expansion</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Develop additional courses and certifications</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Marketing & User Acquisition</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Build brand awareness and onboard early adopters</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Business Development</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Secure partnerships and institutional deals</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Platform Enhancements</h3>
          <p className="text-lg text-blue-100">$100K</p>
          <p className="text-sm text-blue-200">Improve AI learning algorithms and gamification</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Legal & Compliance</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Ensure regulatory compliance for sustainability</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Operational Costs</h3>
          <p className="text-lg text-blue-100">$200K</p>
          <p className="text-sm text-blue-200">Support core team and day-to-day operations</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Security &Maintenance</h3>
          <p className="text-lg text-blue-100">$100K</p>
          <p className="text-sm text-blue-200">Protect user data and enhance system resilience</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Buffer Fund</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Flexibility for unforeseen operational needs</p>
        </Card>
      </div>
      <Card className="bg-blue-900/30 p-6 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-300">Total Funding Needed</h3>
          <p className="text-xl font-bold text-blue-100">$650K</p>
        </div>
        <p className="text-lg mt-2 text-blue-100">Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.</p>
      </Card>
    </div>
  </motion.div>
</Slide>;

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  featuresSlide,
  missionSlide,
  marketOpportunitySlide,
  marketSizeSlide,
  productOverviewSlide,
  interactiveToolsSlide,
  futureFinanceSlide,
  roadmapSlide,
  whatIsBuiltSlide,
  goToMarketSlide,
  growthExpansionSlide,
  teamSlide,
  joinUsSlide
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    try {
      const response = await fetch('/api/deck/download-static');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sulla-pitch-deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
        if (e.key === "ArrowLeft") setCurrentSlide(c => Math.max(c - 1, 0));
      }}
      tabIndex={0}
      ref={deckRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo className="text-white h-8 w-auto" />
          <Button
            onClick={downloadPDF}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
          </Button>
        </div>

        <div className="relative aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-12"
            >
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 overflow-y-auto bg-gradient-to-br from-blue-900/95 to-black/95">
                {slides[currentSlide]}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={() => setCurrentSlide(c => Math.max(c - 1, 0))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="px-4 py-2 bg-white/20 rounded">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setCurrentSlide(c => Math.min(c + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckPage;