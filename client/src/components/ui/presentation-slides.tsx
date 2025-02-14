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

// Market Slides
export const marketSlide1 = (
  <Slide key="market1">
    <SlideTitle 
      title="Market Opportunity" 
      subtitle="Bridging the Critical Education Gap in Revolutionary Technologies"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<TrendingUp className="w-8 h-8" />} title="Explosive Market Growth">
        <ul className="space-y-3 text-gray-400">
          <li>• Combined AI & blockchain education market: $7.6B by 2025</li>
          <li>• 87% of global workforce lacks AI & blockchain literacy</li>
          <li>• 32% CAGR in demand for technical education</li>
          <li>• Only 1% of global population understands these technologies</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Users className="w-8 h-8" />} title="Universal Education Need">
        <ul className="space-y-3 text-gray-400">
          <li>• Every industry requires AI & blockchain competency</li>
          <li>• Critical skills gap in both enterprise and education</li>
          <li>• Traditional education systems struggling to adapt</li>
          <li>• Global demand for accessible, quality learning</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Globe className="w-8 h-8" />} title="Global Impact">
        <ul className="space-y-3 text-gray-400">
          <li>• Technologies reshaping every sector globally</li>
          <li>• Urgent need for widespread digital literacy</li>
          <li>• Democratizing access to technical knowledge</li>
          <li>• Building foundation for future workforce</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Target className="w-8 h-8" />} title="Market Positioning">
        <ul className="space-y-3 text-gray-400">
          <li>• First-mover advantage in integrated AI/blockchain education</li>
          <li>• Addressing critical market gap with innovative solution</li>
          <li>• Scalable platform reaching global audience</li>
          <li>• Strategic timing as technologies become mainstream</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const technicalSlide = (
  <Slide key="technical">
    <SlideTitle title="Technical Architecture" subtitle="Robust and scalable infrastructure" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Layout className="w-8 h-8" />} title="Frontend Stack">
        <ul className="space-y-3 text-gray-400">
          <li>• Next.js with TypeScript</li>
          <li>• Tailwind CSS for styling</li>
          <li>• Framer Motion animations</li>
          <li>• React Query for state management</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Database className="w-8 h-8" />} title="Backend Infrastructure">
        <ul className="space-y-3 text-gray-400">
          <li>• Node.js Express server</li>
          <li>• PostgreSQL database</li>
          <li>• OpenAI integration</li>
          <li>• WebSocket real-time updates</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const financialSlide = (
  <Slide key="financial">
    <SlideTitle title="Financial Projections" subtitle="Strong revenue growth and profitability" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Revenue Streams">
        <ul className="space-y-3 text-gray-400">
          <li>• Subscription model: $15M (Year 1)</li>
          <li>• Enterprise licenses: $8M</li>
          <li>• Custom content creation: $5M</li>
          <li>• B2B partnerships: $7M</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Briefcase className="w-8 h-8" />} title="Growth Metrics">
        <ul className="space-y-3 text-gray-400">
          <li>• User acquisition cost: $42</li>
          <li>• Customer LTV: $850</li>
          <li>• Gross margin: 75%</li>
          <li>• Monthly growth rate: 15%</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

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
    <SlideTitle 
      title="What has been built so far?" 
      subtitle="Comprehensive courses delivering advanced technical education"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Wallet className="w-6 h-6" />} title="Introduction to Cryptocurrency">
        <ul className="space-y-3 text-gray-400">
          <li>• Comprehensive blockchain fundamentals with 10+ interactive modules</li>
          <li>• Digital currencies evolution, Bitcoin deep-dive, and altcoin analysis</li>
          <li>• Hands-on wallet simulation and trading exercises</li>
          <li>• Security best practices and risk management training</li>
          <li>• Real-world applications and market dynamics</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Brain className="w-6 h-6" />} title="Introduction to AI">
        <ul className="space-y-3 text-gray-400">
          <li>• Three-part course covering AI/ML fundamentals to advanced concepts</li>
          <li>• Neural networks, deep learning, and machine learning basics</li>
          <li>• Natural Language Processing and Computer Vision modules</li>
          <li>• Ethics in AI and future developments</li>
          <li>• Practical applications and real-world use cases</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="Learning Achievements">
        <ul className="space-y-3 text-gray-400">
          <li>• Interactive quizzes and assessments for each module</li>
          <li>• Progress tracking and performance analytics</li>
          <li>• Skill-based certification system</li>
          <li>• Personalized learning paths based on user progress</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Database className="w-6 h-6" />} title="Technical Infrastructure">
        <ul className="space-y-3 text-gray-400">
          <li>• Next.js with TypeScript for robust frontend</li>
          <li>• AI-powered adaptive learning system</li>
          <li>• PostgreSQL database for reliable data storage</li>
          <li>• Real-time performance monitoring and analytics</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const productSlide1 = (
  <Slide key="product1">
    <SlideTitle 
      title="Technical Architecture" 
      subtitle="Robust and scalable infrastructure" 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Layout className="w-8 h-8" />} title="Frontend Stack">
        <ul className="space-y-3 text-gray-400">
          <li>• Next.js with TypeScript for type-safe development</li>
          <li>• Tailwind CSS for responsive and modern UI</li>
          <li>• React Query for efficient data fetching and caching</li>
          <li>• Framer Motion for smooth animations and transitions</li>
          <li>• Shadcn UI components for consistent design</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Database className="w-8 h-8" />} title="Backend Infrastructure">
        <ul className="space-y-3 text-gray-400">
          <li>• Node.js Express server for robust API endpoints</li>
          <li>• PostgreSQL with Drizzle ORM for data persistence</li>
          <li>• OpenAI integration for AI-powered features</li>
          <li>• WebSocket for real-time updates and notifications</li>
          <li>• JWT-based authentication system</li>
        </ul>
      </ContentBox>
      <div className="col-span-2 mt-6">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">System Architecture</h3>
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            style={{ maxHeight: '300px' }}
          >
            {/* Background */}
            <rect width="800" height="400" fill="#1a1b1e" rx="10" />

            {/* Frontend Layer */}
            <g transform="translate(50, 50)">
              <rect width="200" height="100" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="100" y="40" fill="#3b82f6" textAnchor="middle" className="text-sm">Frontend Layer</text>
              <text x="100" y="70" fill="#9ca3af" textAnchor="middle" fontSize="12">Next.js + TypeScript</text>
            </g>

            {/* API Layer */}
            <g transform="translate(300, 50)">
              <rect width="200" height="100" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="100" y="40" fill="#10b981" textAnchor="middle">API Layer</text>
              <text x="100" y="70" fill="#9ca3af" textAnchor="middle" fontSize="12">Express.js Server</text>
            </g>

            {/* Database Layer */}
            <g transform="translate(550, 50)">
              <rect width="200" height="100" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="5" />
              <text x="100" y="40" fill="#8b5cf6" textAnchor="middle">Database</text>
              <text x="100" y="70" fill="#9ca3af" textAnchor="middle" fontSize="12">PostgreSQL</text>
            </g>

            {/* Services Layer */}
            <g transform="translate(175, 200)">
              <rect width="450" height="100" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" rx="5" />
              <text x="225" y="40" fill="#f59e0b" textAnchor="middle">External Services</text>
              <text x="225" y="70" fill="#9ca3af" textAnchor="middle" fontSize="12">OpenAI API | Authentication | WebSocket</text>
            </g>

            {/* Connection Lines */}
            <g stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5">
              {/* Frontend to API */}
              <path d="M250,100 L300,100" />
              {/* API to Database */}
              <path d="M500,100 L550,100" />
              {/* API to Services */}
              <path d="M400,150 L400,200" />
            </g>

            {/* Flow Arrows */}
            <g fill="#4b5563">
              <polygon points="295,97 305,100 295,103" />
              <polygon points="545,97 555,100 545,103" />
              <polygon points="397,195 400,205 403,195" />
            </g>
          </svg>
        </div>
      </div>
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