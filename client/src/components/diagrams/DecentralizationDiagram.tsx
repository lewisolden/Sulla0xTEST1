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
          nodeSpacing: 100,
          rankSpacing: 100,
          padding: 20,
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-8 bg-white p-8 rounded-lg shadow" ref={diagramRef}>
      {`
      graph TB
          subgraph "Traditional System" [Traditional Banking System]
          direction TB
          A[("Central<br/>Bank")]:::centralNode
          B[("Regional<br/>Bank")]:::bankNode
          C[("Regional<br/>Bank")]:::bankNode
          D[("Regional<br/>Bank")]:::bankNode
          E["User"]:::userNode
          F["User"]:::userNode
          G["User"]:::userNode

          A --> B & C & D
          B --> E
          C --> F
          D --> G
          end

          subgraph "Cryptocurrency Network" [Peer-to-Peer Network]
          direction TB
          H(("Network<br/>Node")):::cryptoNode
          I(("Network<br/>Node")):::cryptoNode
          J(("Network<br/>Node")):::cryptoNode
          K(("Network<br/>Node")):::cryptoNode
          L["User"]:::userNode
          M["User"]:::userNode
          N["User"]:::userNode

          H --- I & J & K
          I --- J & K
          J --- K
          H --- L
          I --- M
          J --- N
          end

          classDef centralNode fill:#ff9999,stroke:#ff0000,stroke-width:2px;
          classDef bankNode fill:#99ff99,stroke:#00ff00,stroke-width:2px;
          classDef cryptoNode fill:#9999ff,stroke:#0000ff,stroke-width:2px;
          classDef userNode fill:#ffffff,stroke:#666666,stroke-width:1px;
      `}
    </div>
  );
}