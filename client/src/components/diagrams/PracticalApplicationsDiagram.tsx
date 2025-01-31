import { motion } from "framer-motion";
import { Database, ShoppingCart, Building2, Vote, Hospital, Plane } from "lucide-react";

export const PracticalApplicationsDiagram = () => {
  const applications = [
    {
      icon: ShoppingCart,
      title: "Supply Chain",
      description: "Track products from origin to consumer"
    },
    {
      icon: Building2,
      title: "Real Estate",
      description: "Property tokenization and management"
    },
    {
      icon: Vote,
      title: "Voting",
      description: "Secure electronic voting systems"
    },
    {
      icon: Hospital,
      title: "Healthcare",
      description: "Medical records and drug tracking"
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Loyalty programs and booking"
    }
  ];

  return (
    <div className="py-8">
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-3 rounded-full bg-blue-100 mb-4">
              <app.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">{app.title}</h3>
            <p className="text-gray-600 text-center">{app.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
