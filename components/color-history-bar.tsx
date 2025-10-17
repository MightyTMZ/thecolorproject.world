"use client";

import React, { useState, useEffect } from "react";

// Add CSS for pulse animation
const pulseStyle = `
  @keyframes colorPulse {
    0% { 
      box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.4);
      transform: scale(1.15);
      border: 4px solid #fff;
    }
    50% { 
      box-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 45px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8), 0 0 75px rgba(255, 255, 255, 0.6);
      transform: scale(1.2);
      border: 5px solid #fff;
    }
    100% { 
      box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.4);
      transform: scale(1.15);
      border: 4px solid #fff;
    }
  }
`;

interface Color {
  rgb: string;
  hex: string;
}

interface ColorHistoryBarProps {
  currentColor: Color;
  onColorSelect: (color: Color) => void;
  onShowFullList: () => void;
  userColors: Color[];
}

const ColorHistoryBar: React.FC<ColorHistoryBarProps> = ({ 
  currentColor, 
  onColorSelect, 
  onShowFullList,
  userColors
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [visibleStartIndex, setVisibleStartIndex] = useState<number>(0);
  const maxVisibleColors = 8;

  // Find the current color's index in the user colors array
  useEffect(() => {
    if (userColors.length > 0) {
      const index = userColors.findIndex(color => 
        color.hex === currentColor.hex && color.rgb === currentColor.rgb
      );
      if (index !== -1) {
        setCurrentIndex(index);
        
        // Adjust visible range to show the current color
        if (index >= visibleStartIndex + maxVisibleColors) {
          setVisibleStartIndex(Math.max(0, index - maxVisibleColors + 1));
        } else if (index < visibleStartIndex) {
          setVisibleStartIndex(index);
        }
      }
    }
  }, [currentColor, userColors, visibleStartIndex]);

  const goBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onColorSelect(userColors[newIndex]);
      
      // Adjust visible range if needed
      if (newIndex < visibleStartIndex) {
        setVisibleStartIndex(Math.max(0, newIndex));
      }
    }
  };

  const goForward = () => {
    if (currentIndex < userColors.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onColorSelect(userColors[newIndex]);
      
      // Adjust visible range if needed
      if (newIndex >= visibleStartIndex + maxVisibleColors) {
        setVisibleStartIndex(newIndex - maxVisibleColors + 1);
      }
    }
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < userColors.length - 1;
  const visibleColors = userColors.slice(visibleStartIndex, visibleStartIndex + maxVisibleColors);

  if (userColors.length === 0) {
    return null;
  }

  return (
    <>
      <style>{pulseStyle}</style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        margin: '20px 0 20px -16px', // Negative left margin to counteract container padding
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        width: 'fit-content',
      }}>
      {/* Back Arrow */}
      <button
        onClick={goBack}
        disabled={!canGoBack}
        style={{
          background: canGoBack ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          border: 'none',
          cursor: canGoBack ? 'pointer' : 'not-allowed',
          padding: '8px',
          borderRadius: '8px',
          transition: 'all 0.2s',
          opacity: canGoBack ? 1 : 0.5,
          boxShadow: canGoBack ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
        }}
        onMouseEnter={(e) => {
          if (canGoBack) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (canGoBack) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
        title="Previous color"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#333"/>
        </svg>
      </button>

      {/* Color History Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        minWidth: '200px',
        justifyContent: 'flex-start',
      }}>
        {visibleColors.map((color, index) => {
          const actualIndex = visibleStartIndex + index;
          const isCurrentColor = actualIndex === currentIndex;
          
          return (
            <div
              key={`${color.hex}-${actualIndex}`}
              onClick={() => {
                setCurrentIndex(actualIndex);
                onColorSelect(color);
              }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: color.rgb,
                cursor: 'pointer',
                border: isCurrentColor ? '4px solid #fff' : '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.2s ease',
                boxShadow: isCurrentColor ? '0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.4)' : 'none',
                transform: isCurrentColor ? 'scale(1.15)' : 'scale(1)',
                outline: isCurrentColor ? '3px solid rgba(255, 255, 255, 0.8)' : 'none',
                outlineOffset: isCurrentColor ? '3px' : '0',
                animation: isCurrentColor ? 'colorPulse 1.5s ease-in-out infinite' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isCurrentColor) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCurrentColor) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
              title={`${color.hex} - ${color.rgb}`}
            />
          );
        })}
      </div>

      {/* Forward Arrow */}
      <button
        onClick={goForward}
        disabled={!canGoForward}
        style={{
          background: canGoForward ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          border: 'none',
          cursor: canGoForward ? 'pointer' : 'not-allowed',
          padding: '8px',
          borderRadius: '8px',
          transition: 'all 0.2s',
          opacity: canGoForward ? 1 : 0.5,
          boxShadow: canGoForward ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
        }}
        onMouseEnter={(e) => {
          if (canGoForward) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (canGoForward) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
        title="Next color"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#333"/>
        </svg>
      </button>

      {/* See Full List Button */}
      <button
        onClick={onShowFullList}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          color: '#333',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          marginLeft: '15px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        title="View all generated colors"
      >
        See Full List ({userColors.length})
      </button>
      </div>
    </>
  );
};

export default ColorHistoryBar;
