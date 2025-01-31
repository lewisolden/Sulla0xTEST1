import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

type SecurityScenario = {
  id: number;
  title: string;
  description: string;
  options: string[];
  correctOption: number;
  explanation: string;
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
    explanation: "Never click on links in emails claiming to be from your exchange. Always access your exchange directly through your browser and check for security notifications there."
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
    explanation: "Writing down your seed phrase on paper and storing copies in secure physical locations is the safest approach. Digital storage methods are vulnerable to hacking."
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
    explanation: "Smart contract audits by reputable security firms are crucial for identifying vulnerabilities and ensuring the protocol is secure."
  }
];

export default function SecurityWorkshop() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (!completedScenarios.includes(currentScenario)) {
      setCompletedScenarios([...completedScenarios, currentScenario]);
    }
  };

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % securityScenarios.length);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const scenario = securityScenarios[currentScenario];
  const progress = (completedScenarios.length / securityScenarios.length) * 100;

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Security Workshop</h2>
        <p className="text-gray-600">
          Learn to identify and respond to common security threats in the cryptocurrency space.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="font-medium">Progress: {Math.round(progress)}%</span>
        </div>
      </div>

      <Card className="p-6">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
              <p className="text-gray-700 mb-4">{scenario.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {scenario.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === null ? "outline" : 
                        selectedOption === index ? 
                          (index === scenario.correctOption ? "default" : "destructive") :
                          index === scenario.correctOption ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4"
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
            ))}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg"
            >
              <p className="text-gray-700">{scenario.explanation}</p>
              <Button
                className="mt-4"
                onClick={nextScenario}
              >
                Next Scenario
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Card>
    </div>
  );
}