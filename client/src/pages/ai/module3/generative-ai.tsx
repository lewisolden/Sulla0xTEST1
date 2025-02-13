import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation as useLocationWouter } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Sparkles,
  Code,
  Wand2,
  Image,
  MessageSquare,
  Music,
  Video,
  Palette,
  Lightbulb
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { GenerativeAIQuiz } from "@/components/quizzes/GenerativeAIQuiz";

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

// Enhanced GAN Architecture Diagram with Animations
const GANDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
      <linearGradient id="generatorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="discriminatorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>

    {/* Generator Network with Animation */}
    <motion.g
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      transform="translate(100, 150)"
    >
      <rect width="150" height="100" rx="10" fill="url(#generatorGradient)" />
      <text x="75" y="50" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Generator</text>

      {/* Generator Internal Layers with Animation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line x1="30" y1="30" x2="120" y2="30" stroke="white" strokeWidth="2" />
        <line x1="30" y1="50" x2="120" y2="50" stroke="white" strokeWidth="2" />
        <line x1="30" y1="70" x2="120" y2="70" stroke="white" strokeWidth="2" />
      </motion.g>
    </motion.g>

    {/* Discriminator Network with Animation */}
    <motion.g
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      transform="translate(550, 150)"
    >
      <rect width="150" height="100" rx="10" fill="url(#discriminatorGradient)" />
      <text x="75" y="50" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Discriminator</text>

      {/* Discriminator Internal Layers */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line x1="30" y1="30" x2="120" y2="30" stroke="white" strokeWidth="2" />
        <line x1="30" y1="50" x2="120" y2="50" stroke="white" strokeWidth="2" />
        <line x1="30" y1="70" x2="120" y2="70" stroke="white" strokeWidth="2" />
      </motion.g>
    </motion.g>

    {/* Animated Flow Arrows */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      stroke="#4B5563"
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
    >
      <motion.path
        d="M 250,200 H 550"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.path
        d="M 625,150 V 100 H 175 V 150"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </motion.g>

    {/* Animated Labels */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <text x="400" y="180" textAnchor="middle" fill="#4B5563" className="text-sm">Generated Data</text>
      <text x="400" y="90" textAnchor="middle" fill="#4B5563" className="text-sm">Feedback</text>
    </motion.g>
  </svg>
);

// Interactive Example Card Component without hover effect
const ExampleCard = ({ title, description, icon: Icon, examples, delay }: {
  title: string;
  description: string;
  icon: any;
  examples: string[];
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg" />
      <Card className="relative border-blue-200 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="text-gray-600 mt-2">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {examples.map((example, i) => {
                  const links: { [key: string]: string } = {
                    "DALL-E": "https://openai.com/dall-e-3",
                    "Stable Diffusion": "https://stability.ai/stable-diffusion",
                    "Midjourney": "https://www.midjourney.com",
                    "GPT-4": "https://openai.com/gpt-4",
                    "Claude": "https://anthropic.com/claude",
                    "LLaMA": "https://ai.meta.com/llama",
                    "MusicLM": "https://google-research.github.io/seanet/musiclm/examples",
                    "AudioCraft": "https://audiocraft.metademolab.com",
                    "Bark": "https://github.com/suno-ai/bark",
                    "Runway": "https://runwayml.com",
                    "Gen-2": "https://research.runwayml.com/gen2",
                    "ModelScope": "https://modelscope.cn/studios/damo/ModelScopeGPT"
                  };

                  return (
                    <a
                      key={i}
                      href={links[example]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200 flex items-center gap-1"
                    >
                      {example}
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function GenerativeAI() {
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
          sectionId: 'generative-ai',
          completed: true,
          score: 100,
          completedAt: new Date().toISOString(),
          route: '/ai/module3/generative-ai',
          moduleType: 'ai'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleQuizCompletion = () => {
    setLocation("/ai/module3/future-ai");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Link href="/ai/module3/reinforcement-learning">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Reinforcement Learning
            </Button>
          </Link>
          <Link href="/ai/module3/future-ai">
            <Button variant="ghost" className="gap-2">
              Next: Future of AI <ArrowRight className="h-4 w-4" />
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
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Generative AI
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    Introduction to Generative AI
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">
                      Generative AI represents a revolutionary class of artificial intelligence that can
                      create new content, including images, text, music, and code. These systems learn
                      patterns from existing data to generate novel, realistic outputs that maintain the
                      statistical properties of their training data.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding GANs
                  </h2>
                  <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-6 rounded-xl mb-4">
                    <GANDiagram />
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Generative Adversarial Networks (GANs) consist of two competing neural networks:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/80 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Generator Network</h3>
                        <p className="text-gray-600">Creates synthetic data samples by learning from patterns in training data</p>
                      </div>
                      <div className="p-4 bg-white/80 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">Discriminator Network</h3>
                        <p className="text-gray-600">Evaluates the quality of generated samples by comparing them to real data</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                    Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ExampleCard
                      title="Image Generation"
                      description="Creating realistic images and artwork"
                      icon={Image}
                      examples={["DALL-E", "Stable Diffusion", "Midjourney"]}
                      delay={0.2}
                    />
                    <ExampleCard
                      title="Text Generation"
                      description="Producing human-like text and conversations"
                      icon={MessageSquare}
                      examples={["GPT-4", "Claude", "LLaMA"]}
                      delay={0.4}
                    />
                    <ExampleCard
                      title="Audio Synthesis"
                      description="Creating music and voice content"
                      icon={Music}
                      examples={["MusicLM", "AudioCraft", "Bark"]}
                      delay={0.6}
                    />
                    <ExampleCard
                      title="Video Generation"
                      description="Generating dynamic video content"
                      icon={Video}
                      examples={["Runway", "Gen-2", "ModelScope"]}
                      delay={0.8}
                    />
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Advanced Concepts
                  </h2>
                  <div className="grid gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                                Transformers Architecture
                              </h3>
                              <p className="text-gray-600 mt-2">
                                The backbone of modern generative AI, enabling efficient processing of sequential data through self-attention mechanisms.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <Palette className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                                Style Transfer & Control
                              </h3>
                              <p className="text-gray-600 mt-2">
                                Techniques for guiding the generation process and manipulating stylistic attributes of the output.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/ai/module3/future-ai">
                  <Button
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    variant="outline"
                  >
                    Next Topic: Future of AI <ArrowRight className="h-4 w-4" />
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
                  <GenerativeAIQuiz onComplete={handleQuizCompletion} />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}