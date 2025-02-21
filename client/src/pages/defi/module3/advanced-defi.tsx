import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Zap, Shield, BarChart4, Coins, Lock, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";

const sections = [
  {
    id: "flash-loans",
    title: "Flash Loans & MEV",
    icon: Zap,
    progress: 33,
    content: () => (
      <div className="space-y-4">
        <p className="text-gray-800">
          Flash loans are a groundbreaking DeFi innovation that allows users to borrow assets without collateral,
          provided the loan is repaid within the same transaction block.
        </p>
        <div className="grid gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-2">Key Concepts</h4>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <span>Arbitrage across multiple DEXs</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span>Collateral swaps in lending protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <BarChart4 className="w-5 h-5 text-purple-600" />
                <span>Self-liquidation to avoid penalties</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "liquidity",
    title: "Advanced Liquidity",
    icon: Coins,
    progress: 66,
    content: () => (
      <div className="space-y-4">
        <p className="text-gray-800">
          Concentrated liquidity represents a paradigm shift in AMM design, allowing LPs to provide liquidity
          within specific price ranges for maximum capital efficiency.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2">Benefits</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Higher capital efficiency</li>
              <li>• Increased fee generation</li>
              <li>• Custom price range selection</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2">Risks</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Price range exits</li>
              <li>• Impermanent loss exposure</li>
              <li>• Active management required</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "security",
    title: "Security & Risk Management",
    icon: Lock,
    progress: 100,
    content: () => (
      <div className="space-y-4">
        <p className="text-gray-800">
          Advanced security practices are crucial for protecting assets and ensuring protocol safety in DeFi.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2">Smart Contract Security</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Code audits</li>
              <li>• Formal verification</li>
              <li>• Bug bounties</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2">Protocol Safety</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Insurance coverage</li>
              <li>• Emergency procedures</li>
              <li>• Risk parameters</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2">User Protection</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Hardware wallets</li>
              <li>• Multi-sig setups</li>
              <li>• Transaction monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
];

const AdvancedDefi = () => {
  const { updateProgress } = useProgress();
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();
  const [hasUpdatedProgress, setHasUpdatedProgress] = useState(false);

  // Enrollment handling with proper error states
  const { data: enrollments, isLoading: loadingEnrollments, error: enrollmentError } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const isEnrolled = enrollments?.some(
    (enrollment: any) => enrollment.courseId === 3
  );

  useEffect(() => {
    if (!isEnrolled || hasUpdatedProgress || loadingEnrollments) {
      return;
    }

    const initializeProgress = async () => {
      try {
        await updateProgress(
          3,
          sections[currentSection].id,
          true,
          currentSection + 1,
          undefined,
          undefined,
          undefined,
          '/defi/module3/advanced-defi',
          'DeFi'
        );
        setHasUpdatedProgress(true);
      } catch (error) {
        console.error('Failed to update progress:', error);
        toast({
          title: "Error",
          description: "Failed to update progress",
          variant: "destructive",
        });
      }
    };

    initializeProgress();
  }, [currentSection, updateProgress, toast, isEnrolled, hasUpdatedProgress, loadingEnrollments]);

  // Update progress when section changes
  useEffect(() => {
    if (!isEnrolled || loadingEnrollments) {
      return;
    }

    setHasUpdatedProgress(false);
  }, [currentSection, isEnrolled, loadingEnrollments]);

  // Show loading state
  if (loadingEnrollments) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <RefreshCw className="h-8 w-8 text-purple-500" />
          </motion.div>
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (enrollmentError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
          <p className="text-gray-600 mb-4">Failed to load course content. Please try again later.</p>
          <Link href="/defi/module3">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Course Enrollment Required</h1>
          <p className="mb-6">Please enroll in the DeFi course to access this content.</p>
          <Link href="/defi/module3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const CurrentSectionContent = sections[currentSection].content;
  const IconComponent = sections[currentSection].icon;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto rounded-lg shadow-lg p-8 bg-white">
        <div className="mb-6">
          <Link href="/defi/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
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
                Advanced DeFi Concepts and Strategies
              </CardTitle>
              <p className="text-purple-100 mt-2">
                Master advanced DeFi mechanisms and risk management strategies
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Section Progress</p>
                  <p className="text-sm font-medium text-purple-600">
                    {sections[currentSection].progress}%
                  </p>
                </div>
                <Progress value={sections[currentSection].progress} className="bg-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <IconComponent className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-purple-800">
                  {sections[currentSection].title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CurrentSectionContent />
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Previous Section
            </Button>

            {currentSection < sections.length - 1 ? (
              <Button
                onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
                className="bg-purple-600 hover:bg-purple-700 gap-2"
              >
                Next Section <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Link href="/defi/module3/quiz">
                <Button className="bg-green-600 hover:bg-green-700">
                  Take Quiz
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedDefi;