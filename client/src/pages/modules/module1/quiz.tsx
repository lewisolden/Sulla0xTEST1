import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the main difference between cryptocurrency and traditional digital banking?",
    options: [
      "Cryptocurrency transactions are faster",
      "Cryptocurrency operates on a decentralized network without central authority",
      "Cryptocurrency is only used online",
      "Cryptocurrency requires a bank account"
    ],
    correct: 1,
    explanation: "While cryptocurrencies offer several advantages, the key distinguishing feature is their decentralized nature, operating without the need for traditional financial intermediaries."
  },
  {
    id: 2,
    question: "What is the purpose of public key cryptography in cryptocurrency systems?",
    options: [
      "To make transactions faster",
      "To reduce transaction fees", 
      "To secure and verify transactions without central authority",
      "To connect to the internet"
    ],
    correct: 2,
    explanation: "Public key cryptography enables secure transaction verification and ownership proof without requiring trust in a central authority."
  },
  {
    id: 3,
    question: "Which of the following is a key risk when using cryptocurrency?",
    options: [
      "Network downtime",
      "Private key loss",
      "Slow internet connection",
      "Bank holidays"
    ],
    correct: 1,
    explanation: "Losing your private key means permanent loss of access to your funds, making it one of the most critical risks in cryptocurrency ownership."
  },
  {
    id: 4,
    question: "What is the 'double-spending problem' that cryptocurrency solves?",
    options: [
      "Spending twice as much money as intended",
      "Using the same digital money more than once",
      "Paying double transaction fees",
      "Having two different wallets"
    ],
    correct: 1,
    explanation: "The double-spending problem refers to the risk of using the same digital currency multiple times, which cryptocurrency prevents through blockchain technology."
  },
  {
    id: 5,
    question: "Which storage method is generally recommended for large amounts of cryptocurrency?",
    options: [
      "Mobile wallet",
      "Exchange wallet",
      "Cold storage (hardware wallet)",
      "Web wallet"
    ],
    correct: 2,
    explanation: "Cold storage, particularly hardware wallets, offers the highest security for storing significant amounts of cryptocurrency by keeping private keys offline."
  }
];

const QuizPage = () => {
  useScrollTop();
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const { updateProgress } = useProgress();

  const handleAnswer = (questionId: number, selectedOption: number) => {
    if (!showResults) {
      setUserAnswers({
        ...userAnswers,
        [questionId]: selectedOption
      });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    const passThreshold = questions.length * 0.7; // 70% to pass
    if (score >= passThreshold) {
      updateProgress(1, 'module1-quiz', true);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const renderQuestion = (question: Question) => {
    const isAnswered = userAnswers[question.id] !== undefined;
    const isCorrect = userAnswers[question.id] === question.correct;

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors border
                    ${!showResults ? 'hover:bg-gray-100' : ''}
                    ${showResults && index === question.correct ? 'bg-green-100 border-green-500' : ''}
                    ${showResults && userAnswers[question.id] === index && index !== question.correct ? 'bg-red-100 border-red-500' : ''}
                    ${!showResults && userAnswers[question.id] === index ? 'bg-blue-100 border-blue-500' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResults && index === question.correct && (
                      <CheckCircle className="text-green-500 h-5 w-5" />
                    )}
                    {showResults && userAnswers[question.id] === index && index !== question.correct && (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-blue-800">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <div className="mb-6 flex justify-between items-center">
            <Link href="/modules/module1">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Module Overview
              </Button>
            </Link>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Module 1: Final Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map(q => renderQuestion(q))}

                {!showResults && Object.keys(userAnswers).length === questions.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Submit Answers
                    </Button>
                  </motion.div>
                )}

                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gray-100 rounded-lg"
                  >
                    <h3 className="text-2xl font-bold text-center">
                      Your Score: {calculateScore()} out of {questions.length}
                    </h3>
                    {calculateScore() >= questions.length * 0.7 ? (
                      <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500">
                        <p className="text-green-700">
                          🎉 Congratulations! You've passed the Module 1 quiz and demonstrated a strong understanding of cryptocurrency fundamentals!
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 p-4 bg-blue-100 border-l-4 border-blue-500">
                        <p className="text-blue-700">
                          Review the explanations above for any questions you missed. You can retake the quiz after reviewing the module content.
                        </p>
                      </div>
                    )}
                    <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
                      <Link href="/modules/module1">
                        <Button 
                          size="lg"
                          variant="outline"
                          className="w-full md:w-auto"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Return to Module Overview
                        </Button>
                      </Link>
                      {calculateScore() >= questions.length * 0.7 && (
                        <Link href="/modules/module2">
                          <Button 
                            size="lg"
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                          >
                            Next Module: Blockchain Technology
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;