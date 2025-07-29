"use client";

import { backend } from "@/data/constants";
import React, { useEffect, useState } from "react";

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

  return (
    <div style={{ marginTop: "1rem" }}>
      {error ? (
        <p>{error}</p>
      ) : count !== null ? (
        <p>
          Total Colors Discovered: <strong>{count}</strong>{" "}
          <span
            style={{ color: "grey", fontStyle: "italic", fontSize: "10px" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Updated every 60 seconds –
            cached to keep things fast with high traffic
          </span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ColorCount;
