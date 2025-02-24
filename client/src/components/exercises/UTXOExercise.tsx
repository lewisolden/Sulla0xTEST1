import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { Coins, Copy, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UTXO {
  id: string;
  amount: number;
  selected: boolean;
}

interface Transaction {
  inputs: UTXO[];
  outputs: { address: string; amount: number }[];
  change: number;
}

const SAMPLE_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

export const UTXOExercise = () => {
  const [utxos, setUtxos] = useState<UTXO[]>([
    { id: 'utxo1', amount: 5, selected: false },
    { id: 'utxo2', amount: 3, selected: false },
    { id: 'utxo3', amount: 2, selected: false },
  ]);
  const [spendAmount, setSpendAmount] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  const copyAddress = () => {
    navigator.clipboard.writeText(SAMPLE_ADDRESS);
    setFeedback('Address copied to clipboard!');
    setTimeout(() => setFeedback(''), 2000);
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

    const change = totalInput - spendAmount;
    const newTransaction: Transaction = {
      inputs: selectedUTXOs,
      outputs: [{ address: recipientAddress, amount: spendAmount }],
      change
    };

    setTransactions([...transactions, newTransaction]);

    // Create new UTXOs from change
    const remainingUtxos = utxos.filter(utxo => !utxo.selected);
    if (change > 0) {
      const changeUTXO: UTXO = {
        id: `utxo${Date.now()}`,
        amount: change,
        selected: false
      };
      setUtxos([...remainingUtxos, changeUTXO]);
    } else {
      setUtxos(remainingUtxos);
    }

    setFeedback('Transaction created successfully!');
    setSpendAmount(0);
    setRecipientAddress('');
  };

  return (
    <div className="space-y-6 bg-white rounded-lg p-6 shadow-lg">
      {showGuide && (
        <Card className="p-6 bg-blue-50 border-blue-200">
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
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Available UTXOs</h4>
          <div className="space-y-3">
            {utxos.map(utxo => (
              <motion.div
                key={utxo.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  utxo.selected ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleUTXO(utxo.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{utxo.id}</span>
                  </div>
                  <span className="font-semibold text-blue-700">{utxo.amount} BTC</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Total Selected: {utxos.filter(u => u.selected).reduce((sum, utxo) => sum + utxo.amount, 0)} BTC
            </p>
          </div>
        </Card>

        <Card className="p-6">
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
              className="w-full mt-4"
            >
              Create Transaction
            </Button>
          </div>
        </Card>
      </div>

      {feedback && (
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
      )}

      {transactions.length > 0 && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Transaction History</h4>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-medium text-blue-700">Transaction {index + 1}</p>
                <p className="text-sm text-gray-600">
                  Inputs: {tx.inputs.map(i => `${i.id} (${i.amount} BTC)`).join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  Output: {tx.outputs[0].amount} BTC to {tx.outputs[0].address}
                </p>
                <p className="text-sm text-gray-600">Change: {tx.change} BTC</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default UTXOExercise;