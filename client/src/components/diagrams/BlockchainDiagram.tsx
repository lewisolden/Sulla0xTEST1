import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Hash, Link, Database, Shield } from "lucide-react";

interface Block {
  id: number;
  hash: string;
  prevHash: string;
  data: string;
  nonce: number;
}

export default function BlockchainDiagram() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blocks: Block[] = [
    { id: 1, hash: "0x123...", prevHash: "0x000...", data: "Genesis Block", nonce: 2083236893 },
    { id: 2, hash: "0x456...", prevHash: "0x123...", data: "Transaction Data", nonce: 1234567890 },
    { id: 3, hash: "0x789...", prevHash: "0x456...", data: "More Transactions", nonce: 987654321 },
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
      scale: 0.8,
      rotateY: -180
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const arrowVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.3 }
    }
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
              className="bg-white rounded-lg shadow-lg p-6 w-72 border-2 border-blue-100 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800">Block {block.id}</h3>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="p-2 bg-blue-100 rounded-full"
                >
                  <Database className="w-5 h-5 text-blue-600" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-1.5 bg-green-100 rounded-full"
                  >
                    <Hash className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <div className="text-sm flex-1">
                    <span className="font-medium text-gray-700">Hash:</span>
                    <p className="text-blue-600 font-mono">{block.hash}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-1.5 bg-purple-100 rounded-full"
                  >
                    <Link className="w-4 h-4 text-purple-600" />
                  </motion.div>
                  <div className="text-sm flex-1">
                    <span className="font-medium text-gray-700">Previous:</span>
                    <p className="text-blue-600 font-mono">{block.prevHash}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-1.5 bg-yellow-100 rounded-full"
                  >
                    <Shield className="w-4 h-4 text-yellow-600" />
                  </motion.div>
                  <div className="text-sm flex-1">
                    <span className="font-medium text-gray-700">Nonce:</span>
                    <p className="text-gray-600 font-mono">{block.nonce}</p>
                  </div>
                </div>

                <div className="text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium text-gray-700">Data:</span>
                  <p className="text-gray-600">{block.data}</p>
                </div>
              </div>
            </motion.div>

            {index < blocks.length - 1 && (
              <motion.div
                variants={arrowVariants}
                className="flex-shrink-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600 w-16 mx-4 rounded-full"
                style={{ transformOrigin: "left" }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}