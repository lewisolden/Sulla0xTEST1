import { Link, useLocation, useLocation as useLocationHook } from "wouter";
import { BookOpen, GraduationCap, Zap, Gamepad2, CreditCard, Dumbbell, Lightbulb, Brain, Code, Globe, CheckCircle2, ArrowRight, Wallet, Shield, Rocket, Terminal, Database, Network } from "lucide-react";
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
import { useProgress } from "@/context/progress-context";

const subjects = [
  { id: "crypto", name: "Cryptocurrency & DeFi" },
  { id: "ai", name: "Artificial Intelligence" }
];

const courses = [
  {
    id: 1,
    title: "Course 1: Cryptocurrency Fundamentals",
    description: "Master the foundations of blockchain technology, digital currencies, and crypto markets through interactive learning experiences.",
    subject: "crypto",
    level: "beginner",
    defaultPath: "/modules/module1",
    duration: "4 weeks",
    modules: [
      {
        id: 1,
        icon: BookOpen,
        title: "Module 1: Understanding Digital Currencies",
        description: "Explore the evolution of money and the emergence of digital currencies.",
        sections: [
          "Digital Currencies Overview",
          "History and Evolution of Money",
          "Blockchain Technology Basics",
          "Cryptocurrency Fundamentals",
          "Interactive Exercises",
          "Module Quiz"
        ],
        path: "/modules/module1"
      },
      {
        id: 2,
        icon: Shield,
        title: "Module 2: Cryptography & Security",
        description: "Learn about cryptographic principles and blockchain security.",
        sections: [
          "Cryptography Basics",
          "Public Key Infrastructure",
          "Blockchain Security",
          "Wallet Security",
          "Hands-on Security Lab",
          "Module Quiz"
        ],
        path: "/modules/module2"
      },
      {
        id: 3,
        icon: Terminal,
        title: "Module 3: Blockchain Architecture",
        description: "Deep dive into blockchain technology and consensus mechanisms.",
        sections: [
          "Blockchain Structure",
          "Consensus Mechanisms",
          "Network Types",
          "Smart Contracts Intro",
          "Technical Workshop",
          "Module Quiz"
        ],
        path: "/modules/module3"
      }
    ]
  },
  {
    id: 2,
    title: "Course 2: AI & Machine Learning",
    description: "Explore the fascinating world of artificial intelligence, machine learning, and neural networks.",
    subject: "ai",
    level: "beginner",
    defaultPath: "/ai/module1",
    duration: "6 weeks",
    modules: [
      {
        id: 1,
        icon: Brain,
        title: "Module 1: AI Fundamentals",
        description: "Introduction to artificial intelligence and its core concepts.",
        sections: [
          "What is Artificial Intelligence?",
          "Types of AI Systems",
          "Machine Learning Basics",
          "Neural Networks Foundation",
          "Practical AI Applications",
          "Module Quiz"
        ],
        path: "/ai/module1"
      },
      {
        id: 2,
        icon: Network,
        title: "Module 2: Machine Learning Deep Dive",
        description: "Comprehensive exploration of machine learning algorithms and applications.",
        sections: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Reinforcement Learning",
          "Model Training & Evaluation",
          "ML Projects Workshop",
          "Module Quiz"
        ],
        path: "/ai/module2"
      },
      {
        id: 3,
        icon: Database,
        title: "Module 3: Advanced AI Applications",
        description: "Explore practical applications and implementations of AI technology.",
        sections: [
          "Natural Language Processing",
          "Computer Vision",
          "AI in Blockchain",
          "Future of AI",
          "Case Studies",
          "Module Quiz"
        ],
        path: "/ai/module3"
      }
    ]
  },
  {
    id: 3,
    title: "Course 3: DeFi Mastery",
    description: "Master decentralized finance concepts, protocols, and advanced trading strategies.",
    subject: "crypto",
    level: "intermediate",
    defaultPath: "/defi/module1",
    duration: "8 weeks",
    modules: [
      {
        id: 1,
        icon: Wallet,
        title: "Module 1: DeFi Fundamentals",
        description: "Understanding the basics of decentralized finance and its ecosystem.",
        sections: [
          "Introduction to DeFi",
          "DeFi Protocols Overview",
          "Lending & Borrowing",
          "Yield Farming Basics",
          "Risk Management",
          "Module Quiz"
        ],
        path: "/defi/module1"
      },
      {
        id: 2,
        icon: CreditCard,
        title: "Module 2: Advanced Trading",
        description: "Learn advanced DeFi trading strategies and mechanisms.",
        sections: [
          "DEX Trading Strategies",
          "Automated Market Makers",
          "Perpetual Futures",
          "Options Trading",
          "Trading Workshop",
          "Module Quiz"
        ],
        path: "/defi/module2"
      },
      {
        id: 3,
        icon: Shield,
        title: "Module 3: DeFi Security",
        description: "Master DeFi security practices and risk management.",
        sections: [
          "Security Best Practices",
          "Smart Contract Auditing",
          "Risk Assessment",
          "Security Tools",
          "Case Studies",
          "Module Quiz"
        ],
        path: "/defi/module3"
      },
      {
        id: 4,
        icon: Rocket,
        title: "Module 4: Future of DeFi",
        description: "Explore emerging trends and the future of decentralized finance.",
        sections: [
          "DeFi Innovation Trends",
          "Cross-chain DeFi",
          "Institutional DeFi",
          "Regulatory Landscape",
          "Future Projects",
          "Final Assessment"
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  if (!user) {
    toast({
      title: "Authentication Required",
      description: "Please log in or register to continue learning.",
      variant: "destructive",
    });
    setLocation("/login");
    return;
  }

  const { progress } = useProgress();
  const courseProgress = progress.filter(p => p.courseId === course.id);
  const lastProgress = courseProgress.length > 0 ? courseProgress[courseProgress.length - 1] : null;

  let path = course.defaultPath;

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

      const courseIdNumber = Number(currentCourse.id);
      if (courseIdNumber === 3) {
        setLocation('/defi/module1');
      } else if (courseIdNumber === 2) {
        setLocation('/ai/module1');
      } else {
        setLocation('/modules/module1');
      }
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
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Begin Your Learning Journey
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto mb-8">
            Choose from our comprehensive curriculum designed to take you from beginner to expert in blockchain, AI, and DeFi.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 text-xl font-bold text-white">
                  <Lightbulb className="h-8 w-8" />
                  <p>Transform Your Understanding of Emerging Technologies</p>
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
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-blue-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {currentCourse.title}
                </h2>
                <p className="text-blue-600">Duration: {currentCourse.duration}</p>
              </div>
            </div>

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
                  whileHover={{ y: -5 }}
                >
                  <Card className="group h-full p-6 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg transform group-hover:scale-110 transition-all duration-300">
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-blue-800 group-hover:text-blue-900">
                        {module.title.split(':')[1]}
                      </h3>
                    </div>
                    <p className="text-blue-600 text-sm mb-4 group-hover:text-blue-700">
                      {module.description}
                    </p>
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {module.sections.map((section, sIndex) => (
                        <div 
                          key={sIndex}
                          className="flex items-center gap-2 text-sm text-blue-600"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{section}</span>
                        </div>
                      ))}
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button 
                onClick={user ? handleEnroll : () => setLocation("/login")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={enrollMutation.isPending || isEnrolled}
              >
                {enrollMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Enrolling...</span>
                  </div>
                ) : isEnrolled ? (
                  "Enrolled"
                ) : user ? (
                  "Enroll Now"
                ) : (
                  "Log in to Enroll"
                )}
              </Button>
              {!isEnrolled && (
                <p className="text-gray-600 mt-3">
                  {user ? "Enroll to access full course content" : "Create an account to start learning"}
                </p>
              )}
            </div>
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
                  className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: module.id * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
                      <module.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
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
                            <motion.div
                              key={index}
                              className="bg-blue-50 p-4 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2"
                              whileHover={{ scale: 1.02 }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-blue-500" />
                              {section}
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Link href={user ? module.path : "/login"}>
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              {user ? (
                                <div className="flex items-center gap-2">
                                  <span>Continue Learning</span>
                                  <ArrowRight className="h-5 w-5" />
                                </div>
                              ) : (
                                "Log in to Start"
                              )}
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
          <Card className="bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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
                          <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg group-hover:scale-110 transition-all duration-300">
                            <tool.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
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