import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, Shield, Key, Wallet, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

export default function SecurityRiskSection() {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedTab, setSelectedTab] = useState("basics");
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'security-risk', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const newItems = { ...prev, [id]: !prev[id] };
      // Show encouraging toast message when checking items
      if (!prev[id]) {
        toast({
          title: "Great progress!",
          description: "Keep going with the security checklist!",
          duration: 2000
        });
      }
      return newItems;
    });
  };

  const securityChecklist = [
    {
      id: "backup",
      title: "Create Wallet Backup",
      description: "Write down your seed phrase on paper (never digitally)"
    },
    {
      id: "verify",
      title: "Verify Recovery Process",
      description: "Test restoring your wallet with the backup phrase"
    },
    {
      id: "2fa",
      title: "Enable 2FA",
      description: "Set up two-factor authentication on exchanges"
    },
    {
      id: "storage",
      title: "Secure Storage",
      description: "Use hardware wallet for large amounts"
    }
  ];

  const realWorldExamples = [
    {
      title: "Mt. Gox Hack (2014)",
      description: "Loss of 850,000 BTC due to poor security practices",
      lessons: [
        "Don't keep large amounts on exchanges",
        "Use reputable exchanges with proven security",
        "Withdraw to personal wallet regularly"
      ]
    },
    {
      title: "Phishing Attacks",
      description: "Users tricked into revealing private keys",
      lessons: [
        "Never share your private keys or seed phrase",
        "Double-check website URLs",
        "Be wary of unexpected 'support' messages"
      ]
    }
  ];

  const riskLevels = [
    {
      level: "Low Risk",
      practices: [
        "Using hardware wallet",
        "Small regular purchases",
        "Backup phrase in safe"
      ],
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />
    },
    {
      level: "High Risk",
      practices: [
        "Keeping large amounts on exchanges",
        "Sharing private keys",
        "Using weak passwords"
      ],
      icon: <XCircle className="h-6 w-6 text-red-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          2.3 Bitcoin Security and Risk Management
        </motion.h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Security Basics</TabsTrigger>
            <TabsTrigger value="examples">Real Examples</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Essential Security Checklist</h2>
                <div className="space-y-4">
                  {securityChecklist.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id]}
                        onCheckedChange={() => handleCheckItem(item.id)}
                      />
                      <div>
                        <label
                          htmlFor={item.id}
                          className="text-lg font-medium cursor-pointer"
                        >
                          {item.title}
                        </label>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Risk Levels</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {riskLevels.map((risk) => (
                    <motion.div
                      key={risk.level}
                      className="p-4 rounded-lg border"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {risk.icon}
                        <h3 className="text-lg font-semibold">{risk.level}</h3>
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        {risk.practices.map((practice, index) => (
                          <li key={index} className="text-gray-600">{practice}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples">
            <div className="space-y-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-semibold text-blue-700">{example.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{example.description}</p>
                  <h4 className="font-semibold mb-2">Key Lessons:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {example.lessons.map((lesson, idx) => (
                      <li key={idx} className="text-gray-600">{lesson}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">Security Practice</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Test Your Knowledge</h3>
                  <p className="text-gray-700">
                    Practice these security measures in a safe environment:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Create a test wallet (no real funds)</li>
                    <li>Practice the backup and recovery process</li>
                    <li>Learn to identify phishing attempts</li>
                    <li>Understand different wallet types</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {isFullyRead && (
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Security and Risk Management section.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module2">
                <Button variant="outline" className="w-full md:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                </Button>
              </Link>

              <Link href="/modules/module2/exercises">
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                  Next: Practical Exercises <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}