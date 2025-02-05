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
          rankSpacing: 150,
          padding: 50,
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-12 bg-white p-16 rounded-lg shadow-lg overflow-x-auto" ref={diagramRef}>
      {`
      flowchart TD
        subgraph TS[Traditional Banking System]
          direction TB
          A[Central Bank<br>Controls All]:::centralNode
          B[Bank<br>Processes]:::bankNode
          C[Bank<br>Processes]:::bankNode
          D[Bank<br>Processes]:::bankNode
          E[User<br>Limited]:::userNode
          F[User<br>Limited]:::userNode
          G[User<br>Limited]:::userNode

          A --> B & C & D
          B --> E
          C --> F
          D --> G
        end

        subgraph CN[Decentralized Network]
          direction TB
          H[Node<br>Validates]:::cryptoNode
          I[Node<br>Validates]:::cryptoNode
          J[Node<br>Validates]:::cryptoNode
          K[Node<br>Validates]:::cryptoNode
          L[User<br>Direct]:::userNode
          M[User<br>Direct]:::userNode
          N[User<br>Direct]:::userNode

          H --- I & J & K
          H --- L
          I --- M
          J --- N
        end

        %% Define much larger node sizes
        classDef centralNode fill:#ff9999,stroke:#ff0000,stroke-width:4px,width:200px,height:100px;
        classDef bankNode fill:#99ff99,stroke:#00ff00,stroke-width:3px,width:180px,height:90px;
        classDef cryptoNode fill:#9999ff,stroke:#0000ff,stroke-width:3px,width:180px,height:90px;
        classDef userNode fill:#ffffff,stroke:#666666,stroke-width:2px,width:160px,height:80px;

        %% Keep font sizes the same but add more vertical spacing
        style A font-size:20px,font-weight:bold
        style B font-size:18px
        style C font-size:18px
        style D font-size:18px
        style E font-size:16px
        style F font-size:16px
        style G font-size:16px
        style H font-size:18px
        style I font-size:18px
        style J font-size:18px
        style K font-size:18px
        style L font-size:16px
        style M font-size:16px
        style N font-size:16px

        %% Add more padding to all links
        linkStyle default stroke:#666,stroke-width:2px;
      `}
    </div>
  );
}