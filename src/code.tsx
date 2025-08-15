const { widget } = figma
const { useSyncedState, Text: WidgetText, AutoLayout, Rectangle } = widget
const { h } = widget

function ColorSwatch({ name, rgb }: { name: string, rgb: [number, number, number] }) {
  const [r, g, b] = rgb;
  
  return h(AutoLayout, {
    direction: "vertical",
    padding: 8,
    spacing: 4,
    stroke: "#E0E0E0",
    cornerRadius: 4,
    children: [
      h(Rectangle, {
        width: 100,
        height: 100,
        cornerRadius: 4,
        fill: {type: 'solid', color: {r: r/255, g: g/255, b: b/255, a: 1}}
      }),
      h(AutoLayout, {
        direction: "vertical",
        spacing: 2,
        children: [
          h(WidgetText, { fontSize: 14, fontWeight: "bold", children: name }),
          h(WidgetText, { fontSize: 12, children: `RGB: ${r}, ${g}, ${b}` })
        ]
      })
    ]
  });
}

function Widget() {
  // Static test colors
  const testColors = [
    { name: "Test Red", rgb: [255, 0, 0] },
    { name: "Test Green", rgb: [0, 255, 0] },
    { name: "Test Blue", rgb: [0, 0, 255] }
  ];

  return h(AutoLayout, {
    direction: "vertical",
    padding: 16,
    spacing: 16,
    children: [
      h(WidgetText, {
        fontSize: 20,
        fontWeight: "bold",
        children: "Color Swatches"
      }),
      h(AutoLayout, {
        direction: "horizontal",
        spacing: 8,
        padding: 8,
        wrap: true,
        children: testColors.map((color, index) => 
          h(ColorSwatch, {
            key: `${color.name}-${index}`,
            name: color.name,
            rgb: color.rgb
          })
        )
      })
    ]
  });
}

widget.register(Widget);