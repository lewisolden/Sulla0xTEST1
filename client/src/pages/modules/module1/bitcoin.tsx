import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import BitcoinQuiz from "@/components/modules/quizzes/BitcoinQuiz";

export default function BitcoinSection() {
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
        updateProgress(1, 'bitcoin', true);
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
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Bitcoin: The First Cryptocurrency
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p className="lead">
            Bitcoin, launched in 2009 by the pseudonymous Satoshi Nakamoto, represents 
            a revolutionary approach to digital currency. It combines cryptography, 
            peer-to-peer networking, and economic incentives to create a decentralized 
            digital payment system.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">The Origins of Bitcoin</h2>

          <p>
            In the aftermath of the 2008 financial crisis, Bitcoin emerged as a response 
            to the traditional financial system's vulnerabilities. The mysterious creator, 
            Satoshi Nakamoto, published a whitepaper outlining a peer-to-peer electronic 
            cash system that would operate without the need for financial intermediaries.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Innovations</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. The Blockchain</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Decentralized ledger technology</li>
            <li>Immutable transaction record</li>
            <li>Transparent and verifiable history</li>
            <li>Solution to the double-spending problem</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Mining and Network Security</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Proof of Work consensus mechanism</li>
            <li>Mining rewards and block creation</li>
            <li>Network difficulty adjustment</li>
            <li>Halving events and supply control</li>
            <li>Energy consumption considerations</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Bitcoin's Economic Model</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Fixed supply cap of 21 million coins</li>
            <li>Deflationary nature</li>
            <li>Mining rewards and incentives</li>
            <li>Transaction fee market</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Using Bitcoin</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Wallets and Keys</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Public and private keys</li>
            <li>Types of wallets (hot, cold, hardware)</li>
            <li>Wallet security best practices</li>
            <li>Backup and recovery methods</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Transactions</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Creating and broadcasting transactions</li>
            <li>Transaction fees and confirmation times</li>
            <li>Block size and scaling solutions</li>
            <li>Lightning Network and layer-2 solutions</li>
          </ul>
        </div>

        {isFullyRead && (
          <div className="mt-8 space-y-6">
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Bitcoin section! You now understand the fundamentals 
                of Bitcoin, its innovative blockchain technology, and its role as the first 
                cryptocurrency.
              </p>
            </Card>

            <div className="flex flex-col items-center gap-4">
              {!showQuiz && (
                <Button 
                  onClick={() => setShowQuiz(true)}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Take Topic Quiz
                </Button>
              )}

              <Link href="/modules/module1/altcoins-tokens">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Next Topic: Altcoins and Tokens <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {showQuiz && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Topic Quiz</h2>
                <BitcoinQuiz />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}