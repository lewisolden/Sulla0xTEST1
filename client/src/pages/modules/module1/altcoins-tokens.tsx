import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function AltcoinsTokensSection() {
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
        updateProgress(1, 'altcoins-tokens', true);
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
          Altcoins and Tokens
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            Beyond Bitcoin, the cryptocurrency ecosystem has flourished with numerous 
            alternative coins (altcoins) and tokens, each serving different purposes 
            and offering unique features.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Understanding Altcoins</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. What are Altcoins?</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Alternative cryptocurrencies to Bitcoin</li>
            <li>Different consensus mechanisms</li>
            <li>Unique features and use cases</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Types of Tokens</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Utility tokens</li>
            <li>Security tokens</li>
            <li>Governance tokens</li>
            <li>Non-fungible tokens (NFTs)</li>
          </ul>

          {isFullyRead && (
            <Card className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Altcoins and Tokens section!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
