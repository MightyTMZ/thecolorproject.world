"use client";

import React, { useState, useEffect, useCallback } from "react";
import RandomColor from "@/components/current/colors";
import styles from "./page.module.css";
import ColorCount from "@/components/color-count";
import { backend } from "@/data/constants";

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  // Fetch count on mount
  useEffect(() => {
    fetch(`${backend}/colors/count/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch color count");
        return res.json();
      })
      .then((data) => setCount(data.total_colors_discovered))
      .catch(() => setCount(null));
  }, []);

  // Show message for 2 seconds
  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className={styles.heading}>
          Can HUVTSP generate all 16,777,216 colors? One click at a time.
        </h1>
        <ColorCount count={count} />
        {message && (
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              textAlign: "center",
              margin: "10px auto",
              maxWidth: 400,
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {message}
          </div>
        )}
        <RandomColor
          count={count}
          setCount={setCount}
          showMessage={showMessage}
        />
        <p style={{ fontSize: "6px" }}>
          💖💖💖 Made by <a href="https://www.tomzhang.info/">Tom Zhang</a>
        </p>
      </div>
    </>
  );
}
