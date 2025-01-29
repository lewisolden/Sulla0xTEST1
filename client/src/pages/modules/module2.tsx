import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Database, Network, Lock, Code, Building, Cpu } from "lucide-react";

const moduleTopics = [
  {
    id: "blockchain-fundamentals",
    title: "Topic 1 - Blockchain Fundamentals",
    path: "/modules/module2/blockchain-fundamentals",
    icon: Database,
    subsections: [
      "What is a blockchain?",
      "Block structure and chain formation",
      "Distributed ledger technology",
      "Types of blockchains"
    ]
  },
  {
    id: "consensus-mechanisms",
    title: "Topic 2 - Consensus Mechanisms",
    path: "/modules/module2/consensus-mechanisms",
    icon: Network,
    subsections: [
      "Understanding consensus in blockchain",
      "Proof of Work (PoW)",
      "Proof of Stake (PoS)",
      "Alternative consensus mechanisms"
    ]
  },
  {
    id: "decentralization",
    title: "Topic 3 - Decentralization",
    path: "/modules/module2/decentralization",
    icon: Lock,
    subsections: [
      "Principles of decentralization",
      "Benefits and challenges",
      "Network nodes and validators",
      "Governance models"
    ]
  },
  {
    id: "smart-contracts",
    title: "Topic 4 - Smart Contracts",
    path: "/modules/module2/smart-contracts",
    icon: Code,
    subsections: [
      "Introduction to smart contracts",
      "Smart contract platforms",
      "Writing and deploying contracts",
      "Security considerations"
    ]
  },
  {
    id: "blockchain-applications",
    title: "Topic 5 - Blockchain Applications",
    path: "/modules/module2/applications",
    icon: Building,
    subsections: [
      "DeFi (Decentralized Finance)",
      "NFTs and digital assets",
      "Supply chain management",
      "Identity management"
    ]
  },
  {
    id: "future-blockchain",
    title: "Topic 6 - Future of Blockchain",
    path: "/modules/module2/future",
    icon: Cpu,
    subsections: [
      "Scalability solutions",
      "Interoperability",
      "Environmental considerations",
      "Emerging trends"
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
                    Welcome to the second module of our cryptocurrency education journey. In this module, 
                    we'll dive deep into blockchain technology, the revolutionary system that powers 
                    cryptocurrencies and enables countless other applications.
                  </p>
                  <p className="text-gray-700 mb-6">
                    You'll learn about the fundamental concepts of blockchain, including how blocks are 
                    created and chained together, the role of consensus mechanisms in maintaining network 
                    security, and the importance of decentralization in blockchain systems.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We'll explore smart contracts and their potential to automate and revolutionize 
                    various industries. You'll also discover real-world applications of blockchain 
                    technology beyond cryptocurrencies, and get a glimpse into the future of this 
                    transformative technology.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand the fundamental structure and operation of blockchain technology</li>
                    <li>Compare and contrast different consensus mechanisms</li>
                    <li>Evaluate the benefits and challenges of decentralization</li>
                    <li>Understand smart contracts and their applications</li>
                    <li>Explore real-world use cases of blockchain technology</li>
                    <li>Analyze future trends and developments in blockchain</li>
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module2/blockchain-fundamentals">
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
                <Button 
                  disabled={progressPercentage < 100}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  {progressPercentage < 100 
                    ? "Complete all topics to unlock quiz" 
                    : "Start Quiz"
                  }
                </Button>
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