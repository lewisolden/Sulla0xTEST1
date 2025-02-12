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
  RefreshCcw
} from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Interactive Text Analysis Component
const TextAnalysisDemo = () => {
  const [inputText, setInputText] = useState("Natural Language Processing is amazing!");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (inputText) {
      setIsAnalyzing(true);
      // Simulate tokenization
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
        className="w-full"
      />
      <div className="min-h-[100px] bg-blue-50 rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white px-3 py-1 rounded-full border border-blue-200 shadow-sm"
            >
              {token}
            </motion.div>
          ))}
        </div>
        {isAnalyzing && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mt-4"
          >
            <RefreshCcw className="w-6 h-6 text-blue-500" />
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
    { title: "Text Input", icon: MessageSquare },
    { title: "Tokenization", icon: SplitSquareHorizontal },
    { title: "Processing", icon: Brain },
    { title: "Output", icon: Sparkles }
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

// Sentiment Analysis Demo
const SentimentAnalysisDemo = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<number | null>(null);

  const analyzeSentiment = () => {
    // Simple sentiment analysis simulation
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
        className="w-full"
      />
      <Button onClick={analyzeSentiment} className="w-full">
        Analyze Sentiment
      </Button>
      {sentiment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: sentiment > 0 ? "#dcfce7" : sentiment < 0 ? "#fee2e2" : "#f3f4f6",
            color: sentiment > 0 ? "#166534" : sentiment < 0 ? "#991b1b" : "#374151"
          }}
        >
          <p className="text-lg font-medium">
            {sentiment > 0 ? "Positive 😊" : sentiment < 0 ? "Negative 😔" : "Neutral 😐"}
          </p>
          <p className="text-sm mt-2">
            Sentiment score: {sentiment}
          </p>
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
                <MessageSquare className="h-10 w-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-blue-800">
                  Natural Language Processing
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
                    Understanding NLP
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Text Analysis Demo
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Sentiment Analysis
                  </h2>
                  <p className="text-gray-700 mb-4">
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
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                    Key Applications
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Machine Translation",
                        desc: "Automated translation between languages"
                      },
                      {
                        title: "Chatbots",
                        desc: "AI-powered conversational interfaces"
                      },
                      {
                        title: "Text Summarization",
                        desc: "Generating concise summaries of longer texts"
                      },
                      {
                        title: "Named Entity Recognition",
                        desc: "Identifying and classifying key information in text"
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
                <Link href="/ai/module2/computer-vision">
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
