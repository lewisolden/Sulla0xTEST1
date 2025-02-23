import { useState, useEffect } from "react";
import { CourseSection } from "@/components/course-templates/CourseSection";
import { CourseContentSection, KeyConceptBox, QuizContainer } from "@/components/course-templates/CourseContentSection";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, ArrowRight, Shield, Key, Wallet, Lock,
  AlertTriangle, ShieldCheck, KeyRound, BrainCircuit, CheckCircle
} from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import { SecurityThreats } from "@/components/diagrams/SecurityThreats";
import SecurityQuiz from "@/components/modules/quizzes/SecurityQuiz";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const SecurityPage = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { updateProgress } = useProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'security', true, scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      window.location.href = '/modules/module1/applications';
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setCountdown(5);
  };

  return (
    <CourseSection
      title="Security in Cryptocurrency"
      subtitle="Essential Concepts and Best Practices"
      backLink="/modules/module1"
      backText="Back to Module Overview"
      currentSection={2}
      totalSections={4}
      nextLink="/modules/module1/applications"
      nextText="Next: Applications"
    >
      <div className="container mx-auto px-4">
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={cardVariants}
          className="space-y-8"
        >
          <CourseContentSection
            title="Private Keys: The Foundation of Security"
            icon={<Key size={32} />}
            gradientFrom="blue-50"
            gradientTo="indigo-50"
          >
            <div className="prose lg:prose-xl text-gray-700">
              <p>
                A private key in cryptocurrency is like the master key to your digital vault. It's a unique,
                complex string of numbers and letters that proves your ownership and allows you to access and
                manage your cryptocurrency.
              </p>

              <motion.div
                className="bg-blue-50 p-6 rounded-lg shadow-md mt-4"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Real-World Example:</h3>
                <p>
                  Think of your email account: your password is like a private key. If someone gets your
                  password, they can send emails as you and access all your information. Similarly, if someone
                  obtains your private key, they can access and transfer your cryptocurrency.
                </p>
                <div className="mt-4 bg-white/80 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Example Private Key (Never share your actual private key):</p>
                  <code className="block bg-gray-100 p-3 rounded mt-2 text-sm">
                    5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
                  </code>
                </div>
              </motion.div>
            </div>
          </CourseContentSection>

          <CourseContentSection
            title="Two-Factor Authentication (2FA)"
            icon={<Lock size={32} />}
            gradientFrom="purple-50"
            gradientTo="pink-50"
          >
            <motion.div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  2FA adds an extra layer of security beyond your password. It requires two different types
                  of verification before granting access to your account.
                </p>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-4">Authentication Methods:</h3>
                  {[
                    ["Google Authenticator", "Generates time-based codes that change every 30 seconds"],
                    ["SMS Verification", "Receiving a code via text message when logging in"],
                    ["Hardware Keys", "Physical devices like YubiKey that must be plugged in"],
                    ["Biometric", "Fingerprint or face recognition for additional security"]
                  ].map(([title, desc], index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/80 p-3 rounded-lg mb-3"
                    >
                      <h4 className="font-medium text-purple-900">{title}</h4>
                      <p className="text-sm text-purple-700">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Best Practices</h3>
                <div className="space-y-3">
                  {[
                    "Use authenticator apps over SMS when possible",
                    "Keep backup codes in a secure location",
                    "Enable 2FA on all supported platforms",
                    "Consider hardware security keys for highest security"
                  ].map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 bg-white/60 p-3 rounded-lg"
                    >
                      <ShieldCheck className="h-5 w-5 text-purple-500" />
                      <span className="text-purple-800">{practice}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Wallet Security"
            icon={<Wallet size={32} />}
            gradientFrom="emerald-50"
            gradientTo="teal-50"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <KeyConceptBox
                title="Types of Wallets"
                className="bg-gradient-to-br from-emerald-100 to-teal-50"
              >
                {[
                  ["Hardware Wallets", "Physical devices that store your private keys offline (e.g., Ledger, Trezor)"],
                  ["Software Wallets", "Desktop or mobile applications for managing crypto"],
                  ["Paper Wallets", "Physical copies of public and private keys"],
                  ["Web Wallets", "Online services for storing cryptocurrency"]
                ].map(([title, desc], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 p-4 rounded-lg mb-3"
                  >
                    <h4 className="font-medium text-emerald-900">{title}</h4>
                    <p className="text-sm text-emerald-700">{desc}</p>
                  </motion.div>
                ))}
              </KeyConceptBox>

              <div className="space-y-6">
                <div className="bg-white/80 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-4">Security Measures</h3>
                  <ul className="space-y-3">
                    {[
                      "Regular backups of wallet data",
                      "Strong, unique passwords for each wallet",
                      "Multi-signature protection for large amounts",
                      "Regular security audits of wallet software"
                    ].map((measure, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        <span>{measure}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Pro Tip
                  </h4>
                  <p className="text-yellow-700 mt-2">
                    Never store your recovery phrase digitally or share it with anyone.
                    Write it down on paper and store it in multiple secure locations.
                  </p>
                </div>
              </div>
            </div>
          </CourseContentSection>

          <CourseContentSection
            title="Threat Protection"
            icon={<Shield size={32} />}
            gradientFrom="rose-50"
            gradientTo="red-50"
          >
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Understanding Cryptocurrency Security Threats
                </h3>
                <p className="text-gray-700 mb-6">
                  The cryptocurrency space faces various security threats. Understanding and protecting
                  against these threats is essential for safeguarding your assets.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Security Best Practices */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5" />
                      Security Best Practices
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {[
                        "Use hardware wallets for large amounts",
                        "Enable 2FA on all accounts",
                        "Regular security audits",
                        "Keep software updated",
                        "Use strong, unique passwords"
                      ].map((practice, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{practice}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Common Threats */}
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Common Threats
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          title: "Phishing Attacks",
                          desc: "Fake websites and emails that mimic legitimate services"
                        },
                        {
                          title: "Malware",
                          desc: "Malicious software that can steal private keys"
                        },
                        {
                          title: "Social Engineering",
                          desc: "Manipulation tactics to gain unauthorized access"
                        },
                        {
                          title: "Exchange Hacks",
                          desc: "Security breaches in cryptocurrency exchanges"
                        }
                      ].map((threat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-red-50 p-4 rounded-lg"
                        >
                          <h4 className="font-medium text-red-800 flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4" />
                            {threat.title}
                          </h4>
                          <p className="text-sm text-red-700 ml-6">
                            {threat.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Real-World Example */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="bg-gradient-to-br from-purple-100 to-blue-50 p-6 rounded-xl shadow-lg mt-8"
              >
                <h3 className="text-xl font-semibold text-purple-800 flex items-center gap-2 mb-4">
                  <BrainCircuit className="h-5 w-5" />
                  Case Study: The 2020 Twitter Hack
                </h3>
                <div className="bg-white/80 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    In July 2020, hackers compromised high-profile Twitter accounts to promote a cryptocurrency scam.
                    The incident highlighted the importance of verifying transactions and being skeptical of
                    "too good to be true" offers, even when they appear to come from trusted sources.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-medium text-purple-800 mb-2">Key Lessons:</h4>
                    <ul className="space-y-2">
                      {[
                        "Never trust urgent cryptocurrency transfer requests",
                        "Verify information through multiple official channels",
                        "Be skeptical of promotional offers involving cryptocurrency",
                        "Remember: legitimate entities never ask for private keys"
                      ].map((lesson, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {lesson}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </CourseContentSection>

          {isFullyRead && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <QuizContainer>
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <SecurityQuiz onComplete={handleQuizComplete} />
                    {quizCompleted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center my-4 text-gray-700"
                      >
                        Quiz completed! Next section in {countdown} seconds...
                      </motion.div>
                    )}
                  </div>
                </div>
              </QuizContainer>

              {!quizCompleted && (
                <div className="flex justify-between mt-8">
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
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </CourseSection>
  );
};

export default SecurityPage;
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { QuizComponent } from '@/components/course-templates/QuizComponent';

const Security = () => {
  return (
    <QuizComponent
      questions={questions}
      onComplete={handleComplete}
      autoAdvanceDelay={7000}
      explanationText="Next question in 7 seconds..."
    />
  );
};

export default Security;
