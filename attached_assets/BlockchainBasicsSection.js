import React, { useState, useEffect } from 'react';

const BlockchainBasicsSection = () => {
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
        updateProgress(2, 'blockchain-basics', true);
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
          What is a Blockchain?
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            A blockchain is a distributed, decentralized ledger that records transactions 
            across many computers in a way that ensures the integrity and security of 
            the data. It's the underlying technology that powers cryptocurrencies like 
            Bitcoin, but its potential applications extend far beyond digital currencies.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Characteristics of Blockchain</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Distributed Ledger</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Data is spread across multiple nodes (computers) in the network</li>
            <li>Each node has a complete copy of the entire blockchain</li>
            <li>No single point of failure</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Decentralization</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>No single authority controls the blockchain</li>
            <li>Consensus among network participants validates transactions</li>
            <li>Eliminates need for intermediaries</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Immutability</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Once data is recorded, it's extremely difficult to change or delete</li>
            <li>Ensures data integrity and builds trust in the system</li>
            <li>Creates an unalterable history of transactions</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Basic Structure of a Blockchain</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Blocks</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Contain a list of transactions and other key information</li>
            <li>Include a timestamp and a unique identifier (hash)</li>
            <li>Have a specific size limit</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Chain</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Blocks are linked together in chronological order</li>
            <li>Each block contains the hash of the previous block</li>
            <li>Creates an unbreakable chain of information</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">How Blockchain Works</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">The Transaction Process</h3>
          <ol className="list-decimal pl-5 space-y-3">
            <li>A user initiates a transaction</li>
            <li>The transaction is broadcast to all nodes in the network</li>
            <li>Nodes validate the transaction based on the blockchain's rules</li>
            <li>Validated transactions are combined into a block</li>
            <li>The network reaches consensus on the validity of the new block</li>
            <li>The new block is added to the existing blockchain</li>
            <li>The transaction is now recorded and confirmed</li>
          </ol>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Comparison with Traditional Databases</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Key Differences</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-bold mb-2">Traditional Databases:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Centrally controlled</li>
                <li>Can be easily modified</li>
                <li>Limited visibility</li>
                <li>Requires trust in central authority</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Blockchain:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Distributed control</li>
                <li>Immutable records</li>
                <li>Full transparency</li>
                <li>Trust through consensus</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Applications Beyond Cryptocurrency</h2>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>Supply chain management and tracking</li>
            <li>Digital identity verification</li>
            <li>Smart contracts and automated agreements</li>
            <li>Voting systems</li>
            <li>Healthcare record management</li>
            <li>Property and asset registration</li>
          </ul>
        </div>

        {/* Completion Indicator */}
        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 You've completed the Blockchain Basics section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainBasicsSection;
