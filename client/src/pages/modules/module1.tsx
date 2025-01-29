import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Quiz from "@/components/modules/quiz";

export default function Module1() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Fundamentals of Cryptocurrency
        </h1>

        <div className="mb-8">
          <Progress value={0} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: 0%</p>
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
                  <li>Understand what cryptocurrency is and its purpose</li>
                  <li>Learn about the history of digital currencies</li>
                  <li>Grasp basic cryptographic concepts</li>
                  <li>Understand blockchain fundamentals</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Module Content</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">1. Introduction to Cryptocurrency</h3>
                    <p className="text-muted-foreground">What is cryptocurrency and why was it created?</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">2. Digital Currency History</h3>
                    <p className="text-muted-foreground">The evolution of money and the birth of Bitcoin</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">3. Cryptography Basics</h3>
                    <p className="text-muted-foreground">Understanding the security behind cryptocurrencies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Quiz moduleId={1} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}