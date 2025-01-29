import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "@/components/modules/quiz";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const moduleTopics = [
  {
    id: "digital-currencies",
    title: "Topic 1 - Introduction to Digital Currencies",
    path: "/modules/module1/digital-currencies",
    subsections: [
      "Definition of digital currencies",
      "Brief history and evolution of digital money",
      "Key characteristics of cryptocurrencies"
    ]
  },
  {
    id: "history-of-money",
    title: "Topic 2 - History and Evolution of Money",
    path: "/modules/module1/history-of-money",
    subsections: [
      "Traditional forms of money and their limitations",
      "The transition from physical to digital currencies",
      "The need for decentralized digital currencies"
    ]
  },
  {
    id: "bitcoin",
    title: "Topic 3 - Bitcoin: The First Cryptocurrency",
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
    title: "Topic 4 - Altcoins and Tokens",
    path: "/modules/module1/altcoins-tokens",
    subsections: [
      "Definition of altcoins and their purpose",
      "Overview of major altcoins (e.g., Ethereum, Litecoin)",
      "Introduction to tokens and their various types",
      "Differences between coins and tokens"
    ]
  },
  {
    id: "crypto-market",
    title: "Topic 5 - Cryptocurrency Market Dynamics",
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
    title: "Topic 6 - Basic Cryptography Concepts",
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
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  const topicsWithProgress = moduleTopics.map(topic => ({
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

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
                <p className="text-gray-700 mb-6">
                  This module is designed to introduce learners to the basic concepts of 
                  cryptocurrencies and their underlying technology. It's structured into 
                  six main sections that will give you a comprehensive understanding of 
                  the fundamentals.
                </p>
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
            <Quiz moduleId={1} />
          </TabsContent>
        </Tabs>

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