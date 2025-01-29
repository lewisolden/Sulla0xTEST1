import React, { useState, useEffect } from 'react';

const SmartContractsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mock progress update function
  const updateProgress = (moduleId, sectionId, completed) => {
    console.log(`Progress updated: Module ${moduleId}, Section ${sectionId}, Completed: ${completed}`);
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'smart-contracts', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Smart Contracts
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            Smart contracts are self-executing contracts with the terms of the agreement 
            directly written into code. They are a key feature of many blockchain 
            platforms, enabling automated, trustless transactions and complex 
            decentralized applications.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Characteristics</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Autonomy</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Execute automatically without intervention</li>
            <li>No need for intermediaries</li>
            <li>Predetermined conditions trigger actions</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Transparency</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>All parties can view the contract's code</li>
            <li>Terms are publicly visible on the blockchain</li>
            <li>Execution results are verifiable</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Immutability</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Once deployed, code cannot be changed</li>
            <li>Ensures contract terms remain constant</li>
            <li>Builds trust between parties</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">How Smart Contracts Work</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">The Process</h3>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Contract code is written and tested</li>
            <li>Code is deployed to the blockchain</li>
            <li>Contract waits for triggering conditions</li>
            <li>When conditions are met, contract executes automatically</li>
            <li>Results are recorded on the blockchain</li>
          </ol>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Use Cases</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Financial Services</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Automated lending and borrowing</li>
            <li>Insurance claim processing</li>
            <li>Decentralized exchanges</li>
            <li>Automated market makers</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Supply Chain</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Automated payments upon delivery</li>
            <li>Product tracking and verification</li>
            <li>Supplier management</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Real Estate</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Property transfers</li>
            <li>Rental agreements</li>
            <li>Automated payments</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Smart Contract Platforms</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Ethereum</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>First and most popular smart contract platform</li>
            <li>Uses Solidity programming language</li>
            <li>Large developer community</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Alternative Platforms</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Cardano (Plutus)</li>
            <li>Solana (Rust)</li>
            <li>Polkadot (Substrate)</li>
            <li>Binance Smart Chain (Compatible with Ethereum)</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Challenges and Limitations</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Security Risks</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Code vulnerabilities</li>
            <li>Smart contract bugs</li>
            <li>Potential for exploits</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Technical Limitations</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Scalability constraints</li>
            <li>Limited ability to modify once deployed</li>
            <li>Complex debugging process</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Oracle Problem</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Connecting with external data sources</li>
            <li>Ensuring data reliability</li>
            <li>Maintaining decentralization</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Future of Smart Contracts</h2>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>Integration with artificial intelligence</li>
            <li>Improved interoperability between platforms</li>
            <li>Enhanced security features</li>
            <li>More user-friendly development tools</li>
            <li>Wider adoption in traditional industries</li>
            <li>Legal recognition and standardization</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Best Practices</h2>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>Thorough testing before deployment</li>
            <li>Code audits by security experts</li>
            <li>Clear documentation of functionality</li>
            <li>Fail-safe mechanisms</li>
            <li>Gas optimization (for Ethereum)</li>
            <li>Regular security updates when possible</li>
          </ul>
        </div>

        {/* Completion Indicator */}
        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 You've completed the Smart Contracts section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartContractsSection;
