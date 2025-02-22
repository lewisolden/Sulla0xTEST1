import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
//import { useProgress } from "@/context/progress-context"; //removed because not used in edited code
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
//import { useScrollTop } from "@/hooks/useScrollTop"; //removed because not used in edited code
import AltcoinsTokensQuiz from "@/components/quizzes/AltcoinsTokensQuiz";
import AltcoinCategories from "@/components/diagrams/AltcoinCategories";
import TokenTypes from "@/components/diagrams/TokenTypes";
import { DollarSign, Coins, TrendingUp, AlertTriangle } from "lucide-react";
import { CourseSection, type Section, KeyConcept, FeatureList } from "@/components/course/CourseSection";

const sections: Section[] = [
  {
    id: "overview",
    title: "Understanding Altcoins & Tokens",
    icon: DollarSign,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 text-lg">
          While Bitcoin was the first cryptocurrency, it sparked the creation of numerous
          other digital currencies and tokens. These are collectively known as "altcoins"
          (alternative coins) and tokens. This section explores the diverse world of
          cryptocurrencies beyond Bitcoin.
        </p>

        <KeyConcept title="What are Altcoins?">
          Altcoins are alternative cryptocurrencies launched after Bitcoin's success.
          Each aims to improve upon Bitcoin's design or serve different use cases in the
          cryptocurrency ecosystem.
        </KeyConcept>
      </div>
    )
  },
  {
    id: "categories",
    title: "Major Categories of Altcoins",
    icon: Coins,
    content: (
      <div className="space-y-6">
        <p className="text-gray-700">
          Understanding the different categories of altcoins helps navigate the
          cryptocurrency ecosystem more effectively.
        </p>
        <AltcoinCategories />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Payment Tokens</h4>
            <FeatureList items={[
              "Designed for everyday transactions",
              "Focus on speed and low fees",
              "Often emphasize privacy features"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Platform Tokens</h4>
            <FeatureList items={[
              "Power blockchain platforms",
              "Enable smart contract functionality",
              "Support decentralized applications"
            ]} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "token-types",
    title: "Types of Tokens",
    icon: TrendingUp,
    content: (
      <div className="space-y-6">
        <TokenTypes />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Utility Tokens</h4>
            <FeatureList items={[
              "Access to platform services",
              "Governance rights",
              "Network fee payments"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Security Tokens</h4>
            <FeatureList items={[
              "Represent ownership",
              "Dividend rights",
              "Regulated instruments"
            ]} />
          </div>
        </div>
      </div>
    )
  },
  {
    id: "challenges",
    title: "Challenges and Considerations",
    icon: AlertTriangle,
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Market Saturation</h4>
            <FeatureList items={[
              "Thousands of altcoins exist",
              "Difficult for investors to navigate",
              "Many projects fail to gain traction"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Technical Vulnerabilities</h4>
            <FeatureList items={[
              "Smart contract bugs",
              "Network security risks",
              "Scalability challenges"
            ]} />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Regulatory Challenges</h4>
            <FeatureList items={[
              "Varying global regulations",
              "Compliance requirements",
              "Legal uncertainties"
            ]} />
          </div>
        </div>

        <KeyConcept title="Important Considerations">
          When evaluating altcoins and tokens, consider factors such as the team's
          experience, technical architecture, market need, and regulatory compliance.
        </KeyConcept>
      </div>
    )
  }
];

export default function AltcoinsTokensSection() {
  const [showQuiz] = useState(false);

  return (
    <CourseSection
      moduleId={1}
      sectionId="altcoins-tokens"
      title="Altcoins and Tokens: Beyond Bitcoin"
      description="Explore the diverse ecosystem of cryptocurrencies beyond Bitcoin and understand the different types of blockchain-based assets."
      backLink="/modules/module1/bitcoin"
      backLinkText="Back to Bitcoin"
      nextLink="/modules/module1/crypto-market"
      nextLinkText="Next: Crypto Market Dynamics"
      sections={sections}
      quiz={showQuiz ? <AltcoinsTokensQuiz /> : null}
    />
  );
}