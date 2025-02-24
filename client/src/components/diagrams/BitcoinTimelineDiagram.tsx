import { motion } from "framer-motion";
import { Milestone, Coins, ChevronDown, ArrowUpRight } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: any;
  highlight?: boolean;
}

const timeline: TimelineEvent[] = [
  {
    year: "2008",
    title: "Bitcoin Whitepaper",
    description: "Satoshi Nakamoto publishes the Bitcoin whitepaper, introducing the concept of a peer-to-peer electronic cash system",
    highlight: true
  },
  {
    year: "2009",
    title: "Genesis Block",
    description: "The first Bitcoin block is mined, marking the birth of Bitcoin",
    highlight: true
  },
  {
    year: "2010",
    title: "First Real Transaction",
    description: "Two pizzas bought for 10,000 BTC - first real-world Bitcoin transaction",
    highlight: true
  },
  {
    year: "2011",
    title: "Parity with USD",
    description: "Bitcoin reaches parity with US Dollar for the first time"
  },
  {
    year: "2013",
    title: "First Major Bull Run",
    description: "Bitcoin price surpasses $1,000 for the first time"
  },
  {
    year: "2014",
    title: "Mt. Gox Collapse",
    description: "Largest Bitcoin exchange Mt. Gox collapses after massive hack"
  },
  {
    year: "2015",
    title: "Major Companies Accept Bitcoin",
    description: "Microsoft, Dell, and other major companies begin accepting Bitcoin payments"
  },
  {
    year: "2017",
    title: "Mainstream Attention",
    description: "Bitcoin reaches nearly $20,000, gaining worldwide attention",
    highlight: true
  },
  {
    year: "2020",
    title: "Institutional Adoption",
    description: "Major institutions like MicroStrategy and Square begin adding Bitcoin to their treasury"
  },
  {
    year: "2021",
    title: "Historic Peak & El Salvador",
    description: "Bitcoin reaches ATH of $69,000 and becomes legal tender in El Salvador",
    highlight: true
  },
  {
    year: "2022",
    title: "Market Downturn",
    description: "Crypto winter begins, testing Bitcoin's resilience"
  },
  {
    year: "2023",
    title: "Recovery & ETFs",
    description: "Bitcoin shows strong recovery and spot ETFs gain momentum"
  },
  {
    year: "2024",
    title: "Spot ETF Approval",
    description: "SEC approves first Bitcoin spot ETFs in the United States",
    highlight: true
  },
  {
    year: "2025",
    title: "Growing Mainstream Integration",
    description: "Bitcoin continues to integrate into traditional financial systems",
    highlight: true
  }
];

const BitcoinTimelineDiagram = () => {
  return (
    <div className="py-8 relative">
      <motion.div 
        className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-600"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="relative">
        {timeline.map((event, index) => (
          <motion.div
            key={event.year}
            className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
              <motion.div
                className={`p-4 rounded-lg ${
                  event.highlight
                    ? "bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300"
                    : "bg-white/80"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-orange-600 font-bold text-lg">{event.year}</span>
                <h4 className="font-semibold text-gray-900 text-lg mt-1">{event.title}</h4>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </motion.div>
            </div>
            
            <motion.div
              className={`absolute left-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-lg ${
                event.highlight ? "scale-125" : ""
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: event.highlight ? 1.25 : 1 }}
              transition={{ delay: index * 0.2 + 0.1 }}
              style={{ transform: "translateX(-50%)" }}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-orange-500 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default BitcoinTimelineDiagram;
