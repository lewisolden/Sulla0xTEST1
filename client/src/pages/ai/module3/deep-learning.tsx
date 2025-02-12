import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, Brain, Network, Layers, Cpu } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { DeepLearningQuiz } from "@/components/quizzes/DeepLearningQuiz";

// Neural Network Architecture SVG Component
const NeuralNetworkDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
    </defs>
    {/* Input Layer */}
    {[0, 1, 2, 3].map((i) => (
      <g key={`input-${i}`}>
        <circle cx="100" cy={100 + i * 60} r="20" fill="#93C5FD" />
        <text x="100" y={100 + i * 60} textAnchor="middle" dy=".3em" fill="white">x{i+1}</text>
      </g>
    ))}
    {/* Hidden Layer */}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={`hidden-${i}`}>
        <circle cx="400" cy={80 + i * 60} r="20" fill="#60A5FA" />
        <text x="400" y={80 + i * 60} textAnchor="middle" dy=".3em" fill="white">h{i+1}</text>
      </g>
    ))}
    {/* Output Layer */}
    {[0, 1, 2].map((i) => (
      <g key={`output-${i}`}>
        <circle cx="700" cy={140 + i * 60} r="20" fill="#2563EB" />
        <text x="700" y={140 + i * 60} textAnchor="middle" dy=".3em" fill="white">y{i+1}</text>
      </g>
    ))}
    {/* Connections */}
    <g className="connections" stroke="#4B5563" strokeWidth="1" markerEnd="url(#arrowhead)">
      {/* Add connection lines between layers */}
      {/* These would be generated programmatically in a full implementation */}
    </g>
  </svg>
);

export default function DeepLearning() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);
      
      if (progress > 90) {
        updateProgress(3, 'deep-learning', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="mb-6">
          <Link href="/ai/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
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
                  Deep Learning
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Introduction to Deep Learning
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Deep learning is a subset of machine learning that uses artificial neural networks 
                    with multiple layers (deep neural networks) to progressively extract higher-level 
                    features from raw input. For example, in image processing, lower layers might identify 
                    edges, while higher layers might identify concepts relevant to human understanding.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Neural Network Architecture
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <NeuralNetworkDiagram />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    A neural network consists of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Input Layer: Receives raw data</li>
                    <li>Hidden Layers: Process and transform data</li>
                    <li>Output Layer: Produces final predictions or outputs</li>
                    <li>Connections: Weighted paths between neurons</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Concepts
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Layers className="h-5 w-5 text-blue-600" />
                        Layers and Neurons
                      </h3>
                      <p className="text-gray-600">
                        Each layer contains neurons that process inputs and pass outputs 
                        to the next layer through activation functions.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Network className="h-5 w-5 text-blue-600" />
                        Backpropagation
                      </h3>
                      <p className="text-gray-600">
                        The process of adjusting weights based on the error gradient 
                        to minimize prediction errors.
                      </p>
                    </Card>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Applications
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Computer Vision</h3>
                      <p className="text-gray-700">
                        Image recognition, object detection, and image generation using 
                        convolutional neural networks (CNNs).
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Natural Language Processing</h3>
                      <p className="text-gray-700">
                        Language translation, text generation, and sentiment analysis using 
                        transformers and recurrent neural networks (RNNs).
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Speech Recognition</h3>
                      <p className="text-gray-700">
                        Converting spoken language to text and generating human-like speech 
                        using deep neural networks.
                      </p>
                    </div>
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

              <div className="mt-8">
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full"
                >
                  Take Quiz
                </Button>
              </div>

              {showQuiz && (
                <div className="mt-8">
                  <DeepLearningQuiz />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
