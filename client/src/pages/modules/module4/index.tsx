import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Building, Wallet, Shield, Globe, Database, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const module4Topics = [
  {
    id: "digital-vs-traditional",
    title: "Digital vs Traditional Money",
    icon: Building,
    path: "/modules/module4/digital-vs-traditional",
    subsections: [
      "Physical Cash vs Digital Currency",
      "Advantages and Limitations",
      "Real-world Applications",
      "Future of Money"
    ]
  },
  {
    id: "wallet-simulation",
    title: "Crypto Wallet Simulation",
    icon: Wallet,
    path: "/wallet-simulator",
    subsections: [
      "Understanding Crypto Wallets",
      "Creating Your First Wallet",
      "Sending & Receiving Transactions",
      "Security Best Practices"
    ]
  },
  {
    id: "security-control",
    title: "Security & Control",
    icon: Shield,
    path: "/modules/module4/security-control",
    subsections: [
      "Traditional Banking Security",
      "Cryptocurrency Security",
      "Private Keys and Cryptography",
      "Self-custody vs Institutional Control"
    ]
  },
  {
    id: "payment-inclusion",
    title: "Payment Systems & Financial Inclusion",
    icon: Globe,
    path: "/modules/module4/payment-inclusion",
    subsections: [
      "Traditional Payment Issues",
      "Cryptocurrency Solutions",
      "Financial Inclusion",
      "Cross-border Transactions"
    ]
  },
  {
    id: "digital-scarcity",
    title: "Digital Scarcity & Network Architecture",
    icon: Database,
    path: "/modules/module4/digital-scarcity",
    subsections: [
      "Understanding Digital Scarcity",
      "The Double-spending Problem",
      "Decentralization Benefits",
      "Network Security Features"
    ]
  }
];

export default function Module4() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 4);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / module4Topics.length) * 100;

  const topicsWithProgress = module4Topics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 4: Understanding Digital Money
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Progress: {Math.round(progressPercentage)}%
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-6">
              This module explores the fundamental differences between traditional and digital money,
              focusing on how cryptocurrency is revolutionizing our understanding of value and
              financial systems. Get hands-on experience with our interactive wallet simulator and
              learn about security, control, and the innovative features that make digital currencies unique.
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
                    <div className="flex gap-2">
                      <Link href={topic.path}>
                        <Button>
                          {topic.completed ? "Review Topic" : "Start Topic"}
                        </Button>
                      </Link>
                      <Link href={`${topic.path}/quiz`}>
                        <Button 
                          variant="secondary"
                          disabled={!topic.completed}
                          className="gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Topic Quiz
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
          <Link href="/modules/module4/quiz">
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