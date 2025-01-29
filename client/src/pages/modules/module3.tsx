import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Module3() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 3);
  const progressPercentage = 0; // Will be implemented when topics are added

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 3: Advanced Blockchain Technology
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {progressPercentage}%</p>
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
                  <img 
                    src="/attached_assets/image_1738180555744.png" 
                    alt="Blockchain Technology Overview"
                    className="w-full rounded-lg mb-6 object-cover max-h-[300px]"
                  />

                  <h2 className="text-2xl font-semibold mb-4">Welcome to Module 3</h2>

                  <div className="space-y-4 text-gray-700">
                    <p>
                      Welcome to Module 3, where we delve deep into the heart of blockchain technology. Having explored the fundamentals of cryptocurrencies and the basic concept of blockchain in previous modules, we now turn our attention to the intricate technical aspects that make this revolutionary technology possible.
                    </p>

                    <p>
                      In this module, we will unpack the core components that comprise a blockchain system. We'll examine the cryptographic principles that ensure the security and integrity of the blockchain, and explore how these elements work together to create a tamper-resistant, distributed ledger. You'll gain a comprehensive understanding of different types of blockchain networks, from public to private and consortium blockchains, and learn to evaluate their strengths and weaknesses in various contexts.
                    </p>

                    <p>
                      We'll also tackle some of the most pressing challenges facing blockchain technology today, particularly issues of scalability, and discuss potential solutions being developed. The process of mining, crucial to many blockchain networks, will be thoroughly explained, along with the concept of forking and its implications for blockchain evolution.
                    </p>

                    <p>
                      Beyond the technical aspects, this module will bridge theory and practice by examining real-world applications of blockchain across various industries. We'll explore how smart contracts are revolutionising automated, trustless transactions, and discuss the potential future developments in this rapidly evolving field.
                    </p>

                    <p>
                      By the end of this module, you'll have a robust understanding of blockchain technology, equipping you with the knowledge to critically assess its applications and potential impact across different sectors. Whether you're aiming to develop blockchain solutions, integrate them into existing systems, or simply gain a deeper understanding of this transformative technology, this module will provide you with the comprehensive insights you need.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">Learning Objectives</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Explain the core components and architecture of a blockchain system</li>
                    <li>Analyse the role of cryptography in ensuring blockchain security and integrity</li>
                    <li>Compare and contrast different types of blockchain networks (public, private, and consortium)</li>
                    <li>Evaluate the scalability challenges faced by blockchain systems and potential solutions</li>
                    <li>Describe the process of mining and its role in maintaining the blockchain</li>
                    <li>Discuss the concept of forking in blockchain and its implications</li>
                    <li>Examine real-world applications of blockchain technology across various industries</li>
                    <li>Assess the advantages and limitations of blockchain technology in different use cases</li>
                    <li>Explain the concept of smart contracts and their implementation on blockchain platforms</li>
                    <li>Analyse the future trends and potential developments in blockchain technology</li>
                  </ul>

                  <div className="mt-8 flex justify-center">
                    <Link href="/modules/module3/blockchain-architecture">
                      <Button 
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start First Topic
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Module Content</h2>
                <p className="text-muted-foreground mb-6">
                  The content for this module is being prepared. Check back soon for detailed lessons on advanced blockchain technology concepts.
                </p>
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