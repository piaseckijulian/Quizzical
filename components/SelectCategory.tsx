'use client';

import { useCategoryStore } from '@/store/categoryStore';
import { type ChangeEvent } from 'react';

interface Props {
  categories: {
    id: number;
    name: string;
  }[];
}

const SelectCategory = ({ categories }: Props) => {
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = parseInt(e.target.value);

    setSelectedCategory(category);
  };

  return (
    <select
      value={selectedCategory || 0}
      onChange={handleCategorySelect}
      className="home__select-category"
      aria-label="Select category"
    >
      {categories.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
