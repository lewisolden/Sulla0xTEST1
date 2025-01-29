import React, { useState, useEffect } from 'react';

const AltcoinsAndTokensSection = () => {
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
        updateProgress(1, 'altcoins', true);
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
          Altcoins and Tokens
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            While Bitcoin was the first cryptocurrency, it sparked the creation of numerous 
            other digital currencies and tokens. These are collectively known as "altcoins" 
            (alternative coins) and tokens. This section explores the diverse world of 
            cryptocurrencies beyond Bitcoin.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">What are Altcoins?</h2>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>Definition: Any cryptocurrency that is not Bitcoin</li>
            <li>Often created to improve upon Bitcoin's perceived limitations or to serve different purposes</li>
            <li>Can have their own independent blockchains or be built on existing blockchain platforms</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Major Categories of Altcoins</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Payment Coins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Purpose: Designed for everyday transactions</li>
            <li>Examples: Litecoin, Bitcoin Cash, Dogecoin</li>
            <li>Features: Often aim for faster transaction speeds or lower fees than Bitcoin</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Platform Coins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Purpose: Support the development of decentralised applications (DApps) and smart contracts</li>
            <li>Examples: Ethereum, Cardano, Solana</li>
            <li>Features: Provide a blockchain infrastructure for building other cryptocurrencies and applications</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Privacy Coins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Purpose: Offer enhanced anonymity and privacy for transactions</li>
            <li>Examples: Monero, Zcash, Dash</li>
            <li>Features: Use advanced cryptographic techniques to obscure transaction details</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">4. Stablecoins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Purpose: Minimize price volatility by pegging value to a reserve asset</li>
            <li>Examples: Tether (USDT), USD Coin (USDC), Dai</li>
            <li>Types: Fiat-collateralized, crypto-collateralized, algorithmic</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Understanding Tokens</h2>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>Definition: Digital assets built on existing blockchain platforms</li>
            <li>Often created using standardized protocols (e.g., ERC-20 on Ethereum)</li>
            <li>Can represent a wide variety of assets or utilities</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Tokens</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Utility Tokens</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Provide access to a product or service within a specific ecosystem</li>
            <li>Example: Basic Attention Token (BAT) used in the Brave browser ecosystem</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Security Tokens</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Represent ownership in an external asset or enterprise</li>
            <li>Subject to securities regulations in many jurisdictions</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Non-Fungible Tokens (NFTs)</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Represent unique digital assets</li>
            <li>Often used for digital art, collectibles, and gaming items</li>
            <li>Example: CryptoPunks, Bored Ape Yacht Club NFTs</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Challenges and Considerations</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Market Saturation</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Thousands of altcoins and tokens exist, making it difficult for investors to navigate</li>
            <li>Many projects fail to gain traction or maintain value over time</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Technical Vulnerabilities</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Smart contract bugs or flaws can lead to significant losses</li>
            <li>Smaller networks may be more vulnerable to 51% attacks</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Regulatory Uncertainty</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Different countries have varying approaches to regulating altcoins and tokens</li>
            <li>Compliance requirements can be complex and evolving</li>
          </ul>
        </div>

        {/* Completion Indicator */}
        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 You've completed the Altcoins and Tokens section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AltcoinsAndTokensSection;
