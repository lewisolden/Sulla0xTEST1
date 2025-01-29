import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Module3() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 3: Blockchain Technology
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
                  This advanced module covers the practical applications of blockchain technology,
                  smart contracts, and the future of decentralized systems.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Learning Objectives</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Understand smart contracts and their applications</li>
                  <li>Learn about different blockchain platforms</li>
                  <li>Explore real-world use cases</li>
                  <li>Understand the future of blockchain technology</li>
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
                    <h3 className="font-semibold">1. Smart Contracts</h3>
                    <p className="text-muted-foreground">Understanding programmable blockchain applications</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">2. Blockchain Platforms</h3>
                    <p className="text-muted-foreground">Ethereum, Solana, and other major platforms</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">3. Future Applications</h3>
                    <p className="text-muted-foreground">The potential impact of blockchain technology</p>
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
