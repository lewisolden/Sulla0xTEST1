import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Database, Link as LinkIcon } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  isValid: boolean;
}

interface Block {
  id: string;
  transactions: Transaction[];
  previousHash: string;
  timestamp: number;
}

export default function NetworkConsensusGame() {
  const [score, setScore] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);

  // Generate a random transaction
  const generateTransaction = (): Transaction => {
    const addresses = ['0x1234', '0x5678', '0x9ABC', '0xDEF0', '0x4321'];
    const from = addresses[Math.floor(Math.random() * addresses.length)];
    let to = addresses[Math.floor(Math.random() * addresses.length)];
    while (to === from) {
      to = addresses[Math.floor(Math.random() * addresses.length)];
    }
    return {
      id: Math.random().toString(36).substr(2, 9),
      from,
      to,
      amount: Math.floor(Math.random() * 100) + 1,
      isValid: Math.random() > 0.3, // 70% chance of being valid
    };
  };

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setBlocks([]);
    setPendingTransactions([
      generateTransaction(),
      generateTransaction(),
      generateTransaction(),
    ]);
  };

  // Validate a transaction
  const validateTransaction = (transaction: Transaction, userChoice: boolean) => {
    if (userChoice === transaction.isValid) {
      setScore(prev => prev + 10);
      // Add success animation here
    } else {
      setScore(prev => Math.max(0, prev - 5));
      // Add failure animation here
    }

    setPendingTransactions(prev => 
      prev.filter(t => t.id !== transaction.id)
    );

    if (pendingTransactions.length <= 1) {
      // Create new block if enough transactions validated
      const newBlock: Block = {
        id: Math.random().toString(36).substr(2, 9),
        transactions: [transaction],
        previousHash: blocks.length ? blocks[blocks.length - 1].id : '0',
        timestamp: Date.now(),
      };
      setBlocks(prev => [...prev, newBlock]);
      
      // Generate new transactions
      setPendingTransactions(prev => [
        ...prev,
        generateTransaction(),
        generateTransaction(),
      ]);

      // Increase difficulty every 5 blocks
      if (blocks.length % 5 === 0) {
        setGameLevel(prev => prev + 1);
      }
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Network Consensus Game</h2>
        <p className="text-gray-600">
          Validate transactions and build blocks to secure the network!
        </p>
        {isPlaying && (
          <div className="mt-4">
            <span className="text-xl font-semibold text-blue-600">Score: {score}</span>
            <span className="ml-4 text-sm text-gray-500">Level {gameLevel}</span>
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <Button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Game
          </Button>
          <div className="mt-4 text-gray-600">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <ul className="text-left list-disc pl-6">
              <li>Review incoming transactions</li>
              <li>Click ✓ for valid transactions, × for invalid ones</li>
              <li>Build blocks by validating transactions</li>
              <li>Score points for correct validations</li>
              <li>Watch out for increasing difficulty!</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Transactions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Pending Transactions</h3>
            <AnimatePresence>
              {pendingTransactions.map(transaction => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        From: {transaction.from}
                      </p>
                      <p className="text-sm text-gray-600">
                        To: {transaction.to}
                      </p>
                      <p className="text-sm font-semibold">
                        Amount: {transaction.amount} CRYPTO
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => validateTransaction(transaction, true)}
                        variant="outline"
                        className="bg-green-50 hover:bg-green-100"
                      >
                        <Check className="w-5 h-5 text-green-600" />
                      </Button>
                      <Button
                        onClick={() => validateTransaction(transaction, false)}
                        variant="outline"
                        className="bg-red-50 hover:bg-red-100"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Blockchain Visualization */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Blockchain</h3>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-shrink-0"
                >
                  <Card className="w-48 p-4 bg-blue-600 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4" />
                      <span className="text-sm font-semibold">Block {index + 1}</span>
                    </div>
                    <div className="text-xs opacity-75">
                      <p>Transactions: {block.transactions.length}</p>
                      <p className="truncate">Hash: {block.id}</p>
                    </div>
                    {index < blocks.length - 1 && (
                      <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
                        <LinkIcon className="w-4 h-4 text-blue-300" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <Button
              onClick={() => setIsPlaying(false)}
              variant="outline"
              className="text-blue-600"
            >
              End Game
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
