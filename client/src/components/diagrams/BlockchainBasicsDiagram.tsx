import { motion } from "framer-motion";

export default function BlockchainBasicsDiagram() {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm my-6">
      <motion.div 
        className="w-full flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[1, 2, 3, 4].map((block, index) => (
          <motion.div
            key={block}
            className="relative flex flex-col items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="w-32 h-32 bg-blue-100 rounded-lg border-2 border-blue-300 p-3 flex flex-col justify-center items-center">
              <div className="text-xs text-blue-600 mb-2">Block {block}</div>
              <div className="text-xs text-gray-600 mb-1">Hash:</div>
              <div className="text-xs text-gray-800 font-mono">#{(block * 1000).toString(16)}</div>
            </div>
            {index < 3 && (
              <motion.div 
                className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-4 text-sm text-gray-600">
        Each block contains data and is linked to the previous block through its hash
      </div>
    </div>
  );
}
