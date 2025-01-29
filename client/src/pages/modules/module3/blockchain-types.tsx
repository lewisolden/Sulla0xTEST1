import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";

const BlockchainTypesSection = () => {
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
        updateProgress(3, 'blockchain-types', true);
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
          3.2 Different Types of Blockchains
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <h2 className="text-2xl font-bold text-blue-700">Introduction</h2>
            <p className="text-gray-700">
              Blockchains can be categorised into different types based on their accessibility, level of decentralisation, 
              and purpose. The three main types are public, private, and consortium blockchains. Each type has its own 
              characteristics, advantages, and use cases.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">1. Public Blockchains</h2>
            
            <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
            <p className="text-gray-700">
              Open, decentralised networks where anyone can participate without permission.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Fully decentralised</li>
              <li>Transparent</li>
              <li>Anonymity or pseudonymity for users</li>
              <li>Incentivized participation (usually through cryptocurrency rewards)</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Bitcoin</li>
              <li>Ethereum</li>
              <li>Litecoin</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">2. Private Blockchains</h2>
            
            <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
            <p className="text-gray-700">
              Permissioned networks operated by a single organisation, controlling who can participate.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Centralised control</li>
              <li>Limited access</li>
              <li>Higher degree of privacy</li>
              <li>Faster transactions and lower costs</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Hyperledger Fabric</li>
              <li>Corda</li>
              <li>Quorum</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">3. Consortium Blockchains</h2>
            
            <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
            <p className="text-gray-700">
              Partially decentralised systems where a group of organisations govern the network.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Key Characteristics:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Permissioned network</li>
              <li>Shared control among multiple organisations</li>
              <li>Balance between public and private blockchains</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">Examples:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Energy Web Chain</li>
              <li>IBM Food Trust</li>
              <li>R3 Corda (when used by a consortium)</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Comparison of Blockchain Types</h2>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">1. Decentralisation</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Public: Highest</li>
              <li>Consortium: Medium</li>
              <li>Private: Lowest</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-4">2. Speed and Efficiency</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Public: Lowest</li>
              <li>Consortium: Medium</li>
              <li>Private: Highest</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Choosing the Right Type</h2>
            
            <h3 className="text-xl font-semibold text-blue-600">Factors to Consider:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Purpose of the blockchain</li>
              <li>Required level of decentralisation</li>
              <li>Privacy and data protection needs</li>
              <li>Scalability requirements</li>
              <li>Regulatory compliance</li>
            </ul>
          </CardContent>
        </Card>

        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 Congratulations! You've completed the Different Types of Blockchains section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainTypesSection;
