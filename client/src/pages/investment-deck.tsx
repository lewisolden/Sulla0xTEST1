import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
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
  technicalSlide,
  roadmapSlide,
  gtmSlide1,
  gtmSlide2,
  tractionSlide,
  financialSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  progressSlide,
  ctaSlide,
} from '@/components/ui/presentation-slides';

const InvestmentDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    technicalSlide,
    modulesSlide,
    roadmapSlide,
    gtmSlide1,
    gtmSlide2,
    tractionSlide,
    financialSlide,
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[85vh] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {slides[currentSlide]}
          </motion.div>
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
        <span className="text-blue-200 font-medium">
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
        <Button
          variant="outline"
          onClick={toggleFullscreen}
          className="ml-4 bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/50"
        >
          {isFullscreen ? (
            <Minimize2 className="w-6 h-6" />
          ) : (
            <Maximize2 className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default InvestmentDeck;