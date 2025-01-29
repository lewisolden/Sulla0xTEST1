import { motion } from "framer-motion";
import { Coins, Scale, Building, Globe } from "lucide-react";

export default function MoneyTypeCards() {
  const cards = [
    {
      icon: Coins,
      title: "Commodity Money",
      description: "Physical items with inherent value used for trade",
      examples: "Salt, shells, cattle",
      color: "amber",
    },
    {
      icon: Scale,
      title: "Metallic Money",
      description: "Standardized metal coins with guaranteed value",
      examples: "Gold, silver, bronze coins",
      color: "yellow",
    },
    {
      icon: Building,
      title: "Paper Money",
      description: "Lightweight currency backed by government promise",
      examples: "Banknotes, promissory notes",
      color: "green",
    },
    {
      icon: Globe,
      title: "Digital Money",
      description: "Electronic form of currency for global transactions",
      examples: "Credit cards, cryptocurrencies",
      color: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className={`text-${card.color}-600 mb-4`}>
            <card.icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-2">{card.description}</p>
          <p className="text-sm text-gray-500">Examples: {card.examples}</p>
        </motion.div>
      ))}
    </div>
  );
}
