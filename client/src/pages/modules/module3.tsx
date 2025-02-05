import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, Route, useRoute } from "wouter";
import { Scale, Network, Code, Shield } from "lucide-react";
import ExercisesPage from "./module3/exercises";
import { useScrollTop } from "@/hooks/useScrollTop";

const moduleTopics = [
  {
    id: "ethereum-fundamentals",
    title: "3.1 Ethereum Fundamentals",
    path: "/modules/module3/ethereum-fundamentals",
    icon: Scale,
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
    subsections: [
      "Smart Contract Security",
      "Technical Vulnerabilities",
      "Economic Attack Vectors",
      "Risk Management Practices"
    ]
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 3: Ethereum and Smart Contracts
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
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

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand Ethereum's role as a programmable blockchain platform</li>
                    <li>Master the fundamentals of smart contracts and their applications</li>
                    <li>Explore the Ethereum Virtual Machine and its capabilities</li>
                    <li>Learn about decentralized applications (dApps) and their ecosystem</li>
                    <li>Analyze Ethereum's value proposition and investment considerations</li>
                    <li>Understand security best practices and risk management</li>
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module3/ethereum-fundamentals">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start First Topic
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              {topicsWithProgress.map((topic) => (
                <Card key={topic.id} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-blue-100 mt-1">
                        <topic.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-blue-800">
                            {topic.title}
                          </h3>
                          {topic.completed && (
                            <span className="text-green-600 text-sm">(Completed)</span>
                          )}
                        </div>
                        <ul className="list-disc pl-5 text-gray-600 mb-4">
                          {topic.subsections.map((subsection, index) => (
                            <li key={index} className="text-sm mb-2">{subsection}</li>
                          ))}
                        </ul>
                        <Link href={topic.path}>
                          <Button>
                            {topic.completed ? "Review Topic" : "Start Topic"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
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
                        className="bg-blue-600 hover:bg-blue-700"
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
                      className="bg-green-600 hover:bg-green-700"
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
      </div>
      <Footer />
    </div>
  );
}