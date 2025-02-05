import { motion } from "framer-motion";
import { Coins, Scroll, CreditCard, Bitcoin, ArrowRight, Store } from "lucide-react";

export default function MoneyEvolutionTimeline() {
  const timelineItems = [
    { 
      icon: Store, 
      label: "Barter System", 
      year: "~10000 BCE", 
      color: "purple",
      description: "Direct exchange of goods"
    },
    { 
      icon: Coins, 
      label: "Commodity Money", 
      year: "~6000 BCE", 
      color: "amber",
      description: "Shells, salt, metals"
    },
    { 
      icon: Scroll, 
      label: "Paper Money", 
      year: "~700 CE", 
      color: "green",
      description: "First paper currency in China"
    },
    { 
      icon: CreditCard, 
      label: "Digital Banking", 
      year: "~1950", 
      color: "blue",
      description: "Electronic transfers"
    },
    { 
      icon: Bitcoin, 
      label: "Cryptocurrency", 
      year: "2009", 
      color: "orange",
      description: "Decentralized digital currency"
    },
  ];

  return (
    <div className="py-12">
      <div className="relative">
        {/* Timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-orange-500"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Timeline items */}
        <div className="space-y-24">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 50
              }}
            >
              <div className={`w-1/2 px-8 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 + 0.2 }}
                >
                  <span className={`text-${item.color}-600 font-semibold`}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{item.label}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </motion.div>
              </div>

              <motion.div
                className={`absolute left-1/2 -ml-6 h-12 w-12 rounded-full bg-${item.color}-100 border-4 border-${item.color}-500 flex items-center justify-center`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              >
                <item.icon className={`h-6 w-6 text-${item.color}-600`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}