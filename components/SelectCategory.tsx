'use client';

import { useCategoryStore } from '@/state/categoryStore';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';

const SelectCategory = () => {
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } =
    useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  return (
    <select
      className="welcome__category"
      value={selectedCategory}
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
