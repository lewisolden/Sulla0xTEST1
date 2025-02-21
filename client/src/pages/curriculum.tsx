import { Link, useLocation, useLocation as useLocationHook } from "wouter";
import { BookOpen, GraduationCap, Zap, Gamepad2, CreditCard, Dumbbell, Lightbulb, Brain, Code, Globe, CheckCircle2, ArrowRight, Wallet, Shield, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonalizedPath } from "@/components/learning/personalized-path";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/context/progress-context"; // Updated import path

const subjects = [
  { id: "crypto", name: "Cryptocurrency & DeFi" },
  { id: "ai", name: "Artificial Intelligence" }
];

const courses = [
  {
    id: 1,
    title: "Course 1: Introduction to Cryptocurrency",
    description: "A comprehensive introduction to cryptocurrency, blockchain technology, and digital finance through interactive learning experiences.",
    subject: "crypto",
    level: "beginner",
    defaultPath: "/modules/module1",
    modules: [
      {
        id: 1,
        icon: BookOpen,
        title: "Module 1: Understanding Cryptocurrency",
        description: "Master the fundamentals of cryptocurrency through interactive learning and practical exercises.",
        sections: [
          "Topic 1 - Introduction to Digital Currency",
          "Topic 2 - Understanding Cryptocurrency Security",
          "Topic 3 - Practical Applications",
          "Topic 4 - Getting Started Safely",
          "Interactive Exercises",
          "Module Quiz"
        ],
        path: "/modules/module1"
      },
      {
        id: 2,
        icon: Wallet,
        title: "Module 2: Bitcoin Deep Dive",
        description: "Comprehensive exploration of Bitcoin's technology, protocol architecture, and real-world impact.",
        sections: [
          "Bitcoin Protocol Architecture",
          "Mining and Consensus",
          "Transaction Mechanics",
          "Network Security",
          "Real-world Applications",
          "Module Quiz"
        ],
        path: "/modules/module2"
      },
      {
        id: 3,
        icon: Code,
        title: "Module 3: Ethereum and Smart Contracts",
        description: "Learn about Ethereum, smart contracts, and decentralized applications (dApps).",
        sections: [
          "Ethereum Fundamentals",
          "Smart Contract Basics",
          "Decentralized Applications",
          "Gas and Network Economics",
          "Development Tools",
          "Module Quiz"
        ],
        path: "/modules/module3"
      }
    ]
  },
  {
    id: 2,
    title: "Course 2: Introduction to AI",
    description: "A comprehensive introduction to artificial intelligence, machine learning, and their real-world applications.",
    subject: "ai",
    level: "beginner",
    defaultPath: "/ai/module1",
    modules: [
      {
        id: 1,
        icon: Brain,
        title: "Module 1: AI Fundamentals",
        description: "Learn the fundamental concepts of AI, machine learning, and neural networks.",
        sections: [
          "Topic 1.1 - Introduction to Artificial Intelligence",
          "Topic 1.2 - How AI Works",
          "Topic 1.3 - Machine Learning Basics",
          "Topic 1.4 - Neural Networks and Deep Learning"
        ],
        path: "/ai/module1"
      },
      {
        id: 2,
        icon: Code,
        title: "Module 2: AI Technologies and Applications",
        description: "Explore practical AI applications and implementation strategies.",
        sections: [
          "Topic 2.1 - Natural Language Processing",
          "Topic 2.2 - Computer Vision",
          "Topic 2.3 - AI Tools and Platforms",
          "Topic 2.4 - Practical AI Implementation"
        ],
        path: "/ai/module2"
      },
      {
        id: 3,
        icon: Globe,
        title: "Module 3: Advanced AI Concepts",
        description: "Understand advanced AI concepts and their applications.",
        sections: [
          "Topic 3.1 - Deep Learning",
          "Topic 3.2 - Reinforcement Learning",
          "Topic 3.3 - Generative AI",
          "Topic 3.4 - Future of AI"
        ],
        path: "/ai/module3"
      }
    ]
  },
  {
    id: 3,
    title: "Course 3: Mastering DeFi",
    description: "A comprehensive exploration of decentralized finance, from fundamentals to advanced trading strategies and risk management.",
    subject: "crypto",
    level: "intermediate",
    defaultPath: "/defi/module1",
    modules: [
      {
        id: 1,
        icon: Wallet,
        title: "Module 1: DeFi Fundamentals",
        description: "Learn the core concepts behind decentralized finance and how it transforms traditional financial systems.",
        sections: [
          "1.1 What is DeFi?",
          "1.2 Blockchain & Smart Contracts",
          "1.3 Decentralized Exchanges (DEXs) & AMMs",
          "1.4 Liquidity & Yield Farming"
        ],
        path: "/defi/module1"
      },
      {
        id: 2,
        icon: CreditCard,
        title: "Module 2: Advanced DeFi Trading & Strategies",
        description: "Dive deeper into perpetual futures, options, cross-chain swaps, and advanced DeFi mechanisms.",
        sections: [
          "2.1 Perpetual Futures & Hyperliquid",
          "2.2 Options Trading in DeFi",
          "2.3 Cross-Chain Liquidity & Jupiter Exchange",
          "2.4 Flash Loans & Arbitrage",
          "2.5 DeFi Lending & Borrowing"
        ],
        path: "/defi/module2"
      },
      {
        id: 3,
        icon: Shield,
        title: "Module 3: Practical DeFi & Risk Management",
        description: "Learn how to build a DeFi portfolio, protect assets, and understand regulations.",
        sections: [
          "3.1 Building a DeFi Portfolio",
          "3.2 Security & Avoiding Scams",
          "3.3 Regulatory Landscape & Compliance",
          "3.4 The Future of DeFi"
        ],
        path: "/defi/module3"
      },
      {
        id: 4,
        icon: Rocket,
        title: "Module 4: Advanced DeFi Concepts",
        description: "Explore governance, institutional adoption, and advanced DeFi integrations.",
        sections: [
          "4.1 DeFi Governance",
          "4.2 Institutional DeFi",
          "4.3 DeFi Integrations",
          "4.4 Future of DeFi Infrastructure"
        ],
        path: "/defi/module4"
      }
    ]
  }
];

