import { motion } from "framer-motion";
import { useState } from "react";

const ConsensusComparison = () => {
  const [activeTab, setActiveTab] = useState<'pow' | 'pos'>('pow');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4">
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'pow' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('pow')}
        >
          Proof of Work
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'pos' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('pos')}
        >
          Proof of Stake
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {activeTab === 'pow' ? (
          <motion.div className="bg-white rounded-lg p-6 shadow-lg">
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <motion.path
                  d="M20,50 L80,50"
                  stroke="#4F46E5"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </svg>
              <div className="text-lg">
                <motion.p variants={itemVariants}>Mining Process</motion.p>
                <motion.ul variants={itemVariants} className="list-disc pl-6 mt-2">
                  <li>Solve complex puzzles</li>
                  <li>High energy consumption</li>
                  <li>Hardware required</li>
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div className="bg-white rounded-lg p-6 shadow-lg">
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <motion.rect
                  x="30"
                  y="30"
                  width="40"
                  height="40"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="#4F46E5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </svg>
              <div className="text-lg">
                <motion.p variants={itemVariants}>Staking Process</motion.p>
                <motion.ul variants={itemVariants} className="list-disc pl-6 mt-2">
                  <li>Lock up cryptocurrency</li>
                  <li>Energy efficient</li>
                  <li>No hardware needed</li>
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ConsensusComparison;