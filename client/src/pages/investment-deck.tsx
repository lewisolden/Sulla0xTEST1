import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  titleSlide,
  problemSlide,
  solutionSlide1,
  solutionSlide2,
  missionSlide,
  marketSlide1,
  marketSlide2,
  productSlide1,
  productSlide2,
  modulesSlide,
  roadmapSlide,
  gtmSlide1,
  gtmSlide2,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  progressSlide,
  ctaSlide,
  tokenSlide,
} from '@/components/ui/presentation-slides';

const InvestmentDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    titleSlide,
    problemSlide,
    solutionSlide1,
    solutionSlide2,
    missionSlide,
    marketSlide1,
    marketSlide2,
    productSlide1,
    productSlide2,
    modulesSlide,
    roadmapSlide,
    gtmSlide1,
    gtmSlide2,
    tractionSlide,
    financialSlide,
    financialModelSlide,
    fundingNarrativeSlide,
    fundingBreakdownSlide,
    teamSlide,
    progressSlide,
    ctaSlide,
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        previousSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto relative min-h-[80vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {slides[currentSlide]}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={previousSlide}
          disabled={currentSlide === 0}
          className="bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <span className="text-blue-200">
          {currentSlide + 1} / {slides.length}
        </span>
        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default InvestmentDeck;