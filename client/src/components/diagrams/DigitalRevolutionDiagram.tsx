import { motion } from "framer-motion";
import { Coins, ArrowRight, Laptop } from "lucide-react";

export default function DigitalRevolutionDiagram() {
  return (
    <div className="w-full py-8">
      <div className="flex justify-center items-center space-x-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="p-6 bg-blue-100 rounded-full">
            <Coins className="w-12 h-12 text-blue-600" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Traditional Money</p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ArrowRight className="w-8 h-8 text-blue-500" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="p-6 bg-green-100 rounded-full">
            <Laptop className="w-12 h-12 text-green-600" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Digital Currency</p>
        </motion.div>
      </div>
    </div>
  );
}
