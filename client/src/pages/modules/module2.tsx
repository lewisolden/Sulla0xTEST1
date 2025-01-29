import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "@/components/modules/quiz";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const module2Topics = [
  {
    id: "blockchain-basics",
    title: "Topic 1 - Blockchain Basics",
    path: "/modules/module2/blockchain-basics",
    subsections: [
      "Understanding blocks and chains",
      "Basic structure of a blockchain",
      "Decentralization and its importance",
      "Key features of blockchain technology"
    ]
  },
  {
    id: "distributed-ledger",
    title: "Topic 2 - Distributed Ledger Technology",
    path: "/modules/module2/distributed-ledger",
    subsections: [
      "What is a distributed ledger",
      "How data is stored and shared",
      "Network nodes and their roles",
      "Benefits of distributed systems"
    ]
  },
  {
    id: "consensus-mechanisms",
    title: "Topic 3 - Consensus Mechanisms",
    path: "/modules/module2/consensus-mechanisms",
    subsections: [
      "Understanding consensus in blockchain",
      "Proof of Work (PoW)",
      "Proof of Stake (PoS)",
      "Other consensus mechanisms"
    ]
  },
  {
    id: "smart-contracts",
    title: "Topic 4 - Smart Contracts",
    path: "/modules/module2/smart-contracts",
    subsections: [
      "Introduction to smart contracts",
      "How smart contracts work",
      "Use cases and applications",
      "Smart contract platforms"
    ]
  }
];

export default function Module2() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / module2Topics.length) * 100;

  const topicsWithProgress = module2Topics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 2: What is a Blockchain?
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
                    Welcome to Module 2, where we dive deep into blockchain technology - the revolutionary 
                    system that underlies cryptocurrencies and has potential applications across various industries. 
                    This module will help you understand how blockchain works as a distributed ledger that 
                    records transactions across many computers.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We'll explore the fundamental structure of blockchain, including how blocks are created, 
                    validated, and linked together. You'll learn about the key features that make blockchain 
                    unique, such as its immutability, transparency, and resistance to tampering.
                  </p>
                  <p className="text-gray-700 mb-6">
                    The module covers crucial concepts like consensus mechanisms, which allow blockchain 
                    networks to agree on the state of the ledger without central authority. We'll also 
                    explore smart contracts and their role in automating transactions and processes on 
                    the blockchain.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Define what a blockchain is and explain its basic structure</li>
                    <li>Understand how blocks are created and linked in a blockchain</li>
                    <li>Describe key features of blockchain technology (immutability, transparency, decentralization)</li>
                    <li>Identify the basic components of a blockchain system</li>
                    <li>Compare blockchain with traditional databases</li>
                    <li>Explain consensus mechanisms and their importance</li>
                    <li>Understand smart contracts and their applications</li>
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
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
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
                      <div className="mt-4">
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
            <Quiz moduleId={2} />
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