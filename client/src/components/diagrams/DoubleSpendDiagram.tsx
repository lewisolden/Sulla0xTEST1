import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (diagramRef.current) {
        try {
          // Initialize mermaid
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            sequence: {
              diagramMarginX: 50,
              diagramMarginY: 10,
              actorMargin: 50,
              width: 150,
              height: 65,
              boxMargin: 10,
              boxTextMargin: 5,
              noteMargin: 10,
              messageMargin: 35
            }
          });

          // Define the diagram
          const diagram = `sequenceDiagram
    participant U as User
    participant N as Network
    participant B as Blockchain
    U->>N: 1. Submit Transaction
    N->>N: 2. Verify No Previous Spend
    N->>B: 3. Add to Block
    B->>N: 4. Confirm Transaction
    N->>U: 5. Transaction Complete`;

          // Clear previous content
          diagramRef.current.innerHTML = '';

          // Create a unique ID for this diagram instance
          const id = `mermaid-diagram-${Math.random().toString(36).substr(2, 9)}`;

          // Render the diagram
          const { svg } = await mermaid.render(id, diagram);

          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid diagram error:', error);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = `
              <div class="p-4 text-center text-red-600">
                <p>Unable to display diagram</p>
                <p class="text-sm">Please try refreshing the page</p>
              </div>
            `;
          }
        }
      }
    };

    renderDiagram();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg">
      <div 
        ref={diagramRef}
        className="mermaid-diagram w-full overflow-x-auto flex justify-center items-center min-h-[200px]"
      />
    </div>
  );
}