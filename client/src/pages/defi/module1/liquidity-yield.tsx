import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LiquidityYield() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "liquidity-yield", true, 3);
    setIsCompleted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/defi/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Module Overview
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
              Liquidity Provision & Yield Farming
            </h1>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Understanding Liquidity Provision
                </h2>
                <p className="text-gray-700 mb-4">
                  Liquidity provision is a crucial aspect of DeFi protocols where users can deposit their assets into liquidity pools to facilitate trading and earn rewards. This section explores the mechanics of liquidity provision and the associated risks and rewards.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Yield Farming Strategies
                </h2>
                <p className="text-gray-700 mb-4">
                  Yield farming involves strategically providing liquidity across different protocols to maximize returns. Learn about various yield farming strategies and how to evaluate opportunities while managing risks.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Liquidity Mining Programs</li>
                  <li>Protocol Incentives</li>
                  <li>Risk Assessment</li>
                  <li>Impermanent Loss Protection</li>
                </ul>
              </section>

              <div className="flex justify-between items-center mt-12">
                <Link href="/defi/module1/dex-amm">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Previous Section
                  </Button>
                </Link>

                <div className="flex gap-4">
                  <Button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed" : "Mark as Complete"}
                  </Button>

                  <Link href="/defi/module1">
                    <Button className="gap-2">
                      Back to Overview <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
