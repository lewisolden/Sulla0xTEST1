import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, ArrowRight, Brain, Cpu, Network, Lightbulb, History, Code, Check, X } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

const TimelineItem = ({ year, title, description, delay, color }: { year: string; title: string; description: string; delay: number; color: string }) => (
  <motion.div
    className="flex gap-4 mb-8"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-32 flex-shrink-0">
      <div className={`${color} rounded-lg p-3 text-center transform transition-all duration-300 hover:scale-105 shadow-md`}>
        <span className="text-white font-bold text-lg">{year}</span>
      </div>
    </div>
    <div className="flex-1">
      <div className={`${color} bg-opacity-10 rounded-lg p-4 transform transition-all duration-300 hover:scale-102 shadow-sm`}>
        <h4 className="font-semibold text-blue-800 text-lg mb-2">{title}</h4>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AITypeCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: any; delay: number }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-blue-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

interface AnswerState {
  selectedAnswer: number | null;
  isCorrect: boolean;
  showExplanation: boolean;
}

export default function AIIntroduction() {
  useScrollTop();
  const { progress, updateProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>({
    selectedAnswer: null,
    isCorrect: false,
    showExplanation: false
  });

  const questions = [
    {
      question: "What is artificial intelligence?",
      options: [
        "A type of computer hardware",
        "The simulation of human intelligence by machines",
        "A programming language",
        "A database management system"
      ],
      correct: 1,
      explanation: "Artificial Intelligence refers to the simulation of human intelligence in machines that are programmed to think and learn like humans."
    },
    {
      question: "Which of the following best describes Narrow AI?",
      options: [
        "AI that can perform any intellectual task",
        "AI designed for a specific task",
        "AI that has consciousness",
        "AI that can learn anything"
      ],
      correct: 1,
      explanation: "Narrow AI (or Weak AI) is designed to perform specific tasks, like facial recognition or playing chess, rather than having general intelligence."
    },
    {
      question: "When did the field of AI research begin?",
      options: [
        "1980s",
        "1990s",
        "1950s",
        "2000s"
      ],
      correct: 2,
      explanation: "The field of AI research began in the 1950s, with the Dartmouth Conference in 1956 being considered the founding event of artificial intelligence as a field."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setAnswerState({
      selectedAnswer: selectedIndex,
      isCorrect,
      showExplanation: true
    });

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerState({
          selectedAnswer: null,
          isCorrect: false,
          showExplanation: false
        });
      } else {
        setShowResults(true);
        updateProgress({
          moduleId: 'ai-module1',
          sectionId: 'introduction',
          completed: true,
          score: Math.round((score / questions.length) * 100)
        });
      }
    }, 2000);
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-100">
            <CardContent className="pt-6">
              {!showResults ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setShowQuiz(false)}
                    className="mb-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
                  </Button>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
                  <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answerState.selectedAnswer === index;
                      const isCorrect = index === questions[currentQuestion].correct;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left p-4 relative ${
                              isSelected
                                ? isCorrect
                                  ? 'bg-green-100 border-green-500 hover:bg-green-100'
                                  : 'bg-red-100 border-red-500 hover:bg-red-100'
                                : 'hover:bg-blue-50'
                            }`}
                            onClick={() => !answerState.showExplanation && handleAnswer(index)}
                            disabled={answerState.showExplanation}
                          >
                            <div className="flex items-center gap-4">
                              <span>{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                              {isSelected && (
                                <div className="absolute right-4">
                                  {isCorrect ? (
                                    <Check className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <X className="h-5 w-5 text-red-600" />
                                  )}
                                </div>
                              )}
                            </div>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {answerState.showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg ${
                        answerState.isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <p className={`font-semibold ${
                        answerState.isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {answerState.isCorrect ? 'Correct!' : 'Incorrect.'}
                      </p>
                      <p className="mt-2 text-gray-700">
                        {questions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                    Quiz Completed!
                  </h2>
                  <p className="text-lg mb-4">
                    You scored {score} out of {questions.length}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {score === questions.length
                      ? "Perfect score! You've mastered the fundamentals of AI!"
                      : "Great effort! Review the content and try again to improve your score."}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowQuiz(false);
                        setCurrentQuestion(0);
                        setScore(0);
                        setShowResults(false);
                      }}
                    >
                      Back to Content
                    </Button>
                    <Link href="/ai/module1/how-ai-works">
                      <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        Next Topic <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/ai/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 1
            </Button>
          </Link>
        </div>

        <Card className="border-2 border-blue-100">
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8 bg-blue-50 p-6 rounded-lg">
                <Brain className="h-12 w-12 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-blue-800 mb-2">
                    Introduction to Artificial Intelligence
                  </h1>
                  <p className="text-gray-600">
                    Explore the fundamentals and evolution of AI technology
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    What is Artificial Intelligence?
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed
                      to think and learn like humans. The term encompasses a wide range of technologies and approaches
                      aimed at making computers perform tasks that typically require human intelligence.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Cpu className="h-6 w-6" />
                    Types of AI
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <AITypeCard
                      title="Narrow AI (ANI)"
                      description="Designed for specific tasks like facial recognition or playing chess. Currently the most common form of AI."
                      icon={Code}
                      delay={0.6}
                    />
                    <AITypeCard
                      title="General AI (AGI)"
                      description="Hypothetical AI with human-like general intelligence. Still largely theoretical and under development."
                      icon={Brain}
                      delay={0.8}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <History className="h-6 w-6" />
                    Historical Development
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8">
                    <TimelineItem
                      year="1950s"
                      title="Birth of AI"
                      description="AI emerges as an academic discipline, with the historic Dartmouth Conference defining the field."
                      delay={1.2}
                      color="bg-purple-500"
                    />
                    <TimelineItem
                      year="1960s"
                      title="Early NLP"
                      description="First breakthroughs in natural language processing and the development of early expert systems."
                      delay={1.4}
                      color="bg-blue-500"
                    />
                    <TimelineItem
                      year="1980s"
                      title="Neural Networks"
                      description="Revival of neural networks research and significant advances in expert systems development."
                      delay={1.6}
                      color="bg-green-500"
                    />
                    <TimelineItem
                      year="2000s"
                      title="Big Data"
                      description="The rise of big data and machine learning revolutionizes AI capabilities and applications."
                      delay={1.8}
                      color="bg-yellow-500"
                    />
                    <TimelineItem
                      year="2010s"
                      title="Deep Learning"
                      description="Breakthrough achievements in deep learning and neural networks transform AI possibilities."
                      delay={2}
                      color="bg-red-500"
                    />
                    <TimelineItem
                      year="2020s"
                      title="AI Acceleration"
                      description="Rapid advancement in large language models and widespread AI adoption across industries."
                      delay={2.2}
                      color="bg-indigo-500"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-2">
                    <Network className="h-6 w-6" />
                    Current State of AI Technology
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Language Processing", desc: "Advanced text analysis and generation", icon: "🗣️" },
                      { title: "Computer Vision", desc: "Image and video understanding", icon: "👁️" },
                      { title: "Robotics", desc: "Autonomous systems and automation", icon: "🤖" },
                      { title: "Decision Making", desc: "Complex problem-solving and strategy", icon: "🧠" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 + index * 0.2 }}
                      >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="font-semibold text-blue-800 text-xl mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module1/how-ai-works">
                  <Button className="gap-2">
                    Next Topic <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}