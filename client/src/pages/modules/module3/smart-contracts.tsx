import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModuleNavigation } from "@/components/layout/ModuleNavigation";
import { Code, Shield, Workflow, GitBranch } from "lucide-react";
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

const SmartContractsSection = () => {
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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
      }
    });

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(3, 'smart-contracts', true);
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

  const deploymentFlowDiagram = `graph LR
    A[Write Contract] --> B[Compile]
    B --> C[Deploy]
    C --> D[Verify]
    D --> E[Interact]

    style A fill:#93c5fd,stroke:#2563eb
    style B fill:#93c5fd,stroke:#2563eb
    style C fill:#93c5fd,stroke:#2563eb
    style D fill:#93c5fd,stroke:#2563eb
    style E fill:#93c5fd,stroke:#2563eb`;

  const contractHierarchyDiagram = `graph TD
    A[Smart Contract] --> B[Storage]
    A --> C[Logic]
    A --> D[Interface]
    B --> E[State Variables]
    B --> F[Mappings]
    C --> G[Functions]
    C --> H[Modifiers]
    D --> I[Events]
    D --> J[External Functions]

    style A fill:#93c5fd,stroke:#2563eb
    style B fill:#bfdbfe,stroke:#2563eb
    style C fill:#bfdbfe,stroke:#2563eb
    style D fill:#bfdbfe,stroke:#2563eb`;

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
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-blue-800 mb-6"
        >
          3.2 Smart Contract Development
        </motion.h1>

        <Card className="mb-6">
          <div className="p-6 prose max-w-none">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Understanding Smart Contracts</h2>
              <p className="text-gray-700 mb-4">
                Smart contracts represent a revolutionary way to create and enforce agreements. They are 
                self-executing programs that run on the Ethereum blockchain, automatically enforcing the 
                terms of an agreement without the need for intermediaries.
              </p>

              <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Deployment Flow</h3>
                <MermaidDiagram chart={deploymentFlowDiagram} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Self-Executing Programs</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Run exactly as programmed</li>
                    <li>No need for intermediaries</li>
                    <li>Zero downtime operation</li>
                    <li>Tamper-proof execution</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-700">Code-Based Rules</h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Immutable logic</li>
                    <li>Transparent execution</li>
                    <li>Verifiable outcomes</li>
                    <li>Automated enforcement</li>
                  </ul>
                </motion.div>
              </div>

              <div className="my-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Smart Contract Architecture</h3>
                <MermaidDiagram chart={contractHierarchyDiagram} />
              </div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Real-World Applications</h2>

              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Financial Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Automated lending protocols</li>
                      <li>Decentralized exchanges</li>
                      <li>Insurance products</li>
                      <li>Payment systems</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Digital Rights Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Content licensing</li>
                      <li>Royalty distribution</li>
                      <li>Access control</li>
                      <li>Usage tracking</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Supply Chain Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Product tracking</li>
                      <li>Authenticity verification</li>
                      <li>Payment automation</li>
                      <li>Document management</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </Card>

        <ModuleNavigation
          prev={{
            path: "/modules/module3/ethereum-fundamentals",
            label: "Ethereum Fundamentals"
          }}
          next={{
            path: "/modules/module3/investment-value",
            label: "Investment and Value"
          }}
        />

        {isFullyRead && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Smart Contract Development section!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SmartContractsSection;