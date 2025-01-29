import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AltcoinsTokensQuiz from "@/components/modules/quizzes/AltcoinsTokensQuiz";

export default function AltcoinsTokensSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'altcoins-tokens', true);
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
          <Link href="/modules/module1/bitcoin">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Bitcoin
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Altcoins and Tokens: Beyond Bitcoin
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p className="lead">
            While Bitcoin pioneered the cryptocurrency revolution, thousands of alternative 
            cryptocurrencies (altcoins) and tokens have emerged, each with unique features 
            and use cases. Understanding these alternatives is crucial for grasping the 
            full potential of blockchain technology.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Understanding Altcoins</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. What are Altcoins?</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Alternative cryptocurrencies to Bitcoin</li>
            <li>Independent blockchains with unique features</li>
            <li>Different consensus mechanisms (PoS, DPoS, etc.)</li>
            <li>Varied focus areas (privacy, scalability, etc.)</li>
            <li>Examples: Ethereum, Litecoin, Cardano</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Major Categories of Altcoins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Payment-focused coins</li>
            <li>Smart contract platforms</li>
            <li>Privacy coins</li>
            <li>Stablecoins</li>
            <li>Governance tokens</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Understanding Tokens</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. What are Tokens?</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Digital assets built on existing blockchains</li>
            <li>Created using smart contract standards (e.g., ERC-20)</li>
            <li>Represent various types of value or utility</li>
            <li>No independent blockchain required</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Types of Tokens</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Utility tokens - Access to services or products</li>
            <li>Security tokens - Investment instruments</li>
            <li>Governance tokens - Voting rights in DAOs</li>
            <li>Non-fungible tokens (NFTs) - Unique digital assets</li>
            <li>Stablecoins - Price-stable cryptocurrency tokens</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Considerations</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Evaluating Projects</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Team experience and track record</li>
            <li>Technical innovation and use case</li>
            <li>Community engagement and support</li>
            <li>Market adoption and partnerships</li>
            <li>Token economics and distribution</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Risks and Challenges</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Market volatility and liquidity risks</li>
            <li>Technical vulnerabilities</li>
            <li>Regulatory uncertainty</li>
            <li>Project sustainability</li>
            <li>Scams and fraudulent projects</li>
          </ul>
        </div>

        {isFullyRead && (
          <div className="mt-8 space-y-6">
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Altcoins and Tokens section! You now understand 
                the diverse ecosystem of cryptocurrencies beyond Bitcoin and the different 
                types of blockchain-based assets.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module1/bitcoin">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                </Button>
              </Link>

              <Link href="/modules/module1/crypto-market">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Next Topic: Crypto Market Dynamics <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {showQuiz && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                <AltcoinsTokensQuiz />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}