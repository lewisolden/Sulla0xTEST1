import { motion } from "framer-motion";
import { Shield, Wallet, BookOpen, ArrowRight } from "lucide-react";

export const GettingStartedDiagram = () => {
  const steps = [
    { icon: BookOpen, label: "Learn Basics" },
    { icon: Shield, label: "Setup Security" },
    { icon: Wallet, label: "Create Wallet" }
  ];

  return (
    <div className="py-8">
      <div className="flex justify-center items-center gap-4">
        {steps.map((Step, index) => (
          <>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{Step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                <ArrowRight className="w-6 h-6 text-blue-400" />
              </motion.div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default GettingStartedDiagram;
