import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, History, Bitcoin, Coins, TrendingUp, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "@/components/modules/quiz";
import { useProgress } from "@/context/progress-context";

const module1Sections = [
  {
    id: "digital-currencies",
    title: "Digital Currencies",
    path: "/modules/module1/digital-currencies",
    icon: BookOpen,
  },
  {
    id: "history-of-money",
    title: "History of Money",
    path: "/modules/module1/history-of-money",
    icon: History,
  },
  {
    id: "bitcoin",
    title: "Bitcoin",
    path: "/modules/module1/bitcoin",
    icon: Bitcoin,
  },
  {
    id: "altcoins-tokens",
    title: "Altcoins and Tokens",
    path: "/modules/module1/altcoins-tokens",
    icon: Coins,
  },
  {
    id: "crypto-market",
    title: "Crypto Market",
    path: "/modules/module1/crypto-market",
    icon: TrendingUp,
  },
  {
    id: "cryptography",
    title: "Cryptography",
    path: "/modules/module1/cryptography",
    icon: Lock,
  },
];

export default function Module1() {
  const [location] = useLocation();
  const { progress, isLoading } = useProgress();

  const currentSection = location.split("/").pop();
  const moduleProgress = progress.filter(p => p.moduleId === 1);

  const sectionsWithProgress = module1Sections.map(section => ({
    ...section,
    completed: moduleProgress.some(p => p.sectionId === section.id && p.completed),
  }));

  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / module1Sections.length) * 100;

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
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Introduction</h2>
                <div className="prose lg:prose-xl text-gray-700">
                  <p>
                    Welcome to the first module of our journey into the world of cryptocurrencies 
                    and blockchain technology. In this foundational module, we'll explore the basic 
                    concepts that underpin this revolutionary technology and set the stage for the 
                    more advanced topics we'll cover later in the course.
                  </p>
                  <p>
                    We'll begin by delving into the nature of digital currencies, understanding what 
                    they are and how they differ from traditional forms of money. You'll learn about 
                    the historical context that led to the creation of cryptocurrencies, tracing the 
                    evolution of money from ancient barter systems to modern digital tokens.
                  </p>
                  <p>
                    Next, we'll focus on Bitcoin, the world's first and most famous cryptocurrency. 
                    We'll examine its creation, underlying technology, and the problems it was 
                    designed to solve. This will lead us into a broader discussion of other 
                    cryptocurrencies and tokens, giving you a comprehensive view of the current 
                    cryptocurrency landscape.
                  </p>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Learning Objectives</h3>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">Module Sections</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {sectionsWithProgress.map((section) => (
                    <div key={section.id} className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <section.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-800">
                          {section.title}
                          {section.completed && (
                            <span className="text-green-600 text-sm ml-2">(Completed)</span>
                          )}
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {getDescription(section.id)}
                      </p>
                      <Link href={section.path}>
                        <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                          {section.completed ? "Review Section" : "Start Section"} →
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                ? "Complete all sections to unlock quiz" 
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

function getDescription(sectionId: string): string {
  const descriptions: Record<string, string> = {
    "digital-currencies": "Explore the basics of digital currencies and their role in the modern financial system.",
    "history-of-money": "Trace the evolution of money from ancient times to modern digital currencies.",
    "bitcoin": "Learn about Bitcoin's creation, features, and impact on the financial world.",
    "altcoins-tokens": "Discover the variety of alternative cryptocurrencies and digital tokens.",
    "crypto-market": "Understand how cryptocurrency markets work and key market metrics.",
    "cryptography": "Learn the fundamental cryptographic principles behind cryptocurrencies.",
  };
  return descriptions[sectionId] || "";
}