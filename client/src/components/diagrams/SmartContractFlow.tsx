import { motion } from "framer-motion";

const SmartContractFlow = () => {
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1,
      transition: { 
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.5 }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4">
      <motion.svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        initial="initial"
        animate="animate"
      >
        {/* Nodes */}
        <motion.circle
          variants={nodeVariants}
          cx="100"
          cy="200"
          r="40"
          fill="#4F46E5"
          className="cursor-pointer hover:filter hover:brightness-110"
        />
        <motion.text
          variants={textVariants}
          x="100"
          y="200"
          textAnchor="middle"
          fill="white"
          fontSize="14"
        >
          Contract
          <tspan x="100" y="220">Creation</tspan>
        </motion.text>

        <motion.circle
          variants={nodeVariants}
          cx="300"
          cy="200"
          r="40"
          fill="#4F46E5"
        />
        <motion.text
          variants={textVariants}
          x="300"
          y="200"
          textAnchor="middle"
          fill="white"
          fontSize="14"
        >
          Deploy to
          <tspan x="300" y="220">Blockchain</tspan>
        </motion.text>

        <motion.circle
          variants={nodeVariants}
          cx="500"
          cy="200"
          r="40"
          fill="#4F46E5"
        />
        <motion.text
          variants={textVariants}
          x="500"
          y="200"
          textAnchor="middle"
          fill="white"
          fontSize="14"
        >
          Automatic
          <tspan x="500" y="220">Execution</tspan>
        </motion.text>

        <motion.circle
          variants={nodeVariants}
          cx="700"
          cy="200"
          r="40"
          fill="#4F46E5"
        />
        <motion.text
          variants={textVariants}
          x="700"
          y="200"
          textAnchor="middle"
          fill="white"
          fontSize="14"
        >
          Result
          <tspan x="700" y="220">Recording</tspan>
        </motion.text>

        {/* Connecting Lines */}
        <motion.path
          variants={pathVariants}
          d="M 140 200 L 260 200"
          stroke="#4F46E5"
          strokeWidth="3"
          fill="none"
        />
        <motion.path
          variants={pathVariants}
          d="M 340 200 L 460 200"
          stroke="#4F46E5"
          strokeWidth="3"
          fill="none"
        />
        <motion.path
          variants={pathVariants}
          d="M 540 200 L 660 200"
          stroke="#4F46E5"
          strokeWidth="3"
          fill="none"
        />
      </motion.svg>
    </div>
  );
};

export default SmartContractFlow;