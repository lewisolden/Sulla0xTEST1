import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const slides = [
  {
    title: "The Sulla Crypto Learning Platform",
    content: "An interactive educational platform for learning cryptocurrency and blockchain technology",
    type: "title"
  },
  {
    title: "Our Mission",
    content: "To democratize cryptocurrency education through interactive and engaging learning experiences",
    bullets: [
      "Make crypto education accessible",
      "Provide practical learning tools",
      "Build confidence through hands-on experience",
      "Foster a supportive learning community",
      "Enable informed participation in digital finance"
    ]
  },
  {
    title: "The Challenge",
    content: "Cryptocurrency education faces significant barriers",
    bullets: [
      "Complex technical concepts",
      "Rapidly evolving landscape",
      "Information overload",
      "Limited practical experience",
      "High stakes for mistakes"
    ]
  },
  {
    title: "Our Solution",
    content: "A comprehensive learning platform that combines theory with practice",
    bullets: [
      "Interactive learning modules",
      "Hands-on simulations",
      "Real-world applications",
      "Progress tracking",
      "Community support"
    ]
  },
  {
    title: "Key Features",
    content: "Innovative tools for effective learning",
    bullets: [
      "Structured curriculum",
      "Virtual wallet simulator",
      "Trading practice platform",
      "Achievement system",
      "Expert guidance"
    ]
  },
  {
    title: "Learning Approach",
    content: "Multi-faceted educational methodology",
    bullets: [
      "Step-by-step progression",
      "Interactive exercises",
      "Real-time feedback",
      "Practical applications",
      "Community learning"
    ]
  },
  {
    title: "Technology Stack",
    content: "Built with cutting-edge technologies",
    bullets: [
      "React & TypeScript frontend",
      "Node.js backend",
      "PostgreSQL database",
      "Blockchain integration",
      "Real-time data feeds"
    ]
  },
  {
    title: "Course Structure",
    content: "Comprehensive curriculum design",
    bullets: [
      "Fundamentals of Cryptocurrency",
      "Blockchain Technology",
      "Smart Contracts",
      "DeFi Concepts",
      "Advanced Topics"
    ]
  },
  {
    title: "Learning Tools",
    content: "Practical tools for hands-on experience",
    bullets: [
      "Interactive tutorials",
      "Practice environments",
      "Market simulators",
      "Code sandboxes",
      "Assessment tools"
    ]
  },
  {
    title: "User Benefits",
    content: "Value proposition for learners",
    bullets: [
      "Structured learning path",
      "Practical experience",
      "Risk-free environment",
      "Progress tracking",
      "Community support"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Growing demand for crypto education",
    bullets: [
      "Rising crypto adoption",
      "Need for qualified professionals",
      "Industry skills gap",
      "Educational market growth",
      "Corporate training demand"
    ]
  },
  {
    title: "Target Audience",
    content: "Serving diverse learning needs",
    bullets: [
      "Crypto beginners",
      "Traditional investors",
      "Tech professionals",
      "Financial advisors",
      "Business leaders"
    ]
  },
  {
    title: "Growth Strategy",
    content: "Roadmap for platform expansion",
    bullets: [
      "Content expansion",
      "Feature development",
      "Community building",
      "Partnership programs",
      "Market penetration"
    ]
  },
  {
    title: "Join Sulla",
    content: "Start your crypto learning journey today",
    bullets: [
      "Register now",
      "Explore our modules",
      "Join the community",
      "Practice safely",
      "Build your future"
    ],
    type: "call-to-action"
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