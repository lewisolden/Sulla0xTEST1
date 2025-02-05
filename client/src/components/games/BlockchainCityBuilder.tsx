import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Coins,
  Factory,
  Home,
  Power,
  Users,
  Award,
  Code,
  Server,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

interface Building {
  id: string;
  type: 'residential' | 'commercial' | 'industrial' | 'powerPlant' | 'dataCenter';
  name: string;
  cost: number;
  energy: number;
  population: number;
  income: number;
  smartContracts: number;
  icon: JSX.Element;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: JSX.Element;
}

export default function BlockchainCityBuilder() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [coins, setCoins] = useState(1000);
  const [energy, setEnergy] = useState(100);
  const [population, setPopulation] = useState(0);
  const [smartContracts, setSmartContracts] = useState(0);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_building',
      title: 'Foundation Layer',
      description: 'Built your first structure',
      unlocked: false,
      icon: <Building2 className="w-6 h-6 text-green-500" />
    },
    {
      id: 'smart_city',
      title: 'Smart City Pioneer',
      description: 'Deployed 5 smart contracts',
      unlocked: false,
      icon: <Code className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'sustainable',
      title: 'Sustainable Future',
      description: 'Achieved positive energy balance',
      unlocked: false,
      icon: <Power className="w-6 h-6 text-yellow-500" />
    }
  ]);

  const buildingTypes: Building[] = [
    {
      id: 'residential',
      type: 'residential',
      name: 'Smart Home Complex',
      cost: 200,
      energy: -10,
      population: 50,
      income: 20,
      smartContracts: 1,
      icon: <Home className="w-6 h-6" />,
      description: 'Residential area with integrated smart contracts for utility management'
    },
    {
      id: 'commercial',
      type: 'commercial',
      name: 'DeFi Center',
      cost: 400,
      energy: -20,
      population: 0,
      income: 50,
      smartContracts: 2,
      icon: <Coins className="w-6 h-6" />,
      description: 'Commercial hub for decentralized financial services'
    },
    {
      id: 'industrial',
      type: 'industrial',
      name: 'Token Factory',
      cost: 600,
      energy: -40,
      population: 0,
      income: 80,
      smartContracts: 3,
      icon: <Factory className="w-6 h-6" />,
      description: 'Industrial facility for token generation and smart contract development'
    },
    {
      id: 'powerPlant',
      type: 'powerPlant',
      name: 'Green Energy Plant',
      cost: 800,
      energy: 100,
      population: 0,
      income: -20,
      smartContracts: 1,
      icon: <Power className="w-6 h-6" />,
      description: 'Sustainable energy source with blockchain-based distribution'
    },
    {
      id: 'dataCenter',
      type: 'dataCenter',
      name: 'Blockchain Node',
      cost: 1000,
      energy: -50,
      population: 0,
      income: 100,
      smartContracts: 5,
      icon: <Server className="w-6 h-6" />,
      description: 'Data center running blockchain nodes and smart contract validation'
    }
  ];

  useEffect(() => {
    // Resource generation loop
    const interval = setInterval(() => {
      if (isPlaying) {
        // Calculate resource changes
        const energyChange = buildings.reduce((sum, b) => sum + b.energy, 0);
        const incomeChange = buildings.reduce((sum, b) => sum + b.income, 0);
        
        setEnergy(prev => prev + energyChange);
        setCoins(prev => prev + incomeChange);

        // Check achievements
        checkAchievements();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, buildings]);

  const startGame = () => {
    setIsPlaying(true);
    setCoins(1000);
    setEnergy(100);
    setPopulation(0);
    setSmartContracts(0);
    setBuildings([]);
    setShowTutorial(true);
  };

  const buildStructure = (buildingType: Building) => {
    if (coins < buildingType.cost) {
      setFeedback('❌ Not enough coins to build this structure');
      return;
    }

    setCoins(prev => prev - buildingType.cost);
    setBuildings(prev => [...prev, { ...buildingType, id: Math.random().toString() }]);
    setPopulation(prev => prev + buildingType.population);
    setSmartContracts(prev => prev + buildingType.smartContracts);
    
    setFeedback(`✅ Built new ${buildingType.name}!`);
    checkAchievements();
  };

  const checkAchievements = () => {
    const newAchievements = [...achievements];
    
    // First building achievement
    if (!newAchievements[0].unlocked && buildings.length > 0) {
      newAchievements[0].unlocked = true;
      setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Foundation Layer!`);
    }

    // Smart city achievement
    if (!newAchievements[1].unlocked && smartContracts >= 5) {
      newAchievements[1].unlocked = true;
      setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Smart City Pioneer!`);
    }

    // Sustainable achievement
    if (!newAchievements[2].unlocked && buildings.reduce((sum, b) => sum + b.energy, 0) > 0) {
      newAchievements[2].unlocked = true;
      setFeedback(prev => `${prev}\n🏆 Achievement unlocked: Sustainable Future!`);
    }

    setAchievements(newAchievements);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Blockchain City Builder</h2>
        <p className="text-gray-600">
          Build a smart city powered by blockchain technology! 🏗️
        </p>
        {isPlaying && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{coins}</span>
              </div>
              <p className="text-sm text-gray-500">Coins</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Power className="w-5 h-5 text-green-500" />
                <span className="font-semibold">{energy}</span>
              </div>
              <p className="text-sm text-gray-500">Energy</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{population}</span>
              </div>
              <p className="text-sm text-gray-500">Population</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <Code className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">{smartContracts}</span>
              </div>
              <p className="text-sm text-gray-500">Smart Contracts</p>
            </div>
          </div>
        )}
      </div>

      {!isPlaying ? (
        <div className="text-center">
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Welcome to Blockchain City! 🌆</h3>
            <div className="text-left space-y-4">
              <p className="text-blue-700">
                <span className="font-semibold">What is this game?</span><br/>
                Build and manage your own blockchain-powered smart city! Learn about distributed systems, smart contracts, and sustainable development.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">How to Play:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-2">
                  <li>Build different types of structures</li>
                  <li>Manage resources like energy and coins</li>
                  <li>Deploy smart contracts for automation</li>
                  <li>Balance population and sustainability</li>
                  <li>Unlock achievements as you grow</li>
                </ul>
              </div>
            </div>
          </div>
          <Button 
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Building! 🏗️
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
                  <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Quick Guide to City Building</h3>
                    <p className="text-yellow-700 mb-4">
                      Tips for success:
                      <br />• Start with residential buildings to grow population
                      <br />• Balance energy consumption with power plants
                      <br />• Use commercial buildings to generate income
                      <br />• Deploy data centers for more smart contracts
                    </p>
                    <Button
                      onClick={() => setShowTutorial(false)}
                      variant="outline"
                      className="bg-yellow-100"
                    >
                      Let's Build! 🏗️
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Building Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildingTypes.map(building => (
              <Card
                key={building.id}
                className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => buildStructure(building)}
              >
                <div className="flex items-start gap-3">
                  {building.icon}
                  <div>
                    <h3 className="font-semibold text-blue-800">{building.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{building.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-yellow-600">Cost: {building.cost} 🪙</span>
                      <span className="text-green-600">Energy: {building.energy}</span>
                      {building.population > 0 && (
                        <span className="text-blue-600">Pop: +{building.population}</span>
                      )}
                      <span className="text-purple-600">Contracts: +{building.smartContracts}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* City View */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Your City</h3>
            <div className="space-y-2">
              {buildings.map((building, index) => (
                <motion.div
                  key={building.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 bg-white p-2 rounded-lg"
                >
                  {building.icon}
                  <div>
                    <p className="font-semibold">{building.name}</p>
                    <p className="text-sm text-gray-600">
                      Energy: {building.energy} | Income: {building.income}/cycle
                    </p>
                  </div>
                </motion.div>
              ))}
              {buildings.length === 0 && (
                <p className="text-center text-gray-500">Start building your city!</p>
              )}
            </div>
          </Card>

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

          {/* Feedback Messages */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-700"
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>

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
