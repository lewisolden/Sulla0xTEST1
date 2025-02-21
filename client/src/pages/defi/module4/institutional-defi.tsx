import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft, Shield, Landmark, BarChart3, Scale, BadgeCheck, ChartBar, Network, Lock, BookOpen, ArrowRight, Activity, CircleDollarSign, Database } from "lucide-react";
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
    correctAnswer: 0,
    explanation: "Institutional adoption hinges on robust regulatory compliance and KYC/AML integration to prevent illicit activities and meet legal standards."
  },
  {
    question: "Which feature is essential for institutional-grade custody solutions?",
    options: [
      "Single signature wallets",
      "Multi-signature and MPC technology",
      "Simple password protection",
      "Manual transaction approval only"
    ],
    correctAnswer: 1,
    explanation: "Multi-signature and MPC (Multi-Party Computation) technology are crucial for secure and robust institutional-grade custody, offering enhanced security and control over assets."
  },
  {
    question: "What role do smart contract audits play in institutional DeFi?",
    options: [
      "They are optional security measures",
      "They only check for basic errors",
      "They provide essential risk mitigation and security verification",
      "They are only required for small protocols"
    ],
    correctAnswer: 2,
    explanation: "Smart contract audits are vital for institutional DeFi, providing independent verification of code security and mitigating potential risks associated with smart contract vulnerabilities."
  },
  {
    question: "How do institutions typically approach DeFi liquidity provision?",
    options: [
      "Through individual retail wallets",
      "Without any risk management",
      "Using unaudited protocols only",
      "Through regulated venues and managed risk frameworks"
    ],
    correctAnswer: 3,
    explanation: "Institutions prioritize regulated venues and managed risk frameworks when providing liquidity to DeFi protocols, ensuring compliance and minimizing exposure to potential risks."
  },
  {
    question: "Which compliance feature is crucial for institutional DeFi platforms?",
    options: [
      "Transaction monitoring and reporting",
      "Anonymous transactions only",
      "No reporting requirements",
      "Minimal documentation"
    ],
    correctAnswer: 0,
    explanation: "Transaction monitoring and reporting are essential for compliance in institutional DeFi, enabling regulatory bodies to track activities and prevent illicit finance."
  }
];

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">The Institutional DeFi Revolution</h3>
          <p className="text-gray-700 leading-relaxed">
            Institutional DeFi represents a transformative convergence of traditional finance and decentralized technologies.
            As major financial institutions increasingly explore blockchain solutions, the DeFi ecosystem is evolving to
            meet enterprise-grade requirements while maintaining the core benefits of decentralization.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-800">Enterprise Security</h4>
              </div>
              <p className="text-gray-600">
                Institutional-grade security measures including multi-signature wallets, hardware security modules, and comprehensive audit trails.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-purple-600" />
                <h4 className="text-lg font-semibold text-purple-800">Regulatory Compliance</h4>
              </div>
              <p className="text-gray-600">
                Built-in compliance frameworks supporting KYC/AML requirements, reporting standards, and regulatory oversight.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Network className="h-8 w-8 text-indigo-600" />
                <h4 className="text-lg font-semibold text-indigo-800">Market Integration</h4>
              </div>
              <p className="text-gray-600">
                Seamless integration with traditional financial systems, enabling efficient capital flow between TradFi and DeFi.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Building2,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Enterprise-Grade Infrastructure</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Custody Solutions</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Multi-signature wallet architectures</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Hardware Security Module (HSM) integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Real-time monitoring and reporting</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Trading Infrastructure</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Network className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">High-throughput order matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChartBar className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Advanced risk management systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Scale className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Automated compliance checks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "implementation",
    title: "Implementation",
    icon: BadgeCheck,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Implementation Examples</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Enterprise Solutions</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Fireblocks</span>
                      <p className="text-sm text-gray-600">Institutional-grade digital asset custody</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Aave Arc</span>
                      <p className="text-sm text-gray-600">Permissioned lending protocol for institutions</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Compound Treasury</span>
                      <p className="text-sm text-gray-600">Institutional fixed-rate lending service</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-purple-800 mb-4">Compliance Tools</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">TRM Labs</span>
                      <p className="text-sm text-gray-600">Blockchain intelligence and monitoring</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Chainalysis KYT</span>
                      <p className="text-sm text-gray-600">Real-time transaction monitoring</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Elliptic</span>
                      <p className="text-sm text-gray-600">Crypto asset risk management</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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
  const [activeTab, setActiveTab] = useState("overview");
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return; // Prevent multiple selections while showing explanation

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Let's look at why this is correct.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand the correct answer.",
        variant: "destructive",
      });
    }

    // Auto advance after showing explanation
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        const finalScore = ((score + (isCorrect ? 1 : 0)) / quizQuestions.length) * 100;
        updateProgress(
          4,
          'institutional-defi',
          finalScore >= 70,
          3,
          undefined,
          finalScore,
          '/defi/module4/defi-governance',
          undefined,
          'DeFi'
        );
      }
    }, 3000); // Show explanation for 3 seconds before advancing
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
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
          {!showResults ? (
            <>
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-3xl">
                    Institutional DeFi: Enterprise Solutions & Compliance
                  </CardTitle>
                  <p className="text-blue-100 mt-2">
                    Explore how traditional financial institutions are adopting DeFi technology,
                    the regulatory frameworks being developed, and the enterprise-grade solutions
                    enabling institutional participation in decentralized finance.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Understanding DeFi analytics is crucial for making informed decisions. Learn about key metrics,
                      data interpretation, and market analysis techniques.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                              <ChartBar className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Key Metrics</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Understanding and interpreting essential DeFi metrics
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                              <Activity className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Market Analysis</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Tools and techniques for analyzing DeFi markets
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-indigo-200">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                              <Shield className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Risk Assessment</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Evaluating and managing DeFi investment risks
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  {sections.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center gap-2"
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id}>
                    <Card>
                      <CardContent className="p-6">
                        {section.content}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
                  <p className="text-blue-100 mt-2">
                    Verify your understanding of Institutional DeFi concepts
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {!quizStarted ? (
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        Ready to test your knowledge of Institutional DeFi concepts and implementation?
                      </p>
                      <Button onClick={handleStartQuiz} className="w-full md:w-auto">
                        Start Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mb-6" />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            Question {currentQuestion + 1}/{quizQuestions.length}
                          </h3>
                          <span className="text-sm font-medium text-blue-600">
                            Score: {score}/{quizQuestions.length}
                          </span>
                        </div>
                        <p className="text-lg">{quizQuestions[currentQuestion].question}</p>
                        <div className="space-y-3">
                          {quizQuestions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              variant={selectedAnswer === index ? 
                                (index === quizQuestions[currentQuestion].correctAnswer ? "default" : "destructive")
                                : "outline"}
                              disabled={showExplanation}
                              className="w-full justify-start text-left"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-blue-50 p-4 rounded-lg"
                          >
                            <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                            <p className="text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                  <p className="text-xl mb-4">
                    Your score: {score}/{quizQuestions.length}
                  </p>
                  <Progress value={(score / quizQuestions.length) * 100} className="mb-6" />
                  {score === quizQuestions.length ? (
                    <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered Institutional DeFi concepts!</p>
                  ) : score >= quizQuestions.length * 0.7 ? (
                    <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of Institutional DeFi.</p>
                  ) : (
                    <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
                  )}
                  <Link href="/defi/module4/defi-governance">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Continue to DeFi Governance
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}