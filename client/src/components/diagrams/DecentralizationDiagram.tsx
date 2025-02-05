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
          nodeSpacing: 200,
          rankSpacing: 200,
          padding: 50,
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-12 bg-white p-12 rounded-lg shadow-lg overflow-x-auto" ref={diagramRef}>
      {`
      graph TB
          subgraph "Traditional System" [Traditional Banking System]
          direction TB
          A["Central Bank<br/><br/>Controls All<br/>Transactions"]:::centralNode
          B["Regional Bank<br/><br/>Processes<br/>Transactions"]:::bankNode
          C["Regional Bank<br/><br/>Processes<br/>Transactions"]:::bankNode
          D["Regional Bank<br/><br/>Processes<br/>Transactions"]:::bankNode
          E["User Account<br/><br/>Limited Control"]:::userNode
          F["User Account<br/><br/>Limited Control"]:::userNode
          G["User Account<br/><br/>Limited Control"]:::userNode

          A --> B & C & D
          B --> E
          C --> F
          D --> G
          end

          subgraph "Cryptocurrency Network" [Peer-to-Peer Network]
          direction TB
          H["Network Node<br/><br/>Validates &<br/>Processes"]:::cryptoNode
          I["Network Node<br/><br/>Validates &<br/>Processes"]:::cryptoNode
          J["Network Node<br/><br/>Validates &<br/>Processes"]:::cryptoNode
          K["Network Node<br/><br/>Validates &<br/>Processes"]:::cryptoNode
          L["User Wallet<br/><br/>Full Control"]:::userNode
          M["User Wallet<br/><br/>Full Control"]:::userNode
          N["User Wallet<br/><br/>Full Control"]:::userNode

          H --- I & J & K
          I --- J & K
          J --- K
          H --- L
          I --- M
          J --- N
          end

          classDef centralNode fill:#ff9999,stroke:#ff0000,stroke-width:4px,color:#000000,rx:10,ry:10,width:200px,height:120px;
          classDef bankNode fill:#99ff99,stroke:#00ff00,stroke-width:3px,color:#000000,rx:10,ry:10,width:180px,height:100px;
          classDef cryptoNode fill:#9999ff,stroke:#0000ff,stroke-width:3px,color:#000000,rx:10,ry:10,width:180px,height:100px;
          classDef userNode fill:#ffffff,stroke:#666666,stroke-width:2px,color:#000000,rx:10,ry:10,width:160px,height:90px;

          linkStyle default stroke-width:2px,stroke:#666;
      `}
    </div>
  );
}