import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation as useLocationWouter } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, ArrowRight, Brain, Sparkles, Code, Wand2, Image, MessageSquare } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { GenerativeAIQuiz } from "@/components/quizzes/GenerativeAIQuiz";

// GAN Architecture Diagram Component
const GANDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
    </defs>
    
    {/* Generator Network */}
    <g transform="translate(100, 150)">
      <rect width="150" height="100" rx="10" fill="#93C5FD" />
      <text x="75" y="50" textAnchor="middle" fill="white" fontSize="16">Generator</text>
      
      {/* Generator Internal Layers */}
      <line x1="30" y1="30" x2="120" y2="30" stroke="white" strokeWidth="2" />
      <line x1="30" y1="50" x2="120" y2="50" stroke="white" strokeWidth="2" />
      <line x1="30" y1="70" x2="120" y2="70" stroke="white" strokeWidth="2" />
    </g>
    
    {/* Discriminator Network */}
    <g transform="translate(550, 150)">
      <rect width="150" height="100" rx="10" fill="#60A5FA" />
      <text x="75" y="50" textAnchor="middle" fill="white" fontSize="16">Discriminator</text>
      
      {/* Discriminator Internal Layers */}
      <line x1="30" y1="30" x2="120" y2="30" stroke="white" strokeWidth="2" />
      <line x1="30" y1="50" x2="120" y2="50" stroke="white" strokeWidth="2" />
      <line x1="30" y1="70" x2="120" y2="70" stroke="white" strokeWidth="2" />
    </g>
    
    {/* Flow Arrows */}
    <g stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)">
      <path d="M 250,200 H 550" fill="none" />
      <path d="M 625,150 V 100 H 175 V 150" fill="none" />
    </g>
    
    {/* Labels */}
    <text x="400" y="180" textAnchor="middle" fill="#4B5563">Generated Data</text>
    <text x="400" y="90" textAnchor="middle" fill="#4B5563">Feedback</text>
  </svg>
);

// Latent Space Visualization Component
const LatentSpaceVisualization = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <radialGradient id="latentGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Latent Space Background */}
    <circle cx="400" cy="200" r="150" fill="url(#latentGradient)" />
    
    {/* Data Points */}
    {[...Array(20)].map((_, i) => {
      const angle = (i * Math.PI * 2) / 20;
      const radius = 100 + Math.random() * 50;
      const x = 400 + Math.cos(angle) * radius;
      const y = 200 + Math.sin(angle) * radius;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="#2563EB"
          opacity="0.6"
        />
      );
    })}
    
    {/* Interpolation Lines */}
    <g stroke="#4B5563" strokeWidth="1" strokeDasharray="4">
      <path d="M 350,150 L 450,250" fill="none" />
      <path d="M 300,200 L 500,200" fill="none" />
      <path d="M 450,150 L 350,250" fill="none" />
    </g>
  </svg>
);

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
        updateProgress(3, 'generative-ai', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleQuizCompletion = () => {
    setLocation("/ai/module3/future-ai");
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Generative AI
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Introduction to Generative AI
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Generative AI represents a revolutionary class of artificial intelligence that can 
                    create new content, including images, text, music, and code. These systems learn 
                    patterns from existing data to generate novel, realistic outputs that maintain the 
                    statistical properties of their training data.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding GANs
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <GANDiagram />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Generative Adversarial Networks (GANs) consist of two competing neural networks:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Generator: Creates synthetic data samples</li>
                    <li>Discriminator: Tries to distinguish real from fake samples</li>
                    <li>Through competition, both networks improve over time</li>
                    <li>Results in high-quality synthetic data generation</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Latent Space and Data Generation
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <LatentSpaceVisualization />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    The latent space is a compressed representation where similar features are 
                    mapped close together. This enables:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Smooth interpolation between different outputs</li>
                    <li>Meaningful manipulation of generated content</li>
                    <li>Discovery of underlying data patterns</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Image className="h-5 w-5 text-blue-600" />
                        Image Generation
                      </h3>
                      <p className="text-gray-600">
                        Creating realistic images, art, and photo editing with models 
                        like DALL-E and Stable Diffusion.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Text Generation
                      </h3>
                      <p className="text-gray-600">
                        Producing human-like text, translations, and conversations 
                        using large language models.
                      </p>
                    </Card>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Advanced Topics
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-600" />
                        Transformers
                      </h3>
                      <p className="text-gray-600">
                        Advanced neural network architecture that powers many modern 
                        generative AI systems through attention mechanisms.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-blue-600" />
                        Controllable Generation
                      </h3>
                      <p className="text-gray-600">
                        Techniques for guiding the generation process to produce 
                        desired outputs with specific attributes.
                      </p>
                    </Card>
                  </div>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/ai/module3/future-ai">
                  <Button 
                    className="w-full gap-2"
                    variant="outline"
                  >
                    Next Topic: Future of AI <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full"
                >
                  Take Quiz
                </Button>
              </div>

              {showQuiz && (
                <div className="mt-8">
                  <GenerativeAIQuiz onComplete={handleQuizCompletion} />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
