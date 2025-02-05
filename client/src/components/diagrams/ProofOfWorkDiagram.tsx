import { motion } from "framer-motion";
import { Hash, Server, Check, Clock, Database } from "lucide-react";

interface TimelineStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="relative flex items-center gap-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <motion.div
      className="absolute left-1/2 -ml-2 w-4 h-4 rounded-full bg-blue-500"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2, delay }}
    />
    <div className="w-1/2 text-right pr-8">
      <h4 className="font-semibold text-blue-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="bg-white p-2 rounded-full shadow-sm">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
  </motion.div>
);

const ProofOfWorkDiagram: React.FC = () => {
  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Miners Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Server className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Miners</h3>
              <p className="text-sm text-gray-600">Compete to solve puzzle</p>
            </div>
          </div>
        </motion.div>

        {/* Puzzle Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Hash className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-800">Hash Puzzle</h3>
              <p className="text-sm text-gray-600">Find the right number</p>
            </div>
          </div>
        </motion.div>

        {/* Reward Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Check className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Block Reward</h3>
              <p className="text-sm text-gray-600">Winner gets bitcoin</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Process Timeline */}
      <motion.div 
        className="mt-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-200 transform -translate-x-1/2" />

        <div className="space-y-8">
          <TimelineStep
            icon={Clock}
            title="1. Start Mining"
            description="Miners receive new transaction data"
            delay={0.7}
          />

          <TimelineStep
            icon={Hash}
            title="2. Find Solution"
            description="Try millions of numbers per second"
            delay={0.9}
          />

          <TimelineStep
            icon={Database}
            title="3. Create Block"
            description="Winner adds block to blockchain"
            delay={1.1}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ProofOfWorkDiagram;