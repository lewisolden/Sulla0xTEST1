import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Term {
  id: string;
  term: string;
  definition: string;
  category: string;
  example?: string;
}

const cryptoTerms: Term[] = [
  {
    id: "blockchain",
    term: "Blockchain",
    definition: "A distributed digital ledger that records transactions across a network of computers.",
    category: "Technology",
    example: "Bitcoin's blockchain stores all transactions ever made on its network."
  },
  {
    id: "cryptocurrency",
    term: "Cryptocurrency",
    definition: "A digital or virtual currency that uses cryptography for security.",
    category: "General",
    example: "Bitcoin, Ethereum, and Litecoin are examples of cryptocurrencies."
  },
  {
    id: "mining",
    term: "Mining",
    definition: "The process of validating and adding new transactions to a blockchain using computer power.",
    category: "Technology",
    example: "Bitcoin miners solve complex mathematical problems to validate transactions."
  },
  {
    id: "wallet",
    term: "Wallet",
    definition: "A digital tool that stores cryptocurrency and allows sending and receiving of digital assets.",
    category: "Technology",
    example: "MetaMask is a popular Ethereum wallet."
  },
  {
    id: "defi",
    term: "DeFi (Decentralized Finance)",
    definition: "Financial services and products built on blockchain technology without traditional intermediaries.",
    category: "Finance",
    example: "Uniswap is a DeFi platform for trading cryptocurrencies."
  }
];

export default function GlossaryTerms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");

  const filteredTerms = cryptoTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(cryptoTerms.map(term => term.category))];

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
            className="overflow-hidden cursor-pointer"
            onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
          >
            <motion.div
              className="p-4"
              initial={false}
              animate={{ backgroundColor: expandedTerm === term.id ? "rgb(243, 244, 246)" : "white" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-800">{term.term}</h3>
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
                    className="mt-4 space-y-3"
                  >
                    <p className="text-gray-700">{term.definition}</p>
                    {term.example && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        <span className="font-medium">Example:</span> {term.example}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {term.category}
                      </span>
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
