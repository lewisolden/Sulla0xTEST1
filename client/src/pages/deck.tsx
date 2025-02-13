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
  Blocks
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const titleSlide = (
  <Slide key="title">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Sulla Platform</h1>
      <p className="text-xl">Next-Generation Crypto Education</p>
    </div>
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

// Additional slides with placeholder content
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

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  featuresSlide,
  whatIsBuiltSlide,
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

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
          <h1 className="text-2xl font-bold">Sulla Platform</h1>
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