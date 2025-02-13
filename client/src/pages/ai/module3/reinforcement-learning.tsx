import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Target, 
  PlayCircle, 
  Award, 
  Zap,
  ChevronRight,
  Grid,
  GitBranch,
  Bot,
  TreePine
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ReinforcementLearningQuiz } from "@/components/quizzes/ReinforcementLearningQuiz";

// Floating Particle Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Interactive Q-Learning Grid World
const QlearningGrid = () => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const gridSize = 4;
  const goalCell = 15;
  const obstacleCell = 10;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-xl">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <motion.div
            key={index}
            className={`
              aspect-square rounded-lg cursor-pointer relative
              ${index === goalCell ? 'bg-green-500' : 
                index === obstacleCell ? 'bg-red-500' :
                'bg-white hover:bg-blue-100'}
              ${selectedCell === index ? 'ring-2 ring-blue-500' : ''}
              transition-all duration-300
            `}
            onClick={() => setSelectedCell(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {index === goalCell && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                🎯
              </div>
            )}
            {index === obstacleCell && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                ⚠️
              </div>
            )}
            {selectedCell === index && (
              <motion.div
                className="absolute inset-0 bg-blue-500/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">
        Click on cells to see possible actions and rewards
      </p>
    </div>
  );
};

// Enhanced RL Process Diagram with Animations
const RLProcessDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
      <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>

    {/* Agent */}
    <motion.circle
      cx="400"
      cy="200"
      r="50"
      fill="url(#agentGradient)"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <text x="400" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16" fontWeight="bold">
      Agent
    </text>

    {/* Environment */}
    <motion.rect
      x="600"
      y="150"
      width="100"
      height="100"
      rx="10"
      fill="#60A5FA"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <text x="650" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16" fontWeight="bold">
      Environment
    </text>

    {/* State */}
    <motion.rect
      x="100"
      y="150"
      width="100"
      height="100"
      rx="10"
      fill="#2563EB"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
    <text x="150" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16" fontWeight="bold">
      State
    </text>

    {/* Animated Arrows */}
    <g className="connections" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)">
      <motion.path
        d="M 450,180 C 500,180 550,180 590,180"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 600,220 C 550,220 500,220 450,220"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M 200,180 C 250,180 300,180 350,180"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.path
        d="M 350,220 C 300,220 250,220 200,220"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
    </g>

    {/* Labels */}
    <motion.text
      x="520"
      y="170"
      textAnchor="middle"
      fill="#4B5563"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Action
    </motion.text>
    <motion.text
      x="520"
      y="240"
      textAnchor="middle"
      fill="#4B5563"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      Reward
    </motion.text>
    <motion.text
      x="275"
      y="170"
      textAnchor="middle"
      fill="#4B5563"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      State
    </motion.text>
    <motion.text
      x="275"
      y="240"
      textAnchor="middle"
      fill="#4B5563"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      Update
    </motion.text>
  </svg>
);

// Algorithm Card Component
const AlgorithmCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: any; delay: number }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-50 blur group-hover:opacity-75 transition-opacity duration-300" />
    <Card className="relative bg-white dark:bg-gray-800 border-blue-100 group-hover:border-blue-300 transition-all duration-300">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function ReinforcementLearning() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [, setLocation] = useLocation();
  const hasMarkedCompleteRef = useRef(false);
  const progressUpdateTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);

      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }

      if (progress > 90 && !hasMarkedCompleteRef.current) {
        progressUpdateTimeoutRef.current = setTimeout(() => {
          updateProgress(3, 'reinforcement-learning', true, 2, Date.now(), undefined, '/ai/module3/reinforcement-learning', 'ai');
          hasMarkedCompleteRef.current = true;
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }
    };
  }, [updateProgress]);

  const handleQuizCompletion = () => {
    setLocation("/ai/module3/generative-ai");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/ai/module3/deep-learning">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Deep Learning
            </Button>
          </Link>
          <Link href="/ai/module3/generative-ai">
            <Button variant="ghost" className="gap-2">
              Next: Generative AI <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Reinforcement Learning
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Introduction to Reinforcement Learning
                  </h2>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">
                      Reinforcement learning (RL) is a type of machine learning where an agent learns to
                      make decisions by interacting with an environment. Unlike supervised learning,
                      the agent learns through trial and error, receiving rewards or penalties for its actions.
                      This approach mirrors how humans and animals naturally learn through experience.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    The RL Process
                  </h2>
                  <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-6 rounded-xl mb-4">
                    <RLProcessDiagram />
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Q-Learning Example
                  </h2>
                  <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-lg">
                    <QlearningGrid />
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                    RL Algorithms
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <AlgorithmCard
                      title="Q-Learning"
                      description="A value-based approach that learns to make optimal decisions by estimating action values"
                      icon={Grid}
                      delay={0.2}
                    />
                    <AlgorithmCard
                      title="Policy Gradients"
                      description="Directly optimize the policy by following the gradient of expected rewards"
                      icon={GitBranch}
                      delay={0.4}
                    />
                    <AlgorithmCard
                      title="Actor-Critic"
                      description="Combines value-based and policy-based methods for improved learning"
                      icon={Bot}
                      delay={0.6}
                    />
                    <AlgorithmCard
                      title="Deep Q-Networks"
                      description="Integrates deep learning with Q-learning for complex state spaces"
                      icon={TreePine}
                      delay={0.8}
                    />
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Applications
                  </h2>
                  <div className="grid gap-4">
                    {[
                      {
                        title: "Game AI",
                        description: "Mastering complex games through self-play",
                        icon: "🎮",
                        examples: ["Chess", "Go", "Atari Games"]
                      },
                      {
                        title: "Robotics",
                        description: "Learning physical tasks and navigation",
                        icon: "🤖",
                        examples: ["Manipulation", "Navigation", "Assembly"]
                      },
                      {
                        title: "Resource Management",
                        description: "Optimizing system resources and energy",
                        icon: "⚡",
                        examples: ["Data Centers", "Power Grids", "Network Routing"]
                      }
                    ].map((app, i) => (
                      <motion.div
                        key={i}
                        className="relative group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl" />
                        <Card className="relative border border-blue-100 group-hover:border-blue-300 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{app.icon}</div>
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-blue-800 mb-2">{app.title}</h3>
                                <p className="text-gray-600 mb-4">{app.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {app.examples.map((example, j) => (
                                    <span
                                      key={j}
                                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                      {example}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/ai/module3/generative-ai">
                  <Button
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                    variant="outline"
                  >
                    Next Topic: Generative AI <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  Take Quiz
                </Button>
              </div>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <ReinforcementLearningQuiz onComplete={handleQuizCompletion} />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}