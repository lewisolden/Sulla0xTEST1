import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Database, Network, Code, Brain } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const module2Topics = [
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    icon: BookOpen,
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
    title: "Distributed Ledger Technology",
    icon: Database,
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
    title: "Consensus Mechanisms",
    icon: Network,
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
    title: "Smart Contracts",
    icon: Code,
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

        <div className="mb-8 text-center">
          <Link href="/modules/module2/quiz">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 gap-2"
              disabled={progressPercentage < 100}
            >
              <Brain className="w-5 h-5" />
              {progressPercentage < 100 
                ? "Complete all topics to unlock Module Quiz" 
                : "Take Module Quiz"
              }
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {Math.round(progressPercentage)}%
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-6">
              This module introduces you to the fundamental concepts of blockchain technology,
              exploring its structure, key features, and various applications in the digital world.
            </p>
          </CardContent>
        </Card>

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
                        <li key={index} className="text-sm mb-1">{subsection}</li>
                      ))}
                    </ul>
                    <div className="flex gap-4">
                      <Link href={topic.path}>
                        <Button>
                          {topic.completed ? "Review Topic" : "Start Topic"}
                        </Button>
                      </Link>
                      <Link href={`${topic.path}-quiz`}>
                        <Button variant="outline">
                          Take Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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