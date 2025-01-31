import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.init({}, diagramRef.current);
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