const simulators = [
  {
    id: "games",
    title: "Interactive Games",
    description: "Learn through gamified experiences and interactive challenges.",
    path: "/games",
    icon: Gamepad2
  },
  {
    id: "glossary",
    title: "Knowledge Base",
    description: "Comprehensive glossary of terms and concepts.",
    path: "/glossary",
    icon: BookOpen
  },
  {
    id: "sensei",
    title: "AI Sensei",
    description: "Get personalized guidance from our AI learning assistant.",
    path: "/sensei",
    icon: Brain
  }
];

const handleContinueLearning = (course: any) => {
  if (!user) {
    toast({
      title: "Authentication Required",
      description: "Please log in or register to continue learning.",
      variant: "destructive",
    });
    setLocation("/login");
    return;
  }

  // Get progress data for the course
  const courseProgress = progress.filter(p => p.courseId === course.id);
  const lastProgress = courseProgress.length > 0 ? courseProgress[courseProgress.length - 1] : null;

  // Handle different course types and set the correct path
  let path = course.defaultPath; // Default path from the course object

  if (lastProgress) {
    path = lastProgress.lastQuizPath || lastProgress.lastCompletedPath || course.defaultPath;
  }

  setLocation(path);
};

export default function Curriculum() {
  useScrollTop();
  const [selectedSubject, setSelectedSubject] = useState<string>("crypto");
  const [selectedCourse, setSelectedCourse] = useState<string>("1");
  const [selectedLevel, setSelectedLevel] = useState<string>("beginner");
  const { toast } = useToast();
  const [, setLocation] = useLocationHook();
  const [coursesProgress, setCoursesProgress] = useState<{[key: string]: number}>({});
  const { user } = useAuth();
  const { progress } = useProgress();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    const course = params.get('course');
    if (subject && (subject === 'crypto' || subject === 'ai')) {
      setSelectedSubject(subject);
      if (course) {
        setSelectedCourse(course);
      } else {
        setSelectedCourse(subject === 'crypto' ? '1' : '2');
      }
    }
  }, []);

  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const { data: progressData, isLoading: loadingProgress } = useQuery({
    queryKey: ['course-progress'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments/progress');
      if (!response.ok) throw new Error('Failed to fetch course progress');
      return response.json();
    }
  });

  useEffect(() => {
    if (progressData) {
      const progressMap = progressData.reduce((acc: {[key: string]: number}, curr: any) => {
        acc[curr.courseId] = curr.progress || 0;
        return acc;
      }, {});
      setCoursesProgress(progressMap);
    }
  }, [progressData]);

  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      try {
        const response = await fetch('/api/enrollments', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ courseId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to enroll in course');
        }

        return response.json();
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to enroll in course');
      }
    },
    onSuccess: () => {
      toast({
        title: "Successfully enrolled!",
        description: "You can now access all course materials.",
      });
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to enroll",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const filteredCourses = courses.filter(course =>
    course.subject === selectedSubject
  );

  const currentCourse = courses.find(course => course.id.toString() === selectedCourse) || courses[0];

  const isEnrolled = enrollments?.some(
    (enrollment: any) => enrollment.courseId === currentCourse.id
  );

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in or register to enroll in this course.",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    const courseIdNumber = Number(currentCourse.id);
    console.log('Enrolling in course:', courseIdNumber);
    enrollMutation.mutate(courseIdNumber);
  };


  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-6">
            Your Learning Journey
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-xl font-bold text-white">
                  <Lightbulb className="h-8 w-8" />
                  <p>Discover Your Path to Mastery</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {filteredCourses.map(course => (
                <SelectItem key={course.id.toString()} value={course.id.toString()}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedLevel}
            onValueChange={setSelectedLevel}
          >
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCourse.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
              {currentCourse.title}
            </h2>

            <p className="text-xl text-blue-700 mb-6">
              {currentCourse.description}
            </p>

            {!loadingProgress && progressData && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-blue-600 mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round(coursesProgress[currentCourse.id] || 0)}%</span>
                </div>
                <Progress 
                  value={coursesProgress[currentCourse.id] || 0} 
                  className="h-3 bg-blue-100 rounded-full"
                />
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {currentCourse.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group p-6 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <module.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-blue-800 group-hover:text-blue-900">
                        {module.title.split(':')[1]}
                      </h3>
                    </div>
                    <p className="text-blue-600 text-sm mb-4 group-hover:text-blue-700">
                      {module.description}
                    </p>
                    <div className="text-blue-500 text-sm flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {module.sections.length} lessons
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {loadingEnrollments ? (
              <div className="text-center py-4">
                <div className="animate-pulse flex justify-center">
                  <div className="h-8 w-32 bg-blue-200 rounded"></div>
                </div>
              </div>
            ) : isEnrolled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-800 px-6 py-4 rounded-xl text-center mb-6 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">You are enrolled in this course</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Button 
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Enrolling...</span>
                    </div>
                  ) : (
                    "Enroll Now"
                  )}
                </Button>
                <p className="text-gray-600 mt-3">
                  Enroll to access full course content and track your progress
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {isEnrolled && (
          <>
            <div className="mb-12">
              <PersonalizedPath />
            </div>

            <div className="space-y-8">
              {currentCourse.modules.map((module) => (
                <motion.div
                  key={module.id}
                  className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: module.id * 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <module.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                        {module.title}
                      </h2>
                      <p className="text-blue-700 mb-6">
                        {module.description}
                      </p>

                      <div className="border-t border-blue-100 pt-6">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">
                          Module Content
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {module.sections.map((section, index) => (
                            <div
                              key={index}
                              className="bg-blue-50 p-4 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              {section}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Link href={module.path}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Continue Learning
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Dumbbell className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Learning Tools
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {simulators.map((tool) => (
                <motion.div
                  key={tool.id}
                  className="group"
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={tool.path}>
                    <Card className="h-full bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 transition-all duration-300 p-6 border border-blue-100 hover:border-blue-200 hover:shadow-lg">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <tool.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-900">
                            {tool.title}
                          </h3>
                        </div>
                        <p className="text-blue-600 group-hover:text-blue-700 flex-grow">
                          {tool.description}
                        </p>
                        <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}