import { useState, useEffect } from "react";
import { CourseSection } from "@/components/course-templates/CourseSection";
import { CourseContentSection } from "@/components/course-templates/CourseContentSection";
import { KeyConceptBox } from "@/components/course-templates/CourseContentSection";
import { QuizContainer } from "@/components/course-templates/CourseContentSection";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowLeft, ArrowRight, Shield, Key, Wallet, Lock,
  AlertTriangle, ShieldCheck, KeyRound, BrainCircuit
} from "lucide-react";
import { SecurityDiagram } from "@/components/diagrams/SecurityDiagram";
import { SecurityThreats } from "@/components/diagrams/SecurityThreats";
import { SecurityQuiz } from "@/components/quizzes/SecurityQuiz";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export default function SecurityPage() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
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

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setTimeout(() => {
      window.location.href = '/modules/module1/applications';
    }, 5000);
  };

  return (
    <CourseSection 
      title="Security in Cryptocurrency"
      backLink="/modules/module1"
      backText="Back to Module Overview"
      currentSection={7}
      totalSections={9}
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
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
          className="space-y-8"
        >
          <CourseContentSection
            title="Understanding Cryptocurrency Security"
            subtitle="Essential concepts and best practices for protecting your digital assets"
            icon={<Shield className="w-8 h-8" />}
            gradientFrom="blue-50"
            gradientTo="indigo-50"
          >
            <div className="prose lg:prose-xl text-gray-700 space-y-6">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-8"
              >
                <KeyConceptBox
                  title="Core Security Principles"
                  className="bg-gradient-to-br from-blue-100 to-indigo-50"
                >
                  <ul className="space-y-3">
                    {[
                      "Private key protection",
                      "Strong password practices",
                      "Two-factor authentication",
                      "Regular security audits",
                      "Hardware wallet usage"
                    ].map((principle, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        {principle}
                      </motion.li>
                    ))}
                  </ul>
                </KeyConceptBox>

                <KeyConceptBox
                  title="Common Security Threats"
                  className="bg-gradient-to-br from-red-50 to-orange-50"
                >
                  <ul className="space-y-3">
                    {[
                      "Phishing attacks",
                      "Social engineering",
                      "Malware infections",
                      "Exchange hacks",
                      "Key compromise"
                    ].map((threat, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        {threat}
                      </motion.li>
                    ))}
                  </ul>
                </KeyConceptBox>
              </motion.div>
            </div>
          </CourseContentSection>

          <CourseContentSection
            title="Private Keys & Wallets"
            icon={<KeyRound className="w-8 h-8" />}
            gradientFrom="purple-50"
            gradientTo="pink-50"
          >
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 rounded-lg p-6 shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-800">Private Key Essentials</h3>
                  <p className="text-gray-700">
                    Your private key is the master key to your cryptocurrency. It must be:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Kept absolutely secret",
                      "Backed up securely",
                      "Never shared online",
                      "Stored in multiple secure locations"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-purple-700"
                      >
                        <Key className="h-4 w-4 text-purple-500" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Wallet Types</h3>
                  <div className="space-y-3">
                    {[
                      {
                        type: "Hardware Wallets",
                        desc: "Physical devices that store keys offline"
                      },
                      {
                        type: "Software Wallets",
                        desc: "Desktop or mobile applications"
                      },
                      {
                        type: "Paper Wallets",
                        desc: "Physical copies of keys"
                      },
                      {
                        type: "Web Wallets",
                        desc: "Online services (least secure)"
                      }
                    ].map((wallet, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/60 p-3 rounded-lg"
                      >
                        <h4 className="font-medium text-purple-900">{wallet.type}</h4>
                        <p className="text-sm text-purple-700">{wallet.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Security Best Practices"
            icon={<BrainCircuit className="w-8 h-8" />}
            gradientFrom="emerald-50"
            gradientTo="teal-50"
          >
            <motion.div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <KeyConceptBox
                  title="Essential Security Steps"
                  className="bg-gradient-to-br from-emerald-100 to-teal-50"
                >
                  <ul className="space-y-3">
                    {[
                      "Use hardware wallets for large amounts",
                      "Enable 2FA on all accounts",
                      "Create strong, unique passwords",
                      "Keep software updated",
                      "Verify all transactions carefully"
                    ].map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </KeyConceptBox>

                <div className="flex flex-col gap-6">
                  <div className="bg-white/80 p-4 rounded-lg shadow-lg h-[200px] overflow-hidden">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Security Overview</h3>
                    <SecurityDiagram />
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg shadow-lg h-[200px] overflow-hidden">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Common Threats</h3>
                    <SecurityThreats />
                  </div>
                </div>
              </div>
            </motion.div>
          </CourseContentSection>

          {isFullyRead && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <QuizContainer>
                <SecurityQuiz onComplete={handleQuizComplete} />
                {quizCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center my-4 text-green-600"
                  >
                    Quiz completed! Moving to next section in 5 seconds...
                  </motion.div>
                )}
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
}