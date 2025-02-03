import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, ChevronRight, Download, Shield, Wallet, BookOpen, 
  Users, Building2, Target, Lock, Coins, Trophy, BarChart3, Brain,
  Boxes, Puzzle, Lightbulb, HandCoins, Network, Award
} from "lucide-react";

// Slide animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const FinancialTable = () => (
  <motion.div 
    className="w-full overflow-x-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <table className="min-w-full divide-y divide-blue-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Phase</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Timeline</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Target Goals</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-200">
        <motion.tr 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">0-12M</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">Community Growth</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">100K users, 10K Discord</td>
        </motion.tr>
        <motion.tr 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">12-18M</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">Monetization</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">First $500K revenue</td>
        </motion.tr>
        <motion.tr 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">18-24M</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">Institutional</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">500K+ users, major partnerships</td>
        </motion.tr>
      </tbody>
    </table>
  </motion.div>
);

const FundingTable = () => (
  <motion.div 
    className="w-full overflow-x-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <table className="min-w-full divide-y divide-blue-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Budget ($)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Purpose</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-200">
        {[
          { category: "Content Expansion", budget: "50K", purpose: "Develop additional courses" },
          { category: "Marketing", budget: "50K", purpose: "User acquisition" },
          { category: "Business Dev", budget: "50K", purpose: "Secure partnerships" },
          { category: "Platform", budget: "100K", purpose: "AI features" },
          { category: "Operations", budget: "200K", purpose: "Core team & hosting" },
          { category: "Security", budget: "100K", purpose: "Data protection" },
          { category: "Buffer", budget: "50K", purpose: "Contingency" }
        ].map((item, index) => (
          <motion.tr 
            key={item.category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{item.budget}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{item.purpose}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

const IconComponent = ({ icon: Icon }: { icon: any }) => {
  return <Icon className="w-16 h-16 text-blue-400" />;
};

const slides = [
  {
    title: "Sulla Pitch Deck",
    content: "Next-Generation Crypto Education Platform",
    type: "title",
    icon: BookOpen,
    bullets: []
  },
  {
    title: "Introduction",
    content: "The Problem & Solution",
    icon: Shield,
    bullets: [
      "The cryptocurrency industry is rapidly evolving, yet structured, high-quality educational resources remain fragmented",
      "Many newcomers struggle with fundamentals, experienced users lack clear pathways",
      "Sulla bridges this gap with interactive, structured courses",
      "Adaptive Learning with AI-driven personalization",
      "Intelligent Course Recommendations",
      "Modular Learning covering Bitcoin, Ethereum, DeFi, Security",
      "Interactive Experience with gamified quizzes",
      "Freemium Model with premium offerings"
    ]
  },
  {
    title: "Market Opportunity",
    content: "Why Now?",
    icon: Target,
    chart: true,
    bullets: [
      "Global Crypto Adoption: Over 420 million crypto users worldwide (2024)",
      "Institutional Interest: 80% of major banks exploring digital assets",
      "Market Size: $1.5B+ crypto education market and growing",
      "Projected Growth: Expected to exceed $5B by 2028",
      "Target Audience: Crypto enthusiasts, developers, traders, institutions"
    ]
  },
  {
    title: "Product Overview",
    content: "What Makes Sulla Unique?",
    icon: Puzzle,
    bullets: [
      "Comprehensive Course Library – Covers Bitcoin, Ethereum, DeFi, NFTs, DAOs, Security, Trading",
      "Adaptive Learning & AI Personalization – Dynamic difficulty adjustment",
      "Gamified Learning – Engaging quizzes and interactive simulations",
      "NFT-Based Certifications – Blockchain-verified credentials",
      "B2B Integration – White-label solutions for fintech companies"
    ]
  },
  {
    title: "Built to Date",
    content: "First Course: Introduction to Cryptocurrency",
    icon: Building2,
    bullets: [
      "Understanding Cryptocurrency – Evolution of money and digital assets",
      "Bitcoin & Ethereum Basics – Technology deep dive",
      "Security & Risk Management – Asset protection and scam awareness",
      "Practical Applications – Hands-on exercises",
      "Interactive Assessments – Gamified quizzes with instant feedback"
    ]
  },
  {
    title: "Traction & Milestones",
    content: "Growth Timeline",
    icon: BarChart3,
    chart: true,
    bullets: [
      "0-12M: Community Growth – 100K users, 10K Discord members",
      "12-18M: Monetization – First $500K revenue",
      "18-24M: Institutional Adoption – 500K+ users, major partnerships",
      "24M+: Global Expansion – 1M users, $5M+ ARR"
    ]
  },
  {
    title: "Funding Requirements",
    content: "Strategic Investment Allocation",
    icon: HandCoins,
    fundingTable: true,
    bullets: []
  },
  {
    title: "The Team",
    content: "Expert Leadership",
    icon: Users,
    bullets: [
      "Founder & CEO: Web3 entrepreneur with fintech & education expertise",
      "CTO: Blockchain developer & AI specialist",
      "Head of Content: Crypto educator & research analyst",
      "Marketing Lead: Web3 community builder & digital strategist"
    ]
  },
  {
    title: "Call to Action",
    content: "Join us in revolutionizing crypto education",
    type: "call-to-action",
    icon: Award,
    bullets: [
      "Seeking strategic partners and early adopters",
      "Investment opportunity available now",
      "Contact: team@sulla.com",
      "Twitter: @SullaCrypto",
      "Let's build the future of crypto education together"
    ]
  }
];

export default function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideDirection(1);
    setCurrentSlide(curr => curr < slides.length - 1 ? curr + 1 : curr);
  }, []);

  const previousSlide = useCallback(() => {
    setSlideDirection(-1);
    setCurrentSlide(curr => curr > 0 ? curr - 1 : curr);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      previousSlide();
    }
  }, [nextSlide, previousSlide]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
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
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 p-12"
            >
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900/95 to-black/95">
                {slides[currentSlide].icon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-6"
                  >
                    <IconComponent icon={slides[currentSlide].icon} />
                  </motion.div>
                )}

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-8 text-blue-400"
                >
                  {slides[currentSlide].title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl mb-8 text-blue-200"
                >
                  {slides[currentSlide].content}
                </motion.p>

                {slides[currentSlide].chart && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-3xl mb-8"
                  >
                    <FinancialTable />
                  </motion.div>
                )}

                {slides[currentSlide].fundingTable && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-3xl mb-8"
                  >
                    <FundingTable />
                  </motion.div>
                )}

                {slides[currentSlide].bullets && slides[currentSlide].bullets.length > 0 && (
                  <ul className="text-left space-y-4 w-full max-w-3xl">
                    {slides[currentSlide].bullets.map((bullet, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
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