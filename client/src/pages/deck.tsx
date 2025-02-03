import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  ChevronLeft, 
  ChevronRight,
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
  type LucideIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

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

interface Slide {
  type?: 'title' | 'call-to-action';
  title: string;
  content: string;
  icon?: LucideIcon;
  bullets?: string[];
  timeline?: TimelineItem[];
  features?: Feature[];
  funding?: FundingItem[];
  totalFunding?: string;
  team?: TeamMember[];
  subsections?: { title: string; content: string; }[];
  marketData?: { title: string; items: string[]; };
}

// Logo Component
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

const titleSlide: Slide = {
  type: 'title',
  title: "Sulla",
  content: "Next-Generation Crypto Education Platform",
  icon: Rocket,
  bullets: [
    "Interactive Learning Experience",
    "AI-Powered Personalization",
    "Comprehensive Curriculum"
  ]
};

const problemSlide: Slide = {
  title: "The Problem",
  content: "Current Crypto Education Landscape",
  icon: Target,
  bullets: [
    "Fragmented and unreliable educational resources",
    "Complex technical concepts with poor explanation",
    "Lack of structured learning paths",
    "Missing hands-on practice environments",
    "No verification of learning progress"
  ]
};

const solutionSlide1: Slide = {
  title: "Our Solution",
  content: "Comprehensive Learning Platform",
  icon: BookOpen,
  features: [
    {
      icon: Zap,
      title: "Adaptive Learning",
      desc: "AI-driven personalization tailors content to individual learning styles"
    },
    {
      icon: Target,
      title: "Interactive Experience",
      desc: "Hands-on exercises, simulations, and real-world scenarios"
    },
    {
      icon: Trophy,
      title: "Verified Progress",
      desc: "NFT-based certifications and achievement tracking"
    },
    {
      icon: Users,
      title: "Community Learning",
      desc: "Peer-to-peer support and expert mentorship"
    }
  ]
};

const marketSlide: Slide = {
  title: "Market Opportunity",
  content: "Growing Demand for Crypto Education",
  icon: Network,
  marketData: {
    title: "Key Statistics",
    items: [
      "420M+ crypto users worldwide (2024)",
      "80% of major banks exploring digital assets",
      "$1.5B+ crypto education market value",
      "Projected $5B market size by 2028"
    ]
  }
};

const productStatusSlide: Slide = {
  title: "Product Status",
  content: "What's Built",
  icon: Code,
  bullets: [
    "Complete introduction to cryptocurrency course",
    "Interactive blockchain explorer simulation",
    "Gamified learning modules with rewards",
    "Progress tracking and analytics dashboard",
    "Mobile-responsive platform"
  ]
};

const growthStrategySlide: Slide = {
  title: "Growth Strategy",
  content: "12-Month Roadmap",
  icon: BarChart,
  timeline: [
    {
      phase: "Q1-Q2 2024",
      milestone: "Platform Launch",
      goals: "Initial course release, 10K users"
    },
    {
      phase: "Q3 2024",
      milestone: "Feature Expansion",
      goals: "Advanced courses, B2B partnerships"
    },
    {
      phase: "Q4 2024",
      milestone: "Market Growth",
      goals: "100K users, revenue generation"
    }
  ]
};

const investmentSlide: Slide = {
  title: "Investment Opportunity",
  content: "Funding Requirements: $650K",
  icon: Wallet,
  funding: [
    {
      category: "Content Development",
      amount: "$150K",
      purpose: "Course creation and certification system"
    },
    {
      category: "Technology",
      amount: "$200K",
      purpose: "AI implementation and platform scaling"
    },
    {
      category: "Marketing",
      amount: "$150K",
      purpose: "User acquisition and brand building"
    },
    {
      category: "Operations",
      amount: "$150K",
      purpose: "Team expansion and overhead"
    }
  ],
  totalFunding: "$650K"
};

const teamSlide: Slide = {
  title: "Team",
  content: "Expert Leadership",
  icon: Users,
  team: [
    {
      role: "CEO & Founder",
      description: "10+ years in EdTech & Blockchain"
    },
    {
      role: "CTO",
      description: "Senior Blockchain Developer, AI Expert"
    },
    {
      role: "Head of Education",
      description: "Crypto Educator, Former University Professor"
    },
    {
      role: "Growth Lead",
      description: "Marketing Expert, Community Builder"
    }
  ]
};

