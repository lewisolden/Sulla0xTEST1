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
      flowchart TB
        subgraph TS[Traditional System]
          A[Central Bank]:::centralNode
          B[Regional Bank 1]:::bankNode
          C[Regional Bank 2]:::bankNode
          D[Regional Bank 3]:::bankNode
          E[User Account]:::userNode
          F[User Account]:::userNode
          G[User Account]:::userNode

          A --> B
          A --> C
          A --> D
          B --> E
          C --> F
          D --> G
        end

        subgraph CN[Cryptocurrency Network]
          H[Network Node]:::cryptoNode
          I[Network Node]:::cryptoNode
          J[Network Node]:::cryptoNode
          K[Network Node]:::cryptoNode
          L[User Wallet]:::userNode
          M[User Wallet]:::userNode
          N[User Wallet]:::userNode

          H --- I
          H --- J
          H --- K
          I --- J
          I --- K
          J --- K
          H --- L
          I --- M
          J --- N
        end

        classDef centralNode fill:#ff9999,stroke:#ff0000,stroke-width:4px
        classDef bankNode fill:#99ff99,stroke:#00ff00,stroke-width:3px
        classDef cryptoNode fill:#9999ff,stroke:#0000ff,stroke-width:3px
        classDef userNode fill:#ffffff,stroke:#666666,stroke-width:2px

        style A font-size:18px,font-weight:bold
        style B font-size:16px
        style C font-size:16px
        style D font-size:16px
        style H font-size:16px
        style I font-size:16px
        style J font-size:16px
        style K font-size:16px
      `}
    </div>
  );
}