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

export default function GlossaryTerms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | "all">("all");

  // Fetch glossary terms from the API
  const { data: terms = [], isLoading } = useQuery<Term[]>({
    queryKey: ['glossary-terms'],
    queryFn: async () => {
      const response = await fetch('/api/glossary');
      if (!response.ok) {
        throw new Error('Failed to fetch glossary terms');
      }
      return response.json();
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

                    {term.visualAid && (
                      <div className="mt-4">
                        <img 
                          src={term.visualAid} 
                          alt={`Visual explanation of ${term.term}`}
                          className="rounded-lg shadow-md max-w-full h-auto"
                        />
                      </div>
                    )}

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
                      {term.visualAid && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(term.visualAid, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Full Image
                        </Button>
                      )}
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