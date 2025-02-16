import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

interface UTXO {
  id: string;
  amount: number;
  selected: boolean;
}

interface Transaction {
  inputs: UTXO[];
  outputs: { address: string; amount: number }[];
  change: number; // Change type to be non-optional
}

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
      change // Now guaranteed to be defined
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
      <div className="prose dark:prose-invert max-w-none">
        <h3>UTXO Transaction Exercise</h3>
        <p>
          Learn how Bitcoin transactions work using UTXOs (Unspent Transaction Outputs).
          Select input UTXOs, specify an amount to spend, and create transactions.
          Watch how change UTXOs are created when you don't spend the entire input amount.
        </p>
      </div>

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
                  <span>{utxo.amount} BTC</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-lg font-semibold mb-4">Create Transaction</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Amount to Spend (BTC)</label>
              <input
                type="number"
                value={spendAmount}
                onChange={(e) => setSpendAmount(Number(e.target.value))}
                className="w-full p-2 border rounded"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Recipient Address</label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter recipient address"
              />
            </div>
            <Button 
              onClick={createTransaction}
              disabled={!spendAmount || !recipientAddress || !utxos.some(u => u.selected)}
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