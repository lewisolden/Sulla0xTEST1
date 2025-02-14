import React from 'react';
import {
  Brain,
  Trophy,
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
    className={`relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-12 mx-auto w-full max-w-6xl mt-8 border border-gray-800 ${className}`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Title Component with enhanced styling
const SlideTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-10">
    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-gray-400">{subtitle}</p>
    )}
  </div>
);

// Content Box Component
const ContentBox: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
    <div className="flex items-center mb-4">
      <div className="text-blue-400 mr-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
    </div>
    {children}
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
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Brain className="w-8 h-8" />} title="Complex Technologies">
        <ul className="space-y-3 text-gray-400">
          <li>• Steep learning curve for AI and blockchain concepts</li>
          <li>• Fragmented learning resources across platforms</li>
          <li>• Limited hands-on practice opportunities</li>
          <li>• Gap between theory and practical application</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Shield className="w-8 h-8" />} title="Industry Gaps">
        <ul className="space-y-3 text-gray-400">
          <li>• Traditional education can't keep pace with innovation</li>
          <li>• Shortage of qualified instructors in both fields</li>
          <li>• High costs of specialized training programs</li>
          <li>• Lack of interactive, adaptive learning solutions</li>
        </ul>
      </ContentBox>
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
      <ContentBox icon={<Bot className="w-8 h-8" />} title="AI-Powered Learning">
        <ul className="space-y-3 text-gray-400">
          <li>• Personalized learning paths</li>
          <li>• Real-time assistance and feedback</li>
          <li>• Adaptive difficulty scaling</li>
          <li>• Progress tracking and analytics</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Code className="w-8 h-8" />} title="Interactive Platform">
        <ul className="space-y-3 text-gray-400">
          <li>• Hands-on blockchain simulations</li>
          <li>• AI model experimentation</li>
          <li>• Real-world project integration</li>
          <li>• Community-driven learning</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);


export const technicalSlide = (
  <Slide key="technical">
    <SlideTitle 
      title="What Makes Sulla Unique?" 
      subtitle="Next-Generation Learning Platform Architecture"
    />
    <div className="space-y-8">
      {/* Architecture Diagram */}
      <div className="w-full bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <svg
          viewBox="0 0 800 300"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Client Layer */}
          <g>
            <rect x="50" y="20" width="700" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
            <text x="370" y="55" fontSize="16" fill="#94a3b8" textAnchor="middle">Client Layer</text>
            <rect x="80" y="35" width="120" height="30" rx="4" fill="#334155"/>
            <text x="140" y="55" fontSize="12" fill="#94a3b8" textAnchor="middle">Next.js + React</text>
            <rect x="220" y="35" width="120" height="30" rx="4" fill="#334155"/>
            <text x="280" y="55" fontSize="12" fill="#94a3b8" textAnchor="middle">TailwindCSS</text>
            <rect x="360" y="35" width="120" height="30" rx="4" fill="#334155"/>
            <text x="420" y="55" fontSize="12" fill="#94a3b8" textAnchor="middle">React Query</text>
            <rect x="500" y="35" width="120" height="30" rx="4" fill="#334155"/>
            <text x="560" y="55" fontSize="12" fill="#94a3b8" textAnchor="middle">Framer Motion</text>
          </g>

          {/* API Layer */}
          <g>
            <rect x="50" y="120" width="700" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
            <text x="370" y="155" fontSize="16" fill="#94a3b8" textAnchor="middle">API Layer</text>
            <rect x="80" y="135" width="120" height="30" rx="4" fill="#334155"/>
            <text x="140" y="155" fontSize="12" fill="#94a3b8" textAnchor="middle">Express.js</text>
            <rect x="220" y="135" width="120" height="30" rx="4" fill="#334155"/>
            <text x="280" y="155" fontSize="12" fill="#94a3b8" textAnchor="middle">WebSocket</text>
            <rect x="360" y="135" width="120" height="30" rx="4" fill="#334155"/>
            <text x="420" y="155" fontSize="12" fill="#94a3b8" textAnchor="middle">OpenAI API</text>
            <rect x="500" y="135" width="120" height="30" rx="4" fill="#334155"/>
            <text x="560" y="155" fontSize="12" fill="#94a3b8" textAnchor="middle">Auth System</text>
          </g>

          {/* Data Layer */}
          <g>
            <rect x="50" y="220" width="700" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
            <text x="370" y="255" fontSize="16" fill="#94a3b8" textAnchor="middle">Data Layer</text>
            <rect x="80" y="235" width="120" height="30" rx="4" fill="#334155"/>
            <text x="140" y="255" fontSize="12" fill="#94a3b8" textAnchor="middle">PostgreSQL</text>
            <rect x="220" y="235" width="120" height="30" rx="4" fill="#334155"/>
            <text x="280" y="255" fontSize="12" fill="#94a3b8" textAnchor="middle">Drizzle ORM</text>
            <rect x="360" y="235" width="120" height="30" rx="4" fill="#334155"/>
            <text x="420" y="255" fontSize="12" fill="#94a3b8" textAnchor="middle">Redis Cache</text>
            <rect x="500" y="235" width="120" height="30" rx="4" fill="#334155"/>
            <text x="560" y="255" fontSize="12" fill="#94a3b8" textAnchor="middle">Data Analytics</text>
          </g>

          {/* Connecting Lines */}
          <path d="M400 80 L400 120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
          <path d="M400 180 L400 220" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4"/>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Layout className="w-8 h-8" />} title="Modern Frontend Architecture">
          <ul className="space-y-3 text-gray-400">
            <li>• Next.js with TypeScript for robust type safety and performance</li>
            <li>• Advanced state management with React Query for real-time data</li>
            <li>• Responsive UI with Tailwind CSS and custom animations</li>
            <li>• Component-driven development with shadcn/ui system</li>
            <li>• Progressive Web App capabilities for offline learning</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Scalable Backend Infrastructure">
          <ul className="space-y-3 text-gray-400">
            <li>• Express.js server with modular API architecture</li>
            <li>• Real-time WebSocket connections for live interactions</li>
            <li>• OpenAI integration for adaptive learning features</li>
            <li>• JWT-based authentication with role-based access</li>
            <li>• Comprehensive API documentation with Swagger</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="AI-Powered Features">
          <ul className="space-y-3 text-gray-400">
            <li>• Dynamic content adaptation based on learning patterns</li>
            <li>• Real-time concept explanations and clarifications</li>
            <li>• Personalized learning paths with AI recommendations</li>
            <li>• Automated assessment and feedback systems</li>
            <li>• Natural language processing for content understanding</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Shield className="w-8 h-8" />} title="Data & Security">
          <ul className="space-y-3 text-gray-400">
            <li>• PostgreSQL database with Drizzle ORM for type safety</li>
            <li>• Redis caching for optimized performance</li>
            <li>• End-to-end encryption for user data protection</li>
            <li>• Regular automated backups and disaster recovery</li>
            <li>• GDPR and CCPA compliant data handling</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

