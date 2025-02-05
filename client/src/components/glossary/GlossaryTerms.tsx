import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

interface Term {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: string;
  visualAid?: string;
  examples: string[];
  relatedTerms: string[];
}

// Mock data - In a real app, this would come from the API
const mockGlossaryTerms: Term[] = [
  {
    id: "bitcoin",
    term: "Bitcoin",
    definition: "The first and most well-known cryptocurrency, created by Satoshi Nakamoto in 2009. Bitcoin operates on a decentralized peer-to-peer network using blockchain technology and proof-of-work consensus mechanism.",
    category: "Cryptocurrencies",
    difficulty: "Beginner",
    examples: [
      "Used as a store of value, often called 'digital gold'",
      "Medium of exchange for goods and services",
      "First successful implementation of blockchain technology"
    ],
    relatedTerms: ["Blockchain", "Proof of Work", "Cryptocurrency", "Mining"]
  },
  {
    id: "ethereum",
    term: "Ethereum",
    definition: "A decentralized, open-source blockchain platform that enables smart contracts and decentralized applications (dApps). It introduced programmable blockchain functionality and its native cryptocurrency is called Ether (ETH).",
    category: "Cryptocurrencies",
    difficulty: "Intermediate",
    examples: [
      "Smart contract platform for DeFi applications",
      "NFT creation and trading",
      "Decentralized autonomous organizations (DAOs)"
    ],
    relatedTerms: ["Smart Contract", "DeFi", "Gas", "dApps"]
  },
  {
    id: "cryptocurrency",
    term: "Cryptocurrency",
    definition: "A digital or virtual currency that uses cryptography for security, operates on a blockchain, and generally functions independently of a central bank.",
    category: "Core Concepts",
    difficulty: "Beginner",
    examples: [
      "Bitcoin (BTC)",
      "Ethereum (ETH)",
      "Cardano (ADA)"
    ],
    relatedTerms: ["Bitcoin", "Altcoin", "Digital Currency"]
  },
  {
    id: "private-key",
    term: "Private Key",
    definition: "A secure cryptographic code that allows direct access to your cryptocurrency and proves ownership of a digital wallet. Should never be shared with anyone.",
    category: "Security",
    difficulty: "Intermediate",
    examples: [
      "Used to sign transactions",
      "Required for accessing and managing your wallet"
    ],
    relatedTerms: ["Public Key", "Wallet", "Cryptography"]
  },
  {
    id: "hash",
    term: "Hash",
    definition: "A fixed-length string of characters generated from input data of any length. In blockchain, hashing is used to maintain data integrity and link blocks together.",
    category: "Technology",
    difficulty: "Intermediate",
    examples: [
      "SHA-256 hash algorithm used in Bitcoin",
      "Transaction IDs are typically represented as hashes"
    ],
    relatedTerms: ["Cryptography", "Block", "Mining"]
  },
  {
    id: "node",
    term: "Node",
    definition: "A computer or device that participates in a blockchain network by maintaining a copy of the blockchain and, in some cases, verifying transactions.",
    category: "Technology",
    difficulty: "Intermediate",
    examples: [
      "Full nodes store the complete blockchain",
      "Light nodes store only block headers"
    ],
    relatedTerms: ["Blockchain", "Mining", "Network"]
  },
  {
    id: "cold-storage",
    term: "Cold Storage",
    definition: "A method of keeping cryptocurrency offline to protect it from unauthorized access, hacking, and other vulnerabilities that come with internet connectivity.",
    category: "Security",
    difficulty: "Intermediate",
    examples: [
      "Hardware wallets",
      "Paper wallets",
      "Air-gapped computers"
    ],
    relatedTerms: ["Hardware Wallet", "Private Key", "Security"]
  },
  {
    id: "bull-market",
    term: "Bull Market",
    definition: "A period in the financial market characterized by rising prices and optimistic investor sentiment. In crypto, this often leads to significant price increases.",
    category: "Market",
    difficulty: "Beginner",
    examples: [
      "Bitcoin's rise to $69,000 in 2021",
      "The 2017 crypto bull run"
    ],
    relatedTerms: ["Bear Market", "Market Sentiment", "Trading"]
  },
  {
    id: "bear-market",
    term: "Bear Market",
    definition: "A period in the financial market characterized by falling prices and pessimistic investor sentiment. Typically defined as a drop of 20% or more from recent highs.",
    category: "Market",
    difficulty: "Beginner",
    examples: [
      "The 2018 crypto winter",
      "The 2022 market downturn"
    ],
    relatedTerms: ["Bull Market", "Market Sentiment", "Trading"]
  },
  {
    id: "market-cap",
    term: "Market Capitalization",
    definition: "The total value of a cryptocurrency, calculated by multiplying the current price by the total number of coins in circulation.",
    category: "Market",
    difficulty: "Beginner",
    examples: [
      "Bitcoin's market cap = Price per BTC × Total BTC in circulation",
      "Used to rank cryptocurrencies by size"
    ],
    relatedTerms: ["Circulating Supply", "Trading Volume", "Price"]
  },
  {
    id: "dex",
    term: "DEX (Decentralized Exchange)",
    definition: "A type of cryptocurrency exchange that operates without a central authority, using smart contracts to facilitate trading directly between users.",
    category: "Applications",
    difficulty: "Advanced",
    examples: [
      "Uniswap",
      "SushiSwap",
      "PancakeSwap"
    ],
    relatedTerms: ["DeFi", "Smart Contract", "Liquidity Pool"]
  },
  {
    id: "liquidity-pool",
    term: "Liquidity Pool",
    definition: "A collection of cryptocurrency funds locked in a smart contract, used to facilitate trading, lending, and other DeFi activities.",
    category: "Applications",
    difficulty: "Advanced",
    examples: [
      "Trading pairs on DEXes",
      "Lending pools on DeFi platforms"
    ],
    relatedTerms: ["DeFi", "DEX", "Smart Contract"]
  },
  {
    id: "staking",
    term: "Staking",
    definition: "The process of locking up cryptocurrency to support network operations, validate transactions, and earn rewards in proof-of-stake systems.",
    category: "Technology",
    difficulty: "Intermediate",
    examples: [
      "Ethereum 2.0 staking",
      "Delegated staking on proof-of-stake networks"
    ],
    relatedTerms: ["Proof of Stake", "Validator", "Rewards"]
  },
  {
    id: "nft",
    term: "NFT (Non-Fungible Token)",
    definition: "A unique digital asset that represents ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies, each NFT is unique and cannot be replaced with something else of equal value.",
    category: "Applications",
    difficulty: "Intermediate",
    examples: [
      "Digital art collections",
      "Virtual real estate",
      "Gaming items"
    ],
    relatedTerms: ["Smart Contract", "Digital Asset", "Ethereum"]
  },
  {
    id: "yield-farming",
    term: "Yield Farming",
    definition: "A DeFi strategy where users provide liquidity to various protocols in exchange for rewards, often in the form of governance tokens or trading fees.",
    category: "Applications",
    difficulty: "Advanced",
    examples: [
      "Providing liquidity on DEXes",
      "Lending assets on DeFi platforms"
    ],
    relatedTerms: ["DeFi", "Liquidity Pool", "APY"]
  },
  {
    id: "smart-contract",
    term: "Smart Contract",
    definition: "Self-executing contracts with the terms directly written into code. They automatically execute when predetermined conditions are met.",
    category: "Technology",
    difficulty: "Advanced",
    examples: [
      "Automated token distributions",
      "Decentralized exchanges",
      "NFT minting processes"
    ],
    relatedTerms: ["Ethereum", "DApp", "Gas"]
  },
  {
    id: "two-factor-authentication",
    term: "Two-Factor Authentication (2FA)",
    definition: "A security measure that requires two forms of verification to access an account, enhancing security beyond a simple password.",
    category: "Security",
    difficulty: "Beginner",
    examples: ["Using an authenticator app", "Receiving a code via SMS"],
    relatedTerms: ["Security", "Authentication", "Password"]
  },
  {
    id: "technical-analysis",
    term: "Technical Analysis",
    definition: "A method of evaluating investments by analyzing statistics generated by market activity, such as past prices and volume.",
    category: "Market",
    difficulty: "Intermediate",
    examples: ["Using charts to identify trends", "Employing indicators like RSI and MACD"],
    relatedTerms: ["Chart Patterns", "Indicators", "Trading"]
  }
];

