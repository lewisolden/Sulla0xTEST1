import { motion } from "framer-motion";
import { Database, Code2, Link, Workflow, Settings, Bell } from "lucide-react";

const StructureComponent = ({
  icon: Icon,
  title,
  items,
  delay,
  color = "blue"
}: {
  icon: any;
  title: string;
  items: string[];
  delay: number;
  color?: "blue" | "indigo" | "purple";
}) => {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "text-blue-600"
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-800",
      icon: "text-indigo-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      icon: "text-purple-600"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`${colors[color].bg} border ${colors[color].border} rounded-lg p-4`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${colors[color].icon}`} />
        <h4 className={`font-semibold ${colors[color].text}`}>{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + (index * 0.1) }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${colors[color].border}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const SmartContractStructure = () => {
  const components = [
    {
      icon: Database,
      title: "Storage Layer",
      items: [
        "State Variables",
        "Mappings",
        "Arrays & Structs",
        "Contract Balance"
      ],
      color: "blue" as const
    },
    {
      icon: Code2,
      title: "Logic Layer",
      items: [
        "Functions",
        "Modifiers",
        "Control Flow",
        "Error Handling"
      ],
      color: "indigo" as const
    },
    {
      icon: Link,
      title: "Interface Layer",
      items: [
        "External Functions",
        "Events",
        "Access Control",
        "Function Visibility"
      ],
      color: "purple" as const
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2">
          Smart Contract Architecture
        </h3>
        <p className="text-gray-600">The building blocks of a smart contract</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {components.map((component, index) => (
          <StructureComponent
            key={component.title}
            {...component}
            delay={index * 0.2}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 bg-white/80 rounded-lg text-sm text-gray-600"
      >
        <p className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-blue-500" />
          Each layer works together to create secure, automated blockchain applications
        </p>
      </motion.div>
    </div>
  );
};

export default SmartContractStructure;
