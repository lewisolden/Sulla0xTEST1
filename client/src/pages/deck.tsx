import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const slides = [
  {
    title: "Sulla - Revolutionizing Crypto Education",
    content: "A comprehensive platform for learning cryptocurrency and blockchain technology",
    type: "title"
  },
  {
    title: "Problem",
    content: "The cryptocurrency learning curve is steep and existing resources are fragmented",
    bullets: [
      "Complex terminology",
      "Technical barriers",
      "Information overload",
      "Lack of structured learning",
      "High risk of mistakes"
    ]
  },
  {
    title: "Solution",
    content: "An all-in-one educational platform that makes crypto learning accessible and engaging",
    bullets: [
      "Interactive learning modules",
      "Practical simulations",
      "Guided progression",
      "Real-world applications",
      "Risk-free environment"
    ]
  },
  {
    title: "Key Features",
    content: "Comprehensive tools for effective learning",
    bullets: [
      "Modular curriculum structure",
      "Interactive exercises",
      "Virtual trading simulator",
      "Progress tracking",
      "Achievement system"
    ]
  },
  {
    title: "Curriculum Overview",
    content: "Structured learning path from basics to advanced concepts",
    bullets: [
      "Module 1: Cryptocurrency Basics",
      "Module 2: Bitcoin & Blockchain",
      "Module 3: Ethereum & Smart Contracts",
      "Module 4: Advanced Topics",
      "Practical Applications"
    ]
  },
  {
    title: "Interactive Learning",
    content: "Hands-on experience in a safe environment",
    bullets: [
      "Virtual wallet simulation",
      "Trading practice platform",
      "Smart contract interaction",
      "Real-time market data",
      "Guided exercises"
    ]
  },
  {
    title: "Technology Stack",
    content: "Built with modern, reliable technologies",
    bullets: [
      "React.js frontend",
      "Node.js backend",
      "PostgreSQL database",
      "TypeScript",
      "Blockchain integration"
    ]
  },
  {
    title: "Security Focus",
    content: "Emphasizing safe practices in cryptocurrency",
    bullets: [
      "Wallet security best practices",
      "Transaction safety",
      "Private key management",
      "Scam awareness",
      "Risk management"
    ]
  },
  {
    title: "Market Understanding",
    content: "Comprehensive market analysis tools",
    bullets: [
      "Price analysis",
      "Market trends",
      "Trading patterns",
      "Risk assessment",
      "Portfolio management"
    ]
  },
  {
    title: "Achievement System",
    content: "Gamified learning experience",
    bullets: [
      "Progress badges",
      "Completion certificates",
      "Skill level tracking",
      "Learning milestones",
      "Performance rewards"
    ]
  },
  {
    title: "Community Features",
    content: "Building a supportive learning environment",
    bullets: [
      "Discussion forums",
      "Peer learning",
      "Expert guidance",
      "Community challenges",
      "Knowledge sharing"
    ]
  },
  {
    title: "Personalized Learning",
    content: "Adaptive learning paths for individual needs",
    bullets: [
      "Custom pace setting",
      "Progress tracking",
      "Difficulty adjustment",
      "Topic focus areas",
      "Learning style adaptation"
    ]
  },
  {
    title: "Technical Innovation",
    content: "Cutting-edge educational technology",
    bullets: [
      "Blockchain integration",
      "Real-time data feeds",
      "Interactive visualizations",
      "Smart contract demos",
      "API connectivity"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Addressing a growing need in crypto education",
    bullets: [
      "Rising crypto adoption",
      "Increasing demand for education",
      "Limited quality resources",
      "Market gap",
      "Growth potential"
    ]
  },
  {
    title: "Target Audience",
    content: "Serving diverse learning needs",
    bullets: [
      "Crypto beginners",
      "Intermediate traders",
      "Technical developers",
      "Investment professionals",
      "Blockchain enthusiasts"
    ]
  },
  {
    title: "Business Model",
    content: "Sustainable revenue generation",
    bullets: [
      "Subscription tiers",
      "Premium features",
      "Corporate training",
      "Custom solutions",
      "Partner integrations"
    ]
  },
  {
    title: "Growth Strategy",
    content: "Planned expansion and development",
    bullets: [
      "Feature expansion",
      "Market penetration",
      "Partnership development",
      "Content enhancement",
      "Community growth"
    ]
  },
  {
    title: "Competitive Advantage",
    content: "What sets Sulla apart",
    bullets: [
      "Comprehensive curriculum",
      "Interactive learning",
      "Practical experience",
      "Safety focus",
      "Community support"
    ]
  },
  {
    title: "Roadmap",
    content: "Future development plans",
    bullets: [
      "Mobile app development",
      "Advanced trading features",
      "AI-powered learning",
      "Enhanced simulations",
      "Global expansion"
    ]
  },
  {
    title: "Join the Revolution",
    content: "Be part of the future of crypto education",
    bullets: [
      "Start learning today",
      "Join our community",
      "Track your progress",
      "Build your skills",
      "Achieve your goals"
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
            className="gap-2"
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
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-4xl font-bold mb-8 text-blue-500">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  {slides[currentSlide].content}
                </p>
                {slides[currentSlide].bullets && (
                  <ul className="text-left space-y-4">
                    {slides[currentSlide].bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                        {bullet}
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
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="px-4 py-2 bg-black bg-opacity-50 rounded">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="gap-2"
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