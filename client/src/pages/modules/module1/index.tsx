import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, History, Bitcoin, Coins, TrendingUp, Lock, Book, Brain } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const module1Topics = [
  {
    id: "digital-currencies",
    title: "Introduction to Digital Currencies",
    icon: BookOpen,
    path: "/modules/module1/digital-currencies",
    subsections: [
      "Definition of digital currencies",
      "Brief history and evolution of digital money",
      "Key characteristics of cryptocurrencies"
    ]
  },
  {
    id: "history-of-money",
    title: "History and Evolution of Money",
    icon: History,
    path: "/modules/module1/history-of-money",
    subsections: [
      "Traditional forms of money and their limitations",
      "The transition from physical to digital currencies",
      "The need for decentralized digital currencies"
    ]
  },
  {
    id: "bitcoin",
    title: "Bitcoin: The First Cryptocurrency",
    icon: Bitcoin,
    path: "/modules/module1/bitcoin",
    subsections: [
      "Introduction to Bitcoin and its creation",
      "Key features of Bitcoin",
      "The Bitcoin blockchain and how it works",
      "Mining and transaction verification"
    ]
  },
  {
    id: "altcoins-tokens",
    title: "Altcoins and Tokens",
    icon: Coins,
    path: "/modules/module1/altcoins-tokens",
    subsections: [
      "Definition of altcoins and their purpose",
      "Overview of major altcoins",
      "Introduction to tokens and their various types",
      "Differences between coins and tokens"
    ]
  },
  {
    id: "crypto-market",
    title: "Cryptocurrency Market Dynamics",
    icon: TrendingUp,
    path: "/modules/module1/crypto-market",
    subsections: [
      "Introduction to cryptocurrency markets",
      "Market capitalization and trading volume",
      "Factors influencing cryptocurrency prices",
      "Basic trading concepts"
    ]
  },
  {
    id: "cryptography",
    title: "Basic Cryptography Concepts",
    icon: Lock,
    path: "/modules/module1/cryptography",
    subsections: [
      "Introduction to cryptography in the context of cryptocurrencies",
      "Public and private keys",
      "Digital signatures",
      "Hash functions and their role in blockchain"
    ]
  }
];

export default function Module1() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 1);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / module1Topics.length) * 100;

  const topicsWithProgress = module1Topics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Fundamentals of Cryptocurrency
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
        </div>

        {/* Add Quiz Button at the top */}
        <div className="mb-8 text-center">
          <Link href="/modules/module1/quiz">
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

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-6">
              This module is designed to introduce learners to the basic concepts of
              cryptocurrencies and their underlying technology. It's structured into
              six main sections that will give you a comprehensive understanding of
              the fundamentals.
            </p>
            <Link href="/glossary">
              <Button className="gap-2">
                <Book className="h-4 w-4" />
                Open Crypto Glossary
              </Button>
            </Link>
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
          <Link href="/modules/module1/quiz">
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