export default function GlossaryTerms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | "all">("all");

  // In a real implementation, this would fetch from an API
  const { data: terms = mockGlossaryTerms, isLoading } = useQuery<Term[]>({
    queryKey: ['glossary-terms'],
    queryFn: async () => {
      // For now, return mock data
      return mockGlossaryTerms;
    }
  });

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || term.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get unique categories and difficulties
  const categories = ["all", ...Array.from(new Set(terms.map(term => term.category)))];
  const difficulties = ["all", ...Array.from(new Set(terms.map(term => term.difficulty)))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md bg-background"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="p-2 border rounded-md bg-background"
        >
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>
              {difficulty === "all" ? "All Levels" : difficulty}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTerms.map((term) => (
          <Card
            key={term.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
          >
            <motion.div
              className="p-4"
              initial={false}
              animate={{ backgroundColor: expandedTerm === term.id ? "rgb(243, 244, 246)" : "white" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-blue-800">{term.term}</h3>
                  <Badge variant="outline">{term.difficulty}</Badge>
                </div>
                <motion.div
                  animate={{ rotate: expandedTerm === term.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedTerm === term.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <p className="text-gray-700">{term.definition}</p>

                    {term.examples && term.examples.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {term.examples.map((example, index) => (
                            <li key={index} className="text-gray-700">{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Related Terms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedTerms.map((relatedTerm, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchTerm(relatedTerm);
                              }}
                            >
                              {relatedTerm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="outline" className="bg-blue-50">
                        {term.category}
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}