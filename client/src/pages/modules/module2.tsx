import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Database, Network, Code, FileText, ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight, TrendingUp, LockKeyhole } from "lucide-react";
import ModuleProgress from "@/components/modules/module-progress";
import { useScrollTop } from "@/hooks/useScrollTop";
import { motion } from "framer-motion";

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

const moduleTopics = [
  {
    id: "bitcoin-fundamentals",
    title: "2.1 Bitcoin Fundamentals",
    path: "/modules/module2/bitcoin-fundamentals",
    icon: Database,
    description: "Learn the core concepts and technology behind Bitcoin",
    subsections: [
      "The Birth of Bitcoin",
      "Historical Context and Significance", 
      "How Bitcoin Works",
      "Key Milestones"
    ],
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: "bitcoin-investment",
    title: "2.2 Bitcoin as an Investment",
    path: "/modules/module2/bitcoin-investment", 
    icon: Network,
    description: "Understand Bitcoin's value proposition as an investment asset.",
    subsections: [
      "Understanding Bitcoin's Value",
      "Store of Value Properties",
      "Bitcoin ETFs",
      "Investment Strategies"
    ],
    gradient: "from-red-400 to-pink-500"
  },
  {
    id: "security-risk",
    title: "2.3 Security and Risk Management",
    path: "/modules/module2/security-risk",
    icon: Code,
    description: "Learn essential security practices and risk mitigation strategies for Bitcoin.",
    subsections: [
      "Essential Security Practices",
      "Risk Management Strategies",
      "Common Mistakes to Avoid",
      "Best Practices"
    ],
    gradient: "from-pink-400 to-purple-500"
  },
  {
    id: "practical-exercises",
    title: "2.4 Practical Exercises",
    path: "/modules/module2/exercises",
    icon: FileText,
    description: "Apply your knowledge with practical exercises and real-world scenarios.",
    subsections: [
      "Beginner Exercises",
      "Advanced Exercises",
      "Real-world Scenarios",
      "Practice Quiz"
    ],
    gradient: "from-purple-400 to-indigo-500"
  }
];

