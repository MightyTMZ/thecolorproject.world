"use client";

import React, { useState, useEffect, useCallback } from "react";
import RandomColor from "@/components/current/colors";
import styles from "./page.module.css";
import ColorCount from "@/components/color-count";
import SharingBar from "@/components/sharing-bar";
import ColorHistoryBar from "@/components/color-history-bar";
import ColorModal from "@/components/color-modal";
import { backend } from "@/data/constants";
import ReturnToGamesButton from "@/components/return-to-tomzhang/ReturnButton";
import { showDownloadOptions } from "@/components/download-utils";

interface Color {
  rgb: string;
  hex: string;
}

export default function Home() {
  const [count, setCount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [utmSource, setUtmSource] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<Color>({ rgb: "0, 0, 0", hex: "#000000" });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userGeneratedColors, setUserGeneratedColors] = useState<Color[]>([]);

  // Fetch count on mount
  useEffect(() => {
    fetch(`${backend}/colors/count/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch color count");
        return res.json();
      })
      .then((data) => setCount(data.total_colors_discovered))
      .catch(() => setCount(null));

    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
  }, []);

  // Show message for 2 seconds
  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  }, []);

  // Handle color generation
  const handleColorGenerated = useCallback((color: Color) => {
    setCurrentColor(color);
    // Add to user's generated colors list
    setUserGeneratedColors(prev => [...prev, color]);
  }, []);

  // Handle color selection from history
  const handleColorSelect = useCallback((color: Color) => {
    setCurrentColor(color);
  }, []);

  // Handle modal actions
  const handleShowFullList = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDownloadColors = useCallback(() => {
    const success = showDownloadOptions(userGeneratedColors);
    if (success) {
      showMessage("✅ Colors downloaded successfully!");
    } else {
      showMessage("❌ Failed to download colors. Please try again.");
    }
  }, [showMessage, userGeneratedColors]);

  return (
    <>
      <SharingBar count={count} />
      <div className="container mx-auto">
        {utmSource === "tomzhang" && <div className="ml-4 mb-4">
          <ReturnToGamesButton/>
          </div>}
        <h1 className={styles.heading}>
          Can we generate all 16,777,216 colors? One click at a time.
        </h1>
        <ColorCount count={count} />
        <ColorHistoryBar
          currentColor={currentColor}
          onColorSelect={handleColorSelect}
          onShowFullList={handleShowFullList}
          userColors={userGeneratedColors}
        />
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
          onColorGenerated={handleColorGenerated}
        />
        <ColorModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onColorSelect={handleColorSelect}
          onDownloadColors={handleDownloadColors}
          userColors={userGeneratedColors}
        />
        <p style={{ fontSize: "6px" }}>
          💖💖💖 Made by <a href="https://www.tomzhang.info/">Tom Zhang</a>
        </p>
      </div>
    </>
  );
}
