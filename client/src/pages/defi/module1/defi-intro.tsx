import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useScrollTop } from "@/hooks/useScrollTop";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DefiIntro() {
  useScrollTop();
  const { updateProgress } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    await updateProgress(3, "defi-intro", true, 3);
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
              Introduction to DeFi
            </h1>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  What is DeFi?
                </h2>
                <p className="text-gray-700 mb-4">
                  Decentralized Finance (DeFi) represents a fundamental shift in how financial services are delivered and accessed. Unlike traditional financial systems that rely on centralized intermediaries like banks and brokerages, DeFi leverages blockchain technology and smart contracts to provide financial services in a trustless, transparent, and permissionless manner.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Key Features of DeFi
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Permissionless: Anyone with an internet connection can access DeFi services</li>
                  <li>Transparent: All transactions and rules are visible on the blockchain</li>
                  <li>Trustless: No need to trust intermediaries; smart contracts enforce rules</li>
                  <li>Interoperable: DeFi protocols can be combined in innovative ways</li>
                  <li>Programmable: Automated financial services through smart contracts</li>
                </ul>
              </section>

              <div className="flex justify-between items-center mt-12">
                <Link href="/defi/module1">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Module Overview
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

                  <Link href="/defi/module1/blockchain-contracts">
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
