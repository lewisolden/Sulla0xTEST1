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
          nodeSpacing: 80,
          rankSpacing: 100,
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-12 bg-white p-8 rounded-lg shadow-lg overflow-x-auto" ref={diagramRef}>
      {`
      flowchart TD
        subgraph Traditional["Traditional Banking System"]
          direction TB
          CB["Central Authority"]:::central
          B1["Bank"]:::bank
          B2["Bank"]:::bank
          B3["Bank"]:::bank
          U1["User"]:::user
          U2["User"]:::user
          U3["User"]:::user

          %% Traditional system connections
          CB --> B1 & B2 & B3
          B1 --> U1
          B2 --> U2
          B3 --> U3
        end

        subgraph Decentralized["Peer-to-Peer Network"]
          direction TB
          P1["Peer"]:::peer
          P2["Peer"]:::peer
          P3["Peer"]:::peer
          P4["Peer"]:::peer
          W1["User"]:::user
          W2["User"]:::user
          W3["User"]:::user

          %% P2P connections
          P1 --- P2 & P3 & P4
          P2 --- P3 & P4
          P3 --- P4
          P1 --- W1
          P2 --- W2
          P3 --- W3
        end

        %% Styles
        classDef central fill:#ff8080,stroke:#ff4040,stroke-width:2px,rx:10,ry:10,padding:20px;
        classDef bank fill:#90EE90,stroke:#4CAF50,stroke-width:2px,rx:10,ry:10,padding:15px;
        classDef peer fill:#87CEEB,stroke:#4682B4,stroke-width:2px,rx:10,ry:10,padding:15px;
        classDef user fill:#FFFFFF,stroke:#666666,stroke-width:2px,rx:10,ry:10,padding:15px;

        %% Node styles - larger fonts and bold where needed
        style CB fontSize:20px,fontWeight:bold
        style B1 fontSize:18px
        style B2 fontSize:18px
        style B3 fontSize:18px
        style P1 fontSize:18px
        style P2 fontSize:18px
        style P3 fontSize:18px
        style P4 fontSize:18px

        %% Link styles
        linkStyle default stroke-width:2px,fill:none,stroke:#666;
      `}
    </div>
  );
}