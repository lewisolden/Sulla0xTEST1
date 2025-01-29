import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Block {
  id: number;
  hash: string;
  prevHash: string;
  data: string;
}

export default function BlockchainDiagram() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blocks: Block[] = [
    { id: 1, hash: "0x123...", prevHash: "0x000...", data: "Genesis Block" },
    { id: 2, hash: "0x456...", prevHash: "0x123...", data: "Transaction Data" },
    { id: 3, hash: "0x789...", prevHash: "0x456...", data: "More Transactions" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const blockVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const arrowVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full overflow-x-auto py-12 px-4"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="flex items-center justify-start space-x-8 min-w-max">
        {blocks.map((block, index) => (
          <div key={block.id} className="flex items-center">
            <motion.div
              variants={blockVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6 w-72 border-2 border-blue-100 hover:border-blue-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Block {block.id}</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Hash:</span>
                  <p className="text-blue-600 font-mono">{block.hash}</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Previous Hash:</span>
                  <p className="text-blue-600 font-mono">{block.prevHash}</p>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Data:</span>
                  <p className="text-gray-600">{block.data}</p>
                </div>
              </div>
            </motion.div>

            {index < blocks.length - 1 && (
              <motion.div
                variants={arrowVariants}
                className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 w-16 mx-4 rounded-full"
                style={{ transformOrigin: "left" }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}