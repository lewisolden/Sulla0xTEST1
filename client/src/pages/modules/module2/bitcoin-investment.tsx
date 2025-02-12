import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from 'react';
import { BitcoinInvestmentQuiz } from '@/components/modules/quizzes/BitcoinInvestmentQuiz';


export default function BitcoinInvestment() {
  const handleQuizComplete = () => {
    // Handle quiz completion, e.g., update progress
    console.log('Quiz completed');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bitcoin Investment</h1>

      {/* Content sections */}
      <div className="space-y-8 mb-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Understanding Bitcoin Investment</h2>
          <p className="mb-4">
            Bitcoin investment requires understanding various aspects including market dynamics,
            risk management, and different investment strategies. This section covers key concepts
            to help you make informed investment decisions.
          </p>
        </Card>
      </div>

      {/* Quiz section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Test Your Knowledge</h2>
        <BitcoinInvestmentQuiz onComplete={handleQuizComplete} />
      </div>
    </div>
  );
}