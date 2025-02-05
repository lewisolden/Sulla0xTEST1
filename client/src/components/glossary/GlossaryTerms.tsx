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
    id: "blockchain",
    term: "Blockchain",
    definition: "A decentralized, distributed ledger technology that records transactions across a network of computers. Each block contains a list of transactions and is linked to the previous block, forming a chain of information.",
    category: "Core Concepts",
    difficulty: "Beginner",
    examples: [
      "Bitcoin's blockchain stores all transactions since its creation in 2009",
      "Ethereum's blockchain adds smart contract functionality"
    ],
    relatedTerms: ["Distributed Ledger", "Mining", "Block"]
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
    id: "mining",
    term: "Mining",
    definition: "The process of validating and adding new transactions to a blockchain using computational power, often rewarded with newly created cryptocurrencies.",
    category: "Technology",
    difficulty: "Intermediate",
    examples: [
      "Bitcoin mining using specialized ASIC hardware",
      "Pool mining to share rewards"
    ],
    relatedTerms: ["Proof of Work", "Hash Rate", "Block Reward"]
  },
  {
    id: "wallet",
    term: "Cryptocurrency Wallet",
    definition: "A digital tool that allows you to store, send, and receive cryptocurrencies. Can be software-based (hot wallet) or hardware-based (cold wallet).",
    category: "Security",
    difficulty: "Beginner",
    examples: [
      "MetaMask (Browser Extension Wallet)",
      "Ledger (Hardware Wallet)",
      "Paper Wallet (Physical Storage)"
    ],
    relatedTerms: ["Private Key", "Public Key", "Address"]
  },
  {
    id: "defi",
    term: "DeFi (Decentralized Finance)",
    definition: "Financial services and products built on blockchain technology that operate without traditional financial intermediaries.",
    category: "Applications",
    difficulty: "Advanced",
    examples: [
      "Decentralized exchanges (DEX)",
      "Lending platforms",
      "Yield farming"
    ],
    relatedTerms: ["Smart Contract", "Liquidity Pool", "Yield Farming"]
  },
  {
    id: "consensus",
    term: "Consensus Mechanism",
    definition: "The protocol by which all nodes in a blockchain network agree on the validity of transactions and the current state of the network.",
    category: "Technology",
    difficulty: "Advanced",
    examples: [
      "Proof of Work (Bitcoin)",
      "Proof of Stake (Ethereum 2.0)",
      "Delegated Proof of Stake"
    ],
    relatedTerms: ["Mining", "Staking", "Network Security"]
  },
  {
    id: "gas",
    term: "Gas",
    definition: "The fee required to perform a transaction or execute a contract on the Ethereum network. Paid in ETH and varies based on network congestion.",
    category: "Technology",
    difficulty: "Intermediate",
    examples: [
      "Transaction fees on Ethereum",
      "Smart contract execution costs"
    ],
    relatedTerms: ["Ethereum", "Transaction Fee", "Wei"]
  },
  {
    id: "altcoin",
    term: "Altcoin",
    definition: "Any cryptocurrency that isn't Bitcoin. Short for 'alternative coin', these can have various use cases and technological features.",
    category: "Core Concepts",
    difficulty: "Beginner",
    examples: [
      "Ethereum (ETH)",
      "Litecoin (LTC)",
      "Ripple (XRP)"
    ],
    relatedTerms: ["Bitcoin", "Cryptocurrency", "Token"]
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