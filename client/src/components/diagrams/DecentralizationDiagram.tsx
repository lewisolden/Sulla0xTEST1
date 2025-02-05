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
          A((Central<br/>Bank)):::centralNode
          B((Regional<br/>Bank 1)):::bankNode
          C((Regional<br/>Bank 2)):::bankNode
          D((Regional<br/>Bank 3)):::bankNode
          E((User<br/>Account)):::userNode
          F((User<br/>Account)):::userNode
          G((User<br/>Account)):::userNode

          A --> B
          A --> C
          A --> D
          B --> E
          C --> F
          D --> G
        end

        subgraph CN[Cryptocurrency Network]
          H((Network<br/>Node)):::cryptoNode
          I((Network<br/>Node)):::cryptoNode
          J((Network<br/>Node)):::cryptoNode
          K((Network<br/>Node)):::cryptoNode
          L((User<br/>Wallet)):::userNode
          M((User<br/>Wallet)):::userNode
          N((User<br/>Wallet)):::userNode

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

        classDef centralNode fill:#ff9999,stroke:#ff0000,stroke-width:4px;
        classDef bankNode fill:#99ff99,stroke:#00ff00,stroke-width:3px;
        classDef cryptoNode fill:#9999ff,stroke:#0000ff,stroke-width:3px;
        classDef userNode fill:#ffffff,stroke:#666666,stroke-width:2px;

        style A font-size:24px,font-weight:bold
        style B font-size:20px
        style C font-size:20px
        style D font-size:20px
        style E font-size:18px
        style F font-size:18px
        style G font-size:18px
        style H font-size:20px
        style I font-size:20px
        style J font-size:20px
        style K font-size:20px
        style L font-size:18px
        style M font-size:18px
        style N font-size:18px
      `}
    </div>
  );
}