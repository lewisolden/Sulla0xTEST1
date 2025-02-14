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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 min-h-[85vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-50">
          <Button
            variant="outline"
            onClick={previousSlide}
            disabled={currentSlide === 0}
            className="bg-gray-900/50 hover:bg-gray-800/50 border-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <span className="text-gray-400 font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-gray-900/50 hover:bg-gray-800/50 border-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            onClick={toggleFullscreen}
            className="ml-4 bg-gray-900/50 hover:bg-gray-800/50 border-gray-700 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6" />
            ) : (
              <Maximize2 className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDeck;