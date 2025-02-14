import { motion } from "framer-motion";
import { Coins, Code2, Wallet, Send, Receipt, Building2, Puzzle, PuzzleIcon, Component, Box } from "lucide-react";

const ComparisonItem = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex items-center gap-4 p-4 bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="p-3 rounded-full bg-blue-100">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h4 className="font-semibold text-blue-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const BitcoinEthereumComparison = () => {
  const bitcoinFeatures = [
    {
      icon: Wallet,
      title: "Digital Wallet",
      description: "Store and manage your Bitcoin"
    },
    {
      icon: Send,
      title: "Send & Receive",
      description: "Transfer value globally"
    },
    {
      icon: Receipt,
      title: "Transaction History",
      description: "Track all payments"
    }
  ];

  const ethereumFeatures = [
    {
      icon: Code2,
      title: "Smart Contracts",
      description: "Programmable agreements"
    },
    {
      icon: Component,
      title: "dApps",
      description: "Decentralized applications"
    },
    {
      icon: Building2,
      title: "DeFi",
      description: "Financial services"
    },
    {
      icon: PuzzleIcon,
      title: "NFTs & Assets",
      description: "Digital ownership"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      {/* Bitcoin Side */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-3">
            <Coins className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-blue-800">Bitcoin</h3>
          <p className="text-sm text-gray-600">Digital Gold</p>
        </motion.div>
        <div className="space-y-4">
          {bitcoinFeatures.map((feature, index) => (
            <ComparisonItem
              key={feature.title}
              {...feature}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Ethereum Side */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <div className="inline-block p-4 bg-indigo-100 rounded-full mb-3">
            <Box className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-indigo-800">Ethereum</h3>
          <p className="text-sm text-gray-600">World Computer</p>
        </motion.div>
        <div className="space-y-4">
          {ethereumFeatures.map((feature, index) => (
            <ComparisonItem
              key={feature.title}
              {...feature}
              delay={0.3 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BitcoinEthereumComparison;
