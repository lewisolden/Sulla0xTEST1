import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
          Getting Started Safely with Cryptocurrency
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <section>
              <h2 className="text-2xl font-bold text-blue-700">First Steps</h2>
              <div className="flex items-center gap-4 mb-4">
                <SecurityIcon size={32} className="text-blue-600" />
                <p className="text-gray-700">
                  Beginning your cryptocurrency journey requires careful preparation and understanding. This section will guide you through the essential first steps to ensure a safe and successful start.
                </p>
              </div>

              <GettingStartedDiagram />

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Getting Started Checklist</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Educate yourself about cryptocurrency basics</li>
                  <li>Choose reputable exchanges and wallets</li>
                  <li>Understand security best practices</li>
                  <li>Start with small amounts</li>
                  <li>Keep detailed records of transactions</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Security Best Practices</h2>
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <p className="text-gray-700">
                  Security is paramount in the cryptocurrency space. Following these best practices will help protect your assets:
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Use strong, unique passwords for all accounts</li>
                <li>Enable two-factor authentication (2FA)</li>
                <li>Keep private keys and recovery phrases secure</li>
                <li>Use hardware wallets for significant amounts</li>
                <li>Be cautious of phishing attempts and scams</li>
                <li>Regularly update software and applications</li>
                <li>Verify all transaction details carefully</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Storage and Access Security</h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Critical Security Tips</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Never share private keys or recovery phrases</li>
                  <li>Use different wallets for different purposes</li>
                  <li>Backup wallet information securely</li>
                  <li>Consider using multiple storage solutions</li>
                  <li>Test small transactions first</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Recommended Tools and Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-gray-50">
                  <h3 className="font-semibold text-blue-700 mb-2">Security Tools</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Hardware wallets</li>
                    <li>Password managers</li>
                    <li>Authentication apps</li>
                    <li>Secure backup solutions</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-gray-50">
                  <h3 className="font-semibold text-blue-700 mb-2">Learning Resources</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Educational platforms</li>
                    <li>Community forums</li>
                    <li>Security guides</li>
                    <li>Market analysis tools</li>
                  </ul>
                </Card>
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