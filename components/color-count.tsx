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
          Total Colors Discovered: <strong>{count}</strong>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ColorCount;
