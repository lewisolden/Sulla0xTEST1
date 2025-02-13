import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/progress-context";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  SplitSquareHorizontal,
  Sparkles,
  Brain,
  Check,
  X,
  RefreshCcw,
  Workflow,
  Cpu,
  Code
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Text Analysis Demo Component
const TextAnalysisDemo = () => {
  const [inputText, setInputText] = useState("Natural Language Processing is amazing!");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (inputText) {
      setIsAnalyzing(true);
      const words = inputText.split(/\s+/);
      setTokens([]);
      words.forEach((word, index) => {
        setTimeout(() => {
          setTokens(prev => [...prev, word]);
        }, index * 500);
      });
      setTimeout(() => setIsAnalyzing(false), words.length * 500);
    }
  }, [inputText]);

  return (
    <div className="space-y-4">
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to analyze..."
        className="w-full bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200/50"
      />
      <div className="min-h-[120px] bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-lg p-6 border border-blue-300/20">
        <div className="flex flex-wrap gap-3">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-blue-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-300/30 shadow-lg shadow-blue-500/20"
            >
              <span className="text-blue-100">{token}</span>
            </motion.div>
          ))}
        </div>
        {isAnalyzing && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mt-6"
          >
            <RefreshCcw className="w-6 h-6 text-blue-400" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

// NLP Pipeline Visualization
const NLPPipelineVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Text Input", icon: MessageSquare, desc: "Raw text data ingestion" },
    { title: "Tokenization", icon: SplitSquareHorizontal, desc: "Breaking text into tokens" },
    { title: "Processing", icon: Cpu, desc: "Analyzing and transforming tokens" },
    { title: "Output", icon: Sparkles, desc: "Generating meaningful results" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-12 px-4 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl border border-indigo-300/20 backdrop-blur-sm">
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-center z-10 ${
                isActive ? "text-blue-400" : "text-gray-500"
              }`}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                isActive ? "from-blue-500 to-indigo-600" : "from-gray-700 to-gray-800"
              } flex items-center justify-center mb-3 shadow-lg ${
                isActive ? "shadow-blue-500/30" : ""
              } transition-all duration-300`}>
                <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-gray-400"}`} />
              </div>
              <span className="text-sm font-medium mb-1">{step.title}</span>
              <span className="text-xs text-gray-400 text-center max-w-[120px]">{step.desc}</span>
            </motion.div>
          );
        })}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
            animate={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))"
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Sentiment Analysis Demo
const SentimentAnalysisDemo = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<number | null>(null);

  const analyzeSentiment = () => {
    const positiveWords = ["good", "great", "awesome", "excellent", "happy", "love"];
    const negativeWords = ["bad", "awful", "terrible", "sad", "hate", "poor"];

    const words = text.toLowerCase().split(/\s+/);
    let score = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });

    setSentiment(score);
  };

  return (
    <div className="space-y-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis..."
        className="w-full bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200/50"
      />
      <Button 
        onClick={analyzeSentiment} 
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none"
      >
        Analyze Sentiment
      </Button>
      {sentiment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-lg backdrop-blur-sm border ${
            sentiment > 0 
              ? "bg-green-500/20 border-green-300/30" 
              : sentiment < 0 
                ? "bg-red-500/20 border-red-300/30" 
                : "bg-gray-500/20 border-gray-300/30"
          }`}
        >
          <motion.div 
            className="text-4xl mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            {sentiment > 0 ? "😊" : sentiment < 0 ? "😔" : "😐"}
          </motion.div>
          <p className={`text-lg font-medium mb-2 ${
            sentiment > 0 ? "text-green-300" : sentiment < 0 ? "text-red-300" : "text-gray-300"
          }`}>
            {sentiment > 0 ? "Positive" : sentiment < 0 ? "Negative" : "Neutral"}
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm text-blue-200">Sentiment score:</span>
            <motion.span 
              className="text-sm font-mono bg-black/30 px-2 py-1 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {sentiment}
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function NaturalLanguageProcessing() {
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
      question: "Which NLP task involves breaking text into individual words or tokens?",
      options: [
        "Sentiment Analysis",
        "Tokenization",
        "Machine Translation",
        "Text Generation"
      ],
      correct: 1,
      explanation: "Tokenization is the process of breaking down text into individual words, subwords, or tokens, which is a fundamental step in NLP processing."
    },
    {
      question: "What is the primary goal of sentiment analysis?",
      options: [
        "To count words in text",
        "To translate between languages",
        "To determine emotional tone",
        "To generate new text"
      ],
      correct: 2,
      explanation: "Sentiment analysis aims to determine the emotional tone or attitude expressed in text, whether it's positive, negative, or neutral."
    },
    {
      question: "Which of these is NOT a common application of NLP?",
      options: [
        "Chatbots",
        "Image Recognition",
        "Speech Recognition",
        "Text Summarization"
      ],
      correct: 1,
      explanation: "Image Recognition is primarily a Computer Vision task, not an NLP task. While NLP can be used with images (e.g., for captioning), the core image processing is handled by computer vision algorithms."
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
          sectionId: 'natural-language-processing',
          completed: true,
          score: Math.round((score / questions.length) * 100),
          totalSections: 4,
          currentSection: 1
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
                      ? "Perfect score! You've mastered NLP concepts!"
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
                    <Link href="/ai/module2/computer-vision">
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
            <Button variant="ghost" className="gap-2 text-blue-300 hover:text-blue-200">
              <ArrowLeft className="h-4 w-4" /> Back to Module 2
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none bg-gradient-to-br from-gray-900 to-blue-900">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Natural Language Processing
                  </h1>
                  <p className="text-blue-200">
                    Discover how computers understand and process human language
                  </p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-300">
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Understanding NLP
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Natural Language Processing (NLP) is a branch of artificial intelligence
                    that helps computers understand, interpret, and manipulate human
                    language. Through NLP, machines can read text, hear speech, interpret
                    it, measure sentiment, and determine which parts are important.
                  </p>
                  <NLPPipelineVisualization />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Text Analysis Demo
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Try out this interactive demo to see how NLP breaks down text into
                    tokens for processing. Enter your own text and watch the tokenization
                    process in action.
                  </p>
                  <TextAnalysisDemo />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Sentiment Analysis
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Sentiment analysis is a popular NLP application that determines the
                    emotional tone behind words. Try the demo below to analyze the
                    sentiment of your text.
                  </p>
                  <SentimentAnalysisDemo />
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold text-blue-300 mb-6">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Machine Translation",
                        desc: "Automated translation between languages",
                        gradient: "from-blue-500 to-blue-700",
                        icon: "🌍"
                      },
                      {
                        title: "Chatbots",
                        desc: "AI-powered conversational interfaces",
                        gradient: "from-indigo-500 to-indigo-700",
                        icon: "💬"
                      },
                      {
                        title: "Text Summarization",
                        desc: "Generating concise summaries of longer texts",
                        gradient: "from-purple-500 to-purple-700",
                        icon: "📝"
                      },
                      {
                        title: "Named Entity Recognition",
                        desc: "Identifying and classifying key information in text",
                        gradient: "from-pink-500 to-pink-700",
                        icon: "🔍"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className={`bg-gradient-to-br ${item.gradient} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h3 className="font-semibold text-white text-lg mb-2">
                          {item.title}
                        </h3>
                        <p className="text-blue-100 text-sm">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none"
                >
                  Take Topic Quiz
                </Button>
                <Link href="/ai/module2/computer-vision">
                  <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none">
                    Next Topic <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}