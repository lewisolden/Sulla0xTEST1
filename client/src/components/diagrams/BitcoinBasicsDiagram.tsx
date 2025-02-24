import { motion } from "framer-motion";
import { Database, Key, Shield, Coins, Network, Lock, Cpu, UserCircle, Blocks } from "lucide-react";

const BitcoinBasicsDiagram = () => {
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

  const components = [
    {
      icon: Blocks,
      title: "Blockchain",
      description: "Decentralized ledger of all transactions",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Network,
      title: "Network",
      description: "Peer-to-peer transaction verification",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Key,
      title: "Mining",
      description: "Securing the network through PoW",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Cryptographic protection of assets",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="py-8">
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {components.map((component, index) => (
          <motion.div
            key={component.title}
            className={`${component.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-start gap-4">
              <div className={`${component.color} p-3 rounded-full bg-white`}>
                <component.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${component.color} mb-2`}>
                  {component.title}
                </h3>
                <p className="text-gray-600">{component.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BitcoinBasicsDiagram;