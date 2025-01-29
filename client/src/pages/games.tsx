import { Gamepad2, Hash, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import MiningGame from "@/components/games/MiningGame";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const games = [
  {
    id: "mining",
    title: "Mining Simulator",
    description: "Learn how proof-of-work mining works by finding valid block hashes.",
    icon: Hash,
  },
  // More games to be added
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState("mining");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Interactive Blockchain Games
          </h1>
          <p className="text-xl text-blue-600">
            Learn blockchain concepts through hands-on simulations and games
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="space-y-4">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className={`p-4 cursor-pointer transition-all duration-300 ${
                    selectedGame === game.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="flex items-center space-x-3">
                    <game.icon className="w-5 h-5" />
                    <div>
                      <h3 className="font-semibold">{game.title}</h3>
                      <p className="text-sm opacity-80">{game.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3"
          >
            {selectedGame === "mining" && <MiningGame />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
