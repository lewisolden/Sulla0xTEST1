import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/progress-context";

type SecurityScenario = {
  id: number;
  title: string;
  description: string;
  options: string[];
  correctOption: number;
  explanation: string;
  riskLevel: "high" | "medium" | "low";
  category: "phishing" | "wallet" | "smart-contract";
};

const securityScenarios: SecurityScenario[] = [
  {
    id: 1,
    title: "Phishing Attempt",
    description: "You receive an email claiming to be from your cryptocurrency exchange. It states there's an urgent security issue with your account and asks you to click a link to verify your credentials. What should you do?",
    options: [
      "Click the link and enter your credentials to secure your account",
      "Forward the email to other crypto holders to warn them",
      "Ignore the email and directly log into your exchange through the official website",
      "Reply to the email asking for more information"
    ],
    correctOption: 2,
    explanation: "Never click on links in emails claiming to be from your exchange. Always access your exchange directly through your browser and check for security notifications there.",
    riskLevel: "high",
    category: "phishing"
  },
  {
    id: 2,
    title: "Wallet Security",
    description: "You're setting up a new cryptocurrency wallet. Which of these practices would be most secure?",
    options: [
      "Store your seed phrase in a password manager",
      "Write down your seed phrase on paper and store copies in multiple secure locations",
      "Take a screenshot of your seed phrase",
      "Share your seed phrase with a trusted friend as backup"
    ],
    correctOption: 1,
    explanation: "Writing down your seed phrase on paper and storing copies in secure physical locations is the safest approach. Digital storage methods are vulnerable to hacking.",
    riskLevel: "high",
    category: "wallet"
  },
  {
    id: 3,
    title: "Smart Contract Interaction",
    description: "Before interacting with a new DeFi protocol, what's the most important security check to perform?",
    options: [
      "Check if the protocol has a lot of social media followers",
      "Verify the smart contract has been audited by reputable firms",
      "See if your friends are using it",
      "Check if the website looks professional"
    ],
    correctOption: 1,
    explanation: "Smart contract audits by reputable security firms are crucial for identifying vulnerabilities and ensuring the protocol is secure.",
    riskLevel: "medium",
    category: "smart-contract"
  },
  {
    id: 4,
    title: "Exchange Security",
    description: "You've just completed a large cryptocurrency purchase. What's the safest action to take?",
    options: [
      "Leave the funds on the exchange for easy trading",
      "Transfer to a hardware wallet for long-term storage",
      "Share your success on social media",
      "Convert back to fiat immediately"
    ],
    correctOption: 1,
    explanation: "For large amounts, hardware wallets provide the best security as they keep your private keys offline and protected from online threats.",
    riskLevel: "high",
    category: "wallet"
  },
  {
    id: 5,
    title: "Recovery Phrase Protection",
    description: "You need to store your wallet recovery phrase. Which method is most secure?",
    options: [
      "Create a password-protected digital file",
      "Use a steel plate to engrave the phrase",
      "Store it in your email drafts",
      "Take a photo and store it in the cloud"
    ],
    correctOption: 1,
    explanation: "Metal storage solutions protect against physical damage (fire, water) while keeping the phrase offline and secure from digital threats.",
    riskLevel: "high",
    category: "wallet"
  }
];

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case "high": return "text-red-500";
    case "medium": return "text-yellow-500";
    case "low": return "text-green-500";
    default: return "text-blue-500";
  }
};

export default function SecurityWorkshop() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const { updateProgress } = useProgress();

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (!completedScenarios.includes(currentScenario)) {
      setCompletedScenarios([...completedScenarios, currentScenario]);
      if (optionIndex === scenario.correctOption) {
        setScore(score + 1);
      }
    }
  };

  const nextScenario = () => {
    if (currentScenario === securityScenarios.length - 1) {
      // Workshop completed
      const passingScore = Math.ceil(securityScenarios.length * 0.7);
      if (score >= passingScore) {
        updateProgress(2, "security-workshop", true);
      }
    } else {
      setCurrentScenario((prev) => (prev + 1) % securityScenarios.length);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const scenario = securityScenarios[currentScenario];
  const progress = (completedScenarios.length / securityScenarios.length) * 100;

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Security Workshop
        </h2>
        <p className="text-gray-600">
          Learn to identify and respond to common security threats in the cryptocurrency space.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-700">Workshop Progress</span>
          <span className="text-sm font-medium text-blue-700">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-blue-600 mt-2">
          Score: {score} / {securityScenarios.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {scenario.category === "phishing" && <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                  {scenario.category === "wallet" && <Shield className="h-6 w-6 text-blue-500" />}
                  {scenario.category === "smart-contract" && <AlertCircle className="h-6 w-6 text-purple-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{scenario.title}</h3>
                    <span className={`text-sm font-medium ${getRiskLevelColor(scenario.riskLevel)}`}>
                      {scenario.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{scenario.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {scenario.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={selectedOption === null ? "outline" : 
                              selectedOption === index ? 
                                (index === scenario.correctOption ? "default" : "destructive") :
                                index === scenario.correctOption ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${
                        selectedOption !== null && index === scenario.correctOption ? "border-green-500" : ""
                      }`}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <div className="flex items-start gap-2">
                        {selectedOption !== null && (
                          index === scenario.correctOption ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" /> :
                            selectedOption === index ?
                              <XCircle className="h-5 w-5 text-red-500 mt-0.5" /> :
                              null
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg"
                >
                  <p className="text-blue-800">
                    <strong>Explanation:</strong> {scenario.explanation}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={nextScenario}
                  >
                    {currentScenario === securityScenarios.length - 1 ? 
                      "Complete Workshop" : "Next Scenario"}
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}