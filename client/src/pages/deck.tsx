import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from '@/components/ui/slide';
import {
  Database,
  Server,
  Activity,
  Shield,
  Monitor,
  Rocket,
  ArrowRight,
  BarChart2,
  Building,
  Globe,
  Users,
  MessageCircle,
  Globe2,
  Coins,
  BarChart,
  Building2,
  LineChart,
  Wallet,
  Award,
  ChevronLeft,
  ChevronRight,
  Brain,
  Terminal,
  Code,
  CheckCircle,
  Book,
  Lock,
  Blocks,
  Mail,
  Twitter,
  Lightbulb,
  AlertTriangle,
  GitBranch,
  Sparkles,
  Bot,
  Puzzle,
  Laptop,
  GraduationCap,
  BrainCircuit,
  School,
  BookOpen,
  Microscope,
  CircleDollarSign,
  TrendingUp,
  UserCheck,
  PieChart,
  DollarSign,
  BellRing,
  BadgePercent,
  ShieldCheck,
  Infinity,
  Network,
  Layers,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const titleSlide = (
  <Slide key="title">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Logo className="text-white h-20 w-auto mb-8" />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-blue-400 mb-6">
          Next-Generation Crypto Education Platform
        </h1>
        <p className="text-2xl text-blue-200 mb-8">Investor Pitch Deck</p>
        <p className="text-xl text-blue-300">2025</p>
      </motion.div>
    </motion.div>
  </Slide>
);

const problemSlide = (
  <Slide key="problem">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">The Problem</h2>
      <p>Current crypto education lacks engagement and practical application</p>
    </div>
  </Slide>
);

const solutionSlide = (
  <Slide key="solution">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Our Solution</h2>
      <p>Interactive, AI-powered learning platform for crypto education</p>
    </div>
  </Slide>
);

const featuresSlide = (
  <Slide key="features">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Key Features</h2>
      <ul className="list-disc list-inside">
        <li>Interactive Learning</li>
        <li>AI-Powered Personalization</li>
        <li>Practical Exercises</li>
      </ul>
    </div>
  </Slide>
);

const missionSlide = (
  <Slide key="mission">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Our Mission</h2>
      <p>To empower individuals with the knowledge and skills to thrive in the crypto world.</p>
    </div>
  </Slide>
);

const marketOpportunitySlide = (
  <Slide key="market-opportunity">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Market Opportunity</h2>
      <p>The crypto market is rapidly expanding, and there is a growing need for quality education.</p>
    </div>
  </Slide>
);

const marketSizeSlide = (
  <Slide key="market-size">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Market Size</h2>
      <p>The global crypto education market is projected to reach \$X billion by 2028.</p>
    </div>
  </Slide>
);

const productOverviewSlide = (
  <Slide key="product-overview">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Product Overview</h2>
      <p>Sulla is an interactive, AI-powered learning platform that makes crypto education accessible and engaging.</p>
    </div>
  </Slide>
);

const interactiveToolsSlide = (
  <Slide key="interactive-tools">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Interactive Tools</h2>
      <p>Sulla offers a variety of interactive tools to help users learn about crypto, including quizzes, exercises, and simulations.</p>
    </div>
  </Slide>
);

const futureFinanceSlide = (
  <Slide key="future-finance">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Future of Finance</h2>
      <p>Sulla helps users prepare for the future of finance by teaching them about the latest trends in crypto.</p>
    </div>
  </Slide>
);


const roadmapSlide = (
  <Slide key="roadmap">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Roadmap</h2>
      <p>Sulla's roadmap includes the development of new features and content, as well as expansion into new markets.</p>
    </div>
  </Slide>
);

const whatIsBuiltSlide = (
  <Slide key="whats-built">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-green-500/20 rounded-lg">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400">Our Technical Infrastructure</h2>
      </div>

      <Card className="bg-blue-900/30 p-6 mb-8">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Backend Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {[
              {
                icon: Server,
                title: "Express.js Server",
                desc: "RESTful API endpoints with TypeScript for type safety"
              },
              {
                icon: Database,
                title: "PostgreSQL + Drizzle ORM",
                desc: "Robust data persistence with type-safe queries"
              },
              {
                icon: Shield,
                title: "Authentication System",
                desc: "JWT-based auth with role-based access control"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-300">{feature.title}</h4>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Activity,
                title: "Data Collection & Analytics",
                desc: "Real-time tracking of user progress and engagement"
              },
              {
                icon: Brain,
                title: "AI Integration",
                desc: "OpenAI-powered content recommendations and assistance"
              },
              {
                icon: Terminal,
                title: "DevOps",
                desc: "Automated deployment with continuous integration"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-300">{feature.title}</h4>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6 mb-8">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Data Collection & User Analytics</h3>
        <div className="space-y-4">
          {[
            {
              title: "Learning Progress Tracking",
              items: [
                "Module completion rates",
                "Time spent per lesson",
                "Quiz performance metrics",
                "Exercise completion success rates"
              ]
            },
            {
              title: "Engagement Analytics",
              items: [
                "User session duration",
                "Interactive feature usage",
                "Content preference patterns",
                "Learning style identification"
              ]
            },
            {
              title: "Performance Metrics",
              items: [
                "Knowledge retention scores",
                "Skill progression tracking",
                "Achievement milestone data",
                "Peer comparison analytics"
              ]
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg"
            >
              <h4 className="text-lg font-semibold text-blue-300 mb-2">{section.title}</h4>
              <ul className="grid grid-cols-2 gap-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-blue-100">
                    <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Lock className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Data Security & Privacy</h3>
        </div>
        <p className="text-blue-100">
          All user data is encrypted at rest and in transit, with strict GDPR compliance and regular security audits.
          Personal information is segregated from analytics data to ensure privacy while maintaining valuable insights.
        </p>
      </Card>
    </motion.div>
  </Slide>
);

const technicalInfrastructureSlide = (
  <Slide key="technical-infrastructure">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-green-500/20 rounded-lg">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400">Our Technical Infrastructure</h2>
      </div>

      <Card className="bg-blue-900/30 p-6 mb-8">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Backend Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {[
              {
                icon: Server,
                title: "Express.js Server",
                desc: "RESTful API endpoints with TypeScript for type safety"
              },
              {
                icon: Database,
                title: "PostgreSQL + Drizzle ORM",
                desc: "Robust data persistence with type-safe queries"
              },
              {
                icon: Shield,
                title: "Authentication System",
                desc: "JWT-based auth with role-based access control"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-300">{feature.title}</h4>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Activity,
                title: "Data Collection & Analytics",
                desc: "Real-time tracking of user progress and engagement"
              },
              {
                icon: Brain,
                title: "AI Integration",
                desc: "OpenAI-powered content recommendations and assistance"
              },
              {
                icon: Terminal,
                title: "DevOps",
                desc: "Automated deployment with continuous integration"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-300">{feature.title}</h4>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6 mb-8">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Data Collection & User Analytics</h3>
        <div className="space-y-4">
          {[
            {
              title: "Learning Progress Tracking",
              items: [
                "Module completion rates",
                "Time spent per lesson",
                "Quiz performance metrics",
                "Exercise completion success rates"
              ]
            },
            {
              title: "Engagement Analytics",
              items: [
                "User session duration",
                "Interactive feature usage",
                "Content preference patterns",
                "Learning style identification"
              ]
            },
            {
              title: "Performance Metrics",
              items: [
                "Knowledge retention scores",
                "Skill progression tracking",
                "Achievement milestone data",
                "Peer comparison analytics"
              ]
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg"
            >
              <h4 className="text-lg font-semibold text-blue-300 mb-2">{section.title}</h4>
              <ul className="grid grid-cols-2 gap-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-blue-100">
                    <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Lock className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Data Security & Privacy</h3>
        </div>
        <p className="text-blue-100">
          All user data is encrypted at rest and in transit, with strict GDPR compliance and regular security audits.
          Personal information is segregated from analytics data to ensure privacy while maintaining valuable insights.
        </p>
      </Card>
    </motion.div>
  </Slide>
);

const goToMarketSlide = (
  <Slide key="go-to-market">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Go-to-Market Strategy</h2>
      <p>Sulla's go-to-market strategy includes a combination of digital marketing, content marketing, and partnerships.</p>
    </div>
  </Slide>
);

const growthExpansionSlide = (
  <Slide key="growth-expansion">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Growth & Expansion</h2>
      <p>Sulla plans to expand its reach by partnering with educational institutions and businesses.</p>
    </div>
  </Slide>
);

const tokenIntegrationSlide = (
  <Slide key="token-integration">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Token Integration</h2>
      <p>Sulla will integrate with various crypto tokens to provide users with a seamless experience.</p>
    </div>
  </Slide>
);

const tractionSlide = (
  <Slide key="traction">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Traction</h2>
      <p>Sulla has already achieved significant traction, with X users and X active learners.</p>
    </div>
  </Slide>
);

const financialSlide = (
  <Slide key="financial">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Financial Highlights</h2>
      <p>Sulla's financial highlights include X revenue and X profit.</p>
    </div>
  </Slide>
);

const financialModelSlide = (
  <Slide key="financial-model">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Financial Model</h2>
      <p>Sulla's financial model is based on a subscription model.</p>
    </div>
  </Slide>
);

const fundingNarrativeSlide = (
  <Slide key="funding-narrative">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Funding Narrative</h2>
      <p>Sulla is seeking \$X in funding to accelerate its growth.</p>
    </div>
  </Slide>
);

const fundingBreakdownSlide = (
  <Slide key="funding-breakdown">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Funding Breakdown</h2>
      <p>Sulla's funding breakdown includes X for product development, X for marketing, and X for operations.</p>
    </div>
  </Slide>
);

const teamSlide = (
  <Slide key="team">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Team</h2>
      <p>Sulla's team is comprised of experienced professionals in the crypto and education industries.</p>
    </div>
  </Slide>
);

const joinUsSlide = (
  <Slide key="join-us">
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Join Us</h2>
      <p>Sulla is looking for talented individuals to join its team.</p>
    </div>
  </Slide>
);

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  featuresSlide,
  missionSlide,
  marketOpportunitySlide,
  marketSizeSlide,
  productOverviewSlide,
  interactiveToolsSlide,
  futureFinanceSlide,
  roadmapSlide,
  whatIsBuiltSlide,
  technicalInfrastructureSlide, 
  goToMarketSlide,
  growthExpansionSlide,
  tokenIntegrationSlide,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  joinUsSlide
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    try {
      const response = await fetch('/api/deck/download-static');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sulla-pitch-deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
        if (e.key === "ArrowLeft") setCurrentSlide(c => Math.max(c - 1, 0));
      }}
      tabIndex={0}
      ref={deckRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo className="text-white h-8 w-auto" />
          <Button
            onClick={downloadPDF}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
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
              className="absolute inset-0 p-12"
            >
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 overflow-y-auto bg-gradient-to-br from-blue-900/95 to-black/95">
                {slides[currentSlide]}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={() => setCurrentSlide(c => Math.max(c - 1, 0))}
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
              onClick={() => setCurrentSlide(c => Math.min(c + 1, slides.length - 1))}
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