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

// Logo Component
const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
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

// Enhanced Slide Component with dark theme
const Slide: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className={`bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl shadow-2xl p-12 mx-auto w-full max-w-6xl mt-8 border border-gray-800 ${className}`}
  >
    {children}
  </motion.div>
);

// Title Component with enhanced styling
const SlideTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-gray-400">{subtitle}</p>
    )}
  </div>
);

// Title Slide
export const titleSlide = (
  <Slide key="title" className="text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-12 h-24 w-auto" />
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        The Future of AI & Blockchain Education
      </h1>
      <h2 className="text-2xl mb-8 text-gray-300">A Revolutionary Learning Platform</h2>
      <p className="text-xl mb-4 text-blue-400">Investment Opportunity</p>
      <p className="text-lg text-gray-400">February 2025</p>
    </motion.div>
  </Slide>
);

// Problem Slide
export const problemSlide = (
  <Slide key="problem">
    <SlideTitle 
      title="The Challenge" 
      subtitle="Current barriers in AI and blockchain education"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Brain className="w-8 h-8 text-blue-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Complex Technologies</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• Steep learning curve for AI and blockchain</li>
          <li>• Fragmented learning resources</li>
          <li>• Lack of practical, hands-on experience</li>
          <li>• Limited access to real-world applications</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-blue-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Industry Gaps</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• Traditional education can't keep pace</li>
          <li>• Theory-heavy learning approaches</li>
          <li>• Shortage of qualified instructors</li>
          <li>• High costs of specialized training</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Solution Slide
export const solutionSlide1 = (
  <Slide key="solution1">
    <SlideTitle 
      title="Our Solution" 
      subtitle="Revolutionizing technical education through AI"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Bot className="w-8 h-8 text-purple-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">AI-Powered Learning</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• Personalized learning paths</li>
          <li>• Real-time assistance and feedback</li>
          <li>• Adaptive difficulty scaling</li>
          <li>• Progress tracking and analytics</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Code className="w-8 h-8 text-purple-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Interactive Platform</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• Hands-on blockchain simulations</li>
          <li>• AI model experimentation</li>
          <li>• Real-world project integration</li>
          <li>• Community-driven learning</li>
        </ul>
      </div>
    </div>
  </Slide>
);

// Market Slides
export const marketSlide1 = (
  <Slide key="market1">
    <SlideTitle 
      title="Market Opportunity" 
      subtitle="Explosive growth in AI and blockchain sectors"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Market Size</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• AI education market: $5.3B by 2025</li>
          <li>• Blockchain education: $2.3B by 2025</li>
          <li>• Combined CAGR of 32%</li>
          <li>• 750M+ potential users globally</li>
        </ul>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Users className="w-8 h-8 text-green-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Target Segments</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
          <li>• Technology professionals</li>
          <li>• Corporate training programs</li>
          <li>• Academic institutions</li>
          <li>• Self-directed learners</li>
        </ul>
      </div>
    </div>
  </Slide>
);

export const technicalSlide = (
  <Slide key="technical">
    <SlideTitle title="Technical Architecture" subtitle="Robust and scalable infrastructure" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <Layout className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Frontend Stack</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
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
        <ul className="space-y-3 text-gray-400">
          <li>• Node.js Express server</li>
          <li>• PostgreSQL database</li>
          <li>• OpenAI integration</li>
          <li>• WebSocket real-time updates</li>
        </ul>
      </div>
    </div>
  </Slide>
);

export const financialSlide = (
  <Slide key="financial">
    <SlideTitle title="Financial Projections" subtitle="Strong revenue growth and profitability" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <DollarSign className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">Revenue Streams</h3>
        </div>
        <ul className="space-y-3 text-gray-400">
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
        <ul className="space-y-3 text-gray-400">
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
    <p className="mb-4 text-gray-400">To empower individuals with the knowledge and skills to thrive in the decentralized future.  We aim to bridge the gap between complex AI and blockchain technologies and accessible education.</p>
    <div className="bg-gray-800/50 rounded-lg shadow p-4 text-center border border-gray-700">
      <div className="flex items-center justify-center mb-2">
        <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Educating the Next Generation of AI & Blockchain Innovators</h3>
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
        <p className="text-gray-400">Growing institutional and retail investments in AI and crypto are fueling demand for skilled professionals.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Network className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Mainstream Adoption</h3>
        </div>
        <p className="text-gray-400">Increasing mainstream adoption of AI and cryptocurrency is creating a significant skills gap.</p>
      </div>
    </div>
  </Slide>
);

export const productSlide1 = (
  <Slide key="product1">
    <SlideTitle title="Our Product:  A Seamless Learning Experience" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Rocket className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg text-gray-200">Interactive Learning</h3>
        </div>
        <p className="text-gray-400">Gamified courses with hands-on projects and real-world applications to enhance engagement and knowledge retention.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Bot className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg text-gray-200">AI-Powered Personalization</h3>
        </div>
        <p className="text-gray-400">Adaptive learning paths tailored to individual needs and learning styles, maximizing efficiency and effectiveness.</p>
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
        <p className="text-gray-400">Learn from industry professionals with extensive experience in AI and blockchain.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Code className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg text-gray-200">Real-World Projects</h3>
        </div>
        <p className="text-gray-400">Gain hands-on experience by working on real-world projects to build a strong portfolio.</p>
      </div>
    </div>
  </Slide>
);

export const modulesSlide = (
  <Slide key="modules">
    <SlideTitle title="Our Modules: A Comprehensive Curriculum" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Fundamentals of AI</h3>
        </div>
        <p className="text-gray-400">Covering essential concepts, algorithms, and techniques in artificial intelligence.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">Blockchain Technology</h3>
        </div>
        <p className="text-gray-400">Exploring the fundamentals of blockchain, cryptocurrencies, smart contracts, and decentralized applications.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">AI & Blockchain Integration</h3>
        </div>
        <p className="text-gray-400">Delving into the synergy between AI and blockchain, exploring real-world applications and innovative use cases.</p>
      </div>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap:  Our Vision for the Future" />
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">2025 Milestones</h3>
        </div>
        <p className="text-gray-400">Platform launch, initial user acquisition, and strategic partnerships.</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-200">2026 Goals</h3>
        </div>
        <p className="text-gray-400">Expand curriculum, increase user base, and explore international markets.</p>
      </div>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date:  Building a Strong Foundation" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg text-gray-200">Key Achievements</h3>
        </div>
        <p className="text-gray-400">Completed core platform development, secured key partnerships, and established a strong team.</p>
      </div>
    </div>
  </Slide>
);

export const gtmSlide1 = (
  <Slide key="gtm1">
    <SlideTitle title="Go-to-Market Strategy:  Reaching Our Target Audience" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Rocket className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Market Entry Plan</h3>
      </div>
      <p className="text-gray-400">Targeted marketing campaigns focusing on technology professionals, academic institutions, and corporate training programs.</p>
    </div>
  </Slide>
);

export const gtmSlide2 = (
  <Slide key="gtm2">
    <SlideTitle title="GTM Expansion:  Global Reach" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Globe className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Internationalization</h3>
      </div>
      <p className="text-gray-400">Localization efforts and strategic partnerships to expand into key international markets.</p>
    </div>
  </Slide>
);

export const tokenSlide = (
  <Slide key="token">
    <SlideTitle title="Token Utility:  Fueling Platform Growth" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Code className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-200">Tokenomics</h3>
      </div>
      <p className="text-gray-400">A robust tokenomics model designed to incentivize community participation and platform growth.  Details to be shared in a separate document.</p>
    </div>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <SlideTitle title="Traction:  Early Success and Momentum" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg text-gray-200">Growth Metrics</h3>
      </div>
      <p className="text-gray-400">Significant user growth and engagement, exceeding initial projections.  Detailed data available upon request.</p>
    </div>
  </Slide>
);

export const fundingNarrativeSlide = (
  <Slide key="fundingNarrative">
    <SlideTitle title="Funding Narrative:  Investing in the Future" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Target className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg text-gray-200">Investment Opportunity</h3>
      </div>
      <p className="text-gray-400">A compelling investment opportunity with high growth potential in a rapidly expanding market.  Our detailed financial projections showcase significant returns.</p>
    </div>
  </Slide>
);

export const fundingBreakdownSlide = (
  <Slide key="fundingBreakdown">
    <SlideTitle title="Use of Funds:  Strategic Allocation for Growth" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Wallet className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg text-gray-200">Allocation</h3>
      </div>
      <p className="text-gray-400">Funds will be allocated strategically across platform development, marketing, and team expansion to ensure rapid growth and market penetration.  A detailed breakdown is available in the appendix.</p>
    </div>
  </Slide>
);

export const teamSlide = (
  <Slide key="team">
    <SlideTitle title="Our Team:  Experienced Leaders and Innovators" />
    <div className="bg-gray-800/50 rounded-lg shadow p-4 border border-gray-700">
      <div className="flex items-center mb-2">
        <Users className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-200">Leadership</h3>
      </div>
      <p className="text-gray-400">Our team comprises experienced professionals with deep expertise in AI, blockchain, and education.  Their combined skills and experience form the foundation of our success.</p>
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
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of AI & Blockchain Education</h2>
    </motion.div>
  </Slide>
);