import React from "react";
import { COLORS } from "../constants/colors";

const EMOJI_OPTIONS = [
  "🍔", "🚗", "🎬", "🛍️", "📄", "🏥", "📚", "✈️", "🎮", "💊",
  "🏠", "🎁", "💰", "🔧", "🐾", "👤", "🎵", "⚽", "🍕", "☕",
  "💼", "🎨", "🌿", "📱", "🧹",
];

interface EmojiPickerProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ selectedEmoji, onSelect }: EmojiPickerProps) {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
  };
  
  const emojiButtonStyle = (emoji: string): React.CSSProperties => ({
    width: "48px",
    height: "48px",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: selectedEmoji === emoji
      ? `2px solid ${COLORS.primary.p05}`
      : `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    background: selectedEmoji === emoji
      ? COLORS.primary.p01
      : COLORS.background.main,
    cursor: "pointer",
    transition: "all 0.15s ease",
  });
  
  const labelStyle: React.CSSProperties => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    colors: COLORS.text.primary,
    marginBottom: "8px",
  });
  
  return (
    <div>
      <label style={labelStyle}>Emoji</label>
      <div style={gridStyle}>
        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            style={emojiButtonStyle}
            onClick={() => onSelect(emoji)}
            onMouseEnter={(e) => {
              if (selectedEmoji !== emoji) {
                e.currentTarget.style.background = COLORS.background.hover;
                e.currentTarget.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedEmoji !== emoji) {
                e.currentTarget.style.background = COLORS.background.main;
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
            aria-label={`Select emoji ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}