import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
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
  Building2,
  Blocks,
  Lock,
  CheckCircle,
  Coins,
  Network,
  MessageCircle,
  Globe2,
  Wallet,
  Mail,
  Twitter,
  CreditCard,
  BadgePercent,
  Factory,
  GraduationCap,
  DollarSign
} from 'lucide-react';

interface SlideProps {
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return <>{children}</>;
};

const titleSlide = <Slide key="title">{/*rest of titleSlide*/}</Slide>;
const problemSlide = <Slide key="problem">{/*rest of problemSlide*/}</Slide>;
const solutionSlide = <Slide key="solution">{/*rest of solutionSlide*/}</Slide>;
const featuresSlide = <Slide key="features">{/*rest of featuresSlide*/}</Slide>;
const missionSlide = <Slide key="mission">{/*rest of missionSlide*/}</Slide>;
const marketOpportunitySlide = <Slide key="market-opportunity">{/*rest of marketOpportunitySlide*/}</Slide>;
const marketSizeSlide = <Slide key="market-size">{/*rest of marketSizeSlide*/}</Slide>;
const productOverviewSlide = <Slide key="product-overview">{/*rest of productOverviewSlide*/}</Slide>;
const interactiveToolsSlide = <Slide key="interactive-tools">{/*rest of interactiveToolsSlide*/}</Slide>;
const futureFinanceSlide = <Slide key="future-finance">{/*rest of futureFinanceSlide*/}</Slide>;
const roadmapSlide = <Slide key="roadmap">{/*rest of roadmapSlide*/}</Slide>;
const whatIsBuiltSlide = <Slide key="what-is-built">{/*rest of whatIsBuiltSlide*/}</Slide>;
const goToMarketSlide = <Slide key="go-to-market">{/*rest of goToMarketSlide*/}</Slide>;
const growthExpansionSlide = <Slide key="growth-expansion">{/*rest of growthExpansionSlide*/}</Slide>;
const tokenIntegrationSlide = <Slide key="token-integration">{/*rest of tokenIntegrationSlide*/}</Slide>;
const tractionSlide = <Slide key="traction">{/*rest of tractionSlide*/}</Slide>;
const financialSlide = <Slide key="financial">{/*rest of financialSlide*/}</Slide>;
const financialModelSlide = <Slide key="financial-model">{/*rest of financialModelSlide*/}</Slide>;
const fundingNarrativeSlide = <Slide key="funding-narrative">{/*rest of fundingNarrativeSlide*/}</Slide>;
const fundingBreakdownSlide = <Slide key="funding-breakdown">{/*rest of fundingBreakdownSlide*/}</Slide>;
const teamSlide = <Slide key="team">{/*rest of teamSlide*/}</Slide>;
const joinUsSlide = <Slide key="join-us">{/*rest of joinUsSlide*/}</Slide>;

const revenueGenerationSlide = <Slide key="revenue-generation">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <DollarSign className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">How We Generate Revenue</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <Card className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Premium Subscriptions</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Basic: $9.99/month - Core courses and features
            </li>
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Pro: $29.99/month - Advanced content & personalization
            </li>
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Enterprise: Custom pricing for teams
            </li>
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Factory className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">B2B Solutions</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              White-label platform licensing
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Custom course development
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              API access for integration
            </li>
          </ul>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <Card className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Educational Partnerships</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              University licensing programs
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Corporate training packages
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Professional certification programs
            </li>
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Additional Revenue Streams</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              NFT certifications ($99 - $499)
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Sponsored content from crypto projects
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Marketplace commission fees
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="bg-blue-900/30 p-6 mt-6">
        <p className="text-lg text-blue-100">
          Our diversified revenue model ensures sustainable growth while maintaining accessibility through a freemium approach. The focus on B2B partnerships and enterprise solutions provides high-margin opportunities while the subscription model delivers predictable recurring revenue.
        </p>
      </Card>
    </motion.div>
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
  revenueGenerationSlide,
  goToMarketSlide,
  growthExpansionSlide,
  tokenIntegrationSlide,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
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