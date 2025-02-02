import { useEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'sans-serif'
    });
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <div className="mermaid">
      {chart}
    </div>
  );
};

export default Mermaid;
