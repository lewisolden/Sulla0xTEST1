import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2pdf from 'html2pdf.js';
import {
  titleSlide,
  problemSlide,
  solutionSlide1,
  solutionSlide2,
  missionSlide,
  marketSlide1,
  marketSlide2,
  productSlide1,
  dataStrategySlide,
  productSlide2,
  gtmStrategySlide,
  tractionSlide,
  fundingRequirementsSlide,
  fundingAllocationSlide,
  financialModelSlide,
  teamSlide,
  ctaSlide,
} from '@/components/ui/presentation-slides';

const InvestmentDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const slides = [
    titleSlide,            // 1
    problemSlide,         // 2
    solutionSlide1,       // 3
    solutionSlide2,       // 4
    missionSlide,         // 5
    marketSlide1,         // 6
    marketSlide2,         // 7
    productSlide1,        // 8
    dataStrategySlide,    // 9
    productSlide2,        // 10
    gtmStrategySlide,     // 11
    tractionSlide,        // 12
    fundingRequirementsSlide, // 13
    fundingAllocationSlide,   // 14
    financialModelSlide,      // 15
    teamSlide,               // 16
    ctaSlide,                // 17
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      // Get the current slide
      const currentSlideElement = document.querySelector('.slide-wrapper');
      if (!currentSlideElement) return;

      const opt = {
        margin: [10, 10],
        filename: 'Sulla-Investment-Deck.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'landscape'
        }
      };

      // Export current slide
      await html2pdf().set(opt).from(currentSlideElement).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
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
              className="slide-wrapper w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="fixed bottom-8 left-0 right-0 z-50">
          <div className="max-w-fit mx-auto backdrop-blur-sm bg-black/20 rounded-full border border-gray-800/50 p-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousSlide}
              disabled={currentSlide === 0}
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-gray-400 text-sm px-2 min-w-[3rem] text-center">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-gray-800 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <div className="w-px h-4 bg-gray-800 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              onClick={exportToPDF}
              disabled={isExporting}
              className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDeck;