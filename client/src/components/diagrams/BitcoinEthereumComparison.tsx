import { motion } from "framer-motion";
import { Coins, Code2, Wallet, Send, Receipt, Building2, Puzzle, PuzzleIcon, Component, Box } from "lucide-react";

const BitcoinLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="mb-2"
  >
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path
      d="M16.662 10.661c.235-1.57-0.962-2.412-2.596-2.974l.53-2.126-1.295-.323-.517 2.072c-.34-.085-.69-.165-1.039-.244l.52-2.083-1.294-.323-.53 2.126c-.282-.064-.559-.128-.827-.194l.001-.006-1.785-.446-.344 1.382s.962.22.942.234c.525.131.62.48.604.756l-.606 2.432c.036.009.083.022.135.043l-.137-.034-.85 3.41c-.064.16-.228.4-.595.308.013.019-.942-.235-.942-.235l-.644 1.487 1.684.42c.313.079.62.161.922.238l-.536 2.15 1.293.323.53-2.127c.354.096.698.184 1.034.268l-.528 2.117 1.294.323.536-2.148c2.211.419 3.873.25 4.572-1.75.564-1.61-.028-2.538-1.191-3.144.847-.195 1.485-.752 1.655-1.903zm-2.961 4.153c-.4 1.61-3.11.74-3.99.522l.712-2.854c.879.22 3.697.654 3.278 2.332zm.401-4.176c-.366 1.465-2.621.72-3.353.538l.645-2.587c.731.182 3.089.522 2.708 2.049z"
      fill="white"
    />
  </svg>
);

const EthereumLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="mb-2"
  >
    <path
      d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
      fill="#343434"
    />
  </svg>
);

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
          <div className="flex flex-col items-center">
            <BitcoinLogo />
            <h3 className="text-xl font-bold text-blue-800">Bitcoin</h3>
            <p className="text-sm text-gray-600">Digital Gold</p>
          </div>
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
          <div className="flex flex-col items-center">
            <EthereumLogo />
            <h3 className="text-xl font-bold text-indigo-800">Ethereum</h3>
            <p className="text-sm text-gray-600">World Computer</p>
          </div>
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