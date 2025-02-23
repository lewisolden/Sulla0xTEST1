import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, Route, useRoute } from "wouter";
import { Scale, Network, Code, Shield, Brain, Database, TrendingUp, BookOpen, Binary, Blocks, Cpu, Lock, Layers, GitBranch } from "lucide-react";
import ExercisesPage from "./module3/exercises";
import { useScrollTop } from "@/hooks/useScrollTop";

const EthereumLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <path
      d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
      fill="#343434"
    />
  </svg>
);

const moduleTopics = [
  {
    id: "ethereum-fundamentals",
    title: "3.1 Ethereum Fundamentals",
    path: "/modules/module3/ethereum-fundamentals",
    icon: Scale,
    gradient: "bg-gradient-to-br from-gray-200 to-gray-400",
    description: "Understand the core concepts of Ethereum and its innovative features",
    subsections: [
      "Smart Contracts",
      "The Ethereum Virtual Machine (EVM)",
      "Decentralized Applications (dApps)",
      "Platform Architecture"
    ]
  },
  {
    id: "smart-contracts",
    title: "3.2 Smart Contract Development",
    path: "/modules/module3/smart-contracts",
    icon: Code,
    gradient: "bg-gradient-to-br from-blue-200 to-blue-400",
    description: "Learn to write, deploy and interact with smart contracts",
    subsections: [
      "Smart Contract Basics",
      "Development Environment",
      "Best Practices",
      "Common Patterns"
    ]
  },
  {
    id: "investment-value",
    title: "3.3 Investment and Value",
    path: "/modules/module3/investment-value",
    icon: Network,
    gradient: "bg-gradient-to-br from-gray-300 to-blue-300",
    description: "Explore the economic aspects and value propositions of Ethereum",
    subsections: [
      "Network Effects",
      "Developer Ecosystem",
      "Economic Model",
      "Staking Economics"
    ]
  },
  {
    id: "security-risks",
    title: "3.4 Security and Risk Management",
    path: "/modules/module3/security-risks",
    icon: Shield,
    gradient: "bg-gradient-to-br from-slate-200 to-slate-400",
    description: "Master security practices and risk management in smart contracts",
    subsections: [
      "Smart Contract Security",
      "Technical Vulnerabilities",
      "Economic Attack Vectors",
      "Risk Management Practices"
    ]
  }
];

const learningObjectives = [
  {
    icon: Binary,
    text: "Understand Ethereum's role as a programmable blockchain platform"
  },
  {
    icon: Blocks,
    text: "Master the fundamentals of smart contracts and their applications"
  },
  {
    icon: Cpu,
    text: "Explore the Ethereum Virtual Machine and its capabilities"
  },
  {
    icon: Layers,
    text: "Learn about decentralized applications (dApps) and their ecosystem"
  },
  {
    icon: TrendingUp,
    text: "Analyze Ethereum's value proposition and investment considerations"
  },
  {
    icon: Lock,
    text: "Understand security best practices and risk management"
  }
];

