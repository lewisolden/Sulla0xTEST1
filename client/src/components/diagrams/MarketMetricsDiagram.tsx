import { motion } from "framer-motion";
import { TrendingUp, Clock, Globe, ChartBar, DollarSign, Users } from "lucide-react";

export default function MarketMetricsDiagram() {
  const metrics = [
    {
      icon: TrendingUp,
      title: "Volatility",
      description: "High price fluctuations",
      color: "red",
      value: "High",
    },
    {
      icon: Clock,
      title: "Trading Hours",
      description: "24/7 market operation",
      color: "blue",
      value: "24/7",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Global participation",
      color: "green",
      value: "High",
    },
    {
      icon: ChartBar,
      title: "Market Cap",
      description: "Total value locked",
      color: "purple",
      value: "$2T+",
    },
    {
      icon: DollarSign,
      title: "Trading Volume",
      description: "Daily transactions",
      color: "yellow",
      value: "$50B+",
    },
    {
      icon: Users,
      title: "Participants",
      description: "Active traders/investors",
      color: "indigo",
      value: "300M+",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <motion.div
            className={`p-3 bg-${metric.color}-100 rounded-full w-fit mb-4`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
          </motion.div>

          <h3 className="text-xl font-bold mb-2">{metric.title}</h3>
          <p className="text-gray-600 mb-3">{metric.description}</p>
          <p className={`text-lg font-semibold text-${metric.color}-600`}>
            {metric.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
