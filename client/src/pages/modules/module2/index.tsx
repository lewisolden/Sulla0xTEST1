import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-4"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

export default function Module2() {
  useScrollTop();
  const { progress } = useProgress();

  const sections = [
    {
      id: "bitcoin-fundamentals",
      title: "2.1 Bitcoin Fundamentals",
      description: "Learn about the birth of Bitcoin, its historical context, and how Bitcoin works.",
      href: "/modules/module2/bitcoin-fundamentals"
    },
    {
      id: "bitcoin-investment",
      title: "2.2 Bitcoin as an Investment",
      description: "Understand Bitcoin's value proposition, investment considerations, and Bitcoin ETFs.",
      href: "/modules/module2/bitcoin-investment"
    },
    {
      id: "security-risk",
      title: "2.3 Security and Risk Management",
      description: "Master essential security practices and risk management strategies for Bitcoin.",
      href: "/modules/module2/security-risk"
    },
    {
      id: "practical-exercises",
      title: "2.4 Practical Exercises",
      description: "Hands-on exercises to reinforce your understanding of Bitcoin concepts.",
      href: "/modules/module2/exercises"
    }
  ];

  const moduleProgress = progress.filter(p => p.moduleId === 2);
  const completedSections = moduleProgress.filter(p => p.completed).length;
  const totalSections = sections.length;
  const isModuleComplete = completedSections === totalSections;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <Link href="/curriculum">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Curriculum
              </Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center">
                <BitcoinLogo />
                <CardTitle className="text-2xl font-bold text-blue-800">
                  Module 2: Bitcoin Deep Dive
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  Welcome to Module 2! Before diving into Bitcoin's technical aspects, let's address some common concerns:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><strong>Do I need to buy a whole Bitcoin?</strong> No! Bitcoin is divisible into 100 million units called "satoshis" or "sats." You can start with as little as $10.</li>
                  <li><strong>Is it too technical for me?</strong> While Bitcoin uses complex technology, using it is similar to mobile banking. Start with the basics, and your understanding will grow naturally.</li>
                  <li><strong>What if I make a mistake?</strong> Start with small amounts while learning. Use test transactions and practice with minimal stakes to build confidence.</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">What You'll Learn:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>The historical context and significance of Bitcoin</li>
                  <li>How Bitcoin works as a digital currency</li>
                  <li>Investment considerations and Bitcoin ETFs</li>
                  <li>Security practices and risk management</li>
                  <li>Hands-on experience through practical exercises</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {sections.map((section) => {
              const sectionProgress = moduleProgress.find(p => p.sectionId === section.id);
              const isComplete = sectionProgress?.completed || false;

              return (
                <Link key={section.id} href={section.href}>
                  <Card 
                    className="transition-all duration-300 hover:shadow-md cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-800 mb-2">
                            {section.title}
                          </h3>
                          <p className="text-gray-600">{section.description}</p>
                        </div>
                        <div className="ml-4">
                          {isComplete ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <BookOpen className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Progress summary and next module button */}
          <div className="mt-8">
            <Card className="bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Progress: {completedSections} of {totalSections} sections completed
                  </p>
                </div>
                {isModuleComplete && (
                  <Link href="/modules/module3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Continue to Module 3
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}