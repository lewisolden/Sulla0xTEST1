import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Dumbbell } from "lucide-react";
import { useProgress } from "@/context/progress-context";

const module1Topics = [
  {
    id: "digital-currencies",
    title: "Introduction to Digital Currency",
    icon: BookOpen,
    path: "/modules/module1/digital-currencies",
    subsections: [
      "Understanding Traditional Money vs. Cryptocurrency",
      "The Evolution of Money",
      "Core Concepts and Features"
    ]
  },
  {
    id: "security",
    title: "Understanding Cryptocurrency Security",
    icon: BookOpen,
    path: "/modules/module1/security",
    subsections: [
      "Cryptographic Foundations",
      "The Double-Spending Solution",
      "Risk Considerations and Management"
    ]
  },
  {
    id: "practical-applications",
    title: "Practical Applications",
    icon: BookOpen,
    path: "/modules/module1/applications",
    subsections: [
      "Financial Inclusion",
      "Payment Efficiency",
      "Investment Opportunities and Risks"
    ]
  },
  {
    id: "getting-started",
    title: "Getting Started Safely",
    icon: BookOpen,
    path: "/modules/module1/getting-started",
    subsections: [
      "First Steps",
      "Security Best Practices",
      "Storage and Access Security"
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
          Module 1: Understanding Cryptocurrency
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 mb-6">
              This module introduces you to the fundamental concepts of cryptocurrency, exploring how digital currencies 
              differ from traditional money systems and their revolutionary potential in today's financial landscape.
            </p>
            <div className="flex gap-4">
              <Link href="/glossary">
                <Button className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Open Crypto Glossary
                </Button>
              </Link>
              <Link href="/modules/module1/exercises">
                <Button variant="secondary" className="gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Practice Exercises
                </Button>
              </Link>
            </div>
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
                          <BookOpen className="h-4 w-4" />
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