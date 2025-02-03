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
    title: "Our Vision",
    content: "A Comprehensive Pitch Deck for Sulla",
    bullets: ["Next-Generation Crypto Education Platform", "2024"]
  },
  {
    title: "Introduction",
    content: "Sulla is revolutionizing cryptocurrency education through an interactive, comprehensive learning platform.",
    bullets: [
      "Immersive Learning Experience",
      "Expert-Led Content",
      "Practical Applications",
      "Community-Driven Growth",
      "Advanced Technology Stack"
    ]
  },
  {
    title: "Market Problem",
    content: "The cryptocurrency education landscape is fragmented and ineffective.",
    bullets: [
      "Lack of structured learning paths",
      "Limited practical experience",
      "Poor quality control",
      "High entry barriers",
      "Insufficient support systems"
    ]
  },
  {
    title: "Our Solution",
    content: "A comprehensive platform that combines theory, practice, and community.",
    bullets: [
      "Interactive Learning Modules",
      "Real-World Applications",
      "Guided Progress System",
      "Community Support",
      "Expert Mentorship"
    ]
  },
  {
    title: "Platform Features",
    content: "Key components that make Sulla unique",
    bullets: [
      "Structured Curriculum",
      "Practice Environments",
      "Progress Tracking",
      "Community Integration",
      "Professional Certification"
    ]
  },
  {
    title: "Technology",
    content: "Built on cutting-edge technology for scalability and performance",
    bullets: [
      "Blockchain Integration",
      "AI-Powered Learning",
      "Cloud Infrastructure",
      "Mobile Optimization",
      "Real-Time Analytics"
    ]
  },
  {
    title: "Market Size",
    content: "A rapidly growing market with significant potential",
    bullets: [
      "$2.3B Crypto Education Market",
      "300M+ Potential Users",
      "50% YoY Growth",
      "Global Reach",
      "Expanding Use Cases"
    ]
  },
  {
    title: "Business Model",
    content: "Multiple revenue streams for sustainable growth",
    bullets: [
      "Subscription Plans",
      "Enterprise Solutions",
      "Certification Programs",
      "Partnership Revenue",
      "Premium Content"
    ]
  },
  {
    title: "Go-To-Market",
    content: "Strategic approach to market penetration",
    bullets: [
      "Content Marketing",
      "Strategic Partnerships",
      "Community Building",
      "Influencer Collaboration",
      "Educational Events"
    ]
  },
  {
    title: "Competition",
    content: "Positioned for market leadership",
    bullets: [
      "Comprehensive Solution",
      "Interactive Learning",
      "Practical Focus",
      "Community Emphasis",
      "Technical Excellence"
    ]
  },
  {
    title: "Our Team",
    content: "Experienced leaders in cryptocurrency and education",
    bullets: [
      "Blockchain Experts",
      "Education Specialists",
      "Technical Innovators",
      "Industry Veterans",
      "Community Leaders"
    ]
  },
  {
    title: "Financials",
    content: "Sustainable growth and profitability",
    bullets: [
      "Current ARR: $500K",
      "Projected Growth: 200% YoY",
      "Gross Margin: 75%",
      "CAC: $200",
      "LTV: $2,000"
    ]
  },
  {
    title: "Funding Ask",
    content: "Seeking $5M Series A Investment",
    bullets: [
      "Product Development: 40%",
      "Marketing & Sales: 30%",
      "Team Expansion: 20%",
      "Operations: 10%"
    ]
  },
  {
    type: 'call-to-action',
    title: "Join Our Journey",
    content: "Be part of the future of crypto education",
    bullets: [
      "Investment Opportunity",
      "Strategic Partnership",
      "Contact: invest@sulla.io",
      "Visit: www.sulla.io"
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