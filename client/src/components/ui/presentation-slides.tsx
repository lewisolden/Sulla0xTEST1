import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Building,
  Wallet,
  Shield,
  Users,
  Database,
  DollarSign,
  Target,
  Rocket,
  BookOpen,
  Code,
  Layout,
  Trophy
} from 'lucide-react';

// Types
interface SlideProps {
  key?: string;
  children: React.ReactNode;
  className?: string;
}

interface SlideTitleProps {
  title: string;
  subtitle?: string;
}

interface ContentBoxProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

// Base Components
const Slide: React.FC<SlideProps> = ({ children, className = '', key }) => (
  <motion.div
    key={key}
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

const SlideTitle: React.FC<SlideTitleProps> = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl text-gray-400">{subtitle}</p>
    )}
  </div>
);

const ContentBox: React.FC<ContentBoxProps> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
    <div className="flex items-center mb-4">
      <div className="text-blue-400 mr-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
    </div>
    {children}
  </div>
);

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

// Define slides as constants
const fundingRequirementsSlide = (
  <Slide key="fundingRequirements">
    <SlideTitle 
      title="Funding Requirements" 
      subtitle="Investing in the Future"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To date, I have built everything myself at a minimal cost. I believe that with a team and relatively small budget I can rapidly build the platform's capabilities and onboard users.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, marketing, platform improvements, and operational growth. Our focus is on building a user-centric platform with AI-driven personalization, ensuring high engagement and long-term retention.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          We have strategically allocated funds to maximize user acquisition in the first 12 months while setting up monetization in the second year. Security, legal compliance, and infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Users className="w-8 h-8" />} title="Team Building & Operations">
          <ul className="space-y-3 text-gray-400">
            <li>• Core development team recruitment</li>
            <li>• AI/ML specialists and data scientists</li>
            <li>• Content creation and curriculum experts</li>
            <li>• Customer support and operations staff</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Technology & Infrastructure">
          <ul className="space-y-3 text-gray-400">
            <li>• AI model development and training</li>
            <li>• Platform scalability improvements</li>
            <li>• Security and compliance enhancements</li>
            <li>• Advanced analytics implementation</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

const fundingAllocationSlide = (
  <Slide key="fundingAllocation">
    <SlideTitle 
      title="Use of Funds" 
      subtitle="Strategic Allocation"
    />
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<BookOpen className="w-8 h-8" />} title="Content Expansion - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Development of advanced AI & blockchain courses</li>
            <li>• Creation of interactive learning materials</li>
            <li>• Professional certification programs</li>
            <li>• Industry-specific content modules</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing & User Acquisition - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing and SEO optimization</li>
            <li>• Educational influencer partnerships</li>
            <li>• Community engagement programs</li>
            <li>• Early adopter incentives</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Business Development - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Strategic partnership development</li>
            <li>• Enterprise client acquisition</li>
            <li>• Educational institution collaborations</li>
            <li>• Industry alliance building</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Platform Enhancements - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• AI algorithm development and training</li>
            <li>• Gamification features implementation</li>
            <li>• User experience improvements</li>
            <li>• Performance optimization</li>
          </ul>
        </ContentBox>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Shield className="w-8 h-8" />} title="Legal & Compliance - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Regulatory compliance implementation</li>
            <li>• Legal documentation and contracts</li>
            <li>• Privacy policy development</li>
            <li>• Intellectual property protection</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Users className="w-8 h-8" />} title="Operational Costs - $200K">
          <ul className="space-y-3 text-gray-400">
            <li>• Core team salaries and benefits</li>
            <li>• Office and infrastructure costs</li>
            <li>• Administrative expenses</li>
            <li>• Professional services</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Security & Maintenance - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• Security infrastructure setup</li>
            <li>• Continuous monitoring systems</li>
            <li>• Backup and recovery solutions</li>
            <li>• Regular security audits</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Wallet className="w-8 h-8" />} title="Buffer Fund - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Emergency operational expenses</li>
            <li>• Opportunity investments</li>
            <li>• Market response flexibility</li>
            <li>• Risk management reserve</li>
          </ul>
        </ContentBox>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-blue-400">Total Funding Needed</h3>
          <span className="text-2xl font-bold text-blue-400">$650K</span>
        </div>
        <p className="text-gray-300 text-lg">
          Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.
        </p>
      </div>
    </div>
  </Slide>
);

const financialModelSlide = (
  <Slide key="financialModel">
    <SlideTitle 
      title="Sulla's Financial Model" 
      subtitle="Revenue Projections & Key Metrics"
    />
    <div className="space-y-8">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Revenue Streams">
        <ul className="space-y-3 text-gray-400">
          <li>• Premium Subscriptions ($15-30/month per user)</li>
          <li>• Enterprise Licensing ($5,000-20,000/year)</li>
          <li>• Professional Certifications ($199-499 per certification)</li>
          <li>• Custom Corporate Training Programs ($10,000+ per program)</li>
        </ul>
      </ContentBox>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Financial Projections (in millions)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">Year 2</th>
                <th className="text-right py-2">Year 3</th>
                <th className="text-right py-2">Year 4</th>
                <th className="text-right py-2">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Revenue</td>
                <td className="text-right">$2.5M</td>
                <td className="text-right">$5.8M</td>
                <td className="text-right">$12.4M</td>
                <td className="text-right">$25.2M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Operating Costs</td>
                <td className="text-right">$1.0M</td>
                <td className="text-right">$2.3M</td>
                <td className="text-right">$4.9M</td>
                <td className="text-right">$10.1M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Gross Margin</td>
                <td className="text-right">60%</td>
                <td className="text-right">65%</td>
                <td className="text-right">68%</td>
                <td className="text-right">70%</td>
              </tr>
              <tr>
                <td className="py-2">Net Profit</td>
                <td className="text-right text-green-400">$0.5M</td>
                <td className="text-right text-green-400">$1.7M</td>
                <td className="text-right text-green-400">$4.3M</td>
                <td className="text-right text-green-400">$10.1M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Target className="w-8 h-8" />} title="Key Financial Metrics">
          <ul className="space-y-3 text-gray-400">
            <li>• User Acquisition Cost (CAC): $10-$20 per active user</li>
            <li>• Customer Lifetime Value (LTV): $300+ per premium user</li>
            <li>• Conversion Rate: 5-10% free to paid users</li>
            <li>• Operating Margins: &gt;60% (digital scalability)</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Enterprise Growth">
          <ul className="space-y-3 text-gray-400">
            <li>• 10-50 enterprise clients within 5 years</li>
            <li>• Average contract value: $10,000+</li>
            <li>• 85% enterprise retention rate</li>
            <li>• Custom solutions & white-label options</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

// Export slides and components
export {
  fundingRequirementsSlide,
  fundingAllocationSlide,
  financialModelSlide,
  Logo,
};