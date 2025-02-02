import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Shield, Brain, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Exercise {
  title: string;
  tasks: string[];
  completed: boolean[];
}

export default function ExercisesSection() {
  useScrollTop();
  const [activeTab, setActiveTab] = useState("beginner");
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { updateProgress } = useProgress();

  const [beginnerExercises, setBeginnerExercises] = useState<Exercise[]>([
    {
      title: "Wallet Setup and Security",
      tasks: [
        "Download TestNet Bitcoin Wallet",
        "Complete initial setup",
        "Write down recovery phrase properly",
        "Enable basic security features",
        "Create strong password",
        "Enable biometric authentication if available",
        "Set up 2-factor authentication",
        "Store recovery phrase in two secure locations"
      ],
      completed: new Array(8).fill(false)
    },
    {
      title: "Understanding Transactions",
      tasks: [
        "Find a reliable Bitcoin testnet faucet",
        "Request test Bitcoin",
        "Confirm receipt in wallet",
        "Send small amount to another test address",
        "Document transaction fee choices",
        "Monitor confirmation process",
        "Note time to confirmation"
      ],
      completed: new Array(7).fill(false)
    }
  ]);

  const [intermediateExercises, setIntermediateExercises] = useState<Exercise[]>([
    {
      title: "Market Analysis",
      tasks: [
        "Track Bitcoin price for one week",
        "Create price chart in spreadsheet",
        "Calculate daily volatility",
        "Identify price patterns",
        "Record daily trading volumes",
        "Compare volume patterns with price"
      ],
      completed: new Array(6).fill(false)
    },
    {
      title: "Bitcoin ETF Comparison",
      tasks: [
        "List available Bitcoin ETFs",
        "Note key features of each",
        "Compare fee structures",
        "Identify unique characteristics",
        "Create comparison table"
      ],
      completed: new Array(5).fill(false)
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(2, 'practical-exercises', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const toggleTask = (exerciseIndex: number, taskIndex: number, level: 'beginner' | 'intermediate') => {
    if (level === 'beginner') {
      const newExercises = [...beginnerExercises];
      newExercises[exerciseIndex].completed[taskIndex] = !newExercises[exerciseIndex].completed[taskIndex];
      setBeginnerExercises(newExercises);
    } else {
      const newExercises = [...intermediateExercises];
      newExercises[exerciseIndex].completed[taskIndex] = !newExercises[exerciseIndex].completed[taskIndex];
      setIntermediateExercises(newExercises);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="h-full bg-blue-600" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          2.4 Practical Exercises
        </motion.h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4 bg-muted p-2">
            <TabsTrigger value="beginner" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Beginner
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Intermediate
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beginner">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Beginner Level Exercises</h2>
              {beginnerExercises.map((exercise, exerciseIndex) => (
                <motion.div
                  key={exercise.title}
                  className="mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{exercise.title}</h3>
                  <div className="space-y-3">
                    {exercise.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={taskIndex}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                        whileHover={{ scale: 1.01 }}
                      >
                        <button
                          onClick={() => toggleTask(exerciseIndex, taskIndex, 'beginner')}
                          className={`p-1 rounded-full transition-colors ${
                            exercise.completed[taskIndex]
                              ? 'text-green-500 hover:text-green-600'
                              : 'text-gray-400 hover:text-gray-500'
                          }`}
                        >
                          {exercise.completed[taskIndex] ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-700">{task}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="intermediate">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Intermediate Level Exercises</h2>
              {intermediateExercises.map((exercise, exerciseIndex) => (
                <motion.div
                  key={exercise.title}
                  className="mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{exercise.title}</h3>
                  <div className="space-y-3">
                    {exercise.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={taskIndex}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                        whileHover={{ scale: 1.01 }}
                      >
                        <button
                          onClick={() => toggleTask(exerciseIndex, taskIndex, 'intermediate')}
                          className={`p-1 rounded-full transition-colors ${
                            exercise.completed[taskIndex]
                              ? 'text-green-500 hover:text-green-600'
                              : 'text-gray-400 hover:text-gray-500'
                          }`}
                        >
                          {exercise.completed[taskIndex] ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-700">{task}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Advanced Level Exercises</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">Security Scenario Planning</h3>
                  <p className="text-gray-600 mb-4">Create and test response plans for:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Lost device scenarios</li>
                    <li>Forgotten password recovery</li>
                    <li>Compromise attempts</li>
                    <li>Hardware failure</li>
                    <li>Emergency access procedures</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">Portfolio Management</h3>
                  <p className="text-gray-600 mb-4">Create and manage a mock Bitcoin investment portfolio:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Set investment goals</li>
                    <li>Determine risk tolerance</li>
                    <li>Create allocation strategy</li>
                    <li>Set rebalancing rules</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">Practice Projects</h2>
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">Educational Resource Creation</h3>
                  <p className="text-gray-600 mb-4">Create educational content to explain Bitcoin to others:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Write simple Bitcoin explanation</li>
                    <li>Create transaction flowchart</li>
                    <li>Design security checklist</li>
                    <li>Develop beginner's guide</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-600 mb-4">Market Research Report</h3>
                  <p className="text-gray-600 mb-4">Conduct and present Bitcoin market research:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Historical price analysis</li>
                    <li>Volume trends</li>
                    <li>Market correlations</li>
                    <li>News impact analysis</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {isFullyRead && (
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Practical Exercises section.
              </p>
            </Card>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <Link href="/modules/module2">
                <Button variant="outline" className="w-full md:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module Overview
                </Button>
              </Link>

              <Link href="/modules/module2/quiz">
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                  Next: Module Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}