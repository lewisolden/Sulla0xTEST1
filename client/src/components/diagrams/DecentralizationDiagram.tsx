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
        },
      });

      mermaid.init(undefined, diagramRef.current);
    }
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow" ref={diagramRef}>
      {`
      graph TD
          subgraph Traditional System
          A((Central Bank)) --> B((Bank 1))
          A --> C((Bank 2))
          A --> D((Bank 3))
          B --> E((User))
          C --> F((User))
          D --> G((User))
          end

          subgraph Cryptocurrency Network
          H((Node)) --- I((Node))
          I --- J((Node))
          J --- K((Node))
          K --- H
          H --- L((User))
          I --- M((User))
          J --- N((User))
          end
      `}
    </div>
  );
}