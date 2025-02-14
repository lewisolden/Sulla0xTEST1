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

// Enhanced Slide Component with dark theme
const Slide: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5 }}
    className={`bg-gray-900 rounded-xl shadow-2xl p-12 mx-auto w-full max-w-6xl mt-8 border border-gray-800 ${className}`}
  >
    {children}
  </motion.div>
);

// Enhanced Logo Component
const Logo = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 50"
    className={`h-20 w-auto ${className}`}
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

// Title Component
const SlideTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-gray-400 mt-2">{subtitle}</p>
    )}
  </div>
);

// Title Slide
export const titleSlide = (
  <Slide key="title" className="text-center bg-gradient-to-br from-blue-900 to-black text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-10 h-24 w-auto" />
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
        Revolutionizing Blockchain Education
      </h1>
      <h2 className="text-2xl mb-8 text-gray-300">Interactive Learning Platform</h2>
      <p className="text-xl mb-4 text-blue-400">Investment Opportunity</p>
      <p className="text-lg text-gray-400">February 2025</p>
    </motion.div>
  </Slide>
);

// Problem Slide with enhanced styling
export const problemSlide = (
  <Slide key="problem">
    <SlideTitle 
      title="The Problem" 
      subtitle="Current challenges in blockchain education"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Brain className="w-8 h-8 text-blue-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Complex Learning Curve</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Steep technical barriers for newcomers</li>
          <li>• Fragmented learning resources</li>
          <li>• Lack of structured curriculum</li>
          <li>• Poor retention rates in traditional courses</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-blue-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Industry Challenges</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Limited hands-on practice opportunities</li>
          <li>• Outdated teaching methodologies</li>
          <li>• Lack of interactive learning tools</li>
          <li>• Gap between theory and practical application</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Solution Slides with enhanced styling
export const solutionSlide1 = (
  <Slide key="solution1">
    <SlideTitle title="Our Solution" subtitle="Addressing the challenges of blockchain education" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Rocket className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Interactive Learning Platform</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• AI-powered adaptive learning paths</li>
          <li>• Real-time blockchain simulations</li>
          <li>• Gamified learning experiences</li>
          <li>• Progress tracking and analytics</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Bot className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">AI Integration</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Personalized learning recommendations</li>
          <li>• Intelligent content adaptation</li>
          <li>• Real-time assistance and feedback</li>
          <li>• Performance analytics</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Market Slides with enhanced styling
export const marketSlide1 = (
  <Slide key="market1">
    <SlideTitle title="Market Opportunity" subtitle="Significant growth potential in blockchain education" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Market Size</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Global EdTech market: $342B by 2025</li>
          <li>• Blockchain education segment: $2.3B</li>
          <li>• 32% YoY growth in demand</li>
          <li>• 500M+ potential users by 2026</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <PieChart className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Target Segments</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Students and academics</li>
          <li>• Professional developers</li>
          <li>• Corporate training programs</li>
          <li>• Crypto enthusiasts</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Technical Overview Slide with enhanced styling
export const technicalSlide = (
  <Slide key="technical">
    <SlideTitle title="Technical Architecture" subtitle="Robust and scalable infrastructure" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Layout className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Frontend Stack</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Next.js with TypeScript</li>
          <li>• Tailwind CSS for styling</li>
          <li>• Framer Motion animations</li>
          <li>• React Query for state management</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Database className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Backend Infrastructure</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Node.js Express server</li>
          <li>• PostgreSQL database</li>
          <li>• OpenAI integration</li>
          <li>• WebSocket real-time updates</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Financial Slides with enhanced styling
export const financialSlide = (
  <Slide key="financial">
    <SlideTitle title="Financial Projections" subtitle="Strong revenue growth and profitability" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <DollarSign className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Revenue Streams</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
          <li>• Subscription model: $15M (Year 1)</li>
          <li>• Enterprise licenses: $8M</li>
          <li>• Custom content creation: $5M</li>
          <li>• B2B partnerships: $7M</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Briefcase className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Growth Metrics</h3>
        </div>
        <ul className="space-y-2 text-gray-400">
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
    <SlideTitle title="Key Features" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Zap className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg text-gray-200">Real-Time Market Simulators</h3>
        </div>
        <p className="text-gray-400">Practice trading strategies in a risk-free environment.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Shield className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg text-gray-200">Security Focused Approach</h3>
        </div>
        <p className="text-gray-400">Learn security best practices throughout all modules.</p>
      </div>
    </div>
  </Slide>
);


export const missionSlide = (
  <Slide key="mission">
    <SlideTitle title="Our Mission" />
    <p className="mb-4 text-gray-400">To empower individuals with the knowledge and skills to thrive in the decentralized future.</p>
    <div className="bg-gray-800/50 rounded-lg shadow p-4 text-center border border-gray-700">
      <div className="flex items-center justify-center mb-2">
        <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Educating the Next Generation of Crypto Innovators</h3>
      </div>
    </div>
  </Slide>
);

export const marketSlide2 = (
  <Slide key="market2">
    <SlideTitle title="Market Trends" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Wallet className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Increased Investment</h3>
        </div>
        <p className="text-gray-400">Growing institutional and retail investments in crypto.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Network className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Mainstream Adoption</h3>
        </div>
        <p className="text-gray-400">Increasing mainstream adoption of cryptocurrency.</p>
      </div>
    </div>
  </Slide>
);

export const productSlide1 = (
  <Slide key="product1">
    <SlideTitle title="Our Product" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Rocket className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg text-gray-200">Interactive Learning</h3>
        </div>
        <p className="text-gray-400">Gamified courses that make learning engaging and fun.</p>
      </div>
    </div>
  </Slide>
);

export const productSlide2 = (
  <Slide key="product2">
    <SlideTitle title="Key Platform Features" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Users className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg text-gray-200">Expert Instructors</h3>
        </div>
        <p className="text-gray-400">Learn from industry professionals with extensive experience.</p>
      </div>
    </div>
  </Slide>
);

export const modulesSlide = (
  <Slide key="modules">
    <SlideTitle title="Our Modules" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Comprehensive Curriculum</h3>
        </div>
        <p className="text-gray-400">Structured learning path from basics to advanced topics.</p>
      </div>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap" />
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">2025 Milestones</h3>
        </div>
        <p className="text-gray-400">Platform launch and initial user acquisition.</p>
      </div>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg text-gray-200">Key Achievements</h3>
        </div>
        <p className="text-gray-400">Development milestones and early partnerships.</p>
      </div>
    </div>
  </Slide>
);

export const gtmSlide1 = (
  <Slide key="gtm1">
    <SlideTitle title="Go-to-Market Strategy" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Rocket className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Market Entry Plan</h3>
      </div>
      <p className="text-gray-400">Strategic partnerships and targeted marketing campaigns.</p>
    </div>
  </Slide>
);

export const gtmSlide2 = (
  <Slide key="gtm2">
    <SlideTitle title="GTM Expansion" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Globe className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Global Reach</h3>
      </div>
      <p className="text-gray-400">International expansion and localization strategy.</p>
    </div>
  </Slide>
);

export const tokenSlide = (
  <Slide key="token">
    <SlideTitle title="Token Utility" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Code className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-200">Token Economics</h3>
      </div>
      <p className="text-gray-400">Platform token utility and governance model.</p>
    </div>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <SlideTitle title="Traction" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg text-gray-200">Growth Metrics</h3>
      </div>
      <p className="text-gray-400">User growth and engagement statistics.</p>
    </div>
  </Slide>
);

export const fundingNarrativeSlide = (
  <Slide key="fundingNarrative">
    <SlideTitle title="Funding Narrative" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Target className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg text-gray-200">Investment Opportunity</h3>
      </div>
      <p className="text-gray-400">Growth strategy and investment thesis.</p>
    </div>
  </Slide>
);

export const fundingBreakdownSlide = (
  <Slide key="fundingBreakdown">
    <SlideTitle title="Use of Funds" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Wallet className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Allocation</h3>
      </div>
      <p className="text-gray-400">Detailed breakdown of funding allocation.</p>
    </div>
  </Slide>
);

export const teamSlide = (
  <Slide key="team">
    <SlideTitle title="Our Team" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Users className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-200">Leadership</h3>
      </div>
      <p className="text-gray-400">Experienced team with deep industry expertise.</p>
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
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of Crypto Education</h2>
    </motion.div>
  </Slide>
);