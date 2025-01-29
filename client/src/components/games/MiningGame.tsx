import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Hash, Check, X } from "lucide-react";

interface Block {
  id: number;
  data: string;
  nonce: number;
  hash: string;
  mined: boolean;
}

export const MiningGame = () => {
  const [block, setBlock] = useState<Block>({
    id: 1,
    data: "Transaction Data",
    nonce: 0,
    hash: "",
    mined: false,
  });
  const [difficulty] = useState(4); // Number of leading zeros required
  const [mining, setMining] = useState(false);
  const [score, setScore] = useState(0);
  
  const calculateHash = (data: string, nonce: number) => {
    return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${data}${nonce}`))
      .then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      });
  };

  const mine = async () => {
    if (mining) return;
    setMining(true);
    let currentNonce = block.nonce;
    
    while (true) {
      const hash = await calculateHash(block.data, currentNonce);
      setBlock(prev => ({ ...prev, hash, nonce: currentNonce }));
      
      if (hash.startsWith('0'.repeat(difficulty))) {
        setBlock(prev => ({ ...prev, mined: true }));
        setScore(prev => prev + 1);
        break;
      }
      
      currentNonce++;
      // Add small delay to visualize the mining process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setMining(false);
  };

  const newBlock = () => {
    setBlock({
      id: block.id + 1,
      data: `Transaction Data ${block.id + 1}`,
      nonce: 0,
      hash: "",
      mined: false,
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Blockchain Mining Simulator
        </h2>
        <p className="text-gray-600">
          Learn how proof-of-work mining works by finding the right nonce to create a valid block hash.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Block ID</p>
            <p className="font-mono">{block.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nonce</p>
            <p className="font-mono">{block.nonce}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Data</p>
            <p className="font-mono break-all">{block.data}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-600">Current Hash</p>
            <p className="font-mono break-all">{block.hash || '(not calculated)'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600">Difficulty</p>
          <p className="font-mono">{difficulty} leading zeros</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Blocks Mined</p>
          <p className="font-mono">{score}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={mine}
          disabled={mining || block.mined}
          className="w-full relative"
        >
          <Hash className="w-4 h-4 mr-2" />
          {mining ? 'Mining...' : 'Start Mining'}
          {mining && (
            <motion.div
              className="absolute inset-0 bg-blue-600 opacity-20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </Button>

        {block.mined && (
          <Button 
            onClick={newBlock}
            variant="outline" 
            className="w-full"
          >
            Mine Next Block
          </Button>
        )}
      </div>

      {block.mined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-green-100 p-4 rounded-lg flex items-center"
        >
          <Check className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-700">
            Block successfully mined! The hash meets the difficulty requirement.
          </p>
        </motion.div>
      )}
    </Card>
  );
};

export default MiningGame;
