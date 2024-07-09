import { create } from "zustand"

type CategoryStore = {
  selectedCategory: number | null
  setSelectedCategory: (selectedCategory: number) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => {
    set({ selectedCategory: selectedCategory })
  },
}))
