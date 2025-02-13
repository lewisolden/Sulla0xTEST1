import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, ArrowRight, Brain, Target, PlayCircle, Award, Zap } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ReinforcementLearningQuiz } from "@/components/quizzes/ReinforcementLearningQuiz";

// Interactive RL Process Diagram
const RLProcessDiagram = () => (
  <svg className="w-full h-64" viewBox="0 0 800 400">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
      </marker>
    </defs>
    {/* Agent */}
    <circle cx="400" cy="200" r="50" fill="#93C5FD" />
    <text x="400" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16">Agent</text>

    {/* Environment */}
    <rect x="600" y="150" width="100" height="100" rx="10" fill="#60A5FA" />
    <text x="650" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16">Environment</text>

    {/* State */}
    <rect x="100" y="150" width="100" height="100" rx="10" fill="#2563EB" />
    <text x="150" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="16">State</text>

    {/* Arrows */}
    <g className="connections" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)">
      <path d="M 450,180 C 500,180 550,180 590,180" fill="none" />
      <path d="M 600,220 C 550,220 500,220 450,220" fill="none" />
      <path d="M 200,180 C 250,180 300,180 350,180" fill="none" />
      <path d="M 350,220 C 300,220 250,220 200,220" fill="none" />
    </g>

    {/* Labels */}
    <text x="520" y="170" textAnchor="middle" fill="#4B5563">Action</text>
    <text x="520" y="240" textAnchor="middle" fill="#4B5563">Reward</text>
    <text x="275" y="170" textAnchor="middle" fill="#4B5563">State</text>
    <text x="275" y="240" textAnchor="middle" fill="#4B5563">Update</text>
  </svg>
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

      // Clear any existing timeout
      if (progressUpdateTimeoutRef.current) {
        clearTimeout(progressUpdateTimeoutRef.current);
      }

      // Only update progress when we reach 90% and haven't marked it complete yet
      if (progress > 90 && !hasMarkedCompleteRef.current) {
        progressUpdateTimeoutRef.current = setTimeout(() => {
          updateProgress(3, 'reinforcement-learning', true, 2, Date.now(), undefined, '/ai/module3/reinforcement-learning', 'ai');
          hasMarkedCompleteRef.current = true;
        }, 1000); // Debounce for 1 second
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
    <div className="container mx-auto px-4 py-8">
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Reinforcement Learning
                </h1>
              </div>

              <div className="prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Introduction to Reinforcement Learning
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Reinforcement learning (RL) is a type of machine learning where an agent learns to
                    make decisions by interacting with an environment. Unlike supervised learning,
                    the agent learns through trial and error, receiving rewards or penalties for its actions.
                    This approach mirrors how humans and animals naturally learn through experience.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    The RL Process
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg mb-4">
                    <RLProcessDiagram />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    The reinforcement learning process involves:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Agent: The decision-maker that interacts with the environment</li>
                    <li>Environment: The world the agent operates in</li>
                    <li>State: The current situation of the agent</li>
                    <li>Action: The choices the agent can make</li>
                    <li>Reward: Feedback signal indicating the action's quality</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Concepts
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Policy Learning
                      </h3>
                      <p className="text-gray-600">
                        The strategy that defines how an agent selects actions in different states
                        to maximize expected rewards.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-blue-600" />
                        Value Functions
                      </h3>
                      <p className="text-gray-600">
                        Estimates of future rewards that help the agent evaluate the desirability
                        of states and actions.
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
                      <h3 className="text-lg font-semibold mb-2">Game Playing</h3>
                      <p className="text-gray-700">
                        Training AI agents to master complex games like chess, Go, and video games
                        through self-play and exploration.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Robotics</h3>
                      <p className="text-gray-700">
                        Teaching robots to perform tasks like manipulation, navigation, and
                        assembly through trial and error.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Resource Management</h3>
                      <p className="text-gray-700">
                        Optimizing system resources, energy consumption, and network routing
                        through learned policies.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Advanced Topics
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        Deep RL
                      </h3>
                      <p className="text-gray-600">
                        Combining deep learning with reinforcement learning to handle complex
                        state spaces and learn sophisticated policies.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        Multi-Agent RL
                      </h3>
                      <p className="text-gray-600">
                        Systems where multiple agents learn simultaneously, either competing
                        or cooperating to achieve their goals.
                      </p>
                    </Card>
                  </div>
                </section>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/ai/module3/generative-ai">
                  <Button
                    className="w-full gap-2"
                    variant="outline"
                  >
                    Next Topic: Generative AI <ArrowRight className="h-4 w-4" />
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
                  <ReinforcementLearningQuiz onComplete={handleQuizCompletion} />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}