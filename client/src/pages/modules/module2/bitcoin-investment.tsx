import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import BitcoinInvestmentQuiz from "@/components/modules/quizzes/BitcoinInvestmentQuiz";

export default function BitcoinInvestment() {
  useScrollTop();
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module2">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Bitcoin Investment</h1>

        {/* Content sections */}
        <div className="space-y-8 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Bitcoin Investment</h2>
            <p className="mb-4">
              Bitcoin investment requires understanding various aspects including market dynamics,
              risk management, and different investment strategies. This section covers key concepts
              to help you make informed investment decisions.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Investment Strategies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dollar-cost averaging (DCA) - Regular, scheduled investments</li>
              <li>Long-term holding (HODL) - Buy and hold strategy</li>
              <li>Portfolio diversification - Balancing risk across assets</li>
              <li>Bitcoin ETFs - Regulated investment vehicles</li>
            </ul>
          </Card>
        </div>

        {/* Quiz section */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Knowledge Check</h2>
            {!showQuiz ? (
              <div className="text-center">
                <p className="mb-4">Ready to test your knowledge about Bitcoin investment?</p>
                <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
              </div>
            ) : (
              <BitcoinInvestmentQuiz />
            )}
          </Card>
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/modules/module2/bitcoin-fundamentals">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Previous: Bitcoin Fundamentals
            </Button>
          </Link>
          <Link href="/modules/module2/security-risk">
            <Button className="gap-2">
              Next: Security and Risk <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}