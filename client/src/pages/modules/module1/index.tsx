import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, History, Bitcoin, Coins, TrendingUp, Lock } from "lucide-react";

export default function Module1Landing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Fundamentals of Cryptocurrency
        </h1>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Module Overview</h2>
            <div className="prose lg:prose-xl text-gray-700">
              <p>
                Welcome to Module 1! This foundational module introduces you to the world 
                of cryptocurrencies and blockchain technology. You'll learn about the evolution 
                of digital currencies, understand Bitcoin's revolutionary impact, and explore 
                the broader cryptocurrency ecosystem.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {/* Section 1: Digital Currencies */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">1. Digital Currencies</h3>
                  <p className="text-gray-600 mt-1">Learn about the fundamentals of digital currencies and their impact.</p>
                </div>
                <Link href="/modules/module1/digital-currencies">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: History of Money */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">2. History of Money</h3>
                  <p className="text-gray-600 mt-1">Explore the evolution from traditional to digital currencies.</p>
                </div>
                <Link href="/modules/module1/history-of-money">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Bitcoin */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Bitcoin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">3. Bitcoin</h3>
                  <p className="text-gray-600 mt-1">Understand Bitcoin's creation, features, and significance.</p>
                </div>
                <Link href="/modules/module1/bitcoin">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Altcoins and Tokens */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Coins className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">4. Altcoins and Tokens</h3>
                  <p className="text-gray-600 mt-1">Explore alternative cryptocurrencies and digital tokens.</p>
                </div>
                <Link href="/modules/module1/altcoins-tokens">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Crypto Market */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">5. Crypto Market Dynamics</h3>
                  <p className="text-gray-600 mt-1">Learn about cryptocurrency markets and trading basics.</p>
                </div>
                <Link href="/modules/module1/crypto-market">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Cryptography */}
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">6. Cryptography</h3>
                  <p className="text-gray-600 mt-1">Understand the cryptographic principles behind cryptocurrencies.</p>
                </div>
                <Link href="/modules/module1/cryptography">
                  <Button>Start Learning</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Quiz */}
        <div className="mt-8 text-center">
          <Link href="/modules/module1/quiz">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Take Module Quiz
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}