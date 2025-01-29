import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lock, Unlock, Key, FileText, ArrowRight } from "lucide-react";

export default function CryptographyDiagram() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full py-8"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Public Key Cryptography Process
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Encryption Process */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-medium text-lg mb-4">Encryption</h4>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col items-center">
                <FileText className="w-12 h-12 text-gray-600" />
                <span className="text-sm mt-2">Original Data</span>
              </div>
              
              <motion.div variants={arrowVariants}>
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </motion.div>
              
              <div className="flex flex-col items-center">
                <Key className="w-12 h-12 text-green-600" />
                <span className="text-sm mt-2">Public Key</span>
              </div>
              
              <motion.div variants={arrowVariants}>
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </motion.div>
              
              <div className="flex flex-col items-center">
                <Lock className="w-12 h-12 text-red-600" />
                <span className="text-sm mt-2">Encrypted Data</span>
              </div>
            </div>
          </motion.div>

          {/* Decryption Process */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="font-medium text-lg mb-4">Decryption</h4>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col items-center">
                <Lock className="w-12 h-12 text-red-600" />
                <span className="text-sm mt-2">Encrypted Data</span>
              </div>
              
              <motion.div variants={arrowVariants}>
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </motion.div>
              
              <div className="flex flex-col items-center">
                <Key className="w-12 h-12 text-purple-600" />
                <span className="text-sm mt-2">Private Key</span>
              </div>
              
              <motion.div variants={arrowVariants}>
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </motion.div>
              
              <div className="flex flex-col items-center">
                <Unlock className="w-12 h-12 text-green-600" />
                <span className="text-sm mt-2">Decrypted Data</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
