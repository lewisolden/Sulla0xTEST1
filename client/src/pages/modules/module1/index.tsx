import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, History, Bitcoin, Coins, TrendingUp, Lock } from "lucide-react";
import ProgressRoadmap from "@/components/modules/progress-roadmap";
import { useProgress } from "@/context/progress-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming this import is needed


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

export default function Module1Landing() {
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
                <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
                <p className="text-muted-foreground">
                  This module introduces you to the fundamental concepts of cryptocurrency,
                  including its history, basic terminology, and core principles.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Learning Objectives</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Define digital currencies and distinguish between different types</li>
                  <li>Trace the evolution of money from barter systems to modern digital currencies</li>
                  <li>Explain the fundamental problem that Bitcoin was designed to solve</li>
                  <li>Compare and contrast Bitcoin with major altcoins</li>
                  <li>Interpret basic market metrics and cryptographic principles</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Module Content</h2>
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
            {/* Placeholder for Quiz component */}
            <div>Quiz Content Here</div> {/* Replace with actual Quiz component */}
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

export default Module1Landing;