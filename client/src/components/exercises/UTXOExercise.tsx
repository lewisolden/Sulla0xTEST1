import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Copy, AlertTriangle, Award, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface UTXO {
  id: string;
  amount: number;
  selected: boolean;
}

interface Transaction {
  id: string;
  inputs: UTXO[];
  outputs: { address: string; amount: number }[];
  change: number;
  timestamp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const SAMPLE_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

const generateNewUTXOs = () => {
  const count = Math.floor(Math.random() * 3) + 3; // 3-5 UTXOs
  return Array.from({ length: count }, (_, i) => ({
    id: `utxo${Date.now()}-${i}`,
    amount: Number((Math.random() * 5 + 1).toFixed(2)), // 1-6 BTC
    selected: false
  }));
};

export const UTXOExercise = () => {
  const [utxos, setUtxos] = useState<UTXO[]>(generateNewUTXOs());
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const { toast } = useToast();

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_tx',
      title: 'First Steps',
      description: 'Complete your first transaction',
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      unlocked: false
    },
    {
      id: 'efficient',
      title: 'Efficient Spender',
      description: 'Complete a transaction with minimal change (<0.1 BTC)',
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      unlocked: false
    },
    {
      id: 'master',
      title: 'UTXO Master',
      description: 'Complete 5 transactions',
      icon: <Award className="h-6 w-6 text-yellow-500" />,
      unlocked: false
    }
  ]);

  const checkAchievements = (newTransaction: Transaction) => {
    const newAchievements = [...achievements];

    // First transaction achievement
    if (!newAchievements[0].unlocked && transactions.length === 0) {
      newAchievements[0].unlocked = true;
      toast({
        title: "Achievement Unlocked! 🎉",
        description: "First Steps - Completed your first transaction",
      });
    }

    // Efficient spender achievement
    if (!newAchievements[1].unlocked && newTransaction.change < 0.1) {
      newAchievements[1].unlocked = true;
      toast({
        title: "Achievement Unlocked! 🎯",
        description: "Efficient Spender - Minimal change transaction",
      });
    }

    // Master achievement
    if (!newAchievements[2].unlocked && transactions.length === 4) {
      newAchievements[2].unlocked = true;
      toast({
        title: "Achievement Unlocked! 🏆",
        description: "UTXO Master - Completed 5 transactions",
      });
    }

    setAchievements(newAchievements);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(SAMPLE_ADDRESS);
    toast({
      title: "Address Copied",
      description: "Sample address copied to clipboard",
    });
  };

  const toggleUTXO = (id: string) => {
    setUtxos(utxos.map(utxo => 
      utxo.id === id ? { ...utxo, selected: !utxo.selected } : utxo
    ));
  };

  const createTransaction = () => {
    const selectedUTXOs = utxos.filter(utxo => utxo.selected);
    const totalInput = selectedUTXOs.reduce((sum, utxo) => sum + utxo.amount, 0);

    if (!spendAmount || spendAmount <= 0) {
      setFeedback('Please enter a valid amount to spend.');
      return;
    }

    if (!recipientAddress) {
      setFeedback('Please enter a recipient address.');
      return;
    }

    if (totalInput < spendAmount) {
      setFeedback('Insufficient funds! Select more UTXOs.');
      return;
    }

    const change = Number((totalInput - spendAmount).toFixed(2));
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      inputs: selectedUTXOs,
      outputs: [{ address: recipientAddress, amount: spendAmount }],
      change,
      timestamp: Date.now()
    };

    setTransactions([...transactions, newTransaction]);
    checkAchievements(newTransaction);

    // Create new UTXOs from change and add some random new ones
    const remainingUtxos = utxos.filter(utxo => !utxo.selected);
    const newUtxos = [...remainingUtxos];

    if (change > 0) {
      const changeUTXO: UTXO = {
        id: `utxo${Date.now()}-change`,
        amount: change,
        selected: false
      };
      newUtxos.push(changeUTXO);
    }

    // Add some new random UTXOs
    const additionalUtxos = generateNewUTXOs();
    newUtxos.push(...additionalUtxos);

    setUtxos(newUtxos);
    setScore(prev => prev + Math.floor(100 * (1 - change/totalInput))); // Higher score for efficient use
    setFeedback('Transaction created successfully!');
    setSpendAmount(0);
    setRecipientAddress('');

    // Level up based on score
    if (score > level * 500) {
      setLevel(prev => prev + 1);
      toast({
        title: "Level Up! 🎮",
        description: `You've reached level ${level + 1}!`,
      });
    }
  };

  const progressToNextLevel = (score / (level * 500)) * 100;

  return (
    <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Level {level}</h3>
            <Progress value={progressToNextLevel} className="w-32" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg">
          <span className="font-bold">Score: {score}</span>
        </div>
      </div>

      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h4 className="text-xl font-semibold text-blue-800 mb-4">Quick Guide: How UTXOs Work</h4>
            <div className="space-y-4">
              <p className="text-gray-700">UTXOs (Unspent Transaction Outputs) work like digital cash:</p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Select one or more UTXOs as inputs (like choosing bills from your wallet)</li>
                <li>Enter how much you want to send</li>
                <li>Paste the recipient's address (or use our sample address below)</li>
                <li>If your selected UTXOs exceed the amount you want to send, you'll get change back as a new UTXO</li>
              </ol>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowGuide(false)}
              >
                Got it!
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-gradient-to-br from-white to-blue-50">
          <h4 className="text-lg font-semibold mb-4">Available UTXOs</h4>
          <AnimatePresence>
            <div className="space-y-3">
              {utxos.map(utxo => (
                <motion.div
                  key={utxo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    utxo.selected 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-500 shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleUTXO(utxo.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Coins className={`h-5 w-5 ${utxo.selected ? 'text-blue-600' : 'text-blue-400'}`} />
                      <span className="font-medium">{utxo.id.split('-')[0]}</span>
                    </div>
                    <span className="font-semibold text-blue-700">{utxo.amount} BTC</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Total Selected: {utxos.filter(u => u.selected).reduce((sum, utxo) => sum + utxo.amount, 0)} BTC
            </p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50">
            <h4 className="text-lg font-semibold mb-4">Create Transaction</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount to Send (BTC)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={spendAmount || ''}
                  onChange={(e) => setSpendAmount(Number(e.target.value))}
                  min="0"
                  step="0.1"
                  placeholder="Enter amount..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Recipient Address</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Enter recipient address"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>Sample address:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">{SAMPLE_ADDRESS}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={createTransaction}
                disabled={!spendAmount || !recipientAddress || !utxos.some(u => u.selected)}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Create Transaction
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-yellow-50">
            <h4 className="text-lg font-semibold mb-4">Achievements</h4>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
                      : 'bg-gray-50 opacity-60'
                  }`}
                >
                  {achievement.icon}
                  <div>
                    <h5 className="font-medium">{achievement.title}</h5>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Sparkles className="h-5 w-5 text-yellow-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert className={feedback.includes('successfully') ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}>
              <AlertDescription className="flex items-center gap-2">
                {feedback.includes('successfully') ? (
                  <Coins className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                {feedback}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transactions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white to-green-50">
              <h4 className="text-lg font-semibold mb-4">Transaction History</h4>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-green-500" />
                      <p className="font-medium text-blue-700">Transaction {index + 1}</p>
                      <span className="text-xs text-gray-500 ml-auto">
                        {new Date(tx.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Inputs: {tx.inputs.map(i => `${i.id.split('-')[0]} (${i.amount} BTC)`).join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Output: {tx.outputs[0].amount} BTC to {tx.outputs[0].address.slice(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-600">Change: {tx.change} BTC</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UTXOExercise;