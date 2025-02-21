import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { 
  ArrowLeft, 
  Building2, 
  Percent, 
  Shield, 
  AlertTriangle, 
  BookOpen,
  DollarSign,
  TrendingUp,
  Lock,
  Coins,
  BarChart3,
  Scale
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Animation variants for content sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function LendingBorrowing() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Understanding DeFi Lending",
      icon: Building2,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            DeFi lending platforms revolutionize traditional borrowing by eliminating intermediaries and enabling peer-to-peer transactions through smart contracts. These protocols allow users to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Earn interest by providing liquidity to lending pools</li>
            <li>Borrow assets using cryptocurrency as collateral</li>
            <li>Access loans without traditional credit checks</li>
            <li>Benefit from transparent and automated interest rates</li>
          </ul>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Concept
            </h4>
            <p className="text-blue-700">
              Smart contracts automatically manage the entire lending process, from collateral lockup to interest rate adjustments and liquidations.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Interest Rate Mechanisms",
      icon: Percent,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50">
              <h4 className="text-purple-800 font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Variable Rates
              </h4>
              <p className="text-gray-700">
                Dynamically adjusted based on supply and demand in the lending pool
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-full bg-purple-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-sm text-purple-700">Utilization</span>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
              <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Fixed Rates
              </h4>
              <p className="text-gray-700">
                Stable interest rates locked for specific time periods
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-sm text-blue-700">Usage</span>
              </div>
            </Card>
          </div>
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-yellow-800 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Consideration
            </h4>
            <p className="text-yellow-700">
              Interest rates fluctuate based on market conditions and utilization ratios. Higher utilization leads to higher borrowing costs to maintain pool liquidity.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Collateralization Ratios",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <h4 className="text-emerald-800 font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6" />
              Understanding Collateral Ratios
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                className="bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <Coins className="h-4 w-4 text-emerald-600" />
                </div>
                <h5 className="font-medium text-emerald-700 mb-1">Over-collateralization</h5>
                <p className="text-sm text-gray-600">
                  Borrowers must provide collateral worth more than their loan value
                </p>
              </motion.div>
              <motion.div
                className="bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                </div>
                <h5 className="font-medium text-emerald-700 mb-1">Ratio Calculation</h5>
                <p className="text-sm text-gray-600">
                  Typical ratios range from 150% to 200% depending on asset volatility
                </p>
              </motion.div>
              <motion.div
                className="bg-white p-4 rounded-lg shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <AlertTriangle className="h-4 w-4 text-emerald-600" />
                </div>
                <h5 className="font-medium text-emerald-700 mb-1">Liquidation Risk</h5>
                <p className="text-sm text-gray-600">
                  Positions are liquidated if collateral value falls below threshold
                </p>
              </motion.div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation</h4>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">If you want to borrow $1,000 USDC with a 150% collateral ratio:</p>
                  <p className="font-medium text-gray-800 mt-2">
                    Required Collateral = $1,000 × 150% = $1,500 worth of assets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleSectionComplete = async (index: number) => {
    try {
      await updateProgress({
        courseId: 3,
        moduleId: 4,
        sectionId: 'lending-borrowing',
        completed: true,
        subsectionId: `subsection-${index + 1}`,
        type: 'section',
        progress: ((index + 1) / sections.length) * 100,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Progress Updated",
        description: "Section completed successfully!",
      });

      if (index < sections.length - 1) {
        setCurrentSection(index + 1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <CardTitle className="text-3xl font-bold">
                Lending & Borrowing in DeFi
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Master the fundamentals of decentralized lending and borrowing protocols
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-purple-600">
                    {Math.round((currentSection / sections.length) * 100)}%
                  </p>
                </div>
                <Progress 
                  value={(currentSection / sections.length) * 100} 
                  className="bg-purple-100"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${
                index === currentSection ? 'border-2 border-purple-500' : ''
              } rounded-lg overflow-hidden`}
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6 text-purple-500" />
                    <CardTitle className="text-xl font-semibold text-purple-800">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {section.content}
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => handleSectionComplete(index)}
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={index !== currentSection}
                    >
                      {index === sections.length - 1 ? "Complete Topic" : "Next Section"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}