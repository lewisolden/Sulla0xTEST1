import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Gamepad2, CreditCard, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import { PersonalizedPath } from "@/components/learning/personalized-path";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

  const filteredCourses = courses.filter(course => 
    course.subject === selectedSubject
  );

  const currentCourse = courses.find(course => course.id.toString() === selectedCourse) || courses[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h1 
          className="text-4xl font-bold text-blue-900 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentCourse.title}
        </motion.h1>

        {/* Filter Section */}
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

        <motion.p
          className="text-xl text-blue-700 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentCourse.description}
        </motion.p>

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