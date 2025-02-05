import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Wallet, BookOpen } from "lucide-react";
import { GettingStartedQuiz } from "@/components/quizzes/GettingStartedQuiz";
import { SecurityIcon, WalletIcon } from "@/components/icons/CryptoIcons";
import { GettingStartedDiagram } from "@/components/diagrams/GettingStartedDiagram";

const GettingStartedSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  // Add aggressive scroll-to-top on mount
  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Initial scroll
    forceScrollTop();

    // Backup scroll after a short delay
    setTimeout(forceScrollTop, 0);

    // Final scroll after animations
    requestAnimationFrame(() => {
      forceScrollTop();
      // Double check after one more frame
      requestAnimationFrame(forceScrollTop);
    });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'getting-started', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Module Overview
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Your First Steps into Cryptocurrency
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            {/* Introduction Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Welcome to Your Crypto Journey
              </h2>
              <p className="text-gray-700 mt-4">
                Starting your cryptocurrency journey can feel overwhelming, but don't worry! 
                We'll break it down into simple, manageable steps. Think of it like learning 
                to swim - you'll start in the shallow end with basic concepts before diving deeper.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg my-4">
                <h3 className="text-lg font-semibold text-blue-800">Before You Begin</h3>
                <p className="text-gray-700">
                  Just like you wouldn't jump into a pool without knowing how to swim, 
                  it's important to understand the basics before investing any money in 
                  cryptocurrency. This guide will help you build a strong foundation.
                </p>
              </div>
            </section>

            {/* Essential Knowledge Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                Essential Knowledge First
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-white border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700 mb-2">What You'll Need</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Basic computer skills</li>
                    <li>Secure internet connection</li>
                    <li>Strong passwords</li>
                    <li>Note-taking tools</li>
                    <li>Critical thinking mindset</li>
                  </ul>
                </Card>

                <Card className="p-4 bg-white border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-700 mb-2">What You'll Learn</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>How to secure your assets</li>
                    <li>Understanding wallets</li>
                    <li>Safe trading practices</li>
                    <li>Risk management</li>
                    <li>Common pitfalls to avoid</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700">Your First Steps</h2>

              <div className="space-y-6 mt-4">
                {/* Step 1: Education */}
                <Card className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">Step 1: Learn the Basics</h3>
                      <p className="text-gray-700 mt-2">
                        Before making any investments, understand:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                        <li><strong>What is cryptocurrency?</strong> - Digital money that uses cryptography for security</li>
                        <li><strong>How does it work?</strong> - Through a technology called blockchain</li>
                        <li><strong>What are the risks?</strong> - Price volatility, security concerns, regulatory changes</li>
                        <li><strong>What are the benefits?</strong> - Fast transfers, potential investment growth, financial innovation</li>
                      </ul>
                      <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                        <p className="text-yellow-800">
                          💡 Tip: Take notes and don't rush. Understanding the basics will help you make better decisions later.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Step 2: Security */}
                <Card className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800">Step 2: Set Up Security</h3>
                      <p className="text-gray-700 mt-2">
                        Security is crucial in cryptocurrency. Think of it like setting up a digital vault:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-purple-700">Essential Security Measures:</h4>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                            <li>Use strong, unique passwords</li>
                            <li>Enable two-factor authentication (2FA)</li>
                            <li>Use a password manager</li>
                            <li>Keep software updated</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-purple-700">Red Flags to Watch For:</h4>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                            <li>Unsolicited investment advice</li>
                            <li>Promises of guaranteed returns</li>
                            <li>Pressure to act quickly</li>
                            <li>Requests to share private keys</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Step 3: Wallets */}
                <Card className="p-6 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Wallet className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-800">Step 3: Choose Your First Wallet</h3>
                      <p className="text-gray-700 mt-2">
                        A cryptocurrency wallet is like a digital bank account. Here's how to get started:
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-green-700">Types of Wallets:</h4>
                          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                            <li>
                              <strong>Software Wallets</strong> (Mobile/Desktop)
                              <p className="text-sm">Good for beginners, convenient for small amounts</p>
                            </li>
                            <li>
                              <strong>Hardware Wallets</strong>
                              <p className="text-sm">Best for storing larger amounts, more secure but requires investment</p>
                            </li>
                            <li>
                              <strong>Paper Wallets</strong>
                              <p className="text-sm">Offline storage, not recommended for beginners</p>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-green-800">
                            🔑 Remember: Your wallet's recovery phrase is like the master key to your funds. 
                            Write it down on paper and store it safely. Never store it digitally or share it with anyone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Practical Tips */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700">Practical Tips for Beginners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="p-4 bg-white">
                  <h3 className="font-semibold text-blue-700 mb-2">DO's</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Start with small amounts</li>
                    <li>Research before investing</li>
                    <li>Keep detailed records</li>
                    <li>Use reputable exchanges</li>
                    <li>Backup your wallet information</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-white">
                  <h3 className="font-semibold text-red-700 mb-2">DON'Ts</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Invest more than you can afford to lose</li>
                    <li>Share private keys or recovery phrases</li>
                    <li>Fall for get-rich-quick schemes</li>
                    <li>Trust unsolicited advice</li>
                    <li>Forget to consider taxes</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Common Mistakes to Avoid */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-700">Common Beginner Mistakes</h2>
              <div className="bg-red-50 p-6 rounded-lg mt-4">
                <ul className="space-y-4">
                  {[
                    {
                      title: "FOMO Trading",
                      description: "Buying because of fear of missing out. Always research and make informed decisions."
                    },
                    {
                      title: "Poor Security Practices",
                      description: "Using weak passwords or sharing private keys. Security should always be your top priority."
                    },
                    {
                      title: "No Backup Plan",
                      description: "Not properly backing up wallet information. Always have secure backups of important data."
                    },
                    {
                      title: "Overinvesting",
                      description: "Investing more than you can afford to lose. Start small and learn as you go."
                    }
                  ].map((mistake, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="text-red-500 font-bold">❌</div>
                      <div>
                        <h4 className="font-semibold text-red-800">{mistake.title}</h4>
                        <p className="text-gray-700">{mistake.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Next Steps */}
            <section>
              <h2 className="text-2xl font-bold text-blue-700">Ready to Start?</h2>
              <div className="bg-blue-50 p-6 rounded-lg mt-4">
                <p className="text-blue-800">
                  Remember: The crypto world is constantly evolving. Stay informed, start small, 
                  and never stop learning. Your journey is just beginning!
                </p>
                <div className="mt-4 flex gap-4">
                  <Link href="/modules/module1/security">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Next: Understanding Security
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        {isFullyRead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Getting Started Safely section!
              </p>
            </Card>

            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
            </Button>

            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mt-4">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                    <GettingStartedQuiz />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex justify-between mt-4">
              <Link href="/modules/module1/applications">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Topic
                </Button>
              </Link>
              <Link href="/modules/module1/quiz">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  Take Module Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GettingStartedSection;