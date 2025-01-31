import { motion } from "framer-motion";
import { Shield, Lock, Key, AlertTriangle, Wallet, Smartphone } from "lucide-react";

const securityLayers = [
  {
    icon: Key,
    title: "Private Keys",
    description: "The foundation of crypto security",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Lock,
    title: "2FA",
    description: "Additional layer of protection",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Wallet,
    title: "Wallet Security",
    description: "Secure storage solutions",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: AlertTriangle,
    title: "Threat Protection",
    description: "Guard against attacks",
    color: "text-red-600",
    bgColor: "bg-red-100"
  }
];

export const SecurityDiagram = () => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityLayers.map((layer, index) => (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`${layer.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-start gap-4"
            >
              <div className={`${layer.color} p-3 rounded-full bg-white`}>
                <layer.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${layer.color}`}>
                  {layer.title}
                </h3>
                <p className="text-gray-600">{layer.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Security Flow Diagram */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Security Flow
        </h3>
        <div className="flex justify-between items-center">
          <SecurityFlowStep 
            icon={Key} 
            title="Authentication"
            delay={0.2}
          />
          <Arrow />
          <SecurityFlowStep 
            icon={Lock} 
            title="Verification"
            delay={0.4}
          />
          <Arrow />
          <SecurityFlowStep 
            icon={Shield} 
            title="Protection"
            delay={0.6}
          />
        </div>
      </motion.div>
    </div>
  );
};

const SecurityFlowStep = ({ 
  icon: Icon, 
  title, 
  delay 
}: { 
  icon: any; 
  title: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center"
  >
    <div className="bg-white p-3 rounded-full shadow-md">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <span className="mt-2 text-sm font-medium text-blue-800">{title}</span>
  </motion.div>
);

const Arrow = () => (
  <motion.div
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "auto" }}
    transition={{ delay: 0.8 }}
    className="flex-1 mx-4 border-t-2 border-blue-200"
  />
);
