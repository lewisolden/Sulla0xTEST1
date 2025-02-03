import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  type LucideIcon
} from 'lucide-react';

// Types
interface TimelineItem {
  quarter?: string;
  phase?: string;
  items?: string[];
  milestone?: string;
  goals?: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FundingItem {
  category: string;
  amount: string;
  purpose: string;
}

interface TeamMember {
  role: string;
  description: string;
}

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
  >
    <h1 className="text-4xl font-bold mb-6 text-blue-600">Sulla</h1>
    <div className="space-y-4">
      <p className="text-2xl">
        Next-Generation Crypto Education Platform
      </p>
      <p className="text-lg">
        A comprehensive educational platform that makes learning crypto intuitive, engaging, and effective.
      </p>
    </div>
  </motion.div>
</Slide>;

const problemSlide = <Slide key="problem">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">The Problem</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-lg">
          Despite widespread crypto adoption, quality education remains fragmented and inaccessible. 
          Current solutions are either too technical, outdated, or lack practical application.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">For Users</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Overwhelming technical jargon</li>
            <li>• Lack of structured learning paths</li>
            <li>• Limited hands-on practice</li>
            <li>• No verification of knowledge</li>
          </ul>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">For Institutions</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Difficulty training staff</li>
            <li>• No standardized curriculum</li>
            <li>• Limited tracking capabilities</li>
            <li>• High costs of custom solutions</li>
          </ul>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const solutionSlide1 = <Slide key="solution-1">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Solution</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-lg">
          Sulla is a comprehensive educational platform that combines cutting-edge technology 
          with proven learning methodologies to make crypto education accessible, engaging, and effective.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• AI-powered personalized learning</li>
            <li>• Interactive simulations & exercises</li>
            <li>• Gamified progression system</li>
            <li>• Real-time progress tracking</li>
          </ul>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Benefits</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Learn at your own pace</li>
            <li>• Practical, hands-on experience</li>
            <li>• Verified certifications</li>
            <li>• Community support</li>
          </ul>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const solutionSlide2 = <Slide key="solution-2">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Platform Overview</h2>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Learn</h3>
          <p className="text-sm text-gray-600">
            Structured courses with interactive content and real-world examples
          </p>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Practice</h3>
          <p className="text-sm text-gray-600">
            Hands-on exercises and simulated trading environments
          </p>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Achieve</h3>
          <p className="text-sm text-gray-600">
            Earn verifiable certificates and track your progress
          </p>
        </Card>
      </div>
      <Card className="bg-blue-50 p-6">
        <h3 className="text-xl font-semibold mb-4">Technical Innovation</h3>
        <ul className="space-y-2">
          <li>• AI-driven content adaptation</li>
          <li>• Blockchain-verified credentials</li>
          <li>• Interactive learning tools</li>
          <li>• Real-time progress tracking</li>
        </ul>
      </Card>
    </div>
  </motion.div>
</Slide>;

const missionSlide = <Slide key="mission">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Our Mission</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-xl font-semibold mb-4">
          To democratize crypto education and empower individuals to participate confidently in the digital economy.
        </p>
        <p className="text-lg">
          We believe that quality education is the foundation of widespread crypto adoption and aim to make it 
          accessible to everyone, regardless of their technical background.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Vision</h3>
          <p className="text-gray-600">
            To become the world's leading platform for cryptocurrency and blockchain education, 
            serving millions of learners globally.
          </p>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Values</h3>
          <ul className="space-y-1 text-gray-600">
            <li>• Innovation in Education</li>
            <li>• User-Centric Design</li>
            <li>• Community Growth</li>
            <li>• Continuous Improvement</li>
          </ul>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const marketSlide1 = <Slide key="market-1">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Market Overview</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-lg">
          The cryptocurrency education market is experiencing exponential growth, 
          driven by increasing adoption and institutional interest.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Market Size</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">$1.5B+</p>
          <p className="text-gray-600">Current crypto education market value</p>
        </Card>
        <Card className="bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Growth</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">$5B</p>
          <p className="text-gray-600">Projected market size by 2028</p>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const marketSlide2 = <Slide key="market-2">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Market Opportunity</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-50 p-6">
        <h3 className="text-xl font-semibold mb-4">Target Segments</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Retail Investors (80%)</li>
          <li>• Financial Institutions (10%)</li>
          <li>• Educational Institutions (5%)</li>
          <li>• Corporate Training (5%)</li>
        </ul>
      </Card>
      <Card className="bg-gray-50 p-6">
        <h3 className="text-xl font-semibold mb-4">Key Stats</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• 420M+ global crypto users</li>
          <li>• 80% of banks exploring crypto</li>
          <li>• 71% want better education</li>
          <li>• 65% struggle with complexity</li>
        </ul>
      </Card>
    </div>
  </motion.div>
</Slide>;

const productSlide1 = <Slide key="product-1">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Product Features</h2>
    <div className="space-y-6">
      <Card className="bg-blue-50 p-6">
        <p className="text-lg">
          Sulla combines cutting-edge technology with proven educational methodologies 
          to deliver an engaging and effective learning experience.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "AI-Powered Learning", desc: "Personalized content and adaptive difficulty" },
          { title: "Interactive Modules", desc: "Hands-on exercises and simulations" },
          { title: "Progress Tracking", desc: "Real-time analytics and achievements" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-50 p-4 h-full">
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
</Slide>;

const productSlide2 = <Slide key="product-2">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Learning Experience</h2>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-50 p-6">
          <h3 className="text-xl font-semibold mb-4">For Individuals</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Personalized learning paths</li>
            <li>• Interactive practice exercises</li>
            <li>• Progress tracking & rewards</li>
            <li>• Community support</li>
          </ul>
        </Card>
        <Card className="bg-gray-50 p-6">
          <h3 className="text-xl font-semibold mb-4">For Institutions</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Custom learning programs</li>
            <li>• Analytics & reporting</li>
            <li>• Team management tools</li>
            <li>• White-label solutions</li>
          </ul>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const marketSlide = <Slide key="market">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Market Opportunity</h2>
      <div className="space-y-4">
          <Card className="bg-blue-50 p-6">
              <p className="text-lg">
                The global crypto education market is experiencing unprecedented growth, creating a vast opportunity for innovative platforms.
              </p>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-50 p-4">
              <h3 className="font-semibold mb-2">Market Size</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Current market value: $1.5B+</li>
                <li>• Projected market size by 2028: $5B+</li>
              </ul>
            </Card>
            <Card className="bg-gray-50 p-4">
              <h3 className="font-semibold mb-2">Key Trends</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Increasing crypto adoption</li>
                <li>• Rising demand for digital literacy</li>
                <li>• Shift towards personalized learning</li>
                <li>• Focus on verifiable credentials</li>
              </ul>
            </Card>
          </div>
      </div>
  </motion.div>
</Slide>;

const productStatusSlide = <Slide key="product-status">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Product Status</h2>
        <div className="space-y-4">
            <Card className="bg-blue-50 p-6">
                <p className="text-lg">
                    We have successfully built a functional MVP with a focus on delivering a user-friendly,
                    engaging educational experience.
                </p>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Interactive courses</li>
                        <li>• Blockchain explorer simulation</li>
                        <li>• Gamified learning modules</li>
                    </ul>
                </Card>
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">Technology</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• React-based frontend</li>
                        <li>• Node.js backend</li>
                        <li>• Cloud infrastructure</li>
                    </ul>
                </Card>
            </div>
        </div>
    </motion.div>
</Slide>;

const growthStrategySlide = <Slide key="growth-strategy">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Growth Strategy</h2>
            <div className="space-y-4">
                <Card className="bg-blue-50 p-6">
                  <p className="text-lg">
                    Our growth strategy focuses on phased expansion, strategic partnerships, and a strong community-driven approach.
                  </p>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-50 p-4">
                        <h3 className="font-semibold mb-2">Phase 1 (Q1-Q2 2024)</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Platform launch</li>
                            <li>• Initial course release</li>
                            <li>• 10,000 user acquisition</li>
                        </ul>
                    </Card>
                    <Card className="bg-gray-50 p-4">
                        <h3 className="font-semibold mb-2">Phase 2 (Q3-Q4 2024)</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Feature expansion</li>
                            <li>• B2B partnerships</li>
                            <li>• 100,000 user acquisition</li>
                        </ul>
                    </Card>
                </div>
            </div>
    </motion.div>
</Slide>;

const businessModelSlide = <Slide key="business-model">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Business Model</h2>
        <div className="space-y-4">
            <Card className="bg-blue-50 p-6">
                <p className="text-lg">
                    Our revenue model is diversified and scalable, ensuring long-term sustainability and growth.
                </p>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">Primary Streams</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Premium subscriptions</li>
                        <li>• Corporate training solutions</li>
                        <li>• Certified courses</li>
                    </ul>
                </Card>
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">Future Streams</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Sponsored content</li>
                        <li>• White-label partnerships</li>
                        <li>• Advanced learning tools</li>
                    </ul>
                </Card>
            </div>
        </div>
    </motion.div>
</Slide>;


const fundingBreakdownSlide = <Slide key="funding-breakdown">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Funding Breakdown</h2>
    <div className="space-y-4">
        <Card className="bg-blue-50 p-6">
            <p className="text-lg">
                We are seeking $650,000 in seed funding to support our initial growth and development efforts.
            </p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-50 p-4">
                <h3 className="font-semibold mb-2">Allocation</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>• Content Development: $150K</li>
                    <li>• Technology Development: $200K</li>
                    <li>• Marketing & Growth: $150K</li>
                    <li>• Operational Costs: $150K</li>
                </ul>
            </Card>
            <Card className="bg-gray-50 p-4">
                <h3 className="font-semibold mb-2">Use of Funds</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>• Course creation & certification</li>
                    <li>• AI & platform scaling</li>
                    <li>• User acquisition & brand building</li>
                    <li>• Team expansion & overhead</li>
                </ul>
            </Card>
        </div>
    </div>
  </motion.div>
</Slide>;

const teamSlide = <Slide key="team">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Team</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-lg">
           Our team comprises experienced professionals with a proven track record in EdTech, blockchain, 
           and business development.
        </p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-50 p-4">
            <h3 className="font-semibold mb-2">Leadership</h3>
            <ul className="space-y-2 text-gray-600">
                <li>• CEO & Founder: 10+ years in EdTech & Blockchain</li>
                <li>• CTO: Senior Blockchain Developer, AI Expert</li>
                <li>• Head of Education: Crypto Educator, Former University Professor</li>
            </ul>
        </Card>
         <Card className="bg-gray-50 p-4">
            <h3 className="font-semibold mb-2">Advisors</h3>
            <ul className="space-y-2 text-gray-600">
                <li>• Marketing Expert, Community Builder</li>
                <li>• Strategic Partnerships Advisor</li>
                <li>• Financial Advisor</li>
            </ul>
        </Card>
      </div>
    </div>
  </motion.div>
</Slide>;

const tractionSlide = <Slide key="traction">
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Traction & Milestones</h2>
        <div className="space-y-4">
            <Card className="bg-blue-50 p-6">
                <p className="text-lg">
                    We have achieved significant traction in a short time, demonstrating strong market demand for our platform.
                </p>
            </Card>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">Key Milestones</h3>
                     <ul className="space-y-2 text-gray-600">
                        <li>• MVP launch in Q1 2024</li>
                        <li>• 500+ beta users</li>
                        <li>• 10+ partnerships secured</li>
                    </ul>
                </Card>
                <Card className="bg-gray-50 p-4">
                    <h3 className="font-semibold mb-2">User Engagement</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• Average session duration: 30+ mins</li>
                        <li>• 80% course completion rate</li>
                        <li>• 90% positive user feedback</li>
                     </ul>
                </Card>
            </div>
        </div>
    </motion.div>
</Slide>;


const ctaSlide = <Slide key="cta">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Join Our Mission</h2>
    <div className="space-y-4">
      <Card className="bg-blue-50 p-6">
        <p className="text-xl font-semibold mb-4">
            Be part of the future of crypto education
        </p>
        <p className="text-lg">
            Strategic partnership opportunities are available. Contact team@sulla.edu to explore.
        </p>
      </Card>
    </div>
  </motion.div>
</Slide>;


const slides = [
  titleSlide,
  problemSlide,
  solutionSlide1,
  solutionSlide2,
  missionSlide,
    marketSlide1,
    marketSlide2,
    productSlide1,
    productSlide2,
  marketSlide,
  productStatusSlide,
  growthStrategySlide,
  businessModelSlide,
  fundingBreakdownSlide,
    teamSlide,
    tractionSlide,
  ctaSlide
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    if (!deckRef.current) return;

    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      const element = deckRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true
      });

      const pdf = new jsPDF({
        format: 'a4',
        unit: 'px',
        orientation: 'landscape'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Sulla-Pitch-Deck.pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
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
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
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