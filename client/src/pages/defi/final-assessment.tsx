import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  LineChart,
  Lock,
  Wallet,
  Bank,
  Shield
} from "lucide-react";

const assessmentSections = [
  {
    id: 1,
    title: "DeFi Fundamentals",
    type: "matching",
    items: [
      { term: "Flash Loans", definition: "Uncollateralized loans that must be repaid within one transaction block" },
      { term: "Liquidity Mining", definition: "Earning tokens by providing assets to decentralized protocols" },
      { term: "Impermanent Loss", definition: "Value loss experienced by liquidity providers due to price changes" },
      { term: "Yield Farming", definition: "Strategy of maximizing returns by providing liquidity across protocols" }
    ]
  },
  {
    id: 2,
    title: "Protocol Analysis",
    type: "case_study",
    scenario: `A new DeFi protocol has launched with innovative tokenomics:
    - Protocol-owned liquidity model
    - Dynamic interest rates based on utilization
    - Governance token with time-locked voting
    - Cross-chain compatibility`,
    questions: [
      {
        question: "What potential risks should users consider before participating?",
        options: [
          "Smart contract vulnerabilities and audit status",
          "Token distribution and insider allocation",
          "Centralization risks in governance",
          "All of the above"
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 3,
    title: "Technical Implementation",
    type: "code_analysis",
    code: `function provideLiquidity(
  address pool,
  uint256 amountA,
  uint256 amountB
) external {
  require(amountA > 0 && amountB > 0, "Invalid amounts");
  // Transfer tokens to pool
  tokenA.transferFrom(msg.sender, pool, amountA);
  tokenB.transferFrom(msg.sender, pool, amountB);
  // Calculate and mint LP tokens
  uint256 lpTokens = calculateLPTokens(amountA, amountB);
  _mint(msg.sender, lpTokens);
}`,
    questions: [
      {
        question: "What critical security check is missing in this code?",
        options: [
          "Input validation",
          "Slippage protection",
          "Reentrancy guard",
          "Balance verification"
        ],
        correctAnswer: 2
      }
    ]
  }
];

interface DragItem {
  term: string;
  type: string;
}

export default function DeFiFinalAssessment() {
  useScrollTop();
  const [currentSection, setCurrentSection] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { updateProgress } = useProgress();
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);

  const handleMatchingAnswer = (term: string, definition: string) => {
    const newMatches = { ...matches, [term]: definition };
    setMatches(newMatches);
    
    const section = assessmentSections[currentSection];
    const isCorrect = section.items.find(item => item.term === term)?.definition === definition;
    
    toast({
      title: isCorrect ? "Correct match! 🎉" : "Try again",
      description: isCorrect ? "Great job identifying the concept!" : "That's not quite right. Review the terms and try again.",
      variant: isCorrect ? "default" : "destructive",
    });

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleCaseStudyAnswer = (questionIndex: number, selectedOption: number) => {
    const section = assessmentSections[currentSection];
    const question = section.questions[questionIndex];
    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Excellent analysis! 🎯",
        description: "Your understanding of DeFi protocol risks is spot on.",
        variant: "default",
      });
    } else {
      toast({
        title: "Review needed",
        description: "Consider all aspects of protocol security and sustainability.",
        variant: "destructive",
      });
    }
  };

  const handleCodeAnalysisAnswer = (questionIndex: number, selectedOption: number) => {
    const section = assessmentSections[currentSection];
    const question = section.questions[questionIndex];
    const isCorrect = selectedOption === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Expert-level understanding! 🚀",
        description: "You've identified the critical security consideration.",
        variant: "default",
      });
    } else {
      toast({
        title: "Security check missed",
        description: "Review smart contract security best practices.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
      const finalScore = (score / (assessmentSections.length * 2)) * 100;
      updateProgress(
        4,
        'defi-final-assessment',
        finalScore >= 70,
        5,
        undefined,
        finalScore,
        '/defi/final-assessment',
        undefined,
        'DeFi'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6">
            <CardTitle className="text-3xl font-bold text-center">
              DeFi Mastery: Final Assessment
            </CardTitle>
            <p className="text-center mt-2 text-gray-100">
              Demonstrate your expertise in decentralized finance
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Section {currentSection + 1} of {assessmentSections.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      Score: {score}/{assessmentSections.length * 2}
                    </span>
                  </div>
                  <Progress
                    value={(currentSection / assessmentSections.length) * 100}
                    className="h-2"
                  />
                </div>

                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {assessmentSections[currentSection].title}
                  </h2>

                  {assessmentSections[currentSection].type === "matching" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 mb-2">Terms</h3>
                        {assessmentSections[currentSection].items.map((item) => (
                          <motion.div
                            key={item.term}
                            className="p-3 bg-blue-50 rounded-lg cursor-move"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            draggable
                            onDragStart={() => setDraggedTerm(item.term)}
                          >
                            {item.term}
                          </motion.div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-700 mb-2">Definitions</h3>
                        {assessmentSections[currentSection].items.map((item) => (
                          <motion.div
                            key={item.definition}
                            className="p-3 bg-purple-50 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (draggedTerm) {
                                handleMatchingAnswer(draggedTerm, item.definition);
                                setDraggedTerm(null);
                              }
                            }}
                          >
                            {item.definition}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {assessmentSections[currentSection].type === "case_study" && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Scenario Analysis</h3>
                        <p className="text-gray-700 whitespace-pre-line">
                          {assessmentSections[currentSection].scenario}
                        </p>
                      </div>
                      {assessmentSections[currentSection].questions.map((question, idx) => (
                        <div key={idx} className="space-y-3">
                          <p className="font-medium text-gray-800">{question.question}</p>
                          <div className="grid gap-2">
                            {question.options.map((option, optIdx) => (
                              <Button
                                key={optIdx}
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => handleCaseStudyAnswer(idx, optIdx)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {assessmentSections[currentSection].type === "code_analysis" && (
                    <div className="space-y-6">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-gray-100 overflow-x-auto">
                          <code>{assessmentSections[currentSection].code}</code>
                        </pre>
                      </div>
                      {assessmentSections[currentSection].questions.map((question, idx) => (
                        <div key={idx} className="space-y-3">
                          <p className="font-medium text-gray-800">{question.question}</p>
                          <div className="grid gap-2">
                            {question.options.map((option, optIdx) => (
                              <Button
                                key={optIdx}
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => handleCodeAnalysisAnswer(idx, optIdx)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      onClick={handleNext}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {currentSection === assessmentSections.length - 1
                        ? "Complete Assessment"
                        : "Next Section"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {score >= assessmentSections.length * 1.5 ? (
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="h-16 w-16 text-yellow-500 mx-auto" />
                  )}
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Assessment Complete!
                  </h3>
                  <p className="text-xl text-gray-600 mb-2">
                    You scored {score} out of {assessmentSections.length * 2}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(score / (assessmentSections.length * 2)) * 100}%`
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                    <ul className="text-green-700 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        DeFi Protocol Understanding
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Technical Analysis
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Areas for Growth</h4>
                    <ul className="text-yellow-700 text-sm">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Smart Contract Security
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Risk Assessment
                      </li>
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={() => window.location.href = '/curriculum'}
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Return to Curriculum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
