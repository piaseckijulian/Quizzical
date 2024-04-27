'use client';

import { useCategoryStore } from '@/store/categoryStore';
import { useEffect, type ChangeEvent } from 'react';

const SelectCategory = () => {
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } =
    useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  return (
    <select
      className="welcome__category"
      value={selectedCategory || 0}
      onChange={e => handleSelect(e)}
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
