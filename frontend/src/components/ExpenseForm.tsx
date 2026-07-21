/**
 * Form component for adding/editing expenses
 */

import React from "react";
import { ExpenseFormData, Category, CategoryFormData } from "../types";
import { TextField, SelectBox, Button, Modal } from "../vibes";
import { useExpenseForm } from "../hooks/useExpenseForm";
import { useCategories } from "../hooks/useCategories";
import { createCategory } from "../services/api";
import { CategoryForm } from "./CategoryForm";
import { COLORS } from "../constants/colors";

interface ExpenseFormProps {
  initialData?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ExpenseForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Add Expense",
}: ExpenseFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useExpenseForm({
      initialData,
      onSubmit,
    });
    
  const {
    categories,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories();
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const handleCreateCategory = async (data: CategoryFormData) => {
    const newCategory = await createCategory(data);
    await refetchCategories();
    
    // Auto-select newly created
    handleChange("category", newCategory.id.toString());
    setIsCategoryModalOpen(false);
  }

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
  
  const categoryRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-end",
    gap: "0.5rem",
  };
  
  const addCategoryButtonStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    borderRadius: "0.375rem",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.background.main,
    cursor: "pointer",
    fontSize: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary.p05,
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const categoryOptions = categoriesLoading
    ? [{ value: "", label: "Loading categories..." }]
    : categories.map((cat: Category) => ({
        value: cat.id.toString(),
        label: `${cat.emoji} ${cat.name}`,
      }));

  return (
    <>    
      <form onSubmit={handleSubmit} style={formStyle}>
        <TextField
          label="Amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          error={errors.amount}
          fullWidth
          required
        />

        <TextField
          label="Description"
          type="text"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={errors.description}
          fullWidth
          required
        />

        <div style={categoryRowStyle}>
          <div style={{ flex: 1 }}>
            <SelectBox
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              error={errors.category}
              fullWidth
              required
              disabled={categoriesLoading}
            />            
          </div>          
          <button
              type="button"
              style={addCategoryButtonStyle}
              onClick={() => setIsCategoryModalOpen(true)}
              title="Add new category"
              onMouseEnter={(e)=> {
                e.currentTarget.style.background = COLORS.primary.p01;
                e.currentTarget.style.borderColor = COLORS.primary.p05;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.background.main;
                e.currentTarget.style.borderColor = COLORS.border;
              }}
            >
              +
            </button>
        </div>
        
        

        <TextField
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          error={errors.date}
          fullWidth
          required
        />

        <div style={buttonGroupStyle}>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Submitting..." : submitLabel}
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
      
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Create New Category"
      >
        <CategoryForm
          onSubmit={handleCreateCategory}
          onCancel={() => setIsCategoryModalOpen(false)}
        />
      </Modal>
    </>
  );
}
