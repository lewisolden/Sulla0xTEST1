import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building, Wallet, CreditCard, Coins } from "lucide-react";

export default function DigitalMoneyDiagram() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const categories = [
    {
      title: "Traditional Money",
      icon: Building,
      items: ["Physical Cash", "Bank Notes", "Coins"],
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Digital Money",
      icon: CreditCard,
      items: ["Bank Transfers", "Credit Cards", "Mobile Payments"],
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Cryptocurrency",
      icon: Wallet,
      items: ["Bitcoin", "Digital Wallets", "Smart Contracts"],
      color: "bg-green-100",
      iconColor: "text-green-600"
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full py-8"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`${category.color} rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform`}
            >
              <div className="flex items-center gap-3 mb-4">
                <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.2 + i * 0.1 }
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}