/**
 * Custom hook for fetching and managing categories from the API
 */

import { useState, useEffect, useCallback } from "react";
import { Category } from "../types";
import { fetchCategories } from "../services/api";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchCategories();
      
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  
  return {
    categories,
    isLoading,
    error,
    refetch: loadCategories,
  }
}