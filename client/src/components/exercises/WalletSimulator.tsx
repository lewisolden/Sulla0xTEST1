import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet, 
  Key, 
  Send, 
  Download, 
  Lock,
  CheckCircle2,
  AlertCircle,
  ClipboardCopy,
  Info
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
  const [verificationStep, setVerificationStep] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const generateWallet = () => {
    const newWallet: WalletState = {
      address: '0x' + Math.random().toString(16).slice(2, 42),
      privateKey: Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      balance: 100,
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

  const verifyRecoveryPhrase = (word: string, index: number) => {
    if (!wallet) return;

    if (word === wallet.backupPhrase[verificationStep]) {
      setSelectedWords([...selectedWords, word]);
      setVerificationError('');

      if (verificationStep === 2) { // We're verifying 3 random words (0,1,2)
        setVerificationSuccess(true);
        setHasBackedUp(true);
      } else {
        setVerificationStep(verificationStep + 1);
      }
    } else {
      setVerificationError('Incorrect word. Please try again.');
    }
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
        <h2 className="text-2xl font-bold text-blue-800">Interactive Wallet Practice</h2>
        <p className="text-gray-600">
          Learn how to manage a cryptocurrency wallet in this safe, simulated environment.
          Follow each step carefully - in real-world scenarios, these actions will involve actual funds.
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
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <p className="text-blue-800">Why Create a Wallet?</p>
                  <p className="text-sm text-blue-600">
                    A cryptocurrency wallet is your gateway to the blockchain. It:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
                    <li>Stores your digital assets</li>
                    <li>Manages your private keys</li>
                    <li>Enables sending and receiving crypto</li>
                  </ul>
                </div>
              </div>
            </div>
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
                <div>
                  <h4 className="font-semibold mb-2">Your Wallet Address</h4>
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <code className="text-sm">{wallet.address}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(wallet.address)}
                    >
                      <ClipboardCopy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    This is your public address - you can share it to receive crypto.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Private Key</h4>
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <code className="text-sm">
                      {showPrivateKey ? wallet.privateKey : '************************'}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Never share your private key - it gives complete control over your funds.
                  </p>
                </div>

                <Button onClick={() => setStep(2)} className="w-full">
                  Continue to Recovery Phrase Backup
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

            <Alert className="mb-4">
              <AlertDescription>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium text-red-800">Critical Security Step</p>
                    <p className="text-sm text-red-600">
                      Your recovery phrase is the ONLY way to restore your wallet if you lose access.
                      Write these 12 words down in order and store them securely.
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {wallet.backupPhrase.map((word, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded text-center">
                  <span className="text-gray-500 mr-2">{index + 1}.</span>
                  <span className="font-medium">{word}</span>
                </div>
              ))}
            </div>

            {!verificationSuccess ? (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Verify Word #{verificationStep + 1}
                  </h4>
                  <p className="text-sm text-yellow-600 mb-4">
                    Enter word #{verificationStep + 1} from your recovery phrase to prove you've backed it up.
                  </p>
                  <Input
                    type="text"
                    placeholder={`Enter word #${verificationStep + 1}`}
                    className="mb-2"
                    onChange={(e) => verifyRecoveryPhrase(e.target.value, verificationStep)}
                  />
                  {verificationError && (
                    <p className="text-sm text-red-500">{verificationError}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <p className="text-green-800">Recovery phrase verified successfully!</p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!verificationSuccess}
              >
                Continue to Transactions
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

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">Transaction Practice</p>
                  <p className="text-sm text-blue-600">
                    Learn how transactions work in a safe environment. Watch how transactions
                    start as 'pending' and then get 'confirmed' by the network.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-2xl font-bold">{wallet.balance} TEST</p>
              </div>
              <Button onClick={simulateTransaction} className="gap-2">
                <Send className="h-4 w-4" />
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

              {wallet.transactions.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No transactions yet. Click 'Simulate Transaction' to start.
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(4)}
                disabled={wallet.transactions.length === 0}
              >
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

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">Security Best Practices</p>
                  <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
                    <li>Always backup your recovery phrase</li>
                    <li>Enable additional security features</li>
                    <li>Never share private keys or recovery phrases</li>
                    <li>Use strong, unique passwords</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className={`h-5 w-5 ${wallet.isSecure ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={wallet.isSecure ? 'text-green-500' : 'text-gray-600'}>
                  Wallet Security Status
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant={verificationSuccess ? "default" : "outline"}
                  className="justify-start"
                  disabled={verificationSuccess}
                >
                  <CheckCircle2 className={`h-4 w-4 mr-2 ${verificationSuccess ? 'text-green-500' : 'text-gray-400'}`} />
                  Recovery Phrase Verified
                </Button>

                <Button
                  onClick={secureWallet}
                  variant={wallet.isSecure ? "default" : "outline"}
                  className="justify-start"
                  disabled={wallet.isSecure || !verificationSuccess}
                >
                  <Key className={`h-4 w-4 mr-2 ${wallet.isSecure ? 'text-green-500' : 'text-gray-400'}`} />
                  Enable Additional Security
                </Button>
              </div>

              {wallet.isSecure && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-green-800">
                        Congratulations! Your wallet is now secure.
                      </p>
                      <p className="text-sm text-green-600">
                        You've completed all the essential security steps for your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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