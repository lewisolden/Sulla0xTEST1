import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import html2pdf from 'html2pdf.js';
import { useToast } from "@/hooks/use-toast";

// Logo Component
const Logo = ({ className = '' }) => (
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

const slides = [
  {
    type: 'title',
    title: "Sulla",
    content: "Next-Generation Crypto Education Platform",
    bullets: ["Investor Pitch Deck", "2025"]
  },
  {
    title: "The Problem",
    content: "Current crypto education is fragmented, lacks engagement, and fails to provide practical skills.",
    bullets: [
      "Lack of Engagement - Existing resources are often boring and passive",
      "Limited Practical Application - Theory without hands-on experience",
      "Fragmented Learning Paths - No structured progression",
      "Inconsistent Quality - Varying content reliability"
    ]
  },
  {
    title: "Our Solution",
    content: "Sulla provides an engaging and practical crypto education platform with a focus on hands-on learning and community engagement.",
    bullets: [
      "Interactive Learning Modules - Gamified theory and practice",
      "Community-Driven Platform - Collaborative learning environment",
      "Structured Learning Paths - Clear progression system",
      "Certified Learning - Verifiable achievements"
    ]
  },
  {
    title: "Key Features",
    content: "What sets us apart",
    bullets: [
      "Real-Time Market Simulators - Risk-free trading practice",
      "Security Focused Approach - Best practices emphasis",
      "Personalized Learning Experience - Adaptive pathways",
      "Expert Instructors - Industry leaders teaching"
    ]
  },
  {
    title: "Our Mission",
    content: "To empower individuals with the knowledge and skills to thrive in the decentralized future.",
    bullets: [
      "Accessible Education",
      "High-Quality Content",
      "Practical Skills Development",
      "Community Building",
      "Innovation Leadership"
    ]
  },
  {
    title: "Market Opportunity",
    content: "The global crypto market is rapidly expanding, with growing demand for education.",
    bullets: [
      "Multi-billion dollar education market",
      "420M+ global crypto users",
      "Rising institutional adoption",
      "Increasing regulatory clarity",
      "Growing skill gap"
    ]
  },
  {
    title: "Our Product",
    content: "A comprehensive learning platform",
    bullets: [
      "Interactive Learning Platform - Gamified courses",
      "Community and Collaboration - Social learning",
      "Personalized Learning Paths - Custom progression",
      "Certifications - Verifiable achievements"
    ]
  },
  {
    title: "Platform Features",
    content: "Built for engagement and results",
    bullets: [
      "Real-Time Trading Simulators",
      "Security Best Practices",
      "Expert-Led Content",
      "Data-Driven Approach"
    ]
  },
  {
    title: "Learning Modules",
    content: "Comprehensive curriculum coverage",
    bullets: [
      "Introduction to Blockchain",
      "Crypto Economics",
      "Trading Strategies",
      "Risk Management",
      "Security Best Practices",
      "Advanced Concepts"
    ]
  },
  {
    title: "Roadmap",
    content: "Our path to success",
    bullets: [
      "Q3 2024 - Core development and beta testing",
      "Q4 2024 - Strategic partnerships",
      "Q1 2025 - Full platform launch",
      "Q2 2025 - Advanced courses and enterprise clients"
    ]
  },
  {
    title: "Progress to Date",
    content: "What we've achieved",
    bullets: [
      "Core platform 90% developed",
      "Beta testing underway",
      "Key team members hired",
      "Initial community growing",
      "Strategic partnerships in discussion"
    ]
  },
  {
    title: "Go-to-Market Strategy",
    content: "Our approach to growth",
    bullets: [
      "Content Marketing - High-quality educational content",
      "Social Media Marketing - Platform engagement",
      "Affiliate Partnerships - Influencer collaboration",
      "Paid Advertising - Targeted campaigns"
    ]
  },
  {
    title: "Token Utility",
    content: "Platform Token Integration",
    bullets: [
      "Platform Access - Premium features",
      "Community Governance - Decision making",
      "Incentivization - Rewards system",
      "Staking - Additional benefits"
    ]
  },
  {
    title: "Financial Highlights",
    content: "Growth and Revenue",
    bullets: [
      "Projected $5M ARR in first year",
      "70%+ Gross Profit Margin",
      "Low Customer Acquisition Cost",
      "100%+ YoY Growth Projection"
    ]
  },
  {
    title: "Funding Requirements",
    content: "$1.5M Seed Round",
    bullets: [
      "Platform Development - 40%",
      "Marketing and Sales - 30%",
      "Team Expansion - 20%",
      "Operational Costs - 10%"
    ]
  },
  {
    title: "Our Team",
    content: "Expert Leadership",
    bullets: [
      "Experienced Founders",
      "Expert Developers",
      "Top Educators",
      "Seasoned Marketers"
    ]
  },
  {
    type: 'call-to-action',
    title: "Join Us",
    content: "Be Part of the Future of Crypto Education",
    bullets: [
      "Investment Opportunity",
      "Strategic Partnerships",
      "Contact: team@sulla.edu",
      "Start learning today"
    ]
  }
];

export default function DeckPage() {
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

      const container = document.createElement('div');
      container.style.width = '1920px';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      for (const slide of slides) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'page-break-after bg-gradient-to-br from-blue-900/95 to-black/95 p-12 text-white';
        slideDiv.style.height = '1080px';

        slideDiv.innerHTML = `
          <h2 class="text-4xl font-bold mb-8 text-blue-400">${slide.title}</h2>
          <p class="text-xl mb-8 text-blue-200">${slide.content}</p>
          ${slide.bullets && slide.bullets.length > 0 ? `
            <ul class="text-left space-y-4 w-full max-w-3xl">
              ${slide.bullets.map((bullet, i) => `
                <li class="flex items-center gap-3 text-lg">
                  <div class="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span class="text-blue-100">${bullet}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        `;
        container.appendChild(slideDiv);
      }

      const opt = {
        margin: 0,
        filename: 'sulla-presentation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          letterRendering: true,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'px', 
          format: [1920, 1080], 
          orientation: 'landscape',
          compress: true
        }
      };

      await html2pdf().from(container).set(opt).save();

      document.body.removeChild(container);

      toast({
        title: "Success",
        description: "Presentation PDF has been downloaded",
        variant: "default",
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
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
                    <h2 className="text-4xl font-bold mb-8 text-blue-400">
                      {slides[currentSlide].content}
                    </h2>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl font-bold mb-8 text-blue-400">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-xl mb-8 text-blue-200">
                      {slides[currentSlide].content}
                    </p>
                  </>
                )}
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