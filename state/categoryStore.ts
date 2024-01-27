import axios from 'axios';
import { create } from 'zustand';

interface CategoryStore {
  categories: {
    id: number;
    name: string;
  }[];
  selectedCategory: number | null;
  fetchCategories: () => void;
  setSelectedCategory: (category: number) => void;
}

export const useCategoryStore = create<CategoryStore>(set => ({
  categories: [],
  selectedCategory: null,
  fetchCategories: async () => {
    const url = 'https://opentdb.com/api_category.php';

    try {
      const res = await axios(url);
      set({
        categories: [{ id: 0, name: 'Any Category' }, ...res.data.trivia_categories]
      });
    } catch (error) {
      throw error;
    }
  },
  setSelectedCategory: category => {
    set({ selectedCategory: category });
  }
}));
