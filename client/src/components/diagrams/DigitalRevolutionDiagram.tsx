import { motion } from "framer-motion";
import { Coins, ArrowRight, Laptop } from "lucide-react";

export default function DigitalRevolutionDiagram() {
  return (
    <div className="w-full py-12">
      <div className="flex justify-center items-center space-x-12 md:space-x-16">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="p-8 bg-blue-100 rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Coins className="w-12 h-12 text-blue-600" />
          </div>
          <p className="mt-4 text-base font-medium text-gray-700 text-center w-32">Traditional Money</p>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "auto", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ArrowRight className="w-10 h-10 text-blue-500" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="p-8 bg-green-100 rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Laptop className="w-12 h-12 text-green-600" />
          </div>
          <p className="mt-4 text-base font-medium text-gray-700 text-center w-32">Digital Currency</p>
        </motion.div>
      </div>
    </div>
  );
}