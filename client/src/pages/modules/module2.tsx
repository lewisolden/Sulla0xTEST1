import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Database, Network, Code, FileText } from "lucide-react";

const moduleTopics = [
  {
    id: "blockchain-basics",
    title: "2.1 What is a Blockchain?",
    path: "/modules/module2/blockchain-basics",
    icon: Database,
    subsections: [
      "Key Characteristics of Blockchain",
      "Basic Structure of a Blockchain",
      "How Blockchain Works",
      "Comparison with Traditional Databases"
    ]
  },
  {
    id: "distributed-ledger",
    title: "2.2 Distributed Ledger Technology",
    path: "/modules/module2/distributed-ledger",
    icon: Network,
    subsections: [
      "Key Characteristics of DLT",
      "Types of Distributed Ledgers",
      "Applications of DLT",
      "Challenges and Limitations"
    ]
  },
  {
    id: "consensus-mechanisms",
    title: "2.3 Consensus Mechanisms",
    path: "/modules/module2/consensus-mechanisms",
    icon: Code,
    subsections: [
      "Proof of Work (PoW)",
      "Proof of Stake (PoS)",
      "Comparison of PoW and PoS",
      "Other Consensus Mechanisms"
    ]
  },
  {
    id: "smart-contracts",
    title: "2.4 Smart Contracts",
    path: "/modules/module2/smart-contracts",
    icon: FileText,
    subsections: [
      "Key Characteristics",
      "How Smart Contracts Work",
      "Use Cases",
      "Best Practices"
    ]
  }
];

export default function Module2() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 2: Understanding Blockchain Technology
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Module 2</h2>
                  <p className="text-gray-700 mb-6">
                    Welcome to Module 2 of our cryptocurrency education journey. This module focuses on 
                    blockchain technology, the revolutionary system that powers cryptocurrencies and 
                    enables countless other applications.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We'll explore the fundamental concepts of blockchain technology, including how blocks 
                    are structured and chained together, consensus mechanisms that secure the network, 
                    and smart contracts that enable automation.
                  </p>
                  <p className="text-gray-700 mb-6">
                    You'll learn about practical applications of blockchain technology and discover
                    how this technology is transforming various industries beyond cryptocurrencies.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand the fundamental structure and operation of blockchain technology</li>
                    <li>Learn about distributed ledger technology and its applications</li>
                    <li>Master different consensus mechanisms and their importance</li>
                    <li>Explore smart contracts and their real-world applications</li>
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module2/blockchain-basics">
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

          <TabsContent value="quiz">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Module Quiz</h2>
                <p className="text-gray-700 mb-6">
                  Complete all topics to unlock the module quiz and test your knowledge 
                  of blockchain technology.
                </p>
                <Link href="/modules/module2/quiz">
                  <Button 
                    disabled={progressPercentage < 100}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  >
                    {progressPercentage < 100 
                      ? "Complete all topics to unlock quiz" 
                      : "Start Quiz"
                    }
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-8 text-center">
          <Link href="/modules/module2/quiz">
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
      </div>
      <Footer />
    </div>
  );
}