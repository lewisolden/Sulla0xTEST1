import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DexAmm() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "dex-amm", true, 3);
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
              Decentralized Exchanges & Automated Market Makers
            </h1>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Understanding DEXs
                </h2>
                <p className="text-gray-700 mb-4">
                  Decentralized Exchanges (DEXs) are a fundamental component of the DeFi ecosystem, enabling peer-to-peer trading of cryptocurrencies without traditional intermediaries. Unlike centralized exchanges, DEXs operate using smart contracts and provide users with complete control over their assets throughout the trading process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Automated Market Makers (AMMs)
                </h2>
                <p className="text-gray-700 mb-4">
                  AMMs are smart contracts that create liquidity pools of tokens, enabling automated trading through mathematical formulas. This innovation eliminates the need for traditional order books and enables continuous liquidity for traders.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Constant Product Formula (x * y = k)</li>
                  <li>Price Impact and Slippage</li>
                  <li>Pool Rebalancing</li>
                  <li>Protocol Fees and Incentives</li>
                </ul>
              </section>

              <div className="flex justify-between items-center mt-12">
                <Link href="/defi/module1/blockchain-contracts">
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

                  <Link href="/defi/module1/liquidity-yield">
                    <Button className="gap-2">
                      Next Section <ArrowRight className="h-4 w-4" />
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
