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
  Binary
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { FutureAIQuiz } from "@/components/quizzes/FutureAIQuiz";

// AI Timeline Visualization Component
const AITimelineVisualization = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    
    {/* Timeline Base */}
    <path 
      d="M 50,200 H 750" 
      stroke="url(#timelineGradient)" 
      strokeWidth="4"
      fill="none"
    />
    
    {/* Timeline Points */}
    {[
      { x: 100, y: 200, label: "Present", sublabel: "Narrow AI" },
      { x: 300, y: 200, label: "Near Future", sublabel: "Advanced AI" },
      { x: 500, y: 200, label: "Mid Future", sublabel: "AGI" },
      { x: 700, y: 200, label: "Far Future", sublabel: "Superintelligence" }
    ].map((point, i) => (
      <g key={i}>
        <circle 
          cx={point.x} 
          cy={point.y} 
          r="8" 
          fill="#2563EB"
        />
        <text 
          x={point.x} 
          y={point.y - 20} 
          textAnchor="middle" 
          fill="#1E40AF"
          fontSize="14"
        >
          {point.label}
        </text>
        <text 
          x={point.x} 
          y={point.y + 30} 
          textAnchor="middle" 
          fill="#4B5563"
          fontSize="12"
        >
          {point.sublabel}
        </text>
      </g>
    ))}
  </svg>
);

// AGI Architecture Diagram
const AGIArchitectureDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
    </defs>
    
    {/* Core AGI System */}
    <circle cx="400" cy="200" r="60" fill="#93C5FD" />
    <text x="400" y="200" textAnchor="middle" fill="white" fontSize="16">AGI Core</text>
    
    {/* Subsystems */}
    {[
      { angle: 0, label: "Learning" },
      { angle: 60, label: "Reasoning" },
      { angle: 120, label: "Memory" },
      { angle: 180, label: "Planning" },
      { angle: 240, label: "Perception" },
      { angle: 300, label: "Action" }
    ].map((system, i) => {
      const angle = system.angle * Math.PI / 180;
      const x = 400 + Math.cos(angle) * 150;
      const y = 200 + Math.sin(angle) * 150;
      
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="40" fill="#60A5FA" />
          <text x={x} y={y} textAnchor="middle" fill="white" fontSize="14">
            {system.label}
          </text>
          <line 
            x1={400 + Math.cos(angle) * 60}
            y1={200 + Math.sin(angle) * 60}
            x2={x - Math.cos(angle) * 40}
            y2={y - Math.sin(angle) * 40}
            stroke="#4B5563"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </g>
      );
    })}
  </svg>
);

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
        updateProgress(3, 'future-ai', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleQuizCompletion = () => {
    // This is the last page in the module
    setLocation("/ai/module3");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/ai/module3/generative-ai">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Generative AI
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  The Future of AI
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Evolution of Artificial Intelligence
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <AITimelineVisualization />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    The progression of AI technology follows a trajectory from current narrow AI 
                    systems to potential future artificial general intelligence (AGI) and beyond. 
                    This evolution encompasses increasingly sophisticated capabilities in learning, 
                    reasoning, and autonomous decision-making.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Artificial General Intelligence
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <AGIArchitectureDiagram />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    AGI represents a hypothetical future AI system capable of matching or 
                    exceeding human-level intelligence across virtually any domain. Key 
                    components include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Advanced learning and adaptation capabilities</li>
                    <li>Sophisticated reasoning and problem-solving</li>
                    <li>Complex memory systems and knowledge integration</li>
                    <li>Autonomous planning and decision-making</li>
                    <li>Multi-modal perception and understanding</li>
                    <li>Flexible and adaptable action generation</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Future Developments
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-blue-600" />
                        Quantum AI
                      </h3>
                      <p className="text-gray-600">
                        Integration of quantum computing with AI algorithms for 
                        unprecedented computational capabilities.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        Neuromorphic Computing
                      </h3>
                      <p className="text-gray-600">
                        Brain-inspired computing architectures that enable more 
                        efficient and natural AI processing.
                      </p>
                    </Card>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Ethical Considerations
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        AI Safety
                      </h3>
                      <p className="text-gray-700">
                        Ensuring advanced AI systems remain aligned with human values 
                        and operate within ethical boundaries.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Societal Impact
                      </h3>
                      <p className="text-gray-700">
                        Managing the economic and social implications of widespread 
                        AI adoption and automation.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Preparing for the Future
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                        Research Priorities
                      </h3>
                      <p className="text-gray-600">
                        Key areas of focus including AI safety, interpretability, 
                        and robust learning systems.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Binary className="h-5 w-5 text-blue-600" />
                        Technical Challenges
                      </h3>
                      <p className="text-gray-600">
                        Addressing scalability, reliability, and integration of 
                        advanced AI systems.
                      </p>
                    </Card>
                  </div>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full"
                >
                  Take Quiz
                </Button>
              </div>

              {showQuiz && (
                <div className="mt-8">
                  <FutureAIQuiz onComplete={handleQuizCompletion} />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}