import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft, Shield, Landmark, BarChart3, Scale, BadgeCheck } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useProgress } from "@/context/progress-context";

// Quiz questions for the institutional DeFi section
const quizQuestions = [
  {
    question: "What is a key requirement for institutional DeFi adoption?",
    options: [
      "Regulatory compliance and KYC/AML integration",
      "Maximum transaction speed only",
      "Minimal security measures",
      "Decentralized governance only"
    ],
    correctAnswer: 0
  },
  {
    question: "Which feature is essential for institutional-grade custody solutions?",
    options: [
      "Single signature wallets",
      "Multi-signature and MPC technology",
      "Simple password protection",
      "Manual transaction approval only"
    ],
    correctAnswer: 1
  },
  {
    question: "What role do smart contract audits play in institutional DeFi?",
    options: [
      "They are optional security measures",
      "They only check for basic errors",
      "They provide essential risk mitigation and security verification",
      "They are only required for small protocols"
    ],
    correctAnswer: 2
  },
  {
    question: "How do institutions typically approach DeFi liquidity provision?",
    options: [
      "Through individual retail wallets",
      "Without any risk management",
      "Using unaudited protocols only",
      "Through regulated venues and managed risk frameworks"
    ],
    correctAnswer: 3
  },
  {
    question: "Which compliance feature is crucial for institutional DeFi platforms?",
    options: [
      "Transaction monitoring and reporting",
      "Anonymous transactions only",
      "No reporting requirements",
      "Minimal documentation"
    ],
    correctAnswer: 0
  }
];

export default function InstitutionalDefi() {
  useScrollTop();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { updateProgress } = useProgress();

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelection = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      const finalScore = (score / quizQuestions.length) * 100;
      updateProgress(
        4,
        'institutional-defi',
        finalScore >= 70,
        3,
        undefined,
        finalScore,
        '/defi/module4/institutional-defi',
        undefined,
        'DeFi'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link href="/defi/module4">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 4
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {!showQuiz ? (
            <>
              {/* Title Section */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Building2 className="h-12 w-12 text-blue-600" />
                    <h1 className="text-3xl font-bold text-blue-800">
                      Institutional DeFi: Enterprise Solutions & Compliance
                    </h1>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-600 text-lg">
                      Explore how traditional financial institutions are adopting DeFi technology,
                      the regulatory frameworks being developed, and the enterprise-grade solutions
                      enabling institutional participation in decentralized finance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Concepts Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                    Key Institutional DeFi Concepts
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Regulatory Compliance</h3>
                          <p className="text-gray-600">
                            Integration of KYC/AML procedures, reporting requirements, and
                            compliance frameworks within DeFi protocols.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Landmark className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Institutional Custody</h3>
                          <p className="text-gray-600">
                            Advanced custody solutions using multi-signature wallets and MPC
                            technology for secure asset management.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <BarChart3 className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Risk Management</h3>
                          <p className="text-gray-600">
                            Sophisticated risk assessment tools and insurance solutions for
                            institutional-grade security.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Scale className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Governance & Control</h3>
                          <p className="text-gray-600">
                            Enterprise-level governance frameworks and controlled access to
                            DeFi protocols.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Examples */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                    Implementation Examples
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Compliance Solutions</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>Fireblocks (Institutional custody)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>TRM Labs (Transaction monitoring)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>Chainalysis (Compliance tracking)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Enterprise Platforms</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>Aave Arc (Permissioned lending)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>Compound Treasury (Institutional yield)</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span>Anchorage Digital (Regulated custody)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Start Quiz Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleStartQuiz}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Quiz
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
                  Institutional DeFi Quiz
                </h2>

                {!showResults ? (
                  <>
                    <Progress 
                      value={(currentQuestion / quizQuestions.length) * 100} 
                      className="mb-6"
                    />
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </h3>
                      <p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? "default" : "outline"}
                            className="w-full justify-start text-left"
                            onClick={() => handleAnswerSelection(index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                    <p className="text-xl mb-4">
                      Your score: {score} out of {quizQuestions.length}
                    </p>
                    <Progress 
                      value={(score / quizQuestions.length) * 100} 
                      className="mb-6"
                    />
                    {score === quizQuestions.length ? (
                      <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered institutional DeFi concepts!</p>
                    ) : score >= quizQuestions.length * 0.7 ? (
                      <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of institutional DeFi.</p>
                    ) : (
                      <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
                    )}
                    <Link href="/defi/module4/quiz">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Continue to Module 4 Quiz
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}