import { motion } from "framer-motion";
import { Coins, Code, EyeOff, DollarSign, Vote } from "lucide-react";

interface CategoryProps {
  icon: any;
  title: string;
  description: string;
  examples: string;
  color: string;
}

export default function AltcoinCategories() {
  const categories: CategoryProps[] = [
    {
      icon: Coins,
      title: "Payment Coins",
      description: "Designed for everyday transactions",
      examples: "Litecoin, Bitcoin Cash, Dogecoin",
      color: "blue",
    },
    {
      icon: Code,
      title: "Platform Coins",
      description: "Support development of decentralized applications",
      examples: "Ethereum, Cardano, Solana",
      color: "purple",
    },
    {
      icon: EyeOff,
      title: "Privacy Coins",
      description: "Enhanced anonymity for transactions",
      examples: "Monero, Zcash, Dash",
      color: "green",
    },
    {
      icon: DollarSign,
      title: "Stablecoins",
      description: "Pegged to maintain stable value",
      examples: "USDT, USDC, DAI",
      color: "yellow",
    },
    {
      icon: Vote,
      title: "Governance Tokens",
      description: "Voting rights in decentralized projects",
      examples: "UNI, COMP, AAVE",
      color: "red",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <motion.div
            className={`p-3 bg-${category.color}-100 rounded-full w-fit mb-4`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <category.icon className={`w-6 h-6 text-${category.color}-600`} />
          </motion.div>

          <h3 className="text-xl font-bold mb-2">{category.title}</h3>
          <p className="text-gray-600 mb-3">{category.description}</p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Examples:</span> {category.examples}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
