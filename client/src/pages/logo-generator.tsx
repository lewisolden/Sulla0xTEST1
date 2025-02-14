import { useEffect } from 'react';
import { Card } from "@/components/ui/card";

const colors = [
  { name: 'blue', value: '#1e40af' },  // Dark blue
  { name: 'purple', value: '#6b21a8' }, // Royal purple
  { name: 'green', value: '#166534' },  // Forest green
  { name: 'slate', value: '#334155' },  // Business slate
  { name: 'indigo', value: '#3730a3' }  // Deep indigo
];

export default function LogoGenerator() {
  useEffect(() => {
    colors.forEach((colorObj) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 50");
      svg.setAttribute("width", "200");
      svg.setAttribute("height", "50");

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", "50%");
      text.setAttribute("y", "35");
      text.setAttribute("font-family", "system-ui, -apple-system, sans-serif");
      text.setAttribute("font-size", "32");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("fill", colorObj.value);
      text.setAttribute("text-anchor", "middle");
      text.textContent = "Sulla";

      svg.appendChild(text);

      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `sulla-text-logo-${colorObj.name}.svg`;
      link.click();

      URL.revokeObjectURL(url);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Sulla Logo Generator
          </h1>

          <Card className="p-6 mb-8">
            <p className="text-lg text-gray-700 mb-4">
              This page will automatically generate and download 5 variations of the Sulla logo in different colors.
            </p>
            <div className="space-y-4">
              <div className="text-3xl font-bold" style={{ color: '#1e40af' }}>
                Sulla
              </div>
              <p className="text-gray-600">Preview of the text-based logo style</p>
              <div className="space-y-2">
                <p className="font-medium">Available colors:</p>
                <ul className="list-disc pl-6">
                  <li>Classic Blue</li>
                  <li>Royal Purple</li>
                  <li>Forest Green</li>
                  <li>Business Slate</li>
                  <li>Deep Indigo</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
