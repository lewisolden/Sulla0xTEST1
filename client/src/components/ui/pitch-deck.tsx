import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    tokenSlide,
    tractionSlide,
    financialSlide,
    financialModelSlide,
    fundingNarrativeSlide,
    fundingBreakdownSlide,
    teamSlide,
    ctaSlide,
  ];

  const handleDownloadPDF = () => {
    window.location.href = '/api/deck/download-static';
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
        <button
          onClick={handleDownloadPDF}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PitchDeck;