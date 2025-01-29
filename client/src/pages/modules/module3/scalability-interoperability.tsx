import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";

const ScalabilityInteroperabilitySection = () => {
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
        updateProgress(3, 'scalability-interoperability', true);
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
          3.1 Blockchain Scalability and Interoperability
        </h1>

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <h2 className="text-2xl font-bold text-blue-700">Introduction</h2>
            <p className="text-gray-700">
              As blockchain technology gains wider adoption, two critical challenges have emerged: scalability and interoperability. 
              These issues are crucial to address for blockchain to reach its full potential and achieve mainstream adoption across various industries.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Blockchain Scalability</h2>
            
            <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
            <p className="text-gray-700">
              The ability of a blockchain network to handle an increasing amount of transactions or users without significant degradation in performance.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">The Scalability Trilemma:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Decentralisation</li>
              <li>Security</li>
              <li>Scalability</li>
            </ul>
            <p className="text-gray-700">
              Blockchain networks typically prioritise two of these aspects at the expense of the third.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Scalability Challenges:</h3>
            
            <h4 className="text-lg font-semibold mt-4">1. Transaction Speed</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Many blockchain networks process fewer transactions per second (TPS) compared to traditional systems</li>
              <li>Example: Bitcoin processes ~7 TPS, while Visa can handle thousands</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">2. Block Size</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Larger blocks can increase throughput but require more storage and bandwidth</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">3. Network Congestion</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>High transaction volumes can lead to longer confirmation times and higher fees</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">4. Data Storage</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>As the blockchain grows, it becomes more challenging for nodes to store the entire history</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-8">Scalability Solutions:</h3>

            <h4 className="text-lg font-semibold mt-4">1. Layer 2 Solutions</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Off-chain protocols that handle transactions outside the main blockchain</li>
              <li>Examples: Lightning Network (Bitcoin), Plasma (Ethereum)</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">2. Sharding</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Dividing the network into smaller parts (shards) to process transactions in parallel</li>
              <li>Implemented in Ethereum 2.0 and other blockchain projects</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Blockchain Interoperability</h2>

            <h3 className="text-xl font-semibold text-blue-600">Definition:</h3>
            <p className="text-gray-700">
              The ability of different blockchain networks to exchange and leverage data between one another and other non-blockchain systems.
            </p>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Importance of Interoperability:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Prevents creation of isolated "blockchain silos"</li>
              <li>Enables seamless transfer of assets and information across different networks</li>
              <li>Crucial for widespread blockchain adoption and integration with existing systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6">Interoperability Solutions:</h3>

            <h4 className="text-lg font-semibold mt-4">1. Cross-Chain Bridges</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Protocols that enable communication between two or more blockchain networks</li>
              <li>Example: Polkadot's bridges connecting different parachains</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4">2. Atomic Swaps</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Allow direct exchange of cryptocurrencies from different blockchains without intermediaries</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mt-8">Future Outlook</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Continued research and development in scalability solutions</li>
              <li>Growing focus on creating interoperable blockchain ecosystems</li>
              <li>Potential emergence of "blockchain of blockchains" or internet-like infrastructure</li>
              <li>Increased collaboration between different blockchain projects</li>
            </ul>
          </CardContent>
        </Card>

        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 Congratulations! You've completed the Blockchain Scalability and Interoperability section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScalabilityInteroperabilitySection;
