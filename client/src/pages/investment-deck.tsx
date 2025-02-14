import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, CreditCard, BadgePercent, Factory, GraduationCap, Award, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    className="space-y-6"
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <DollarSign className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold text-blue-400">How We Generate Revenue</h2>
      </div>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-blue-950/50 p-6 border-blue-900/50">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Premium Subscriptions</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Basic Plan:</span> $9.99/month</p>
            <p className="text-blue-200/70 text-sm">Core courses and essential features for individual learners</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Pro Plan:</span> $29.99/month</p>
            <p className="text-blue-200/70 text-sm">Advanced content, AI-powered personalization, and premium features</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Enterprise:</span> Custom pricing</p>
            <p className="text-blue-200/70 text-sm">Tailored solutions for organizations with custom requirements</p>
          </div>
        </div>
      </Card>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-blue-950/50 p-6 border-blue-900/50">
        <div className="flex items-center gap-3 mb-4">
          <Factory className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">B2B & Partnership Revenue</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">White-Label Solutions</span></p>
            <p className="text-blue-200/70 text-sm">Platform licensing for educational institutions and enterprises</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Corporate Training</span></p>
            <p className="text-blue-200/70 text-sm">Customized blockchain and AI education programs for businesses</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">API & Integration Services</span></p>
            <p className="text-blue-200/70 text-sm">Enterprise-grade API access and technical integration support</p>
          </div>
        </div>
      </Card>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-blue-950/50 p-6 border-blue-900/50">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-300">Additional Revenue Streams</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">NFT Certifications</span></p>
            <p className="text-blue-200/70 text-sm">Premium blockchain-verified certificates ($99 - $499)</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Sponsored Content</span></p>
            <p className="text-blue-200/70 text-sm">Featured content and partnerships with crypto projects</p>
          </div>
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <p className="text-blue-100"><span className="font-semibold">Marketplace Fees</span></p>
            <p className="text-blue-200/70 text-sm">Commission from community-created content and resources</p>
          </div>
        </div>
      </Card>
    </motion.div>
  </motion.div>
);

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
    dataStrategySlide,
    productSlide2,
    gtmStrategySlide,
    revenueGenerationSlide,
    tractionSlide,
    fundingRequirementsSlide,
    fundingAllocationSlide,
    financialModelSlide,
    teamSlide,
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