import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DecentralizationDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          padding: 50,
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-12 bg-white p-8 rounded-lg shadow-lg overflow-x-auto" ref={diagramRef}>
      {`
      graph TD
          %% Traditional System
          subgraph Traditional[Traditional Banking System]
              CB[Central Bank]
              B1[Bank]
              B2[Bank]
              B3[Bank]
              U1[User]
              U2[User]
              U3[User]

              CB --> B1
              CB --> B2
              CB --> B3
              B1 --> U1
              B2 --> U2
              B3 --> U3
          end

          %% Decentralized System
          subgraph Decentralized[Peer-to-Peer Network]
              P1[Peer]
              P2[Peer]
              P3[Peer]
              P4[Peer]
              W1[User]
              W2[User]
              W3[User]

              P1 --- P2
              P1 --- P3
              P1 --- P4
              P2 --- P3
              P2 --- P4
              P3 --- P4
              P1 --- W1
              P2 --- W2
              P3 --- W3
          end

          %% Styling
          classDef central fill:#ff8080,stroke:#ff4040,stroke-width:2px
          classDef bank fill:#90EE90,stroke:#4CAF50,stroke-width:2px
          classDef peer fill:#87CEEB,stroke:#4682B4,stroke-width:2px
          classDef user fill:#FFFFFF,stroke:#666666,stroke-width:2px

          class CB central
          class B1,B2,B3 bank
          class P1,P2,P3,P4 peer
          class U1,U2,U3,W1,W2,W3 user

          %% Node label styling
          style CB fontSize:20px,fontWeight:bold
          style B1,B2,B3,P1,P2,P3,P4 fontSize:18px
      `}
    </div>
  );
}