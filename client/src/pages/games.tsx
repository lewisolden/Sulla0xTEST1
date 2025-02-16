import { TrendingUp, Wallet, Building2, Hash, Network, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TradingSimulator from "@/components/games/TradingSimulator";
import WalletAdventure from "@/components/games/WalletAdventure";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import MiningGame from "@/components/games/MiningGame";
import NetworkConsensusGame from "@/components/games/NetworkConsensusGame";
import BlockchainExplorerGame from "@/components/games/BlockchainExplorerGame";
import BlockchainCityBuilder from "@/components/games/BlockchainCityBuilder";

const games = [
  {
    id: "trading",
    title: "Crypto Trading Simulator",
    description: "Learn to trade cryptocurrency in a risk-free environment with virtual money.",
    icon: TrendingUp,
    available: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "wallet",
    title: "Crypto Wallet Adventure",
    description: "Master wallet security and management through an interactive story-driven experience.",
    icon: Wallet,
    available: true,
    color: "from-green-500 to-green-600"
  },
  {
    id: "city",
    title: "Blockchain City Builder",
    description: "Build and manage your own blockchain-powered city while learning core concepts.",
    icon: Building2,
    available: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "mining",
    title: "Mining Simulator",
    description: "Learn how proof-of-work mining works by finding valid block hashes.",
    icon: Hash,
    available: true,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: "consensus",
    title: "Network Consensus",
    description: "Validate transactions and build blocks to understand how blockchain networks reach consensus.",
    icon: Network,
    available: true,
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "explorer",
    title: "Blockchain Explorer Adventure",
    description: "Decode hidden messages and solve puzzles by analyzing blockchain data.",
    icon: Search,
    available: true,
    color: "from-pink-500 to-pink-600"
  }
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState("trading");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Interactive Crypto Games
          </h1>
          <p className="text-xl text-blue-600">
            Learn cryptocurrency concepts through fun, interactive games!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="space-y-4">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`p-4 ${!game.available ? 'opacity-75' : ''} ${
                      game.available ? 'cursor-pointer' : 'cursor-not-allowed'
                    } transition-all duration-300 overflow-hidden relative ${
                      selectedGame === game.id && game.available
                        ? `bg-gradient-to-r ${game.color} text-white`
                        : 'hover:bg-blue-50'
                    }`}
                    onClick={() => game.available && setSelectedGame(game.id)}
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <game.icon className={`w-5 h-5 ${
                        selectedGame === game.id ? 'text-white' : 'text-blue-600'
                      }`} />
                      <div>
                        <h3 className="font-semibold">
                          {game.title}
                          {!game.available && (
                            <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </h3>
                        <p className={`text-sm ${
                          selectedGame === game.id ? 'text-blue-50' : 'text-gray-600'
                        }`}>
                          {game.description}
                        </p>
                      </div>
                    </div>
                    {selectedGame === game.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGame}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {selectedGame === "trading" && <TradingSimulator />}
                {selectedGame === "wallet" && <WalletAdventure />}
                {selectedGame === "city" && <BlockchainCityBuilder />}
                {selectedGame === "mining" && <MiningGame />}
                {selectedGame === "consensus" && <NetworkConsensusGame />}
                {selectedGame === "explorer" && <BlockchainExplorerGame />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}