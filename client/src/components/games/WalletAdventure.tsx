import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Wallet,
  Key,
  Shield,
  Lock,
  Unlock,
  Copy,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Award
} from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  choices: Choice[];
  feedback: {
    correct: string;
    incorrect: string;
  };
  educationalContent: string;
  correctChoice: number;
}

interface Choice {
  id: number;
  text: string;
  explanation: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: JSX.Element;
}

export default function WalletAdventure() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_wallet',
      title: 'Digital Pioneer',
      description: 'Created your first digital wallet',
      unlocked: false,
      icon: <Wallet className="w-6 h-6 text-green-500" />
    },
    {
      id: 'security_master',
      title: 'Security Guardian',
      description: 'Successfully protected your wallet from an attack',
      unlocked: false,
      icon: <Shield className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'recovery_expert',
      title: 'Recovery Expert',
      description: 'Mastered the wallet recovery process',
      unlocked: false,
      icon: <Key className="w-6 h-6 text-purple-500" />
    }
  ]);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Creating Your First Digital Wallet",
      description: "Welcome to the world of cryptocurrency! Let's create your first digital wallet. What's the most important step when setting up a new wallet?",
      choices: [
        {
          id: 1,
          text: "Take a screenshot of the seed phrase and save it in your phone",
          explanation: "Storing seed phrases digitally makes them vulnerable to hacking and device loss."
        },
        {
          id: 2,
          text: "Write down the seed phrase on paper and store it in a secure location",
          explanation: "Correct! Physical backup of seed phrases is the safest method."
        },
        {
          id: 3,
          text: "Skip the seed phrase backup - you can always reset it later",
          explanation: "Never skip backing up your seed phrase - it's your only way to recover your wallet!"
        }
      ],
      feedback: {
        correct: "Perfect! Writing down your seed phrase on paper and storing it securely is essential. This ensures you can recover your wallet even if your device is lost or damaged.",
        incorrect: "That's not the safest approach. Your seed phrase is the master key to your wallet - it needs to be backed up securely offline."
      },
      educationalContent: "A seed phrase is a list of 12 or 24 words that allows you to recover your wallet. Think of it like a master password that gives access to all your crypto assets. Never share it with anyone!",
      correctChoice: 2
    },
    {
      id: 2,
      title: "Wallet Security Setup",
      description: "Now that you have your wallet, let's secure it properly. Which security measure should you enable first?",
      choices: [
        {
          id: 1,
          text: "Enable biometric authentication (fingerprint/face ID)",
          explanation: "Correct! Biometric authentication adds an extra layer of security for daily wallet access."
        },
        {
          id: 2,
          text: "Share the recovery phrase with a trusted friend as backup",
          explanation: "Never share your recovery phrase with anyone, even trusted friends."
        },
        {
          id: 3,
          text: "Use the same password as your email for convenience",
          explanation: "Always use unique, strong passwords for your crypto wallets."
        }
      ],
      feedback: {
        correct: "Excellent! Biometric authentication is a secure and convenient way to protect your wallet from unauthorized access.",
        incorrect: "Think about security first - your wallet needs unique, strong protection methods."
      },
      educationalContent: "Modern wallets offer multiple security features. Biometric authentication, strong passwords, and 2FA all work together to keep your assets safe.",
      correctChoice: 1
    },
    {
      id: 3,
      title: "Creating Your First Wallet",
      description: "You've decided to enter the world of cryptocurrency. What's the first step you should take to secure your digital assets?",
      choices: [
        {
          id: 1,
          text: "Write down the seed phrase on your phone's notes app",
          explanation: "Digital storage of seed phrases is risky as phones can be hacked or lost."
        },
        {
          id: 2,
          text: "Write the seed phrase on paper and store it in a safe place",
          explanation: "This is the safest option! Physical storage, away from internet threats, is best for seed phrases."
        },
        {
          id: 3,
          text: "Share the seed phrase with a trusted friend as backup",
          explanation: "Never share your seed phrase with anyone, even trusted friends."
        }
      ],
      feedback: {
        correct: "Perfect! Writing down your seed phrase on paper and storing it safely is the best practice. This keeps it offline and secure from digital threats.",
        incorrect: "That could be risky! Your seed phrase is like the master key to your wallet - it needs to be stored securely offline."
      },
      educationalContent: "A seed phrase is a sequence of words that gives you access to your crypto wallet. Think of it like a master password that can recover all your funds if you lose access to your wallet.",
      correctChoice: 2
    },
    {
      id: 4,
      title: "Suspicious Website Alert",
      description: "You receive an email claiming to be from your wallet provider asking you to verify your seed phrase. What should you do?",
      choices: [
        {
          id: 1,
          text: "Enter your seed phrase to verify your wallet",
          explanation: "Never enter your seed phrase on any website - legitimate services will never ask for it."
        },
        {
          id: 2,
          text: "Ignore the email and report it as phishing",
          explanation: "Correct! This is a common phishing attempt to steal your crypto."
        },
        {
          id: 3,
          text: "Click the link to check if it's legitimate",
          explanation: "Clicking suspicious links can expose you to malware or phishing sites."
        }
      ],
      feedback: {
        correct: "Excellent choice! Legitimate wallet providers will never ask for your seed phrase. This was a phishing attempt.",
        incorrect: "Be careful! This was a phishing attempt. Never share your seed phrase or click suspicious links."
      },
      educationalContent: "Phishing is a common attack where scammers pretend to be legitimate services to steal your credentials. Always be suspicious of emails asking for sensitive information.",
      correctChoice: 2
    },
    {
      id: 5,
      title: "Wallet Recovery Challenge",
      description: "You've gotten a new phone and need to recover your wallet. What's the correct order of steps?",
      choices: [
        {
          id: 1,
          text: "Install wallet app → Enter seed phrase → Verify recovery",
          explanation: "This is the correct sequence for safe wallet recovery."
        },
        {
          id: 2,
          text: "Download wallet → Start using immediately → Enter seed phrase later",
          explanation: "You should verify recovery immediately to ensure access to your funds."
        },
        {
          id: 3,
          text: "Share recovery details with support → Let them help recover",
          explanation: "Never share recovery details with anyone, including support staff."
        }
      ],
      feedback: {
        correct: "Perfect sequence! This ensures a safe and proper wallet recovery process.",
        incorrect: "This method could put your funds at risk. The safe way is to install the app and immediately verify recovery with your seed phrase."
      },
      educationalContent: "Wallet recovery is a critical process. Always verify you can recover your wallet before storing significant funds in it.",
      correctChoice: 1
    }
  ];

  const startGame = () => {
    setIsPlaying(true);
    setCurrentScenario(0);
    setScore(0);
    setShowTutorial(true);
    setShowExplanation(false);
  };

  const handleChoice = (choiceId: number) => {
    const scenario = scenarios[currentScenario];
    const isCorrect = choiceId === scenario.correctChoice;

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback(scenario.feedback.correct);

      // Check for achievements
      const newAchievements = [...achievements];
      if (currentScenario === 0 && !newAchievements[0].unlocked) {
        newAchievements[0].unlocked = true;
        setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Digital Pioneer!`);
      } else if (currentScenario === 1 && !newAchievements[1].unlocked) {
        newAchievements[1].unlocked = true;
        setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Security Guardian!`);
      } else if (currentScenario === 2 && !newAchievements[2].unlocked) {
        newAchievements[2].unlocked = true;
        setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Recovery Expert!`);
      }
      setAchievements(newAchievements);
    } else {
      setFeedback(scenario.feedback.incorrect);
    }

    setShowExplanation(true);

    // Progress to next scenario after delay
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setShowExplanation(false);
        setFeedback('');
      } else {
        setFeedback('🎓 Congratulations! You\'ve completed the Wallet Adventure and learned essential wallet security practices! Keep your crypto safe! 🌟');
      }
    }, 3000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Crypto Wallet Adventure</h2>
        <p className="text-gray-600">
          Master wallet security through an interactive adventure! 🔐
        </p>
        {isPlaying && (
          <div className="mt-4">
            <span className="text-xl font-semibold text-blue-600">Score: {score}</span>
            <span className="ml-4 text-sm text-gray-500">Scenario {currentScenario + 1}/{scenarios.length}</span>
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Welcome to Wallet Adventure! 🎮</h3>
            <div className="text-left space-y-4">
              <p className="text-blue-700">
                <span className="font-semibold">What is this game?</span><br/>
                Learn how to securely manage your cryptocurrency wallet through interactive scenarios! Perfect for beginners!
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-2">
                  <li>Face real-world wallet security scenarios</li>
                  <li>Make choices to protect your digital assets</li>
                  <li>Learn from detailed explanations</li>
                  <li>Earn achievements for mastering security</li>
                  <li>Practice safe wallet management</li>
                </ul>
              </div>
            </div>
          </div>
          <Button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Your Adventure! 🚀
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
                    <h3 className="font-semibold text-yellow-800 mb-2">Wallet Security Basics</h3>
                    <p className="text-yellow-700 mb-4">
                      Remember these key points:
                      <br />• Your seed phrase is your wallet's master key
                      <br />• Never share your private keys or seed phrase
                      <br />• Always verify websites and apps
                      <br />• Keep backups secure and offline
                    </p>
                    <Button
                      onClick={() => setShowTutorial(false)}
                      variant="outline"
                      className="bg-yellow-100"
                    >
                      Ready to Start! 🔐
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Scenario */}
          <AnimatePresence mode="wait">
            {currentScenario < scenarios.length && (
              <motion.div
                key={scenarios[currentScenario].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Key className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-700">
                    {scenarios[currentScenario].title}
                  </h3>
                </div>

                <p className="text-gray-700 mb-6">{scenarios[currentScenario].description}</p>

                <div className="space-y-4">
                  {scenarios[currentScenario].choices.map((choice) => (
                    <Button
                      key={choice.id}
                      onClick={() => handleChoice(choice.id)}
                      variant="outline"
                      className="w-full text-left justify-start hover:bg-blue-50"
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 bg-blue-50 p-4 rounded-lg"
                  >
                    <p className="text-blue-700">
                      <span className="font-semibold">Learn:</span> {scenarios[currentScenario].educationalContent}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback Message */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-lg ${
                  feedback.includes('Congratulations') || feedback.includes('Perfect')
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Achievements */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Achievements</h3>
            <div className="space-y-2">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-2 p-2 rounded ${
                    achievement.unlocked ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  {achievement.icon}
                  <div>
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Award className="w-5 h-5 text-yellow-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </Card>

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