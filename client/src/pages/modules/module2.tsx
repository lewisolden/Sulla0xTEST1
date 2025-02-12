import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Database, Network, Code, FileText, ArrowRight } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";
import ModuleProgress from "@/components/modules/module-progress";
import BadgeShowcase from "@/components/modules/badge-showcase";
import { useScrollTop } from "@/hooks/useScrollTop";

const moduleTopics = [
  {
    id: "bitcoin-fundamentals",
    title: "2.1 Bitcoin Fundamentals",
    path: "/modules/module2/bitcoin-fundamentals",
    icon: Database,
    subsections: [
      "The Birth of Bitcoin",
      "Historical Context and Significance",
      "How Bitcoin Works",
      "Key Milestones"
    ]
  },
  {
    id: "bitcoin-investment",
    title: "2.2 Bitcoin as an Investment",
    path: "/modules/module2/bitcoin-investment",
    icon: Network,
    subsections: [
      "Understanding Bitcoin's Value",
      "Store of Value Properties",
      "Bitcoin ETFs",
      "Investment Strategies"
    ]
  },
  {
    id: "security-risk",
    title: "2.3 Security and Risk Management",
    path: "/modules/module2/security-risk",
    icon: Code,
    subsections: [
      "Essential Security Practices",
      "Risk Management Strategies",
      "Common Mistakes to Avoid",
      "Best Practices"
    ]
  },
  {
    id: "practical-exercises",
    title: "2.4 Practical Exercises",
    path: "/modules/module2/exercises",
    icon: FileText,
    subsections: [
      "Beginner Exercises",
      "Advanced Exercises",
      "Real-world Scenarios",
      "Practice Quiz"
    ]
  }
];

export default function Module2() {
  useScrollTop();
  const { metrics, isLoading } = useProgress();
  const moduleId = 2;

  // Calculate completed sections based on course progress
  const completedSections = Object.keys(metrics.courseProgress).filter(
    courseId => courseId === moduleId.toString()
  ).length;

  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  // Check if quiz is completed
  const isQuizCompleted = metrics.completedQuizzes > 0 && 
    metrics.courseProgress[moduleId] >= 100;

  // Check if all topics are completed
  const allTopicsCompleted = moduleTopics.every(topic => 
    metrics.courseProgress[moduleId] >= (topic.id === moduleTopics[moduleTopics.length - 1].id ? 100 : 75)
  );

  // Module is complete when all topics and quiz are done
  const isModuleComplete = allTopicsCompleted && isQuizCompleted;

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: metrics.courseProgress[moduleId] >= (
      topic.id === moduleTopics[moduleTopics.length - 1].id ? 100 : 75
    )
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 2: Bitcoin Deep Dive
        </h1>

        <ModuleProgress moduleId={2} totalSections={moduleTopics.length} />
        <BadgeShowcase moduleId={2} />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Topics</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <div className="p-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Module 2</h2>
                  <p className="text-gray-700 mb-6">
                    Welcome to Module 2 of our cryptocurrency education journey. This module focuses on 
                    Bitcoin - the first and most influential cryptocurrency. We'll explore its history,
                    how it works, and its role as a revolutionary form of digital money.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Before diving into Bitcoin's technical aspects, let's address some common concerns:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Do I need to buy a whole Bitcoin?</strong> No! Bitcoin is divisible into 100 million units called "satoshis" or "sats." You can start with as little as $10.</li>
                    <li><strong>Is it too technical for me?</strong> While Bitcoin uses complex technology, using it is similar to mobile banking. Start with the basics, and your understanding will grow naturally.</li>
                    <li><strong>What if I make a mistake?</strong> Start with small amounts while learning. Use test transactions and practice with minimal stakes to build confidence.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Understand the historical context and significance of Bitcoin</li>
                    <li>Learn how Bitcoin works as a digital currency</li>
                    <li>Explore investment considerations and Bitcoin ETFs</li>
                    <li>Master security practices and risk management</li>
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module2/bitcoin-fundamentals">
                      <Button 
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start First Topic
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              {topicsWithProgress.map((topic) => (
                <Card key={topic.id} className="transition-all hover:shadow-lg">
                  <div className="p-6">
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
                            <li key={index} className="text-sm mb-2">{subsection}</li>
                          ))}
                        </ul>
                        <Link href={topic.path}>
                          <Button>
                            {topic.completed ? "Review Topic" : "Start Topic"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Module Quiz</h2>
                <p className="text-gray-700 mb-6">
                  Complete all topics to unlock the module quiz and test your knowledge 
                  of Bitcoin concepts.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Required Topics:</h3>
                  <ul className="space-y-3">
                    {topicsWithProgress.map((topic) => (
                      <li 
                        key={topic.id} 
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          topic.completed ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {topic.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-400" />
                          )}
                          <span className={`${topic.completed ? 'text-green-700' : 'text-gray-600'}`}>
                            {topic.title}
                          </span>
                        </span>
                        {!topic.completed && (
                          <Link href={topic.path}>
                            <Button variant="outline" size="sm">
                              Complete Topic
                            </Button>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/modules/module2/quiz">
                    <Button 
                      disabled={progressPercentage < 100}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      {progressPercentage < 100 
                        ? "Complete all topics to unlock quiz" 
                        : "Start Quiz"
                      }
                    </Button>
                  </Link>

                  {isModuleComplete && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 font-medium mb-4">
                        🎉 Congratulations! You've completed Module 2: Bitcoin Deep Dive
                      </p>
                      <Link href="/modules/module3">
                        <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                          Continue to Module 3: Advanced Concepts
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}