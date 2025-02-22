import { useState } from "react";
import { motion } from "framer-motion";
import { CourseTemplate } from "@/components/templates/CourseTemplate";
import { CourseSection } from "@/components/templates/CourseTemplate";
import { ConceptCard } from "@/components/templates/CourseTemplate";
import { CourseContentSection } from "@/components/course-templates/CourseContentSection";
import { KeyConceptBox } from "@/components/course-templates/CourseContentSection";
import { QuizContainer } from "@/components/course-templates/CourseContentSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  Building2,
  Globe2,
  Shield,
  Heart,
  FileText,
  PiggyBank,
  Landmark,
  LineChart,
  GraduationCap,
  Users,
  Lock,
  ShieldCheck
} from "lucide-react";

const ApplicationsPage = () => {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  const handleQuizStart = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    updateProgress({
      moduleId: 'module1',
      sectionId: 'applications',
      completed: true,
      score,
      completedAt: new Date().toISOString(),
      route: '/modules/module1/applications',
      moduleType: 'blockchain'
    });
  };

  if (showQuiz) {
    return (
      <QuizContainer>
        <PracticalApplicationsQuiz onComplete={handleQuizComplete} />
      </QuizContainer>
    );
  }

  return (
    <CourseTemplate
      title="Practical Applications of Blockchain"
      subtitle="Explore real-world implementations and their impact across industries"
      icon={<Globe2 className="h-12 w-12 text-blue-600" />}
      backLink="/modules/module1/security"
      backLabel="Back to Security"
      nextLink="/modules/module1/getting-started"
      nextLabel="Next: Getting Started"
      showQuiz
      onStartQuiz={handleQuizStart}
    >
      <CourseSection
        icon={<Building2 className="h-6 w-6" />}
        title="Industry Applications"
        description="Discover how blockchain is transforming various sectors"
        delay={0.2}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ConceptCard
            title="Financial Services"
            description="Revolutionizing banking, payments, and investments"
            icon={<Landmark className="w-8 h-8" />}
            delay={0.3}
          />
          <ConceptCard
            title="Supply Chain"
            description="Tracking and verifying products from origin to consumer"
            icon={<FileText className="w-8 h-8" />}
            delay={0.4}
          />
        </div>
      </CourseSection>

      <CourseContentSection
        title="Financial Inclusion"
        subtitle="Empowering the unbanked population worldwide"
        icon={<PiggyBank className="h-6 w-6" />}
        gradientFrom="blue-50"
        gradientTo="purple-50"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <KeyConceptBox title="Global Access">
            <ul className="list-disc pl-6 space-y-2">
              <li>Borderless transactions</li>
              <li>Mobile-first solutions</li>
              <li>Reduced barriers to entry</li>
            </ul>
          </KeyConceptBox>

          <KeyConceptBox title="Cost Reduction">
            <ul className="list-disc pl-6 space-y-2">
              <li>Lower transaction fees</li>
              <li>Efficient cross-border payments</li>
              <li>Automated compliance</li>
            </ul>
          </KeyConceptBox>
        </div>
      </CourseContentSection>

      <CourseContentSection
        title="Technical Implementations"
        subtitle="Core blockchain applications in enterprise"
        icon={<Shield className="h-6 w-6" />}
        gradientFrom="emerald-50"
        gradientTo="blue-50"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Digital Identity",
              description: "Secure identity management and verification",
              icon: Lock,
              features: ["Self-sovereign identity", "KYC automation", "Privacy control"]
            },
            {
              title: "Smart Contracts",
              description: "Automated agreement execution",
              icon: FileText,
              features: ["Auto-enforcement", "Transparent terms", "Reduced costs"]
            },
            {
              title: "Asset Tokenization",
              description: "Digital representation of real assets",
              icon: LineChart,
              features: ["Fractional ownership", "Increased liquidity", "Automated trading"]
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-blue-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CourseContentSection>
    </CourseTemplate>
  );
};

