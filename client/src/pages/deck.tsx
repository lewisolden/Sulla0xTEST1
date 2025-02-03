import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const slides = [
  {
    title: "About Sulla",
    content: "Next-Generation Crypto Education Platform",
    type: "title",
    bullets: []
  },
  {
    title: "The Problem",
    content: "Current State of Crypto Education",
    bullets: [
      "Fragmented and unreliable educational resources",
      "Complex technical barriers for newcomers",
      "Lack of structured learning paths",
      "Limited practical experience opportunities",
      "High risk of costly mistakes"
    ]
  },
  {
    title: "Our Solution",
    content: "Interactive Learning Platform",
    bullets: [
      "Comprehensive, structured curriculum",
      "Interactive learning modules",
      "Hands-on practice environments",
      "AI-driven personalization",
      "Real-time progress tracking"
    ]
  },
  {
    title: "Key Features",
    content: "What Makes Sulla Different",
    bullets: [
      "Gamified learning experience",
      "Virtual trading simulator",
      "Smart contract playground",
      "NFT-based achievements",
      "Community support system"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Growing Demand",
    bullets: [
      "420M+ global crypto users",
      "$1.5B crypto education market",
      "80% of banks exploring crypto",
      "Rising institutional adoption",
      "Increasing regulatory clarity"
    ]
  },
  {
    title: "Target Audience",
    content: "Who We Serve",
    bullets: [
      "Crypto newcomers",
      "Traditional investors",
      "Developers",
      "Financial institutions",
      "Educational organizations"
    ]
  },
  {
    title: "Technology Stack",
    content: "Built for Scale",
    bullets: [
      "React & TypeScript frontend",
      "Node.js backend",
      "PostgreSQL database",
      "Blockchain integrations",
      "AI/ML capabilities"
    ]
  },
  {
    title: "Learning Modules",
    content: "Comprehensive Curriculum",
    bullets: [
      "Cryptocurrency Fundamentals",
      "Blockchain Technology",
      "DeFi & Smart Contracts",
      "Trading & Investment",
      "Security & Best Practices"
    ]
  },
  {
    title: "Interactive Tools",
    content: "Practical Learning Environment",
    bullets: [
      "Trading simulator",
      "Wallet practice",
      "Smart contract editor",
      "Market analysis tools",
      "Security workshops"
    ]
  },
  {
    title: "Progress Tracking",
    content: "Measure Your Growth",
    bullets: [
      "Achievement system",
      "Skill assessments",
      "Learning analytics",
      "Performance metrics",
      "Completion certificates"
    ]
  },
  {
    title: "Community Features",
    content: "Learn Together",
    bullets: [
      "Discussion forums",
      "Study groups",
      "Mentor matching",
      "Peer reviews",
      "Knowledge sharing"
    ]
  },
  {
    title: "B2B Solutions",
    content: "Enterprise & Institutional",
    bullets: [
      "Custom learning paths",
      "White-label platform",
      "API integration",
      "Analytics dashboard",
      "Compliance training"
    ]
  },
  {
    title: "Security Focus",
    content: "Safe Learning Environment",
    bullets: [
      "Best practice training",
      "Secure testing environment",
      "Risk management",
      "Scam prevention",
      "Privacy protection"
    ]
  },
  {
    title: "User Benefits",
    content: "Why Choose Sulla",
    bullets: [
      "Structured learning path",
      "Practical experience",
      "Risk-free environment",
      "Industry recognition",
      "Career advancement"
    ]
  },
  {
    title: "Revenue Model",
    content: "Sustainable Growth",
    bullets: [
      "Freemium model",
      "Premium subscriptions",
      "Enterprise licensing",
      "B2B partnerships",
      "Custom solutions"
    ]
  },
  {
    title: "Growth Strategy",
    content: "Expansion Plans",
    bullets: [
      "Market penetration",
      "Product development",
      "Geographic expansion",
      "Partnership network",
      "Community growth"
    ]
  },
  {
    title: "Competition Analysis",
    content: "Market Position",
    bullets: [
      "Comprehensive solution",
      "Interactive approach",
      "Enterprise focus",
      "Technology advantage",
      "Community strength"
    ]
  },
  {
    title: "Token Economics",
    content: "Platform Token Utility",
    bullets: [
      "Learning incentives",
      "Governance rights",
      "Premium access",
      "Community rewards",
      "Ecosystem integration"
    ]
  },
  {
    title: "Financial Projections",
    content: "5-Year Forecast",
    bullets: [
      "Year 1: Market entry",
      "Year 2: Revenue growth",
      "Year 3: Break-even",
      "Year 4: Expansion",
      "Year 5: Market leader"
    ]
  },
  {
    title: "Funding Requirements",
    content: "Investment Opportunity",
    bullets: [
      "Development: $250K",
      "Marketing: $150K",
      "Operations: $150K",
      "Reserve: $100K",
      "Total: $650K"
    ]
  },
  {
    title: "Team",
    content: "Expert Leadership",
    bullets: [
      "Experienced founders",
      "Technical expertise",
      "Education background",
      "Industry network",
      "Advisory board"
    ]
  },
  {
    title: "Join Us",
    content: "Be Part of the Future",
    type: "call-to-action",
    bullets: [
      "Investment opportunity",
      "Partnership programs",
      "Contact: team@sulla.com",
      "Website: sulla.edu",
      "Start learning today"
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