import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import EthereumFundamentalsQuiz from "@/components/quizzes/EthereumFundamentalsQuiz";
import mermaid from "mermaid";

const MermaidDiagram = ({ chart }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setLoading(true);
        const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, chart);
        setSvg(svg);
        setError('');
      } catch (err) {
        console.error('Failed to render mermaid diagram:', err);
        setError('Failed to render diagram');
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chart]);

  if (loading) {
    return <div className="flex justify-center p-4">Loading diagram...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div 
      className="mermaid-diagram" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};

const EthereumFundamentalsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1e3a8a',
        primaryBorderColor: '#60a5fa',
        lineColor: '#93c5fd',
        secondaryColor: '#dbeafe',
        tertiaryColor: '#eff6ff'
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35
      }
    });

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'ethereum-fundamentals', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const comparisonDiagram = `graph TD
    subgraph Bitcoin
    A[Transactions] --> B[Value Transfer]
    end

    subgraph Ethereum
    C[Smart Contracts] --> D[dApps]
    C --> E[DeFi]
    C --> F[NFTs]
    C --> G[DAOs]
    end

    style Bitcoin fill:#f9f9f9,stroke:#2563eb
    style Ethereum fill:#f9f9f9,stroke:#2563eb
    style A fill:#93c5fd
    style B fill:#93c5fd
    style C fill:#93c5fd
    style D fill:#93c5fd
    style E fill:#93c5fd
    style F fill:#93c5fd
    style G fill:#93c5fd`;

  const evmDiagram = `sequenceDiagram
    participant U as User
    participant C as Smart Contract
    participant N as Network
    U->>C: Submit Transaction
    C->>N: Execute Code
    N-->>C: Update State
    C-->>U: Return Result`;

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => setShowQuiz(false)}
          className="mb-6"
          variant="outline"
        >
          ← Back to Content
        </Button>
        <EthereumFundamentalsQuiz />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div 
          className="h-full bg-blue-600" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.1 Ethereum Fundamentals
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">What Makes Ethereum Different?</h2>
              <p className="text-gray-700 mb-4">
                Unlike Bitcoin's primary focus on monetary transactions, Ethereum represents a fundamental 
                shift in blockchain technology. It serves as a global, decentralized computing platform 
                that can run applications and handle complex financial interactions.
              </p>

              <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Bitcoin vs Ethereum Comparison</h3>
                <MermaidDiagram chart={comparisonDiagram} />
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-3">dApps</h4>
                  <p className="text-sm">Applications that run on the blockchain, ensuring continuous operation</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-3">Smart Contracts</h4>
                  <p className="text-sm">Self-executing programs that automatically enforce agreements</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-3">Digital Assets</h4>
                  <p className="text-sm">Create various types of tokens and digital assets</p>
                </motion.div>
              </motion.div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">The Ethereum Virtual Machine (EVM)</h2>

              <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">EVM Transaction Flow</h3>
                <MermaidDiagram chart={evmDiagram} />
              </div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-3">Execution Environment</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Consistent execution across all nodes</li>
                    <li>Deterministic operation</li>
                    <li>Secure code isolation</li>
                    <li>Resource management</li>
                    <li>State maintenance</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-blue-700 mb-3">Gas System</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Operation-specific gas costs</li>
                    <li>Dynamic pricing based on demand</li>
                    <li>Spam prevention mechanism</li>
                    <li>Fair resource allocation</li>
                    <li>Optimization opportunities</li>
                  </ul>
                </motion.div>
              </motion.div>
            </motion.section>
          </div>
        </Card>

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <div className="flex flex-col items-center">
                <p className="text-green-700 mb-4">
                  🎉 Congratulations! You've completed the Ethereum Fundamentals section!
                </p>
                <Button
                  onClick={startQuiz}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Take Section Quiz
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <ModuleNavigation
          prev={{
            path: "/modules/module3",
            label: "Module Overview"
          }}
          next={{
            path: "/modules/module3/smart-contracts",
            label: "Smart Contract Development"
          }}
        />
      </div>
    </motion.div>
  );
};

export default EthereumFundamentalsSection;