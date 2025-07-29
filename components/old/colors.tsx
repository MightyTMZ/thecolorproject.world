"use client";

import React, { useState, useEffect } from "react";

interface Color {
  rgb: string;
  hex: string;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return { rgb, hex };
}

function RandomColor() {
  const [colors, setColors] = useState<Color[]>([]);
  const [color, setColor] = useState<Color>({
    rgb: "0, 0, 0",
    hex: "#000000",
  });

  useEffect(() => {
    const initialColor = getRandomColor();
    setColor(initialColor);
    setColors([initialColor]);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    const newColor = getRandomColor();
    const updatedColors = [...colors, newColor];
    setColor(newColor); // make a new color
    setColors(updatedColors); // add color to initial array (only 1 color)
    setCurrentIndex(updatedColors.length - 1);
    console.log(JSON.stringify(colors));
    console.log(currentIndex);
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          backgroundColor: color.rgb,
          height: "100vh",
          width: "100vw",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease",
          fontFamily: "'Poppins', san-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            textShadow: "0 0 5px rgba(0,0,0,0.5)",
            fontSize: "3.5rem",
            userSelect: "none",
          }}
        >
          <div>{color.hex.toUpperCase()}</div>
          <div>{color.rgb}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "3px 0",
        }}
      >
        <button
          onClick={() => {
            if (currentIndex > 0) {
              const newIndex = currentIndex - 1;
              setCurrentIndex(newIndex);
              setColor(colors[currentIndex]);
            }
          }}
          style={{
            padding: "5px",
            borderRadius: "3px",
            background: "white",
            opacity: currentIndex == 0 ? "0.5" : "1.0",
            border: "1px solid black",
          }}
        >
          Back ⬅️
        </button>
        <button
          onClick={() => {
            if (currentIndex < colors.length - 1) {
              const newIndex = currentIndex + 1;
              setCurrentIndex(newIndex);
              setColor(colors[currentIndex]);
            }
          }}
          style={{
            padding: "5px",
            borderRadius: "3px",
            background: "white",
            opacity: currentIndex + 1 == colors.length ? "0.5" : "1.0",
            border: "1px solid black",
          }}
        >
          Forward ➡️
        </button>
      </div>
    </>
  );
}

export default RandomColor;
