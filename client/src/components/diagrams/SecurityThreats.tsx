import { motion } from "framer-motion";
import { Skull, Shield, Lock, AlertTriangle } from "lucide-react";

const threats = [
  {
    icon: Skull,
    name: "Phishing Attacks",
    description: "Deceptive attempts to steal credentials",
    protection: "Always verify URLs and sender addresses"
  },
  {
    icon: AlertTriangle,
    name: "Malware",
    description: "Malicious software targeting wallets",
    protection: "Use trusted security software"
  },
  {
    icon: Lock,
    name: "Weak Passwords",
    description: "Easily guessable credentials",
    protection: "Use strong, unique passwords for each service"
  }
];

export const SecurityThreats = () => {
  return (
    <div className="my-8">
      <motion.h3 
        className="text-xl font-semibold text-red-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Common Security Threats
      </motion.h3>
      
      <div className="space-y-4">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-red-50 rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-full">
                <threat.icon className="w-6 h-6 text-red-600" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-red-800">{threat.name}</h4>
                <p className="text-red-600 text-sm">{threat.description}</p>
                
                <motion.div 
                  className="mt-2 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    Protection: {threat.protection}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
