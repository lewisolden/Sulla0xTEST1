import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.initialize({
        startOnLoad: true,
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
    participant User
    participant Network
    participant Blockchain
    User-&gt;Network: Submit Transaction
    Network-&gt;Network: Verify No Previous Spend
    Network-&gt;Blockchain: Add to Block
    Blockchain-&gt;Network: Confirm Transaction
    Network-&gt;User: Transaction Complete`;

      mermaid.render('doublespend-diagram', diagram).then(({ svg }) => {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      });
    }
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow">
      <div ref={diagramRef} className="mermaid-diagram" />
    </div>
  );
}