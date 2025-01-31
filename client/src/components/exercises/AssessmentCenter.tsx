import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronRight, Award } from "lucide-react";

type Assessment = {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    text: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
};

const assessments: Assessment[] = [
  {
    id: 1,
    title: "Cryptocurrency Fundamentals",
    description: "Test your understanding of basic cryptocurrency concepts and terminology.",
    questions: [
      {
        id: 1,
        text: "What is the main innovation that makes cryptocurrencies possible?",
        options: [
          {
            id: "1a",
            text: "Blockchain technology",
            isCorrect: true
          },
          {
            id: "1b",
            text: "Internet banking",
            isCorrect: false
          },
          {
            id: "1c",
            text: "Mobile payments",
            isCorrect: false
          }
        ]
      },
      {
        id: 2,
        text: "What ensures the security of cryptocurrency transactions?",
        options: [
          {
            id: "2a",
            text: "Bank guarantees",
            isCorrect: false
          },
          {
            id: "2b",
            text: "Cryptographic algorithms",
            isCorrect: true
          },
          {
            id: "2c",
            text: "Government regulations",
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Wallet Security",
    description: "Evaluate your knowledge of cryptocurrency wallet security practices.",
    questions: [
      {
        id: 1,
        text: "What is the safest way to store your recovery phrase?",
        options: [
          {
            id: "1a",
            text: "In a password manager",
            isCorrect: false
          },
          {
            id: "1b",
            text: "Written on paper in a secure location",
            isCorrect: true
          },
          {
            id: "1c",
            text: "In a cloud storage service",
            isCorrect: false
          }
        ]
      },
      {
        id: 2,
        text: "What is two-factor authentication (2FA)?",
        options: [
          {
            id: "2a",
            text: "Using two different passwords",
            isCorrect: false
          },
          {
            id: "2b",
            text: "Having two wallets",
            isCorrect: false
          },
          {
            id: "2c",
            text: "An additional security step beyond password",
            isCorrect: true
          }
        ]
      }
    ]
  }
];

export default function AssessmentCenter() {
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleStartAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (optionId: string) => {
    if (!currentAssessment) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));

    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentAssessment) return 0;
    let correct = 0;
    Object.entries(answers).forEach(([questionIndex, answerId]) => {
      const question = currentAssessment.questions[Number(questionIndex)];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      if (selectedOption?.isCorrect) correct++;
    });
    return (correct / currentAssessment.questions.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Assessment Center</h2>
        <p className="text-gray-600">
          Test your knowledge and understanding of cryptocurrency concepts through interactive assessments.
        </p>
      </div>

      {!currentAssessment ? (
        <div className="grid md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold">{assessment.title}</h3>
                  <p className="text-sm text-gray-500">{assessment.questions.length} questions</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{assessment.description}</p>
              <Button onClick={() => handleStartAssessment(assessment)} className="w-full">
                Start Assessment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      ) : showResults ? (
        <Card className="p-6 text-center">
          <Award className="h-16 w-16 mx-auto text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Assessment Complete!</h3>
          <p className="text-gray-600 mb-4">
            You scored {calculateScore()}% on {currentAssessment.title}
          </p>
          <Progress value={calculateScore()} className="mb-6" />
          <Button onClick={() => setCurrentAssessment(null)} className="w-full max-w-sm">
            Try Another Assessment
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <Progress 
            value={(currentQuestion / currentAssessment.questions.length) * 100}
            className="w-full"
          />

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">
              Question {currentQuestion + 1} of {currentAssessment.questions.length}
            </h3>

            <p className="text-lg mb-6">
              {currentAssessment.questions[currentQuestion].text}
            </p>

            <div className="space-y-4">
              {currentAssessment.questions[currentQuestion].options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  variant="outline"
                  className="w-full justify-start text-left py-4"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}