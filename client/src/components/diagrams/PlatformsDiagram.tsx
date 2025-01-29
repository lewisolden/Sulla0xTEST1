import { motion } from "framer-motion";

export const PlatformsDiagram = () => {
  const platforms = [
    { name: "Ethereum", color: "#627EEA", features: ["Smart Contracts", "DeFi", "NFTs"] },
    { name: "Solana", color: "#00FFA3", features: ["High Speed", "Low Fees", "DApps"] },
    { name: "Cardano", color: "#0033AD", features: ["PoS", "Research", "Scalability"] },
  ];

  return (
    <div className="w-full h-[400px] relative bg-blue-50 rounded-lg p-4 mb-6">
      <div className="flex justify-around h-full">
        {platforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: platform.color }}
              whileHover={{ scale: 1.1 }}
            >
              {platform.name}
            </motion.div>
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.3 + 0.5 }}
            >
              {platform.features.map((feature, j) => (
                <motion.div
                  key={feature}
                  className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.3 + j * 0.2 + 0.5 }}
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
