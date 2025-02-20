import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlockchainContracts() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "blockchain-contracts", true, 3);
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
              Blockchain & Smart Contracts in DeFi
            </h1>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  The Role of Blockchain in DeFi
                </h2>
                <p className="text-gray-700 mb-4">
                  Blockchain technology serves as the foundation for DeFi applications, providing a secure, transparent, and decentralized infrastructure. In DeFi, blockchains like Ethereum enable trustless execution of financial services through smart contracts and provide a reliable way to track ownership of digital assets.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Understanding Smart Contracts
                </h2>
                <p className="text-gray-700 mb-4">
                  Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute agreements when predetermined conditions are met, eliminating the need for intermediaries in financial transactions.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Automated execution of financial agreements</li>
                  <li>Transparent and immutable rules</li>
                  <li>Reduced counterparty risk</li>
                  <li>Lower operational costs</li>
                </ul>
              </section>

              <div className="flex justify-between items-center mt-12">
                <Link href="/defi/module1/defi-intro">
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

                  <Link href="/defi/module1/dex-amm">
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
