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
  Cpu,
  Database,
  Wallet,
  BookOpen,
  Shield,
  AlertTriangle
} from "lucide-react";

import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/useNavigate";

import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";
import MoneyEvolutionTimeline from "@/components/diagrams/MoneyEvolutionTimeline";
import DigitalCurrencyFeatures from "@/components/diagrams/DigitalCurrencyFeatures";
import { CourseSection, type Section, KeyConcept, FeatureList } from "@/components/course/CourseSection";

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction to Digital Currencies",
    icon: Globe,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-lg">
          Imagine a world where you can send money to anyone, anywhere, at any time, without needing a bank.
          This isn't science fiction—it's the world of digital currencies, and it's happening right now.
        </p>

        <KeyConcept title="The Digital Revolution of Money">
          Just as the internet revolutionized information, digital currencies are transforming the very fabric
          of our financial systems. They represent a fundamental shift in how we think about money, value,
          and trust in the digital age.
        </KeyConcept>

        <DigitalCurrencyFeatures />
      </div>
    )
  },
  {
    id: "evolution",
    title: "Evolution of Money",
    icon: BookOpen,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          To understand cryptocurrency's significance, we need to examine how money has evolved through history.
        </p>

        <MoneyEvolutionTimeline />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Traditional Money</h4>
            <FeatureList items={[
              "Physical and tangible",
              "Requires intermediaries",
              "Limited by borders",
              "Controlled centrally"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Digital Currencies</h4>
            <FeatureList items={[
              "Digital and borderless",
              "Peer-to-peer transactions",
              "Global accessibility",
              "Decentralized control"
            ]} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "mining",
    title: "Mining and Network Security",
    icon: Cpu,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Mining is a crucial process that secures cryptocurrency networks and creates new coins.
          It's the backbone of many cryptocurrency systems, particularly those using Proof of Work.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Mining Process</h4>
            <FeatureList items={[
              "Solving complex mathematical puzzles",
              "Validating transactions",
              "Creating new blocks",
              "Securing the network"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Network Security</h4>
            <FeatureList items={[
              "Decentralized consensus",
              "Cryptographic verification",
              "Immutable record-keeping",
              "Double-spend prevention"
            ]} />
          </div>
        </div>

        <KeyConcept title="The Role of Miners">
          Miners serve as the network's security force, validating transactions and maintaining
          the blockchain's integrity. They're rewarded with newly created coins and transaction fees
          for their work.
        </KeyConcept>
      </div>
    )
  },
  {
    id: "utxos",
    title: "Understanding UTXOs",
    icon: Database,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Unspent Transaction Outputs (UTXOs) are a fundamental concept in many cryptocurrencies,
          representing how transactions and balances are tracked.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">UTXO Model</h4>
            <FeatureList items={[
              "Transaction-based accounting",
              "Improved privacy",
              "Parallel processing capability",
              "Enhanced security"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Key Characteristics</h4>
            <FeatureList items={[
              "Indivisible transaction outputs",
              "No account balances",
              "Change address generation",
              "Transaction verification"
            ]} />
          </div>
        </div>

        <KeyConcept title="UTXO vs Account Model">
          Unlike traditional banking where accounts have balances, UTXOs represent unspent coins
          from previous transactions. Each transaction consumes UTXOs and creates new ones.
        </KeyConcept>
      </div>
    )
  },
  {
    id: "practical-applications",
    title: "Practical Applications",
    icon: Wallet,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Digital currencies have numerous real-world applications beyond simple value transfer.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Financial Services</h4>
            <FeatureList items={[
              "Cross-border payments",
              "Remittance services",
              "Lending platforms",
              "Investment vehicles"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Business Solutions</h4>
            <FeatureList items={[
              "Supply chain tracking",
              "Smart contracts",
              "Automated payments",
              "Digital identity"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Social Impact</h4>
            <FeatureList items={[
              "Financial inclusion",
              "Charitable giving",
              "Transparent governance",
              "Community building"
            ]} />
          </div>
        </div>

        <KeyConcept title="Beyond Currency">
          Digital currencies enable new business models and services that weren't possible
          with traditional financial systems, creating opportunities for innovation across
          various sectors.
        </KeyConcept>
      </div>
    )
  },
  {
    id: "features",
    title: "Core Features",
    icon: Network,
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Decentralization</h4>
            <FeatureList items={[
              "No central authority",
              "Peer-to-peer network",
              "Distributed consensus",
              "Community governance"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Transparency</h4>
            <FeatureList items={[
              "Public ledger",
              "Traceable transactions",
              "Verifiable history",
              "Open source code"
            ]} />
          </div>
        </div>

        <TransactionFlowDiagram />

        <KeyConcept title="Programmable Money">
          Some digital currencies, like Ethereum, allow for "smart contracts"—self-executing
          agreements that can automate complex financial transactions.
        </KeyConcept>
      </div>
    )
  },
  {
    id: "challenges",
    title: "Challenges and Considerations",
    icon: AlertTriangle,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          While digital currencies offer revolutionary potential, they come with their own set of challenges
          that need to be carefully considered.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Market Challenges</h4>
            <FeatureList items={[
              "Price volatility",
              "Market manipulation",
              "Limited adoption"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Technical Challenges</h4>
            <FeatureList items={[
              "Scalability issues",
              "Energy consumption",
              "Technical complexity"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Regulatory Challenges</h4>
            <FeatureList items={[
              "Unclear regulations",
              "Tax implications",
              "Legal uncertainties"
            ]} />
          </div>
        </div>

        <KeyConcept title="Future Outlook">
          Despite these challenges, the technology continues to evolve and mature,
          with ongoing developments addressing many of these concerns.
        </KeyConcept>
      </div>
    )
  }
];

export default function DigitalCurrenciesSection() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress({
          moduleId: 1,
          sectionId: 'digital-currencies',
          subsectionId: 'main',
          progress: 100,
          status: 'completed',
          timestamp: new Date().toISOString(),
          type: 'section',
          courseId: 1,
          data: {
            isFullyRead: true
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <NavigationWrapper>
      <CourseSection
        moduleId={1}
        sectionId="digital-currencies"
        title="Introduction to Digital Currencies"
        description="Discover the revolutionary world of digital currencies and how they're transforming the future of money."
        backLink="/modules/module1"
        backLinkText="Back to Module Overview"
        nextLink="/modules/module1/security"
        nextLinkText="Next: Understanding Security"
        sections={sections}
        quiz={showQuiz ? <DigitalCurrenciesQuiz /> : null}
        gradientFrom="blue-500"
        gradientTo="purple-500"
      />
      {isFullyRead && (
        <div className="mt-8 space-y-6">
          <div>
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Introduction to Digital Currencies section. You now understand the fundamental concepts of digital currencies and their revolutionary potential.
              </p>
            </Card>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <Button
                onClick={() => setShowQuiz(!showQuiz)}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {showQuiz ? "Hide Quiz" : "Take Topic Quiz"}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto group"
                  onClick={() => navigate("/modules/module1")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                  Back to Overview
                </Button>
              </div>

              <div>
                <Button
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 group"
                  onClick={() => navigate("/modules/module1/security")}
                >
                  Next Topic: Understanding Security
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
              <DigitalCurrenciesQuiz />
            </div>
          )}
        </div>
      )}
    </NavigationWrapper>
  );
}