// Solution Slide 2
export const solutionSlide2 = (
  <Slide key="solution2">
    <SlideTitle 
      title="Core Platform Features" 
      subtitle="Advanced Learning Technologies in Action"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Comprehensive Course Structure">
        <ul className="space-y-3 text-gray-400">
          <li>• Modular learning paths covering AI and blockchain fundamentals to advanced concepts</li>
          <li>• Rich multimedia content with interactive diagrams and visualizations</li>
          <li>• Step-by-step practical exercises with real-world applications</li>
          <li>• Dynamic content updates reflecting latest industry developments</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Brain className="w-6 h-6" />} title="AI-Powered Learning">
        <ul className="space-y-3 text-gray-400">
          <li>• Adaptive difficulty adjustment based on performance analytics</li>
          <li>• Personalized learning paths using advanced AI algorithms</li>
          <li>• Real-time concept clarification and assistance</li>
          <li>• Smart content recommendations based on learning patterns</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="Comprehensive Assessment">
        <ul className="space-y-3 text-gray-400">
          <li>• Multi-format testing with adaptive questioning</li>
          <li>• Real-time performance analytics and progress tracking</li>
          <li>• Skill mastery verification through practical challenges</li>
          <li>• Automated feedback and improvement suggestions</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Zap className="w-6 h-6" />} title="Enhanced Learning Experience">
        <ul className="space-y-3 text-gray-400">
          <li>• Interactive simulations for hands-on practice</li>
          <li>• Achievement system with skill-based badges</li>
          <li>• Community-driven learning opportunities</li>
          <li>• Enterprise-grade progress reporting and analytics</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const missionSlide = (
  <Slide key="mission">
    <SlideTitle title="Our Vision & Mission" />
    <div className="space-y-6">
      <p className="text-xl text-gray-300 leading-relaxed mb-8">
        We are building the world's most advanced AI-powered educational platform, revolutionizing how complex technologies are learned and mastered. Our mission is to democratize access to cutting-edge technical education through an intelligent, adaptive system that evolves with each learner.
      </p>
      <ContentBox icon={<Lightbulb className="w-6 h-6" />} title="Building the Future of Education">
        <div className="space-y-4 text-gray-400">
          <p>• Creating an unprecedented learning experience where AI actively participates in the educational journey, providing personalized guidance, real-time adaptations, and intelligent feedback.</p>
          <p>• Developing a living platform that continuously evolves, incorporating the latest developments in AI and blockchain technology while maintaining accessibility for learners at all levels.</p>
          <p>• Fostering a global community of innovators and thought leaders who will shape the future of technology through collaborative learning and knowledge sharing.</p>
        </div>
      </ContentBox>
    </div>
  </Slide>
);

