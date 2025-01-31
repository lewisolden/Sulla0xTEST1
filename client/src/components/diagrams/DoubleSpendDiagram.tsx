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

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow" ref={diagramRef}>
      {`
      sequenceDiagram
          participant User
          participant Network
          participant Blockchain
          User->>Network: Submit Transaction
          Network->>Network: Verify No Previous Spend
          Network->>Blockchain: Add to Block
          Blockchain->>Network: Confirm Transaction
          Network->>User: Transaction Complete
      `}
    </div>
  );
}