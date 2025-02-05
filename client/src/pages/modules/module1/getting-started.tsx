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

    forceScrollTop();
    setTimeout(forceScrollTop, 0);
    requestAnimationFrame(() => {
      forceScrollTop();
      requestAnimationFrame(forceScrollTop);
    });
  }, []);

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
                  Think of cryptocurrency as a new language - it takes time to learn, but with the right guidance, 
                  anyone can understand it. This guide will walk you through your first steps, just like having 
                  a friendly mentor by your side.
                </p>
              </div>

              <GettingStartedDiagram />

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Beginner's Checklist 🎯</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Learn the Basics:</strong> Just like learning to drive, start by understanding 
                    how things work before getting behind the wheel
                  </li>
                  <li>
                    <strong>Choose Trusted Tools:</strong> Pick well-known exchanges and wallets, like 
                    choosing a bank for your traditional money
                  </li>
                  <li>
                    <strong>Practice Safety:</strong> Think of security like locking your house - it's 
                    essential to protect your digital assets
                  </li>
                  <li>
                    <strong>Start Small:</strong> Begin with small amounts while you're learning, 
                    like using training wheels when learning to ride a bike
                  </li>
                  <li>
                    <strong>Keep Records:</strong> Track your transactions like you would track expenses 
                    in your regular budget
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-yellow-800 font-semibold">
                  💡 Pro Tip: Don't feel pressured to invest right away. It's okay to spend time learning 
                  and observing. Many successful crypto users spent months learning before making their first transaction.
                </p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Security Best Practices</h2>
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <p className="text-gray-700">
                  Think of cryptocurrency security like protecting your home - you need multiple layers of protection. 
                  Here's how to keep your digital assets safe:
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <ul className="list-disc pl-5 space-y-4 text-gray-700">
                  <li>
                    <strong>Strong Passwords:</strong> Use unique, complex passwords for each account. 
                    Think: "MyFirst#Crypto2024!" instead of "password123"
                  </li>
                  <li>
                    <strong>Two-Factor Authentication (2FA):</strong> It's like having both a key and an alarm 
                    code for your house - even if someone gets your password, they can't get in without the second factor
                  </li>
                  <li>
                    <strong>Secure Storage:</strong> Keep your private keys and recovery phrases as safe as you'd 
                    keep your passport or birth certificate
                  </li>
                  <li>
                    <strong>Hardware Wallets:</strong> For larger amounts, use a hardware wallet - it's like 
                    having a personal safe for your digital money
                  </li>
                  <li>
                    <strong>Phishing Awareness:</strong> Be cautious of unexpected emails or messages asking 
                    about your crypto - legitimate services will never ask for your private keys
                  </li>
                  <li>
                    <strong>Regular Updates:</strong> Keep your software up-to-date, just like you'd maintain 
                    your car to keep it running safely
                  </li>
                  <li>
                    <strong>Double-Check Everything:</strong> Verify all transaction details carefully - crypto 
                    transactions can't be reversed like bank transfers
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <h4 className="text-red-800 font-semibold mb-2">⚠️ Warning Signs to Watch For:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Anyone pressuring you to invest quickly</li>
                  <li>Promises of guaranteed returns</li>
                  <li>Requests to share your private keys or recovery phrases</li>
                  <li>Unsolicited investment advice from strangers</li>
                  <li>Websites with URLs that look slightly different from official ones</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Practical Storage Tips</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Essential Security Guidelines</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Never Share Private Information</h4>
                    <p className="text-gray-700">
                      Your private keys and recovery phrases are like the master key to your house - never share 
                      them with anyone, not even if they claim to be support staff.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Use Multiple Wallets</h4>
                    <p className="text-gray-700">
                      Consider having separate wallets for different purposes - like having a checking account 
                      for daily use and a savings account for long-term storage.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Backup Everything</h4>
                    <p className="text-gray-700">
                      Store your wallet information in multiple secure locations, like keeping copies of important 
                      documents in both a home safe and a bank vault.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Test Before Large Transfers</h4>
                    <p className="text-gray-700">
                      Always send a small test amount first when using a new wallet or address - think of it 
                      like trying a new route before making a long journey.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Recommended Tools and Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="p-6 bg-gray-50">
                  <h3 className="font-semibold text-blue-700 mb-4">Essential Security Tools</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">🔐 Hardware Wallets:</span>
                      <span>Physical devices that keep your crypto extra secure (recommended for amounts over $1,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">🔑 Password Managers:</span>
                      <span>Help you create and store strong, unique passwords for all your accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">📱 Authentication Apps:</span>
                      <span>Add an extra layer of security to your accounts (better than SMS verification)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">💾 Backup Solutions:</span>
                      <span>Secure ways to store your recovery phrases and important information</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-gray-50">
                  <h3 className="font-semibold text-blue-700 mb-4">Learning Resources</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">📚 Educational Platforms:</span>
                      <span>Free courses and tutorials from reputable sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">👥 Community Forums:</span>
                      <span>Places to learn from experienced users (but be careful of scammers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">🛡️ Security Guides:</span>
                      <span>Updated information on keeping your assets safe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">📊 Analysis Tools:</span>
                      <span>Help you understand market trends and make informed decisions</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <p className="text-green-800">
                  🌟 Remember: The best investment you can make is in your education. Take your time to learn 
                  and understand before making any financial commitments.
                </p>
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