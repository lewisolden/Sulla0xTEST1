import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";

export default function Module1Landing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Module 1: Fundamentals of Cryptocurrency
        </h1>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Introduction</h2>
            <div className="prose lg:prose-xl text-gray-700">
              <p>
                Welcome to the first module of our journey into the world of cryptocurrencies 
                and blockchain technology. In this foundational module, we'll explore the basic 
                concepts that underpin this revolutionary technology and set the stage for the 
                more advanced topics we'll cover later in the course.
              </p>
              <p>
                We'll begin by delving into the nature of digital currencies, understanding what 
                they are and how they differ from traditional forms of money. You'll learn about 
                the historical context that led to the creation of cryptocurrencies, tracing the 
                evolution of money from ancient barter systems to modern digital tokens.
              </p>
              <p>
                Next, we'll focus on Bitcoin, the world's first and most famous cryptocurrency. 
                We'll examine its creation, underlying technology, and the problems it was 
                designed to solve. This will lead us into a broader discussion of other 
                cryptocurrencies and tokens, giving you a comprehensive view of the current 
                cryptocurrency landscape.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Learning Objectives</h2>
            <div className="space-y-4">
              <p className="text-gray-700">At the end of this module, you will be able to:</p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Define digital currencies and distinguish between different types (e.g., virtual currencies, cryptocurrencies, central bank digital currencies)</li>
                <li>Trace the evolution of money from barter systems to modern digital currencies, identifying key milestones in monetary history</li>
                <li>Explain the fundamental problem that Bitcoin was designed to solve (the double-spending problem) and describe how its blockchain technology addresses this issue</li>
                <li>Analyze the key components of Bitcoin's architecture, including its consensus mechanism (Proof of Work), transaction model (UTXO), and monetary policy</li>
                <li>Compare and contrast Bitcoin with major altcoins, highlighting their unique features and use cases</li>
                <li>Differentiate between coins and tokens in the cryptocurrency ecosystem</li>
                <li>Interpret basic market metrics such as market capitalization, trading volume, and price volatility</li>
                <li>Apply fundamental analysis techniques to evaluate cryptocurrency projects</li>
                <li>Describe the basic principles of cryptography underlying cryptocurrencies</li>
                <li>Demonstrate the ability to securely set up a basic cryptocurrency wallet</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Module Sections</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  1. Introduction to Digital Currencies
                </h3>
                <p className="text-gray-700 mb-4">
                  Explore the basics of digital currencies and their role in the modern 
                  financial system.
                </p>
                <Link href="/modules/module1/digital-currencies">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  2. History of Money
                </h3>
                <p className="text-gray-700 mb-4">
                  Trace the evolution of money from ancient times to modern digital currencies.
                </p>
                <Link href="/modules/module1/history">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  3. Bitcoin: The First Cryptocurrency
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn about Bitcoin's creation, features, and impact on the financial world.
                </p>
                <Link href="/modules/module1/bitcoin">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  4. Altcoins and Tokens
                </h3>
                <p className="text-gray-700 mb-4">
                  Discover the variety of alternative cryptocurrencies and digital tokens.
                </p>
                <Link href="/modules/module1/altcoins">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  5. Cryptocurrency Market Dynamics
                </h3>
                <p className="text-gray-700 mb-4">
                  Understand how cryptocurrency markets work and key market metrics.
                </p>
                <Link href="/modules/module1/market-dynamics">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  6. Basic Cryptography
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn the fundamental cryptographic principles behind cryptocurrencies.
                </p>
                <Link href="/modules/module1/cryptography">
                  <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Section →
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/modules/module1/digital-currencies">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Begin Module 1
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
