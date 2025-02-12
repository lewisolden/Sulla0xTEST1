import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { ArrowLeft, ArrowRight, Brain, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIIntroduction() {
  const { progress, updateProgress } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What is artificial intelligence?",
      options: [
        "A type of computer hardware",
        "The simulation of human intelligence by machines",
        "A programming language",
        "A database management system"
      ],
      correct: 1
    },
    {
      question: "Which of the following best describes Narrow AI?",
      options: [
        "AI that can perform any intellectual task",
        "AI designed for a specific task",
        "AI that has consciousness",
        "AI that can learn anything"
      ],
      correct: 1
    },
    {
      question: "When did the field of AI research begin?",
      options: [
        "1980s",
        "1990s",
        "1950s",
        "2000s"
      ],
      correct: 2
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      updateProgress({
        moduleId: 'ai-module1',
        sectionId: 'ai-introduction',
        completed: true,
        score: (score / questions.length) * 100
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
                  <h1 className="text-3xl font-bold text-blue-800 mb-6">
                    Introduction to Artificial Intelligence
                  </h1>

                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      What is Artificial Intelligence?
                    </h2>
                    <p className="mb-4">
                      Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed
                      to think and learn like humans. The term encompasses a wide range of technologies and approaches
                      aimed at making computers perform tasks that typically require human intelligence.
                    </p>

                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Types of AI
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Narrow AI (ANI)</h3>
                        <p className="text-gray-700">
                          Designed for specific tasks like facial recognition or playing chess.
                          Currently the most common form of AI.
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">General AI (AGI)</h3>
                        <p className="text-gray-700">
                          Hypothetical AI with human-like general intelligence.
                          Still largely theoretical and under development.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Historical Development
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>1950s: Birth of AI as an academic discipline</li>
                      <li>1960s: Early natural language processing attempts</li>
                      <li>1980s: Expert systems and neural networks</li>
                      <li>2000s: Big data and machine learning revolution</li>
                      <li>2010s: Deep learning breakthroughs</li>
                      <li>2020s: Large language models and AI acceleration</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                      Current State of AI Technology
                    </h2>
                    <p className="mb-4">
                      Today's AI is characterized by specialized systems excelling in specific domains:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Language processing and generation</li>
                      <li>Image and speech recognition</li>
                      <li>Game playing and strategy</li>
                      <li>Data analysis and prediction</li>
                      <li>Robotics and automation</li>
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Link href="/ai/module1/how-ai-works">
                      <Button className="gap-2">
                        Next Topic <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
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
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                      Ready to test your knowledge?
                    </h2>
                    <Button onClick={() => setQuizStarted(true)}>
                      Start Quiz
                    </Button>
                  </div>
                ) : currentQuestion < questions.length ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">
                      Question {currentQuestion + 1} of {questions.length}
                    </h2>
                    <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
                    <div className="grid gap-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left"
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                      Quiz Completed!
                    </h2>
                    <p className="text-lg mb-4">
                      You scored {score} out of {questions.length}
                    </p>
                    <Link href="/ai/module1/how-ai-works">
                      <Button className="gap-2">
                        Next Topic <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
