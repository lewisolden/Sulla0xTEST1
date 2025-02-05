import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Key, Lock, Unlock, ArrowRight, Gift, Lightbulb, BookOpen } from 'lucide-react';

interface Block {
  id: string;
  data: string;
  hash: string;
  previousHash: string;
  clue: string;
  isDecoded: boolean;
  explanation: string;
}

interface Puzzle {
  id: number;
  question: string;
  hint: string;
  answer: string;
  reward: number;
  explanation: string;
}

export default function BlockchainExplorerGame() {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  const puzzles: Puzzle[] = [
    {
      id: 1,
      question: "Let's start with something simple! Find the hash of Block #1 (Genesis Block). Look for a code that starts with '0x'.",
      hint: "The hash is like a digital fingerprint - it's that unique code shown below the block data. In this case, it starts with '0x'!",
      answer: "0xabc",
      reward: 10,
      explanation: "Every block in a blockchain has a unique hash (like a fingerprint). The first block is special - it's called the Genesis Block!"
    },
    {
      id: 2,
      question: "How many blocks are linked together in our mini blockchain? Count all the blocks you can see.",
      hint: "Look at each block connected by arrows. Each arrow shows how blocks are linked together in sequence!",
      answer: "3",
      reward: 20,
      explanation: "Blocks in a blockchain are connected in sequence - each new block points back to the previous one, creating a chain of trust."
    },
    {
      id: 3,
      question: "What's the special message hidden in Block #3? Decode it by looking at the data field.",
      hint: "Look at the 'Data' field in Block #3. This represents the actual information stored in the block!",
      answer: "BLOCKCHAIN",
      reward: 30,
      explanation: "Blocks can store any kind of data - transactions, messages, or even smart contracts. This is what makes blockchain so versatile!"
    }
  ];

  const generateBlockchain = () => {
    const newBlocks: Block[] = [
      {
        id: "1",
        data: "Genesis Block - The Start of Our Chain!",
        hash: "0xabc",
        previousHash: "0x000",
        clue: "I'm the first block - the Genesis Block!",
        isDecoded: true,
        explanation: "The Genesis Block is the first block in any blockchain. It's special because it has no previous block!"
      },
      {
        id: "2",
        data: "HELLO CRYPTO WORLD",
        hash: "0xdef",
        previousHash: "0xabc",
        clue: "I contain a friendly greeting!",
        isDecoded: false,
        explanation: "Each block's previousHash matches the hash of the block before it - this creates the 'chain' in blockchain!"
      },
      {
        id: "3",
        data: "BLOCKCHAIN",
        hash: "0xghi",
        previousHash: "0xdef",
        clue: "I contain the name of this amazing technology!",
        isDecoded: false,
        explanation: "This block shows how data is stored transparently in a blockchain - anyone can read it!"
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
    setShowExplanation(false);
  };

  const checkAnswer = () => {
    if (!currentPuzzle) return;

    if (userInput.toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setScore(prev => prev + currentPuzzle.reward);
      setFeedback(`🎉 Correct! You earned ${currentPuzzle.reward} points!\n\n${currentPuzzle.explanation}`);
      setShowExplanation(true);

      // Decode the block
      setBlocks(prev => prev.map((block, idx) => 
        idx === currentLevel - 1 ? { ...block, isDecoded: true } : block
      ));

      // Progress to next level
      if (currentLevel < puzzles.length) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setCurrentPuzzle(puzzles[currentLevel]);
          setUserInput('');
          setShowHint(true);
          setShowExplanation(false);
          setFeedback('');
        }, 3000);
      } else {
        setTimeout(() => {
          setFeedback('🎓 Congratulations! You\'ve completed the Blockchain Explorer game! You now understand how blocks are connected and how data is stored in a blockchain. Keep exploring the world of crypto! 🌟');
        }, 3000);
      }
    } else {
      // Helpful feedback for wrong answers
      let helpfulFeedback = "Not quite right. Here's a helpful tip: ";

      if (currentPuzzle.id === 1) {
        helpfulFeedback += "Look for a code starting with '0x' in the first block. It's right there in the block details!";
      } else if (currentPuzzle.id === 2) {
        helpfulFeedback += "Count each box you see - each one is a block. Don't forget to include the Genesis Block!";
      } else if (currentPuzzle.id === 3) {
        helpfulFeedback += "The message is written in capital letters in Block #3's data field. It's a term we use to describe this technology!";
      }

      setFeedback(helpfulFeedback);
      // Reduced penalty to keep it encouraging
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Blockchain Explorer Adventure</h2>
        <p className="text-gray-600">
          Discover how blockchain works by exploring blocks and solving puzzles! Perfect for beginners! 🚀
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
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Welcome to Blockchain Explorer! 🎮</h3>
            <div className="text-left space-y-4">
              <p className="text-blue-700">
                <span className="font-semibold">What is this game?</span><br/>
                This is a fun way to learn how blockchain works! You'll explore blocks, decode messages, and understand how blockchain stores information.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-2">
                  <li>Examine each block's data, hash, and connections</li>
                  <li>Answer questions about what you find</li>
                  <li>Use hints if you need help - they're free!</li>
                  <li>Learn about blockchain as you play</li>
                  <li>Earn points and unlock achievements</li>
                </ul>
              </div>
            </div>
          </div>
          <Button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Your Blockchain Adventure! 🚀
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Enhanced Tutorial */}
          <AnimatePresence>
            {showTutorial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-yellow-50 p-6 rounded-lg border border-yellow-200"
              >
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Quick Guide to Blockchain</h3>
                    <p className="text-yellow-700 mb-4">
                      Think of a blockchain as a chain of connected boxes (blocks), where each box:
                      <br />• Has its own unique code (hash)
                      <br />• Points to the previous box (previousHash)
                      <br />• Contains some information (data)
                      <br />• Is connected to form a secure chain!
                    </p>
                    <Button
                      onClick={() => setShowTutorial(false)}
                      variant="outline"
                      className="bg-yellow-100"
                    >
                      Got it! Let's explore! 🔍
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Puzzle Section */}
          <AnimatePresence mode="wait">
            {currentPuzzle && (
              <motion.div
                key={currentPuzzle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-700">
                    Challenge #{currentPuzzle.id}
                  </h3>
                </div>

                <p className="text-gray-700 mb-4">{currentPuzzle.question}</p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-50 p-4 rounded-md mb-4"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-blue-700">
                      <span className="font-semibold">Helpful Hint:</span> {currentPuzzle.hint}
                    </p>
                  </div>
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
                    className={`mt-4 p-4 rounded-md ${
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

          {/* Enhanced Blockchain Visualization */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Blockchain Explorer View
            </h3>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-shrink-0"
                >
                  <Card className={`w-80 p-6 ${
                    block.isDecoded ? 'bg-green-50' : 'bg-white'
                  } ${currentLevel === index + 1 ? 'ring-2 ring-blue-400' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-blue-800">Block #{block.id}</span>
                      {block.isDecoded ? (
                        <Unlock className="w-5 h-5 text-green-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Hash:</span> {block.hash}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Previous Hash:</span> {block.previousHash}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Data:</span><br/>
                          <span className={block.isDecoded ? "text-green-700" : "text-gray-500"}>
                            {block.data}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-blue-600 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        {block.clue}
                      </p>
                    </div>
                    {index < blocks.length - 1 && (
                      <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-blue-400" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <Button
              onClick={() => setIsPlaying(false)}
              variant="outline"
              className="text-blue-600"
            >
              Exit Game
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}