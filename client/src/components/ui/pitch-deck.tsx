import React, { useState, useRef, useEffect } from 'react';
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

  // Check if we're in export mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('export') === 'true') {
      setIsExporting(true);
    }
  }, []);

  // Signal when the deck is ready for export
  useEffect(() => {
    if (isExporting && deckRef.current) {
      deckRef.current.dataset.exportReady = 'true';
    }
  }, [isExporting]);

  const handleExport = async () => {
    try {
      // Redirect to the PDF download endpoint
      window.location.href = '/api/deck/download';
    } catch (error) {
      console.error('PDF export failed:', error);
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="relative">
        <div id="deck-content" ref={deckRef}>
          {isExporting ? (
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  style={{
                    pageBreakInside: 'avoid',
                    pageBreakBefore: index === 0 ? 'avoid' : 'always',
                    pageBreakAfter: 'avoid',
                    marginBottom: '0',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {slide}
                </div>
              ))}
            </div>
          ) : (
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
            </div>
          )}
        </div>
        {!isExporting && (
          <button
            onClick={handleExport}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default PitchDeck;