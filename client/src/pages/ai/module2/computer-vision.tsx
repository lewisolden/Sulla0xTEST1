import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useProgress } from "@/context/progress-context";
import { 
  ArrowLeft,
  ArrowRight,
  Camera,
  Eye,
  Scan,
  Box,
  Check,
  X,
  RefreshCcw,
  Focus
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Image Processing Demo Component
const ImageProcessingDemo = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="aspect-video bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg mb-4"
             style={{
               filter: `brightness(${brightness}%) contrast(${contrast}%)`
             }}>
          <div className="h-full w-full flex items-center justify-center">
            <Camera className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Brightness</label>
            <Slider
              value={[brightness]}
              onValueChange={(value) => setBrightness(value[0])}
              min={0}
              max={200}
              step={1}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Contrast</label>
            <Slider
              value={[contrast]}
              onValueChange={(value) => setContrast(value[0])}
              min={0}
              max={200}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Object Detection Animation
const ObjectDetectionDemo = () => {
  const [scanning, setScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);

  useEffect(() => {
    if (scanning) {
      const objects = ["Person", "Car", "Dog", "Tree", "Building"];
      setDetectedObjects([]);
      objects.forEach((obj, index) => {
        setTimeout(() => {
          setDetectedObjects(prev => [...prev, obj]);
        }, index * 1000);
      });
      setTimeout(() => setScanning(false), objects.length * 1000);
    }
  }, [scanning]);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="relative aspect-video bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg">
          {scanning && (
            <motion.div
              className="absolute inset-0 border-2 border-blue-500 rounded-lg"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
          <div className="absolute inset-0 flex flex-wrap gap-2 p-4">
            {detectedObjects.map((obj, index) => (
              <motion.div
                key={obj}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
              >
                {obj}
              </motion.div>
            ))}
          </div>
        </div>
        <Button
          className="mt-4 w-full"
          onClick={() => setScanning(true)}
          disabled={scanning}
        >
          {scanning ? (
            <span className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 animate-spin" />
              Scanning...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              Start Detection
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

// CV Pipeline Visualization
const CVPipelineVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Image Input", icon: Camera },
    { title: "Preprocessing", icon: Focus },
    { title: "Feature Extraction", icon: Box },
    { title: "Classification", icon: Eye }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center z-10 ${
                index === activeStep ? "text-blue-600" : "text-gray-400"
              }`}
              animate={{
                scale: index === activeStep ? 1.1 : 1,
                opacity: index === activeStep ? 1 : 0.7,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 border-2 border-current">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </motion.div>
          );
        })}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-blue-600"
            animate={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ComputerVision() {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null as number | null,
    isCorrect: false,
    showExplanation: false
  });
  const { updateProgress } = useProgress();

  const questions = [
    {
      question: "Which of these is a common preprocessing step in computer vision?",
      options: [
        "Data encryption",
        "Image resizing",
        "Network configuration",
        "Database indexing"
      ],
      correct: 1,
      explanation: "Image resizing is a crucial preprocessing step in computer vision to ensure consistent input sizes for neural networks and improve processing efficiency."
    },
    {
      question: "What is the primary goal of object detection in computer vision?",
      options: [
        "To compress images",
        "To identify and locate objects in images",
        "To create 3D models",
        "To enhance image quality"
      ],
      correct: 1,
      explanation: "Object detection aims to identify and locate specific objects within an image, often by drawing bounding boxes around detected objects."
    },
    {
      question: "Which technology is NOT typically used in computer vision applications?",
      options: [
        "Convolutional Neural Networks",
        "Sound Processing",
        "Feature Extraction",
        "Image Segmentation"
      ],
      correct: 1,
      explanation: "Sound Processing is primarily used in audio applications, not computer vision. The other options are core computer vision technologies."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setAnswerState({
      selectedAnswer: selectedIndex,
      isCorrect,
      showExplanation: true,
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
          showExplanation: false,
        });
      } else {
        setShowResults(true);
        updateProgress({
          moduleId: 'ai-module2',
          sectionId: 'computer-vision',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 4,
          currentSection: 2
        });
      }
    }, 2000);
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              {!showResults ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
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
                                  ? "bg-green-100 border-green-500 hover:bg-green-100"
                                  : "bg-red-100 border-red-500 hover:bg-red-100"
                                : "hover:bg-blue-50"
                            }`}
                            onClick={() =>
                              !answerState.showExplanation && handleAnswer(index)
                            }
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
                        answerState.isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          answerState.isCorrect ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {answerState.isCorrect ? "Correct!" : "Incorrect."}
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
                      ? "Perfect score! You've mastered computer vision concepts!"
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
                    <Link href="/ai/module2/robotics-automation">
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
          <Link href="/ai/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Eye className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Computer Vision
                </h1>
              </div>

              <div className="prose max-w-none">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Understanding Computer Vision
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Computer Vision is a field of artificial intelligence that enables
                    computers to interpret and understand visual information from the
                    world. Through computer vision, machines can process, analyze, and
                    understand images and videos in ways similar to human vision.
                  </p>
                  <CVPipelineVisualization />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Image Processing Demo
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Experiment with basic image processing techniques by adjusting
                    brightness and contrast. These fundamental operations are essential
                    in preparing images for computer vision tasks.
                  </p>
                  <ImageProcessingDemo />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Object Detection
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Object detection is a key computer vision task that involves
                    identifying and locating objects within images. Watch the demo
                    below to see how AI can detect multiple objects in real-time.
                  </p>
                  <ObjectDetectionDemo />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Facial Recognition",
                        desc: "Identifying and verifying people's identities"
                      },
                      {
                        title: "Autonomous Vehicles",
                        desc: "Processing visual data for self-driving cars"
                      },
                      {
                        title: "Medical Imaging",
                        desc: "Analyzing medical scans for diagnosis"
                      },
                      {
                        title: "Quality Control",
                        desc: "Automated inspection in manufacturing"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="bg-blue-50 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <h3 className="font-semibold text-blue-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-700 text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module2/robotics-automation">
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
