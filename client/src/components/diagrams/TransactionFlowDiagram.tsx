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
    <div className="w-full h-64 bg-white rounded-lg shadow-md p-4">
      <svg width="100%" height="100%" viewBox="0 0 800 200">
        {/* Sender Node */}
        <motion.g variants={nodeVariants} custom={0} initial="initial" animate="animate">
          <circle cx="100" cy="100" r="40" fill="#4F46E5" opacity="0.2" />
          <circle cx="100" cy="100" r="35" fill="#4F46E5" />
          <text x="100" y="100" textAnchor="middle" fill="white" dy=".3em">Sender</text>
        </motion.g>

        {/* Network Nodes */}
        <motion.g variants={nodeVariants} custom={1} initial="initial" animate="animate">
          <circle cx="300" cy="60" r="30" fill="#10B981" opacity="0.2" />
          <circle cx="300" cy="60" r="25" fill="#10B981" />
          <text x="300" y="60" textAnchor="middle" fill="white" dy=".3em">Node 1</text>
        </motion.g>

        <motion.g variants={nodeVariants} custom={2} initial="initial" animate="animate">
          <circle cx="400" cy="140" r="30" fill="#10B981" opacity="0.2" />
          <circle cx="400" cy="140" r="25" fill="#10B981" />
          <text x="400" y="140" textAnchor="middle" fill="white" dy=".3em">Node 2</text>
        </motion.g>

        <motion.g variants={nodeVariants} custom={3} initial="initial" animate="animate">
          <circle cx="500" cy="60" r="30" fill="#10B981" opacity="0.2" />
          <circle cx="500" cy="60" r="25" fill="#10B981" />
          <text x="500" y="60" textAnchor="middle" fill="white" dy=".3em">Node 3</text>
        </motion.g>

        {/* Receiver Node */}
        <motion.g variants={nodeVariants} custom={4} initial="initial" animate="animate">
          <circle cx="700" cy="100" r="40" fill="#4F46E5" opacity="0.2" />
          <circle cx="700" cy="100" r="35" fill="#4F46E5" />
          <text x="700" y="100" textAnchor="middle" fill="white" dy=".3em">Receiver</text>
        </motion.g>

        {/* Connection Lines */}
        <motion.path
          d="M 140 100 Q 220 100 270 70"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.path
          d="M 330 60 L 370 100"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.path
          d="M 430 140 L 470 80"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
        <motion.path
          d="M 530 60 Q 580 60 660 90"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </div>
  );
}
