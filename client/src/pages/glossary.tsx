import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import GlossaryTerms from "@/components/glossary/GlossaryTerms";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function GlossaryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link href="/modules/module1">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Module 1
          </Button>
        </Link>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold text-blue-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Cryptocurrency Glossary
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-8">
          <div className="p-6">
            <p className="text-lg text-gray-700">
              Explore key cryptocurrency terms and concepts through our interactive glossary. 
              Click on any term to see its detailed definition and examples.
            </p>
          </div>
        </Card>

        <GlossaryTerms />
      </motion.div>
    </div>
  );
}
