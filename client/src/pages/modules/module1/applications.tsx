import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";

const PracticalApplicationsSection = () => {
  useScrollTop();
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
        updateProgress(1, 'practical-applications', true);
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
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Practical Applications of Blockchain Technology
        </h1>

        <div className="prose lg:prose-xl text-gray-700 space-y-6">
          <p>
            The potential applications of blockchain technology extend far beyond cryptocurrencies. Let's explore how this revolutionary technology is transforming various industries and creating new possibilities for business and society.
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Key Application Areas</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Supply Chain Management</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Real-time tracking and verification</li>
                <li>Authenticity verification</li>
                <li>Automated compliance</li>
                <li>Inventory optimization</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-green-600 mb-3">Financial Services</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cross-border transactions</li>
                <li>Smart contracts</li>
                <li>Asset tokenization</li>
                <li>Automated settlements</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Healthcare</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Medical record management</li>
                <li>Drug supply verification</li>
                <li>Clinical trial tracking</li>
                <li>Patient data security</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Government & Public Sector</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Digital identity systems</li>
                <li>Secure voting platforms</li>
                <li>Public record management</li>
                <li>Transparent governance</li>
              </ul>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Real-World Impact</h2>

          <p>
            These applications are not just theoretical—they're already making a real difference in how businesses operate and how services are delivered. For example:
          </p>

          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Supply Chain:</strong> Major retailers are using blockchain to track products from source to shelf, ensuring authenticity and improving safety.
            </li>
            <li>
              <strong>Healthcare:</strong> Hospitals are implementing blockchain-based systems to securely share patient records while maintaining privacy.
            </li>
            <li>
              <strong>Financial Services:</strong> Banks are using blockchain to reduce transaction times from days to minutes while cutting costs.
            </li>
            <li>
              <strong>Government:</strong> Several countries are piloting blockchain-based voting systems to increase transparency and security.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-blue-700 mt-8">Future Possibilities</h2>

          <p>
            The future of blockchain applications is even more promising. We're seeing innovation in areas like:
          </p>

          <ul className="list-disc pl-5 space-y-3">
            <li>Decentralized social media platforms</li>
            <li>Smart city infrastructure management</li>
            <li>Environmental sustainability tracking</li>
            <li>Education credential verification</li>
          </ul>
        </div>

        {/* Completion Indicator */}
        {isFullyRead && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              🎉 You've completed the Practical Applications section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticalApplicationsSection;