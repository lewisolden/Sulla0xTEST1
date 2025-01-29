import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";

export default function DigitalCurrenciesSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  // Progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'digital-currencies', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Digital Currencies: The Future of Money
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p className="lead">
            Digital currencies represent a revolutionary shift in how we think about 
            and use money. Unlike traditional physical currencies, digital currencies 
            exist purely in electronic form and operate independently of conventional 
            banking systems.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Evolution of Digital Money</h2>

          <p>
            The journey of digital currencies began with early electronic payment systems 
            and has evolved into sophisticated blockchain-based cryptocurrencies. This 
            evolution represents a fundamental shift in how we perceive and use money 
            in the digital age.
          </p>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Historical Development</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Early digital payment systems (1960s-1990s)</li>
            <li>E-gold and digital currency precursors (1990s)</li>
            <li>PayPal and online payment revolution (2000s)</li>
            <li>Birth of Bitcoin and cryptocurrencies (2009)</li>
            <li>Rise of blockchain technology (2010s)</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Digital Currencies</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Cryptocurrencies</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Decentralized digital currencies</li>
            <li>Based on blockchain technology</li>
            <li>Examples: Bitcoin, Ethereum, Litecoin</li>
            <li>Secured by cryptography</li>
            <li>Operate on peer-to-peer networks</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Central Bank Digital Currencies (CBDCs)</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Digital form of national currency</li>
            <li>Issued and regulated by central banks</li>
            <li>Currently in development in many countries</li>
            <li>Potential to revolutionize monetary policy</li>
            <li>Examples of ongoing CBDC projects worldwide</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">3. Stablecoins</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Cryptocurrencies pegged to stable assets</li>
            <li>Designed to minimize price volatility</li>
            <li>Types of collateralization</li>
            <li>Use cases in DeFi and trading</li>
            <li>Popular examples: USDC, USDT, DAI</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Features and Benefits</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Advantages</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Fast and efficient transactions</li>
            <li>Lower transaction costs</li>
            <li>24/7 operation</li>
            <li>Borderless transactions</li>
            <li>Enhanced security through cryptography</li>
            <li>Financial inclusion opportunities</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Challenges</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Regulatory uncertainty</li>
            <li>Security concerns</li>
            <li>Technology adoption barriers</li>
            <li>Environmental impact concerns</li>
            <li>Scalability issues</li>
          </ul>

          {isFullyRead && (
            <Card className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Digital Currencies section! Now you understand 
                the fundamentals of digital currencies and their impact on the future 
                of finance.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}