const PracticalApplicationsQuiz = ({onComplete}: {onComplete: (score: number) => void}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      onComplete(score);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (showResult) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">
            Quiz Completed!
          </h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>

          <Button
            onClick={restartQuiz}
            variant="outline"
            className="mt-4"
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <Card>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Practical Applications Quiz
            <span className="text-sm ml-4 text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </h2>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-gray-700">
              {currentQuizQuestion.question}
            </p>
          </div>

          <div className="grid gap-4">
            {Object.entries(currentQuizQuestion.options).map(([key, value], index) => (
              <Button
                key={key}
                onClick={() => handleAnswerSelect(parseInt(key))}
                className={`
                  w-full p-4 h-auto whitespace-normal text-left justify-start
                  ${selectedAnswer === null
                    ? 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                    : index === currentQuizQuestion.correctAnswer
                      ? 'bg-green-200 text-gray-700'
                      : selectedAnswer === index
                        ? 'bg-red-200 text-gray-700'
                        : 'bg-gray-100 text-gray-700'}
                `}
                disabled={selectedAnswer !== null}
                variant="ghost"
              >
                {value}
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className={`
              mt-6 p-4 rounded-lg
              ${selectedAnswer === currentQuizQuestion.correctAnswer
                ? 'bg-green-100 border-l-4 border-green-500'
                : 'bg-red-100 border-l-4 border-red-500'}
            `}>
              <h3 className="font-bold mb-2">
                {selectedAnswer === currentQuizQuestion.correctAnswer
                  ? '✅ Correct!'
                  : '❌ Incorrect'}
              </h3>
              <p>{currentQuizQuestion.explanation}</p>
            </div>
          )}

          {selectedAnswer !== null && (
            <Button
              onClick={moveToNextQuestion}
              className="mt-6 w-full"
            >
              {currentQuestion < questions.length - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const questions = [
  {
    id: "q1",
    question: "Which blockchain application has the potential to revolutionize healthcare data management?",
    options: {
      0: "Digital asset trading platforms",
      1: "Secure, interoperable medical records",
      2: "Cryptocurrency mining operations",
      3: "Social media networks"
    },
    correctAnswer: 1,
    explanation: "Blockchain technology enables secure, interoperable medical records management, allowing healthcare providers to share patient data securely while maintaining privacy and ensuring data integrity. This improves care coordination and reduces medical errors."
  },
  {
    id: "q2",
    question: "How does blockchain technology support environmental sustainability efforts?",
    options: {
      0: "By increasing energy consumption",
      1: "By replacing traditional currencies",
      2: "By tracking carbon credits and environmental compliance",
      3: "By eliminating the need for environmental monitoring"
    },
    correctAnswer: 2,
    explanation: "Blockchain supports environmental sustainability by providing transparent tracking of carbon credits, ensuring environmental compliance, and enabling efficient management of conservation funding and waste management initiatives."
  },
  {
    id: "q3",
    question: "What is a key benefit of using blockchain in supply chain management?",
    options: {
      0: "Increased shipping costs",
      1: "Real-time tracking and verification of products",
      2: "Elimination of all intermediaries",
      3: "Slower delivery times"
    },
    correctAnswer: 1,
    explanation: "Blockchain technology in supply chain management enables real-time tracking and verification of products from origin to consumer, helping prevent counterfeiting, ensure compliance, and optimize inventory management."
  },
  {
    id: "q4",
    question: "How does blockchain technology enhance humanitarian aid distribution?",
    options: {
      0: "By requiring aid recipients to have bank accounts",
      1: "By increasing administrative costs",
      2: "By restricting access to specific regions",
      3: "By enabling transparent, direct beneficiary payments"
    },
    correctAnswer: 3,
    explanation: "Blockchain improves humanitarian aid distribution through transparent, direct beneficiary payments, efficient aid fund tracking, reduced fraud, and faster emergency response capabilities."
  },
  {
    id: "q5",
    question: "Which feature of blockchain technology enables community empowerment?",
    options: {
      0: "Centralized control",
      1: "Decentralized governance and voting",
      2: "Restricted access to resources",
      3: "Limited participation options"
    },
    correctAnswer: 1,
    explanation: "Blockchain enables community empowerment through decentralized governance and voting systems, allowing communities to make collective decisions, share resources, and build local economies in a transparent and equitable way."
  }
];

export default ApplicationsPage;