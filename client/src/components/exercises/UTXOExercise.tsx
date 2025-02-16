import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

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
    if (change > 0) {
      const changeUTXO: UTXO = {
        id: `utxo${utxos.length + 1}`,
        amount: change,
        selected: false
      };

      setUtxos([
        ...utxos.filter(utxo => !utxo.selected),
        changeUTXO
      ]);
    } else {
      setUtxos(utxos.filter(utxo => !utxo.selected));
    }

    setFeedback('Transaction created successfully!');
    setSpendAmount(0);
    setRecipientAddress('');
  };

  return (
    <div className="space-y-6 p-4">
      {showGuide && (
        <Card className="p-6 bg-blue-50">
          <h4 className="text-xl font-semibold text-blue-800 mb-4">Quick Guide: How UTXOs Work</h4>
          <div className="space-y-4">
            <p>UTXOs (Unspent Transaction Outputs) work like digital cash:</p>
            <ol className="list-decimal pl-5 space-y-2">
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h4 className="text-lg font-semibold mb-4">Available UTXOs</h4>
          <div className="space-y-2">
            {utxos.map(utxo => (
              <motion.div
                key={utxo.id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  utxo.selected ? 'bg-primary/20 border-primary' : 'bg-background'
                }`}
                onClick={() => toggleUTXO(utxo.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{utxo.id}</span>
                  <span className="font-semibold">{utxo.amount} BTC</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Total Selected: {utxos.filter(u => u.selected).reduce((sum, utxo) => sum + utxo.amount, 0)} BTC
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-lg font-semibold mb-4">Create Transaction</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Amount to Send (BTC)</label>
              <input
                type="number"
                value={spendAmount}
                onChange={(e) => setSpendAmount(Number(e.target.value))}
                className="w-full p-2 border rounded"
                min="0"
                step="0.1"
                placeholder="Enter amount..."
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Recipient Address</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter recipient address"
                />
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span>Sample address:</span>
                <code className="bg-gray-100 px-2 py-1 rounded">{SAMPLE_ADDRESS}</code>
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
              className="w-full"
            >
              Create Transaction
            </Button>
          </div>
        </Card>
      </div>

      {feedback && (
        <Alert>
          <AlertDescription>{feedback}</AlertDescription>
        </Alert>
      )}

      {transactions.length > 0 && (
        <Card className="p-4">
          <h4 className="text-lg font-semibold mb-4">Transaction History</h4>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-medium">Transaction {index + 1}</p>
                <p>Inputs: {tx.inputs.map(i => `${i.id} (${i.amount} BTC)`).join(', ')}</p>
                <p>Output: {tx.outputs[0].amount} BTC to {tx.outputs[0].address}</p>
                <p>Change: {tx.change} BTC</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};