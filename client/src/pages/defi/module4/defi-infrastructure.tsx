import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Server, Network, Shield, Cpu, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useScrollTop } from "@/hooks/useScrollTop";

export default function DefiInfrastructure() {
  useScrollTop();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            DeFi Infrastructure and Future Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the foundational infrastructure that powers DeFi protocols and the future developments shaping the ecosystem.
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <div className="grid gap-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Layer 1 and Layer 2 Infrastructure</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Layer 1 blockchains like Ethereum serve as the foundation for DeFi, providing security and decentralization. However, scalability challenges have led to the development of Layer 2 solutions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Optimistic Rollups (Optimism, Arbitrum)</li>
                  <li>ZK-Rollups (zkSync, StarkNet)</li>
                  <li>Sidechains and Application-Specific Chains</li>
                  <li>State Channels and Plasma Networks</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Node Infrastructure and RPC Services</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Reliable node infrastructure is crucial for DeFi applications to interact with blockchain networks. Modern solutions include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Decentralized Node Networks (Infura, Alchemy)</li>
                  <li>Self-Hosted Node Solutions</li>
                  <li>Light Client Implementations</li>
                  <li>Cross-Chain Communication Protocols</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Network className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Interoperability and Cross-Chain Solutions</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Cross-chain infrastructure enables seamless asset and data transfer between different blockchain networks:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Bridge Protocols (LayerZero, Axelar)</li>
                  <li>Cross-Chain Messaging Systems</li>
                  <li>Interoperability Standards</li>
                  <li>Multi-Chain Smart Contract Platforms</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Security and Oracle Infrastructure</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Security infrastructure and reliable data feeds are essential for DeFi protocols:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Oracle Networks (Chainlink, Pyth)</li>
                  <li>Security Monitoring Tools</li>
                  <li>Automated Auditing Systems</li>
                  <li>MEV Protection Solutions</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Future Infrastructure Developments</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  The future of DeFi infrastructure is focused on improving scalability, security, and user experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account Abstraction and Smart Accounts</li>
                  <li>Zero-Knowledge Proof Applications</li>
                  <li>Modular Blockchain Architecture</li>
                  <li>AI-Enhanced DeFi Infrastructure</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/defi/module4/quiz">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-full hover:opacity-90 transition-opacity">
                Continue to Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
