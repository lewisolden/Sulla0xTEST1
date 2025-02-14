import { motion } from "framer-motion";
import { Send, CheckCircle2, Shield, ArrowRight, Database } from "lucide-react";

export default function TransactionFlowDiagram() {
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 my-8">
      <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
        Transaction Flow Process
      </h3>
      <div className="relative w-full h-[400px]">
        <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
          {/* Connection Lines */}
          <g>
            {/* Sender to Verification */}
            <motion.path
              d="M 160 150 L 320 150"
              stroke="#E2E8F0"
              strokeWidth="3"
              fill="none"
              variants={lineVariants}
              initial="initial"
              animate="animate"
            />
            {/* Verification to Validation */}
            <motion.path
              d="M 400 150 L 560 150"
              stroke="#E2E8F0"
              strokeWidth="3"
              fill="none"
              variants={lineVariants}
              initial="initial"
              animate="animate"
            />
            {/* Validation to Confirmation */}
            <motion.path
              d="M 640 150 L 800 150"
              stroke="#E2E8F0"
              strokeWidth="3"
              fill="none"
              variants={lineVariants}
              initial="initial"
              animate="animate"
            />
          </g>

          {/* Nodes */}
          <g>
            {/* Sender Node */}
            <motion.g
              variants={nodeVariants}
              custom={0}
              initial="initial"
              animate="animate"
              className="cursor-pointer"
            >
              <circle cx="160" cy="150" r="50" fill="#EBF4FF" />
              <circle cx="160" cy="150" r="40" fill="#3B82F6" className="transition-colors duration-200 hover:fill-blue-700" />
              <foreignObject x="130" y="130" width="60" height="40">
                <div className="h-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
              </foreignObject>
              <text x="160" y="220" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                Transaction
                <tspan x="160" dy="20">Initiated</tspan>
              </text>
            </motion.g>

            {/* Verification Node */}
            <motion.g
              variants={nodeVariants}
              custom={1}
              initial="initial"
              animate="animate"
              className="cursor-pointer"
            >
              <circle cx="360" cy="150" r="50" fill="#F0FDF4" />
              <circle cx="360" cy="150" r="40" fill="#22C55E" className="transition-colors duration-200 hover:fill-green-700" />
              <foreignObject x="330" y="130" width="60" height="40">
                <div className="h-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </foreignObject>
              <text x="360" y="220" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                Network
                <tspan x="360" dy="20">Verification</tspan>
              </text>
            </motion.g>

            {/* Validation Node */}
            <motion.g
              variants={nodeVariants}
              custom={2}
              initial="initial"
              animate="animate"
              className="cursor-pointer"
            >
              <circle cx="560" cy="150" r="50" fill="#FDF4FF" />
              <circle cx="560" cy="150" r="40" fill="#A855F7" className="transition-colors duration-200 hover:fill-purple-700" />
              <foreignObject x="530" y="130" width="60" height="40">
                <div className="h-full flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </foreignObject>
              <text x="560" y="220" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                Block
                <tspan x="560" dy="20">Validation</tspan>
              </text>
            </motion.g>

            {/* Confirmation Node */}
            <motion.g
              variants={nodeVariants}
              custom={3}
              initial="initial"
              animate="animate"
              className="cursor-pointer"
            >
              <circle cx="760" cy="150" r="50" fill="#ECFDF5" />
              <circle cx="760" cy="150" r="40" fill="#10B981" className="transition-colors duration-200 hover:fill-emerald-700" />
              <foreignObject x="730" y="130" width="60" height="40">
                <div className="h-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </foreignObject>
              <text x="760" y="220" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                Transaction
                <tspan x="760" dy="20">Confirmed</tspan>
              </text>
            </motion.g>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Verify</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Validate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}