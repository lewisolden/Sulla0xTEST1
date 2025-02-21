import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, ArrowLeft, Vote, Users, GitFork, ScrollText, 
  BadgeCheck, ChartBar, Network, Lock, BookOpen, ArrowRight, 
  Activity, CircleDollarSign, Database, Scale 
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useProgress } from "@/context/progress-context";

// Quiz questions for the DeFi Governance section
const quizQuestions = [
  {
    question: "What is the primary purpose of a DAO in DeFi governance?",
    options: [
      "Decentralized decision-making and community control",
      "Centralized management only",
      "Purely for profit distribution",
      "Marketing purposes"
    ],
    correctAnswer: 0,
    explanation: "DAOs (Decentralized Autonomous Organizations) enable decentralized decision-making and community control over protocol development and treasury management."
  },
  {
    question: "Which mechanism is commonly used for governance token voting power?",
    options: [
      "Random selection",
      "Token-weighted voting",
      "Age-based voting",
      "Geographic location"
    ],
    correctAnswer: 1,
    explanation: "Token-weighted voting is the standard mechanism where voting power is proportional to the number of governance tokens held."
  },
  {
    question: "What is a governance proposal typically used for?",
    options: [
      "Only for changing protocol fees",
      "Only for marketing decisions",
      "Protocol upgrades, parameter changes, and treasury allocation",
      "Selecting team members"
    ],
    correctAnswer: 2,
    explanation: "Governance proposals are used to suggest and implement protocol upgrades, parameter changes, and treasury allocation decisions."
  },
  {
    question: "What is vote delegation in DeFi governance?",
    options: [
      "Selling voting rights",
      "Transferring voting power to trusted community members",
      "Removing voting rights",
      "Automated voting"
    ],
    correctAnswer: 1,
    explanation: "Vote delegation allows token holders to assign their voting power to trusted community members who actively participate in governance."
  },
  {
    question: "Which feature helps prevent governance attacks?",
    options: [
      "Time locks and quorum requirements",
      "Unlimited voting power",
      "Instant execution",
      "Anonymous proposals"
    ],
    correctAnswer: 0,
    explanation: "Time locks and quorum requirements are essential security features that prevent malicious governance attacks by ensuring proper community participation and review periods."
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
          <h3 className="text-2xl font-bold text-blue-800">DeFi Governance Systems</h3>
          <p className="text-gray-700 leading-relaxed">
            DeFi governance represents the backbone of decentralized protocol management,
            enabling community-driven decision-making and sustainable development through
            sophisticated voting mechanisms and proposal systems.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Vote className="h-8 w-8 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-800">Voting Systems</h4>
              </div>
              <p className="text-gray-600">
                Token-weighted voting, quadratic voting, and other mechanisms for fair protocol governance.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-purple-600" />
                <h4 className="text-lg font-semibold text-purple-800">Community Power</h4>
              </div>
              <p className="text-gray-600">
                Community-driven decision making through DAOs and governance frameworks.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-indigo-600" />
                <h4 className="text-lg font-semibold text-indigo-800">Balance of Power</h4>
              </div>
              <p className="text-gray-600">
                Maintaining equilibrium between stakeholders while ensuring protocol security and growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "mechanisms",
    title: "Mechanisms",
    icon: GitFork,
    content: (
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-2xl font-bold text-blue-800">Governance Mechanisms</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Proposal Process</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ScrollText className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Proposal submission and formatting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Community discussion and feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <Vote className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Voting period and execution</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Security Measures</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Time locks and voting delays</span>
                </li>
                <li className="flex items-start gap-3">
                  <Scale className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Quorum and threshold requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Network className="h-5 w-5 text-blue-600 mt-1" />
                  <span className="text-gray-700">Multi-signature safeguards</span>
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
          <h3 className="text-2xl font-bold text-blue-800">Real-World Examples</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">Leading DAOs</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Uniswap</span>
                      <p className="text-sm text-gray-600">Pioneer of on-chain governance</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Aave</span>
                      <p className="text-sm text-gray-600">Advanced governance framework</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Compound</span>
                      <p className="text-sm text-gray-600">Autonomous interest rate protocol</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-purple-800 mb-4">Governance Models</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Token-Based Voting</span>
                      <p className="text-sm text-gray-600">Democratic token-weighted decisions</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Quadratic Voting</span>
                      <p className="text-sm text-gray-600">Cost-weighted vote allocation</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-semibold">Holographic Consensus</span>
                      <p className="text-sm text-gray-600">Efficient large-scale voting</p>
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

export default function DefiGovernance() {
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
    if (showExplanation) return;

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
          'defi-governance',
          finalScore >= 70,
          4,
          undefined,
          finalScore,
          '/defi/module4/defi-integrations',
          undefined,
          'DeFi'
        );
      }
    }, 3000);
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
                    DeFi Governance: Community-Driven Protocol Management
                  </CardTitle>
                  <p className="text-blue-100 mt-2">
                    Explore the mechanisms of decentralized governance, voting systems,
                    and how communities shape the future of DeFi protocols through
                    democratic decision-making processes.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Understanding DeFi governance is crucial for participating in protocol
                      development and decision-making. Learn about governance mechanisms,
                      voting systems, and real-world implementations.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="border-blue-200">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                              <Vote className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Voting Power</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Token-based voting mechanisms and delegation
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-lg">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">DAOs</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Decentralized Autonomous Organizations
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-indigo-200">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                              <ScrollText className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl">Proposals</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            Creation and execution of governance proposals
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
                    Verify your understanding of DeFi Governance concepts
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {!quizStarted ? (
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        Ready to test your knowledge of DeFi Governance concepts and implementation?
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
                    <p className="text-green-500 font-semibold mb-6">Perfect score! You've mastered DeFi Governance concepts!</p>
                  ) : score >= quizQuestions.length * 0.7 ? (
                    <p className="text-blue-500 font-semibold mb-6">Great job! You have a strong understanding of DeFi Governance.</p>
                  ) : (
                    <p className="text-yellow-500 font-semibold mb-6">Keep learning! Review the material and try again to improve your score.</p>
                  )}
                  <Link href="/defi/module4/defi-integrations">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105">
                      Continue to DeFi Integrations
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
