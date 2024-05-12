import { create } from 'zustand';

interface CategoryStore {
  selectedCategory: number | null;
  setSelectedCategory: (selectedCategory: number) => void;
}

export const useCategoryStore = create<CategoryStore>(set => ({
  selectedCategory: null,
  setSelectedCategory: selectedCategory => {
    set({ selectedCategory: selectedCategory });
  }
}));
