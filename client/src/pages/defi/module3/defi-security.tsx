import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Shield,
  AlertTriangle,
  Lock,
  Key,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Bug,
  FileWarning,
  Wallet,
  Code
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop"; 

// Security Audit Simulator Interface
interface SecurityAuditResult {
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  code: string;
  findings: string[];
}

const SecurityAuditSimulator = () => {
  const [code, setCode] = useState(`
contract VulnerableVault {
    mapping(address => uint) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount;
    }
}`);

  const [auditResult, setAuditResult] = useState<SecurityAuditResult | null>(null);
  const { toast } = useToast();

  const runAudit = () => {
    // Simulate security audit
    const vulnerabilities = {
      critical: 1,
      high: 2,
      medium: 1,
      low: 1
    };

    const findings = [
      "Reentrancy vulnerability in withdraw function",
      "Missing input validation for deposit amount",
      "State changes after external call",
      "No events emitted for tracking",
      "No maximum deposit limit"
    ];

    setAuditResult({
      vulnerabilities,
      code,
      findings
    });

    toast({
      title: "Security Audit Complete",
      description: `Found ${vulnerabilities.critical} critical and ${vulnerabilities.high} high-risk vulnerabilities`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-100 to-orange-100 p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-500 rounded-lg">
            <Bug className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-red-800">
            Smart Contract Security Audit Simulator
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-red-700">
                Smart Contract Code
              </Label>
              <div className="mt-2">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm"
                  placeholder="Paste your smart contract code here..."
                />
              </div>
            </div>

            <Button
              onClick={runAudit}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Run Security Audit
            </Button>
          </div>

          <div className="space-y-6">
            {auditResult && (
              <>
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl">Audit Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="font-semibold text-red-800">Critical</div>
                          <div className="text-2xl font-bold text-red-600">
                            {auditResult.vulnerabilities.critical}
                          </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="font-semibold text-orange-800">High</div>
                          <div className="text-2xl font-bold text-orange-600">
                            {auditResult.vulnerabilities.high}
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="font-semibold text-yellow-800">Medium</div>
                          <div className="text-2xl font-bold text-yellow-600">
                            {auditResult.vulnerabilities.medium}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="font-semibold text-blue-800">Low</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {auditResult.vulnerabilities.low}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-800 mb-2">Findings</h4>
                        <ul className="space-y-2">
                          {auditResult.findings.map((finding, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <h5 className="font-semibold text-yellow-800">Security Best Practices</h5>
                  </div>
                  <ul className="space-y-2 text-yellow-700">
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>Always follow the checks-effects-interactions pattern</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>Use OpenZeppelin's secure contract templates</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <p>Implement proper access controls and input validation</p>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const questions = [
    {
      id: 1,
      question: "What is a reentrancy attack?",
      options: {
        a: "When a contract's balance is drained",
        b: "When a malicious contract calls back into the victim contract before the first transaction is complete",
        c: "When a contract's code is modified",
        d: "When a transaction is reversed"
      },
      correct: "b",
      explanation: "A reentrancy attack occurs when a malicious contract repeatedly calls back into the victim contract before the first transaction is complete, potentially draining funds by exploiting state updates that happen after external calls."
    },
    {
      id: 2,
      question: "Which is the recommended pattern for secure smart contract development?",
      options: {
        a: "Checks-Effects-Interactions",
        b: "Interactions-Checks-Effects",
        c: "Effects-Interactions-Checks",
        d: "Interactions-Effects-Checks"
      },
      correct: "a",
      explanation: "The Checks-Effects-Interactions pattern is the recommended approach where you first perform all checks, then update state variables, and finally interact with other contracts. This prevents reentrancy and other vulnerabilities."
    },
    {
      id: 3,
      question: "What is the purpose of a smart contract audit?",
      options: {
        a: "To make the contract run faster",
        b: "To identify and fix security vulnerabilities",
        c: "To reduce gas costs",
        d: "To document the code"
      },
      correct: "b",
      explanation: "Smart contract audits are primarily focused on identifying security vulnerabilities, potential exploits, and best practice violations to ensure the contract is safe and secure before deployment."
    }
  ];

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowExplanation(true);

    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! Moving to next question...",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's understand why before moving on.",
        variant: "destructive",
      });
    }

    // Handle navigation after the last question
    if (currentQuestion === questions.length - 1) {
      setTimeout(() => {
        toast({
          title: "Quiz Completed!",
          description: "Redirecting to the next section...",
          variant: "default",
        });
        setLocation("/defi/module3/defi-analytics");
      }, 7000);
    } else {
      setTimeout(() => {
        setShowExplanation(false);
        setUserAnswer(null);
        setCurrentQuestion(currentQuestion + 1);
      }, 7000);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl">Test Your Security Knowledge</CardTitle>
        <p className="text-blue-100 mt-2">
          Verify your understanding of DeFi security concepts
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Ready to test your knowledge of smart contract security, common vulnerabilities,
              and best practices?
            </p>
            <Button onClick={() => setQuizStarted(true)} className="w-full md:w-auto">
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Question {currentQuestion + 1}/{questions.length}</h3>
              <span className="text-sm font-medium text-blue-600">
                Score: {score}/{questions.length}
              </span>
            </div>
            <Progress
              value={(currentQuestion / questions.length) * 100}
              className="mb-6"
            />
            <div className="space-y-4">
              <h3 className="text-xl font-medium">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => !showExplanation && handleAnswer(key)}
                    variant={userAnswer === key ?
                      (key === questions[currentQuestion].correct ? "default" : "destructive")
                      : "outline"}
                    disabled={showExplanation}
                    className="w-full justify-start text-left"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 p-4 rounded-lg"
              >
                <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
                <p className="text-sm text-gray-600 mt-2">Next question in 7 seconds...</p>
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DefiSecurity = () => {
  useScrollTop(); 
  const { updateProgress } = useProgress();
  const { toast } = useToast();

  // Enrollment handling with proper error states
  const { data: enrollments, isLoading: loadingEnrollments, error: enrollmentError } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const isEnrolled = enrollments?.some(
    (enrollment: any) => enrollment.courseId === 3
  );

  // Show loading state
  if (loadingEnrollments) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <RefreshCw className="h-8 w-8 text-purple-500" />
          </motion.div>
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (enrollmentError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
          <p className="text-gray-600 mb-4">Failed to load course content. Please try again later.</p>
          <Link href="/defi/module3">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Course Enrollment Required</h1>
          <p className="mb-6">Please enroll in the DeFi course to access this content.</p>
          <Link href="/defi/module3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Back to Module 3
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module3">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 3
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Overview Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardTitle className="text-3xl font-bold">
                DeFi Security Fundamentals
              </CardTitle>
              <p className="text-red-100 mt-2">
                Master essential security concepts and best practices in DeFi
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">
                  Security is paramount in DeFi. In this section, we'll explore common vulnerabilities,
                  attack vectors, and best practices for securing smart contracts and protecting user assets.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-red-200">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500 rounded-lg">
                          <Bug className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Common Vulnerabilities</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Understanding and preventing common smart contract vulnerabilities
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500 rounded-lg">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Security Measures</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Essential security practices and implementation strategies
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200">
                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500 rounded-lg">
                          <FileWarning className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">Audit Process</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Understanding the smart contract audit process and tools
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Vulnerabilities Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500 rounded-lg">
                  <Bug className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Common Vulnerabilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                    <h4 className="text-xl font-semibold text-red-800 mb-4">Reentrancy Attacks</h4>
                    <p className="text-gray-600 mb-4">
                      Occurs when a malicious contract repeatedly calls back into the victim contract
                      before the first transaction is complete.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-gray-600">External calls before state updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">Use ReentrancyGuard modifier</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                    <h4 className="text-xl font-semibold text-red-800 mb-4">Access Control Issues</h4>
                    <p className="text-gray-600 mb-4">
                      Insufficient or incorrect implementation of access controls leading to unauthorized actions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-gray-600">Missing role checks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">Implement Ownable or AccessControl</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                    <h4 className="text-xl font-semibold text-red-800 mb-4">Integer Overflow/Underflow</h4>
                    <p className="text-gray-600 mb-4">
                      Arithmetic operations exceeding the maximum or minimum values of integer types.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-gray-600">Unchecked arithmetic operations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">Use SafeMath or Solidity 0.8+</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
                    <h4 className="text-xl font-semibold text-red-800 mb-4">Flash Loan Attacks</h4>
                    <p className="text-gray-600 mb-4">
                      Exploiting price oracle or liquidity pool manipulation through flash loans.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-gray-600">Single price oracle dependency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-gray-600">Use time-weighted average prices</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Audit Simulator */}
          <SecurityAuditSimulator />

          {/* Best Practices Section */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Security Best Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Smart Contract Development</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Use proven libraries and patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Comprehensive testing suite</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Regular security audits</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Protocol Security</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Multi-signature wallets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Timelock mechanisms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Emergency pause functionality</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
                    <h4 className="text-xl font-semibold text-green-800 mb-4">Risk Management</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Insurance coverage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Gradual rollout strategy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Regular security reviews</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SecurityQuiz />
        </motion.div>
      </div>
    </div>
  );
};

export default DefiSecurity;