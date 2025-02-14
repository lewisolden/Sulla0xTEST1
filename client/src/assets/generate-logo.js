const colors = [
  { name: 'blue', value: '#1e40af' },  // Dark blue
  { name: 'purple', value: '#6b21a8' }, // Royal purple
  { name: 'green', value: '#166534' },  // Forest green
  { name: 'slate', value: '#334155' },  // Business slate
  { name: 'indigo', value: '#3730a3' }  // Deep indigo
];

colors.forEach((colorObj) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 200 50");
  svg.setAttribute("width", "200");
  svg.setAttribute("height", "50");

  // Create text element
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

  // Convert SVG to blob and download
  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `sulla-text-logo-${colorObj.name}.svg`;
  link.click();

  URL.revokeObjectURL(url);
});