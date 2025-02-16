import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { 
  ArrowLeft, ArrowRight, Shield, Key, Wallet, AlertTriangle, 
  CheckCircle2, XCircle, Lock, Eye, ExternalLink, AlertOctagon,
  Fingerprint, HardDrive, SmartphoneCharging
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const SecurityIcon = ({ icon: Icon, title, description, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm ${className}`}
  >
    <Icon className="h-6 w-6 text-blue-600 mt-1" />
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const SecurityCard = ({ title, icon: Icon, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
  >
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  </motion.div>
);

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
        updateProgress(2, 'security-risk', true, 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const handleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const newItems = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        toast({
          title: "Security Step Completed! 🔒",
          description: "Keep going with your security checklist!",
          duration: 2000
        });
      }
      return newItems;
    });
  };

  const securityTips = [
    {
      icon: Lock,
      title: "Strong Password Practices",
      description: "Use unique, complex passwords for each account"
    },
    {
      icon: Fingerprint,
      title: "Two-Factor Authentication",
      description: "Enable 2FA on all important accounts"
    },
    {
      icon: HardDrive,
      title: "Backup Solutions",
      description: "Keep secure backups of your wallet information"
    },
    {
      icon: SmartphoneCharging,
      title: "Mobile Security",
      description: "Secure your mobile wallet with biometric authentication"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
        style={{
          background: "linear-gradient(to right, #3b82f6, #60a5fa)",
          scaleX: scrollProgress / 100,
          transformOrigin: "left"
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2/bitcoin-investment">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Bitcoin Investment
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Bitcoin Security and Risk Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {securityTips.map((tip, index) => (
            <SecurityIcon
              key={index}
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
              className="transform transition-all duration-200"
            />
          ))}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 gap-4 bg-transparent">
            <TabsTrigger 
              value="basics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security Basics
            </TabsTrigger>
            <TabsTrigger 
              value="threats"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Common Threats
            </TabsTrigger>
            <TabsTrigger 
              value="protection"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Lock className="h-4 w-4 mr-2" />
              Protection Measures
            </TabsTrigger>
            <TabsTrigger 
              value="practice"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Best Practices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <SecurityCard 
              title="Security Fundamentals" 
              icon={Shield}
              className="bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Understanding the basics of Bitcoin security is crucial for protecting your investments.
                  Here are the fundamental concepts you need to know:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-blue-700 mb-2">Private Keys</h3>
                    <p className="text-sm text-gray-600">
                      Your private keys are like the master key to your Bitcoin vault.
                      Never share them and keep them secure.
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-blue-700 mb-2">Wallet Security</h3>
                    <p className="text-sm text-gray-600">
                      Choose between hot wallets (online) and cold storage (offline)
                      based on your needs and risk tolerance.
                    </p>
                  </motion.div>
                </div>
              </div>
            </SecurityCard>
          </TabsContent>

          <TabsContent value="threats">
            <SecurityCard 
              title="Security Threats" 
              icon={AlertTriangle}
              className="bg-gradient-to-br from-red-50 to-orange-50"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: AlertOctagon,
                      title: "Phishing Attacks",
                      description: "Fake websites and emails that try to steal your credentials"
                    },
                    {
                      icon: Key,
                      title: "Private Key Theft",
                      description: "Malware designed to steal your private keys"
                    }
                  ].map((threat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <threat.icon className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-gray-900">{threat.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{threat.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SecurityCard>
          </TabsContent>

          <TabsContent value="protection">
            <SecurityCard 
              title="Protection Strategies" 
              icon={Lock}
              className="bg-gradient-to-br from-green-50 to-emerald-50"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Hardware Wallets",
                      description: "Use hardware wallets for large amounts",
                      icon: HardDrive
                    },
                    {
                      title: "2FA Security",
                      description: "Enable two-factor authentication everywhere",
                      icon: Fingerprint
                    }
                  ].map((strategy, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <strategy.icon className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{strategy.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SecurityCard>
          </TabsContent>

          <TabsContent value="practice">
            <SecurityCard 
              title="Security Best Practices" 
              icon={Eye}
              className="bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Use strong, unique passwords for each platform",
                    "Enable 2FA on all accounts",
                    "Keep recovery phrases in multiple secure locations",
                    "Never share private keys or seed phrases",
                    "Verify all transaction details before signing",
                    "Use test transactions for large transfers"
                  ].map((practice, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-gray-700">{practice}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SecurityCard>
          </TabsContent>
        </Tabs>

        {isFullyRead && (
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 p-6">
              <p className="text-green-700 text-lg font-medium">
                🎉 Congratulations! You've completed the Security and Risk Management section.
              </p>
              <p className="text-green-600 mt-2">
                You now understand the key concepts of Bitcoin security and risk management.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module2/bitcoin-investment">
                <Button variant="outline" className="w-full md:w-auto gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Bitcoin Investment
                </Button>
              </Link>

              <Link href="/modules/module2/exercises">
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 gap-2">
                  Next: Practical Exercises
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}