import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Send, Wallet, Clock, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  address: string;
  timestamp: Date;
}

interface WalletState {
  balance: number;
  address: string;
  transactions: Transaction[];
}

export default function WalletSimulator() {
  const [wallet, setWallet] = useState<WalletState>({
    balance: 1.0, // Start with 1 BTC
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // Example address
    transactions: []
  });

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    const sendAmount = parseFloat(amount);
    if (isNaN(sendAmount) || sendAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    if (sendAmount > wallet.balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough BTC for this transaction",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: "send",
      amount: sendAmount,
      address: recipientAddress,
      timestamp: new Date(),
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - sendAmount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    setAmount("");
    setRecipientAddress("");

    toast({
      title: "Transaction sent",
      description: `Successfully sent ${sendAmount} BTC to ${recipientAddress}`,
    });
  };

  const handleReceive = () => {
    const receiveAmount = 0.1; // Simulate receiving 0.1 BTC
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: "receive",
      amount: receiveAmount,
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // Example sender address
      timestamp: new Date(),
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance + receiveAmount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    toast({
      title: "BTC Received",
      description: `Successfully received ${receiveAmount} BTC`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link href="/modules/module1">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Module
          </Button>
        </Link>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold text-blue-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Virtual Bitcoin Wallet
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Overview */}
        <Card className="p-6 col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Wallet className="h-6 w-6" /> Wallet Overview
            </h2>
            <Button onClick={handleReceive} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="h-4 w-4 mr-2" /> Receive Test BTC
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-600">Balance</div>
              <div className="text-2xl font-bold">{wallet.balance.toFixed(8)} BTC</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Wallet Address</div>
              <div className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                {wallet.address}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Amount (BTC)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.00000001"
              min="0"
            />
            <Button
              onClick={handleSend}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!amount || !recipientAddress}
            >
              <Send className="h-4 w-4 mr-2" /> Send BTC
            </Button>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-6 w-6" /> Transaction History
          </h2>
          <div className="space-y-4">
            {wallet.transactions.map((tx) => (
              <div
                key={tx.id}
                className={`p-3 rounded ${
                  tx.type === 'receive' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium">
                    {tx.type === 'receive' ? 'Received' : 'Sent'}{' '}
                    {tx.amount.toFixed(8)} BTC
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {tx.timestamp.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-gray-600 mt-1 break-all">
                  {tx.type === 'receive' ? 'From: ' : 'To: '}{tx.address}
                </div>
              </div>
            ))}
            {wallet.transactions.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No transactions yet
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