export const marketSlide2 = (
  <Slide key="market2">
    <SlideTitle title="Market Trends" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<Wallet className="w-6 h-6" />} title="Increased Investment">
        <p className="text-gray-400">Growing institutional and retail investments in AI and crypto are fueling demand for skilled professionals.</p>
      </ContentBox>
      <ContentBox icon={<Network className="w-6 h-6" />} title="Mainstream Adoption">
        <p className="text-gray-400">Increasing mainstream adoption of AI and cryptocurrency is creating a significant skills gap.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const productSlide1 = (
  <Slide key="product1">
    <SlideTitle title="Our Product:  A Seamless Learning Experience" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<Rocket className="w-6 h-6" />} title="Interactive Learning">
        <p className="text-gray-400">Gamified courses with hands-on projects and real-world applications to enhance engagement and knowledge retention.</p>
      </ContentBox>
      <ContentBox icon={<Bot className="w-6 h-6" />} title="AI-Powered Personalization">
        <p className="text-gray-400">Adaptive learning paths tailored to individual needs and learning styles, maximizing efficiency and effectiveness.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const productSlide2 = (
  <Slide key="product2">
    <SlideTitle title="Key Platform Features" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<Users className="w-6 h-6" />} title="Expert Instructors">
        <p className="text-gray-400">Learn from industry professionals with extensive experience in AI and blockchain.</p>
      </ContentBox>
      <ContentBox icon={<Code className="w-6 h-6" />} title="Real-World Projects">
        <p className="text-gray-400">Gain hands-on experience by working on real-world projects to build a strong portfolio.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const modulesSlide = (
  <Slide key="modules">
    <SlideTitle title="Our Modules: A Comprehensive Curriculum" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Fundamentals of AI">
        <p className="text-gray-400">Covering essential concepts, algorithms, and techniques in artificial intelligence.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Blockchain Technology">
        <p className="text-gray-400">Exploring the fundamentals of blockchain, cryptocurrencies, smart contracts, and decentralized applications.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="AI & Blockchain Integration">
        <p className="text-gray-400">Delving into the synergy between AI and blockchain, exploring real-world applications and innovative use cases.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap:  Our Vision for the Future" />
    <div className="space-y-4">
      <ContentBox icon={<Target className="w-6 h-6" />} title="2025 Milestones">
        <p className="text-gray-400">Platform launch, initial user acquisition, and strategic partnerships.</p>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="2026 Goals">
        <p className="text-gray-400">Expand curriculum, increase user base, and explore international markets.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date:  Building a Strong Foundation" />
    <ContentBox icon={<Trophy className="w-6 h-6" />} title="Key Achievements">
      <p className="text-gray-400">Completed core platform development, secured key partnerships, and established a strong team.</p>
    </ContentBox>
  </Slide>
);

export const gtmSlide1 = (
  <Slide key="gtm1">
    <SlideTitle title="Go-to-Market Strategy:  Reaching Our Target Audience" />
    <ContentBox icon={<Rocket className="w-6 h-6" />} title="Market Entry Plan">
      <p className="text-gray-400">Targeted marketing campaigns focusing on technology professionals, academic institutions, and corporate training programs.</p>
    </ContentBox>
  </Slide>
);

export const gtmSlide2 = (
  <Slide key="gtm2">
    <SlideTitle title="GTM Expansion:  Global Reach" />
    <ContentBox icon={<Globe className="w-6 h-6" />} title="Internationalization">
      <p className="text-gray-400">Localization efforts and strategic partnerships to expand into key international markets.</p>
    </ContentBox>
  </Slide>
);

export const tokenSlide = (
  <Slide key="token">
    <SlideTitle title="Token Utility:  Fueling Platform Growth" />
    <ContentBox icon={<Code className="w-6 h-6" />} title="Tokenomics">
      <p className="text-gray-400">A robust tokenomics model designed to incentivize community participation and platform growth.  Details to be shared in a separate document.</p>
    </ContentBox>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <SlideTitle title="Traction:  Early Success and Momentum" />
    <ContentBox icon={<BarChart className="w-6 h-6" />} title="Growth Metrics">
      <p className="text-gray-400">Significant user growth and engagement, exceeding initial projections.  Detailed data available upon request.</p>
    </ContentBox>
  </Slide>
);

export const fundingNarrativeSlide = (
  <Slide key="fundingNarrative">
    <SlideTitle title="Funding Narrative:  Investing in the Future" />
    <ContentBox icon={<Target className="w-6 h-6" />} title="Investment Opportunity">
      <p className="text-gray-400">A compelling investment opportunity with high growth potential in a rapidly expanding market.  Our detailed financial projections showcase significant returns.</p>
    </ContentBox>
  </Slide>
);

export const fundingBreakdownSlide = (
  <Slide key="fundingBreakdown">
    <SlideTitle title="Use of Funds:  Strategic Allocation for Growth" />
    <ContentBox icon={<Wallet className="w-6 h-6" />} title="Allocation">
      <p className="text-gray-400">Funds will be allocated strategically across platform development, marketing, and team expansion to ensure rapid growth and market penetration.  A detailed breakdown is available in the appendix.</p>
    </ContentBox>
  </Slide>
);

export const teamSlide = (
  <Slide key="team">
    <SlideTitle title="Our Team:  Experienced Leaders and Innovators" />
    <ContentBox icon={<Users className="w-6 h-6" />} title="Leadership">
      <p className="text-gray-400">Our team comprises experienced professionals with deep expertise in AI, blockchain, and education.  Their combined skills and experience form the foundation of our success.</p>
    </ContentBox>
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