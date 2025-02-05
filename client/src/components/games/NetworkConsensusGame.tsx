import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Database, Link as LinkIcon, Lightbulb, Shield, Activity, ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  isValid: boolean;
  explanation?: string;
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
  const [showTutorial, setShowTutorial] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  // Generate a random transaction with educational value
  const generateTransaction = (): Transaction => {
    const scenarios = [
      {
        from: '0x1234',
        to: '0x5678',
        amount: 50,
        isValid: true,
        explanation: 'A valid transaction with sufficient funds and correct addresses'
      },
      {
        from: '0x9ABC',
        to: '0x9ABC',
        amount: 100,
        isValid: false,
        explanation: 'Invalid: Sender and receiver addresses are the same'
      },
      {
        from: '0xDEF0',
        to: '0x4321',
        amount: 1000000,
        isValid: false,
        explanation: 'Invalid: Amount exceeds typical transaction limits'
      },
      {
        from: '0x8888',
        to: '0x9999',
        amount: 25,
        isValid: true,
        explanation: 'Valid transaction with reasonable amount'
      }
    ];

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...scenario
    };
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setBlocks([]);
    setPendingTransactions([
      generateTransaction(),
      generateTransaction(),
      generateTransaction(),
    ]);
    setShowTutorial(true);
  };

  const validateTransaction = (transaction: Transaction, userChoice: boolean) => {
    if (userChoice === transaction.isValid) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = Math.floor(newStreak / 3) * 5; // Bonus points for streaks
      setScore(prev => prev + 10 + bonus);
      setFeedback(`✨ Correct! ${transaction.explanation}\n${bonus > 0 ? `\nStreak bonus: +${bonus} points!` : ''}`);
    } else {
      setStreak(0);
      setScore(prev => Math.max(0, prev - 5));
      setFeedback(`❌ Not quite! ${transaction.explanation}\nDon't worry - keep learning!`);
    }

    setPendingTransactions(prev => 
      prev.filter(t => t.id !== transaction.id)
    );

    if (pendingTransactions.length <= 1) {
      const newBlock: Block = {
        id: Math.random().toString(36).substr(2, 9),
        transactions: [transaction],
        previousHash: blocks.length ? blocks[blocks.length - 1].id : '0',
        timestamp: Date.now(),
      };
      setBlocks(prev => [...prev, newBlock]);

      setPendingTransactions(prev => [
        ...prev,
        generateTransaction(),
        generateTransaction(),
      ]);

      if (blocks.length % 3 === 0) {
        setGameLevel(prev => prev + 1);
      }
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Network Validator Game</h2>
        <p className="text-gray-600">
          Become a blockchain validator! Help secure the network by checking transactions! 🛡️
        </p>
        {isPlaying && (
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-xl font-semibold text-blue-600">Score: {score}</span>
              <span className="ml-4 text-sm text-gray-500">Level {gameLevel}</span>
            </div>
            <div className="text-sm text-blue-500">
              Current Streak: {streak} {streak > 0 && '🔥'}
            </div>
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Welcome to Network Validator! 🎮</h3>
            <div className="text-left space-y-4">
              <p className="text-blue-700">
                <span className="font-semibold">What is this game?</span><br/>
                Learn how blockchain networks validate transactions! You'll play the role of a validator, checking transactions for security and accuracy.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-2">
                  <li>Review each transaction carefully</li>
                  <li>Click ✓ if you think it's valid, × if you think it's suspicious</li>
                  <li>Build a streak for bonus points!</li>
                  <li>Watch transactions get added to blocks</li>
                  <li>Learn about blockchain security as you play</li>
                </ul>
              </div>
            </div>
          </div>
          <Button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Validating! 🚀
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tutorial */}
          <AnimatePresence>
            {showTutorial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-yellow-50 p-6 rounded-lg border border-yellow-200"
              >
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Validator's Quick Guide</h3>
                    <p className="text-yellow-700 mb-4">
                      As a validator, you need to watch out for:
                      <br />• Suspicious transaction amounts (too high?)
                      <br />• Same sender and receiver addresses
                      <br />• Invalid wallet addresses
                      <br />• Unusual patterns
                    </p>
                    <Button
                      onClick={() => setShowTutorial(false)}
                      variant="outline"
                      className="bg-yellow-100"
                    >
                      Ready to Validate! 🔍
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pending Transactions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700">Pending Transactions</h3>
            </div>
            <AnimatePresence>
              {pendingTransactions.map(transaction => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">From:</span> {transaction.from}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">To:</span> {transaction.to}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-sm text-blue-700">
                          <span className="font-semibold">Amount:</span> {transaction.amount} CRYPTO
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
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

          {/* Feedback Message */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-lg ${
                  feedback.includes('Correct')
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blockchain Visualization */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700">Validated Blocks</h3>
            </div>
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