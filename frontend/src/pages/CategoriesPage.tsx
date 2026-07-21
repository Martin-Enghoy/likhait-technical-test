import React, { useState } from "react";
import { CategoryFormData } from "../types";
import { useCategories } from "../hooks/useCategories";
import { createCategory } from "../services/api";
import { CategoryForm } from "../components/CategoryForm";
import { Modal, Button } from "../vibes";
import { COLORS } from "../constants/colors";

const CategoriesPage: React.FC = () => {
  const { categories, isLoading, refetch } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCreateCategory = async (data: CategoryFormData) => {
    await createCategory(data);
    setIsModalOpen(false);
    refetch();
  };
  
  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };
  
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",    
  };
  
  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    margin: 0,
  };
  
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  };
  
  const cardStyle: React.CSSProperties = {
    background: COLORS.background.main,
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.2s",
    cursor: "default",
  };
  
  const emojiStyle: React.CSSProperties = {
    fontSize: "48px",
    width: "72px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: COLORS.secondary.s01,
    borderRadius: "16px",
  };
  
  const nameStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px",
    fontSize: "18px",
    color: COLORS.secondary.s08,
  };
  
  const skeletonCardStyle: React.CSSProperties = {
    ...cardStyle,
    animation: "pulse 1.5s ease-in-out infinite",
  };
  
  const skeletonEmojiStyle: React.CSSProperties = {
    ...emojiStyle,
    background: COLORS.secondary.s03,
  };
  
  const skeletonTextStyle: React.CSSProperties = {
    width: "80px",
    height: "20px",
    background: COLORS.secondary.s03,
    borderRadius: "4px",
  };
  
  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Categories</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>
      
      {isLoading ? (
        <div style={gridStyle}>
          {Array.from({length: 6}).map((_, idx) => (
            <div key={i} style={skeletonCardStyle}>
              <div style={skeletonEmojiStyle} />
              <div style={skeletonTextStyle} />
            </div>
          ))}
        </div>
      ) : (
        <div style={gridStyle}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={cardStyle}
              onMouseEvent={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
              }}
            >
              <span style={emojiStyle}>{cat.emoji}</span>
              <span style={nameStyle}>{cat.name}</span>
            </div>
          ))}
        </div>
      )}
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Category"        
      >        
        <CategoryForm
          onSubmit={handleCreateCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;