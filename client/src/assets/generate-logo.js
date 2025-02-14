const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

// Set background
ctx.fillStyle = '#1e40af'; // Dark blue background
ctx.fillRect(0, 0, 500, 500);

// Draw stylized 'S'
ctx.beginPath();
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 40;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Draw S curve
ctx.moveTo(175, 150);
ctx.bezierCurveTo(
  175, 100,
  325, 100,
  325, 175
);
ctx.bezierCurveTo(
  325, 250,
  175, 250,
  175, 325
);
ctx.bezierCurveTo(
  175, 400,
  325, 400,
  325, 350
);

ctx.stroke();

// Add white circular border
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 20;
ctx.beginPath();
ctx.arc(250, 250, 220, 0, Math.PI * 2);
ctx.stroke();

// Convert to PNG
const dataURL = canvas.toDataURL('image/png');
const link = document.createElement('a');
link.download = 'sulla-logo.png';
link.href = dataURL;
link.click();
