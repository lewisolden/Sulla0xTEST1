// ... previous imports remain unchanged ...

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

  // ... rest of the component remains unchanged ...
};

export default PitchDeck;
