import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
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
  type LucideIcon
} from 'lucide-react';

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
    className="flex flex-col items-center justify-center h-full text-center"
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Logo className="text-white h-20 w-auto mb-8" />
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-blue-400 mb-6">
        Next-Generation Crypto Education Platform
      </h1>
      <p className="text-2xl text-blue-200 mb-8">Investor Pitch Deck</p>
      <p className="text-xl text-blue-300">2025</p>
    </motion.div>
  </motion.div>
</Slide>;

const problemSlide = <Slide key="problem">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-red-500/20 rounded-lg">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Problem</h2>
    </div>
    <p className="text-xl text-blue-200 mb-8">
      The cryptocurrency industry is rapidly evolving, yet:
    </p>
    <motion.div className="space-y-4">
      {[
        "Structured, high-quality educational resources remain fragmented",
        "Content is often overly technical or unreliable",
        "Many newcomers struggle to understand the fundamentals",
        "Experienced users lack clear pathways for advanced learning"
      ].map((point, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <div className="h-2 w-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
          <p className="text-lg text-blue-100">{point}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</Slide>;

const solutionSlide = <Slide key="solution">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <Lightbulb className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Solution</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-xl text-blue-100">
        Sulla is a next-generation crypto education platform that bridges this gap by offering interactive, structured, and engaging courses tailored for beginners, developers, and institutions.
      </p>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold text-blue-300 mb-4">Adaptive Learning</h3>
        <p className="text-blue-100">
          AI-driven personalization tailors content based on individual learning styles
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold text-blue-300 mb-4">Intelligent Recommendations</h3>
        <p className="text-blue-100">
          Machine learning algorithms suggest the most relevant courses
        </p>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const featuresSlide = <Slide key="features">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Layers className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Key Features</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "Modular Learning",
          description: "Comprehensive coverage of Bitcoin, Ethereum, DeFi, Smart Contracts, Security"
        },
        {
          title: "Interactive Experience",
          description: "Gamified quizzes, real-world scenarios, and NFT certifications"
        },
        {
          title: "Freemium Model",
          description: "Free introductory content with premium offerings for deeper knowledge"
        },
        {
          title: "B2B Integration",
          description: "White-label solutions for fintech companies and institutions"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-blue-300 mb-4">{feature.title}</h3>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const missionSlide = <Slide key="mission">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <Target className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Our Mission</h2>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-lg mb-8"
    >
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">
        To make crypto education accessible, engaging, and financially rewarding
      </h3>
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-blue-900/30 p-6 rounded-lg"
    >
      <p className="text-xl text-blue-100">
        Empowering users to confidently navigate the blockchain space through structured, high-quality educational resources and interactive learning experiences.
      </p>
    </motion.div>
  </motion.div>
</Slide>;

const marketOpportunitySlide = <Slide key="market-opportunity">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Globe className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Market Opportunity</h2>
    </div>
    <h3 className="text-2xl font-semibold text-blue-300 mb-6">Why Now?</h3>
    <motion.div className="space-y-4">
      {[
        "Over 420 million crypto users worldwide (2024)",
        "80% of major banks exploring digital assets",
        "Lack of quality education leading to confusion and security risks"
      ].map((point, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-start gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <div className="h-2 w-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
          <p className="text-lg text-blue-100">{point}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</Slide>;

const marketSizeSlide = <Slide key="market-size">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Market Size</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-2xl font-semibold text-blue-300">Current Market Value</h3>
        <div className="space-y-4">
          <div className="bg-blue-900/30 p-4 rounded-lg">
            <p className="text-lg text-blue-100">Crypto Education Market (2024): $1.5B+ and growing</p>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg">
            <p className="text-lg text-blue-100">Expected to exceed $5B by 2028 as Web3 adoption accelerates</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-6">Target Audience</h3>
        <div className="space-y-4">
          {[
            "Crypto enthusiasts and newcomers",
            "Developers and technical professionals",
            "Traders and investors",
            "Fintech institutions"
          ].map((audience, index) => (
            <motion.div
              key={index}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-3 bg-blue-900/30 p-4 rounded-lg"
            >
              <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0" />
              <p className="text-lg text-blue-100">{audience}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  featuresSlide,
  missionSlide,
  marketOpportunitySlide,
  marketSizeSlide
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