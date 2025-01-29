import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Module2() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 2: What is a Blockchain?
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
                  This module explores the core technology behind cryptocurrencies - the blockchain.
                  Learn how this revolutionary technology works and why it's important.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Learning Objectives</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Understand what a blockchain is and how it works</li>
                  <li>Learn about distributed ledger technology</li>
                  <li>Grasp the concept of consensus mechanisms</li>
                  <li>Understand the importance of decentralization</li>
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
                    <h3 className="font-semibold">1. Blockchain Fundamentals</h3>
                    <p className="text-muted-foreground">Understanding blocks, chains, and distributed ledgers</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">2. Consensus Mechanisms</h3>
                    <p className="text-muted-foreground">Proof of Work, Proof of Stake, and other methods</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">3. Decentralization</h3>
                    <p className="text-muted-foreground">The importance of distributed systems</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Knowledge Check</h2>
                <p className="text-muted-foreground mb-6">
                  Complete the module content to unlock the quiz and test your knowledge.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
