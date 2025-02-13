import React from 'react';
import {
  Brain,
  Trophy,
  Dumbbell,
  Target,
  Rocket,
  Globe,
  BookOpen,
  GraduationCap,
  Zap,
  Shield,
  Users,
  Building,
  BarChart,
  Lightbulb,
  Wallet,
  Network,
  Code,
  Database,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Slide Component
const Slide: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className={`bg-white rounded-lg shadow-lg p-8 mx-auto w-full mt-8 ${className}`}
  >
    {children}
  </motion.div>
);

// Logo Component
const Logo = ({ className = '' }) => (
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

// Title Slide
export const titleSlide = (
  <Slide key="title" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8">Next-Generation Crypto Education Platform</h2>
      <p className="text-xl mb-4">Investor Pitch Deck</p>
      <p className="text-lg">2025</p>
    </motion.div>
  </Slide>
);

// Problem Slide
export const problemSlide = (
  <Slide key="problem">
    <h2 className="text-2xl font-bold mb-4">The Problem</h2>
    <p className="mb-4">Current crypto education is fragmented, lacks engagement, and fails to provide practical skills.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-red-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="font-bold text-lg">Lack of Engagement</h3>
        </div>
        <p>Existing resources are often boring and passive, leading to low retention rates.</p>
      </div>
      <div className="bg-red-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="font-bold text-lg">Limited Practical Application</h3>
        </div>
        <p>Theoretical knowledge without hands-on experience fails to prepare users for real-world scenarios.</p>
      </div>
    </div>
  </Slide>
);

// Solution Slides
export const solutionSlide1 = (
  <Slide key="solution1">
    <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
    <p className="mb-4">
      Sulla provides an engaging and practical crypto education platform with a focus on hands-on learning and community engagement.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Rocket className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Interactive Learning Modules</h3>
        </div>
        <p>Our platform features gamified modules that combine theory with practical exercises.</p>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Globe className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Community-Driven Platform</h3>
        </div>
        <p>Users can collaborate, share insights, and learn from each other.</p>
      </div>
    </div>
  </Slide>
);

export const solutionSlide2 = (
  <Slide key="solution2">
    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Zap className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Real-Time Market Simulators</h3>
        </div>
        <p>Practice trading strategies in a risk-free environment.</p>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Shield className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Security Focused Approach</h3>
        </div>
        <p>Learn security best practices throughout all modules.</p>
      </div>
    </div>
  </Slide>
);

// Mission Slide
export const missionSlide = (
  <Slide key="mission">
    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
    <p className="mb-4">To empower individuals with the knowledge and skills to thrive in the decentralized future.</p>
    <div className="bg-blue-100 rounded-lg shadow p-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Educating the Next Generation of Crypto Innovators</h3>
      </div>
    </div>
  </Slide>
);

// Market Slides
export const marketSlide1 = (
  <Slide key="market1">
    <h2 className="text-2xl font-bold mb-4">Market Opportunity</h2>
    <div className="bg-gray-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Large and Growing Market</h3>
      </div>
      <p>The crypto education market is rapidly expanding with significant growth potential.</p>
    </div>
  </Slide>
);

export const marketSlide2 = (
  <Slide key="market2">
    <h2 className="text-2xl font-bold mb-4">Market Trends</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Wallet className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Increased Investment</h3>
        </div>
        <p>Growing institutional and retail investments in crypto.</p>
      </div>
      <div className="bg-gray-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Network className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Mainstream Adoption</h3>
        </div>
        <p>Increasing mainstream adoption of cryptocurrency.</p>
      </div>
    </div>
  </Slide>
);

// Product Slides
export const productSlide1 = (
  <Slide key="product1">
    <h2 className="text-2xl font-bold mb-4">Our Product</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Rocket className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">Interactive Learning</h3>
        </div>
        <p>Gamified courses that make learning engaging and fun.</p>
      </div>
    </div>
  </Slide>
);

export const productSlide2 = (
  <Slide key="product2">
    <h2 className="text-2xl font-bold mb-4">Key Platform Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Users className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">Expert Instructors</h3>
        </div>
        <p>Learn from industry professionals with extensive experience.</p>
      </div>
    </div>
  </Slide>
);

// Other slides exports (basic structure for completeness)
export const modulesSlide = (
  <Slide key="modules">
    <h2 className="text-2xl font-bold mb-4">Our Modules</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Comprehensive Curriculum</h3>
        </div>
        <p>Structured learning path from basics to advanced topics.</p>
      </div>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
    <div className="space-y-4">
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">2025 Milestones</h3>
        </div>
        <p>Platform launch and initial user acquisition.</p>
      </div>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <h2 className="text-2xl font-bold mb-4">Progress & Technical Capabilities</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Key Achievements</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>Successful MVP launch with initial user testing</li>
          <li>Integration of AI-powered learning tools</li>
          <li>Strategic partnerships with blockchain projects</li>
        </ul>
      </div>
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Technical Stack</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>Next.js & TypeScript frontend for robust UI</li>
          <li>PostgreSQL database with advanced analytics</li>
          <li>AI/ML pipeline for personalized learning</li>
        </ul>
      </div>
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Database className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">Data Collection</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>User interaction tracking & analysis</li>
          <li>Learning pattern recognition</li>
          <li>Progress metrics & performance data</li>
        </ul>
      </div>
      <div className="bg-indigo-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 mr-2 text-indigo-500" />
          <h3 className="font-bold text-lg">AI Capabilities</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>Adaptive learning pathways</li>
          <li>Content recommendation engine</li>
          <li>Performance prediction models</li>
        </ul>
      </div>
    </div>
  </Slide>
);

export const gtmSlide1 = (
  <Slide key="gtm1">
    <h2 className="text-2xl font-bold mb-4">Go-to-Market Strategy</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Rocket className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Market Entry Plan</h3>
      </div>
      <p>Strategic partnerships and targeted marketing campaigns.</p>
    </div>
  </Slide>
);

export const gtmSlide2 = (
  <Slide key="gtm2">
    <h2 className="text-2xl font-bold mb-4">GTM Expansion</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Globe className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Global Reach</h3>
      </div>
      <p>International expansion and localization strategy.</p>
    </div>
  </Slide>
);

export const technicalBackendSlide = (
  <Slide key="technical-backend">
    <h2 className="text-2xl font-bold mb-4">Technical Infrastructure</h2>
    <div className="space-y-4">
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Database className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Learning Analytics Engine</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>Comprehensive user progress tracking system</li>
          <li>Real-time performance analytics</li>
          <li>Behavioral pattern analysis for personalized learning</li>
        </ul>
      </div>
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">AI Infrastructure</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>Advanced data collection framework</li>
          <li>Machine learning pipeline for content personalization</li>
          <li>Predictive analytics for learning outcomes</li>
        </ul>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Shield className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Data Security & Privacy</h3>
        </div>
        <ul className="list-disc pl-6">
          <li>End-to-end encryption for user data</li>
          <li>GDPR-compliant data handling</li>
          <li>Secure API infrastructure</li>
        </ul>
      </div>
    </div>
  </Slide>
);

export const tokenSlide = (
  <Slide key="token">
    <h2 className="text-2xl font-bold mb-4">Token Utility</h2>
    <div className="bg-purple-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Code className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg">Token Economics</h3>
      </div>
      <p>Platform token utility and governance model.</p>
    </div>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <h2 className="text-2xl font-bold mb-4">Traction</h2>
    <div className="bg-green-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg">Growth Metrics</h3>
      </div>
      <p>User growth and engagement statistics.</p>
    </div>
  </Slide>
);

export const financialSlide = (
  <Slide key="financial">
    <h2 className="text-2xl font-bold mb-4">Financial Highlights</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Building className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Revenue Model</h3>
      </div>
      <p>Subscription and token-based revenue streams.</p>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <h2 className="text-2xl font-bold mb-4">Financial Model</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Projections</h3>
      </div>
      <p>Five-year financial projections and metrics.</p>
    </div>
  </Slide>
);

export const fundingNarrativeSlide = (
  <Slide key="fundingNarrative">
    <h2 className="text-2xl font-bold mb-4">Funding Narrative</h2>
    <div className="bg-green-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Target className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg">Investment Opportunity</h3>
      </div>
      <p>Growth strategy and investment thesis.</p>
    </div>
  </Slide>
);

export const fundingBreakdownSlide = (
  <Slide key="fundingBreakdown">
    <h2 className="text-2xl font-bold mb-4">Use of Funds</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Wallet className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Allocation</h3>
      </div>
      <p>Detailed breakdown of funding allocation.</p>
    </div>
  </Slide>
);

export const teamSlide = (
  <Slide key="team">
    <h2 className="text-2xl font-bold mb-4">Our Team</h2>
    <div className="bg-purple-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Users className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg">Leadership</h3>
      </div>
      <p>Experienced team with deep industry expertise.</p>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8">Join the Future of Crypto Education</h2>
    </motion.div>
  </Slide>
);