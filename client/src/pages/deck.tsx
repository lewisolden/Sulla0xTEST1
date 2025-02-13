import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Brain,
  Code,
  Database,
  Shield,
  Network,
  ArrowRight,
  BarChart2,
  Building,
  Globe,
  Users,
  MessageCircle,
  Globe2,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Building2,
  Wallet,
  Award,
  LineChart,
  Mail,
  Twitter,
  Coins,
  Lock,
} from 'lucide-react';
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
  progressSlide,
  gtmSlide1,
  gtmSlide2,
  technicalBackendSlide,
  tokenSlide,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  ctaSlide,
} from '@/components/ui/presentation-slides';

// Slide component definition
const Slide: React.FC<{ children: React.ReactNode; key: string }> = ({ children, key }) => (
  <div key={key} className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
    {children}
  </div>
);


const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    try {
      const response = await fetch('/api/deck/download-static');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sulla-pitch-deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

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
    progressSlide, 
    roadmapSlide,
    gtmSlide1,
    gtmSlide2,
    technicalBackendSlide,
    tokenSlide,
    tractionSlide,
    financialSlide,
    financialModelSlide,
    fundingNarrativeSlide,
    fundingBreakdownSlide,
    teamSlide,
    ctaSlide,
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
        if (e.key === "ArrowLeft") setCurrentSlide(c => Math.max(0, c - 1));
      }}
      tabIndex={0}
      ref={deckRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {/* Assuming Logo component exists */}
          <div>Logo</div> {/* Placeholder for Logo component */}
          <Button
            onClick={downloadPDF}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
          </Button>
        </div>

        <div className="relative aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-12"
            >
              <Card className="h-full bg-opacity-90 backdrop-blur-sm p-8 overflow-y-auto bg-gradient-to-br from-blue-900/95 to-black/95">
                {slides[currentSlide]}
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              onClick={() => setCurrentSlide(c => Math.max(c - 1, 0))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="px-4 py-2 bg-white/20 rounded">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              onClick={() => setCurrentSlide(c => Math.min(c + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckPage;