import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      // Reset any previous configuration
      await mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
        },
      });

      const diagram = `sequenceDiagram
    participant Sender
    participant Network
    participant Validator
    Sender->>Network: 1. Send Transaction
    Network->>Validator: 2. Broadcast for Validation
    Note over Validator: 3. Check Transaction History
    Validator-->>Network: 4. Confirm No Double Spend
    Network-->>Sender: 5. Transaction Confirmed`;

      try {
        if (diagramRef.current) {
          // Clear previous content
          diagramRef.current.innerHTML = '';
          const { svg } = await mermaid.render('double-spend-diagram', diagram);
          diagramRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeMermaid();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg overflow-hidden">
      <div ref={diagramRef} className="flex justify-center" />
      <div className="mt-4 text-sm text-gray-600">
        <p className="text-center">Double Spend Prevention Flow</p>
      </div>
    </div>
  );
}