const ctaSlide: Slide = {
  type: 'call-to-action',
  title: "Join Our Mission",
  content: "Transform Crypto Education",
  icon: Zap,
  bullets: [
    "Be part of the future of crypto education",
    "Strategic partnership opportunities available",
    "Early investor benefits and perks",
    "Contact: team@sulla.edu"
  ]
};

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide1,
  marketSlide,
  productStatusSlide,
  growthStrategySlide,
  investmentSlide,
  teamSlide,
  ctaSlide
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide(curr => curr < slides.length - 1 ? curr + 1 : curr);
  };

  const previousSlide = () => {
    setCurrentSlide(curr => curr > 0 ? curr - 1 : curr);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      previousSlide();
    }
  };

  const handleExport = async () => {
    setIsDownloading(true);
    const element = deckRef.current;
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: 'Sulla-Pitch-Deck.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'landscape',
        compress: true
      },
      pagebreak: { mode: 'avoid-all' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderContent = () => {
    const slide = slides[currentSlide];
    const Icon = slide.icon;

    return (
      <div className="w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          {Icon && (
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Icon className="w-8 h-8 text-blue-400" />
            </div>
          )}
          <h2 className="text-4xl font-bold text-blue-400">
            {slide.title}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-8 text-blue-200"
        >
          {slide.content}
        </motion.p>

        {slide.timeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-6 mb-8"
          >
            {slide.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-blue-500/10 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-4">
                  {item.quarter || item.phase}
                </h3>
                <ul className="space-y-2">
                  {item.items ? (
                    item.items.map((i, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="text-blue-100"
                      >
                        • {i}
                      </motion.li>
                    ))
                  ) : (
                    <>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-blue-100"
                      >
                        • {item.milestone}
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-blue-100"
                      >
                        • {item.goals}
                      </motion.li>
                    </>
                  )}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {slide.bullets && slide.bullets.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 text-left w-full max-w-3xl mx-auto"
          >
            {slide.bullets.map((bullet, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 text-lg"
              >
                <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0" />
                <span className="text-blue-100">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {slide.features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-6 mb-8"
          >
            {slide.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-blue-500/10 p-6 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <feature.icon className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-blue-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-blue-100">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {slide.funding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Funding Allocation
            </h3>
            <div className="space-y-3">
              {slide.funding?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-blue-500/10 p-4 rounded-lg flex justify-between items-center"
                >
                  <span className="text-blue-100">{item.category}</span>
                  <div className="text-right">
                    <span className="text-blue-200 font-medium">{item.amount}</span>
                    <p className="text-blue-100 text-sm">{item.purpose}</p>
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + slide.funding!.length * 0.1 }}
                className="text-xl text-blue-200 text-right font-medium"
              >
                Total: {slide.totalFunding}
              </motion.div>
            </div>
          </motion.div>
        )}

        {slide.team && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Our Team
            </h3>
            <div className="space-y-3">
              {slide.team?.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-blue-500/10 p-4 rounded-lg"
                >
                  <h4 className="text-blue-200 font-medium">{member.role}</h4>
                  <p className="text-blue-100">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {slide.marketData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              {slide.marketData?.title}
            </h3>
            <ul className="space-y-3">
              {slide.marketData?.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-blue-100 text-lg flex items-center gap-2"
                >
                  <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={deckRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo className="text-white h-8 w-auto" />
          <button
            onClick={handleExport}
            disabled={isDownloading}
            className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDownloading ? 'Downloading...' : 'Download PDF'}
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
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900/95 to-black/95">
                {slides[currentSlide].type === 'title' ? (
                  <>
                    <Logo className="text-white h-16 w-auto mb-8" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-4xl font-bold mb-4 text-blue-400">
                        {slides[currentSlide].content}
                      </h2>
                      {slides[currentSlide].bullets?.map((bullet, index) => (
                        <motion.p
                          key={index}
                          className="text-xl text-blue-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {bullet}
                        </motion.p>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  renderContent()
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={previousSlide}
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
              onClick={nextSlide}
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