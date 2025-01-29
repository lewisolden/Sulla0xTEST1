import { motion } from "framer-motion";

export default function BlockStructureDiagram() {
  const blockParts = [
    { label: "Previous Hash", color: "bg-purple-100 border-purple-300" },
    { label: "Timestamp", color: "bg-green-100 border-green-300" },
    { label: "Nonce", color: "bg-yellow-100 border-yellow-300" },
    { label: "Merkle Root", color: "bg-red-100 border-red-300" },
    { label: "Transactions", color: "bg-blue-100 border-blue-300" }
  ];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm my-6">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative border-2 border-gray-300 rounded-lg p-4">
          <div className="text-center font-semibold text-gray-700 mb-4">Block Structure</div>
          <div className="space-y-3">
            {blockParts.map((part, index) => (
              <motion.div
                key={part.label}
                className={`p-3 rounded-lg border-2 ${part.color}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-sm font-medium text-gray-700">{part.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="text-center mt-4 text-sm text-gray-600">
        A block contains several key components that ensure security and immutability
      </div>
    </div>
  );
}
