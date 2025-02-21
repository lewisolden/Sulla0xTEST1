import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  LightningBoltIcon,
  BeakerIcon
} from '@heroicons/react/outline';

const Curriculum = () => {
  const modules = [
    {
      id: 1,
      icon: BookOpenIcon,
      title: "Module 1: Fundamentals of Cryptocurrency",
      description: "A comprehensive introduction to digital currencies, their history, and technological foundations.",
      sections: [
        "Digital Currencies",
        "History and Evolution of Money",
        "Bitcoin: The First Cryptocurrency",
        "Altcoins and Tokens",
        "Crypto Market Dynamics",
        "Cryptography Fundamentals"
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
        "Smart Contracts Introduction"
      ]
    },
    {
      id: 3,
      icon: LightningBoltIcon,
      title: "Module 3: Ethereum and Smart Contracts",
      description: "Advanced exploration of Ethereum, smart contracts, and decentralized applications.",
      sections: [
        "Ethereum Fundamentals",
        "Smart Contract Development",
        "Investment and Value",
        "Security and Risk Management",
        {
          title: "Key Topics",
          subsections: [
            "Smart Contracts",
            "The Ethereum Virtual Machine (EVM)",
            "Decentralized Applications (dApps)",
            "Platform Architecture"
          ]
        }
      ]
    },
    {
      id: 4,
      icon: BeakerIcon,
      title: "Module 4: Understanding Digital Money",
      description: "Comprehensive comparison between traditional and digital financial systems.",
      sections: [
        "Digital vs Traditional Money",
        "Crypto Wallet Simulation",
        "Security & Control",
        "Payment Systems & Financial Inclusion",
        "Digital Scarcity & Network Architecture",
        {
          title: "Practical Applications",
          subsections: [
            "Wallet Management",
            "Transaction Security",
            "Cross-border Payments",
            "Financial Inclusion Solutions"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center">
          Sulla Learning Platform Curriculum
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
                Course Content
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {module.sections.map((section, index) => (
                  <div key={index}>
                    {typeof section === 'string' ? (
                      <div className="bg-blue-50 p-4 rounded-lg text-blue-700">
                        {section}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="bg-blue-100 p-4 rounded-lg text-blue-800 font-medium">
                          {section.title}
                        </div>
                        {section.subsections.map((subsection, subIndex) => (
                          <div 
                            key={subIndex}
                            className="bg-blue-50 p-3 rounded-lg text-blue-700 ml-4"
                          >
                            {subsection}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link 
                  to={module.id <= 4 ? `/modules/module${module.id}` : '/ai'} 
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
            Ready to begin your learning journey?
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