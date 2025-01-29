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
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Module 1</h2>
                  <p className="text-gray-700 mb-6">
                    Welcome to the first module of our journey into the world of cryptocurrencies and blockchain technology. In 
                    this foundational module, we'll explore the basic concepts that underpin this revolutionary technology and set 
                    the stage for the more advanced topics we'll cover later in the course.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We'll begin by delving into the types of digital currencies, understanding what they are and how they differ 
                    from traditional forms of money. You'll learn about the historical context that led to the creation of 
                    cryptocurrencies, tracing the evolution of money from ancient barter systems to modern digital tokens.
                  </p>
                  <p className="text-gray-700 mb-6">
                    We'll focus on Bitcoin, the world's first and most famous cryptocurrency. We'll examine its creation, 
                    underlying technology, and the problems it was designed to solve. This will lead us into a broader discussion 
                    of other cryptocurrencies and tokens, giving you a comprehensive view of the current cryptocurrency landscape.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Finally, we'll round off the module with an introduction to the cryptographic principles that make 
                    cryptocurrencies possible. While we won't delve too deeply into mathematical concepts, you'll gain a solid 
                    understanding of concepts like hash functions and public key cryptography.
                  </p>
                  <p className="text-gray-700 mb-6">
                    By the end of this module, you'll have a strong foundation in the fundamental concepts of cryptocurrencies. 
                    This knowledge will be crucial as we move forward to explore more complex topics in subsequent modules.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Define digital currencies and distinguish between different types (e.g., virtual currencies, cryptocurrencies, central bank digital currencies)</li>
                    <li>Trace the evolution of money from barter systems to modern digital currencies, identifying key milestones in monetary history</li>
                    <li>Explain the fundamental problem that Bitcoin was designed to solve (the double-spending problem) and describe how its blockchain technology addresses this issue</li>
                    <li>Analyze the key components of Bitcoin's architecture, including its consensus mechanism (Proof of Work), transaction model (UTXO), and monetary policy</li>
                    <li>Compare and contrast Bitcoin with major altcoins, highlighting their unique features and use cases</li>
                    <li>Differentiate between coins and tokens in the cryptocurrency ecosystem</li>
                    <li>Interpret basic market metrics such as market capitalization, trading volume, and price volatility</li>
                    <li>Apply fundamental analysis techniques to evaluate cryptocurrency projects</li>
                    <li>Describe the basic principles of cryptography underlying cryptocurrencies</li>
                    <li>Demonstrate the ability to securely set up a basic cryptocurrency wallet</li>
                  </ul>
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