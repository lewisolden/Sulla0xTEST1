import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return;

      try {
        // Initialize mermaid with minimal config
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });

        // Simple diagram definition
        const graphDefinition = `
        sequenceDiagram
        Alice->>Bob: Transaction request
        Bob->>Bob: Validate transaction
        Bob->>Charlie: Forward to network
        Charlie->>Bob: Confirm receipt
        Bob->>Alice: Transaction complete
        `;

        // Clear any existing content
        diagramRef.current.innerHTML = graphDefinition;

        // Add mermaid class
        diagramRef.current.className = 'mermaid';

        // Render the diagram
        await mermaid.run();
      } catch (error) {
        console.error('Mermaid diagram error:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = `
            <div class="p-4 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <p class="mt-2 text-sm text-gray-600">Error displaying diagram</p>
              <p class="mt-1 text-xs text-gray-500">Try refreshing the page</p>
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg">
      <div ref={diagramRef} className="flex justify-center items-center min-h-[200px]" />
    </div>
  );
}