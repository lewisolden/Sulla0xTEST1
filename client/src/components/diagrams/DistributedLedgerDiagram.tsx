import { motion } from "framer-motion";

export default function DistributedLedgerDiagram() {
  const nodes = [
    { id: 1, x: "10%", y: "20%" },
    { id: 2, x: "40%", y: "10%" },
    { id: 3, x: "70%", y: "20%" },
    { id: 4, x: "20%", y: "60%" },
    { id: 5, x: "50%", y: "70%" },
    { id: 6, x: "80%", y: "60%" }
  ];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm my-6">
      <motion.div 
        className="relative h-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute w-16 h-16"
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: node.id * 0.1 }}
          >
            <div className="w-full h-full bg-blue-100 rounded-full border-2 border-blue-300 flex items-center justify-center">
              <div className="text-sm text-blue-600">Node {node.id}</div>
            </div>
            {/* Connection lines */}
            {nodes.map((target) => {
              if (target.id > node.id) {
                return (
                  <motion.svg
                    key={`${node.id}-${target.id}`}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: Math.max(node.id, target.id) * 0.1 }}
                  >
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${parseInt(target.x) - parseInt(node.x)}%`}
                      y2={`${parseInt(target.y) - parseInt(node.y)}%`}
                      stroke="#93C5FD"
                      strokeWidth="2"
                    />
                  </motion.svg>
                );
              }
              return null;
            })}
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-4 text-sm text-gray-600">
        A distributed network where each node maintains a copy of the ledger
      </div>
    </div>
  );
}
