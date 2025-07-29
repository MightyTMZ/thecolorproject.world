"use client";

import { backend } from "@/data/constants";
import React, { useEffect, useState } from "react";

const TOTAL_POSSIBLE_COLORS = 16777216; // 256^3

const ColorCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${backend}/colors/count/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch color count");
        return res.json();
      })
      .then((data) => setCount(data.total_colors_discovered))
      .catch((err) => {
        console.error(err);
        setError("Error loading color count");
      });
  }, []);

  const percentComplete = count
    ? ((count / TOTAL_POSSIBLE_COLORS) * 100).toFixed(6)
    : null;

  return (
    <div style={{ marginTop: "1rem" }}>
      {error ? (
        <p>{error}</p>
      ) : count !== null ? (
        <p>
          Total Colors Discovered: <strong>{count.toLocaleString()}</strong>{" "}
          <span style={{ marginLeft: "1rem", color: "#777" }}>
            ({percentComplete}%)
          </span>
          <br />
          <span
            style={{ color: "grey", fontStyle: "italic", fontSize: "10px" }}
          >
            Updated every 60 seconds – cached to keep things fast with high
            traffic
          </span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ColorCount;
