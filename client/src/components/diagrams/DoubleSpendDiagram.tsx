import { motion } from "framer-motion";
import { User, Network, Database, ArrowRight } from "lucide-react";

export default function DoubleSpendDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const steps = [
    {
      title: "Transaction Submission",
      description: "User submits transaction to network",
      icon: User
    },
    {
      title: "Network Verification",
      description: "Network checks for double spend attempts",
      icon: Network
    },
    {
      title: "Blockchain Addition",
      description: "Transaction added to blockchain after verification",
      icon: Database
    }
  ];

  return (
    <div className="my-8 bg-white p-6 rounded-lg shadow-lg">
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-xl font-semibold text-blue-800 text-center mb-6">
          Double Spend Prevention Flow
        </h3>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-3 bg-blue-500 rounded-full text-white">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-blue-800">{step.title}</h4>
                    <p className="text-sm text-gray-600 max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  variants={itemVariants}
                  className="hidden md:block"
                >
                  <ArrowRight className="w-6 h-6 text-blue-400" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}