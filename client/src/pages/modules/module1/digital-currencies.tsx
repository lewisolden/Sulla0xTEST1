import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DigitalCurrenciesSection() {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, []);

  const updateProgress = (moduleId: number, sectionId: string, completed: boolean) => {
    console.log(`Progress updated: Module ${moduleId}, Section ${sectionId}, Completed: ${completed}`);
  };

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
          <p>
            Digital currencies represent a revolutionary shift in how we think about 
            and use money. Unlike traditional physical currencies, digital currencies 
            exist purely in electronic form and operate independently of conventional 
            banking systems.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">What Are Digital Currencies?</h2>
          
          <p>
            Digital currencies are monetary assets that exist exclusively in digital 
            or electronic form. They can be used for:
          </p>

          <ul className="list-disc pl-5 space-y-3">
            <li>Online purchases and transactions</li>
            <li>Store of value</li>
            <li>International money transfers</li>
            <li>Investment opportunities</li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Types of Digital Currencies</h2>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">1. Cryptocurrencies</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Decentralized digital currencies</li>
            <li>Based on blockchain technology</li>
            <li>Examples: Bitcoin, Ethereum</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-600 mt-6">2. Central Bank Digital Currencies (CBDCs)</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Digital form of national currency</li>
            <li>Issued and regulated by central banks</li>
            <li>Currently in development in many countries</li>
          </ul>

          {isFullyRead && (
            <Card className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 You've completed the Digital Currencies section!
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
