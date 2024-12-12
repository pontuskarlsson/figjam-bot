// widget-src/code.tsx
import { useEffect, useState } from "react";

interface ColorData {
  name: string;
  rgb: [number, number, number];
}

const ColorSwatch = ({ name, rgb }: ColorData) => {
  const [r, g, b] = rgb;
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
  return (
    <div 
      style={{ 
        padding: '8px',
        margin: '4px',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
        cursor: 'grab'
      }}
      onDragStart={(e) => {
        // We'll implement drag functionality here later
        e.dataTransfer.setData('color', JSON.stringify({ name, rgb }));
      }}
      draggable
    >
      <div 
        style={{
          width: '100px',
          height: '100px',
          backgroundColor,
          borderRadius: '4px'
        }}
      />
      <div style={{ marginTop: '4px' }}>
        <div style={{ fontWeight: 'bold' }}>{name}</div>
        <div>RGB: {r}, {g}, {b}</div>
      </div>
    </div>
  );
};

const Widget = () => {
  const [colors, setColors] = useState<ColorData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchColors = async () => {
      try {
        // Replace these URLs with your actual GitHub raw JSON URLs
        const urls = [
          'https://raw.githubusercontent.com/pontuskarlsson/colors/refs/heads/main/colour_1.json',
          'https://raw.githubusercontent.com/pontuskarlsson/colors/refs/heads/main/colour_2.json',
          'https://raw.githubusercontent.com/pontuskarlsson/colors/refs/heads/main/colour_3.json'
        ];

        const responses = await Promise.all(
          urls.map(url => fetch(url))
        );

        const jsonData = await Promise.all(
          responses.map(response => response.json())
        );

        // Combine all color data
        const allColors = jsonData.flat();
        setColors(allColors);
      } catch (err) {
        setError("Failed to load color data");
        console.error(err);
      }
    };

    fetchColors();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2>Color Swatches</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '8px'
      }}>
        {colors.map((color, index) => (
          <ColorSwatch key={`${color.name}-${index}`} {...color} />
        ))}
      </div>
    </div>
  );
};

export default Widget;

// manifest.json
{
  "name": "Color Swatch Widget",
  "id": "your-widget-id",
  "api": "1.0.0",
  "main": "code.js",
  "capabilities": [],
  "enableProposedApi": false,
  "editorType": ["figjam"],
  "containsWidget": true,
  "widgetApi": "1.0.0"
}

// package.json
{
  "name": "figjam-color-widget",
  "version": "1.0.0",
  "description": "FigJam widget for color swatches",
  "scripts": {
    "build": "esbuild widget-src/code.tsx --bundle --outfile=dist/code.js --target=es6",
    "dev": "npm run build -- --watch"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@figma/plugin-typings": "^1.42.1",
    "@types/react": "^18.0.17",
    "esbuild": "^0.14.54",
    "typescript": "^4.7.4"
  }
}