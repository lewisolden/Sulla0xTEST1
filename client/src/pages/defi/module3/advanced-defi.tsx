import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Lightbulb, Zap, Shield, BarChart4, Coins, Lock, ArrowLeft, RefreshCw } from "lucide-react";

const AdvancedDefi = () => {
  const { updateProgress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  // Enrollment handling
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
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
    try {
      updateProgress(
        3,
        'defi-module3-advanced',
        true,
        1,
        undefined,
        undefined,
        undefined,
        '/defi/module3/advanced-defi',
        'DeFi'
      );
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  }, [updateProgress, toast]);

  if (!isLoaded || loadingEnrollments) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="h-8 w-8 text-purple-500" />
        </motion.div>
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Advanced DeFi Concepts and Strategies
            </h1>

            <div className="grid gap-8 mb-8">
              {/* Flash Loans and MEV Section */}
              <Card className="p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-purple-800">Flash Loans & MEV</h2>
                </div>
                <Progress value={33} className="mb-6" />

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="flash-loans" className="border-l-2 border-purple-200 pl-4">
                    <AccordionTrigger className="text-lg font-medium hover:text-purple-600">
                      Understanding Flash Loans
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-4">
                          Flash loans are a groundbreaking DeFi innovation that allows users to borrow assets without collateral, 
                          provided the loan is repaid within the same transaction block. This creates unique opportunities for:
                        </p>
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
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mev" className="border-l-2 border-purple-200 pl-4">
                    <AccordionTrigger className="text-lg font-medium hover:text-purple-600">
                      MEV (Maximal Extractable Value)
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-4">
                          MEV represents the maximum value that can be extracted from block production beyond standard block rewards. Key aspects include:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-purple-700 mb-2">Sandwich Attacks</h4>
                            <p className="text-sm text-gray-600">
                              Placing orders before and after a target transaction to profit from price movements.
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-semibold text-purple-700 mb-2">Frontrunning</h4>
                            <p className="text-sm text-gray-600">
                              Observing and preempting profitable transactions in the mempool.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>

              {/* Advanced Liquidity Section */}
              <Card className="p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Coins className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-800">Advanced Liquidity Provision</h2>
                </div>
                <Progress value={66} className="mb-6" />

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="concentrated-liquidity" className="border-l-2 border-blue-200 pl-4">
                    <AccordionTrigger className="text-lg font-medium hover:text-blue-600">
                      Concentrated Liquidity Strategies
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                        <p className="text-gray-800 mb-4">
                          Concentrated liquidity represents a paradigm shift in AMM design, allowing LPs to provide liquidity 
                          within specific price ranges for maximum capital efficiency.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>

              {/* Security Section */}
              <Card className="p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-green-800">Security & Risk Management</h2>
                </div>
                <Progress value={100} className="mb-6" />

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="security" className="border-l-2 border-green-200 pl-4">
                    <AccordionTrigger className="text-lg font-medium hover:text-green-600">
                      Advanced Security Practices
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>

            <div className="flex justify-between mt-8">
              <Link href="/defi/module3">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Module
                </Button>
              </Link>
              <Link href="/defi/module3/quiz">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Take Module Quiz
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedDefi;