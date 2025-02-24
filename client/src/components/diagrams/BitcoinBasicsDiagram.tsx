import { motion } from "framer-motion";
import { Database, Key, Shield, Coins, Network, Lock, Cpu, UserCircle, Blocks } from "lucide-react";

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  delay: number;
}

const TimelineEvent = ({ year, title, description, delay }: TimelineEventProps) => (
  <motion.div
    className="relative flex items-center mb-8"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <div className="absolute left-1/2 -ml-2.5 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-lg"></div>
    <div className="w-1/2 pr-8 text-right">
      <span className="text-blue-600 font-bold">{year}</span>
    </div>
    <div className="w-1/2 pl-8">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const BitcoinBasicsDiagram = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const components = [
    {
      icon: Blocks,
      title: "Blockchain",
      description: "Decentralized ledger of all transactions",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Network,
      title: "Network",
      description: "Peer-to-peer transaction verification",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Key,
      title: "Mining",
      description: "Securing the network through PoW",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <div className="py-8">
      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {components.map((component, index) => (
          <motion.div
            key={component.title}
            className={`${component.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-start gap-4">
              <div className={`${component.color} p-3 rounded-full bg-white`}>
                <component.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${component.color} mb-2`}>
                  {component.title}
                </h3>
                <p className="text-gray-600">{component.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Timeline */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Bitcoin Timeline
        </h3>
        <div className="relative">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-200"></div>
          <TimelineEvent
            year="2008"
            title="Bitcoin Whitepaper"
            description="Satoshi Nakamoto publishes the Bitcoin whitepaper"
            delay={0.2}
          />
          <TimelineEvent
            year="2009"
            title="Genesis Block"
            description="The first Bitcoin block is mined"
            delay={0.4}
          />
          <TimelineEvent
            year="2010"
            title="First Transaction"
            description="First real-world Bitcoin transaction: 10,000 BTC for pizza"
            delay={0.6}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BitcoinBasicsDiagram;