import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Gamepad2, CreditCard, Dumbbell, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import { PersonalizedPath } from "@/components/learning/personalized-path";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const subjects = [
  { id: "crypto", name: "Cryptocurrency" },
  { id: "ai", name: "Artificial Intelligence" }
];

const courses = [
  {
    id: 1,
    title: "Course 1: Introduction to Cryptocurrency",
    description: "A comprehensive introduction to cryptocurrency, blockchain technology, and digital finance through interactive learning experiences.",
    subject: "crypto",
    level: "beginner",
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
        icon: GraduationCap,
        title: "Module 2: Bitcoin Fundamentals",
        description: "Deep dive into Bitcoin, investment strategies, and security considerations.",
        sections: [
          "Bitcoin Fundamentals",
          "Bitcoin Investment",
          "Security & Risk Management",
          "Interactive Exercises",
          "Module Quiz"
        ],
        path: "/modules/module2"
      },
      {
        id: 3,
        icon: Zap,
        title: "Module 3: Ethereum & Smart Contracts",
        description: "Explore Ethereum, smart contracts, and their practical applications.",
        sections: [
          "Ethereum Fundamentals",
          "Smart Contracts",
          "Investment Value",
          "Security Risks",
          "Interactive Exercises",
          "Module Quiz"
        ],
        path: "/modules/module3"
      }
    ]
  }
];

const simulators = [
  {
    id: "wallet",
    title: "Wallet Simulator",
    description: "Practice creating and managing cryptocurrency wallets in a safe environment.",
    path: "/wallet-simulator"
  },
  {
    id: "trading",
    title: "Trading Simulator",
    description: "Learn cryptocurrency trading basics with our risk-free simulator.",
    path: "/trading-simulator"
  }
];

export default function Curriculum() {
  const [selectedSubject, setSelectedSubject] = useState<string>("crypto");
  const [selectedCourse, setSelectedCourse] = useState<string>("1");
  const [selectedLevel, setSelectedLevel] = useState<string>("beginner");
  const { toast } = useToast();

  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await fetch('/api/enrollments');
      if (!response.ok) throw new Error('Failed to fetch enrollments');
      return response.json();
    }
  });

  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      if (!response.ok) throw new Error('Failed to enroll');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully enrolled!",
        description: "You can now access all course materials.",
      });
    },
    onError: (error) => {
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
    enrollMutation.mutate(currentCourse.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Sulla's Curriculum
          </h1>
          <Card className="p-6 bg-blue-600">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                <Lightbulb className="h-6 w-6" />
                <p>Ready to embark on your learning journey?</p>
              </div>
              <p className="text-xl font-bold text-white mt-2">
                Explore our curriculum and discover the power of interactive education today!
              </p>
            </div>
          </Card>
          <Card className="p-6 mt-4">
            <p className="text-xl text-gray-800 max-w-3xl mx-auto text-justify">
              Sulla transforms complex technical concepts into engaging, accessible learning experiences.
              Our innovative platform combines interactive lessons, hands-on simulations, and adaptive learning technology
              to create a personalized educational journey. Through gamified exercises, real-world applications, and
              progressive skill building, we ensure that every learner can master new technologies at their own pace.
              Our comprehensive curriculum features visual learning aids, practical exercises, and instant feedback to
              help you build confidence and expertise in emerging technologies.
            </p>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="bg-white">
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
            <SelectTrigger className="bg-white">
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
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-blue-800 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentCourse.title}
        </motion.h2>

        <motion.p
          className="text-xl text-blue-700 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentCourse.description}
        </motion.p>

        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {loadingEnrollments ? (
            <p>Loading enrollment status...</p>
          ) : isEnrolled ? (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
              You are enrolled in this course
            </div>
          ) : (
            <Button 
              onClick={handleEnroll}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={enrollMutation.isPending}
            >
              {enrollMutation.isPending ? "Enrolling..." : "Enroll in Course"}
            </Button>
          )}
        </motion.div>

        {isEnrolled ? (
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
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                              Start Learning
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Enroll to Access Course Content</h3>
            <p className="text-gray-600 mb-4">
              Please enroll in this course to access all learning materials, modules, and interactive content.
            </p>
          </Card>
        )}

        <motion.div
          className="mt-12 bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-blue-800">Practical Exercises</h2>
          </div>
          <p className="text-blue-700 mb-6">
            Put your knowledge into practice with our comprehensive set of interactive exercises and hands-on activities.
          </p>
          <div className="text-center">
            <Link href="/modules/module1/exercises">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center gap-2 mx-auto">
                <Dumbbell className="h-5 w-5" />
                Start Exercises
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Interactive Learning Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {simulators.map((sim) => (
              <motion.div
                key={sim.id}
                className="bg-blue-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{sim.title}</h3>
                <p className="text-blue-600 mb-4">{sim.description}</p>
                <Link href={sim.path}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Launch Simulator
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/modules/module1">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-300">
              Begin Your Learning Path
            </button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}