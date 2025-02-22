import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { CourseSection } from "@/components/course-templates/CourseSection";
import { CourseContentSection, KeyConceptBox, QuizContainer } from "@/components/course-templates/CourseContentSection";
import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";
import { useNavigate } from "@/hooks/useNavigate";
import MoneyEvolutionTimeline from "@/components/diagrams/MoneyEvolutionTimeline";
import DigitalCurrencyFeatures from "@/components/diagrams/DigitalCurrencyFeatures";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  MapPin,
  Building,
  Clock,
  Code2,
  Users,
  Globe,
  Network,
  Cog,
  CheckCircle,
  Shield,
  ShieldCheck,
  ShieldAlert,
  LockKeyhole,
  Fingerprint,
  Key,
  ServerCrash,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  BrainCircuit
} from "lucide-react";

export default function DigitalCurrenciesSection() {
  const navigate = useNavigate();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

  useEffect(() => {
    if (!hasScrolledToTop) {
      window.scrollTo(0, 0);
      setHasScrolledToTop(true);
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95 && !isFullyRead) {
        setIsFullyRead(true);
        updateProgress(
          1,
          'digital-currencies',
          true,
          1,
          undefined,
          undefined,
          '/modules/module1/digital-currencies',
          undefined,
          'Blockchain Fundamentals'
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress, isFullyRead, hasScrolledToTop]);

  const handleQuizComplete = () => {
    setTimeout(() => {
      navigate('/modules/module1/security');
    }, 5000); // Show score for 5 seconds before navigating
  };

  return (
    <CourseSection
      title="Understanding Digital Currencies"
      subtitle="The Dawn of a New Financial Era"
      backLink="/modules/module1"
      backText="Back to Module 1"
      currentSection={1}
      totalSections={4}
      nextLink="/modules/module1/security"
      nextText="Next: Understanding Security"
    >
      <div className="container mx-auto px-4">
        <Progress value={scrollProgress} className="fixed top-0 left-0 w-full z-50" />

        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="space-y-8"
        >
          <CourseContentSection
            title="Introduction to Digital Currency"
            icon={<DecentralizationIcon size={32} />}
            gradientFrom="blue-50"
            gradientTo="indigo-50"
          >
            <p className="text-gray-700">
              In today's rapidly evolving financial landscape, cryptocurrency represents a revolutionary approach to money and value transfer. Before diving into specific cryptocurrencies or technical details, it's essential to understand what makes digital currencies unique and how they differ from traditional money systems.
            </p>
            <DigitalCurrencyFeatures />
          </CourseContentSection>

          <CourseContentSection
            title="Understanding Traditional Money vs. Cryptocurrency"
            icon={<BlockchainIcon size={32} />}
            gradientFrom="purple-50"
            gradientTo="pink-50"
          >
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Traditional Money</h3>
                <motion.ul variants={sectionVariants} className="space-y-2">
                  {[
                    [<Banknote className="h-4 w-4" />, "Physical cash for tangible transactions"],
                    [<Building2 className="h-4 w-4" />, "Requires banks as intermediaries"],
                    [<MapPin className="h-4 w-4" />, "Limited by geographical boundaries"],
                    [<Building className="h-4 w-4" />, "Controlled by central authorities"],
                    [<Clock className="h-4 w-4" />, "Subject to traditional banking hours"]
                  ].map(([icon, text], index) => (
                    <motion.li
                      key={index}
                      variants={listItemVariants}
                      className="flex items-center gap-3"
                    >
                      <span className="text-blue-500">{icon}</span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="p-6 bg-white rounded-lg shadow-md border-l-4 border-purple-500"
              >
                <h3 className="text-xl font-semibold text-purple-600 mb-4">Cryptocurrency</h3>
                <motion.ul variants={sectionVariants} className="space-y-2">
                  {[
                    [<Code2 className="h-4 w-4" />, "Digital-native transactions"],
                    [<Users className="h-4 w-4" />, "Peer-to-peer without intermediaries"],
                    [<Globe className="h-4 w-4" />, "Global accessibility 24/7"],
                    [<Network className="h-4 w-4" />, "Decentralized governance"],
                    [<Cog className="h-4 w-4" />, "Programmable money features"]
                  ].map(([icon, text], index) => (
                    <motion.li
                      key={index}
                      variants={listItemVariants}
                      className="flex items-center gap-3"
                    >
                      <span className="text-purple-500">{icon}</span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </CourseContentSection>

          <CourseContentSection
            title="The Evolution of Money"
            icon={<Clock size={32} />}
            gradientFrom="teal-50"
            gradientTo="cyan-50"
          >
            <motion.p variants={listItemVariants} className="mt-4">
              To understand cryptocurrency's significance, consider how money has evolved through history:
            </motion.p>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <MoneyEvolutionTimeline />
            </motion.div>

            <motion.ul
              variants={sectionVariants}
              className="list-disc pl-5 space-y-2 mt-4"
            >
              {[
                "Barter systems required direct exchange of goods",
                "Precious metals provided portable, divisible value",
                "Paper money offered convenient value representation",
                "Digital banking enabled electronic transfers",
                "Cryptocurrency introduces programmable, borderless money"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </CourseContentSection>

          <CourseContentSection
            title="Core Concepts and Features"
            icon={<Network size={32} />}
            gradientFrom="yellow-50"
            gradientTo="amber-50"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

              <h3 className="text-2xl font-semibold text-blue-600 mb-4 relative z-10">Understanding Transaction Flow</h3>
              <motion.p variants={listItemVariants} className="mt-4 relative z-10">
                When you make a cryptocurrency transaction, it goes through several important steps to ensure security and validity:
              </motion.p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <motion.div className="space-y-4">
                  {[
                    ["Broadcast", "Transaction is announced to the network", <ArrowUpRight />],
                    ["Verify", "Network nodes check transaction validity", <ShieldCheck />],
                    ["Consensus", "Multiple nodes work together to confirm", <Users />],
                    ["Validate", "Transaction is added to the blockchain", <CheckCircle2 />],
                    ["Complete", "Recipient receives confirmed funds", <CheckCircle />]
                  ].map(([title, desc, icon], index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg shadow-sm"
                    >
                      <div className="text-amber-600 mt-1">{icon}</div>
                      <div>
                        <h4 className="font-semibold text-amber-900">{title}</h4>
                        <p className="text-sm text-amber-700">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="relative">
                  <TransactionFlowDiagram />
                </div>
              </div>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Understanding Cryptocurrency Security"
            icon={<Shield size={32} />}
            gradientFrom="sky-50"
            gradientTo="blue-50"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 grid md:grid-cols-2 gap-6"
            >
              <motion.div
                className="bg-gradient-to-br from-blue-100 to-sky-50 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <LockKeyhole className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-800">Cryptographic Foundations</h3>
                </div>

                <div className="space-y-4">
                  {[
                    ["Private Key", "Your secret digital signature", <Key className="h-5 w-5" />],
                    ["Public Key", "Your public address for receiving", <Fingerprint className="h-5 w-5" />],
                    ["Encryption", "Secure transaction encoding", <ShieldCheck className="h-5 w-5" />],
                    ["Verification", "Transaction authenticity checks", <Shield className="h-5 w-5" />]
                  ].map(([title, desc, icon], index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-sm"
                    >
                      <div className="text-blue-600">{icon}</div>
                      <div>
                        <h4 className="font-medium text-blue-900">{title}</h4>
                        <p className="text-sm text-blue-700">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-indigo-100 to-blue-50 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <ShieldAlert className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-indigo-800">Security Challenges</h3>
                </div>

                <div className="space-y-4">
                  {[
                    ["Double-Spending", "Prevention of duplicate transactions", <ServerCrash className="h-5 w-5" />],
                    ["Network Attacks", "Protection against malicious actors", <AlertTriangle className="h-5 w-5" />],
                    ["Key Management", "Secure storage of private keys", <Key className="h-5 w-5" />],
                    ["Transaction Privacy", "Balance of transparency and privacy", <Shield className="h-5 w-5" />]
                  ].map(([title, desc, icon], index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white/80 p-3 rounded-lg shadow-sm"
                    >
                      <div className="text-indigo-600">{icon}</div>
                      <div>
                        <h4 className="font-medium text-indigo-900">{title}</h4>
                        <p className="text-sm text-indigo-700">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg mb-8"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-6">The Double-Spending Solution</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div className="space-y-4">
                  <p className="text-blue-700 leading-relaxed">
                    One of cryptocurrency's most significant achievements is solving the "double-spending" problem for digital money. Traditional systems required central authorities, but blockchain technology provides a decentralized solution.
                  </p>
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-900 mb-2">How It Works:</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Transactions are verified by multiple nodes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Each transaction is recorded on the blockchain
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Network consensus prevents double-spending
                      </li>
                    </ul>
                  </div>
                </motion.div>
                <div className="bg-white/50 rounded-lg p-4 flex items-center justify-center">
                  <div className="w-[250px] h-auto transform scale-60 -mx-8">
                    <DoubleSpendDiagram />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-gradient-to-br from-violet-100 to-indigo-50 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Stablecoins: Bridging Traditional and Digital Finance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.ul className="space-y-4">
                  {[
                    "Pegged to stable assets like USD",
                    "Ideal for everyday transactions",
                    "Reliable store of value",
                    "Easy conversion between currencies",
                    "Useful for international trade"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="bg-white/80 p-6 rounded-lg shadow-md">
                  <h4 className="font-semibold text-purple-900 mb-4">Types of Stablecoins</h4>
                  <div className="space-y-3">
                    {[
                      ["Fiat-Backed", "1:1 backed by traditional currencies"],
                      ["Crypto-Backed", "Collateralized by other cryptocurrencies"],
                      ["Algorithmic", "Maintained by smart contracts"],
                      ["Commodity-Backed", "Backed by physical assets"]
                    ].map(([title, desc], index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 border-b border-purple-100 last:border-0"
                      >
                        <h5 className="font-medium text-purple-900 flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-purple-500" />
                          {title}
                        </h5>
                        <p className="text-sm text-purple-700 mt-1">{desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <CourseContentSection
              title="Practical Applications"
              icon={<WalletIcon size={32} />}
              gradientFrom="rose-50"
              gradientTo="fuchsia-50"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="mt-6 grid md:grid-cols-2 gap-6"
              >
                <KeyConceptBox
                  title="Financial Inclusion"
                  className="bg-gradient-to-br from-rose-100 to-pink-50"
                >
                  <motion.ul className="space-y-3">
                    {[
                      "People without bank accounts",
                      "Residents of countries with unstable currencies",
                      "Individuals with limited access to traditional banking",
                      "International workers needing to send remittances"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </KeyConceptBox>

                <KeyConceptBox
                  title="Payment Efficiency"
                  className="bg-gradient-to-br from-fuchsia-100 to-purple-50"
                >
                  <motion.ul className="space-y-3">
                    {[
                      "Near-instant transfers globally",
                      "Lower transaction fees",
                      "24/7 operation",
                      "No intermediary requirements",
                      "Programmable payment options"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ArrowRight className="h-5 w-5 text-purple-500" />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </KeyConceptBox>
              </motion.div>
            </CourseContentSection>

            <CourseContentSection
              title="Getting Started Safely"
              icon={<GraduationCap size={32} />}
              gradientFrom="emerald-50"
              gradientTo="teal-50"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-gradient-to-br from-emerald-100 to-green-50 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <BookOpen className="h-8 w-8 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-emerald-800">First Steps</h3>
                  </div>

                  {[
                    {
                      title: "Education First",
                      items: [
                        "Understand basic concepts",
                        "Learn security principles",
                        "Study market dynamics",
                        "Review risk factors"
                      ]
                    },
                    {
                      title: "Start Small",
                      items: [
                        "Use small amounts initially",
                        "Practice with test networks",
                        "Learn wallet management",
                        "Understand transaction processes"
                      ]
                    }
                  ].map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="mb-6 last:mb-0"
                    >
                      <h4 className="font-semibold text-emerald-900 mb-3">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (idx * 0.2) + (index * 0.1) }}
                            className="flex items-center gap-2 bg-white/80 p-2 rounded-lg"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-emerald-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-gradient-to-br from-teal-100 to-emerald-50 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-8 w-8 text-teal-600" />
                    <h3 className="text-xl font-semibold text-teal-800">Security Best Practices</h3>
                  </div>

                  {[
                    {
                      title: "Essential Security",
                      items: [
                        "Use strong passwords",
                        "Enable two-factor authentication",
                        "Maintain secure backups",
                        "Keep software updated",
                        "Verify all transactions"
                      ]
                    },
                    {
                      title: "Advanced Protection",
                      items: [
                        "Hardware wallet usage",
                        "Multi-signature setups",
                        "Cold storage implementation",
                        "Regular security audits"
                      ]
                    }
                  ].map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="mb-6 last:mb-0"
                    >
                      <h4 className="font-semibold text-teal-900 mb-3">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (idx * 0.2) + (index * 0.1) }}
                            className="flex items-center gap-2 bg-white/80 p-2 rounded-lg"
                          >
                            <ShieldCheck className="h-4 w-4 text-teal-500" />
                            <span className="text-sm text-teal-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </CourseContentSection>

            <CourseContentSection
              title="Conclusion and Next Steps"
              icon={<BrainCircuit size={32} />}
              gradientFrom="violet-50"
              gradientTo="purple-50"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="mt-6 p-8 bg-gradient-to-br from-violet-100 to-purple-50 rounded-lg shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full -translate-y-32 translate-x-32 opacity-50" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-violet-900 mb-6">Key Takeaways</h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {[
                        ["Start with fundamentals", "Master the basics before advancing"],
                        ["Security first", "Always prioritize security in all activities"],
                        ["Stay informed", "Keep up with latest developments"],
                        ["Practice safely", "Start small and learn from experience"]
                      ].map(([title, desc], index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/80 p-4 rounded-lg shadow-sm"
                        >
                          <h4 className="font-semibold text-violet-900 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-violet-600" />
                            {title}
                          </h4>
                          <p className="text-sm text-violet-700 mt-1">{desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-white/90 p-6 rounded-lg shadow-md">
                      <h4 className="font-semibold text-purple-900 mb-4">Risk Management Essentials</h4>
                      <ul className="space-y-3">
                        {[
                          ["Liquidity", "Ability to buy/sell quickly"],
                          ["Volatility", "Understanding price fluctuations"],
                          ["Portfolio Balance", "Avoiding overexposure"],
                          ["Diversification", "Spreading risk across assets"]
                        ].map(([title, desc], index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-2 border-b border-purple-100 last:border-0"
                          >
                            <ArrowUpRight className="h-5 w-5 text-purple-500 mt-1" />
                            <div>
                              <span className="font-medium text-purple-900">{title}</span>
                              <p className="text-sm text-purple-700">{desc}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-violet-800 text-center font-medium"
                  >
                    The cryptocurrency space continues evolving, making ongoing education essential for safe and effective participation.
                  </motion.p>
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
                  <DigitalCurrenciesQuiz onComplete={handleQuizComplete} />
                </QuizContainer>
              </motion.div>
            )}
          </motion.div>
      </div>
    </CourseSection>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.3
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.3,
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.3
    }
  }
};