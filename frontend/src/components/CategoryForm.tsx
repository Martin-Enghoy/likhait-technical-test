import React, { useState } from "react";
import { CategoryFormData } from "../types";
import { TextField, Button } from "../vibes";
import { EmojiPicker } from "./EmojiPicker";
import { COLORS } from "../constants/colors";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📦");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({ name: name.trim(), emoji });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };
  
  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };
  
  const errorBannerStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderRadius: "0.375rem",
    backgroundColor: COLORS.red.re02,
    color: COLORS.red.re07,
    fontSize: "0.875rem",
  };
  
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && <div style={errorBannerStyle}>{error}</div>}
      
      <TextField
        label="Category Name"
        type="text"
        placeholder="e.g., Groceries"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      
      <EmojiPicker selectedEmoji={emoji} onSelect={setEmoji} />
      
      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Creating..." : "Create category"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}