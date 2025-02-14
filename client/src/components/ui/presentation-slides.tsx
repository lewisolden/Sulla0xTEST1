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

// Export all slide components
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
    </div>
  </Slide>
);

export const marketSlide1 = (
  <Slide key="market1">
    <SlideTitle 
      title="Market Opportunity" 
      subtitle="Bridging the Critical Education Gap in Revolutionary Technologies"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<TrendingUp className="w-8 h-8"/>} title="Explosive Market Growth">
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
    </div>
  </Slide>
);

export const productSlide2 = (
  <Slide key="product2">
    <SlideTitle 
      title="Product Roadmap" 
      subtitle="Strategic Development Plan 2025-2026"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Course Expansion (Q2-Q3 2025)">
        <ul className="space-y-3 text-gray-400">
          <li>• Advanced AI Development course with practical projects</li>
          <li>• DeFi and Web3 development curriculum</li>
          <li>• Industry partnership certification programs</li>
          <li>• Specialized tracks for enterprise clients</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Code className="w-6 h-6" />} title="Technology Enhancement (Q3-Q4 2025)">
        <ul className="space-y-3 text-gray-400">
          <li>• Mobile-optimized learning experience</li>
          <li>• Advanced progress tracking dashboard</li>
          <li>• Enhanced code simulation environment</li>
          <li>• Real-time collaboration features</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const gtmStrategySlide = (
  <Slide key="gtm">
    <SlideTitle 
      title="Go-to-Market Strategy" 
      subtitle="24-Month Strategic Implementation Plan" 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Users className="w-8 h-8" />} title="Phase 1: Community Growth (0-6 Months)">
        <ul className="space-y-3 text-gray-400">
          <li>• Launch initial AI and blockchain courses</li>
          <li>• Build community through social media and tech forums</li>
          <li>• Partner with tech influencers and educators</li>
          <li>• Implement referral and early access programs</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Rocket className="w-8 h-8" />} title="Phase 2: Pre-Monetization & User Scaling (6-12 Months)">
        <ul className="space-y-3 text-gray-400">
          <li>• Beta testing of premium features</li>
          <li>• Strategic partnerships with educational institutions</li>
          <li>• Content creation workshops and webinars</li>
          <li>• Launch enterprise pilot programs</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <SlideTitle title="Current Traction" subtitle="Building momentum in the market" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Users className="w-8 h-8" />} title="User Growth">
        <ul className="space-y-3 text-gray-400">
          <li>• 1000+ early access signups</li>
          <li>• 85% completion rate on beta courses</li>
          <li>• 92% user satisfaction rating</li>
          <li>• Strong organic growth through referrals</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Building className="w-8 h-8" />} title="Partnerships">
        <ul className="space-y-3 text-gray-400">
          <li>• 3 educational institutions piloting platform</li>
          <li>• 2 enterprise clients in trial phase</li>
          <li>• 5 content creator partnerships</li>
          <li>• Active discussions with 10+ institutions</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const dataStrategySlide = (
  <Slide key="dataStrategy">
    <SlideTitle title="Data Strategy" subtitle="Leveraging AI for Personalized Learning" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<Brain className="w-8 h-8" />} title="AI-Powered Learning">
        <ul className="space-y-3 text-gray-400">
          <li>• Adaptive learning algorithms</li>
          <li>• Personalized content recommendations</li>
          <li>• Real-time performance analytics</li>
          <li>• Predictive learning paths</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Shield className="w-8 h-8" />} title="Data Security">
        <ul className="space-y-3 text-gray-400">
          <li>• Enterprise-grade encryption</li>
          <li>• GDPR and CCPA compliant</li>
          <li>• Regular security audits</li>
          <li>• Transparent data policies</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const fundingRequirementsSlide = (
  <Slide key="fundingRequirements">
    <SlideTitle title="Funding Requirements" subtitle="Strategic Investment for Growth" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Investment Allocation">
        <ul className="space-y-3 text-gray-400">
          <li>• Product development and enhancement</li>
          <li>• Marketing and user acquisition</li>
          <li>• Team expansion and talent acquisition</li>
          <li>• Infrastructure scaling</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<Target className="w-8 h-8" />} title="Use of Funds">
        <ul className="space-y-3 text-gray-400">
          <li>• Course content development</li>
          <li>• AI/ML infrastructure setup</li>
          <li>• Sales and marketing initiatives</li>
          <li>• Working capital</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const fundingAllocationSlide = (
  <Slide key="fundingAllocation">
    <SlideTitle title="Funding Allocation" subtitle="Strategic Resource Distribution" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentBox icon={<PieChart className="w-8 h-8" />} title="Capital Distribution">
        <ul className="space-y-3 text-gray-400">
          <li>• 40% Product Development</li>
          <li>• 30% Marketing & Growth</li>
          <li>• 20% Team Expansion</li>
          <li>• 10% Operations</li>
        </ul>
      </ContentBox>
      <ContentBox icon={<TrendingUp className="w-8 h-8" />} title="Expected Outcomes">
        <ul className="space-y-3 text-gray-400">
          <li>• Accelerated user growth</li>
          <li>• Enhanced product features</li>
          <li>• Market expansion</li>
          <li>• Sustainable revenue model</li>
        </ul>
      </ContentBox>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <SlideTitle 
      title="Sulla's Financial Model" 
      subtitle="Projected Growth and Key Metrics"
    />
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Projected Financial Breakdown (Year 1-5)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Category</th>
                <th className="text-right py-2">Year 1</th>
                <th className="text-right py-2">Year 2</th>
                <th className="text-right py-2">Year 3</th>
                <th className="text-right py-2">Year 4</th>
                <th className="text-right py-2">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Revenue</td>
                <td className="text-right">$0</td>
                <td className="text-right">$500K</td>
                <td className="text-right">$2M-$5M</td>
                <td className="text-right">$10M+</td>
                <td className="text-right">$20M+</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Marketing Spend</td>
                <td className="text-right">$200K</td>
                <td className="text-right">$150K</td>
                <td className="text-right">$400K</td>
                <td className="text-right">$1M</td>
                <td className="text-right">$2M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Tech & Development</td>
                <td className="text-right">$250K</td>
                <td className="text-right">$300K</td>
                <td className="text-right">$1M</td>
                <td className="text-right">$2M</td>
                <td className="text-right">$4M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Operational Costs</td>
                <td className="text-right">$200K</td>
                <td className="text-right">$750K</td>
                <td className="text-right">$1.5M</td>
                <td className="text-right">$3M</td>
                <td className="text-right">$4M</td>
              </tr>
              <tr>
                <td className="py-2">Profitability Projection</td>
                <td className="text-right text-red-400">($400K) Loss</td>
                <td className="text-right text-red-400">($700K) Loss</td>
                <td className="text-right text-green-400">Break-even to $2M Profit</td>
                <td className="text-right text-green-400">$4M+ Profit</td>
                <td className="text-right text-green-400">$10M+ Profit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Strategic Focus</h3>
        <p className="text-gray-300 mb-4">
          Year 1 is strategically focused on platform development and user acquisition, with a projected investment of $400K. While we anticipate no revenue during this initial phase as we prioritize building a strong user base, we will actively explore and implement revenue opportunities as they arise. This approach ensures we can validate our product-market fit and build a substantial user community before monetization.
        </p>
        <p className="text-gray-300">
          A Series A funding round will be essential in Year 2 to support our expansion plans and operational scaling, as we transition from pure growth to a balanced approach of continued user acquisition and revenue generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<BarChart className="w-8 h-8" />} title="Revenue Streams">
          <ul className="space-y-3 text-gray-400">
            <li>• Premium subscriptions for individual learners</li>
            <li>• Enterprise licensing for institutions</li>
            <li>• Custom content development services</li>
            <li>• Professional certification programs</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<PieChart className="w-8 h-8" />} title="Key Financial Metrics">
          <ul className="space-y-3 text-gray-400">
            <li>• User Acquisition Cost (CAC): $10-$20 per active user</li>
            <li>• Customer Lifetime Value (LTV): $300+ per premium user</li>
            <li>• Conversion Rate: 5-10% free to paid upgrade</li>
            <li>• Operating Margins: &gt;60% (digital content scalability)</li>
          </ul>
        </ContentBox>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Growth Strategy Highlights</h3>
        <ul className="space-y-3 text-gray-300">
          <li>• Target 10-50 enterprise clients within 5 years</li>
          <li>• Focus on high-margin premium content and certification programs</li>
          <li>• Leverage AI for cost-effective content scaling and personalization</li>
          <li>• Strategic partnerships with educational institutions and tech companies</li>
        </ul>
      </div>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of AI & Blockchain Education</h2>
      <p className="text-xl text-gray-400">Be part of our journey to revolutionize technical education</p>
    </motion.div>
  </Slide>
);

// Add back the missing missionSlide
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