export default function Module2() {
  useScrollTop();
  const { progress = [] } = useProgress();
  const moduleProgress = (progress || []).filter(p => p?.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p?.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  // Check if quiz is completed
  const isQuizCompleted = moduleProgress.some(p => p?.sectionId === "module2-quiz" && p?.completed);
  // Check if all topics are completed
  const allTopicsCompleted = moduleTopics.every(topic => 
    moduleProgress.some(p => p?.sectionId === topic.id && p?.completed)
  );
  // Module is complete when all topics and quiz are done
  const isModuleComplete = allTopicsCompleted && isQuizCompleted;

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p?.sectionId === topic.id && p?.completed)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-none overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8">
                <div className="flex items-center gap-6">
                  <BitcoinLogo />
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      Module 2: Bitcoin Deep Dive
                    </h1>
                    <p className="text-orange-100 text-lg">
                      Master the fundamentals of Bitcoin and blockchain technology
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <ModuleProgress moduleId={2} totalSections={moduleTopics.length} />
                </div>
              </div>

              <CardContent className="p-8">
                {/* Start Learning Button */}
                <div className="flex justify-center mb-12">
                  <Link href="/modules/module2/bitcoin-fundamentals">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Learning
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <Tabs defaultValue="overview" className="mt-8">
                  <TabsList className="bg-orange-100 p-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                    <TabsTrigger value="content" className="data-[state=active]:bg-white">Topics</TabsTrigger>
                    <TabsTrigger value="quiz" className="data-[state=active]:bg-white">Quiz</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="prose max-w-none">
                          <h2 className="text-2xl font-semibold text-orange-800 mb-4">Welcome to Module 2</h2>
                          <p className="text-gray-700 mb-6">
                            Welcome to Module 2 of our cryptocurrency education journey. This module focuses on 
                            Bitcoin - the first and most influential cryptocurrency. We'll explore its history, 
                            how it works, and its role as a revolutionary form of digital money.
                          </p>
                          <p className="text-gray-700 mb-4">
                            Before diving into Bitcoin's technical aspects, let's address some common concerns:
                          </p>
                          <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
                            <li><strong>Do I need to buy a whole Bitcoin?</strong> No! Bitcoin is divisible into 100 million units called "satoshis" or "sats." You can start with as little as $10.</li>
                            <li><strong>Is it too technical for me?</strong> While Bitcoin uses complex technology, using it is similar to mobile banking. Start with the basics, and your understanding will grow naturally.</li>
                            <li><strong>What if I make a mistake?</strong> Start with small amounts while learning. Use test transactions and practice with minimal stakes to build confidence.</li>
                          </ul>

                          <h3 className="text-xl font-semibold text-orange-800 mb-6 flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-orange-500" />
                            Learning Objectives
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {[
                              {
                                title: "Blockchain Fundamentals",
                                items: ["Bitcoin's architecture", "Transaction mechanisms", "Mining process"],
                                icon: Database
                              },
                              {
                                title: "Investment Knowledge",
                                items: ["Market analysis", "Risk management", "Portfolio strategy"],
                                icon: TrendingUp
                              },
                              {
                                title: "Security Essentials",
                                items: ["Wallet security", "Best practices", "Threat prevention"],
                                icon: LockKeyhole
                              },
                              {
                                title: "Practical Application",
                                items: ["Real-world usage", "Network participation", "Future developments"],
                                icon: Code
                              }
                            ].map((objective, index) => (
                              <div key={index} className="bg-orange-50/50 p-6 rounded-lg border border-orange-100/50">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-orange-100 rounded-lg">
                                    <objective.icon className="h-5 w-5 text-orange-600" />
                                  </div>
                                  <h4 className="font-semibold text-orange-800">{objective.title}</h4>
                                </div>
                                <ul className="space-y-2 pl-4">
                                  {objective.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                                      <div className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Start Learning Button at bottom of overview */}
                          <div className="flex justify-center">
                            <Link href="/modules/module2/bitcoin-fundamentals">
                              <Button 
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                              >
                                Start Learning
                                <ChevronRight className="ml-2 h-5 w-5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="content" className="mt-6">
                    <div className="grid gap-6">
                      {topicsWithProgress.map((topic, index) => (
                        <motion.div
                          key={topic.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Link href={topic.path}>
                            <Card className="hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="p-2 bg-orange-100 rounded-lg">
                                        <topic.icon className="h-5 w-5 text-orange-600" />
                                      </div>
                                      <h3 className="text-xl font-semibold text-orange-800">{topic.title}</h3>
                                      {topic.completed && (
                                        <span className="text-green-600 text-sm ml-2">(Completed)</span>
                                      )}
                                    </div>
                                    <p className="text-gray-600 mb-4">{topic.description}</p>
                                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                                      {topic.subsections.map((sub, idx) => (
                                        <li key={idx}>{sub}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  {topic.completed && (
                                    <CheckCircle2 className="h-6 w-6 text-green-500 ml-4" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Link href="/modules/module2/bitcoin-fundamentals">
                        <Button 
                          size="lg"
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Start Learning
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent value="quiz" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-orange-800 mb-4">Module Quiz</h2>
                        <p className="text-gray-700 mb-6">
                          Complete all topics to unlock the module quiz and test your knowledge 
                          of Bitcoin concepts.
                        </p>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100">
                          <h3 className="text-lg font-medium text-gray-700 mb-4">Required Topics:</h3>
                          <ul className="space-y-3">
                            {topicsWithProgress.map((topic) => (
                              <li 
                                key={topic.id} 
                                className={`flex items-center justify-between p-3 rounded-lg ${
                                  topic.completed ? 'bg-green-50' : 'bg-white/80'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {topic.completed ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-gray-400" />
                                  )}
                                  <span className={topic.completed ? 'text-green-700' : 'text-gray-600'}>
                                    {topic.title}
                                  </span>
                                </span>
                                {!topic.completed && (
                                  <Link href={topic.path}>
                                    <Button variant="outline" size="sm">
                                      Start Topic
                                    </Button>
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6">
                            <Link href="/modules/module2/quiz">
                              <Button 
                                disabled={!allTopicsCompleted}
                                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                              >
                                {allTopicsCompleted ? "Start Quiz" : "Complete all topics to unlock quiz"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                        {isModuleComplete && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
                          >
                            <p className="text-green-800 font-medium mb-4">
                              🎉 Congratulations! You've completed Module 2: Bitcoin Deep Dive
                            </p>
                            <Link href="/modules/module3">
                              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                                Continue to Module 3
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}