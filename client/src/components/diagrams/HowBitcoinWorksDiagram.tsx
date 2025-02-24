import { motion } from "framer-motion";
import { Database, Key, Shield, Coins, Network, Lock, Cpu, UserCircle } from "lucide-react";

const HowBitcoinWorksDiagram = () => {
  const steps = [
    {
      icon: UserCircle,
      title: "Transaction Request",
      description: "Alice wants to send Bitcoin to Bob. She initiates a transaction using her Bitcoin wallet.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Lock,
      title: "Digital Signature",
      description: "The transaction is signed with Alice's private key, proving she owns the Bitcoin being sent.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Network,
      title: "Network Broadcast",
      description: "The signed transaction is broadcast to the Bitcoin network of thousands of computers.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Cpu,
      title: "Mining Process",
      description: "Miners compete to verify the transaction by solving complex mathematical puzzles.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Database,
      title: "Block Creation",
      description: "The verified transaction is added to a new block along with other transactions.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      icon: Shield,
      title: "Chain Addition",
      description: "The new block is added to the blockchain, making the transaction permanent and irreversible.",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200"
      >
        <h3 className="text-2xl font-bold text-orange-800 mb-4">How Bitcoin Works: A Simple Explanation</h3>
        <p className="text-gray-700">
          Think of Bitcoin like a digital ledger that everyone can see, but only the owner can write in their part using a special key. Here's how it works step by step:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${step.bgColor} border border-gray-200`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-white ${step.color}`}>
                <step.icon className="w-6 h-6" />
              </div>
              <h4 className={`font-semibold ${step.color}`}>{step.title}</h4>
            </div>
            <p className="mt-4 text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
      >
        <h4 className="text-xl font-semibold text-blue-800 mb-4">Key Features that Make Bitcoin Special:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/60 rounded-lg">
            <h5 className="font-semibold text-purple-700">🔒 Decentralized</h5>
            <p className="text-gray-600">No single entity controls Bitcoin - it's run by its users</p>
          </div>
          <div className="p-4 bg-white/60 rounded-lg">
            <h5 className="font-semibold text-purple-700">🌐 Transparent</h5>
            <p className="text-gray-600">All transactions are public and can be verified by anyone</p>
          </div>
          <div className="p-4 bg-white/60 rounded-lg">
            <h5 className="font-semibold text-purple-700">💪 Secure</h5>
            <p className="text-gray-600">Protected by advanced cryptography and network consensus</p>
          </div>
          <div className="p-4 bg-white/60 rounded-lg">
            <h5 className="font-semibold text-purple-700">🚫 Limited Supply</h5>
            <p className="text-gray-600">Only 21 million Bitcoin will ever exist</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowBitcoinWorksDiagram;
