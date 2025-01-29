import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  LightningBoltIcon 
} from '@heroicons/react/outline';

const Curriculum = () => {
  const modules = [
    {
      id: 1,
      icon: BookOpenIcon,
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
      icon: AcademicCapIcon,
      title: "Module 2: What is a Blockchain?",
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
      icon: LightningBoltIcon,
      title: "Module 3: Blockchain Technology",
      description: "Advanced exploration of blockchain development, applications, and future trends.",
      sections: [
        "Blockchain Scalability and Interoperability",
        "Types of Blockchains",
        "Blockchain Development Platforms",
        "Advanced Blockchain Concepts"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Sulla Cryptocurrency Curriculum
        </h1>

        {modules.map((module) => (
          <div 
            key={module.id} 
            className="bg-white shadow-lg rounded-lg p-8 mb-8 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-start mb-6">
              <module.icon className="h-12 w-12 text-blue-600 mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-blue-800">
                  {module.title}
                </h2>
                <p className="text-blue-700 mt-2">
                  {module.description}
                </p>
              </div>
            </div>

            <div className="border-t border-blue-100 pt-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Module Sections
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {module.sections.map((section, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 p-4 rounded-lg text-blue-700"
                  >
                    {section}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link 
                  to={`/modules/module${module.id}`} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Start Module
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <p className="text-blue-800 text-xl mb-6">
            Ready to begin your blockchain learning journey?
          </p>
          <Link 
            to="/modules" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
          >
            Begin Your Learning Path
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
