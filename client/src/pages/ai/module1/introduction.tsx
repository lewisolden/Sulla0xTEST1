import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, ArrowRight, Brain, Cpu, Network, Lightbulb, History, Layers, Code, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimelineItem = ({ year, title, description, delay }: { year: string; title: string; description: string; delay: number }) => (
  <motion.div
    className="flex gap-4 mb-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-24 flex-shrink-0">
      <div className="bg-blue-100 rounded-lg p-2 text-center">
        <span className="text-blue-800 font-semibold">{year}</span>
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-blue-800">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
);

const AITypeCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: any; delay: number }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6"
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
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function AIIntroduction() {
  const { progress, updateProgress } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

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
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      updateProgress({
        moduleId: 'ai-module1',
        sectionId: 'ai-introduction',
        completed: true,
        score: Math.round((score / questions.length) * 100)
      });
    }
  };

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

        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardContent className="pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <Brain className="h-10 w-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-blue-800">
                      Introduction to Artificial Intelligence
                    </h1>
                  </div>

                  <div className="prose max-w-none">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <Lightbulb className="h-6 w-6" />
                        What is Artificial Intelligence?
                      </h2>
                      <p className="mb-6 text-gray-700">
                        Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed
                        to think and learn like humans. The term encompasses a wide range of technologies and approaches
                        aimed at making computers perform tasks that typically require human intelligence.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <Cpu className="h-6 w-6" />
                        Types of AI
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                    >
                      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <History className="h-6 w-6" />
                        Historical Development
                      </h2>
                      <div className="bg-blue-50 rounded-lg p-6 mb-8">
                        <TimelineItem
                          year="1950s"
                          title="Birth of AI"
                          description="AI emerges as an academic discipline, with the historic Dartmouth Conference."
                          delay={1.2}
                        />
                        <TimelineItem
                          year="1960s"
                          title="Early NLP"
                          description="First attempts at natural language processing and expert systems."
                          delay={1.4}
                        />
                        <TimelineItem
                          year="1980s"
                          title="Neural Networks"
                          description="Development of neural networks and expert systems gains momentum."
                          delay={1.6}
                        />
                        <TimelineItem
                          year="2000s"
                          title="Big Data"
                          description="Big data and machine learning revolution begins."
                          delay={1.8}
                        />
                        <TimelineItem
                          year="2010s"
                          title="Deep Learning"
                          description="Major breakthroughs in deep learning and neural networks."
                          delay={2}
                        />
                        <TimelineItem
                          year="2020s"
                          title="AI Acceleration"
                          description="Large language models and widespread AI adoption."
                          delay={2.2}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                    >
                      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                        <Network className="h-6 w-6" />
                        Current State of AI Technology
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {[
                          { title: "Language Processing", desc: "Advanced text analysis and generation" },
                          { title: "Computer Vision", desc: "Image and video understanding" },
                          { title: "Robotics", desc: "Autonomous systems and automation" },
                          { title: "Decision Making", desc: "Complex problem-solving and strategy" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.title}
                            className="bg-blue-50 p-4 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.6 + index * 0.2 }}
                          >
                            <h3 className="font-semibold text-blue-800 mb-2">{item.title}</h3>
                            <p className="text-gray-700 text-sm">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <Link href="/ai/module1">
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Module
                      </Button>
                    </Link>
                    <Button
                      onClick={() => document.querySelector('[value="quiz"]')?.click()}
                      className="gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      Take Quiz <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card>
              <CardContent className="pt-6">
                {!quizStarted ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                        Ready to Test Your Knowledge?
                      </h2>
                      <p className="text-gray-600 mb-6">
                        This quiz will help reinforce your understanding of AI fundamentals.
                      </p>
                      <Button 
                        onClick={() => setQuizStarted(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Quiz
                      </Button>
                    </motion.div>
                  </div>
                ) : !showResults ? (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
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
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left hover:bg-blue-50"
                            onClick={() => handleAnswer(index)}
                          >
                            <span className="mr-4">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
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
                          setQuizStarted(false);
                          setCurrentQuestion(0);
                          setScore(0);
                          setShowResults(false);
                        }}
                      >
                        Retake Quiz
                      </Button>
                      <Link href="/ai/module1/how-ai-works">
                        <Button className="gap-2">
                          Next Topic <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}