import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, CreditCard, BadgePercent, Factory, GraduationCap, Award, DollarSign, ArrowRight } from 'lucide-react';
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

const revenueGenerationSlide = (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <DollarSign className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">How We Generate Revenue</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Premium Subscriptions</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Basic: $9.99/month - Core courses and features
            </li>
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Pro: $29.99/month - Advanced content & personalization
            </li>
            <li className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-blue-400" />
              Enterprise: Custom pricing for teams
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Factory className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">B2B Solutions</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              White-label platform licensing
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Custom course development
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              API access for integration
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Educational Partnerships</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              University licensing programs
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Corporate training packages
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Professional certification programs
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">Additional Revenue Streams</h3>
          </div>
          <ul className="space-y-2 text-blue-100">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              NFT certifications ($99 - $499)
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Sponsored content from crypto projects
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Marketplace commission fees
            </li>
          </ul>
        </div>
      </motion.div>
    </div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-6"
    >
      <div className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg">
        <p className="text-lg text-blue-100">
          Our diversified revenue model ensures sustainable growth while maintaining accessibility through a freemium approach. The focus on B2B partnerships and enterprise solutions provides high-margin opportunities while the subscription model delivers predictable recurring revenue.
        </p>
      </div>
    </motion.div>
  </motion.div>
);

const InvestmentDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    revenueGenerationSlide, // 12 (new position)
    tractionSlide,        // 13 (shifted)
    fundingRequirementsSlide, // 14 (shifted)
    fundingAllocationSlide,   // 15 (shifted)
    financialModelSlide,      // 16 (shifted)
    teamSlide,               // 17 (shifted)
    ctaSlide,                // 18 (shifted)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDeck;