const data = [
  {
    "function": "drawText",
    "parameters": [
      "text",
      "x",
      "y",
      "size",
      "font",
      "color"
    ],
    "description": "Standard function to draw text"
  },
  {
    "function": "drawRectangle",
    "parameters": [
      "x",
      "y",
      "width",
      "height",
      "color",
      "opacity"
    ],
    "description": "Draws a rectangle on the PDF page. Great for creating borders, backgrounds, or highlighting specific areas."
  },
  {
    "function": "drawLine",
    "parameters": [
      "start: { x, y }",
      "end: { x, y }",
      "thickness"
    ],
    "description": "Draws a line on the PDF page. Useful for creating dividers, underlines, or custom shapes. Requires start and end coordinates, as well as thickness for the line."
  },
  {
    "function": "drawCircle",
    "parameters": [
      "x",
      "y",
      "size",
      "color"
    ],
    "description": "Draws a circle on the PDF page. Perfect for creating bullet points, decorative elements, or highlighting specific areas. Warning - size is the radius of the circle, not the diameter."
  },
  {
    "function": "drawEllipse",
    "parameters": [
      "x",
      "y",
      "xScale",
      "yScale",
      "color"
    ],
    "description": "Draws an ellipse on the PDF page. Perfect for creating decorative elements or highlighting specific areas. It will crash if xScale or yScale is missing - make sure to include both parameters."
  }
];

export default data;
