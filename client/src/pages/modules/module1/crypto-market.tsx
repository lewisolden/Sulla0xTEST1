import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CryptoMarketQuiz from "@/components/modules/quizzes/CryptoMarketQuiz";

export default function CryptoMarketSection() {
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
        updateProgress(1, 'crypto-market', true);
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
          <Link href="/modules/module1/altcoins-tokens">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Altcoins and Tokens
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Understanding Cryptocurrency Market Dynamics
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p className="lead">
            The cryptocurrency market is known for its unique characteristics, high volatility, 
            and complex dynamics. Understanding these market mechanics is crucial for anyone 
            looking to participate in or study the crypto ecosystem.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Fundamentals</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Market Capitalization</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Definition and calculation methods</li>
            <li>Relationship with price and supply</li>
            <li>Market dominance metrics</li>
            <li>Circulating vs. total supply</li>
            <li>Impact on market perception</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Trading Volume</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>24-hour trading volume significance</li>
            <li>Volume indicators and analysis</li>
            <li>Relationship with price movements</li>
            <li>Exchange volume distribution</li>
            <li>Wash trading and volume manipulation</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Behavior</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Volatility</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Price volatility characteristics</li>
            <li>Factors affecting volatility</li>
            <li>Risk management strategies</li>
            <li>Historical volatility patterns</li>
            <li>Impact on adoption and usage</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Market Sentiment</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Fear and Greed Index</li>
            <li>Social media influence</li>
            <li>News impact analysis</li>
            <li>Technical analysis indicators</li>
            <li>Market psychology factors</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Infrastructure</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Exchanges</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Centralized vs. decentralized exchanges</li>
            <li>Liquidity pools and market makers</li>
            <li>Order book dynamics</li>
            <li>Trading pairs and base currencies</li>
            <li>Exchange security considerations</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Market Analysis</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Technical analysis tools</li>
            <li>Fundamental analysis methods</li>
            <li>On-chain metrics and analysis</li>
            <li>Market cycles and trends</li>
            <li>Price discovery mechanisms</li>
          </ul>
        </div>

        {isFullyRead && (
          <div className="mt-8 space-y-6">
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Crypto Market Dynamics section! You now understand 
                how cryptocurrency markets function, their unique characteristics, and key 
                metrics for analysis.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module1/altcoins-tokens">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Topic
                </Button>
              </Link>

              <Link href="/modules/module1/cryptography">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Next Topic: Cryptography <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {showQuiz && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                <CryptoMarketQuiz />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}