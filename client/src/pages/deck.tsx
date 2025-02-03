import React from 'react';
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download,
  BookOpen,
  Target,
  Users,
  BarChart2,
  Layers,
  Code2,
  TrendingUp,
  DollarSign,
  Rocket,
  Award,
  UserCheck,
  Zap,
  type LucideIcon
} from "lucide-react";
import html2pdf from 'html2pdf.js';
import { useToast } from "@/hooks/use-toast";

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

const slides: Slide[] = [
  {
    type: 'title',
    title: "Sulla Pitch Deck",
    content: "Next-Generation Crypto Education Platform",
    icon: Target,
    bullets: []
  },
  {
    title: "Introduction",
    content: "The cryptocurrency industry is rapidly evolving, yet structured, high-quality educational resources remain fragmented, overly technical, or unreliable. Many newcomers struggle to understand the fundamentals, and experienced users lack clear pathways for advanced learning.",
    icon: BookOpen,
    subsections: [
      {
        title: "The Solution",
        content: "Sulla is a next-generation crypto education platform that bridges this gap by offering interactive, structured, and engaging courses tailored for beginners, developers, and institutions."
      }
    ],
    bullets: [
      "Adaptive Learning: AI-driven personalization tailors content based on individual learning styles, skill levels, and progress",
      "Intelligent Course Recommendations: Machine learning algorithms suggest the most relevant courses, exercises, and additional resources",
      "Modular Learning: Covers Bitcoin, Ethereum, DeFi, Smart Contracts, Security, and more",
      "Interactive Experience: Gamified quizzes, real-world scenarios, and NFT-based certifications",
      "Freemium Model: Free introductory content, with premium offerings for deeper knowledge"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Why Now?",
    icon: TrendingUp,
    bullets: [
      "Global Crypto Adoption: Over 420 million crypto users worldwide (2024)",
      "Institutional Interest: Traditional finance is embracing blockchain; 80% of major banks are exploring digital assets",
      "Lack of Quality Education: Most educational resources are either too technical or outdated, leading to confusion and security risks"
    ],
    marketData: {
      title: "Market Size",
      items: [
        "Crypto Education Market Value (2024): $1.5B+ and growing",
        "Projected Growth: Expected to exceed $5B by 2028 as Web3 adoption accelerates",
        "Target Audience: Crypto enthusiasts, developers, traders, and fintech institutions"
      ]
    }
  },
  {
    title: "Product Overview",
    content: "What Makes Sulla Unique?",
    icon: Layers,
    features: [
      {
        icon: BookOpen,
        title: "Comprehensive Course Library",
        desc: "Covers Bitcoin, Ethereum, DeFi, NFTs, DAOs, Security, Trading, and more"
      },
      {
        icon: Zap,
        title: "Adaptive Learning & AI Personalization",
        desc: "AI algorithms analyze user behavior and dynamically adjust difficulty"
      },
      {
        icon: Target,
        title: "Gamified Learning",
        desc: "Engaging quizzes, skill challenges, and interactive simulations"
      },
      {
        icon: Award,
        title: "NFT-Based Certifications",
        desc: "Blockchain-verified credentials for job applications"
      },
      {
        icon: Users,
        title: "B2B Integration",
        desc: "White-label learning solutions for fintech companies"
      }
    ]
  },
  {
    title: "Product Roadmap",
    content: "Next 12 Months",
    icon: Rocket,
    timeline: [
      {
        quarter: "Q1",
        items: [
          "Expand Course Library - Launch advanced DeFi courses",
          "AI-Powered Learning Tools - Adaptive content suggestions"
        ]
      },
      {
        quarter: "Q2",
        items: [
          "Onboard Institutional Partners - Licensing deals",
          "Gamification Expansion - Leaderboards and NFT achievements"
        ]
      }
    ]
  },
  {
    title: "What's Been Built to Date?",
    content: "First Course: Introduction to Cryptocurrency",
    icon: Code2,
    bullets: [
      "Understanding Cryptocurrency - The evolution of money and digital assets",
      "Bitcoin & Ethereum Basics - Deep dive into technology and use cases",
      "Security & Risk Management - Protecting assets and recognizing scams",
      "Practical Applications - Hands-on exercises and quizzes",
      "Interactive Assessments - Gamified quizzes with instant feedback"
    ]
  },
  {
    title: "Traction & Milestones",
    content: "Our primary goal in the first 12 months is to onboard as many users as possible, as more user data improves our AI capabilities.",
    icon: BarChart2,
    timeline: [
      {
        phase: "0-12M",
        milestone: "Community Growth",
        goals: "100K users, 10K Discord members"
      },
      {
        phase: "12-18M",
        milestone: "Monetization & Revenue",
        goals: "First $500K revenue from subscriptions & B2B deals"
      },
      {
        phase: "18-24M",
        milestone: "Institutional Adoption",
        goals: "500K+ users, major fintech & university partnerships"
      },
      {
        phase: "24M+",
        milestone: "Global Expansion",
        goals: "1M users, $5M+ ARR"
      }
    ]
  },
  {
    title: "Funding Requirements",
    content: "Investment Breakdown",
    icon: DollarSign,
    funding: [
      {
        category: "Content Expansion",
        amount: "$50K",
        purpose: "Develop additional courses and certifications"
      },
      {
        category: "Marketing & User Acquisition",
        amount: "$50K",
        purpose: "Build brand awareness and onboard early adopters"
      },
      {
        category: "Business Development",
        amount: "$50K",
        purpose: "Secure partnerships and institutional deals"
      },
      {
        category: "Platform Enhancements",
        amount: "$100K",
        purpose: "Improve AI learning algorithms and gamification features"
      },
      {
        category: "Legal & Compliance",
        amount: "$50K",
        purpose: "Ensure regulatory compliance"
      },
      {
        category: "Operational Costs",
        amount: "$200K",
        purpose: "Support core team and operations"
      },
      {
        category: "Security & Platform Maintenance",
        amount: "$100K",
        purpose: "Protect user data and enhance system resilience"
      },
      {
        category: "Miscellaneous & Buffer Fund",
        amount: "$50K",
        purpose: "Provide flexibility for unforeseen needs"
      }
    ],
    totalFunding: "$650K"
  },
  {
    title: "The Team",
    content: "Expert Leadership Team",
    icon: UserCheck,
    team: [
      {
        role: "Founder & CEO",
        description: "Web3 entrepreneur with fintech & education expertise"
      },
      {
        role: "CTO",
        description: "Blockchain developer & AI specialist"
      },
      {
        role: "Head of Content",
        description: "Crypto educator & research analyst"
      },
      {
        role: "Marketing & Growth Lead",
        description: "Web3 community builder & digital strategist"
      }
    ]
  },
  {
    type: 'call-to-action',
    title: "Call to Action",
    content: "Join us in revolutionizing crypto education",
    icon: Zap,
    bullets: [
      "Join us in revolutionizing crypto education",
      "Seeking investors, partners, and early adopters",
      "Let's connect to discuss funding & strategic collaborations",
      "Contact: [Your Email] | Twitter: @SullaCrypto | Website: [Your Website]"
    ]
  }
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const nextSlide = useCallback(() => {
    setCurrentSlide(curr => curr < slides.length - 1 ? curr + 1 : curr);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide(curr => curr > 0 ? curr - 1 : curr);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      previousSlide();
    }
  }, [nextSlide, previousSlide]);

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/api/deck/download');

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sulla-presentation.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Presentation PDF has been downloaded",
        variant: "default",
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Error",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const renderSlideContent = (slide: Slide) => {
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
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo className="text-white h-8 w-auto" />
          <Button
            variant="outline"
            onClick={downloadPDF}
            disabled={isDownloading}
            className="gap-2 bg-white text-blue-900 hover:bg-blue-100"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Downloading...' : 'Download PDF'}
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
              className="absolute inset-0 p-12 deck-slide"
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
                  renderSlideContent(slides[currentSlide])
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={previousSlide}
              disabled={currentSlide === 0}
              className="gap-2 bg-white text-blue-900 hover:bg-blue-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="px-4 py-2 bg-white/20 rounded">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="gap-2 bg-white text-blue-900 hover:bg-blue-100"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckPage;