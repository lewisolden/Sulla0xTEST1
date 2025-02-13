import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation as useLocationWouter } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { 
  ArrowLeft, 
  Brain, 
  Lightbulb, 
  Cpu, 
  Shield, 
  Network, 
  Globe,
  Bot,
  Binary,
  ArrowRight,
  Zap,
  ChevronRight,
  Code2,
  BarChart
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { FutureAIQuiz } from "@/components/quizzes/FutureAIQuiz";

// Enhanced Timeline Visualization Component
const AITimelineVisualization = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <div className="relative h-80 w-full overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Timeline Base with Glow Effect */}
        <path 
          d="M 50,200 H 750" 
          stroke="url(#timelineGradient)" 
          strokeWidth="4"
          filter="url(#glow)"
          fill="none"
        />

        {/* Timeline Points with Enhanced Visuals */}
        {[
          { x: 100, y: 200, label: "Present", sublabel: "Narrow AI", description: "Specialized AI systems" },
          { x: 300, y: 200, label: "Near Future", sublabel: "Advanced AI", description: "More capable systems" },
          { x: 500, y: 200, label: "Mid Future", sublabel: "AGI", description: "Human-level AI" },
          { x: 700, y: 200, label: "Far Future", sublabel: "Superintelligence", description: "Beyond human capabilities" }
        ].map((point, i) => (
          <g 
            key={i}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: 'pointer' }}
          >
            <motion.circle 
              cx={point.x} 
              cy={point.y} 
              r={hoveredPoint === i ? "12" : "8"} 
              fill={hoveredPoint === i ? "#2563EB" : "#60A5FA"}
              initial={false}
              animate={{
                r: hoveredPoint === i ? 12 : 8,
                filter: hoveredPoint === i ? "brightness(1.2)" : "none"
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.text 
              x={point.x} 
              y={point.y - 25} 
              textAnchor="middle" 
              fill="#1E40AF"
              fontSize="14"
              fontWeight="bold"
              initial={false}
              animate={{
                y: hoveredPoint === i ? point.y - 30 : point.y - 25,
                fontSize: hoveredPoint === i ? "16" : "14"
              }}
            >
              {point.label}
            </motion.text>

            <motion.text 
              x={point.x} 
              y={point.y + 30} 
              textAnchor="middle" 
              fill="#4B5563"
              fontSize="12"
              initial={false}
              animate={{
                opacity: hoveredPoint === i ? 1 : 0.7
              }}
            >
              {point.sublabel}
            </motion.text>

            {hoveredPoint === i && (
              <motion.text
                x={point.x}
                y={point.y + 50}
                textAnchor="middle"
                fill="#6B7280"
                fontSize="11"
                initial={{ opacity: 0, y: point.y + 45 }}
                animate={{ opacity: 1, y: point.y + 50 }}
              >
                {point.description}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Enhanced AGI Architecture Diagram
const AGIArchitectureDiagram = () => {
  const [hoveredSystem, setHoveredSystem] = useState<number | null>(null);

  return (
    <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-4">
      <svg className="w-full h-full" viewBox="0 0 800 400">
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Core AGI System with Glow Effect */}
        <motion.circle 
          cx="400" 
          cy="200" 
          r="60" 
          fill="url(#coreGradient)"
          filter="url(#neonGlow)"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <text x="400" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          AGI Core
        </text>

        {/* Subsystems with Enhanced Interactivity */}
        {[
          { angle: 0, label: "Learning", icon: "🧠" },
          { angle: 60, label: "Reasoning", icon: "💭" },
          { angle: 120, label: "Memory", icon: "💾" },
          { angle: 180, label: "Planning", icon: "📋" },
          { angle: 240, label: "Perception", icon: "👁" },
          { angle: 300, label: "Action", icon: "⚡" }
        ].map((system, i) => {
          const angle = system.angle * Math.PI / 180;
          const x = 400 + Math.cos(angle) * 150;
          const y = 200 + Math.sin(angle) * 150;

          return (
            <g 
              key={i}
              onMouseEnter={() => setHoveredSystem(i)}
              onMouseLeave={() => setHoveredSystem(null)}
              style={{ cursor: 'pointer' }}
            >
              <motion.circle 
                cx={x} 
                cy={y} 
                r="40"
                fill={hoveredSystem === i ? "#3B82F6" : "#60A5FA"}
                initial={false}
                animate={{
                  r: hoveredSystem === i ? 45 : 40,
                  filter: hoveredSystem === i ? "brightness(1.2)" : "none"
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.text 
                x={x} 
                y={y - 10} 
                textAnchor="middle" 
                fill="white"
                fontSize={hoveredSystem === i ? "16" : "14"}
                initial={false}
                animate={{
                  y: hoveredSystem === i ? y - 15 : y - 10
                }}
              >
                {system.icon}
              </motion.text>

              <motion.text 
                x={x} 
                y={y + 10} 
                textAnchor="middle" 
                fill="white"
                fontSize={hoveredSystem === i ? "14" : "12"}
                initial={false}
                animate={{
                  opacity: hoveredSystem === i ? 1 : 0.8
                }}
              >
                {system.label}
              </motion.text>

              <motion.line 
                x1={400 + Math.cos(angle) * 60}
                y1={200 + Math.sin(angle) * 60}
                x2={x - Math.cos(angle) * 40}
                y2={y - Math.sin(angle) * 40}
                stroke={hoveredSystem === i ? "#60A5FA" : "#4B5563"}
                strokeWidth={hoveredSystem === i ? "3" : "2"}
                initial={false}
                animate={{
                  strokeWidth: hoveredSystem === i ? 3 : 2
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default function FutureAI() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [, setLocation] = useLocationWouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);

      if (progress > 90) {
        updateProgress({
          moduleId: 'ai-module3',
          sectionId: 'future-ai',
          completed: true,
          score: 100,
          totalSections: 5,
          currentSection: 4,
          nextSection: 'quiz'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleQuizCompletion = () => {
    setLocation("/ai/module3/quiz");
  };

  const FutureCard = ({ icon: Icon, title, description, gradient }: any) => (
    <motion.div
      className={`rounded-xl shadow-lg p-6 relative overflow-hidden ${gradient}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/90 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Button
                variant="ghost"
                onClick={() => setShowQuiz(false)}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
              </Button>
              <FutureAIQuiz onComplete={handleQuizCompletion} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${readingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/ai/module3/generative-ai">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Generative AI
            </Button>
          </Link>
          <Link href="/ai/module3/quiz">
            <Button variant="ghost" className="gap-2">
              Take Module Quiz <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-blue-100">
            <CardContent className="p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-8 mb-8"
              >
                <div className="flex items-center gap-4">
                  <Brain className="h-12 w-12 text-white" />
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      The Future of AI
                    </h1>
                    <p className="text-blue-100">
                      Exploring the next frontier of artificial intelligence and its potential impact
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="prose max-w-none">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Zap className="h-6 w-6" />
                    AI Evolution Timeline
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <AITimelineVisualization />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    The journey of AI technology follows an ambitious path from current specialized 
                    systems towards increasingly sophisticated and capable artificial intelligence,
                    potentially leading to artificial general intelligence (AGI) and beyond.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Network className="h-6 w-6" />
                    AGI Architecture
                  </h2>
                  <AGIArchitectureDiagram />
                  <p className="text-gray-700 mt-4 leading-relaxed">
                    AGI represents a hypothetical future AI system capable of matching or exceeding 
                    human-level intelligence across virtually any domain, integrating multiple 
                    sophisticated subsystems working in harmony.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Cpu className="h-6 w-6" />
                    Future Technologies
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FutureCard
                      icon={Bot}
                      title="Quantum AI"
                      description="Integration of quantum computing with AI algorithms, enabling unprecedented computational capabilities and problem-solving potential."
                      gradient="bg-gradient-to-br from-purple-600 to-pink-600"
                    />
                    <FutureCard
                      icon={Binary}
                      title="Neuromorphic Computing"
                      description="Brain-inspired computing architectures that enable more efficient and natural AI processing, mimicking biological neural networks."
                      gradient="bg-gradient-to-br from-blue-600 to-cyan-600"
                    />
                    <FutureCard
                      icon={Code2}
                      title="Self-Improving AI"
                      description="Systems capable of iterative self-enhancement, potentially leading to recursive improvement cycles and rapid capability growth."
                      gradient="bg-gradient-to-br from-emerald-600 to-teal-600"
                    />
                    <FutureCard
                      icon={BarChart}
                      title="Cognitive Architecture"
                      description="Advanced frameworks integrating perception, learning, reasoning, and decision-making in more human-like ways."
                      gradient="bg-gradient-to-br from-orange-600 to-red-600"
                    />
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Ethical Considerations
                  </h2>
                  <div className="space-y-4">
                    <motion.div
                      className="bg-gradient-to-r from-slate-900 to-blue-900 p-6 rounded-xl text-white"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        AI Safety and Alignment
                      </h3>
                      <p className="text-blue-100">
                        Ensuring advanced AI systems remain aligned with human values and operate
                        within ethical boundaries is crucial for beneficial AI development.
                      </p>
                    </motion.div>
                    <motion.div
                      className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-xl text-white"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        Societal Impact
                      </h3>
                      <p className="text-blue-100">
                        Managing the economic and social implications of widespread AI adoption
                        requires careful consideration and proactive planning.
                      </p>
                    </motion.div>
                  </div>
                </motion.section>
              </div>

              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module3/quiz">
                  <Button 
                    variant="outline"
                    className="w-full gap-2"
                  >
                    Take Module Quiz <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}