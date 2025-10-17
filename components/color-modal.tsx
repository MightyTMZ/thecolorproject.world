"use client";

import React, { useState } from "react";

interface Color {
  rgb: string;
  hex: string;
  id?: number;
}

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: Color) => void;
  onDownloadColors: () => void;
  userColors: Color[];
}

const ColorModal: React.FC<ColorModalProps> = ({ 
  isOpen, 
  onClose, 
  onColorSelect, 
  onDownloadColors,
  userColors
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredColors = userColors.filter(color =>
    color.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.rgb.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleColorClick = (color: Color) => {
    onColorSelect(color);
    onClose();
  };

  const handleDownload = () => {
    onDownloadColors();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <h2 style={{
            color: '#fff',
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
          }}>
            Your Generated Colors ({userColors.length.toLocaleString()})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        {/* Search and Download */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <input
            type="text"
            placeholder="Search colors by hex or RGB..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '14px',
            }}
          />
          <button
            onClick={handleDownload}
            style={{
              padding: '12px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            Download List
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px 24px',
        }}>
          {userColors.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '16px',
            }}>
              {filteredColors.map((color, index) => (
                <div
                  key={`${color.hex}-${color.id || index}`}
                  onClick={() => handleColorClick(color)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: color.rgb,
                      marginBottom: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <div style={{
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '500',
                    textAlign: 'center',
                    wordBreak: 'break-all',
                  }}>
                    {color.hex.toUpperCase()}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '10px',
                    textAlign: 'center',
                    marginTop: '4px',
                  }}>
                    {color.rgb}
                  </div>
                </div>
              ))}
            </div>
          )}

          {userColors.length === 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}>
              No colors generated yet. Start clicking to generate some colors!
            </div>
          )}

          {userColors.length > 0 && filteredColors.length === 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}>
              No colors found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
