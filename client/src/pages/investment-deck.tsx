
import React, { useState, useEffect, useRef } from 'react';
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
  const deckRef = useRef<HTMLDivElement>(null);

  const slides = [
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
  ];

  const exportToPDF = async () => {
    if (!deckRef.current) return;
    setIsExporting(true);
    
    const currentSlideBackup = currentSlide;
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    
    // Create a temporary container and add all slides
    for (let i = 0; i < slides.length; i++) {
      setCurrentSlide(i);
      const slideDiv = document.createElement('div');
      slideDiv.style.width = '100%';
      slideDiv.style.height = '100vh';
      slideDiv.style.pageBreakAfter = 'always';
      slideDiv.innerHTML = deckRef.current.innerHTML;
      element.appendChild(slideDiv);
    }

    const opt = {
      margin: 10,
      filename: 'investment-deck.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        windowWidth: 1920,
        windowHeight: 1080
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'landscape'
      },
      pagebreak: { mode: 'avoid-all' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export failed:', error);
    }

    // Restore original slide
    setCurrentSlide(currentSlideBackup);
    setIsExporting(false);
  };

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

      <div className="relative z-10" ref={deckRef}>
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
              {isExporting ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDeck;
