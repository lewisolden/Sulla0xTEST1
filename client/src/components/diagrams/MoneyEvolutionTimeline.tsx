import { motion } from "framer-motion";
import { Coins, Wallet, CreditCard, Bitcoin } from "lucide-react";

export default function MoneyEvolutionTimeline() {
  const timelineItems = [
    { icon: Coins, label: "Commodity Money", year: "~6000 BCE", color: "amber" },
    { icon: Wallet, label: "Metal Coins", year: "~1000 BCE", color: "yellow" },
    { icon: CreditCard, label: "Paper Money", year: "~700 CE", color: "green" },
    { icon: Bitcoin, label: "Digital Currency", year: "2009", color: "blue" },
  ];

  return (
    <div className="py-12">
      <div className="relative">
        {/* Timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-1 bg-gray-200"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Timeline items */}
        <div className="space-y-16">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="w-1/2 px-8">
                <div className={`text-${item.color}-600 font-semibold`}>
                  {item.year}
                </div>
                <h3 className="text-lg font-bold">{item.label}</h3>
              </div>
              <div
                className={`absolute left-1/2 -ml-3 h-6 w-6 rounded-full bg-${item.color}-500`}
              >
                <item.icon className="h-4 w-4 text-white m-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
