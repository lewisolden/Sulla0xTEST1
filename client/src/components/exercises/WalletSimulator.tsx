import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  Key, 
  Send, 
  Download, 
  Lock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

type WalletState = {
  address: string;
  privateKey: string;
  balance: number;
  transactions: Transaction[];
  backupPhrase: string[];
  isSecure: boolean;
};

type Transaction = {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed';
};

export default function WalletSimulator() {
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [hasBackedUp, setHasBackedUp] = useState(false);

  const generateWallet = () => {
    // Simulate wallet creation with test data
    const newWallet: WalletState = {
      address: '0x' + Math.random().toString(16).slice(2, 42),
      privateKey: Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      balance: 100, // Test balance
      transactions: [],
      backupPhrase: Array.from({length: 12}, () => generateWord()),
      isSecure: false
    };
    setWallet(newWallet);
  };

  const generateWord = () => {
    const words = ['apple', 'banana', 'cherry', 'dragon', 'elephant', 'flower', 
                  'guitar', 'honey', 'island', 'jungle', 'kettle', 'lemon', 
                  'mountain', 'needle', 'orange', 'pencil', 'queen', 'river', 
                  'summer', 'tiger', 'umbrella', 'violin', 'window', 'yellow'];
    return words[Math.floor(Math.random() * words.length)];
  };

  const simulateTransaction = () => {
    if (!wallet) return;
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: Math.random() > 0.5 ? 'send' : 'receive',
      amount: Math.floor(Math.random() * 10) + 1,
      timestamp: new Date(),
      status: 'pending'
    };

    setWallet(prev => {
      if (!prev) return prev;
      const newBalance = newTransaction.type === 'send' 
        ? prev.balance - newTransaction.amount 
        : prev.balance + newTransaction.amount;
      
      return {
        ...prev,
        balance: newBalance,
        transactions: [...prev.transactions, newTransaction]
      };
    });

    // Simulate confirmation after 2 seconds
    setTimeout(() => {
      setWallet(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          transactions: prev.transactions.map(t => 
            t.id === newTransaction.id 
              ? {...t, status: 'confirmed'} 
              : t
          )
        };
      });
    }, 2000);
  };

  const secureWallet = () => {
    if (!hasBackedUp) return;
    setWallet(prev => prev ? {...prev, isSecure: true} : null);
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-blue-800">Wallet Practice Environment</h2>
        <p className="text-gray-600">
          Learn how to manage a cryptocurrency wallet in a safe, simulated environment.
          No real funds are involved.
        </p>
      </div>

      <Progress value={(step / 4) * 100} className="w-full" />

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Step 1: Create Your Test Wallet</h3>
            <p className="text-gray-600 mb-4">
              Start by creating a test wallet. This will generate a unique address and private key
              for practice purposes.
            </p>
            <Button 
              onClick={generateWallet}
              className="gap-2"
              disabled={wallet !== null}
            >
              <Wallet className="h-4 w-4" />
              Generate Test Wallet
            </Button>
          </Card>

          {wallet && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Wallet Address</h4>
                  <code className="bg-gray-100 p-2 rounded">{wallet.address}</code>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Private Key</h4>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 p-2 rounded">
                      {showPrivateKey ? wallet.privateKey : '************************'}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full">
                  Continue to Backup
                </Button>
              </div>
            </Card>
          )}
        </motion.div>
      )}

      {step === 2 && wallet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Step 2: Backup Your Recovery Phrase</h3>
            <p className="text-gray-600 mb-4">
              Your recovery phrase is crucial for wallet recovery. In a real wallet,
              never share these words with anyone.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {wallet.backupPhrase.map((word, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded text-center">
                  <span className="text-gray-500 mr-2">{index + 1}.</span>
                  {word}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => {
                  setHasBackedUp(true);
                  setStep(3);
                }}
              >
                I've Backed Up My Phrase
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {step === 3 && wallet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Step 3: Practice Transactions</h3>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-2xl font-bold">{wallet.balance} TEST</p>
              </div>
              <Button onClick={simulateTransaction}>
                Simulate Transaction
              </Button>
            </div>

            <div className="space-y-4">
              {wallet.transactions.map(tx => (
                <div 
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-2">
                    {tx.type === 'send' ? (
                      <Send className="h-4 w-4 text-red-500" />
                    ) : (
                      <Download className="h-4 w-4 text-green-500" />
                    )}
                    <span className={tx.type === 'send' ? 'text-red-500' : 'text-green-500'}>
                      {tx.type === 'send' ? '-' : '+'}{tx.amount} TEST
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {tx.status === 'confirmed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </span>
                    {tx.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)}>
                Continue to Security
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {step === 4 && wallet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Step 4: Secure Your Wallet</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className={`h-5 w-5 ${wallet.isSecure ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={wallet.isSecure ? 'text-green-500' : 'text-gray-600'}>
                  Wallet Security Status
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant={hasBackedUp ? "default" : "outline"}
                  className="justify-start"
                  disabled={hasBackedUp}
                >
                  <CheckCircle2 className={`h-4 w-4 mr-2 ${hasBackedUp ? 'text-green-500' : 'text-gray-400'}`} />
                  Recovery Phrase Backed Up
                </Button>
                
                <Button
                  onClick={secureWallet}
                  variant={wallet.isSecure ? "default" : "outline"}
                  className="justify-start"
                  disabled={wallet.isSecure || !hasBackedUp}
                >
                  <Key className={`h-4 w-4 mr-2 ${wallet.isSecure ? 'text-green-500' : 'text-gray-400'}`} />
                  Enable Additional Security
                </Button>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(1)}
                  variant="default"
                  disabled={!wallet.isSecure}
                >
                  Complete Practice
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
