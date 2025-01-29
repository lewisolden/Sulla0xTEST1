import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Key, Lock, Unlock, ArrowRight, Gift } from 'lucide-react';

interface Block {
  id: string;
  data: string;
  hash: string;
  previousHash: string;
  clue: string;
  isDecoded: boolean;
}

interface Puzzle {
  id: number;
  question: string;
  hint: string;
  answer: string;
  reward: number;
}

export default function BlockchainExplorerGame() {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');

  const puzzles: Puzzle[] = [
    {
      id: 1,
      question: "Find the transaction with the hidden message: 'CRYPTO_KEY'. What's the sender's address?",
      hint: "Look for a transaction with a data field containing encoded text",
      answer: "0x1234",
      reward: 10
    },
    {
      id: 2,
      question: "Follow the trail of transactions starting from Block #2. What's the total amount transferred?",
      hint: "Add up all transaction values in the chain",
      answer: "150",
      reward: 20
    },
    {
      id: 3,
      question: "Decode the message hidden across three consecutive blocks. What's the secret word?",
      hint: "Combine the first letter of each block's data field",
      answer: "BLOCKCHAIN",
      reward: 30
    }
  ];

  const generateBlockchain = () => {
    const newBlocks: Block[] = [
      {
        id: "1",
        data: "VHJhbnNmZXI6IDEwIEVUSA==", // Base64 encoded "Transfer: 10 ETH"
        hash: "0xabc...",
        previousHash: "0x000",
        clue: "First transaction of the day",
        isDecoded: false
      },
      {
        id: "2",
        data: "Q1JZUFRPXUtFWQ==", // Base64 encoded "CRYPTO_KEY"
        hash: "0xdef...",
        previousHash: "0xabc...",
        clue: "Contains a special message",
        isDecoded: false
      },
      {
        id: "3",
        data: "UmVjZWl2ZXI6IDB4MTIzNA==", // Base64 encoded "Receiver: 0x1234"
        hash: "0xghi...",
        previousHash: "0xdef...",
        clue: "Final destination",
        isDecoded: false
      }
    ];
    setBlocks(newBlocks);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCurrentLevel(1);
    generateBlockchain();
    setCurrentPuzzle(puzzles[0]);
  };

  const checkAnswer = () => {
    if (!currentPuzzle) return;

    if (userInput.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setScore(prev => prev + currentPuzzle.reward);
      setFeedback(`Correct! You earned ${currentPuzzle.reward} points!`);
      
      // Decode the relevant block
      setBlocks(prev => prev.map((block, idx) => 
        idx === currentLevel - 1 ? { ...block, isDecoded: true } : block
      ));

      // Move to next level
      if (currentLevel < puzzles.length) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setCurrentPuzzle(puzzles[currentLevel]);
          setUserInput('');
          setShowHint(false);
          setFeedback('');
        }, 2000);
      } else {
        setTimeout(() => {
          setFeedback('Congratulations! You completed all puzzles!');
        }, 2000);
      }
    } else {
      setFeedback('Try again!');
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Blockchain Explorer Adventure</h2>
        <p className="text-gray-600">
          Decode messages and solve puzzles hidden in the blockchain!
        </p>
        {isPlaying && (
          <div className="mt-4">
            <span className="text-xl font-semibold text-blue-600">Score: {score}</span>
            <span className="ml-4 text-sm text-gray-500">Level {currentLevel}/{puzzles.length}</span>
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <Button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Adventure
          </Button>
          <div className="mt-4 text-gray-600">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <ul className="text-left list-disc pl-6">
              <li>Examine the blockchain data carefully</li>
              <li>Solve puzzles by analyzing transactions and messages</li>
              <li>Use hints when stuck (costs points)</li>
              <li>Decode hidden messages to progress</li>
              <li>Earn points for correct solutions</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Puzzle Section */}
          <AnimatePresence mode="wait">
            {currentPuzzle && (
              <motion.div
                key={currentPuzzle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Puzzle #{currentPuzzle.id}
                </h3>
                <p className="text-gray-700 mb-4">{currentPuzzle.question}</p>
                
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-50 p-3 rounded-md mb-4"
                  >
                    <p className="text-sm text-yellow-700">
                      <span className="font-semibold">Hint:</span> {currentPuzzle.hint}
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your answer..."
                  />
                  <Button
                    onClick={checkAnswer}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </div>

                {!showHint && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowHint(true);
                      setScore(prev => Math.max(0, prev - 2));
                    }}
                    className="text-blue-600"
                  >
                    Get Hint (-2 points)
                  </Button>
                )}

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-3 rounded-md ${
                      feedback.includes('Correct') 
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {feedback}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blockchain Visualization */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Blockchain Explorer</h3>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {blocks.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-shrink-0"
                >
                  <Card className={`w-64 p-4 ${
                    block.isDecoded ? 'bg-green-100' : 'bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Block #{block.id}</span>
                      {block.isDecoded ? (
                        <Unlock className="w-4 h-4 text-green-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-mono truncate">Hash: {block.hash}</p>
                      <p className="font-mono truncate">Prev: {block.previousHash}</p>
                      <p className="mt-2">
                        {block.isDecoded ? (
                          <span className="text-green-700">
                            {atob(block.data)}
                          </span>
                        ) : (
                          <span className="font-mono text-gray-500">
                            {block.data}
                          </span>
                        )}
                      </p>
                      {block.isDecoded && (
                        <p className="text-sm text-gray-600 mt-2">
                          Clue: {block.clue}
                        </p>
                      )}
                    </div>
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
