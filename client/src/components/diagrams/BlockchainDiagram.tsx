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

  const blockVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  const arrowVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full overflow-x-auto py-8"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-start space-x-4 min-w-max px-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="flex items-center">
            <motion.div
              custom={index}
              variants={blockVariants}
              className="bg-white rounded-lg shadow-lg p-4 w-64"
            >
              <h3 className="text-lg font-semibold mb-2">Block {block.id}</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">Hash:</span> {block.hash}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Prev Hash:</span> {block.prevHash}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Data:</span> {block.data}
                </p>
              </div>
            </motion.div>
            {index < blocks.length - 1 && (
              <motion.div
                variants={arrowVariants}
                className="h-2 bg-blue-500 w-16 mx-2"
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
