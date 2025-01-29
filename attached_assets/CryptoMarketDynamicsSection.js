import React, { useState, useEffect } from 'react';

const CryptoMarketDynamicsSection = () => {
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
        updateProgress(1, 'market-dynamics', true);
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
          Cryptocurrency Market Dynamics
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            The cryptocurrency market is known for its high volatility, rapid growth, 
            and unique characteristics. Understanding these market dynamics is crucial 
            for anyone involved in the crypto space, whether as an investor, developer, 
            or researcher.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Characteristics of the Cryptocurrency Market</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. High Volatility</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Prices can fluctuate dramatically within short periods</li>
            <li>Influenced by market sentiment, regulatory news, and technological developments</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. 24/7 Trading</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Unlike traditional markets, crypto markets never close</li>
            <li>Allows for immediate reaction to global events</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Global Accessibility</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Anyone with internet access can participate</li>
            <li>Reduces barriers to entry compared to traditional financial markets</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Capitalization and Trading Volume</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Market Capitalization</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Definition: Total value of a cryptocurrency's circulating supply</li>
            <li>Calculation: Current price × Circulating supply</li>
            <li>Used to rank cryptocurrencies and assess market size</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Trading Volume</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Amount of a cryptocurrency traded in a given period</li>
            <li>Indicator of market liquidity and interest</li>
            <li>High volume often correlates with price volatility</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Factors Influencing Cryptocurrency Prices</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Supply and Demand</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Basic economic principle driving price movements</li>
            <li>Influenced by factors like mining rates, halving events, and token burns</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Market Sentiment</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Investor psychology plays a significant role</li>
            <li>Influenced by news, social media, and market trends</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Regulatory Developments</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Government regulations can significantly impact prices</li>
            <li>Examples: China's crypto bans, U.S. SEC decisions on crypto ETFs</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Analysis Techniques</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Fundamental Analysis</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Evaluating a cryptocurrency's underlying technology, team, and adoption</li>
            <li>Assessing long-term potential and real-world use cases</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Technical Analysis</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Using historical price and volume data to predict future movements</li>
            <li>Common tools: Moving averages, relative strength index (RSI), Fibonacci retracements</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Market Cycles and Patterns</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Bull and Bear Markets</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Bull Market: Period of generally rising prices</li>
            <li>Bear Market: Period of generally falling prices</li>
            <li>Crypto markets can experience extreme versions of these cycles</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Halving Events</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Reduction in mining rewards, typically every four years</li>
            <li>Often associated with bullish price movements due to reduced supply growth</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Risks and Challenges</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Market Manipulation</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Pump and dump schemes</li>
            <li>Wash trading</li>
            <li>Whale activity influence</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Security Risks</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Exchange hacks and theft of digital assets</li>
            <li>Importance of secure storage (hardware wallets, cold storage)</li>
          </ul>
        </div>

        {/* Completion Indicator */}
        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 You've completed the Cryptocurrency Market Dynamics section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoMarketDynamicsSection;
