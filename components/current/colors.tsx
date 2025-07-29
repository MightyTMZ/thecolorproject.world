"use client";

import { backend } from "@/data/constants";
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
  const [color, setColor] = useState<Color>({
    rgb: "0, 0, 0",
    hex: "#000000",
  });

  useEffect(() => {
    const initialColor = getRandomColor();
    setColor(initialColor);
  }, []);

  const handleClick = async () => {
    const newColor = getRandomColor();
    console.log("new color")
    setColor(newColor);

    const rgbValues = newColor.rgb
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((v) => parseInt(v.trim()));

    const [r, g, b] = rgbValues;

    try {
      await fetch(`${backend}/colors/generate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hex_code: newColor.hex,
          r,
          g,
          b,
        }),
      });
    } catch (err) {
      console.error("Failed to save color:", err);
    }
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
    </>
  );
}

export default RandomColor;
