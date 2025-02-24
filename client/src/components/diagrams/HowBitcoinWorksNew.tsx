import { motion } from "framer-motion";
import { Wallet, ArrowRight, Database, Shield, Key, Network, Lock } from "lucide-react";

const StepCard = ({ 
  title, 
  description, 
  icon: Icon, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: any;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-6 rounded-xl shadow-lg border border-orange-100"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-orange-100 rounded-lg">
        <Icon className="h-6 w-6 text-orange-600" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

const ProcessFlow = () => (
  <div className="flex items-center justify-center my-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-orange-100 p-4 rounded-lg"
    >
      <Wallet className="h-8 w-8 text-orange-600" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      className="h-1 w-20 bg-orange-200"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-orange-100 p-4 rounded-lg"
    >
      <Network className="h-8 w-8 text-orange-600" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="h-1 w-20 bg-orange-200"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="bg-orange-100 p-4 rounded-lg"
    >
      <Database className="h-8 w-8 text-orange-600" />
    </motion.div>
  </div>
);

const HowBitcoinWorksNew = () => {
  const steps = [
    {
      title: "Digital Wallets",
      description: "Your Bitcoin wallet is like a digital bank account. It stores your Bitcoin address (like an email) and your private keys (like a password).",
      icon: Wallet,
      delay: 0.2
    },
    {
      title: "Network Broadcasting",
      description: "When you send Bitcoin, your transaction is broadcast to thousands of computers worldwide that make up the Bitcoin network.",
      icon: Network,
      delay: 0.4
    },
    {
      title: "Transaction Verification",
      description: "Miners verify transactions by solving complex mathematical puzzles, ensuring security and preventing fraud.",
      icon: Shield,
      delay: 0.6
    },
    {
      title: "Blockchain Storage",
      description: "Once verified, your transaction is permanently recorded on the blockchain, a public ledger that anyone can view.",
      icon: Database,
      delay: 0.8
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">
          Understanding Bitcoin Transactions
        </h3>
        <ProcessFlow />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <StepCard key={step.title} {...step} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-blue-50 p-6 rounded-xl"
      >
        <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Key className="h-5 w-5" />
          Key Security Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-blue-600 mt-1" />
            <p className="text-sm text-gray-600">
              Cryptography ensures only you can spend your Bitcoin
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-1" />
            <p className="text-sm text-gray-600">
              Decentralized network prevents single points of failure
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowBitcoinWorksNew;
