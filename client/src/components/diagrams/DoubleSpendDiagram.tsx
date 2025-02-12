import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        messageMargin: 35,
        mirrorActors: true,
      },
    });

    const renderDiagram = async () => {
      if (diagramRef.current) {
        const diagram = `
          sequenceDiagram
            participant User
            participant Network
            participant Validators
            User->>Network: Submit Transaction
            Network->>Validators: Broadcast Transaction
            Validators->>Validators: Check for Double Spend
            Note over Validators: Verify Transaction History
            Validators->>Network: Confirm Valid
            Network->>User: Transaction Complete
        `;

        try {
          const { svg } = await mermaid.render('double-spend-diagram', diagram);
          diagramRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(renderDiagram, 100);
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg">
      <div ref={diagramRef} className="flex justify-center overflow-x-auto" />
    </div>
  );
}