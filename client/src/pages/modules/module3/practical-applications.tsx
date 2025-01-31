import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Database, ShoppingCart, Building2, Vote, Hospital, Plane } from "lucide-react";

const PracticalApplicationsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'practical-applications', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const applications = [
    {
      icon: ShoppingCart,
      title: "Supply Chain Management",
      description: "Track products from origin to consumer with complete transparency and authenticity verification.",
      examples: [
        "IBM Food Trust - tracking food products",
        "VeChain - luxury goods authentication",
        "Walmart's blockchain initiative"
      ]
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Tokenize property ownership, streamline transactions, and maintain transparent property records.",
      examples: [
        "Property title registration",
        "Fractional ownership platforms",
        "Smart contract-based rentals"
      ]
    },
    {
      icon: Vote,
      title: "Voting Systems",
      description: "Secure, transparent, and tamper-proof electronic voting platforms.",
      examples: [
        "Municipal voting pilots",
        "Corporate governance",
        "Community decision making"
      ]
    },
    {
      icon: Hospital,
      title: "Healthcare",
      description: "Secure medical records, clinical trials data management, and drug supply chain verification.",
      examples: [
        "MedRec - medical records",
        "Clinical trial tracking",
        "Pharmaceutical supply chain"
      ]
    },
    {
      icon: Plane,
      title: "Travel and Tourism",
      description: "Baggage tracking, loyalty programs, and digital identity verification.",
      examples: [
        "Airline loyalty programs",
        "Hotel booking platforms",
        "Travel insurance claims"
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.3 Practical Applications of Blockchain Technology
        </motion.h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-blue-700">Introduction</h2>
              <p className="text-gray-700">
                While blockchain technology gained prominence through cryptocurrencies, its potential applications extend far beyond digital currencies. This section explores how blockchain is transforming various industries and creating new possibilities for business and society.
              </p>

              <div className="grid gap-6 mt-8">
                {applications.map((app, index) => (
                  <motion.div
                    key={app.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-100">
                          <app.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-blue-700 mb-2">
                            {app.title}
                          </h3>
                          <p className="text-gray-700 mb-4">{app.description}</p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-600 mb-2">Real-World Examples:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              {app.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </CardContent>
        </Card>

        <ModuleNavigation
          prev={{
            path: "/modules/module3/blockchain-types",
            label: "Types of Blockchains"
          }}
          next={{
            path: "/modules/module3/quiz",
            label: "Module Quiz"
          }}
        />

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Practical Applications section!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PracticalApplicationsSection;
