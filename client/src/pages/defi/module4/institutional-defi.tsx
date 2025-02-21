import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft, Shield, Landmark, BarChart3, Scale, BadgeCheck, ChartBar, Network, Lock, BookOpen, ArrowRight } from "lucide-react";
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
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Institutional DeFi: Enterprise Solutions & Compliance
                    </h1>
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Explore how traditional financial institutions are adopting DeFi technology,
                      the regulatory frameworks being developed, and the enterprise-grade solutions
                      enabling institutional participation in decentralized finance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content Tabs */}
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

              {/* Start Quiz Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleStartQuiz}
                  className="bg-blue-600 hover:bg-blue-700 transform transition-all duration-200 hover:scale-105"
                >
                  Test Your Knowledge
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
                    <Link href="/defi/module3/quiz">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                        Continue to Module 3 Quiz
                        <ArrowRight className="ml-2 h-4 w-4" />
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