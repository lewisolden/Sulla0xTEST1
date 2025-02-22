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
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";

import DoubleSpendDiagram from "@/components/diagrams/DoubleSpendDiagram";
import DigitalCurrenciesQuiz from "@/components/quizzes/DigitalCurrenciesQuiz";
import { BlockchainIcon, DecentralizationIcon, WalletIcon, SecurityIcon } from "@/components/icons/CryptoIcons";
import TransactionFlowDiagram from "@/components/diagrams/TransactionFlowDiagram";
import { useNavigate } from "@/hooks/useNavigate";
import MoneyEvolutionTimeline from "@/components/diagrams/MoneyEvolutionTimeline";
import DigitalCurrencyFeatures from "@/components/diagrams/DigitalCurrencyFeatures";
import { BookOpen, Wallet, Shield, Globe as GlobeIcon, Network as NetworkIcon, AlertTriangle } from "lucide-react";
import { CourseSection, type Section, KeyConcept, FeatureList } from "@/components/course/CourseSection";
import { useState as useState2 } from "react";

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction to Digital Currencies",
    icon: GlobeIcon,
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
    id: "features",
    title: "Core Features",
    icon: NetworkIcon,
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
  const [showQuiz, setShowQuiz] = useState2(false);
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const [isFullyRead, setIsFullyRead] = useState2(false);
  const [scrollProgress, setScrollProgress] = useState2(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'digital-currencies', true);
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