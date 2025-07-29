"use client";

import { backend } from "@/data/constants";
import React, { useEffect, useState } from "react";

const TOTAL_POSSIBLE_COLORS = 16777216; // 256^3

interface ColorCountProps {
  count: number | null;
}

const ColorCount: React.FC<ColorCountProps> = ({ count }) => {
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (count === null) {
      fetch(`${backend}/colors/count/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch color count");
          return res.json();
        })
        .then((data) => setFetchedCount(data.total_colors_discovered))
        .catch((err) => {
          console.error(err);
          setError("Error loading color count");
        });
    }
  }, [count]);

  const displayCount = count !== null ? count : fetchedCount;
  const percentComplete = displayCount
    ? ((displayCount / TOTAL_POSSIBLE_COLORS) * 100).toFixed(6)
    : null;

  return (
    <div style={{ marginTop: "1rem" }}>
      {error ? (
        <p>{error}</p>
      ) : displayCount !== null ? (
        <p>
          Total Colors Discovered: <strong>{displayCount.toLocaleString()}</strong>{" "}
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
