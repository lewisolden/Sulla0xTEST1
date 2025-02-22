import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, Landmark, FileText, LineChart, GraduationCap, Heart } from 'lucide-react';

export const ApplicationShowcase = () => {
  const applications = [
    {
      icon: Banknote,
      title: "Digital Payments",
      description: "Fast, secure, and borderless transactions for everyday purchases",
      examples: ["Cross-border remittances", "Online shopping", "Bill payments"],
      color: "emerald"
    },
    {
      icon: Landmark,
      title: "Decentralized Finance",
      description: "Access to financial services without traditional banking infrastructure",
      examples: ["Lending platforms", "Yield farming", "Decentralized exchanges"],
      color: "violet"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated agreements and transactions without intermediaries",
      examples: ["Insurance policies", "Real estate deals", "Supply chain tracking"],
      color: "blue"
    },
    {
      icon: LineChart,
      title: "Investment Opportunities",
      description: "New ways to grow and manage wealth",
      examples: ["Token investments", "Crypto index funds", "NFT marketplaces"],
      color: "indigo"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Learning and certification on the blockchain",
      examples: ["Digital credentials", "Online courses", "Skill verification"],
      color: "cyan"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Using blockchain for positive change",
      examples: ["Charity transparency", "Sustainable projects", "Community initiatives"],
      color: "rose"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {applications.map((app, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-${app.color}-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className={`p-3 bg-${app.color}-100 rounded-full w-fit mb-4`}>
            <app.icon className={`w-6 h-6 text-${app.color}-600`} />
          </div>
          <h3 className={`text-xl font-bold text-${app.color}-800 mb-2`}>{app.title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{app.description}</p>
          <div className="space-y-2">
            {app.examples.map((example, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${app.color}-400`} />
                <span className="text-sm text-gray-600">{example}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
