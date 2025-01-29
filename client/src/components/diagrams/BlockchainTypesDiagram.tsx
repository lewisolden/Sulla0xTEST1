import { motion } from "framer-motion";

export const BlockchainTypesDiagram = () => {
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  return (
    <div className="w-full h-[400px] relative bg-blue-50 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Public Blockchain */}
        <div className="relative">
          <h3 className="text-center text-blue-800 font-semibold mb-4">Public</h3>
          <svg width="100%" height="280" viewBox="0 0 200 280">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.circle
                key={i}
                cx={100 + Math.cos(i * Math.PI / 3) * 60}
                cy={140 + Math.sin(i * Math.PI / 3) * 60}
                r="15"
                fill="#3b82f6"
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.2 }}
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.line
                key={`line-${i}`}
                x1={100 + Math.cos(i * Math.PI / 3) * 60}
                y1={140 + Math.sin(i * Math.PI / 3) * 60}
                x2={100 + Math.cos(((i + 1) % 6) * Math.PI / 3) * 60}
                y2={140 + Math.sin(((i + 1) % 6) * Math.PI / 3) * 60}
                stroke="#60a5fa"
                strokeWidth="2"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2, duration: 1 }}
              />
            ))}
          </svg>
        </div>

        {/* Private Blockchain */}
        <div className="relative">
          <h3 className="text-center text-blue-800 font-semibold mb-4">Private</h3>
          <svg width="100%" height="280" viewBox="0 0 200 280">
            <motion.circle
              cx="100"
              cy="140"
              r="25"
              fill="#3b82f6"
              variants={nodeVariants}
              initial="hidden"
              animate="visible"
            />
            {[0, 1, 2, 3].map((i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={100 + Math.cos(i * Math.PI / 2) * 60}
                  cy={140 + Math.sin(i * Math.PI / 2) * 60}
                  r="15"
                  fill="#60a5fa"
                  variants={nodeVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.2 + 0.5 }}
                />
                <motion.line
                  x1="100"
                  y1="140"
                  x2={100 + Math.cos(i * Math.PI / 2) * 60}
                  y2={140 + Math.sin(i * Math.PI / 2) * 60}
                  stroke="#60a5fa"
                  strokeWidth="2"
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 1.2, duration: 1 }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Consortium Blockchain */}
        <div className="relative">
          <h3 className="text-center text-blue-800 font-semibold mb-4">Consortium</h3>
          <svg width="100%" height="280" viewBox="0 0 200 280">
            {[0, 1, 2].map((i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={100 + Math.cos(i * (2 * Math.PI / 3)) * 60}
                  cy={140 + Math.sin(i * (2 * Math.PI / 3)) * 60}
                  r="20"
                  fill="#3b82f6"
                  variants={nodeVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.3 }}
                />
                {[0, 1].map((j) => (
                  <motion.circle
                    key={`sub-${i}-${j}`}
                    cx={100 + Math.cos(i * (2 * Math.PI / 3)) * 60 + Math.cos(j * Math.PI + i * (2 * Math.PI / 3)) * 30}
                    cy={140 + Math.sin(i * (2 * Math.PI / 3)) * 60 + Math.sin(j * Math.PI + i * (2 * Math.PI / 3)) * 30}
                    r="10"
                    fill="#60a5fa"
                    variants={nodeVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.3 + 0.6 }}
                  />
                ))}
              </motion.g>
            ))}
            {[0, 1, 2].map((i) => (
              <motion.line
                key={`main-line-${i}`}
                x1={100 + Math.cos(i * (2 * Math.PI / 3)) * 60}
                y1={140 + Math.sin(i * (2 * Math.PI / 3)) * 60}
                x2={100 + Math.cos(((i + 1) % 3) * (2 * Math.PI / 3)) * 60}
                y2={140 + Math.sin(((i + 1) % 3) * (2 * Math.PI / 3)) * 60}
                stroke="#3b82f6"
                strokeWidth="2"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2, duration: 1 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
