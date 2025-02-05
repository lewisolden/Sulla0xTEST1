import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Shield, Key, Wallet, Lock } from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import { SecurityThreats } from "@/components/diagrams/SecurityThreats";
import { SecurityQuiz } from "@/components/quizzes/SecurityQuiz";

export default function SecurityPage() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

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
        updateProgress(1, 'security', true);
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
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            Understanding Cryptocurrency Security
          </h1>

          <div className="prose lg:prose-xl text-gray-700 space-y-6">
            {/* Private Keys Section */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Key className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Private Keys</h2>
              </div>
              <div className="space-y-4">
                <p>
                  A private key in cryptocurrency is like the master key to your digital vault. It's a unique,
                  complex string of numbers and letters that proves your ownership and allows you to access and
                  manage your cryptocurrency.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Real-World Example:</h3>
                  <p>
                    Think of your email account: your password is like a private key. If someone gets your
                    password, they can send emails as you and access all your information. Similarly, if someone
                    obtains your private key, they can access and transfer your cryptocurrency.
                  </p>
                  <div className="mt-2 text-sm">
                    Example Private Key (Never share your actual private key):
                    <code className="block bg-gray-100 p-2 rounded mt-1">
                      5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
                    </code>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2FA Section */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Two-Factor Authentication (2FA)</h2>
              </div>
              <div className="space-y-4">
                <p>
                  2FA adds an extra layer of security beyond your password. It requires two different types
                  of verification before granting access to your account.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Real-World Examples:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Google Authenticator:</strong> Generates time-based codes that change every 30 seconds
                    </li>
                    <li>
                      <strong>SMS Verification:</strong> Receiving a code via text message when logging in
                    </li>
                    <li>
                      <strong>Hardware Keys:</strong> Physical devices like YubiKey that must be plugged in
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Wallet Security Section */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Wallet Security</h2>
              </div>
              <div className="space-y-4">
                <p>
                  Your cryptocurrency wallet is your gateway to accessing and managing your digital assets.
                  Proper wallet security is crucial for protecting your investments.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Security Measures:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Hardware Wallets:</strong> Physical devices that store your private keys offline
                      (e.g., Ledger, Trezor)
                    </li>
                    <li>
                      <strong>Backup Phrases:</strong> 12-24 word recovery phrases that can restore your wallet
                      if lost or damaged
                    </li>
                    <li>
                      <strong>Multi-Signature:</strong> Requiring multiple approvals for transactions
                    </li>
                  </ul>
                  <div className="mt-4 bg-yellow-50 p-3 rounded">
                    <strong>Pro Tip:</strong> Never store your recovery phrase digitally or share it with anyone.
                    Write it down on paper and store it in a secure location.
                  </div>
                </div>
              </div>
            </Card>

            {/* Threat Protection Section */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Threat Protection</h2>
              </div>
              <div className="space-y-4">
                <p>
                  The cryptocurrency space faces various security threats. Understanding and protecting
                  against these threats is essential for safeguarding your assets.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Common Threats and Protection:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-600">Threats:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Phishing attacks</li>
                        <li>Malware</li>
                        <li>Social engineering</li>
                        <li>Fake websites</li>
                        <li>SIM swapping</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-600">Protection Measures:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use hardware wallets</li>
                        <li>Enable 2FA</li>
                        <li>Verify URLs carefully</li>
                        <li>Use strong, unique passwords</li>
                        <li>Regular security audits</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-red-50 p-3 rounded">
                    <strong>Real-World Example:</strong> In 2020, a major Twitter hack compromised high-profile
                    accounts to promote a cryptocurrency scam. Users who verified transactions and websites
                    carefully avoided losing funds, while those who rushed to participate lost their investments.
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Overview Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Key Security Concepts</h2>
              </div>
              <SecurityDiagram />
            </Card>

            {/* Security Threats Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Key className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Security Threats & Vulnerabilities</h2>
              </div>
              <SecurityThreats />
            </Card>

            {/* Best Practices Card */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-700">Best Practices</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Creating and managing strong passwords</li>
                <li>Hardware wallet usage and storage</li>
                <li>Regular security audits and updates</li>
                <li>Safe transaction verification procedures</li>
                <li>Offline storage strategies for large holdings</li>
              </ul>
            </Card>

            {isFullyRead && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <Card className="bg-green-100 border-l-4 border-green-500 p-4">
                  <p className="text-green-700">
                    🎉 Congratulations! You've completed the Security section!
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
                        <SecurityQuiz />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="flex justify-between mt-4">
                  <Link href="/modules/module1/digital-currencies">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Previous Topic
                    </Button>
                  </Link>
                  <Link href="/modules/module1/applications">
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                      Next Topic
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}