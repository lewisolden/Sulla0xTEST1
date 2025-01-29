import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";

const DevelopmentPlatformsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'development-platforms', true);
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
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          3.3 Blockchain Development Platforms
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <h2 className="text-2xl font-bold text-blue-700">Introduction</h2>
            <p className="text-gray-700">
              Blockchain development platforms provide the necessary tools and infrastructure for creating 
              decentralised applications (DApps) and smart contracts. These platforms vary in their features, 
              performance, and ecosystem support.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">1. Ethereum</h2>

            <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Launched in 2015 by Vitalik Buterin</li>
              <li>First blockchain platform to introduce smart contracts</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Turing-complete programming language (Solidity)</li>
              <li>Large and active developer community</li>
              <li>Extensive ecosystem of tools and resources</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">2. Solana</h2>

            <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Launched in 2020</li>
              <li>Focuses on high performance and low transaction costs</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Proof of History (PoH) consensus mechanism</li>
              <li>Capable of processing up to 65,000 transactions per second</li>
              <li>Low transaction fees</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">3. Cardano</h2>

            <h3 className="text-xl font-semibold text-blue-600">Overview:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Launched in 2017 by Charles Hoskinson</li>
              <li>Emphasises academic research and peer-reviewed development</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Features:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Proof of Stake consensus (Ouroboros)</li>
              <li>Layered architecture separating computation from settlement</li>
              <li>Focus on sustainability and scalability</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Platform Comparison</h2>

            <h3 className="text-xl font-semibold text-blue-600">1. Transaction Speed</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Solana is faster than Cardano, which is faster than Ethereum (pre-ETH 2.0)</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">2. Decentralisation</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Ethereum has higher decentralization than Cardano, which has higher than Solana</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">3. Developer Ecosystem</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Ethereum leads, followed by Solana, then Cardano</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Conclusion</h2>
            <p className="text-gray-700">
              The choice of blockchain development platform can significantly impact the success of a project. 
              While Ethereum remains the most popular and widely-used platform, alternatives like Solana and 
              Cardano offer unique features and advantages. Developers should choose the platform that best 
              aligns with their project goals and requirements.
            </p>
          </CardContent>
        </Card>

        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 Congratulations! You've completed the Blockchain Development Platforms section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentPlatformsSection;