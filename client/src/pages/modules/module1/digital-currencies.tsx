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
  Cog
} from "lucide-react";

export default function DigitalCurrenciesSection() {
  const navigate = useNavigate();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    // Only scroll to top on initial component mount
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95 && !isFullyRead) {
        setIsFullyRead(true);
        updateProgress(
          1, // moduleId
          'digital-currencies', // sectionId
          true, // completed
          1, // courseId
          undefined, // timeSpent
          undefined, // quizScore
          '/modules/module1/digital-currencies', // lastQuizPath
          undefined, // lastCompletedPath
          'Blockchain Fundamentals' // courseName
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress, isFullyRead]);

  const handleQuizComplete = () => {
    navigate('/modules/module1/security');
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
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Understanding Transaction Flow</h3>
              <motion.p variants={listItemVariants} className="mt-4">
                When you make a cryptocurrency transaction, it goes through several important steps to ensure security and validity:
              </motion.p>

              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-4 mb-6">
                {[
                  "Transaction Broadcast: When you initiate a transfer, your transaction is announced to the network",
                  "Verification: Network nodes check the transaction's validity and your available balance",
                  "Consensus: Multiple nodes work together to confirm the transaction",
                  "Validation: The transaction is validated and added to the blockchain",
                  "Completion: The recipient receives the funds after network confirmation"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    custom={index}
                    className="mb-2"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <TransactionFlowDiagram />
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Understanding Cryptocurrency Security"
            icon={<SecurityIcon size={32} />}
            gradientFrom="sky-50"
            gradientTo="blue-50"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <SecurityIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">Cryptographic Foundations</h3>
              </div>
              <motion.p variants={listItemVariants} className="mt-4">
                Cryptocurrency security relies on advanced cryptography, specifically public-key cryptography. This system uses pairs of keys:
              </motion.p>
              <motion.ul
                variants={sectionVariants}
                className="list-disc pl-5 mt-2"
              >
                {[
                  "A private key (like your secret password)",
                  "A public key (like your public email address)"
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
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">The Double-Spending Solution</h3>
              <motion.p variants={listItemVariants} className="mt-4">
                One of cryptocurrency's most significant achievements is solving the "double-spending" problem for digital money. In traditional digital systems, preventing someone from copying and reusing digital money required central authorities to track all transactions. Cryptocurrency solves this through its blockchain and network consensus mechanism.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
              >
                <DoubleSpendDiagram />
              </motion.div>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Practical Applications"
            icon={<WalletIcon size={32} />}
            gradientFrom="rose-50"
            gradientTo="fuchsia-50"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Financial Inclusion</h3>
              <motion.p variants={listItemVariants} className="mt-4">
                Cryptocurrency provides financial services access to previously underserved populations:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "People without bank accounts",
                  "Residents of countries with unstable currencies",
                  "Individuals with limited access to traditional banking",
                  "International workers needing to send remittances"
                ].map((item, index) => (
                  <motion.li key={index} variants={listItemVariants} custom={index}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Payment Efficiency</h3>
              <motion.p variants={listItemVariants} className="mt-4">
                Cryptocurrency offers several advantages for payments:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "Near-instant transfers globally",
                  "Lower transaction fees",
                  "24/7 operation",
                  "No intermediary requirements",
                  "Programmable payment options"
                ].map((item, index) => (
                  <motion.li key={index} variants={listItemVariants} custom={index}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Stablecoins: Bridging Traditional and Digital Finance</h3>
              <motion.p variants={listItemVariants} className="mt-4">
                Stablecoins represent a crucial innovation in the cryptocurrency space, designed to minimize volatility by maintaining a stable value:
              </motion.p>
              <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
                {[
                  "Pegged to stable assets like USD, reducing price volatility",
                  "Ideal for everyday transactions and commerce",
                  "Provides a reliable store of value in volatile markets",
                  "Enables easier conversion between traditional and digital currencies",
                  "Useful for international trade and remittances"
                ].map((item, index) => (
                  <motion.li key={index} variants={listItemVariants} custom={index}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Getting Started Safely"
            icon={<WalletIcon size={32} />}
            gradientFrom="lime-50"
            gradientTo="emerald-50"
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-6 p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <h3 className="text-2xl font-semibold text-blue-600">First Steps</h3>
              </div>
              <motion.ol variants={sectionVariants} className="list-decimal pl-5 mt-2">
                {[
                  {
                    title: "Education First:",
                    items: [
                      "Understand basic concepts",
                      "Learn security principles",
                      "Study market dynamics",
                      "Review risk factors"
                    ]
                  },
                  {
                    title: "Start Small:",
                    items: [
                      "Use small amounts initially",
                      "Practice with test networks",
                      "Learn wallet management",
                      "Understand transaction processes"
                    ]
                  }
                ].map((item, index) => (
                  <motion.li key={index} variants={listItemVariants} className="mt-4">
                    <strong className="font-bold">{item.title}</strong>
                    <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                      {item.items.map((subItem, subIndex) => (
                        <motion.li key={subIndex} variants={listItemVariants} custom={subIndex}>
                          {subItem}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="mt-8 p-6 bg-white rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold text-blue-600">Security Best Practices</h3>
              <motion.ol variants={sectionVariants} className="list-decimal pl-5 mt-2">
                {[
                  {
                    title: "Essential Security Measures:",
                    items: [
                      "Use strong passwords",
                      "Enable two-factor authentication",
                      "Maintain secure backups",
                      "Keep software updated",
                      "Verify all transactions"
                    ]
                  },
                  {
                    title: "Advanced Protection:",
                    items: [
                      "Hardware wallet usage",
                      "Multi-signature setups",
                      "Cold storage implementation",
                      "Regular security audits"
                    ]
                  }
                ].map((item, index) => (
                  <motion.li key={index} variants={listItemVariants} className="mt-4">
                    <strong className="font-bold">{item.title}</strong>
                    <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-1">
                      {item.items.map((subItem, subIndex) => (
                        <motion.li key={subIndex} variants={listItemVariants} custom={subIndex}>
                          {subItem}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </CourseContentSection>

          <CourseContentSection
            title="Conclusion and Next Steps"
            icon={<ArrowRight size={32} />}
            gradientFrom="orange-50"
            gradientTo="yellow-50"
          >
            <motion.p variants={listItemVariants} className="mt-4">
              Understanding cryptocurrency requires balancing its revolutionary potential with practical risks and limitations. As you continue learning, remember:
            </motion.p>
            <motion.ul variants={sectionVariants} className="list-disc pl-5 mt-2">
              {[
                "Start with fundamentals before advancing",
                "Prioritize security in all activities",
                "Stay informed about developments",
                "Practice with small amounts first",
                "Maintain proper risk management by considering factors such as liquidity (ability to buy/sell quickly), volatility (price fluctuations), portfolio concentration (avoiding overexposure to single assets), and diversification (spreading risk across different types of assets)"
              ].map((item, index) => (
                <motion.li key={index} variants={listItemVariants} custom={index}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p variants={listItemVariants} className="mt-4">
              The cryptocurrency space continues evolving, making ongoing education essential for safe and effective participation.
            </motion.p>
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