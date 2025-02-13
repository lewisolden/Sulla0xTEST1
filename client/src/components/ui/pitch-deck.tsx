import React, { useState } from 'react';
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
  progressSlide,
  futureFinanceSlide,
  platformInfrastructureSlide,
  gtmSlide1,
  gtmSlide2,
  tokenSlide,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  ctaSlide,
} from './presentation-slides';

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    titleSlide,                    // 1
    problemSlide,                  // 2
    solutionSlide1,                // 3
    solutionSlide2,                // 4
    missionSlide,                  // 5
    marketSlide1,                  // 6
    marketSlide2,                  // 7
    productSlide1,                 // 8
    productSlide2,                 // 9
    modulesSlide,                  // 10
    roadmapSlide,                  // 11
    progressSlide,                 // 12
    futureFinanceSlide,            // 13
    platformInfrastructureSlide,   // 14
    gtmSlide1,                     // 15
    gtmSlide2,                     // 16
    tokenSlide,                    // 17
    tractionSlide,                 // 18
    financialSlide,                // 19
    financialModelSlide,           // 20
    fundingNarrativeSlide,         // 21
    fundingBreakdownSlide,         // 22
    teamSlide,                     // 23
    ctaSlide,                      // 24
  ];

  const handleDownloadPDF = async () => {
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div>
        {slides[currentSlide]}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </button>
          <span className="text-gray-600">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={currentSlide === slides.length - 1}
          >
            Next
            <ChevronRight className="w-6 h-6 ml-2" />
          </button>
        </div>
        <Button
          onClick={handleDownloadPDF}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Download Pitch Deck PDF
        </Button>
      </div>
    </div>
  );
};

export default PitchDeck;
