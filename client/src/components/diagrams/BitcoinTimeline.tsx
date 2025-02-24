import { motion } from "framer-motion";
import { History, TrendingUp, AlertCircle, Building, Globe, Award, Cpu } from "lucide-react";

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isRight?: boolean;
}

const TimelineEvent = ({ year, title, description, icon, isRight }: TimelineEventProps) => (
  <motion.div
    initial={{ opacity: 0, x: isRight ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`flex ${isRight ? 'flex-row-reverse' : ''} items-center gap-4 mb-8`}
  >
    <div className={`w-1/2 ${isRight ? 'text-left pl-4' : 'text-right pr-4'}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg border border-orange-100">
        <span className="text-orange-600 font-bold block mb-2">{year}</span>
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="w-1/2" />
  </motion.div>
);

const BitcoinTimeline = () => {
  const timelineEvents = [
    {
      year: "2008",
      title: "Bitcoin Whitepaper",
      description: "Satoshi Nakamoto publishes the Bitcoin whitepaper, introducing the concept of a peer-to-peer electronic cash system.",
      icon: <History className="w-4 h-4 text-white" />
    },
    {
      year: "2009",
      title: "Genesis Block",
      description: "The first Bitcoin block is mined, marking the birth of the Bitcoin network.",
      icon: <Cpu className="w-4 h-4 text-white" />
    },
    {
      year: "2010",
      title: "First Real Transaction",
      description: "First real-world Bitcoin transaction: 10,000 BTC for two pizzas, setting a reference point for Bitcoin's value.",
      icon: <TrendingUp className="w-4 h-4 text-white" />
    },
    {
      year: "2013",
      title: "First Major Bull Run",
      description: "Bitcoin price surpasses $1,000 for the first time, gaining mainstream attention.",
      icon: <TrendingUp className="w-4 h-4 text-white" />
    },
    {
      year: "2014",
      title: "Mt. Gox Collapse",
      description: "The largest Bitcoin exchange at the time collapses, leading to improved security practices in the industry.",
      icon: <AlertCircle className="w-4 h-4 text-white" />
    },
    {
      year: "2017",
      title: "Massive Bull Run",
      description: "Bitcoin reaches nearly $20,000, triggering worldwide crypto awareness and investment surge.",
      icon: <TrendingUp className="w-4 h-4 text-white" />
    },
    {
      year: "2021",
      title: "Institutional Adoption",
      description: "Major companies add Bitcoin to their balance sheets. El Salvador adopts Bitcoin as legal tender.",
      icon: <Building className="w-4 h-4 text-white" />
    },
    {
      year: "2022",
      title: "Market Correction",
      description: "Crypto winter begins, testing the resilience of Bitcoin and the broader crypto market.",
      icon: <TrendingUp className="w-4 h-4 text-white" />
    },
    {
      year: "2024",
      title: "ETF Approval",
      description: "SEC approves spot Bitcoin ETFs, marking a significant milestone in Bitcoin's institutional acceptance.",
      icon: <Award className="w-4 h-4 text-white" />
    },
    {
      year: "2025",
      title: "Global Integration",
      description: "Bitcoin continues to integrate into the global financial system with increased adoption and regulatory clarity.",
      icon: <Globe className="w-4 h-4 text-white" />
    }
  ];

  return (
    <div className="relative py-8">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform -translate-x-1/2" />

      {/* Timeline events */}
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineEvent
            key={event.year}
            {...event}
            isRight={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default BitcoinTimeline;