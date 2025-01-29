import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Scale, Network, Code } from "lucide-react";

const moduleTopics = [
  {
    id: "scalability-interoperability",
    title: "3.1 Blockchain Scalability and Interoperability",
    path: "/modules/module3/scalability-interoperability",
    icon: Scale,
    subsections: [
      "The Scalability Trilemma",
      "Scalability Challenges and Solutions",
      "Blockchain Interoperability",
      "Cross-Chain Communication"
    ]
  },
  {
    id: "blockchain-types",
    title: "3.2 Different Types of Blockchains",
    path: "/modules/module3/blockchain-types",
    icon: Network,
    subsections: [
      "Public Blockchains",
      "Private Blockchains",
      "Consortium Blockchains",
      "Comparison of Blockchain Types"
    ]
  },
  {
    id: "development-platforms",
    title: "3.3 Blockchain Development Platforms",
    path: "/modules/module3/development-platforms",
    icon: Code,
    subsections: [
      "Ethereum Platform",
      "Solana Platform",
      "Cardano Platform",
      "Platform Comparison"
    ]
  }
];

export default function Module3() {
  const { progress } = useProgress();
  const moduleProgress = progress.filter(p => p.moduleId === 3);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const progressPercentage = (completedSections / moduleTopics.length) * 100;

  const topicsWithProgress = moduleTopics.map(topic => ({
    ...topic,
    completed: moduleProgress.some(p => p.sectionId === topic.id && p.completed)
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 3: Advanced Blockchain Technology
        </h1>

        <div className="mb-8">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progress: {Math.round(progressPercentage)}%</p>
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
                  <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
                    Course Overview
                  </h2>

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
                    <Link href="/modules/module3/scalability-interoperability">
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
                  </CardContent>
                </Card>
              ))}
            </div>
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