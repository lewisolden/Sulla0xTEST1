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
  Layout,
  Bot,
  School,
  TrendingUp,
  DollarSign,
  PieChart,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

// Slide Component with enhanced styling
const Slide: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5 }}
    className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl p-10 mx-auto w-full max-w-6xl mt-8 ${className}`}
  >
    {children}
  </motion.div>
);

// Logo Component
const Logo = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 50"
    className={`h-16 w-auto ${className}`}
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

// Title Slide with enhanced styling
export const titleSlide = (
  <Slide key="title" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-20 w-auto" />
      <h1 className="text-4xl font-bold mb-6">Revolutionizing Blockchain Education</h1>
      <h2 className="text-2xl mb-8">Interactive Learning Platform</h2>
      <p className="text-xl mb-4">Investment Opportunity</p>
      <p className="text-lg opacity-80">February 2025</p>
    </motion.div>
  </Slide>
);

// Problem Slide with detailed content
export const problemSlide = (
  <Slide key="problem">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">The Problem</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Brain className="w-8 h-8 text-red-500 mr-3" />
          <h3 className="text-xl font-semibold">Complex Learning Curve</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Steep technical barriers for newcomers</li>
          <li>• Fragmented learning resources</li>
          <li>• Lack of structured curriculum</li>
          <li>• Poor retention rates in traditional courses</li>
        </ul>
      </div>
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-red-500 mr-3" />
          <h3 className="text-xl font-semibold">Industry Challenges</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Limited hands-on practice opportunities</li>
          <li>• Outdated teaching methodologies</li>
          <li>• Lack of interactive learning tools</li>
          <li>• Gap between theory and practical application</li>
        </ul>
      </div>
    </div>
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Current blockchain education fails to provide an engaging, comprehensive learning experience that prepares students for real-world applications.
      </p>
    </div>
  </Slide>
);

// Solution Slides with comprehensive details
export const solutionSlide1 = (
  <Slide key="solution1">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Solution</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Rocket className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold">Interactive Learning Platform</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• AI-powered adaptive learning paths</li>
          <li>• Real-time blockchain simulations</li>
          <li>• Gamified learning experiences</li>
          <li>• Progress tracking and analytics</li>
        </ul>
      </div>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Bot className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold">AI Integration</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Personalized learning recommendations</li>
          <li>• Intelligent content adaptation</li>
          <li>• Real-time assistance and feedback</li>
          <li>• Performance analytics</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Market Slides with detailed analysis
export const marketSlide1 = (
  <Slide key="market1">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Market Opportunity</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold">Market Size</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Global EdTech market: $342B by 2025</li>
          <li>• Blockchain education segment: $2.3B</li>
          <li>• 32% YoY growth in demand</li>
          <li>• 500M+ potential users by 2026</li>
        </ul>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <PieChart className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold">Target Segments</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Students and academics</li>
          <li>• Professional developers</li>
          <li>• Corporate training programs</li>
          <li>• Crypto enthusiasts</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Technical Overview Slide
export const technicalSlide = (
  <Slide key="technical">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Technical Architecture</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Layout className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-xl font-semibold">Frontend Stack</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Next.js with TypeScript</li>
          <li>• Tailwind CSS for styling</li>
          <li>• Framer Motion animations</li>
          <li>• React Query for state management</li>
        </ul>
      </div>
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Database className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-xl font-semibold">Backend Infrastructure</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Node.js Express server</li>
          <li>• PostgreSQL database</li>
          <li>• OpenAI integration</li>
          <li>• WebSocket real-time updates</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Financial Slides with detailed projections
export const financialSlide = (
  <Slide key="financial">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Financial Projections</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold">Revenue Streams</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Subscription model: $15M (Year 1)</li>
          <li>• Enterprise licenses: $8M</li>
          <li>• Custom content creation: $5M</li>
          <li>• B2B partnerships: $7M</li>
        </ul>
      </div>
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Briefcase className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold">Growth Metrics</h3>
        </div>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• User acquisition cost: $42</li>
          <li>• Customer LTV: $850</li>
          <li>• Gross margin: 75%</li>
          <li>• Monthly growth rate: 15%</li>
        </ul>
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
    <h2 className="text-2xl font-bold mb-4">Progress to Date</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Key Achievements</h3>
        </div>
        <p>Development milestones and early partnerships.</p>
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