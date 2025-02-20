import { Link } from "wouter";
import { BookOpen, GraduationCap, Zap, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import { PersonalizedPath } from "@/components/learning/personalized-path";

const modules = [
  {
    id: 1,
    icon: BookOpen,
    title: "Module 1: Fundamentals of Cryptocurrency",
    description: "A comprehensive introduction to digital currencies, their history, and technological foundations.",
    sections: [
      "Introduction to Digital Currencies",
      "History and Evolution of Money",
      "Bitcoin: The First Cryptocurrency",
      "Altcoins and Tokens",
      "Cryptocurrency Market Dynamics",
      "Basic Cryptography Concepts"
    ]
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Module 2: Understanding Blockchain",
    description: "Deep dive into blockchain technology, its structure, and fundamental principles.",
    sections: [
      "Blockchain Basics",
      "Distributed Ledger Technology",
      "Consensus Mechanisms",
      "Smart Contracts"
    ]
  },
  {
    id: 3,
    icon: Zap,
    title: "Module 3: Advanced Concepts",
    description: "Advanced exploration of blockchain development, applications, and future trends.",
    sections: [
      "Blockchain Scalability and Interoperability",
      "Types of Blockchains",
      "Blockchain Development Platforms",
      "Advanced Blockchain Concepts"
    ]
  },
  {
    id: 4,
    icon: Gamepad2,
    title: "Interactive Learning Games",
    description: "Learn blockchain concepts through hands-on simulations and interactive games.",
    sections: [
      "Mining Simulator",
      "Blockchain Explorer",
      "Smart Contract Builder",
      "Consensus Mechanism Demo"
    ]
  }
];

export default function Curriculum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h1 
          className="text-4xl font-bold text-blue-900 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Learning Journey
        </motion.h1>

        <div className="mb-12">
          <PersonalizedPath />
        </div>

        <div className="space-y-8">
          {modules.map((module) => (
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
                      Module Sections
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
                      <Link href={`/modules/module${module.id}`}>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                          Start Module
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
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-blue-800 text-xl mb-6">
            Ready to begin your blockchain learning journey?
          </p>
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