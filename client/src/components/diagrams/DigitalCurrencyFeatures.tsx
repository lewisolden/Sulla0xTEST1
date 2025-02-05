import { motion } from "framer-motion";
import { Globe, Lock, Zap, Users } from "lucide-react";

export default function DigitalCurrencyFeatures() {
  const features = [
    { icon: Globe, label: "Global Access", color: "blue" },
    { icon: Lock, label: "Security", color: "green" },
    { icon: Zap, label: "Fast Transactions", color: "yellow" },
    { icon: Users, label: "Decentralized", color: "purple" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
      {features.map((Feature, index) => (
        <motion.div
          key={Feature.label}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`p-6 bg-${Feature.color}-100 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
          >
            <Feature.icon className={`w-8 h-8 text-${Feature.color}-600`} />
          </motion.div>
          <p className="mt-3 text-base font-medium text-gray-700 text-center max-w-[120px]">
            {Feature.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}