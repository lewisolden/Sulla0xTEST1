import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Users,
  Vote,
  Database,
  NetworkIcon,
  LightbulbIcon,
  ChartBarIcon,
  ApertureIcon,
  ShieldCheckIcon,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Oracle Networks Component
const OracleNetworks = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Oracle Architecture</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Oracle networks serve as the critical bridge between blockchain smart contracts
                and external data sources. They provide:
              </p>
              <ul className="space-y-2">
                {[
                  "Decentralized data feeds for reliable price information",
                  "Verifiable random functions (VRF) for fair randomness",
                  "Automated smart contract execution triggers",
                  "Cross-chain interoperability solutions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <NetworkIcon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Network Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Oracle networks implement multiple security layers to ensure data integrity:
              </p>
              <ul className="space-y-2">
                {[
                  "Cryptographic proofs for data validity",
                  "Economic incentives for honest node operation",
                  "Reputation systems for node operators",
                  "Multi-layered data aggregation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">Popular Oracle Networks</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Chainlink",
              description: "Industry-leading decentralized oracle network",
              features: ["Price Feeds", "VRF", "Automation", "Cross-Chain"]
            },
            {
              name: "Pyth Network",
              description: "High-performance oracle optimized for financial data",
              features: ["HFT Grade Data", "Sub-second Latency", "Cross-Chain", "Institutional Grade"]
            },
            {
              name: "API3",
              description: "First-party oracle solution for API providers",
              features: ["dAPI", "Airnode", "Self-Funded Oracles", "Direct Integration"]
            }
          ].map((network, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-indigo-700 mb-2">{network.name}</h4>
              <p className="text-gray-600 mb-3">{network.description}</p>
              <ul className="space-y-1">
                {network.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Governance Quiz Component
const GovernanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { updateProgress } = useProgress();
  const [, setLocation] = useLocation();

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of a DAO?",
      options: [
        "To centralize decision making",
        "To automate all blockchain operations",
        "To enable decentralized community governance",
        "To maximize token prices"
      ],
      correctAnswer: 2,
      explanation: "DAOs (Decentralized Autonomous Organizations) are designed to enable community-driven governance where token holders can participate in decision-making processes transparently and democratically."
    },
    {
      id: 2,
      question: "What role do oracles play in DeFi protocols?",
      options: [
        "They store all blockchain data",
        "They connect smart contracts with external data",
        "They mine new blocks",
        "They manage user accounts"
      ],
      correctAnswer: 1,
      explanation: "Oracles serve as bridges between blockchain smart contracts and external data sources, enabling DeFi protocols to access real-world information like price feeds and market data."
    },
    {
      id: 3,
      question: "Which of these is a key feature of Chainlink's oracle network?",
      options: [
        "Centralized data feeds",
        "Single node architecture",
        "Decentralized node operators",
        "Manual data updates"
      ],
      correctAnswer: 2,
      explanation: "Chainlink uses a network of decentralized node operators to ensure reliable and manipulation-resistant data feeds, making it more secure and robust than centralized alternatives."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    setUserAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowNotification(true);

    if (correct) {
      setScore(score + 1);
    }

    // Show notification briefly
    setTimeout(() => {
      setShowNotification(false);
      setShowExplanation(true);
    }, 1500);

    // Auto advance after showing explanation
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
        const finalScore = Math.round(((score + (correct ? 1 : 0)) / questions.length) * 100);
        updateProgress(
          3,
          'governance-dao',
          finalScore >= 70,
          finalScore
        );
      }
    }, 3000);
  };

  if (!quizStarted) {
    return (
      <Card className="mt-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
          <p className="text-blue-100 mt-2">
            Ready to test your understanding of DAOs, Governance, and Oracle Networks?
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              This quiz will test your knowledge of decentralized governance mechanisms,
              DAO structures, and the role of oracle networks in DeFi.
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Question {currentQuestion + 1}/{questions.length}</CardTitle>
          <span className="text-sm font-medium text-blue-600">
            Score: {Math.round((score / questions.length) * 100)}%
          </span>
        </div>
        <Progress
          value={(currentQuestion / questions.length) * 100}
          className="mt-4"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{questions[currentQuestion].question}</h3>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  variant={userAnswer === index ?
                    (index === questions[currentQuestion].correctAnswer ? "default" : "destructive")
                    : "outline"}
                  disabled={showExplanation}
                  className="w-full justify-start text-left"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Answer Notification - Below questions */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                } text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 mt-4`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5" />
                    <span className="font-medium">Incorrect</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              <p>
                <span className="font-semibold">Explanation: </span>
                {questions[currentQuestion].explanation}
              </p>
              {currentQuestion === questions.length - 1 && (
                <div className="mt-4 space-y-4">
                  <h3 className="text-xl font-bold">Quiz Complete!</h3>
                  <p className="text-gray-600">
                    Final Score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
                  </p>
                  <p className="text-gray-600">
                    {score === questions.length
                      ? "Perfect score! Excellent understanding!"
                      : "Good effort! Review the material and try again!"}
                  </p>
                  <Link href="/defi/module2/quiz">
                    <Button className="w-full">
                      Take Module Quiz
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const GovernanceDAOSection = () => {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [, setLocation] = useLocation();

  const sections = [
    {
      id: "intro",
      title: "Understanding DAOs & Governance",
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Decentralized Autonomous Organizations</h2>
            <p className="text-lg text-blue-100">
              DAOs represent the future of organizational governance, enabling transparent,
              community-driven decision making through blockchain technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Community Governance",
                icon: Vote,
                description: "Token holders participate in decision-making through voting mechanisms"
              },
              {
                title: "Transparent Operations",
                icon: Database,
                description: "All decisions and transactions are recorded on-chain for full transparency"
              },
              {
                title: "Automated Execution",
                icon: NetworkIcon,
                description: "Smart contracts automatically execute approved proposals"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "mechanisms",
      title: "Governance Mechanisms",
      icon: Vote,
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">Voting Mechanisms</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Token-Weighted Voting",
                  description: "Voting power proportional to token holdings",
                  features: [
                    "One token, one vote system",
                    "Quadratic voting options",
                    "Vote delegation support"
                  ]
                },
                {
                  title: "Time-Locked Voting",
                  description: "Tokens locked for voting periods",
                  features: [
                    "Prevents vote manipulation",
                    "Encourages long-term thinking",
                    "Variable lock periods"
                  ]
                }
              ].map((mechanism, index) => (
                <Card key={index} className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-indigo-700">{mechanism.title}</CardTitle>
                    <p className="text-gray-600">{mechanism.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mechanism.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Proposal Creation",
                icon: LightbulbIcon,
                points: [
                  "Minimum token requirement",
                  "Clear formatting guidelines",
                  "Discussion period"
                ]
              },
              {
                title: "Voting Process",
                icon: ChartBarIcon,
                points: [
                  "Multiple voting options",
                  "Vote weight calculation",
                  "Real-time results"
                ]
              },
              {
                title: "Execution",
                icon: ShieldCheckIcon,
                points: [
                  "Timelock delays",
                  "Automated execution",
                  "Emergency cancelation"
                ]
              }
            ].map((phase, index) => (
              <Card key={index} className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <phase.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "oracles",
      title: "Oracle Networks",
      icon: Database,
      content: <OracleNetworks />
    },
    {
      id: "examples",
      title: "Implementation Examples",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Successful DAO Implementations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Uniswap",
                  type: "DeFi Protocol",
                  features: [
                    "Token holder voting rights",
                    "Fee distribution mechanism",
                    "Protocol parameter control"
                  ],
                  metrics: "Over $50M in treasury"
                },
                {
                  name: "Maker DAO",
                  type: "Stablecoin Protocol",
                  features: [
                    "Complex risk parameters",
                    "Multiple collateral types",
                    "Emergency shutdown capability"
                  ],
                  metrics: "Manages billions in collateral"
                }
              ].map((example, index) => (
                <Card key={index} className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">{example.name}</CardTitle>
                    <p className="text-gray-600">{example.type}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {example.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-2 bg-green-50 rounded">
                      <p className="text-green-700 font-medium">{example.metrics}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "quiz",
      title: "Governance Quiz",
      icon: BookOpen,
      content: <GovernanceQuiz />
    }
  ];

  const handleSectionComplete = (index: number) => {
    updateProgress(
      3, // courseId for DeFi course
      'governance-dao', // sectionId
      true, // completed
      ((index + 1) / sections.length) * 100 // progress percentage
    );

    if (index < sections.length - 1) {
      setCurrentSection(index + 1);
      toast({
        title: "Section Complete!",
        description: "Moving to next section...",
      });
    } else {
      toast({
        title: "Topic Complete! 🎉",
        description: "You've completed the Governance & DAO section!",
      });
      // Navigate to the module quiz
      setLocation("/defi/module2/quiz");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/defi/module2" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Governance & DAOs</h1>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={typeof progress === 'number' ? progress : 0} className="w-32" />
            <Link href="/defi/module2/quiz">
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Take Module Quiz
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className={`${
                index === currentSection ? 'border-2 border-blue-500' : ''
              } rounded-lg overflow-hidden`}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-blue-800">
                        {section.title}
                      </CardTitle>
                    </div>
                    {index < currentSection && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
                {currentSection === index && index < sections.length - 1 && (
                  <CardFooter>
                    <Button onClick={() => handleSectionComplete(index)} className="ml-auto">
                      Complete Section
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GovernanceDAOSection;