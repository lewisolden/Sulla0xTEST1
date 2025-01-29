import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function BitcoinSection() {
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
        updateProgress(1, 'bitcoin', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateProgress = (moduleId: number, sectionId: string, completed: boolean) => {
    console.log(`Progress updated: Module ${moduleId}, Section ${sectionId}, Completed: ${completed}`);
  };

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
          Understanding Bitcoin
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            Bitcoin, introduced in 2009 by the pseudonymous Satoshi Nakamoto, 
            represents a revolutionary approach to digital currency. It combines 
            cryptography, peer-to-peer networking, and economic incentives to create 
            a decentralized digital payment system.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Concepts</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Bitcoin Basics</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Digital scarcity through fixed supply</li>
            <li>Decentralized network structure</li>
            <li>Peer-to-peer transactions</li>
            <li>Blockchain as a public ledger</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Mining and Network Security</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Proof of Work consensus</li>
            <li>Mining rewards and halving</li>
            <li>Network security mechanisms</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Bitcoin Transactions</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Public and private keys</li>
            <li>Bitcoin addresses</li>
            <li>Transaction verification</li>
            <li>Network fees</li>
          </ul>

          {isFullyRead && (
            <Card className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Bitcoin section!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
