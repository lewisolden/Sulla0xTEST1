import { useState, useEffect, useRef } from "react";
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
  Network, 
  Layers, 
  Cpu, 
  Zap,
  Binary,
  Code
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { DeepLearningQuiz } from "@/components/quizzes/DeepLearningQuiz";

// Interactive Neural Network Visualization
const InteractiveNeuralNetwork = () => {
  const [activeNeuron, setActiveNeuron] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const neurons = {
    input: Array(4).fill(0),
    hidden: Array(5).fill(0),
    output: Array(3).fill(0)
  };

  const handleNeuronClick = (layer: string, index: number) => {
    setActiveNeuron(index);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  return (
    <svg className="w-full h-64" viewBox="0 0 800 400">
      <defs>
        <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      <g className="connections">
        {neurons.input.map((_, i) => 
          neurons.hidden.map((_, j) => (
            <motion.path
              key={`ih-${i}-${j}`}
              d={`M 100 ${100 + i * 60} Q 250 ${90 + (i+j) * 30} 400 ${80 + j * 60}`}
              stroke={showAnimation && activeNeuron === i ? "#60A5FA" : "#4B5563"}
              strokeWidth={showAnimation && activeNeuron === i ? "2" : "1"}
              fill="none"
              initial={false}
              animate={{
                strokeWidth: showAnimation && activeNeuron === i ? [1, 3, 1] : 1,
                stroke: showAnimation && activeNeuron === i ? ["#60A5FA", "#3B82F6", "#60A5FA"] : "#4B5563"
              }}
              transition={{ duration: 0.5 }}
            />
          ))
        )}
        {neurons.hidden.map((_, i) => 
          neurons.output.map((_, j) => (
            <motion.path
              key={`ho-${i}-${j}`}
              d={`M 400 ${80 + i * 60} Q 550 ${110 + (i+j) * 30} 700 ${140 + j * 60}`}
              stroke={showAnimation && activeNeuron === i ? "#60A5FA" : "#4B5563"}
              strokeWidth={showAnimation && activeNeuron === i ? "2" : "1"}
              fill="none"
            />
          ))
        )}
      </g>

      {/* Neurons */}
      {Object.entries(neurons).map(([layer, count], layerIndex) => {
        const xPos = layerIndex === 0 ? 100 : layerIndex === 1 ? 400 : 700;
        const yStart = layerIndex === 0 ? 100 : layerIndex === 1 ? 80 : 140;

        return count.map((_, i) => (
          <g key={`${layer}-${i}`} onClick={() => handleNeuronClick(layer, i)}>
            <motion.circle
              cx={xPos}
              cy={yStart + i * 60}
              r={20}
              fill="url(#neuronGradient)"
              filter="url(#glow)"
              initial={false}
              animate={{
                r: showAnimation && activeNeuron === i ? [20, 25, 20] : 20,
                filter: showAnimation && activeNeuron === i ? "url(#glow)" : "none"
              }}
              className="cursor-pointer"
            />
            <text
              x={xPos}
              y={yStart + i * 60}
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="12"
            >
              {layer[0].toUpperCase()}{i+1}
            </text>
          </g>
        ));
      })}
    </svg>
  );
};

// Floating Particle Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
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

export default function DeepLearning() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [, setLocation] = useLocationWouter();
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);

      if (progress > 90 && !hasMarkedComplete) {
        updateProgress(3, 'deep-learning', true, 2, Date.now(), undefined, '/ai/module3/deep-learning', 'ai');
        setHasMarkedComplete(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress, hasMarkedComplete]);

  const handleQuizCompletion = () => {
    setLocation("/ai/module3/reinforcement-learning");
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
          <Link href="/ai/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
          <Link href="/ai/module3/reinforcement-learning">
            <Button variant="ghost" className="gap-2">
              Next: Reinforcement Learning <ArrowRight className="h-4 w-4" />
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
                  Deep Learning
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
                    <Network className="h-6 w-6" />
                    Introduction to Deep Learning
                  </h2>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">
                      Deep learning is a subset of machine learning that uses artificial neural networks 
                      with multiple layers (deep neural networks) to progressively extract higher-level 
                      features from raw input. For example, in image processing, lower layers might identify 
                      edges, while higher layers might identify concepts relevant to human understanding.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
                    <Layers className="h-6 w-6" />
                    Neural Network Architecture
                  </h2>
                  <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-6 rounded-xl mb-4">
                    <InteractiveNeuralNetwork />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A neural network consists of:
                  </p>
                  <ul className="grid grid-cols-2 gap-4 mt-4">
                    {[
                      { icon: Layers, title: "Input Layer", desc: "Receives raw data" },
                      { icon: Network, title: "Hidden Layers", desc: "Process and transform data" },
                      { icon: Binary, title: "Output Layer", desc: "Produces final predictions" },
                      { icon: Code, title: "Connections", desc: "Weighted paths between neurons" }
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-blue-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <item.icon className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-blue-800">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
                    <Cpu className="h-6 w-6" />
                    Key Concepts
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border border-blue-100">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Layers className="h-5 w-5 text-blue-600" />
                          Layers and Neurons
                        </h3>
                        <p className="text-gray-600">
                          Each layer contains neurons that process inputs and pass outputs 
                          to the next layer through activation functions.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border border-blue-100">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Network className="h-5 w-5 text-blue-600" />
                          Backpropagation
                        </h3>
                        <p className="text-gray-600">
                          The process of adjusting weights based on the error gradient 
                          to minimize prediction errors.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
                    <Zap className="h-6 w-6" />
                    Applications
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Computer Vision",
                        desc: "Image recognition, object detection, and image generation using convolutional neural networks (CNNs).",
                        gradient: "from-blue-500 to-indigo-500"
                      },
                      {
                        title: "Natural Language Processing",
                        desc: "Language translation, text generation, and sentiment analysis using transformers and recurrent neural networks (RNNs).",
                        gradient: "from-indigo-500 to-purple-500"
                      },
                      {
                        title: "Speech Recognition",
                        desc: "Converting spoken language to text and generating human-like speech using deep neural networks.",
                        gradient: "from-purple-500 to-pink-500"
                      }
                    ].map((app, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-r p-[2px] rounded-xl"
                        style={{
                          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="bg-white rounded-xl p-4">
                          <h3 className="text-lg font-semibold mb-2">{app.title}</h3>
                          <p className="text-gray-700">{app.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Training Process
                  </h2>
                  <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                    <li>
                      <strong>Data Preparation:</strong> Collect and preprocess training data
                    </li>
                    <li>
                      <strong>Forward Pass:</strong> Input data flows through the network
                    </li>
                    <li>
                      <strong>Loss Calculation:</strong> Compare predictions with actual values
                    </li>
                    <li>
                      <strong>Backpropagation:</strong> Calculate gradients and update weights
                    </li>
                    <li>
                      <strong>Iteration:</strong> Repeat process until model converges
                    </li>
                  </ol>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/ai/module3/reinforcement-learning">
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                    variant="outline"
                  >
                    Next Topic: Reinforcement Learning <ArrowRight className="h-4 w-4" />
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
                  <DeepLearningQuiz onComplete={handleQuizCompletion} />
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}