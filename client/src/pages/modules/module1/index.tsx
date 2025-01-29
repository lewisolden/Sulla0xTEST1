import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, History, Bitcoin, Coins, TrendingUp, Lock } from "lucide-react";
import ProgressRoadmap from "@/components/modules/progress-roadmap";
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Fundamentals of Cryptocurrency
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {Math.round(progressPercentage)}%
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Module Overview</h2>
            <div className="prose lg:prose-xl text-gray-700">
              <p>
                Welcome to Module 1! This foundational module introduces you to the world 
                of cryptocurrencies and blockchain technology. You'll learn about the evolution 
                of digital currencies, understand Bitcoin's revolutionary impact, and explore 
                the broader cryptocurrency ecosystem.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <ProgressRoadmap 
            sections={sectionsWithProgress}
            currentSection={currentSection}
          />
        </div>

        <div className="grid gap-6">
          {sectionsWithProgress.map((section) => (
            <Card key={section.id} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-blue-800">{section.title}</h3>
                      {section.completed && (
                        <span className="text-green-600 text-sm">(Completed)</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">
                      {getDescription(section.id)}
                    </p>
                  </div>
                  <Link href={section.path}>
                    <Button>
                      {section.completed ? "Review" : "Start Learning"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Quiz */}
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
    "digital-currencies": "Learn about the fundamentals of digital currencies and their impact.",
    "history-of-money": "Explore the evolution from traditional to digital currencies.",
    "bitcoin": "Understand Bitcoin's creation, features, and significance.",
    "altcoins-tokens": "Explore alternative cryptocurrencies and digital tokens.",
    "crypto-market": "Learn about cryptocurrency markets and trading basics.",
    "cryptography": "Understand the cryptographic principles behind cryptocurrencies.",
  };
  return descriptions[sectionId] || "";
}