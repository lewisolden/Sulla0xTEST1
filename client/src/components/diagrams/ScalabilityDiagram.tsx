import { motion } from "framer-motion";

export const ScalabilityDiagram = () => {
  return (
    <div className="w-full h-[300px] relative bg-blue-50 rounded-lg p-4 mb-6">
      <svg width="100%" height="100%" viewBox="0 0 800 300">
        {/* Main Chain */}
        <motion.g
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <rect x="100" y="120" width="600" height="60" rx="8" fill="#3b82f6" />
          <text x="400" y="155" textAnchor="middle" fill="white" fontSize="20">
            Main Blockchain
          </text>
        </motion.g>

        {/* Layer 2 Solutions */}
        <motion.g
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={200 + i * 200}
                y="220"
                width="120"
                height="40"
                rx="6"
                fill="#60a5fa"
              />
              <text
                x={260 + i * 200}
                y="245"
                textAnchor="middle"
                fill="white"
                fontSize="14"
              >
                Layer 2
              </text>
              <motion.path
                d={`M${260 + i * 200},220 L${260 + i * 200},180`}
                stroke="#60a5fa"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </g>
          ))}
        </motion.g>

        {/* Interoperability Bridges */}
        <motion.g
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[0, 1].map((i) => (
            <g key={i}>
              <rect
                x={200 + i * 200}
                y="40"
                width="120"
                height="40"
                rx="6"
                fill="#93c5fd"
              />
              <text
                x={260 + i * 200}
                y="65"
                textAnchor="middle"
                fill="white"
                fontSize="14"
              >
                Bridge
              </text>
              <motion.path
                d={`M${260 + i * 200},80 L${260 + i * 200},120`}
                stroke="#93c5fd"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
};
