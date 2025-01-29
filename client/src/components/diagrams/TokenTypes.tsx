import { motion } from "framer-motion";
import { Key, Briefcase, Palette, Users } from "lucide-react";

export default function TokenTypes() {
  const tokens = [
    {
      icon: Key,
      name: "Utility Tokens",
      description: "Provide access to specific services or products",
      example: "Basic Attention Token (BAT)",
      color: "cyan",
    },
    {
      icon: Briefcase,
      name: "Security Tokens",
      description: "Represent ownership in assets or enterprises",
      example: "Real estate tokens, equity tokens",
      color: "indigo",
    },
    {
      icon: Palette,
      name: "Non-Fungible Tokens",
      description: "Represent unique digital assets",
      example: "CryptoPunks, Bored Apes",
      color: "pink",
    },
    {
      icon: Users,
      name: "Governance Tokens",
      description: "Voting rights in DAOs",
      example: "Uniswap (UNI), Compound (COMP)",
      color: "orange",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const tokenVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8"
    >
      {tokens.map((token) => (
        <motion.div
          key={token.name}
          variants={tokenVariants}
          whileHover={{ scale: 1.05 }}
          className={`bg-${token.color}-50 rounded-lg p-6 border-2 border-${token.color}-200 hover:border-${token.color}-400 transition-colors`}
        >
          <motion.div
            className={`p-3 bg-${token.color}-100 rounded-full w-fit mb-4`}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <token.icon className={`w-6 h-6 text-${token.color}-600`} />
          </motion.div>

          <h3 className="text-xl font-bold mb-2">{token.name}</h3>
          <p className="text-gray-600 mb-2">{token.description}</p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Example:</span> {token.example}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
