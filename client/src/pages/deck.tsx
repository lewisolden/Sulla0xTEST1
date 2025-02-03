import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const slides = [
  {
    title: "Sulla Pitch Deck",
    content: "",
    type: "title",
    bullets: []
  },
  {
    title: "Introduction",
    content: "The Problem & Solution",
    bullets: [
      "The cryptocurrency industry is rapidly evolving, yet structured, high-quality educational resources remain fragmented, overly technical, or unreliable",
      "Many newcomers struggle to understand the fundamentals, and experienced users lack clear pathways for advanced learning",
      "Sulla is a next-generation crypto education platform bridging this gap with interactive, structured courses",
      "Adaptive Learning with AI-driven personalization",
      "Intelligent Course Recommendations via machine learning",
      "Modular Learning covering Bitcoin, Ethereum, DeFi, Smart Contracts, Security",
      "Interactive Experience with gamified quizzes and NFT certifications",
      "Freemium Model with premium offerings for deeper knowledge"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Why Now?",
    bullets: [
      "Global Crypto Adoption: Over 420 million crypto users worldwide (2024)",
      "Institutional Interest: 80% of major banks exploring digital assets",
      "Lack of Quality Education: Most resources too technical or outdated",
      "Market Size: Crypto Education Market Value (2024): $1.5B+ and growing",
      "Projected Growth: Expected to exceed $5B by 2028",
      "Target Audience: Crypto enthusiasts, developers, traders, and fintech institutions"
    ]
  },
  {
    title: "Product Overview",
    content: "What Makes Sulla Unique?",
    bullets: [
      "Comprehensive Course Library – Covers Bitcoin, Ethereum, DeFi, NFTs, DAOs, Security, Trading",
      "Adaptive Learning & AI Personalization – Dynamic difficulty adjustment",
      "Gamified Learning – Engaging quizzes and interactive simulations",
      "NFT-Based Certifications – Blockchain-verified credentials",
      "B2B Integration – White-label solutions for fintech companies"
    ]
  },
  {
    title: "What's Been Built to Date?",
    content: "First Course: Introduction to Cryptocurrency",
    bullets: [
      "Understanding Cryptocurrency – Evolution of money and digital assets",
      "Bitcoin & Ethereum Basics – Technology deep dive",
      "Security & Risk Management – Asset protection and scam awareness",
      "Practical Applications – Hands-on exercises",
      "Interactive Assessments – Gamified quizzes with instant feedback"
    ]
  },
  {
    title: "Go-to-Market Strategy",
    content: "Three Phase Approach",
    bullets: [
      "Phase 1 (0-6 Months): Community Growth via Web3 social media",
      "Interactive quizzes & NFT rewards",
      "YouTube & influencer partnerships",
      "SEO Strategy for organic growth",
      "Phase 2 (6-12 Months): Pre-Monetization & User Scaling",
      "Phase 3 (12-18 Months): Launch subscriptions ($9.99-$49.99/month)"
    ]
  },
  {
    title: "Traction & Milestones",
    content: "Growth Timeline",
    bullets: [
      "0-12M: Community Growth – 100K users, 10K Discord members",
      "12-18M: Monetization – First $500K revenue",
      "18-24M: Institutional Adoption – 500K+ users, major partnerships",
      "24M+: Global Expansion – 1M users, $5M+ ARR"
    ]
  },
  {
    title: "Funding Requirements",
    content: "Total Funding Needed: $650K",
    bullets: [
      "Content Expansion: $50K",
      "Marketing & Acquisition: $50K",
      "Business Development: $50K",
      "Platform Enhancements: $100K",
      "Operational Costs: $200K",
      "Security & Compliance: $100K",
      "Miscellaneous Buffer: $50K"
    ]
  },
  {
    title: "The Team",
    content: "Expert Leadership",
    bullets: [
      "Founder & CEO: Web3 entrepreneur with fintech & education expertise",
      "CTO: Blockchain developer & AI specialist",
      "Head of Content: Crypto educator & research analyst",
      "Marketing Lead: Community builder & digital strategist"
    ]
  },
  {
    title: "Future Token Integration",
    content: "Token Utility & Ecosystem",
    bullets: [
      "Tokenized Rewards – Earn for completing courses and contributing",
      "Staking for Premium Access – Unlock advanced content",
      "Decentralized Governance – Community-driven platform decisions",
      "Marketplace & Peer Learning Economy – Token-based incentives",
      "Building long-term engagement and community-driven growth"
    ]
  },
  {
    title: "5-Year Financial Forecasts",
    content: "Growth Projections",
    bullets: [
      "Year 1: 100K+ users, ($400K - $500K) Loss",
      "Year 2: 500K+ users, $500K Revenue, ($700K) Loss",
      "Year 3: 1M+ users, $2M - $5M Revenue, Break-even to $2M Profit",
      "Focus on user acquisition before monetization",
      "Additional fundraising required in Year 2"
    ]
  },
  {
    title: "Call to Action",
    content: "Join us in revolutionizing crypto education",
    type: "call-to-action",
    bullets: [
      "Seeking investors, partners, and early adopters",
      "Contact: team@sulla.com",
      "Twitter: @SullaCrypto"
    ]
  }
];

export default function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sulla-presentation.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Sulla Presentation</h1>
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
                <h2 className="text-4xl font-bold mb-8 text-blue-400">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-xl mb-8 text-blue-200">
                  {slides[currentSlide].content}
                </p>
                {slides[currentSlide].bullets && slides[currentSlide].bullets.length > 0 && (
                  <ul className="text-left space-y-4 w-full max-w-3xl">
                    {slides[currentSlide].bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-lg"
                      >
                        <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0" />
                        <span className="text-blue-100">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
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
}