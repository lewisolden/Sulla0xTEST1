import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function DoubleSpendDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.initialize({
        startOnLoad: true,
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

      const diagram = `
      sequenceDiagram
          participant U as User
          participant B as Blockchain Network
          participant V as Validators

          U->>B: Submit Transaction
          B->>V: Check Transaction
          V->>V: Verify No Previous Spend
          Note over V: Consensus Process
          V->>B: Confirm Valid
          B->>U: Transaction Complete
      `;

      try {
        mermaid.render('double-spend-diagram', diagram, (svgCode) => {
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svgCode;
          }
        });
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, []);

  return (
    <div className="my-8 bg-white p-4 rounded-lg shadow-lg">
      <div ref={diagramRef} className="flex justify-center" />
    </div>
  );
}