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
  TrendingUp,
  TrendingDown,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [cityGrid, setCityGrid] = useState<(Building | null)[][]>(
    Array(5).fill(null).map(() => Array(5).fill(null))
  );
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [resourceTrends, setResourceTrends] = useState({
    coins: [] as number[],
    energy: [] as number[],
    population: [] as number[],
    smartContracts: [] as number[]
  });
  const { toast } = useToast();
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

  const findEmptyCell = () => {
    for (let row = 0; row < cityGrid.length; row++) {
      for (let col = 0; col < cityGrid[0].length; col++) {
        if (!cityGrid[row][col]) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const buildStructure = (buildingType: Building) => {
    if (coins < buildingType.cost) {
      toast({
        title: "Insufficient Funds",
        description: `You need ${buildingType.cost} coins to build this structure.`,
        variant: "destructive"
      });
      return;
    }

    const emptyCell = selectedCell || findEmptyCell();
    if (!emptyCell) {
      toast({
        title: "No Space Available",
        description: "Expand your city to build more structures.",
        variant: "destructive"
      });
      return;
    }

    setCoins(prev => prev - buildingType.cost);
    const newBuilding = { ...buildingType, id: Math.random().toString() };
    setBuildings(prev => [...prev, newBuilding]);

    // Update city grid
    const newGrid = [...cityGrid];
    newGrid[emptyCell.row][emptyCell.col] = newBuilding;
    setCityGrid(newGrid);

    // Update resources
    setPopulation(prev => prev + buildingType.population);
    setSmartContracts(prev => prev + buildingType.smartContracts);

    toast({
      title: "Building Constructed!",
      description: `New ${buildingType.name} added to your city.`,
      variant: "default"
    });

    checkAchievements();
  };

  useEffect(() => {
    // Resource generation loop
    const interval = setInterval(() => {
      if (isPlaying) {
        // Calculate resource changes
        const energyChange = buildings.reduce((sum, b) => sum + b.energy, 0);
        const incomeChange = buildings.reduce((sum, b) => sum + b.income, 0);

        setEnergy(prev => prev + energyChange);
        setCoins(prev => prev + incomeChange);

        // Update resource trends
        setResourceTrends(prev => ({
          coins: [...prev.coins.slice(-11), coins].slice(-12),
          energy: [...prev.energy.slice(-11), energy].slice(-12),
          population: [...prev.population.slice(-11), population].slice(-12),
          smartContracts: [...prev.smartContracts.slice(-11), smartContracts].slice(-12)
        }));

        checkAchievements();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, buildings, coins, energy, population, smartContracts]);


  const startGame = () => {
    setIsPlaying(true);
    setCoins(1000);
    setEnergy(100);
    setPopulation(0);
    setSmartContracts(0);
    setBuildings([]);
    setCityGrid(Array(5).fill(null).map(() => Array(5).fill(null)));
    setShowTutorial(true);
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

  const renderResourceIndicator = (
    icon: JSX.Element,
    value: number,
    label: string,
    trend: number[]
  ) => {
    const trendChange = trend.length >= 2 
      ? ((trend[trend.length - 1] - trend[trend.length - 2]) / Math.abs(trend[trend.length - 2] || 1)) * 100 
      : 0;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-2">
                {icon}
                <span className="font-semibold">{value}</span>
                {trendChange !== 0 && (
                  <span className={`text-xs ${trendChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trendChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(trendChange).toFixed(1)}%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Current {label.toLowerCase()}: {value}</p>
            <p className="text-sm text-gray-500">
              {trendChange > 0 ? 'Growing' : trendChange < 0 ? 'Declining' : 'Stable'}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderCityGrid = () => (
    <div className="grid grid-cols-5 gap-2 bg-blue-50 p-4 rounded-lg">
      {cityGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-16 h-16 rounded-lg transition-all duration-300 cursor-pointer
                ${cell ? 'bg-blue-200' : 'bg-white hover:bg-blue-100'}
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
            >
              {cell && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-full h-full flex items-center justify-center">
                        {cell.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{cell.name}</p>
                      <p className="text-sm">Energy: {cell.energy}/cycle</p>
                      <p className="text-sm">Income: {cell.income}/cycle</p>
                      {cell.population > 0 && <p className="text-sm">Population: +{cell.population}</p>}
                      <p className="text-sm">Smart Contracts: +{cell.smartContracts}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Blockchain City Builder</h2>
        <p className="text-gray-600">
          Build a smart city powered by blockchain technology! 🏗️
        </p>
        {isPlaying && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderResourceIndicator(<Coins className="w-5 h-5 text-yellow-500" />, coins, "Coins", resourceTrends.coins)}
            {renderResourceIndicator(<Power className="w-5 h-5 text-green-500" />, energy, "Energy", resourceTrends.energy)}
            {renderResourceIndicator(<Users className="w-5 h-5 text-blue-500" />, population, "Population", resourceTrends.population)}
            {renderResourceIndicator(<Code className="w-5 h-5 text-purple-500" />, smartContracts, "Smart Contracts", resourceTrends.smartContracts)}
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

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">City Layout</h3>
              {renderCityGrid()}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Available Buildings</h3>
              <div className="space-y-4">
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
            </div>
          </div>

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