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
  Fingerprint, HardDrive, SmartphoneCharging, Info, AlertCircle,
  Landmark, History
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

const WalletCard = ({ name, description, features, price, link, recommendedFor, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-lg bg-white shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
    <p className="text-gray-600 mt-2">{description}</p>
    <div className="mt-4">
      <h4 className="font-medium text-gray-700">Key Features:</h4>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
        {features.map((feature, idx) => (
          <li key={idx} className="text-gray-600">{feature}</li>
        ))}
      </ul>
    </div>
    <div className="mt-4 flex justify-between items-center text-sm">
      <span className="font-medium text-gray-700">Price: {price}</span>
      <span className="text-blue-600">Best for: {recommendedFor}</span>
    </div>
  </motion.div>
);

const ExchangeCard = ({ name, description, features, setupSteps, fees, link, recommendedFor, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-lg bg-white shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
    <p className="text-gray-600 mt-2">{description}</p>
    <div className="mt-4 space-y-4">
      <div>
        <h4 className="font-medium text-gray-700">Key Features:</h4>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="text-gray-600">{feature}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-gray-700">Account Setup:</h4>
        <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
          {setupSteps.map((step, idx) => (
            <li key={idx} className="text-gray-600">{step}</li>
          ))}
        </ol>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center text-sm">
      <span className="font-medium text-gray-700">Fees: {fees}</span>
      <span className="text-blue-600">Best for: {recommendedFor}</span>
    </div>
  </motion.div>
);

const DisasterCard = ({ title, date, description, impact, lessons }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-lg bg-white shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-2">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <p className="text-gray-600 mt-2">{description}</p>
    <div className="mt-4">
      <h4 className="font-medium text-gray-700">Impact:</h4>
      <p className="text-gray-600 mt-1 text-sm">{impact}</p>
    </div>
    <div className="mt-4">
      <h4 className="font-medium text-gray-700">Key Lessons:</h4>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
        {lessons.map((lesson, idx) => (
          <li key={idx} className="text-gray-600">{lesson}</li>
        ))}
      </ul>
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

  const walletRecommendations = {
    hardware: [
      {
        name: "Ledger Nano S Plus",
        description: "Popular hardware wallet with a screen for transaction verification",
        features: [
          "Supports 5500+ coins and tokens",
          "Built-in screen for security",
          "Certified secure element chip"
        ],
        price: "$79",
        link: "https://shop.ledger.com/",
        recommendedFor: "Long-term storage",
        icon: HardDrive
      },
      {
        name: "Trezor Model T",
        description: "Premium hardware wallet with touchscreen interface",
        features: [
          "Colored touchscreen",
          "Open-source software",
          "Advanced recovery options"
        ],
        price: "$219",
        link: "https://trezor.io/",
        recommendedFor: "Advanced users",
        icon: HardDrive
      }
    ],
    software: [
      {
        name: "Blue Wallet",
        description: "User-friendly mobile Bitcoin wallet",
        features: [
          "Built specifically for Bitcoin",
          "Lightning Network support",
          "Open source"
        ],
        price: "Free",
        link: "https://bluewallet.io/",
        recommendedFor: "Beginners",
        icon: Wallet
      },
      {
        name: "Exodus",
        description: "Desktop and mobile wallet with built-in exchange",
        features: [
          "Beautiful interface",
          "Built-in exchange",
          "Multiple device sync"
        ],
        price: "Free",
        link: "https://exodus.com/",
        recommendedFor: "Multi-coin users",
        icon: Wallet
      }
    ]
  };

  const exchangeGuide = [
    {
      name: "Coinbase",
      description: "Most popular US-based exchange, ideal for beginners",
      features: [
        "User-friendly interface",
        "Strong security measures",
        "Educational rewards program",
        "24/7 customer support"
      ],
      setupSteps: [
        "Visit coinbase.com and click 'Get started'",
        "Verify your email and phone number",
        "Add payment method (bank account/card)",
        "Complete ID verification",
        "Enable 2-factor authentication"
      ],
      fees: "Variable, typically 0.5% - 1.5% per trade",
      link: "https://www.coinbase.com/",
      recommendedFor: "Beginners",
      icon: Landmark
    },
    {
      name: "Kraken",
      description: "Established exchange with advanced features",
      features: [
        "Advanced trading features",
        "Strong security track record",
        "Competitive fees",
        "Multiple currency pairs"
      ],
      setupSteps: [
        "Go to kraken.com and create account",
        "Verify email and set up 2FA",
        "Complete identity verification",
        "Add funding method",
        "Start with basic trading interface"
      ],
      fees: "0.16% - 0.26% maker-taker fees",
      link: "https://www.kraken.com/",
      recommendedFor: "Advanced users",
      icon: Landmark
    }
  ];

  const cryptoDisasters = [
    {
      title: "FTX Collapse",
      date: "November 2022",
      description: "One of the largest cryptocurrency exchanges, FTX, collapsed due to misuse of customer funds and fraudulent practices.",
      impact: "Over $8 billion in customer funds lost, affecting millions of users worldwide.",
      lessons: [
        "Don't keep large amounts on exchanges",
        "Be wary of seemingly 'too good to be true' yields",
        "Research exchange leadership and practices",
        "Understand the risks of centralized platforms"
      ]
    },
    {
      title: "Mt. Gox Hack",
      date: "February 2014",
      description: "Mt. Gox, then the largest Bitcoin exchange, lost 850,000 BTC to hackers.",
      impact: "Approximately $450 million worth of Bitcoin stolen (at 2014 prices).",
      lessons: [
        "Use reputable exchanges with proven security",
        "Withdraw to personal wallets regularly",
        "Don't trust centralized exchanges with large amounts",
        "Always enable maximum security features"
      ]
    },
    {
      title: "Terra/LUNA Collapse",
      date: "May 2022",
      description: "The collapse of the Terra/LUNA ecosystem and its UST stablecoin.",
      impact: "Over $40 billion in market value wiped out in days.",
      lessons: [
        "Understand the risks of algorithmic stablecoins",
        "Don't invest more than you can afford to lose",
        "Diversify your crypto investments",
        "Be cautious of high yield promises"
      ]
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
          <TabsList className="grid w-full grid-cols-6 gap-4 bg-transparent">
            <TabsTrigger 
              value="basics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Basics
            </TabsTrigger>
            <TabsTrigger 
              value="wallets"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Wallets
            </TabsTrigger>
            <TabsTrigger 
              value="exchanges"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Landmark className="h-4 w-4 mr-2" />
              Exchanges
            </TabsTrigger>
            <TabsTrigger 
              value="disasters"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger 
              value="threats"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Threats
            </TabsTrigger>
            <TabsTrigger 
              value="protection"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Lock className="h-4 w-4 mr-2" />
              Protection
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

          <TabsContent value="wallets">
            <SecurityCard 
              title="Wallet Recommendations" 
              icon={Wallet}
              className="bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Hardware Wallets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {walletRecommendations.hardware.map((wallet, index) => (
                      <WalletCard key={index} {...wallet} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Software Wallets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {walletRecommendations.software.map((wallet, index) => (
                      <WalletCard key={index} {...wallet} />
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">Important Safety Tips:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Always download wallets from official websites only</li>
                    <li>Start with small amounts while learning</li>
                    <li>Consider using both hardware and software wallets for different purposes</li>
                    <li>Never store your recovery phrase digitally or share it with anyone</li>
                  </ul>
                </div>
              </div>
            </SecurityCard>
          </TabsContent>

          <TabsContent value="exchanges">
            <SecurityCard 
              title="Exchange Guide" 
              icon={Landmark}
              className="bg-gradient-to-br from-green-50 to-teal-50"
            >
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-green-100 mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">Before You Start:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Have your ID ready for verification (passport or driver's license)</li>
                    <li>Use a secure email address</li>
                    <li>Install an authenticator app for 2FA</li>
                    <li>Prepare a secure method for recording credentials</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {exchangeGuide.map((exchange, index) => (
                    <ExchangeCard key={index} {...exchange} />
                  ))}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <h4 className="font-semibold text-yellow-800 mb-2">Exchange Safety Tips:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Always enable two-factor authentication (2FA)</li>
                    <li>Use a strong, unique password</li>
                    <li>Verify the exchange URL before logging in</li>
                    <li>Start with small amounts to test the process</li>
                    <li>Don't keep large amounts on exchanges long-term</li>
                    <li>Regularly check your account activity</li>
                  </ul>
                </div>
              </div>
            </SecurityCard>
          </TabsContent>

          <TabsContent value="disasters">
            <SecurityCard 
              title="Major Crypto Disasters" 
              icon={History}
              className="bg-gradient-to-br from-red-50 to-orange-50"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {cryptoDisasters.map((disaster, index) => (
                    <DisasterCard key={index} {...disaster} />
                  ))}
                </div>

                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-2">Common Themes & Takeaways:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Centralized entities pose significant risks</li>
                    <li>Security should always be the top priority</li>
                    <li>If returns seem too good to be true, they probably are</li>
                    <li>Self-custody is the safest option for long-term storage</li>
                    <li>The importance of doing thorough research</li>
                  </ul>
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