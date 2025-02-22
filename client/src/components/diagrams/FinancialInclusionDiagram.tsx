import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, PiggyBank, Users, Building2 } from 'lucide-react';

export const FinancialInclusionDiagram = () => {
  const items = [
    {
      icon: Globe2,
      title: "Global Access",
      description: "Connect to the financial system from anywhere",
      color: "blue"
    },
    {
      icon: PiggyBank,
      title: "Cost Reduction",
      description: "Lower fees for sending money internationally",
      color: "green"
    },
    {
      icon: Users,
      title: "Peer-to-Peer",
      description: "Direct financial transactions without intermediaries",
      color: "purple"
    },
    {
      icon: Building2,
      title: "Banking Alternative",
      description: "Financial services without traditional bank accounts",
      color: "orange"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className={`bg-${item.color}-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="mb-4 flex justify-center">
            <div className={`p-4 bg-${item.color}-100 rounded-full`}>
              <item.icon className={`w-8 h-8 text-${item.color}-600`} />
            </div>
          </div>
          <h4 className={`font-semibold text-${item.color}-800 text-lg mb-2 text-center`}>{item.title}</h4>
          <p className="text-gray-600 text-center text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
