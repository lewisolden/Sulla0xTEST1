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
  const [showHint, setShowHint] = useState(true); // Show hints by default
  const [feedback, setFeedback] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);

  const puzzles: Puzzle[] = [
    {
      id: 1,
      question: "Look at Block #2. It contains the text 'HELLO'. What's the hash of this block?",
      hint: "The hash is shown right below the block data. It starts with '0x'!",
      answer: "0xdef",
      reward: 10
    },
    {
      id: 2,
      question: "How many blocks are connected to Block #1? Count the blocks that have arrows pointing to or from it.",
      hint: "Look for the arrow icons between blocks. Each arrow represents a connection!",
      answer: "2",
      reward: 20
    },
    {
      id: 3,
      question: "What's the word hidden in Block #3? Just decode the text you see.",
      hint: "The text is in UPPERCASE. It's a common blockchain term that starts with 'B'!",
      answer: "BLOCKCHAIN",
      reward: 30
    }
  ];

  const generateBlockchain = () => {
    const newBlocks: Block[] = [
      {
        id: "1",
        data: "Welcome to block explorer!",
        hash: "0xabc",
        previousHash: "0x000",
        clue: "This is the first block - called the genesis block!",
        isDecoded: true // Start with first block decoded
      },
      {
        id: "2",
        data: "HELLO",
        hash: "0xdef",
        previousHash: "0xabc",
        clue: "Look at the hash of this block for puzzle #1",
        isDecoded: false
      },
      {
        id: "3",
        data: "BLOCKCHAIN",
        hash: "0xghi",
        previousHash: "0xdef",
        clue: "This block contains a special word",
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
    setShowTutorial(true);
  };

  const checkAnswer = () => {
    if (!currentPuzzle) return;

    if (userInput.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setScore(prev => prev + currentPuzzle.reward);
      setFeedback(`Correct! 🎉 You earned ${currentPuzzle.reward} points! You're doing great!`);

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
          setShowHint(true);
          setFeedback('');
        }, 2000);
      } else {
        setTimeout(() => {
          setFeedback('🎉 Congratulations! You completed all puzzles! You are now a blockchain explorer expert! 🏆');
        }, 2000);
      }
    } else {
      // More helpful feedback for wrong answers
      const distance = Math.abs(userInput.length - currentPuzzle.answer.length);
      let helpfulFeedback = "Not quite right. ";

      if (distance > 2) {
        helpfulFeedback += "Your answer is a different length than expected. ";
      }

      if (currentPuzzle.id === 1 && !userInput.startsWith("0x")) {
        helpfulFeedback += "Remember, block hashes start with '0x'. ";
      }

      if (currentPuzzle.id === 2 && isNaN(Number(userInput))) {
        helpfulFeedback += "The answer should be a number. ";
      }

      setFeedback(helpfulFeedback + "Try again! You can do this! 💪");
      setScore(prev => Math.max(0, prev - 2)); // Reduced penalty
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
              <li>Each block contains information you need to solve puzzles</li>
              <li>Look at the block's hash, data, and connections</li>
              <li>Hints are shown by default to help you</li>
              <li>Wrong answers only lose 2 points now</li>
              <li>Take your time and have fun exploring!</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tutorial Modal */}
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
            >
              <h3 className="font-semibold text-yellow-800 mb-2">Quick Tutorial</h3>
              <p className="text-yellow-700 mb-4">
                Welcome to the Blockchain Explorer! Here's how to play:
                <br />• Each puzzle is about finding information in the blocks below
                <br />• Look at the block's hash (starts with 0x), data, and connections
                <br />• Use the hints - they're very helpful!
              </p>
              <Button
                onClick={() => setShowTutorial(false)}
                variant="outline"
                className="bg-yellow-100"
              >
                Got it!
              </Button>
            </motion.div>
          )}

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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-yellow-50 p-3 rounded-md mb-4"
                >
                  <p className="text-sm text-yellow-700">
                    <span className="font-semibold">💡 Hint:</span> {currentPuzzle.hint}
                  </p>
                </motion.div>

                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your answer here..."
                  />
                  <Button
                    onClick={checkAnswer}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Check Answer
                  </Button>
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-3 rounded-md ${
                      feedback.includes('Correct') || feedback.includes('Congratulations')
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
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
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-shrink-0"
                >
                  <Card className={`w-64 p-4 ${
                    block.isDecoded ? 'bg-green-100' : 'bg-white'
                  } ${currentLevel === index + 1 ? 'ring-2 ring-blue-400' : ''}`}>
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
                        <span className={block.isDecoded ? "text-green-700" : "text-gray-500"}>
                          {block.data}
                        </span>
                      </p>
                      <p className="text-sm text-blue-600 mt-2">
                        💡 {block.clue}
                      </p>
                    </div>
                    {index < blocks.length - 1 && (
                      <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 text-blue-300" />
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