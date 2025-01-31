import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";

type SecurityScenario = {
  id: number;
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

const securityScenarios: SecurityScenario[] = [
  {
    id: 1,
    title: "Suspicious Email",
    description: "You receive an email claiming to be from your cryptocurrency exchange. It states there's a problem with your account and asks you to click a link to verify your credentials. What do you do?",
    options: [
      {
        id: "1a",
        text: "Click the link and enter your credentials to resolve the issue quickly",
        isCorrect: false,
        explanation: "This is likely a phishing attempt. Legitimate exchanges never ask for credentials via email links."
      },
      {
        id: "1b",
        text: "Ignore the email and log into your exchange account directly through the official website",
        isCorrect: true,
        explanation: "Correct! Always access your account through the official website, never through email links."
      },
      {
        id: "1c",
        text: "Reply to the email asking for more information",
        isCorrect: false,
        explanation: "Never engage with suspicious emails. This could confirm your email is active to scammers."
      }
    ]
  },
  {
    id: 2,
    title: "Wallet Backup",
    description: "You want to ensure your recovery phrase is safe. Which storage method is most secure?",
    options: [
      {
        id: "2a",
        text: "Store it in a password manager app",
        isCorrect: false,
        explanation: "Digital storage of recovery phrases, even in password managers, is risky due to potential hacks."
      },
      {
        id: "2b",
        text: "Write it down and store copies in multiple secure physical locations",
        isCorrect: true,
        explanation: "Correct! Physical storage in secure locations is the safest method for recovery phrases."
      },
      {
        id: "2c",
        text: "Take a photo and store it in cloud storage",
        isCorrect: false,
        explanation: "Cloud storage can be compromised, making this a risky option for sensitive information."
      }
    ]
  },
  {
    id: 3,
    title: "Software Update",
    description: "You receive a popup message while using your wallet saying 'Update required'. What's the safest action?",
    options: [
      {
        id: "3a",
        text: "Click the popup to update immediately",
        isCorrect: false,
        explanation: "Malicious popups can mimic software updates. Never trust unexpected update notifications."
      },
      {
        id: "3b",
        text: "Check the official website or app store for updates",
        isCorrect: true,
        explanation: "Correct! Always verify updates through official channels like the wallet's website or app store."
      },
      {
        id: "3c",
        text: "Ignore it and continue using the wallet",
        isCorrect: false,
        explanation: "While safer than clicking unknown popups, ignoring updates can leave you vulnerable to known security issues."
      }
    ]
  }
];

export default function SecurityWorkshop() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentScenario]: optionId
    }));
    setShowExplanation(true);
  };

  const nextScenario = () => {
    setShowExplanation(false);
    setCurrentScenario(prev => prev + 1);
  };

  const resetWorkshop = () => {
    setCurrentScenario(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const scenario = securityScenarios[currentScenario];
  const progress = ((currentScenario) / securityScenarios.length) * 100;

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Security Workshop</h2>
        <p className="text-gray-600">
          Practice identifying and responding to common security threats in the cryptocurrency space.
        </p>
      </div>

      <Progress value={progress} className="w-full" />

      {scenario ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <h3 className="text-xl font-semibold">Scenario {currentScenario + 1}: {scenario.title}</h3>
            </div>

            <p className="text-gray-600 mb-6">{scenario.description}</p>

            <div className="space-y-4">
              {scenario.options.map(option => {
                const isSelected = selectedAnswers[currentScenario] === option.id;
                const showResult = showExplanation && isSelected;
                const isCorrect = option.isCorrect;

                return (
                  <div key={option.id} className="space-y-2">
                    <Button
                      variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                      className="w-full justify-start"
                      onClick={() => !showExplanation && handleAnswer(option.id)}
                      disabled={showExplanation}
                    >
                      {showResult && (
                        isCorrect ? 
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> :
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      {option.text}
                    </Button>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`p-4 rounded-lg ${
                          isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {option.explanation}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {showExplanation && (
              <Button
                onClick={nextScenario}
                className="w-full mt-6"
              >
                Next Scenario
              </Button>
            )}
          </Card>
        </motion.div>
      ) : (
        <Card className="p-6">
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Workshop Complete!</h3>
            <p className="text-gray-600 mb-6">
              You've completed all security scenarios. Remember to apply these security practices
              when managing real cryptocurrency assets.
            </p>
            <Button onClick={resetWorkshop}>
              Restart Workshop
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-blue-50">
        <h3 className="text-lg font-semibold mb-4">Additional Security Resources</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.blockchain.com/learning-portal/bitcoin-security" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              Blockchain.com Security Guide
              <ExternalLink className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a 
              href="https://www.ledger.com/academy/security" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              Ledger Security Academy
              <ExternalLink className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
}
