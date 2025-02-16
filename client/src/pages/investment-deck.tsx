import React, { useState, useEffect, useRef } from 'react';
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
import { Card } from '@/components/ui/card';
import { Brain, Rocket, Cpu, Users, Network, MessageSquare, Target, Book } from 'lucide-react';

const InvestmentDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    {
      id: 10,
      title: "Sensei AI Tutor",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">Sensei - AI-Powered Personal Learning Assistant</h2>
            <p className="text-lg text-gray-400">Adaptive learning companion leveraging advanced AI for personalized education</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <Brain className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-200">Core Capabilities</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Natural Conversations</h4>
                    <p className="text-sm text-gray-400">Advanced language model for intuitive learning interactions and real-time support</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Personalized Learning</h4>
                    <p className="text-sm text-gray-400">Adapts teaching style and content based on individual progress and preferences</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Book className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Curriculum Integration</h4>
                    <p className="text-sm text-gray-400">Deep understanding of course materials for contextual assistance</p>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <Rocket className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-semibold text-gray-200">Future Enhancements</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Cpu className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Continuous Learning</h4>
                    <p className="text-sm text-gray-400">Evolving knowledge base through user interactions and feedback loops</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Community Insights</h4>
                    <p className="text-sm text-gray-400">Aggregated learning patterns to improve educational strategies</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Network className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-200">Advanced Integration</h4>
                    <p className="text-sm text-gray-400">Deeper course content understanding and real-time adaptation capabilities</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )
    },
    productSlide2,
    gtmStrategySlide,
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
              {typeof slides[currentSlide] === 'object' && 'content' in slides[currentSlide] 
                ? slides[currentSlide].content 
                : slides[currentSlide]}
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