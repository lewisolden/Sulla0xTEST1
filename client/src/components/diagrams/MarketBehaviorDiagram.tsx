import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, LineChart } from "lucide-react";

export default function MarketBehaviorDiagram() {
  const cycles = [
    {
      phase: "Bull Market",
      icon: TrendingUp,
      description: "Period of rising prices and high optimism",
      characteristics: [
        "Increasing prices",
        "High trading volume",
        "Growing adoption"
      ],
      color: "green"
    },
    {
      phase: "Bear Market",
      icon: TrendingDown,
      description: "Period of declining prices and pessimism",
      characteristics: [
        "Decreasing prices",
        "Lower trading volume",
        "Market consolidation"
      ],
      color: "red"
    },
    {
      phase: "Accumulation",
      icon: Activity,
      description: "Period of sideways movement and base building",
      characteristics: [
        "Price stabilization",
        "Reducing volatility",
        "Smart money entering"
      ],
      color: "blue"
    },
    {
      phase: "Distribution",
      icon: LineChart,
      description: "Period of topping pattern and profit taking",
      characteristics: [
        "High volatility",
        "Mixed sentiment",
        "Smart money exiting"
      ],
      color: "yellow"
    }
  ];

  return (
    <div className="space-y-6 py-8">
      {cycles.map((cycle, index) => (
        <motion.div
          key={cycle.phase}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.3 }}
          className={`bg-${cycle.color}-50 rounded-lg p-6 border-2 border-${cycle.color}-200 hover:border-${cycle.color}-400 transition-colors`}
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className={`p-3 bg-${cycle.color}-100 rounded-full`}
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <cycle.icon className={`w-6 h-6 text-${cycle.color}-600`} />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{cycle.phase}</h3>
              <p className="text-gray-600 mb-4">{cycle.description}</p>
              
              <ul className="space-y-2">
                {cycle.characteristics.map((char, charIndex) => (
                  <motion.li
                    key={charIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: charIndex * 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <span className={`w-2 h-2 rounded-full bg-${cycle.color}-400`} />
                    <span className="text-gray-700">{char}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
