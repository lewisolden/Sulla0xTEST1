import { motion } from "framer-motion";

export default function TransactionFlowDiagram() {
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const arrowVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-md p-8">
      <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
        {/* Sender Node */}
        <motion.g variants={nodeVariants} custom={0} initial="initial" animate="animate">
          <circle cx="150" cy="150" r="60" fill="#4F46E5" opacity="0.2" />
          <circle cx="150" cy="150" r="50" fill="#4F46E5" />
          <text x="150" y="150" textAnchor="middle" fill="white" dy=".3em" className="text-lg font-medium">
            <tspan x="150" dy="-0.6em">Transaction</tspan>
            <tspan x="150" dy="1.4em">Sender</tspan>
          </text>
        </motion.g>

        {/* Network Nodes */}
        <motion.g variants={nodeVariants} custom={1} initial="initial" animate="animate">
          <circle cx="400" cy="80" r="45" fill="#10B981" opacity="0.2" />
          <circle cx="400" cy="80" r="40" fill="#10B981" />
          <text x="400" y="80" textAnchor="middle" fill="white" dy=".3em" className="text-base">
            <tspan x="400" dy="-0.6em">Verification</tspan>
            <tspan x="400" dy="1.4em">Node</tspan>
          </text>
        </motion.g>

        <motion.g variants={nodeVariants} custom={2} initial="initial" animate="animate">
          <circle cx="500" cy="220" r="45" fill="#10B981" opacity="0.2" />
          <circle cx="500" cy="220" r="40" fill="#10B981" />
          <text x="500" y="220" textAnchor="middle" fill="white" dy=".3em" className="text-base">
            <tspan x="500" dy="-0.6em">Consensus</tspan>
            <tspan x="500" dy="1.4em">Node</tspan>
          </text>
        </motion.g>

        <motion.g variants={nodeVariants} custom={3} initial="initial" animate="animate">
          <circle cx="600" cy="80" r="45" fill="#10B981" opacity="0.2" />
          <circle cx="600" cy="80" r="40" fill="#10B981" />
          <text x="600" y="80" textAnchor="middle" fill="white" dy=".3em" className="text-base">
            <tspan x="600" dy="-0.6em">Validation</tspan>
            <tspan x="600" dy="1.4em">Node</tspan>
          </text>
        </motion.g>

        {/* Receiver Node */}
        <motion.g variants={nodeVariants} custom={4} initial="initial" animate="animate">
          <circle cx="850" cy="150" r="60" fill="#4F46E5" opacity="0.2" />
          <circle cx="850" cy="150" r="50" fill="#4F46E5" />
          <text x="850" y="150" textAnchor="middle" fill="white" dy=".3em" className="text-lg font-medium">
            <tspan x="850" dy="-0.6em">Transaction</tspan>
            <tspan x="850" dy="1.4em">Receiver</tspan>
          </text>
        </motion.g>

        {/* Connection Lines with Labels */}
        <motion.path
          d="M 210 150 Q 305 150 360 100"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.text x="290" y="130" textAnchor="middle" fill="#666" fontSize="12">
          <tspan>Transaction</tspan>
          <tspan x="290" dy="1.2em">Broadcast</tspan>
        </motion.text>

        <motion.path
          d="M 440 80 L 460 150"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.text x="470" y="120" textAnchor="middle" fill="#666" fontSize="12">Verify</motion.text>

        <motion.path
          d="M 540 220 L 560 120"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.text x="570" y="170" textAnchor="middle" fill="#666" fontSize="12">Confirm</motion.text>

        <motion.path
          d="M 640 80 Q 745 80 790 120"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.text x="720" y="60" textAnchor="middle" fill="#666" fontSize="12">
          <tspan>Transaction</tspan>
          <tspan x="720" dy="1.2em">Complete</tspan>
        </motion.text>
      </svg>
    </div>
  );
}