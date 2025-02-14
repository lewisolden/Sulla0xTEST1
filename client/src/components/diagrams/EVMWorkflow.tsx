import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, ArrowRight, Database, CheckCircle, Laptop } from "lucide-react";

const Step = ({ 
  icon: Icon, 
  title, 
  description, 
  isActive, 
  delay 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  isActive: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className={`relative flex items-center gap-4 p-6 rounded-lg transition-all duration-300 ${
      isActive ? 'bg-blue-50 shadow-md' : 'bg-white/50'
    }`}
  >
    <div className={`p-3 rounded-full ${
      isActive ? 'bg-blue-100' : 'bg-gray-100'
    }`}>
      <Icon className={`w-6 h-6 ${
        isActive ? 'text-blue-600' : 'text-gray-400'
      }`} />
    </div>
    <div>
      <h4 className={`font-semibold ${
        isActive ? 'text-blue-800' : 'text-gray-700'
      }`}>{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    {!isActive && (
      <motion.div
        className="absolute inset-0 bg-gray-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    )}
  </motion.div>
);

const EVMWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      icon: User,
      title: "1. User Action",
      description: "You initiate a transaction (e.g., sending tokens)"
    },
    {
      icon: Laptop,
      title: "2. Smart Contract",
      description: "The contract code processes your request"
    },
    {
      icon: Database,
      title: "3. State Update",
      description: "The blockchain state is updated"
    },
    {
      icon: CheckCircle,
      title: "4. Confirmation",
      description: "Changes are verified and confirmed"
    }
  ];

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2">
          Ethereum Virtual Machine (EVM)
        </h3>
        <p className="text-gray-600">Watch how your transactions are processed</p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200">
          <motion.div
            className="absolute top-0 w-full bg-blue-500"
            initial={{ height: "0%" }}
            animate={{ height: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              {...step}
              isActive={index <= currentStep}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EVMWorkflow;