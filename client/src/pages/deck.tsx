import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, ChevronRight, Download, Shield, Wallet, BookOpen, 
  Users, Building2, Target, Lock, Coins, Trophy, BarChart3, Brain,
  Boxes, Puzzle, Lightbulb, HandCoins, Network, Award
} from "lucide-react";

// Import diagram components
import { GettingStartedDiagram } from "@/components/diagrams/GettingStartedDiagram";
import { PlatformsDiagram } from "@/components/diagrams/PlatformsDiagram";
import { BlockchainTypesDiagram } from "@/components/diagrams/BlockchainTypesDiagram";
import BlockchainBasicsDiagram from "@/components/diagrams/BlockchainBasicsDiagram";
import BitcoinBasicsDiagram from "@/components/diagrams/BitcoinBasicsDiagram";
import BlockStructureDiagram from "@/components/diagrams/BlockStructureDiagram";
import { PracticalApplicationsDiagram } from "@/components/diagrams/PracticalApplicationsDiagram";

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
    diagram: <GettingStartedDiagram />,
    bullets: []
  },
  {
    title: "The Problem",
    content: "The Current State of Crypto Education",
    icon: Shield,
    bullets: [
      "The cryptocurrency industry is rapidly evolving, yet structured, high-quality educational resources remain fragmented, overly technical, or unreliable",
      "Many newcomers struggle to understand the fundamentals, and experienced users lack clear pathways for advanced learning",
      "High risk of costly mistakes due to lack of practical experience",
      "Fragmented learning resources across multiple platforms",
      "No standardized certification or progress tracking"
    ]
  },
  {
    title: "Our Solution",
    content: "Sulla: Interactive Learning Platform",
    icon: Puzzle,
    diagram: <PlatformsDiagram />,
    bullets: [
      "Next-generation crypto education platform bridging this gap",
      "Interactive, structured, and engaging courses",
      "Adaptive Learning with AI-driven personalization",
      "Intelligent Course Recommendations",
      "Practical hands-on experience in a safe environment"
    ]
  },
  {
    title: "Key Features",
    content: "What Makes Sulla Different",
    icon: Brain,
    bullets: [
      "Comprehensive Course Library",
      "Adaptive Learning & AI Personalization",
      "Interactive Simulations & Practice Environments",
      "NFT-Based Certifications",
      "Community-Driven Learning"
    ]
  },
  {
    title: "Course Structure",
    content: "Modular Learning Path",
    icon: Boxes,
    diagram: <BlockchainTypesDiagram />,
    bullets: [
      "Fundamentals of Cryptocurrency",
      "Blockchain Technology Deep Dive",
      "DeFi & Smart Contracts",
      "Security Best Practices",
      "Trading & Investment Strategies"
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
      "Market Size: Crypto Education Market Value (2024): $1.5B+ and growing",
      "Projected Growth: Expected to exceed $5B by 2028",
      "Target Audience: Crypto enthusiasts, developers, traders, and institutions"
    ]
  },
  {
    title: "Target Audience",
    content: "Who We Serve",
    icon: Users,
    bullets: [
      "Crypto Newcomers seeking structured learning",
      "Experienced users looking to advance skills",
      "Developers transitioning to blockchain",
      "Financial institutions training staff",
      "Educational organizations"
    ]
  },
  {
    title: "Learning Experience",
    content: "Interactive & Engaging",
    icon: Lightbulb,
    diagram: <BlockchainBasicsDiagram />,
    bullets: [
      "Gamified learning modules",
      "Real-time progress tracking",
      "Interactive quizzes and exercises",
      "Practical simulations",
      "Peer learning opportunities"
    ]
  },
  {
    title: "Technology Stack",
    content: "Built for Scale",
    icon: Network,
    diagram: <BitcoinBasicsDiagram />,
    bullets: [
      "Modern web technologies (React, Node.js)",
      "AI/ML for personalization",
      "Blockchain integration",
      "Cloud infrastructure",
      "Security-first architecture"
    ]
  },
  {
    title: "Security Focus",
    content: "Safe Learning Environment",
    icon: Lock,
    diagram: <BlockStructureDiagram />,
    bullets: [
      "Protected practice environment",
      "Risk-free experimentation",
      "Best practice training",
      "Real-world security scenarios",
      "Regular security updates"
    ]
  },
  {
    title: "Product Status",
    content: "What's Been Built",
    icon: Building2,
    diagram: <PracticalApplicationsDiagram />,
    bullets: [
      "Complete MVP with core features",
      "First course: Intro to Cryptocurrency",
      "Interactive learning modules",
      "Testing environment",
      "Basic certification system"
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
    title: "Go-to-Market Strategy",
    content: "Three-Phase Approach",
    icon: Target,
    bullets: [
      "Phase 1: Community Building & Brand Awareness",
      "Phase 2: B2C Growth & Initial Monetization",
      "Phase 3: B2B Expansion & Institutional Partnerships",
      "Content Marketing & Social Media Strategy",
      "Strategic Partnerships & Influencer Collaboration"
    ]
  },
  {
    title: "Business Model",
    content: "Revenue Streams",
    icon: Coins,
    bullets: [
      "Freemium Model with Premium Features",
      "B2B Enterprise Solutions",
      "Custom Corporate Training",
      "White-Label Platform Licensing",
      "Certification Programs"
    ]
  },
  {
    title: "Competition Analysis",
    content: "Our Advantage",
    icon: Trophy,
    bullets: [
      "Most competitors offer static content only",
      "Limited practical application in existing solutions",
      "Our AI-driven personalization is unique",
      "Comprehensive learning path vs fragmented courses",
      "Strong focus on security and best practices"
    ]
  },
    {
    title: "Token Integration",
    content: "Platform Token Utility",
    icon: Coins,
    bullets: [
      "Learn-to-Earn Rewards",
      "Governance Rights",
      "Premium Content Access",
      "NFT Certification System",
      "Community Incentives"
    ]
  },
  {
    title: "Financial Projections",
    content: "5-Year Growth Plan",
    icon: BarChart3,
    bullets: [
      "Year 1: 100K+ users, Focus on Growth",
      "Year 2: 500K+ users, $500K Revenue",
      "Year 3: 1M+ users, $2M - $5M Revenue",
      "Year 4: 2M+ users, $10M+ Revenue",
      "Year 5: 5M+ users, $25M+ Revenue"
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
    title: "Use of Funds",
    content: "Investment Allocation",
    icon: HandCoins,
    bullets: [
      "Product Development: 35%",
      "Marketing & User Acquisition: 25%",
      "Team Expansion: 20%",
      "Operations & Infrastructure: 15%",
      "Legal & Compliance: 5%"
    ]
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
    title: "Next Steps",
    content: "Join us in revolutionizing crypto education",
    icon: Award,
      bullets: [
      "Seeking strategic partners and early adopters",
      "Investment opportunity available now",
      "Platform launch in Q2 2024",
      "Contact: team@sulla.com",
      "Twitter: @SullaCrypto"
    ]
  },
  {
    title: "Thank You",
    content: "Let's build the future of crypto education together",
      type: "call-to-action",
    icon: Award,
    bullets: [
        "Investment opportunity: $650K Seed Round",
        "Strategic partnerships welcome",
        "Early access program opening soon",
        "Connect with us today",
        "Email: team@sulla.com"
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

                {slides[currentSlide].diagram && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-3xl mb-8"
                  >
                    {slides[currentSlide].diagram}
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