import React from 'react';
import {
  Brain,
  Trophy,
  Dumbbell,
  Target,
  Rocket,
  Globe,
  BookOpen,
  GraduationCap,
  Zap,
  Shield,
  Users,
  Building,
  BarChart,
  Lightbulb,
  Wallet,
  Network,
  Code,
  Book,
  GitBranch,
  BrainCircuit,
  LineChart,
  BarChart2,
  Database,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Assuming Card component is defined elsewhere, or can be added.  If not defined, replace with a suitable alternative.
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-lg shadow ${className}`}>{children}</div>
);

// Slide Component
const Slide: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className={`bg-white rounded-lg shadow-lg p-8 mx-auto w-full mt-8 ${className}`}
  >
    {children}
  </motion.div>
);

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

// Title Slide
export const titleSlide = (
  <Slide key="title" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8">Next-Generation Crypto Education Platform</h2>
      <p className="text-xl mb-4">Investor Pitch Deck</p>
      <p className="text-lg">2025</p>
    </motion.div>
  </Slide>
);

// Problem Slide
export const problemSlide = (
  <Slide key="problem">
    <h2 className="text-2xl font-bold mb-4">The Problem</h2>
    <p className="mb-4">Current crypto education is fragmented, lacks engagement, and fails to provide practical skills.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-red-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Brain className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="font-bold text-lg">Lack of Engagement</h3>
        </div>
        <p>Existing resources are often boring and passive, leading to low retention rates.</p>
      </div>
      <div className="bg-red-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="font-bold text-lg">Limited Practical Application</h3>
        </div>
        <p>Theoretical knowledge without hands-on experience fails to prepare users for real-world scenarios.</p>
      </div>
    </div>
  </Slide>
);

// Solution Slides
export const solutionSlide1 = (
  <Slide key="solution1">
    <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
    <p className="mb-4">
      Sulla provides a comprehensive education platform combining cutting-edge AI technology with expert-crafted content.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <BrainCircuit className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">AI-Powered Learning</h3>
        </div>
        <p>Personalized learning paths powered by advanced AI algorithms</p>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Globe className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Comprehensive Curriculum</h3>
        </div>
        <p>From blockchain fundamentals to advanced AI concepts</p>
      </div>
    </div>
  </Slide>
);

export const solutionSlide2 = (
  <Slide key="solution2">
    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Zap className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Real-Time Market Simulators</h3>
        </div>
        <p>Practice trading strategies in a risk-free environment.</p>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Shield className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Security Focused Approach</h3>
        </div>
        <p>Learn security best practices throughout all modules.</p>
      </div>
    </div>
  </Slide>
);

// Mission Slide
export const missionSlide = (
  <Slide key="mission">
    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
    <p className="mb-4">To empower individuals with the knowledge and skills to thrive in the decentralized future.</p>
    <div className="bg-blue-100 rounded-lg shadow p-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Educating the Next Generation of Crypto Innovators</h3>
      </div>
    </div>
  </Slide>
);

// Market Slides
export const marketSlide1 = (
  <Slide key="market1">
    <h2 className="text-2xl font-bold mb-4">Market Opportunity</h2>
    <div className="bg-gray-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Large and Growing Market</h3>
      </div>
      <p>The crypto education market is rapidly expanding with significant growth potential.</p>
    </div>
  </Slide>
);

export const marketSlide2 = (
  <Slide key="market2">
    <h2 className="text-2xl font-bold mb-4">Market Trends</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Wallet className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Increased Investment</h3>
        </div>
        <p>Growing institutional and retail investments in crypto.</p>
      </div>
      <div className="bg-gray-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Network className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Mainstream Adoption</h3>
        </div>
        <p>Increasing mainstream adoption of cryptocurrency.</p>
      </div>
    </div>
  </Slide>
);

// Product Slides
export const productSlide1 = (
  <Slide key="product1">
    <h2 className="text-2xl font-bold mb-4">Our Product</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Rocket className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">Dual Learning Tracks</h3>
        </div>
        <p>Comprehensive courses in both Cryptocurrency and Artificial Intelligence</p>
      </div>
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <BrainCircuit className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">AI-Enhanced Learning</h3>
        </div>
        <p>Advanced AI algorithms adapt content to your learning style</p>
      </div>
    </div>
  </Slide>
);

export const productSlide2 = (
  <Slide key="product2">
    <h2 className="text-2xl font-bold mb-4">Key Platform Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-purple-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Users className="w-6 h-6 mr-2 text-purple-500" />
          <h3 className="font-bold text-lg">Expert Instructors</h3>
        </div>
        <p>Learn from industry professionals with extensive experience.</p>
      </div>
    </div>
  </Slide>
);

// Other slides exports
export const modulesSlide = (
  <Slide key="modules">
    <h2 className="text-2xl font-bold mb-4">Our Modules</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">Comprehensive Curriculum</h3>
        </div>
        <p>Structured learning path from basics to advanced topics.</p>
      </div>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
    <div className="space-y-4">
      <div className="bg-blue-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="font-bold text-lg">2025 Milestones</h3>
        </div>
        <p>Platform launch and initial user acquisition.</p>
      </div>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <h2 className="text-2xl font-bold mb-4">Progress to Date</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-green-100 rounded-lg shadow p-4">
        <div className="flex items-center mb-2">
          <Trophy className="w-6 h-6 mr-2 text-green-500" />
          <h3 className="font-bold text-lg">Key Achievements</h3>
        </div>
        <p>Development milestones and early partnerships.</p>
      </div>
    </div>
  </Slide>
);

export const gtmSlide1 = (
  <Slide key="gtm1">
    <h2 className="text-2xl font-bold mb-4">Go-to-Market Strategy</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Rocket className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Market Entry Plan</h3>
      </div>
      <p>Strategic partnerships and targeted marketing campaigns.</p>
    </div>
  </Slide>
);

export const gtmSlide2 = (
  <Slide key="gtm2">
    <h2 className="text-2xl font-bold mb-4">GTM Expansion</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Globe className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Global Reach</h3>
      </div>
      <p>International expansion and localization strategy.</p>
    </div>
  </Slide>
);

export const tokenSlide = (
  <Slide key="token">
    <h2 className="text-2xl font-bold mb-4">Token Utility</h2>
    <div className="bg-purple-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Code className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg">Token Economics</h3>
      </div>
      <p>Platform token utility and governance model.</p>
    </div>
  </Slide>
);

export const tractionSlide = (
  <Slide key="traction">
    <h2 className="text-2xl font-bold mb-4">Traction</h2>
    <div className="bg-green-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg">Growth Metrics</h3>
      </div>
      <p>User growth and engagement statistics.</p>
    </div>
  </Slide>
);

export const financialSlide = (
  <Slide key="financial">
    <h2 className="text-2xl font-bold mb-4">Financial Highlights</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Building className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Revenue Model</h3>
      </div>
      <p>Subscription and token-based revenue streams.</p>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <h2 className="text-2xl font-bold mb-4">Financial Model</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <BarChart className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Projections</h3>
      </div>
      <p>Five-year financial projections and metrics.</p>
    </div>
  </Slide>
);

export const fundingNarrativeSlide = (
  <Slide key="fundingNarrative">
    <h2 className="text-2xl font-bold mb-4">Funding Narrative</h2>
    <div className="bg-green-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Target className="w-6 h-6 mr-2 text-green-500" />
        <h3 className="font-bold text-lg">Investment Opportunity</h3>
      </div>
      <p>Growth strategy and investment thesis.</p>
    </div>
  </Slide>
);

export const fundingBreakdownSlide = (
  <Slide key="fundingBreakdown">
    <h2 className="text-2xl font-bold mb-4">Use of Funds</h2>
    <div className="bg-blue-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Wallet className="w-6 h-6 mr-2 text-blue-500" />
        <h3 className="font-bold text-lg">Allocation</h3>
      </div>
      <p>Detailed breakdown of funding allocation.</p>
    </div>
  </Slide>
);

export const teamSlide = (
  <Slide key="team">
    <h2 className="text-2xl font-bold mb-4">Our Team</h2>
    <div className="bg-purple-100 rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <Users className="w-6 h-6 mr-2 text-purple-500" />
        <h3 className="font-bold text-lg">Leadership</h3>
      </div>
      <p>Experienced team with deep industry expertise.</p>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8">Join the Future of Crypto Education</h2>
    </motion.div>
  </Slide>
);

export const futureFinanceSlide = (
  <Slide key="future-finance">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-green-500/20 rounded-lg">
          <Book className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400">Two Revolutionary Learning Paths</h2>
      </div>
      <div className="space-y-6">
        <Card className="bg-blue-900/30 p-6 mb-8">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Course 1: Introduction to Cryptocurrency</h3>
          <div className="space-y-4">
            {[
              {
                title: "Module 1: Understanding Cryptocurrency",
                description: "Master the fundamentals of digital assets and blockchain technology"
              },
              {
                title: "Module 2: Bitcoin Fundamentals",
                description: "Deep dive into Bitcoin, cryptocurrency markets, and investment strategies"
              },
              {
                title: "Module 3: Ethereum & Smart Contracts",
                description: "Explore Ethereum, smart contracts, and decentralized applications"
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                    <GitBranch className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-2">{module.title}</h4>
                    <p className="text-blue-100">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="bg-blue-900/30 p-6">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Course 2: Introduction to AI</h3>
          <div className="space-y-4">
            {[
              {
                title: "Module 1: AI Fundamentals",
                description: "Understanding core concepts of artificial intelligence, machine learning, and neural networks"
              },
              {
                title: "Module 2: AI Applications",
                description: "Explore real-world applications of AI in various industries, from healthcare to finance"
              },
              {
                title: "Module 3: Future of AI",
                description: "Discover emerging AI technologies, ethics, and the future landscape of artificial intelligence"
              },
              {
                title: "Module 4: Hands-on AI Projects",
                description: "Build practical AI applications using modern tools and frameworks"
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-2">{module.title}</h4>
                    <p className="text-blue-100">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  </Slide>
);

export const platformInfrastructureSlide = (
  <Slide key="platform-infrastructure">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <BrainCircuit className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400">Learning Analytics & Infrastructure</h2>
      </div>
      <div className="space-y-6">
        <Card className="bg-blue-900/30 p-6 mb-8">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Advanced Learning Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <LineChart className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold text-blue-300">Progress Tracking</h4>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• Real-time learning progress visualization</li>
                <li>• Personalized achievement milestones</li>
                <li>• Comprehensive performance analytics</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <BarChart2 className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold text-blue-300">Learning Insights</h4>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• AI-powered learning pattern analysis</li>
                <li>• Adaptive difficulty adjustment</li>
                <li>• Personalized content recommendations</li>
              </ul>
            </motion.div>
          </div>
        </Card>

        <Card className="bg-blue-900/30 p-6">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Technical Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold text-blue-300">Backend Architecture</h4>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• PostgreSQL for reliable data storage</li>
                <li>• Real-time event processing</li>
                <li>• Scalable microservices architecture</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold text-blue-300">Data Security</h4>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li>• End-to-end encryption</li>
                <li>• GDPR-compliant data handling</li>
                <li>• Regular security audits</li>
              </ul>
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  </Slide>
);