export default function Module3() {
  useScrollTop();
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 3);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;
  const [isExercisesRoute] = useRoute("/modules/module3/exercises");

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  if (isExercisesRoute) {
    return <ExercisesPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-gray-400 to-blue-400 p-8 text-white">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <EthereumLogo />
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Module 3: Ethereum and Smart Contracts
                  </h1>
                  <p className="text-gray-50">
                    Explore the world of programmable blockchain and decentralized applications
                  </p>
                </div>
              </motion.div>
            </div>

            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Module Progress</p>
                  <p className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</p>
                </div>
                <Progress value={progressPercentage} className="bg-gray-100" />
              </div>

              <div className="flex justify-center mb-8">
                <Link href="/modules/module3/ethereum-fundamentals">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start First Topic
                  </Button>
                </Link>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Topics</TabsTrigger>
                  <TabsTrigger value="exercises">Exercises</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="prose max-w-none">
                      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Course Overview
                      </h2>

                      <div className="space-y-4 text-gray-700">
                        <p>
                          Welcome to Module 3, where we explore Ethereum and smart contracts. Unlike Bitcoin's primary focus on monetary transactions, Ethereum represents a fundamental shift in blockchain technology, serving as a global, decentralized computing platform capable of running applications and handling complex financial interactions.
                        </p>

                        <p>
                          In this module, you'll learn about Ethereum's key innovation: programmability. While Bitcoin excels at being digital money, Ethereum acts as a complete computational platform supporting decentralized applications (dApps), smart contracts, and various digital assets.
                        </p>

                        <p>
                          We'll dive deep into smart contracts, the building blocks of Ethereum applications, and explore how they enable automated, trustless interactions. You'll understand the Ethereum Virtual Machine (EVM), the engine that powers all Ethereum operations, and learn about the growing ecosystem of decentralized applications.
                        </p>

                        <p>
                          The module also covers investment considerations, exploring Ethereum's value proposition, network effects, and economic model. Finally, we'll address critical security considerations and risk management practices essential for anyone working with Ethereum and smart contracts.
                        </p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8"
                      >
                        <h2 className="text-2xl font-bold mb-6 text-white">Module Learning Objectives</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          {learningObjectives.map((objective, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 + index * 0.1 }}
                              className="flex items-start gap-4 bg-slate-700/50 rounded-lg p-4"
                            >
                              <div className="bg-blue-500/20 p-2 rounded-lg">
                                <objective.icon className="h-6 w-6 text-blue-400" />
                              </div>
                              <p className="text-gray-200">{objective.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <div className="mt-8 flex justify-center">
                        <Link href="/modules/module3/ethereum-fundamentals">
                          <Button
                            size="lg"
                            className="bg-black hover:bg-gray-900 text-white"
                          >
                            Start First Topic
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="content">
                  <div className="grid md:grid-cols-2 gap-6">
                    {topicsWithProgress.map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className={`${topic.gradient} p-3 rounded-xl`}>
                                <topic.icon className="h-6 w-6 text-gray-700" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                  {topic.title}
                                </h3>
                                {topic.completed && (
                                  <span className="text-sm text-green-600">Completed</span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{topic.description}</p>
                            <div className="space-y-2 mb-6">
                              {topic.subsections.map((subsection, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                  <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                                  {subsection}
                                </div>
                              ))}
                            </div>
                            <Link href={topic.path} className="block mt-auto">
                              <Button
                                className="w-full bg-black hover:bg-gray-900 text-white"
                              >
                                {topic.completed ? "Review Topic" : "Start Topic"}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="exercises">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                          Practical Exercises
                        </h2>

                        <div className="space-y-4 text-gray-700">
                          <p>
                            Put your Ethereum and Smart Contract knowledge into practice with our hands-on exercises. These practical sessions will help you:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Work with smart contracts in a safe environment</li>
                            <li>Understand common development patterns</li>
                            <li>Practice security best practices</li>
                            <li>Build real-world DApps</li>
                          </ul>
                        </div>

                        <div className="mt-8 flex justify-center">
                          <Link href="/modules/module3/exercises">
                            <Button
                              size="lg"
                              className="bg-black hover:bg-gray-900 text-white"
                            >
                              Start Exercises
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                          Module 3 Final Quiz
                        </h2>
                        <p className="text-gray-600 mb-6">
                          {progressPercentage < 100
                            ? "Complete all topics to unlock the final quiz."
                            : "You've completed all topics! Take the final quiz to test your knowledge."}
                        </p>
                        <Link href="/modules/module3/quiz">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-gray-400 to-blue-400 hover:from-gray-500 hover:to-blue-500 text-white"
                            disabled={progressPercentage < 100}
                          >
                            {progressPercentage < 100
                              ? "Complete all topics to unlock quiz"
                              : "Take Module Quiz"
                            }
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}