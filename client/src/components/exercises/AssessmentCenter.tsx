import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Assessment = {
  id: number;
  category: 'knowledge' | 'technical' | 'scenario';
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

const assessments: Assessment[] = [
  {
    id: 1,
    category: 'knowledge',
    question: "Which of the following best describes a cryptocurrency wallet?",
    options: [
      "A physical device that stores actual digital coins",
      "A software that stores your private keys and manages your crypto assets",
      "A bank account for cryptocurrency",
      "A website where you can buy cryptocurrencies"
    ],
    correctOption: 1,
    explanation: "A cryptocurrency wallet doesn't store actual coins - it stores your private keys and helps you manage your assets on the blockchain."
  },
  {
    id: 2,
    category: 'technical',
    question: "What is the purpose of a recovery phrase (seed phrase) in cryptocurrency wallets?",
    options: [
      "To reset your password if you forget it",
      "To generate new wallet addresses",
      "To recover your private keys and access your funds",
      "To verify transactions on the blockchain"
    ],
    correctOption: 2,
    explanation: "A recovery phrase (seed phrase) is used to recover your private keys and access your funds if you lose access to your wallet."
  },
  {
    id: 3,
    category: 'scenario',
    question: "You've received a large amount of cryptocurrency. What's the most secure way to store it?",
    options: [
      "Keep it on the exchange where you bought it",
      "Transfer it to a hardware wallet and secure the recovery phrase",
      "Store the private keys in a password manager",
      "Share the private keys between multiple cloud storage services"
    ],
    correctOption: 1,
    explanation: "A hardware wallet provides the highest level of security for storing large amounts of cryptocurrency, as it keeps your private keys offline and protected from online threats."
  }
];

export default function AssessmentCenter() {
  const [currentAssessment, setCurrentAssessment] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedAssessments, setCompletedAssessments] = useState<number[]>([]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    if (!completedAssessments.includes(currentAssessment)) {
      setCompletedAssessments([...completedAssessments, currentAssessment]);
    }
  };

  const nextAssessment = () => {
    setCurrentAssessment((prev) => (prev + 1) % assessments.length);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const assessment = assessments[currentAssessment];
  const progress = (completedAssessments.length / assessments.length) * 100;

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Assessment Center</h2>
        <p className="text-gray-600">
          Test your knowledge and understanding of cryptocurrency concepts through interactive assessments.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span className="font-medium">Progress: {Math.round(progress)}%</span>
        </div>
      </div>

      <Card className="p-6">
        <motion.div
          key={assessment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              {assessment.category === 'knowledge' ? 'Knowledge Check' :
               assessment.category === 'technical' ? 'Technical Assessment' :
               'Real-world Scenario'}
            </span>
            <h3 className="text-xl font-semibold">{assessment.question}</h3>
          </div>

          <div className="space-y-3">
            {assessment.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === null ? "outline" : 
                        selectedOption === index ? 
                          (index === assessment.correctOption ? "default" : "destructive") :
                          index === assessment.correctOption ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4"
                disabled={selectedOption !== null}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-start gap-2">
                  {selectedOption !== null && (
                    index === assessment.correctOption ? 
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
              <p className="text-gray-700">{assessment.explanation}</p>
              <Button
                className="mt-4"
                onClick={nextAssessment}
              >
                Next Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Card>
    </div>
  );
}