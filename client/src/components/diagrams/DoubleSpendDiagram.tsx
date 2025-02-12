import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      // Initialize mermaid with specific configuration
      mermaid.initialize({
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
        },
      });

      const diagram = `sequenceDiagram
    participant User
    participant Network
    participant Blockchain
    User->>Network: Submit Transaction
    Network->>Network: Verify No Previous Spend
    Network->>Blockchain: Add to Block
    Blockchain->>Network: Confirm Transaction
    Network->>User: Transaction Complete`;

      // Clear the container first
      diagramRef.current.innerHTML = '';

      // Use mermaid render method
      try {
        mermaid.render('doublespend-diagram', diagram)
          .then(({ svg }) => {
            if (diagramRef.current) {
              diagramRef.current.innerHTML = svg;
            }
          })
          .catch(error => {
            console.error('Mermaid rendering error:', error);
            // Fallback content if rendering fails
            if (diagramRef.current) {
              diagramRef.current.innerHTML = '<p>Error rendering diagram</p>';
            }
          });
      } catch (error) {
        console.error('Mermaid initialization error:', error);
      }
    }
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow">
      <div ref={diagramRef} className="mermaid-diagram w-full overflow-x-auto" />
    </div>
  );
}